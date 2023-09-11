from django.shortcuts import render
from rest_framework import viewsets, status

from django.http import JsonResponse
from .serializers import PokeSerializer,AbilitySerializer
from .models import Poke,Ability,PokeAbility
import requests

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated,AllowAny

from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken


def load_abilities(request):
    url = f'https://pokeapi.co/api/v2/ability/?limit=400&offset=0'
    abilityAPI = requests.get(url)
    data = abilityAPI.json()
    for ability in data["results"]:
        description = " "
        abilityDataAPI = requests.get(ability['url'])
        abilityData = abilityDataAPI.json()
        for effects in abilityData["effect_entries"]:

            if ( effects["language"]["name"] == "en"):
                description = effects["effect"]
                break

        Ability.objects.create(name=abilityData['name'], description=description)
    
    return JsonResponse(data)

def load_pokemon(request):
    url = f'https://pokeapi.co/api/v2/pokemon?limit=50&offset=0'
    pokeAPI = requests.get(url)
    data = pokeAPI.json()
    for pokemon in data["results"]:
        pokeDataAPI = requests.get(pokemon['url'])
        pokeData = pokeDataAPI.json()
        Poke.objects.create(name=pokeData["name"], fig=pokeData['sprites']['other']['home']['front_default'],gif=pokeData['sprites']['versions']['generation-v']['black-white']['animated']['front_default'],poketype=pokeData['types'][0]['type']['name'], height=pokeData['height'])
        
        for ability in pokeData["abilities"]:
            PokeAbility.objects.create(pokemon=Poke.objects.get(name=pokeData["name"]),ability=Ability.objects.get(name=ability["ability"]["name"]))

    return JsonResponse(data)

# Create your views here.

class PokeView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = PokeSerializer
    queryset = Poke.objects.all()


class AbilityView(viewsets.ModelViewSet):
    permission_classes = (IsAuthenticated,)
    serializer_class = AbilitySerializer
    queryset = Ability.objects.all()

class LogoutView(APIView):
     permission_classes = (IsAuthenticated,)
     def post(self, request):
        try:
            refresh_token = request.data["refreshToken"]
            if not refresh_token:
                raise ValueError("No refresh token")

            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            print("Error: ",e)
            return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        firstname = request.data.get('firstname')
        lastname = request.data.get('lastname')
        email = request.data.get('email')
        if not username or not password:
            return Response({'msg': 'Username and password are required.'}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            user = User.objects.create_user(username=username, password=password, first_name=firstname,last_name=lastname,email=email )
        except Exception as e:
            return Response({'msg': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'msg': 'User registered successfully.'}, status=status.HTTP_201_CREATED)