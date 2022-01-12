from django.contrib import admin
from django import forms

from .models import Transaction
from users.models import Participation


class TransactionForm(forms.ModelForm):
  class Meta:
    model = Transaction
    fields = '__all__'
  
  participations = forms.ModelMultipleChoiceField(queryset=Participation.objects.all())

  def __init__(self, *args, **kwargs):
    super(TransactionForm, self).__init__(*args, **kwargs)
    if self.instance:
      self.fields['participations'].initial = self.instance.participations.all()

  #   def save(self, *args, **kwargs):
  #     # FIXME: 'commit' argument is not handled
  #     # TODO: Wrap reassignments into transaction
  #     # NOTE: Previously assigned Foos are silently reset
  #     instance = super(TransactionForm, self).save(commit=False)
  #     self.fields['participations'].initial.update(transaction=None)
  #     self.cleaned_data['participations'].update(transaction=instance)
  #     return instance
@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
  form = TransactionForm
  search_fields = ['transaction_id', 'upi_transaction_id']
  list_display = ['transaction_id', 'upi_transaction_id', 'timestamp', 'is_verified',  'event_amount', 'donation_amount', 'total_amount', 'is_paid',]
  list_filter = ['is_verified', 'is_paid']
  ordering = ['-timestamp']