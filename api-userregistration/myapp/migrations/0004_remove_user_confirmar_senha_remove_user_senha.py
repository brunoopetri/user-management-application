# Generated by Django 4.2.7 on 2023-11-15 01:08

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0003_alter_user_cpf'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='confirmar_senha',
        ),
        migrations.RemoveField(
            model_name='user',
            name='senha',
        ),
    ]
