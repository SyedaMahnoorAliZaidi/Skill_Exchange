from django.db import models

# Create your models here.

class Expert(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=10, default="Expert")
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    cnic = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)
    domain = models.CharField(max_length=255)
    years_of_experience = models.PositiveIntegerField()
    availability = models.TextField()

    def __str__(self):
        return self.email

class Customer(models.Model):
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=128)
    role = models.CharField(max_length=10, default="User")
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    cnic = models.CharField(max_length=50)
    gender = models.CharField(max_length=10)

    def __str__(self):
        return self.email