#!/bin/bash

# Cria um ambiente virtual (se não existir)
python3 -m venv venv

# Ativa o ambiente virtual
source venv/bin/activate

# Instala os requisitos
pip install -r requirements.txt

# Executa as migrações do banco de dados
python manage.py migrate

# Inicia o servidor Django
python manage.py runserver
