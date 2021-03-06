# Generated by Django 3.0.5 on 2020-04-25 13:55

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('location', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Clinic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=250)),
                ('clinic_code', models.CharField(max_length=50)),
                ('address_1', models.CharField(max_length=100)),
                ('address_2', models.CharField(max_length=100, null=True)),
                ('town', models.CharField(max_length=100, null=True)),
                ('county', models.CharField(max_length=100)),
                ('postcode', models.CharField(max_length=100)),
                ('url', models.URLField(max_length=250)),
                ('location', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='location', to='location.Location')),
            ],
        ),
    ]
