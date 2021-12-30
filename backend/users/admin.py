from django.contrib import admin
from django.http.response import HttpResponse
from django.template.defaultfilters import slugify
import csv

from .models import User, UserRequest , Participation


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
  list_filter = ('is_phone_no_verified', 'has_filled_profile') #'money_owed')
  search_fields = ('roll_no', 'name', 'email', 'phone_no')

@admin.register(UserRequest)
class UserRequestAdmin(admin.ModelAdmin):
  search_fields = ('name', 'email', 'phone_no')

@admin.register(Participation)
class ParticipationAdmin(admin.ModelAdmin):
  search_fields = ('part_id', 'team_name', 'transaction_id', 'members__name', 'members__roll_no', 'members__email', 'event__title')
  list_filter = ('is_verified', 'is_paid')

  actions = ['export_as_csv']

  @admin.action(description="Download Csv")
  def export_as_csv(self, request, queryset):
    model = queryset.model
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = 'attachment; filename=%s.csv' % slugify(model.__name__)
    writer = csv.writer(response)
    fields= None
    # Write headers to CSV file
    if fields:
        headers = fields
    else:
        headers = []
        for field in model._meta.fields:
            headers.append(field.name)
    writer.writerow(headers)
    # Write data to CSV file
    for obj in queryset:
      row = []
      for field in headers:
          if field in headers:
              val = getattr(obj, field)
              if callable(val):
                  val = val()
              row.append(val)

      writer.writerow(row)
    # Return CSV file to browser as download
    return response