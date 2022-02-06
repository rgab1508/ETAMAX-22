from rest_framework import serializers
from rest_framework.settings import import_from_string

from transactions.serializers import TransactionSerializer

from .models import User, Participation, UserRequest
from events.serializers import EventSerializer2


class UserSerializer2(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = [ 'roll_no', 'name']

class ParticipationSerializer2(serializers.ModelSerializer):
  event = EventSerializer2(read_only=True)
  members = UserSerializer2(read_only=True, many=True)
  transaction = TransactionSerializer(read_only=True)
  class Meta:
    model = Participation
    fields = [ 'part_id', 'team_name', 'members', 'is_verified', 'event', 'transaction']

class ParticipationSerializer(serializers.ModelSerializer):
  event = EventSerializer2(read_only=True)
  transaction = TransactionSerializer(read_only=True)
  class Meta:
    model = Participation
    fields = [ 'part_id', 'team_name', 'is_verified', 'event', 'transaction', 'members']

class UserSerializer(serializers.ModelSerializer):
  participations = ParticipationSerializer(many=True, read_only=True)
  class Meta:
    model = User
    fields = [ 'roll_no', 'email', 'password', 'name', 'avatar', 'department', 'semester', 'money_owed', 'has_filled_profile', 'phone_no', 'date_joined', 'participations', 'criteria']
    extra_kwargs = {
      'password': {'write_only': True},
    }

  def create(self, validated_data):
    password = validated_data.pop('password', None)
    instance = self.Meta.model(**validated_data)
    if password is not None:
      instance.set_password(password)
    instance.save()
    return instance

class UserRequestSerializer(serializers.ModelSerializer):
  class Meta:
    model = UserRequest
    fields = ['name', 'email', 'phone_no', 'department', 'semester', 'college']