from django.db import models


# Create your models here.
class Territory(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return '%s %s' % (self.name)

class Coordinate(models.Model):
    territory = models.ForeignKey(Territory, on_delete=models.CASCADE)
    latitude = models.BooleanField(null=True,blank=True)
    longitude = models.BooleanField(null=True,blank=True)

    def __str__(self):
        return '%s %s' % (self.longitude, self.latitude)


    