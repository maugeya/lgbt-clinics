# Generated by Django 3.0.5 on 2020-04-23 13:53

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Location',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('latitude', models.DecimalField(decimal_places=20, max_digits=25)),
                ('longitude', models.DecimalField(decimal_places=20, max_digits=25)),
            ],
        ),
    ]
