import json
import os
from re import U
import uuid
from django.conf import settings
from django.http.response import JsonResponse
import requests
from rest_framework import serializers
from rest_framework.views import APIView
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.authentication import TokenAuthentication

from transactions.models import Transaction


from .models import Participation, User, UserRequest
from .serializers import ParticipationSerializer, ParticipationSerializer2, UserSerializer, UserRequestSerializer
from .permissions import IsProfileFilled

import csv


class OTPVerify(APIView):
  permission_classes = [IsAuthenticated]
  def post(self, request):
    secret = request.data["secret"]

    if secret != settings.OTP_VERIFY_SECRET:
      return JsonResponse({"detail": "Something went Wrong", "success": False}, status=400)

    phone_no = request.data["phone_no"]
    user = request.user
    user.phone_no = phone_no
    user.is_phone_no_verified = True

    try:
      user.save()
      return JsonResponse({"detail": "Phone Number Added Succesfully","success": True}, status=200)
    except:
      return JsonResponse({"detail": "Something went Wrong", "success": False}, status=400)


class UserDetail(APIView):
  permission_classes = [IsAuthenticated]
  def get(self, request):
    user = request.user
    serializer = UserSerializer(user)
    # user_teams = TeamSerializer(user.teams, many=True)
    # data = {
    #   **serializer.data,
    #   "teams": user_teams.data
    # }
    res = {
      "user": serializer.data
    }
    return JsonResponse(res, status=200)



class UserUpdate(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request):
    user = request.user
    DEPARTMENTS = ("COMP", "IT", "EXTC", "MECH", "ELEC", "OTHER")
    
    name = request.data['name']
    # department = request.data['department']
    # semester = request.data['semester']

    # if name == "" or department not in DEPARTMENTS or semester < 0 or semester > 8:
    #   return JsonResponse({"detail": "Invalid Fields", "success": False}, status=400)

    if name.strip() == "":
      return JsonResponse({"detail": "Invalid Fields", "success": False}, status=400)

    user.name = name
    # user.department = department
    # user.semester = semester
    
    # if user.is_phone_no_verified:
    user.has_filled_profile = True
    
    try:
      user.save()
      return JsonResponse({"detail": "Profile Updated!", "success": True}, status=200)
    except:
      return JsonResponse({"detail": "Something went Wrong", "success": False}, status=400)


class RegisterView(APIView):
  permission_classes = [IsAdminUser]
  def post(self, request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=201)
    else:
      return JsonResponse(serializer.errors, status=400)

class LoginView(ObtainAuthToken):

  def post(self, request, *args, **kwargs):
    serializer = self.serializer_class(data=request.data, context={'request': request})
    if serializer.is_valid():
      user = serializer.validated_data['user']
      user_serializer = UserSerializer(user)
      token, created = Token.objects.get_or_create(user=user)
      return JsonResponse({
        'token': token.key,
        'user': user_serializer.data,
        'success': True,
      }, status=200)
    else:
      return JsonResponse({"success": False, "errors": serializer.errors}, status=400)

class LogoutView(APIView):
  authentication_classes = [TokenAuthentication]
  permission_classes = [IsAuthenticated]

  def post(self,request):
    # Can delete this token from db but causes problem when using multiple devices
    # request.user.auth_token.delete()
    return JsonResponse({"success": True},status=200)


class UserExistsView(APIView):
  def post(self, request):
    roll_no = request.data.get('roll_no', None)
    email = request.data.get('email', None) #request.data['email'] or None
    phone_no = request.data.get('phone_no', None)

    users = None
    try:
      if roll_no:
        users = User.objects.filter(roll_no=roll_no)
      elif email:
        users = User.objects.filter(email=email)
      else:
        users = User.objects.filter(phone_no=phone_no)
      c = users.count()
      user = users.first()
      
      if c < 1:
        return JsonResponse({"exists": False, "success": True}, status=200)
      else:
        return JsonResponse({"exists": True, "name": user.name or "","success": True}, status=200)
    except:
      return JsonResponse({"detail": "Something went Wrong", "success": False}, status=400)


class UserAvatarUpdate(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request):
    user = request.user
    avatar = request.data["avatar"]
    user.avatar = avatar
    try:
      user.save()
      return JsonResponse({"detail": "Avatar Updated Successfully!", "success": True}, status=200)
    except ValueError:
      return JsonResponse({"detail": "Something went Wrong", "success": False}, status=400)

