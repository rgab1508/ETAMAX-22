from rest_framework.permissions import BasePermission

class IsProfileFilled(BasePermission):
  message = 'Profile Not Filled or Phone Number Not Verified'
  def has_permission(self, request, view):
    return request.user.is_phone_no_verified and request.user.has_filled_profile