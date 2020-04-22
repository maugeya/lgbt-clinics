from django.db import models


class Location(models.Model):
    latitude = models.DecimalField(max_digits=25, decimal_places=20)
    longitude = models.DecimalField(max_digits=25, decimal_places=20)

    def __str__(self):
        return '{},{}'.format(
            round(self.latitude, 10),
            round(self.longitude, 10)
        )

    def __eq__(self, other):
        return str(self) == str(other)
