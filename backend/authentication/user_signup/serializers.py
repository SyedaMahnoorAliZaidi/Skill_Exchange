from rest_framework import serializers
from .models import Expert, Customer

class ExpertSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expert
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
