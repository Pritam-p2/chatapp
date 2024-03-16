from rest_framework.views import APIView 
from rest_framework import permissions, status, authentication
from rest_framework.response import Response
# from django.contrib.auth import get_user_model
# User = get_user_model()
from .serializers import AccountCreateSerializer, AccountSerializer, ProfileImageSerializer, UserDetailsSerializer, EmailSerializer,ContactSerializer,AllSerializer
from .models import Account, LastSeen, Contact
from rest_framework.decorators import api_view, permission_classes, authentication_classes, parser_classes
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser

class RegisterView(APIView):
    def post(self,request):
        data = request.data
        serializer = AccountCreateSerializer(data = data)
        if not serializer.is_valid():
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
        user = serializer.create(serializer.validated_data)
        user = AccountSerializer(user)
        return Response(user.data,status=status.HTTP_201_CREATED)



@api_view(['GET','PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser])
def Profile_pic_upload(request):
    if request.method == "PUT":
        user = request.user
        user_obj = Account.objects.get(email=user.email)
        if not user_obj:
            return Response({'error':'user not found'},status = status.HTTP_404_NOT_FOUND)
        request.FILES['file'].name=str(user.id)+request.FILES['file'].name[request.FILES['file'].name.index('.'):]
        user_obj.image = request.FILES['file']
        user_obj.save()
        image_serializer = ProfileImageSerializer(user_obj)
        return Response(image_serializer.data,status=status.HTTP_200_OK)
        
    if request.method=='GET':
        user = request.user
        print("....................................")
        print(user)
        user_obj = Account.objects.get(email=user.email)
        if not user_obj:
            return Response({'error':'user not found'},status = status.HTTP_404_NOT_FOUND)
        image_serializer = ProfileImageSerializer(user)
        print(image_serializer.data)
        print("....................................")
        return Response(image_serializer.data,status=status.HTTP_200_OK)
        

@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def User_details(request):
    if request.method=='GET':
        user = request.user
        user_obj = Account.objects.get(email=user.email)
        if not user_obj:
            return Response({'error':'user not found'},status = status.HTTP_404_NOT_FOUND)
        user_serializer = UserDetailsSerializer(user)
        return Response(user_serializer.data,status=status.HTTP_200_OK)
    
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def AllUsersView(request):
    if request.method=='GET':
        user_objs = Account.objects.all()
        user_serializer = AllSerializer(user_objs,many=True)
        return Response(user_serializer.data,status=status.HTTP_200_OK)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def BioName(request):
    if request.method=='POST':
        email = request.data.get('friend_email')
        user_obj = Account.objects.get(email=email)
        if not user_obj:
            return Response({'error':'user not found'},status = status.HTTP_404_NOT_FOUND)
        return Response({'bio':user_obj.about,'name':user_obj.first_name +' '+user_obj.last_name},status=status.HTTP_200_OK)    
    
@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def ChatsViews(request):
    if request.method=='GET':
        me = request.GET.get('me')
        if me != request.user.email or len(request.GET) != 2:
            return Response(status=status.HTTP_403_FORBIDDEN) 
        friend = request.GET.get('friend')
        # user_obj = Account.objects.get(email=user.email)
        # if not user_obj:
        #     return Response({'error':'user not found'},status = status.HTTP_404_NOT_FOUND)
        # user_serializer = UserDetailsSerializer(user)
        return Response(status=status.HTTP_200_OK)    


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def Email_detail(request):
    if request.method=='GET':
        user = request.user.email
        if not user:
            return Response({'error':'user not found'},status = status.HTTP_404_NOT_FOUND)
        return Response({"email":user},status=status.HTTP_200_OK)


class AnonymousView(APIView):
    def post(self,request):
        data = request.data
        if len(data)==2:
            return Response({'error': 'something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
        if 'mail' not in data :
            return Response({'error': 'something went wrong'}, status=status.HTTP_400_BAD_REQUEST)
        anonymous_email = data.get('mail')

        try:
            user = Account.objects.get(email=anonymous_email)
            user_serializer = AccountSerializer(user)
        except:
            return Response({'data':''},status=status.HTTP_200_OK)

        return Response({'data':user_serializer.data},status=status.HTTP_200_OK)


@api_view(['POST','GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def EmailViews(request):
    if request.method=='GET':
        try:
            emails=Account.objects.values('email')
            regis_email = [items.get('email') for items in emails if items.get('email')!=request.user.email]
     
            return Response({'emails':regis_email},status=status.HTTP_200_OK)
        except:
            return Response({'error':'something went wrong'},status = status.HTTP_404_NOT_FOUND)
        
    if request.method == 'POST':
        friend_email = request.data.get('friend_email')
        name = request.data.get('inputName')
        if friend_email == request.user:
            return Response({'error':'something went wrong'},status = status.HTTP_404_NOT_FOUND)    
        friend_obj = Account.objects.filter(email=friend_email)[0]
        me_obj = Account.objects.filter(email=request.user.email)[0]
        if name != '':
            name = name.capitalize()
        data={'friend':friend_obj.id,'me':me_obj.id,'name':name}
        serializer = ContactSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data},status=status.HTTP_200_OK)
        else:
            return Response({'error':serializer.errors},status = status.HTTP_404_NOT_FOUND)    


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def ContactViews(request):
    if request.method=='GET':
        # try:
        accounts=Account.objects.filter(email=request.user.email)[0]
        c=Contact.objects.filter(me=accounts)
        arrays = []
        for items in c:
            if items.name != '':
                name = items.name
            else:
                name = items.friend.first_name + " "+items.friend.last_name

            d={}
            d["name"]=name
            d["email"]=items.friend.email
            if items.friend.image:
                d["profile_url"] = items.friend.image.url
            else:
                d["profile_url"] = ''    
            arrays.append(d)        
        return Response({'accounts':arrays},status=status.HTTP_200_OK)    
        # except:
        #     return Response({'error':'something went wrong'},status = status.HTTP_404_NOT_FOUND)           


@api_view(['GET'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def AllContactEmailViews(request):
    if request.method=='GET':
        # try:
        accounts=Account.objects.get(email=request.user.email)
        c=Contact.objects.filter(me=accounts)
        arrays = []
        for items in c:
            arrays.append(items.friend.email )        
        print(arrays)    
        return Response({'accounts':arrays,'my_email':accounts.email},status=status.HTTP_200_OK)    
        # except:
        #     return Response({'error':'something went wrong'},status = status.HTTP_404_NOT_FOUND) 