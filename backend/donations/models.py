from django.db import models
from uuid import uuid4
from django.utils.translation import ugettext_lazy as _


ORDER_STATUS = (
    ('PENDING', 'PENDING'),
    ('PAID', 'PAID'),
)

class Donation(models.Model):
  donation_id = models.CharField(_("Donation Id"),max_length=36,default=uuid4, unique=True, primary_key=True)
  name = models.CharField(max_length=256, blank=False)
  message = models.TextField(blank=True)
  approved = models.BooleanField(default=False)
  timestamp = models.DateTimeField(_("Timestamp"), auto_now_add=True)
  verified = models.BooleanField(_("Verified"), default=False)
  order_payment_id = models.CharField(max_length=100)
  status = models.CharField(max_length=100, choices=ORDER_STATUS,default='PENDING', )
  amount = models.DecimalField(max_digits=10, decimal_places=2)

  def __str__(self) -> str:
    return f"{self.donation_id}#{self.name}-{self.amount}"