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


from .models import Team, User
from .serializers import TeamSerializer, TeamSerializer2, UserSerializer
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
    department = request.data['department']
    semester = request.data['semester']

    if name == "" or department not in DEPARTMENTS or semester < 0 or semester > 8:
      return JsonResponse({"detail": "Invalid Fields", "success": False}, status=400)

    user.name = name
    user.department = department
    user.semester = semester
    
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
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        
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
    roll_no = request.data['roll_no']

    try:
      users = User.objects.filter(roll_no=roll_no)
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

  def post(self, request):
    user = request.user

    team_codes = request.data['teams']
    transaction_id = request.data['transaction_id']
    if len(transaction_id) < 5:
      return JsonResponse({"detail": "Enter a Valid Transaction ID", "success": False},status=400)
    
    # checking criteria
    # but this creates a deadlock as criteria cannot be update before verify and people cannot checkout before criteria satisfies
    # criteria = json.loads(user.criteria)
    # criteria_fullfilled = True
    # for c in criteria.keys():
    #   if not criteria[c]:
    #     criteria_fullfilled = False
    
    # if not criteria_fullfilled:
    #   return JsonResponse({"detail": "Please Fullfill all the Criterias before Checkout", "success": False},status=400)
    
    teams = []

    for t in team_codes:
      team_q = user.teams.filter(team_code=t)
      if not team_q:
        return JsonResponse({"detail": "Not Registered for that Event", "success": False},status=400)
      
      team = team_q.first()
      team.transaction_id = transaction_id
      team.is_paid = True
      teams.append(team)
    
    user.money_owed = 0

    try:
      for t in teams:
        t.save()
      
      user.save()
      return JsonResponse({"detail": "Transaction ID Added Successfully!", "success": True},status=200)
    except:
      return JsonResponse({"detail": "Something Went Wrong", "success": False},status=400)

# CART REALTED

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


class TeamList(APIView):
  permission_classes=[IsAdminUser]
  
  def get(self, request):
    data = Team.objects.filter(is_paid=True)
    
    data_serializer = TeamSerializer2(data, many=True)
    
    for d in data_serializer.data:
      event = d["event"]
      # members = d["members"]
      
      d["event"] = event["title"]
        

    return JsonResponse({"data": data_serializer.data}, status=200)