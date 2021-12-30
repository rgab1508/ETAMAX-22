from django.contrib import admin

from .models import Transaction

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
  search_fields = ['transaction_id']
  list_display = ['transaction_id', 'timestamp', 'verified', 'order_payment_id', 'status', 'amount']
  list_filter = ['verified', 'status']
  ordering = ['-timestamp']