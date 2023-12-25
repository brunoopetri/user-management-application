# myapp/serializers.py

import re
from rest_framework import serializers
from django.core.exceptions import ValidationError
from myapp.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        #extra_kwargs = {
            #'email': {'error_messages': {'unique': 'Este e-mail já está em uso por outro usuário.'}},
        #}

       
    def validate_cpf(self, value):
        if len(value) != 11:
            raise serializers.ValidationError('O CPF deve ter 11 dígitos.')

        return value

    def validate_email(self, value):
        # Use uma expressão regular para validar o formato do e-mail
        email_pattern = re.compile(r'^[^@\s]+@[^@\s]+\.[a-zA-Z]{2,}$')

        if not email_pattern.match(value):
            raise serializers.ValidationError('Insira um endereço de email válido.')
    
        return value

    def validate(self, data):
        # Verifica se o CPF já está em uso
        existing_cpf = User.objects.filter(cpf=data['cpf']).exclude(pk=self.instance.pk if self.instance else None).exists()
        if existing_cpf:
            raise ValidationError("Este CPF já está em uso por outro usuário.")

        # Verifica se o e-mail já está em uso
        existing_email = User.objects.filter(email=data['email']).exclude(pk=self.instance.pk if self.instance else None).exists()
        if existing_email:
            raise ValidationError("Este e-mail já está em uso por outro usuário.")

        return data