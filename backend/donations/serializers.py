from rest_framework import serializers
from .models import Donation

class DonationSerializer(serializers.ModelSerializer):
  class Meta:
    model = Donation
    fields = ['donation_id','transaction_id','timestamp','verified','order_payment_id','status','amount']