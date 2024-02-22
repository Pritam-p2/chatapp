from .models import Account
from rest_framework.serializers import ModelSerializer, as_serializer_error
from django.contrib.auth.password_validation import validate_password
from django.core import exceptions

class AccountCreateSerializer(ModelSerializer):
    class Meta:
        model = Account
        fields = ('first_name','last_name','email','password')

    def validate(self,data):
        user = Account(**data)
        password = data.get('password')
        try:
            validate_password(password,user)
        except exceptions.ValidationError as e:
            serializers_errors = as_serializer_error(e)
            raise exceptions.ValidationError(
                {'password': serializers_errors['non_field_errors']}
            )
        return data

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
        fields = ('first_name','last_name','email',) 