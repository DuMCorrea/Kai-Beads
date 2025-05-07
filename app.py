from flask import Flask, render_template
from auth.routes import auth

app = Flask(__name__)
app.config.from_object('config')

@app.route('/')
def home():
    return render_template('home.html')


app.register_blueprint(auth)

if __name__ == '__main__':
    app.run(debug=True)
