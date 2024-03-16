import json
from .models import LastSeen, Account, Message, Contact
from channels.generic.websocket import AsyncWebsocketConsumer
from django.utils import timezone
from datetime import datetime, date
from asgiref.sync import sync_to_async
import jwt
from django.conf import settings
from channels.db import database_sync_to_async



class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        room = self.scope["url_route"]["kwargs"]["room_name"]
        self.room_group_name = room
        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        print("connected")
        await self.accept()
        await self.send_chats(room_name=self.room_group_name)

    @database_sync_to_async
    def get_messages_from_db(self,room_name):
        msg = Message.objects.filter(room_name=room_name)
        chats=[]
        if len(msg)>0:
            desired_time_zone = 'Asia/Kolkata'
            timezone.activate(desired_time_zone)
            for m in msg:    
                time = timezone.localtime(m.last_seen)
                lastseen_day = date.today().day - time.day  
                if lastseen_day== 0:
                    lastseen_da = 'today'
                elif lastseen_day == 1:
                    lastseen_da = 'Yesterday'
                else:
                    lastseen_da = time.day    
                
                t=0
                
                if time.hour<12:
                    t = str(time.hour)+':'+str(time.minute) + " am"
                else:
                    t = str(time.hour % 12)+':'+str(time.minute) +" pm"            
                
                
                
                    
                # print(lastseen.hour)
                # print(lastseen.minutes)
                # print(lastseen.seconds)
                chats.append({"sender":m.sender,"message":m.message,"last_seen":t,"msg_tag":lastseen_da})
        else:
            pass    
        return chats    
        

    async def send_chats(self, room_name):
        data_from_db = await self.get_messages_from_db(room_name=self.room_group_name)
        # Send message to WebSocket
        await self.send(text_data=json.dumps({"message": data_from_db,"type":"chats"}))




    async def disconnect(self, close_code):
        # Leave room group
        print("disconnect")
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        self.message = text_data_json["msg"]
        self.sender = text_data_json["email"]
        self.receiver = text_data_json["receiver"]
        await self.save_msg(email = self.sender,receiver=self.receiver,message = self.message)
        desired_time_zone = 'Asia/Kolkata'
        timezone.activate(desired_time_zone)
        time = timezone.localtime(timezone.now())
        t=0
        if time.hour<12:
            t = str(time.hour)+':'+str(time.minute) + " am"
        else:
            t = str(time.hour % 12)+':'+str(time.minute) +" pm"   
        #Send message to room group
        await self.send(text_data=json.dumps({"type": "chatsMSG", "message": self.message,"sender":self.sender,"last_seen":str(t),"msg_tag":'today'}))

    @sync_to_async
    def save_msg(self,email,receiver,message):
        msg = Message.objects.create(sender=email,message=message,receiver = receiver,last_seen=timezone.now(),room_name=self.room_group_name)
        msg.save()

    # # Receive message from room group
    # async def chat_message(self, event):
    #     message = event["message"]
    #     sender = event["sender"]
    #     # Send message to WebSocket
    #     await self.send(text_data=json.dumps({"message": message,"sender":sender,"time":str(timezone.now())}))

   

     


class BackendConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        room = self.scope["url_route"]["kwargs"]["userPart"]
        self.room_group_name = room
        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        await self.accept()
        await self.send_chats()

    @database_sync_to_async
    def get_messages_from_db(self):
        msg = Message.objects.filter(receiver=self.room_group_name+"@gmail.com")
        if(len(msg)==0):
            return ''
        my_obj = Account.objects.get(email=self.room_group_name+"@gmail.com")
        buffer_email=''
        datas = []
        for value in reversed(msg):
            if buffer_email != value.sender:
                buffer_email = value.sender
                friend_obj = Account.objects.get(email=buffer_email)
                print(friend_obj.email)
                try:
                    c = Contact.objects.filter(me=my_obj,friend=friend_obj)[0]
                except:    
                    c=Contact.objects.filter(me=friend_obj,friend=my_obj)[0]
                name = ''
                if c.name:
                    name = c.name
                else:
                    name = friend_obj.first_name + ' '+ friend_obj.last_name
                pic = ''    
                if(friend_obj.image):
                    pic = friend_obj.image.url
                    datas.append({"sender":value.sender,"msg":value.message,'time':str(value.last_seen),"profile":pic,"name":name})    
                else:
                    datas.append({"sender":value.sender,"msg":value.message,'time':str(value.last_seen),"name":name})      
        return {"senders_msgs":datas}    
        
    async def send_chats(self):
        data_from_db = await self.get_messages_from_db()
        # Send message to WebSocket
        if data_from_db != '':
            await self.send(text_data=json.dumps({"sender_msg": data_from_db["senders_msgs"],"type":"initial"}))
        else:
            await self.send(text_data=json.dumps({"type":"New_User"}))



    async def disconnect(self, close_code):
        # Leave room group
        print("disconnect")
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from WebSocket
    # async def receive(self, text_data):
    #     text_data_json = json.loads(text_data)
    #     if text_data_json['type']=='get_pics_name':
    #         data_from_db = await self.get_pic_from_db(text_data_json["emails"])
    #         await self.send(text_data=json.dumps({"type": "got_pics_name","email":text_data_json["emails"], "pic": data_from_db[0],"name":data_from_db[1]}
    #         ))
            


        # self.message = text_data_json["msg"]
        # self.sender = text_data_json["email"]
        # await self.save_msg(email = self.sender,message = self.message)
        #Send message to room group
        # await self.channel_layer.group_send(
        #     self.room_group_name, {"type": "chat_message", "message": self.message,"sender":self.sender}
        # )

    # @database_sync_to_async
    # def get_pic_from_db(self,email):
    #     friend_obj = Account.objects.get(email=email)
    #     my_obj =Account.objects.get(email = self.room_group_name+"@gmail.com")
    #     c=Contact.objects.filter(me=my_obj,friend=friend_obj)[0]
    #     name = ''
    #     if not c.name:
    #         name = friend_obj.First_name + ' '+friend_obj.last_name
    #     else:
    #         name = c.name    
    #     if(friend_obj.image.url):
    #         return (friend_obj.image.url,name)
    #     return ('',name)
             

    # @sync_to_async
    # def save_msg(self,email,message):
    #     msg = Message.objects.create(email=email,message=message,last_seen=timezone.now(),room_name=self.room_group_name)
    #     msg.save()

    # Receive message from room group
    # async def chat_message(self, event):
    #     message = event["message"]
    #     sender = event["sender"]
    #     # Send message to WebSocket
    #     await self.send(text_data=json.dumps({"message": message,"email":sender,"time":str(timezone.now())}))





class LastSeenConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_group_name = "universal_room"
        # Join room group
        await self.channel_layer.group_add(self.room_group_name, self.channel_name)
        print("connected")
        await self.accept()

    async def disconnect(self, close_code):
        # Leave room group
        print("disconnect")
        
        await self.channel_layer.group_discard(self.room_group_name, self.channel_name)

    # Receive message from room group
    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        decoded_token = jwt.decode(text_data_json["token"], settings.SECRET_KEY, algorithms=['HS256'])
        id = decoded_token.get('user_id')
        self.user_id = id
        await self.save_last_seen(user_id = self.user_id)

    @sync_to_async
    def save_last_seen(self,user_id):
        user_obj = Account.objects.get(id=user_id)
        lastseen_user = LastSeen.objects.filter(account=user_obj)
        if len(lastseen_user)==1:
            lastseen_user[0].last_seen = timezone.now()
            lastseen_user[0].save()
        else:
            print("only one user is expected")
                   