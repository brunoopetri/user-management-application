#myapp/models.py
from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.core.exceptions import ValidationError

class User(models.Model):
    nome = models.CharField(max_length=100, blank=False)
    cpf = models.CharField(max_length=11, blank=False, unique=True, default='')
    #cpf = models.IntegerField(blank=False, unique=True, default='')
    email = models.EmailField(blank=False, unique=True)

    def __str__(self):
        return self.nome


@receiver(pre_save, sender=User)
def check_unique_email(sender, instance, **kwargs):
    #a verificação de exclusividade de e-mail será realizada automaticamente antes de salvar o objeto
    if User.objects.exclude(pk=instance.pk).filter(email=instance.email).exists():
        raise ValidationError("Este e-mail já está em uso por outro usuário.")


@receiver(pre_save, sender=User)
def check_unique_cpf(sender, instance, **kwargs):
    # A verificação de exclusividade de CPF será realizada automaticamente antes de salvar o objeto
    if User.objects.exclude(pk=instance.pk).filter(cpf=instance.cpf).exists():
        raise ValidationError("Este CPF já está em uso por outro usuário.")

"""
def clean(self):
        # Validar se o e-mail é único
        if User.objects.exclude(pk=self.pk).filter(email=self.email).exists():
            raise ValidationError("Este e-mail já está em uso por outro usuário.")

        # Validar se o CPF é único
        if User.objects.exclude(pk=self.pk).filter(cpf=self.cpf).exists():
            raise ValidationError("Este CPF já está em uso por outro usuário.")

        # Validar se o CPF tem exatamente 11 dígitos
        if not self.cpf.isdigit() or len(self.cpf) != 11:
            raise ValidationError("O CPF deve conter exatamente 11 dígitos numéricos.")

        # Outras validações específicas podem ser adicionadas conforme necessário
        # ...

def save(self, *args, **kwargs):
    self.full_clean()
    super().save(*args, **kwargs)

"""
