from django.contrib import admin
from .models import Account, LastSeen, Contact, Message
# Register your models here.

admin.site.register(Account)
admin.site.register(LastSeen)
admin.site.register(Contact)
admin.site.register(Message)
