
from rest_framework import serializers
from .models import Transaction

class TransactionSerializer(serializers.ModelSerializer):
  class Meta:
    model = Transaction
    fields = ['transaction_id', 'upi_transaction_id', 'timestamp', 'event_amount', 'donation_amount', 'total_amount', 'is_paid', 'is_verified']
