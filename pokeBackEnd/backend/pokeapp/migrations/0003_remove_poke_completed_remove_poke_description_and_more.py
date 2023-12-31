# Generated by Django 4.2.4 on 2023-08-25 11:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokeapp', '0002_rename_pokeapp_poke'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='poke',
            name='completed',
        ),
        migrations.RemoveField(
            model_name='poke',
            name='description',
        ),
        migrations.RemoveField(
            model_name='poke',
            name='title',
        ),
        migrations.AddField(
            model_name='poke',
            name='pokefig',
            field=models.CharField(max_length=120, null=True),
        ),
        migrations.AddField(
            model_name='poke',
            name='pokeheight',
            field=models.CharField(max_length=120, null=True),
        ),
        migrations.AddField(
            model_name='poke',
            name='pokename',
            field=models.CharField(max_length=120, null=True),
        ),
        migrations.AddField(
            model_name='poke',
            name='poketype',
            field=models.CharField(max_length=120, null=True),
        ),
    ]
