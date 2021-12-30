from django.db import models
from django.utils.translation import ugettext_lazy as _
from uuid import uuid4

ORDER_STATUS = (
    ('PENDING', 'PENDING'),
    ('PAID', 'PAID'),
)

class Transaction(models.Model):
  transaction_id = models.CharField(_("Transaction Id"),max_length=36,default=uuid4, unique=True, primary_key=True)
  timestamp = models.DateTimeField(_("Timestamp"), auto_now_add=True)
  verified = models.BooleanField(_("Verified"), default=False)
  order_payment_id = models.CharField(max_length=100)
  status = models.CharField(max_length=100, choices=ORDER_STATUS,default='PENDING', )
  amount = models.DecimalField(max_digits=10, decimal_places=2)


  def __str__(self) -> str:
      return self.transaction_id