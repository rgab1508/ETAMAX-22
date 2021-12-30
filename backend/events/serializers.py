from rest_framework import serializers
from .models import Event

class EventSerializer(serializers.ModelSerializer):
  class Meta:
    model = Event
    fields = ['event_code','day','start','end','title', 'description','whatsapp_link','image','seats','max_seats', 'category','is_seminar', 'team_size', 'is_team_size_strict', 'entry_fee', 'prize_money']


class EventSerializer2(serializers.ModelSerializer):
  class Meta:
    model = Event
    fields = ['event_code','day','start','end','title','image', 'category', 'team_size', 'entry_fee', ]
