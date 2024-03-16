from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from django.utils import timezone
import uuid
from django.db.models.signals import post_save
from django.dispatch import receiver

class AccountManager(BaseUserManager):
    def create_user(self,email,first_name,last_name,password):
        if not email:
            return ValueError("users must have an email address")
        if not first_name:
            return ValueError("users must have a first name")
        if not last_name:
            return ValueError("users must have a last name")
        if not password:
            return ValueError("Password is required")
        email = self.normalize_email(email)
        last_name = last_name.capitalize()
        first_name = first_name.capitalize()
        email = email.lower()
        user = self.model(email=email,first_name=first_name,last_name=last_name)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self,email,first_name,last_name,password):
        user = self.create_user(email,first_name,last_name,password)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class Account(AbstractBaseUser,PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=255,blank=False,null=False)
    last_name = models.CharField(max_length=255,blank=False,null = False)
    about = models.TextField(max_length=255,blank=True,null = True)
    image = models.ImageField(upload_to='profile_photos/')
    joining_date = models.DateField(default=timezone.now)
    is_active = models.BooleanField(default = True)
    is_staff = models.BooleanField(default = False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name','last_name']

    objects = AccountManager()


class LastSeen(models.Model):
    last_seen = models.DateTimeField(null=True,blank = True)   
    account = models.ForeignKey(Account, on_delete=models.DO_NOTHING)
    class Meta:
        unique_together = ('last_seen', 'account')
        
@receiver(post_save, sender=Account)
def your_model_post_save(sender, instance, **kwargs):
    # Your custom logic or tasks to be performed after save
    LastSeen.objects.create(account = instance)

class Contact(models.Model):
    friend = models.ForeignKey(Account, on_delete=models.DO_NOTHING, related_name='friend')  
    me = models.ForeignKey(Account, on_delete=models.DO_NOTHING, related_name='me')
    name = models.CharField(max_length=255,null = True, blank=True)
    class Meta:
        unique_together = ('friend', 'me')

    def save(self, *args, **kwargs):
        if self.friend == self.me:
            return ValueError("This is not possible")
        super(Contact, self).save(*args, **kwargs)        

class Message(models.Model):
    sender = models.EmailField(null=False,blank=False, default='')   # sender email
    receiver = models.EmailField(null=False,blank=False,default='')
    message = models.CharField(max_length = 255, null=False, blank=False,default='')   
    last_seen = models.DateTimeField(null=True,blank = True,default=timezone.now)
    room_name = models.CharField(max_length=255,null=False,blank=False,default='')
 