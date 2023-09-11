from __future__ import unicode_literals
from django.db import models
from django.utils import timezone
from django.contrib.auth.models import (
    AbstractBaseUser, PermissionsMixin, BaseUserManager
)

# Create your models here.

class Ability(models.Model):
    name = models.CharField(max_length=120,null=True)
    description = models.TextField(null=True)

    def _str_(self):
        return self.name

class Poke(models.Model):
    name = models.CharField(max_length=120,null=True)
    fig = models.CharField(max_length=120,null=True)
    gif = models.CharField(max_length=120,null=True)
    poketype = models.CharField(max_length=120,null=True)
    height = models.IntegerField(null=True)
    abilities = models.ManyToManyField(Ability, through='PokeAbility')
    
    def __str__(self):
        return self.name

class PokeAbility(models.Model):
    ability = models.ForeignKey(Ability,null=True, on_delete=models.CASCADE)
    pokemon = models.ForeignKey(Poke,null=True, on_delete=models.CASCADE)

