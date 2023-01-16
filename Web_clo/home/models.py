from django.db import models

# Create your models here.
class seller(models.Model):
    sname = models.CharField(default='nam banh boi', max_length=50)
    saddress = models.CharField(default='thai binh', max_length=200)
    sphone = models.IntegerField(default='235273')
    sdate = models.DateTimeField(auto_now=True, null=True, blank=True)
    
class product(models.Model):
    img = models.ImageField(upload_to='media/')
    name = models.CharField(max_length=100)
    infor = models.CharField(max_length=500)
    price = models.CharField(max_length=50)
    datetime = models.DateTimeField(auto_now=True, null=True, blank=True)
    datetime_update = models.DateTimeField(auto_now=True, null=True, blank=True)

class buyer(models.Model):
    bname = models.CharField(max_length=50)
    baddress = models.CharField(max_length=200)
    bphone = models.IntegerField()
    bdate = models.DateTimeField(auto_now_add=True)

