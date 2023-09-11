from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import Poke,Ability

# from .models import PokeAbility



class AbilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Ability
        fields = ('id','name','description')

class PokeSerializer(serializers.ModelSerializer):
    abilities = AbilitySerializer(many=True)
    class Meta:
        model = Poke
        fields = ('id','name','fig','gif','poketype','height','abilities')

# class UserSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = get_user_model()  # Use get_user_model() to ensure the correct User model is used
#         fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined')
