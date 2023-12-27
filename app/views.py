from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import CustomUser, QueryHistory
from .serializers import CustomUserSerializer, QueryHistorySerializer


class CustomUserViewSet(viewsets.ModelViewSet):
    """
    # CustomUserViewSet

    ## Visão Geral

    Um ViewSet para manipular operações CRUD (Create, Retrieve, Update, Delete) relacionadas ao modelo `CustomUser`. Este ViewSet estende o `ModelViewSet` fornecido pelo Django Rest Framework e utiliza a autenticação JWT (`JWTAuthentication`).

    ## Métodos

    - `list(self, request)`: Retorna uma lista de usuários.
    - `retrieve(self, request, pk=None)`: Retorna os detalhes de um usuário específico.
    - `create(self, request)`: Cria um novo usuário.
    - `update(self, request, pk=None)`: Atualiza um usuário existente.
    - `partial_update(self, request, pk=None)`: Atualiza parcialmente um usuário existente.
    - `destroy(self, request, pk=None)`: Exclui um usuário existente.
    - `me(self, request)`: Retorna o perfil do usuário logado.

    ## Autenticação

    Utiliza a autenticação JWT (`JWTAuthentication`) para proteger as operações.

    ## Exemplo de Uso

    ```python
    # Exemplo de URL no arquivo urls.py
    from django.urls import path, include
    from rest_framework.routers import DefaultRouter
    from .views import CustomUserViewSet

    router = DefaultRouter()
    router.register(r'users', CustomUserViewSet, basename='user')

    urlpatterns = [
        path('', include(router.urls)),
    ]
    ```

    ## Endpoint: /api/users/me/

        - Método: GET
        - Descrição: Retorna o perfil do usuário logado.

    ## Observações

        - Certifique-se de configurar corretamente as rotas no arquivo `urls.py`.
        - Este ViewSet presume a existência de um modelo `CustomUser`.
    """
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    @action(detail=False, methods=['get'])
    def me(self, request):
        # Retorna o perfil do usuário logado
        serializer = self.get_serializer(request.user)
        return Response(serializer.data)


class QueryHistoryViewSet(viewsets.ModelViewSet):
    """
    # QueryHistoryViewSet

    ## Visão Geral

    Um ViewSet para manipular operações CRUD (Create, Retrieve, Update, Delete) relacionadas ao modelo `QueryHistory`. Este ViewSet estende o `ModelViewSet` fornecido pelo Django Rest Framework e utiliza a autenticação JWT (`JWTAuthentication`).

    ## Métodos

    - `list(self, request)`: Retorna uma lista de históricos de consulta.
    - `retrieve(self, request, pk=None)`: Retorna os detalhes de um histórico de consulta específico.
    - `create(self, request)`: Cria um novo histórico de consulta.
    - `update(self, request, pk=None)`: Atualiza um histórico de consulta existente.
    - `partial_update(self, request, pk=None)`: Atualiza parcialmente um histórico de consulta existente.
    - `destroy(self, request, pk=None)`: Exclui um histórico de consulta existente.

    ## Autenticação

    Utiliza a autenticação JWT (`JWTAuthentication`) para proteger as operações.

    ## Método Personalizado

    - `perform_create(self, serializer)`: Define o usuário associado à consulta de histórico antes de salvar.

    ## Exemplo de Uso

    ```python
    # Exemplo de URL no arquivo urls.py
    from django.urls import path, include
    from rest_framework.routers import DefaultRouter
    from .views import QueryHistoryViewSet

    router = DefaultRouter()
    router.register(r'query-history', QueryHistoryViewSet, basename='query-history')

    urlpatterns = [
        path('', include(router.urls)),
    ]
    ```

    Endpoint: /api/query-history/

        - Método: POST
        - Descrição: Cria um novo histórico de consulta associado ao usuário logado.

    Observações

        - Certifique-se de configurar corretamente as rotas no arquivo `urls.py`.
        - Este ViewSet presume a existência de um modelo `QueryHistory`.
    """
    queryset = QueryHistory.objects.all()
    serializer_class = QueryHistorySerializer
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]

    def perform_create(self, serializer):
        # Define o usuário associado à consulta de histórico antes de salvar
        serializer.save(user=self.request.user)
