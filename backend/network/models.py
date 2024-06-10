from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='UserPost')
    post = models.TextField()
    timestamp = models.DateTimeField(auto_now=True)
    
class UserLike(models.Model):
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='UserLiked')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='PostLiked')