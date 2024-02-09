
from django.db import models
from django.contrib.auth.models import AbstractUser

class Emotions(models.Model):
    emotion_name = models.CharField(max_length=50)


class Images(models.Model):
    image_data = models.ImageField(upload_to='images/')     
    captured_at = models.TimeField(auto_now_add=True) 
    # emotion_detected = models.CharField(max_length=50 )
    # confidence_score = models.FloatField(max_length=20 )



class Users(models.Model):
    username = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    password = models.CharField(max_length=150) 
    created_at = models.TimeField(auto_now_add=True)
    # last_login = models.TimeField()
   