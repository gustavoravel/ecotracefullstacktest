# Ecotrace - Teste Full Stack

This is a simple Django project that lists github repos. You can easily run it using the provided scripts.

## Prerequisites

Make sure you have Python and Django installed on your system.

## Virtual Environment Configuration

Run one of the following files to configure a virtual environment and install project requirements:

start_project_linux.sh (Linux)

start_project_windows.ps1 (Windows)

## Tests

Run these commands to execute tests:

coverage run --omit='\*/venv/\*' manage.py test

coverage html

## Server

The server will be available at http://localhost:8000/.

## Documentation

The docs will be available at http://localhost:8000/schema/docs/