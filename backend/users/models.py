import json
import random
from uuid import uuid4
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone

from events.models import Event
from .managers import UserManager

DEPARTMENTS = (
  ("COMP", "Computer"),
  ("IT", "IT"),
  ("EXTC", "EXTC"),
  ("MECH", "Mechanical"),
  ("ELEC", "Electrical"),
  ("OTHER", "Other")
)

def make_roll_no() -> int:
  return random.randint(9000000, 10000000)

class User(AbstractBaseUser, PermissionsMixin):

  roll_no = models.IntegerField(_("Roll Number"),unique=True, blank=False, primary_key=True)
  email = models.EmailField(_('email address'),unique=True, max_length=254)
  name = models.CharField(_('Name'), max_length=256,blank=True, null=True)
  avatar = models.CharField(_("Avatar Image"), max_length=256, blank=True ,null=True)
  department = models.CharField(_('Department'),max_length=10,blank=True, null=True, choices=DEPARTMENTS)
  semester = models.SmallIntegerField(_("Semester"),blank=True, null=True)
  college = models.CharField(_("College"), max_length=256, default="FCRIT, Vashi.")
  phone_no = models.CharField(_("Phone Number"),blank=True,  max_length=32)
  is_phone_no_verified = models.BooleanField(_("Is Phone Number Verified"), default=False)
  cart = models.TextField(_("Cart JSON (DONT FILL THIS)"), default="[]")
  is_from_fcrit = models.BooleanField(_("Is From FCRIT"), default=True)

  money_owed = models.DecimalField(_("Money Owed"),decimal_places=2,max_digits=10, default=0.00)
  has_filled_profile = models.BooleanField(_("Has Filled Profile"), default=False)
  criteria = models.TextField(_("Criteria JSON (DONT FILL THIS)"), default='{"C": 0, "T": 0}')

  is_staff = models.BooleanField(default=False)
  is_superuser = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True)
  date_joined = models.DateTimeField(default=timezone.now)

  USERNAME_FIELD = 'roll_no'
  REQUIRED_FIELDS = ['email',]

  objects = UserManager()

  def __str__(self) -> str:
      return f"{self.roll_no}#{self.email}"


class UserRequest(models.Model):
  email = models.EmailField(_('email address'),unique=True, max_length=254)
  name = models.CharField(_('Name'), max_length=256,blank=False)
  department = models.CharField(_('Department'),max_length=10,blank=False, choices=DEPARTMENTS)
  semester = models.SmallIntegerField(_("Semester"),blank=False)
  phone_no = models.CharField(_("Phone Number"),blank=False,  max_length=32)
  college = models.CharField(_("College"), max_length=256,blank=False)
  is_approved = models.BooleanField(_("Is Approved"), default=False)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['email','name', 'department', 'semester', 'phone_no', 'college']


@receiver(post_save, sender=UserRequest)
def make_user_when_approved(sender, instance, created, **kwargs):
  if not created:
    if instance.is_approved:
      u = [1]
      while len(u) > 0:
        new_roll_no = make_roll_no()
        u = User.objects.filter(roll_no=new_roll_no)

      user = User(
        roll_no=new_roll_no,
        email=instance.email,
        name=instance.name,
        department=instance.department,
        semester=instance.semester,
        college=instance.college,
        phone_no=instance.phone_no,
        is_from_fcrit=False
      )
      user.save()


class Participation(models.Model):
  part_id = models.CharField(_("Participation Id"), default=uuid4,max_length=36, unique=True, primary_key=True)
  team_name = models.CharField(_("Team Name"), max_length=256,blank=False)
  event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="participants")
  members = models.ManyToManyField(User, related_name='participations')
  transaction_id = models.CharField(_("Transactions Id"), max_length=36, blank=True, null=True)
  is_paid = models.BooleanField(_("Is Paid"), default=False)
  is_verified = models.BooleanField(_("Is Verified"), default=False)


  def __str__(self) -> str:
    return f"{self.team_name}#{self.part_id}"


# POST_SAVE after getting verified and increment event seats
@receiver(post_save, sender=Participation)
def update_seats(sender, instance, created, **kwargs):
  def update_criteria(user: User, event: Event) -> User:
    user_criteria = json.loads(user.criteria)
    user_criteria[event.category] = user_criteria[event.category] + 1
    user.criteria = json.dumps(user_criteria)
    return user

  print("post save bruh")
  if not created:
    if instance.is_paid and instance.is_verified:
      event = instance.event
      # Inc Event Seats
      event.seats += 1
      event.save()

      # Update Student Criteria
      if event.team_size > 1:
        # Team
        for m in instance.members.all():
          m = update_criteria(m, event)
          m.save()
      else:
        # Solo
        user = instance.members.first()
        user = update_criteria(user, event)
        user.save()
