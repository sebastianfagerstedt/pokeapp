
from django.contrib import admin
from django.urls import path, include,re_path
from rest_framework import routers
from pokeapp import views


router = routers.DefaultRouter()
router.register(r'pokes', views.PokeView, 'pokeapp')
router.register(r'abilities', views.AbilityView, 'pokeapp')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('load_pokemon/', views.load_pokemon),
    path('load_abilities/', views.load_abilities),
    path('api/', include('pokeapp.urls')),

    
]

