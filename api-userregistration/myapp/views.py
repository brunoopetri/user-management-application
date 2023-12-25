#myapp/views.py
from rest_framework import viewsets
#from rest_framework import generics, status
#from rest_framework.response import Response
from myapp.models import User
from myapp.serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    """def get_queryset(self):
        queryset = super().get_queryset()
        queryset = queryset.filter(cpf__unique=True)
        queryset = queryset.filter(email__unique=True)
        return queryset

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_messages(self):
        messages = []
        if self.messages:
            for message in self.messages:
                messages.append(message)
        return messages

    def get_errors(self):
        return self.errors

    def create(self, request, *args, **kwargs):
        
        #
        #Cria um novo usuário.

        #Args:
            #request: A requisição HTTP.
            #*args: Argumentos posicionais.
            #**kwargs: Argumentos nomeados.

        #Returns:
            #Uma resposta HTTP com o status 201 (Created) e os dados do usuário criado.
        #

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        # Adiciona a mensagem de confirmação
        self.messages.append(f"Usuário criado com sucesso!")

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        
"""  """ 
class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Usuário criado com sucesso!"}, status=status.HTTP_201_CREATED)

class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "Usuário excluído."}, status=status.HTTP_204_NO_CONTENT)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response({"message": "Usuário atualizado."})
"""