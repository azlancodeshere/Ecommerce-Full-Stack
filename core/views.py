from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import HttpResponse

def create_admin(request):
    User = get_user_model()

    user, created = User.objects.get_or_create(username="admin")

    user.set_password("admin123") 
    user.is_staff = True
    user.is_superuser = True
    user.email = "admin@gmail.com"
    user.save()

    return HttpResponse("Admin reset done")
