# Generated by Django 4.2.4 on 2023-08-25 14:32

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pokeapp', '0005_pokeability_alter_poke_ability'),
    ]

    operations = [
        migrations.RenameField(
            model_name='pokeability',
            old_name='abilityname',
            new_name='name',
        ),
    ]
