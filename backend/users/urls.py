from django.urls import path
from .views import  RegisterView, LoginView, LogoutView, OTPVerify, UserDetail, UserCriteria, UserRequestView, UserUpdate, UserCheckout , MakeUsersView, UserExistsView, UserCartUpdate, UserAvatarUpdate, UserRequest #, TeamList

urlpatterns = [
    path('auth/register/', RegisterView.as_view()),
    path('auth/login/', LoginView.as_view()),
    path('auth/logout/', LogoutView.as_view()),
    path('auth/otp-verify/', OTPVerify.as_view()),
    path('me/', UserDetail.as_view()),
    path('criteria/', UserCriteria.as_view()),
    path('update/', UserUpdate.as_view()),
    path('checkout/',UserCheckout.as_view()),
    path('make/', MakeUsersView.as_view()),
    path('exists/', UserExistsView.as_view()),
    path('cart/update/', UserCartUpdate.as_view()),
    path('avatar/update/', UserAvatarUpdate.as_view()),
    path('request/', UserRequestView.as_view())
    # path('get/teams/bruh55/', TeamList.as_view())
]
