from django.shortcuts import render


from rest_framework import generics , status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

from rest_framework_simplejwt.tokens import RefreshToken
from .models import UserProfile
from .serializer import RegisterSerializer, LoginSerializer ,UserSerializer
from django.contrib.auth import authenticate

# Create your views here.
class RegisterView(APIView):
    
    def post(self,request):

        email = request.data.get("email")
        print(request.data)

        #FIlter email
        email_exist = UserProfile.objects.filter(email=email).exists()

        if email_exist:
            return Response({'message':'Email is already used for another account','email_exist':True},status=status.HTTP_400_BAD_REQUEST)

        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():

            if not email_exist:
                serializer.save()
                return Response(serializer.data,status=status.HTTP_201_CREATED) 
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)



class LoginView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self,request, *args , **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username,password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            user_serializer = UserSerializer(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_serializer.data,
            },status=status.HTTP_200_OK)
        else:
            return Response({ 'detail':'Invalid Credentials'},status=401)

class DashboardView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self,request):
        user = request.user
        user_serializer = UserSerializer(user)

        return Response({
            'message':"Welcome to Dashboard",
            'user':user_serializer.data
            },status=200)


class DisplayUsers(APIView):

    permission_classes = (IsAuthenticated,)
    
    def get(self,request):
        users = UserProfile.objects.all()  
        serializer = UserSerializer(users,many=True) 
        return Response({ 
            "message":"All users",
            "users":serializer.data
        },status=200)

