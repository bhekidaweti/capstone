from django.db import models

# Create your models here.

class Country(models.Model):
    name = models.CharField(max_length=200)
    flag = models.ImageField(upload_to='flags/')

    def __str__(self):
        return self.name
