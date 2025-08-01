from rest_framework import serializers
from .models import UserProfile

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model= UserProfile
        fields = ('id','username','email','phone_no','location')

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model= UserProfile
        fields = ('username','email','password','phone_no','location')
    def create(self,validate_data):
        user = UserProfile.objects.create_user(
            username = validate_data['username'],
            email = validate_data['email'],
            password = validate_data['password'],
            phone_no =validate_data['phone_no'],
            location =validate_data['location'],
        )
        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True,write_only=True)
    