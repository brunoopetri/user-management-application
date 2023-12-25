# myapp/admin.py
from django.contrib import admin
from myapp.models import User

class UserAdmin(admin.ModelAdmin):
    list_display = ['nome', 'cpf', 'email']
    search_fields = ['nome', 'cpf', 'email']
    list_per_page = 20

admin.site.register(User, UserAdmin)