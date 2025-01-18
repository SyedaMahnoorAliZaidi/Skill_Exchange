from django.shortcuts import render, redirect

#from .forms import ExpertForm, CustomerForm

from django.contrib.auth.hashers import  make_password
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import ExpertSerializer, CustomerSerializer

def user_view(request):
    return render(request, 'user_form.html')

class CreateUserAPIView(APIView):
    def post(self, request):
        role = request.data.get("role")
        if role:
            role = role.strip().capitalize()  # Normalize role (e.g., "expert" -> "Expert")

        print("Normalized role:", role)
        password = request.data.get("password")

        # Hash the password
        hashed_password = make_password(password)

        if role == "Expert":
            serializer = ExpertSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(password=hashed_password)  # Save with hashed password
                return Response({"message": "Expert created successfully"}, status=status.HTTP_201_CREATED)

        elif role == "Customer":
            serializer = CustomerSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save(password=hashed_password)  # Save with hashed password
                return Response({"message": "Customer created successfully"}, status=status.HTTP_201_CREATED)

        else:
            return Response({"error": "Invalid role"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



