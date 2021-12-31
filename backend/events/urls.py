from .views import EventDetailVIew, EventListView, EventRegiterView, EventUnregister
from django.urls import path

urlpatterns = [
    path('', EventListView.as_view()),
    path('register/', EventRegiterView.as_view()),
    path('unregister/', EventUnregister.as_view()),
    path('<str:event_code>/', EventDetailVIew.as_view()),
]
