from django.contrib import admin

from .models import Donation


@admin.register(Donation)
class DonationAdmin(admin.ModelAdmin):
  search_fields = ['donation_id', 'name', 'amount', 'message']
  list_display = ['donation_id', 'name', 'message', 'approved', 'timestamp', 'verified', 'order_payment_id', 'status', 'amount']
  list_filter = ['verified', 'status']
  ordering = ['-timestamp']