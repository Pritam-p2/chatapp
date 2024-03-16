# Generated by Django 5.0.2 on 2024-03-03 15:44

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0006_alter_lastseen_last_seen'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('friend', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='friend', to=settings.AUTH_USER_MODEL)),
                ('me', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='me', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('friend', 'me')},
            },
        ),
    ]