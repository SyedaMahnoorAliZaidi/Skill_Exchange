from django.contrib import admin

# Register your models here.
from .models import Expert, Customer

admin.site.register(Expert)
admin.site.register(Customer)