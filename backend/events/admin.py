from django.contrib import admin
from django.db import models
from django.db.models import F
from martor.models import MartorField
from martor.admin import AdminMartorWidget
# from django_markdown.models import MarkdownField
# from django_markdown.widgets import AdminMarkdownWidget

from .models import Event

class SeatsFilterList(admin.SimpleListFilter):

    title = 'Seats'
    parameter_name = 'seats'

    def lookups(self, request, model_admin):
        
        return (
            ('FULL', 'Seats Full'),
            ('VACENT', 'Seats Vacant'),
        )

    def queryset(self, request, queryset):
        if self.value() == 'FULL':
            return queryset.filter(seats=F('max_seats'))
        if self.value() == 'VACANT':
            return queryset.filter(seats__lte=F('max_seats'))

@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
  list_filter = ('day', 'category', SeatsFilterList)
  search_fields = ('event_code', 'title', 'description', )
  formfield_overrides = {MartorField: {'widget': AdminMartorWidget}}