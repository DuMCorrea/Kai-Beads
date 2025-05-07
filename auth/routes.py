from flask import Blueprint, render_template, request, redirect, url_for, flash
from werkzeug.security import generate_password_hash, check_password_hash

auth = Blueprint('auth', __name__)

# Simulação de banco de dados (substituir por SQLAlchemy depois)
users = {}

@auth.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        
        # Verifica se o email está cadastrado
        if email in users and check_password_hash(users[email], password):
            flash('Login realizado com sucesso!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Falha no login. Verifique seu email e senha.', 'danger')

    return render_template('login.html')

@auth.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        email = request.form['email']
        password = generate_password_hash(request.form['password'])
        
        # Verifica se o email já está cadastrado
        if email in users:
            flash('Email já cadastrado!', 'warning')
        else:
            users[email] = password
            flash('Registro realizado com sucesso!', 'success')
            return redirect(url_for('auth.login'))

    return render_template('register.html')
