from django.contrib import admin
from .models import CustomUser, QueryHistory

admin.site.register(CustomUser)
admin.site.register(QueryHistory)
