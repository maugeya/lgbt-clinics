from django.db import models
from location.models import Location

class Clinic(models.Model):
    name = models.CharField(max_length=250)
    clinic_code = models.CharField(max_length=50)
    address_1 = models.CharField(max_length=100)
    address_2 = models.CharField(max_length=100, null=True)
    town = models.CharField(max_length=100, null=True)
    county = models.CharField(max_length=100)
    postcode = models.CharField(max_length=100)
    url = models.URLField(max_length=250)
    location = models.ForeignKey(
        Location,
        related_name='location',
        null=True,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return self.name
