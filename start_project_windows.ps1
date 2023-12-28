# Verifica se o ambiente virtual já existe, se não existir, cria um
if (!(Test-Path .\venv)) {
    python -m venv venv
}

# Ativa o ambiente virtual
.\venv\Scripts\Activate

# Instala os requisitos
pip install -r requirements.txt

# Executa as migrações do banco de dados
python manage.py migrate

# Inicia o servidor Django
python manage.py runserver
