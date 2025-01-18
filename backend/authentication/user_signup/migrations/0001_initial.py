# Generated by Django 5.1.4 on 2025-01-08 20:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('role', models.CharField(default='User', max_length=10)),
                ('firstname', models.CharField(max_length=100)),
                ('lastname', models.CharField(max_length=100)),
                ('cnic', models.CharField(max_length=50)),
                ('gender', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Expert',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('role', models.CharField(default='Expert', max_length=10)),
                ('firstname', models.CharField(max_length=100)),
                ('lastname', models.CharField(max_length=100)),
                ('cnic', models.CharField(max_length=50)),
                ('gender', models.CharField(max_length=10)),
                ('domain', models.CharField(max_length=255)),
                ('years_of_experience', models.PositiveIntegerField()),
                ('availability', models.TextField()),
            ],
        ),
    ]
