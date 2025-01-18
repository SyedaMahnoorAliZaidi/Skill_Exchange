

from django.urls import path
from .views import CreateUserAPIView,user_view

urlpatterns = [
   path('create_user/', CreateUserAPIView.as_view(), name='create_user'),
   path('user/', user_view, name='user'),
]