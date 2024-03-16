from .models import Account, LastSeen, Contact
from rest_framework.serializers import ModelSerializer, as_serializer_error
from django.contrib.auth.password_validation import validate_password    # for django inbuilt password
from django.core import exceptions
from rest_framework import serializers

class AccountCreateSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ('first_name','last_name','email','password')

    # def validate(self,data):
    #     user = Account(**data)
    #     password = data.get('password')
    #     try:
    #         validate_password(password,user)
    #     except exceptions.ValidationError as e:
    #         serializers_errors = as_serializer_error(e)
    #         raise exceptions.ValidationError(
    #             {'password': serializers_errors['non_field_errors']}
    #         )
    #     return data

    def create(self,validated_data):
        user = Account.objects.create_user(
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name'],
            email = validated_data['email'],
            password = validated_data['password']
        )
        return user
    
class AccountSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ('first_name','last_name','email') 

class AllSerializer(ModelSerializer):
    profile_img = serializers.SerializerMethodField()
    class Meta:
        model = Account
        fields = ('first_name','last_name','email','profile_img')      
    def get_profile_img(self, obj):
        if obj.image:
            return obj.image.url
        return None         

class UserDetailsSerializer(ModelSerializer):
    profile_img = serializers.SerializerMethodField()
    class Meta:
        model = Account
        fields = ('first_name','last_name','email','about','profile_img')      
    def get_profile_img(self, obj):
        if obj.image:
            return obj.image.url
        return None       

class ProfileImageSerializer(ModelSerializer):
    image_url = serializers.SerializerMethodField()
    class Meta:
        model = Account
        fields = ('image_url',)
    def get_image_url(self, obj):
        if obj.image:
            return obj.image.url
        return None       

class ContactSerializer(ModelSerializer):
    class Meta:
        model= Contact      
        fields = ['friend','me','name'] 

class EmailSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ['email']


# class BookSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Book
#         fields = ['title', 'cover']        