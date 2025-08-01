from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class UserProfile(AbstractUser):
    
    phone_no = models.CharField(max_length=10)
    location = models.TextField()

    def __str__(self):
        return self.username
