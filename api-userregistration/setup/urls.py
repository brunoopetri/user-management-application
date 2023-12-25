# setup/urls.py
from django.contrib import admin
from django.urls import path, include
from myapp.views import UserViewSet
from rest_framework import routers
from myapp.views import UserViewSet

router = routers.DefaultRouter()
router.register('users', UserViewSet, basename='user')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
]

