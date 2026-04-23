from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.http import HttpResponse

# Create your views here.

def create_admin(request):
    User = get_user_model()
    if not User.objects.filter(username="admin").exists():
        User.objects.create_superuser("admin", "admin@gmail.com", "admin123")
        return HttpResponse("Superuser created")
    return HttpResponse("Already exists")