from django.urls import path
from .views import RegisterView, AnonymousView,Profile_pic_upload, User_details, EmailViews, ContactViews,Email_detail,AllContactEmailViews,ChatsViews,BioName,AllUsersView



urlpatterns = [
    path('all/',AllUsersView),
    path('register/',RegisterView.as_view()),
    path('anonymous/',AnonymousView.as_view()),
    path('email/',Email_detail),
    path('pic/', Profile_pic_upload),
    path('details/', User_details),
    path('registered_emails/', EmailViews),
    path('contacts/',ContactViews),
    path('contact/emails/',AllContactEmailViews),
    path('chats/',ChatsViews),
    path('name/bio/',BioName)

 
    
]