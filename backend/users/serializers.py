from rest_framework import serializers
from rest_framework.settings import import_from_string

from .models import User, Participation
from events.serializers import EventSerializer2


class UserSerializer2(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = [ 'roll_no', 'name']

class ParticipationSerializer2(serializers.ModelSerializer):
  event = EventSerializer2(read_only=True)
  members = UserSerializer2(read_only=True, many=True)
  class Meta:
    model = Participation
    fields = [ 'part_id', 'team_name', 'members', 'transaction_id', 'is_paid', 'is_verified', 'event']

class ParticipationSerializer(serializers.ModelSerializer):
  event = EventSerializer2(read_only=True)
  class Meta:
    model = Participation
    fields = [ 'part_id', 'team_name', 'members', 'transaction_id', 'is_paid', 'is_verified', 'event']

class UserSerializer(serializers.ModelSerializer):
  participations = ParticipationSerializer(many=True, read_only=True)
  class Meta:
    model = User
    fields = [ 'roll_no', 'email', 'password', 'name', 'avatar', 'department', 'semester', 'money_owed', 'has_filled_profile', 'phone_no', 'date_joined', 'participations']
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
  
