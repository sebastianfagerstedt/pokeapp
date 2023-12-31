# Generated by Django 4.2.4 on 2023-08-25 14:27

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pokeapp', '0004_ability_rename_pokefig_poke_fig_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='PokeAbility',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('abilityname', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='pokeapp.ability')),
            ],
        ),
        migrations.AlterField(
            model_name='poke',
            name='ability',
            field=models.ManyToManyField(to='pokeapp.pokeability'),
        ),
    ]
