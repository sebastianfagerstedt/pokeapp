from django.contrib import admin
from .models import Poke,Ability


# Register your models here.
class AbilitiesInLine(admin.TabularInline):
    model = Poke.abilities.through

class AbilityAdmin(admin.ModelAdmin):
    list_display = ('name','description')

class PokeAdmin(admin.ModelAdmin):
    inlines = [AbilitiesInLine, ]
    list_display = ['name','fig','gif','poketype','height']

admin.site.register(Poke, PokeAdmin)
admin.site.register(Ability,AbilityAdmin)