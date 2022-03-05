from django.db import models
from django.utils.translation import ugettext_lazy as _
from uuid import uuid4
from django.db.models.signals import post_save, pre_delete
from django.dispatch import receiver

class Transaction(models.Model):
  transaction_id = models.CharField(_("Transaction Id"),max_length=36,default=uuid4, unique=True, primary_key=True)
  upi_transaction_id = models.CharField(_("UPI Transaction Id"),max_length=36)
  timestamp = models.DateTimeField(_("Timestamp"), auto_now_add=True)
  event_amount = models.DecimalField(max_digits=10, decimal_places=2)
  donation_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
  total_amount = models.DecimalField(max_digits=10, decimal_places=2)
  is_paid = models.BooleanField(_("Paid"),default=False)
  is_verified = models.BooleanField(_("Verified"), default=False)
  user = models.ForeignKey('users.User', on_delete=models.CASCADE)


  def __str__(self) -> str:
      return self.transaction_id


@receiver(post_save, sender=Transaction)
def verify_participation_after_transaction_verified(sender, instance, created, **kwargs):
  if not created:
    if instance.is_verified:
      for participation in instance.participations.all():
        participation.is_verified = True
        participation.save()