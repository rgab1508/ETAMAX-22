from django.urls import path
from .views import EventDetailView, EventFeaturedListView, EventListView, EventRegiterView, EventUnregister

urlpatterns = [
    path('', EventListView.as_view()),
    path('featured/', EventFeaturedListView.as_view()),
    path('register/', EventRegiterView.as_view()),
    path('unregister/', EventUnregister.as_view()),
    path('<str:event_code>/', EventDetailView.as_view()),
]