class UserCriteria(APIView):
  permission_classes = [IsAuthenticated]

  def get(self, request):
    user = request.user
    return JsonResponse({"success": True, "criteria": user.criteria}, status=200)

class UserCheckout(APIView):
  permission_classes = [IsAuthenticated, IsProfileFilled]

  # ! CHECK CRITERIA COMPLETED

  def post(self, request):
    user = request.user

    def check_criteria(user) -> bool:
      criteria = json.loads(user.criteria)

      return True if criteria["C"] >= 1 and criteria["T"] >= 1 else False


    participations = request.data['participations']
    upi_transaction_id = request.data['upi_transaction_id']
    if len(upi_transaction_id) < 5:
      return JsonResponse({"detail": "Enter a Valid Transaction ID", "success": False},status=400)

    if not check_criteria(user):
      return JsonResponse({"detail": "Criteria Not Satisfied: Atleast One Cultural & One Technical Event !", "success": False}, status=400)

    event_amount = 0
    t = Transaction(user=user, upi_transaction_id=upi_transaction_id,is_paid=True)
    p_objs = []

    for p in participations:
      part_q = user.participations.filter(part_id=p)
      _p = part_q.first()
      event_amount += _p.event.entry_fee
      p_objs.append(_p)

      if not part_q:
        return JsonResponse({"detail": "Not Registered for that Event", "success": False},status=400)

    user.money_owed = 0

    t.event_amount = event_amount
    if request.data["donation_amount"]:
      t.donation_amount = int(request.data["donation_amount"])

    t.total_amount = t.event_amount + t.donation_amount
    try:
      t.save()
    except Exception as e:
      print(e)
      return JsonResponse({"detail": "Something Went Wrong", "success": False},status=400)

    try:
      for p in p_objs:
        p.transaction = t
        p.save()
    except:
      t.delete()
      return JsonResponse({"detail": "Something Went Wrong", "success": False},status=400)

    try:
      user.save()
      return JsonResponse({"detail": "Transaction ID Added Successfully!", "success": True},status=200)
    except Exception as e:
      print(e)
      return JsonResponse({"detail": "Something Went Wrong", "success": False},status=400)

# # CART REALTED

class UserCartUpdate(APIView):
  permission_classes = [IsAuthenticated]

  def post(self, request):
    cart = request.data['cart']
    user = request.user

    try:
      j = json.loads(cart)
      user.cart = cart
      user.save()
      return JsonResponse({"detail": "Cart Updated Successfully!", "success": True}, status=200)
    except ValueError:
      return JsonResponse({"detail": "Something went Wrong", "success": False}, status=400)


class MakeUsersView(APIView):
  """
    This route populates the DB with users
  """
  permission_classes = [IsAdminUser]

  def post(self, request):
    _id = request.data["id"]
    url = f'https://drive.google.com/u/0/uc?id={_id}&export=download'

    with requests.Session() as s:
      download = s.get(url)

      decoded_content = download.content.decode('utf-8')

      cr = csv.reader(decoded_content.splitlines(), delimiter=',')
      my_list = list(cr)

      for row in my_list:
        [name, roll_no, email, semester, department,text_password] = row
        roll_no = int(roll_no)

        user = User()
        user.roll_no = roll_no
        user.email = email
        user.department = department
        user.semester = semester
        user.set_password(text_password)

        if roll_no >= 9000000:
          user.name = name
          user.has_filled_profile = True
          user.is_phone_no_verified = True

        try:
          user.save()
          # can send email for login details here
          # but sending throught mail merge in google sheeets
        except:
          print(roll_no, email, text_password, department, semester)

    return JsonResponse({"success": True}, status=200)


# User Request from non-FCRIT

class UserRequestView(APIView):
  def post(self, request):
    serializer = UserRequestSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return JsonResponse(serializer.data, status=201)
    else:
      return JsonResponse(serializer.errors, status=400)

# class TeamList(APIView):
#   permission_classes=[IsAdminUser]

#   def get(self, request):
#     data = Transaction.objects.filter(is_paid=True)

#     data_serializer = TeamSerializer2(data, many=True)

#     for d in data_serializer.data:
#       event = d["event"]
#       # members = d["members"]

#       d["event"] = event["title"]


#     return JsonResponse({"data": data_serializer.data}, status=200)