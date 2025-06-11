from flask import Flask, render_template, request, jsonify
from flask_cors import CORS
import mercadopago
from auth.routes import auth


app = Flask(__name__)
CORS(app, origins=["http://127.0.0.1:5501"])  # Aqui permite explicitamente a origem do seu front-end

# Substitua pelo seu token real do Mercado Pago
sdk = mercadopago.SDK("TEST-3223522608961152-051221-8825549cd16c104608aa68a7c85134bd-456085631")

@app.route('/')
def home():
    return render_template('home.html')

@app.route("/criar-preferencia", methods=["POST"])
def criar_preferencia():
    data = request.get_json()
    print("📦 Dados recebidos:", data)

    try:
        descricao = data.get("descricao", "Pedido no site")
        preco = float(data.get("preco", 0))
        print("📝 Descrição:", descricao)
        print("💰 Preço (float):", preco)
    except (TypeError, ValueError) as e:
        print("❌ Erro ao converter preço:", e)
        return jsonify({"error": "Dados inválidos"}), 400

    # Substitua pelo e-mail do usuário de teste que você criou
    email_usuario_teste = "test_user_1974906096@testuser.com"  # comprador

    preference_data = {
        "items": [{
            "title": descricao,
            "quantity": 1,
            "currency_id": "BRL",
            "unit_price": preco
        }],
        "payer": {
  "email": "test_user_1974906096@testuser.com"
}
,
        "back_urls": {
            "success": "https://seusite.com/pagamento/sucesso",
            "failure": "https://seusite.com/pagamento/falha",
            "pending": "https://seusite.com/pagamento/pendente"
        },
        "auto_return": "approved"
    }

    # Criação da preferência de pagamento
    preference_response = sdk.preference().create(preference_data)

    # Verificar se a preferência foi criada com sucesso
    if preference_response["status"] == 201:
        init_point = preference_response["response"]["init_point"]
        return jsonify({"init_point": init_point})
    else:
        return jsonify({"error": "Erro ao criar preferência", "detalhes": preference_response}), 400

# Blueprint de autenticação
app.register_blueprint(auth)

if __name__ == '__main__':
    app.run(debug=True)
