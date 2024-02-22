from rest_framework.views import APIView 
from rest_framework import permissions, status, authentication
from rest_framework.response import Response
# from django.contrib.auth import get_user_model
# User = get_user_model()
from .serializers import AccountCreateSerializer, AccountSerializer
from .models import Account

class RegisterView(APIView):
    def post(self,request):
        data = request.data
        serializer = AccountCreateSerializer(data = data)
        if not serializer.is_valid():
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
        user = serializer.create(serializer.validated_data)
        user = AccountSerializer(user)
        return Response(user.data,status=status.HTTP_201_CREATED)

# class RetrieveUserView(APIView):
#     permission_classes = [permissions.IsAuthenticated]
    
#     def get(self,request):
#         user = request.user
#         user = AccountSerializer(user)
#         return Response(user.data, status = status.HTTP_200_OK)    


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
        except:
            return Response({'data':''},status=status.HTTP_200_OK)

        return Response({'data':user},status=status.HTTP_200_OK)
