import requests
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("O campo de e-mail é obrigatório.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)

        # Realiza a chamada à API do GitHub ao criar um usuário
        github_data = self._get_github_data(user.github_profile)
        if github_data:
            user.name = github_data.get('name')
            user.tag = github_data.get('login')
            user.followers = github_data.get('followers')
            user.following = github_data.get('following')
            user.public_repos = github_data.get('public_repos')
            user.bio = github_data.get('bio')
            user.email = github_data.get('email')
            user.twitter = github_data.get('twitter_username')
            user.company = github_data.get('company')
            user.website = github_data.get('blog')

        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)

    def _get_github_data(self, github_profile):
        # Realiza a chamada à API do GitHub para obter dados do usuário
        # Implemente a lógica da chamada à API do GitHub aqui
        # Exemplo usando a biblioteca requests:
        github_api_url = f'https://api.github.com/users/{github_profile}'
        response = requests.get(github_api_url)
        if response.status_code == 200:
            return response.json()
        return None

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=30, unique=True)
    bio = models.TextField(blank=True)
    github_profile = models.CharField(max_length=100, blank=True)
    name = models.CharField(max_length=255, blank=True)
    tag = models.CharField(max_length=255, blank=True)
    followers = models.PositiveIntegerField(default=0)
    following = models.PositiveIntegerField(default=0)
    public_repos = models.PositiveIntegerField(default=0)
    twitter = models.CharField(max_length=255, blank=True)
    company = models.CharField(max_length=255, blank=True)
    website = models.URLField(blank=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    groups = models.ManyToManyField(
        'auth.Group',
        verbose_name='groups',
        blank=True,
        help_text='The groups this user belongs to.',
        related_name='customuser_set',
        related_query_name='user'
    )

    user_permissions = models.ManyToManyField(
        'auth.Permission',
        verbose_name='user permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        related_name='customuser_set',
        related_query_name='user'
    )


class QueryHistory(models.Model):
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    query = models.CharField(max_length=255)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.query}"
