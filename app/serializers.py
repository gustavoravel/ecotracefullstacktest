from rest_framework import serializers
from .models import CustomUser, QueryHistory


class CustomUserSerializer(serializers.ModelSerializer):
    """
    # CustomUserSerializer

    ## Visão Geral

    Um serializador para o modelo `CustomUser`, que estende o `ModelSerializer` padrão fornecido pelo Django Rest Framework. Este serializador é projetado para lidar com a serialização e desserialização dos dados do usuário, incluindo campos adicionais obtidos da API do GitHub durante a criação do usuário.

    ## Campos

    - `id`: IntegerField
    - `email`: EmailField
    - `username`: CharField
    - `bio`: TextField
    - `github_profile`: CharField
    - `name`: CharField
    - `tag`: CharField
    - `followers`: PositiveIntegerField
    - `following`: PositiveIntegerField
    - `public_repos`: PositiveIntegerField
    - `twitter`: CharField
    - `company`: CharField
    - `website`: URLField

    ## Campos Somente Leitura

    - `id`: IntegerField
    - `followers`: PositiveIntegerField
    - `following`: PositiveIntegerField
    - `public_repos`: PositiveIntegerField

    ## Métodos

    ### create(self, validated_data)

    - **Entrada**: `validated_data` - Um dicionário contendo os dados validados para criar um novo usuário.

    - **Saída**: Retorna o objeto de usuário recém-criado.

    - **Descrição**: Substitui o método padrão `create` para lidar com a criação de um novo usuário com dados adicionais obtidos da API do GitHub. Remove o campo `github_profile` dos dados de entrada para evitar problemas de escrita. Após criar o usuário, busca dados adicionais na API do GitHub e atualiza o modelo do usuário com as informações obtidas antes de salvar.

    ## Exemplo de Uso

    ```python
    serializer = CustomUserSerializer(data=validated_data)
    if serializer.is_valid():
        user = serializer.create(validated_data)
        # Realize ações adicionais com o objeto de usuário criado
    else:
        # Lidar com erros de validação do serializador
    ```

    Observação: Esta documentação pressupõe a existência de um modelo CustomUser e métodos correspondentes no gerenciador.

    """
    class Meta:
        model = CustomUser
        fields = (
            'id', 'email', 'username', 'bio', 'github_profile', 'name',
            'tag', 'followers', 'following', 'public_repos', 'twitter',
            'company', 'website'
        )
        read_only_fields = ('id', 'followers', 'following', 'public_repos')

    def create(self, validated_data):
        # Remove os campos obtidos da API do GitHub para evitar problemas de escrita
        github_profile = validated_data.pop('github_profile', None)
        user = CustomUser.objects.create(**validated_data)

        # Atualiza os campos obtidos da API do GitHub no modelo do usuário
        if github_profile:
            github_data = CustomUser.objects._get_github_data(github_profile)
            if github_data:
                user.name = github_data.get('name', user.name)
                user.tag = github_data.get('login', user.tag)
                user.followers = github_data.get('followers', user.followers)
                user.following = github_data.get('following', user.following)
                user.public_repos = github_data.get('public_repos', user.public_repos)
                user.bio = github_data.get('bio', user.bio)
                user.email = github_data.get('email', user.email)
                user.twitter = github_data.get('twitter_username', user.twitter)
                user.company = github_data.get('company', user.company)
                user.website = github_data.get('blog', user.website)

        user.save()
        return user


class QueryHistorySerializer(serializers.ModelSerializer):
    """
    # QueryHistorySerializer

    ## Visão Geral

    Um serializador para o modelo `QueryHistory` que estende o `ModelSerializer` fornecido pelo Django Rest Framework. Este serializador é projetado para lidar com a serialização e desserialização dos dados de histórico de consulta, incluindo o usuário associado.

    ## Campos

    - `id`: IntegerField
    - `user`: CustomUserSerializer (Somente Leitura)
    - `query`: CharField
    - `timestamp`: DateTimeField

    ## Métodos

    Este serializador não possui métodos personalizados, pois se baseia principalmente nas funcionalidades padrão fornecidas pelo `ModelSerializer` do Django Rest Framework.

    ## Exemplo de Uso

    ```python
    # Criação de uma instância do serializador
    serializer = QueryHistorySerializer(data=validated_data)

    # Verifica se os dados são válidos
    if serializer.is_valid():
        # Criação ou atualização do objeto de histórico de consulta
        query_history = serializer.save()
        # Realize ações adicionais com o objeto de histórico de consulta criado
    else:
        # Lidar com erros de validação do serializador
    ```

    Observação: Esta documentação pressupõe a existência de um modelo QueryHistory.    
    """
    user = CustomUserSerializer(read_only=True)  

    class Meta:
        model = QueryHistory
        fields = ('id', 'user', 'query', 'timestamp')
