# Generated by Django 5.0.2 on 2024-03-06 13:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0008_alter_contact_friend_alter_contact_me'),
    ]

    operations = [
        migrations.AddField(
            model_name='contact',
            name='name',
            field=models.CharField(default=None, max_length=255),
        ),
    ]