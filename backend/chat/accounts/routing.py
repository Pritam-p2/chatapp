from django.urls import re_path,path

from . import consumers

websocket_urlpatterns = [
    path("initials/backend/<str:userPart>/", consumers.BackendConsumer.as_asgi()),
    path("chatroom/<str:room_name>/", consumers.ChatConsumer.as_asgi()),
    # re_path(r"newuser/(?P<room_name>\w+)/$", consumers.ChatConsumer.as_asgi()),
    # re_path(r"newuser/entry_room/", consumers.ChatConsumer.as_asgi()),
    re_path(r"lastseen/universal/", consumers.LastSeenConsumer.as_asgi()),
    

]