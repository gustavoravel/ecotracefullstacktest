"""
URLs para as ViewSets:

    /api/users/: Listagem e criação de usuários
    /api/users/{id}/: Detalhes, atualização parcial e exclusão de um usuário específico
    /api/users/me/: Retorna o perfil do usuário logado
    /api/query-history/: Listagem e criação de históricos de consulta
    /api/query-history/{id}/: Detalhes, atualização parcial e exclusão de um histórico de consulta específico
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CustomUserViewSet, QueryHistoryViewSet

router = DefaultRouter()
router.register(r'users', CustomUserViewSet, basename='user')
router.register(r'query-history', QueryHistoryViewSet, basename='query-history')

urlpatterns = [
    path('api/', include(router.urls)),
]