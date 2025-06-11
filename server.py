from flask import Flask, jsonify
import mercadopago

app = Flask(__name__)

# Configure seu Access Token aqui
access_token = 'APP_USR-3223522608961152-042911-30a9c024817fe02326645a20f7b0d554-456085631'  # Substitua pelo seu Access Token
mp = mercadopago.MP(access_token)

@app.route('/criar-preferencia', methods=['POST'])
def criar_preferencia():
    try:
        # Dados do pedido
        preference_data = {
            "items": [
                {
                    "title": "Pedido do Site",
                    "unit_price": 100.00,  # Altere para o valor real
                    "quantity": 1
                }
            ],
            "back_urls": {
                "success": "https://StatusPagamento/sucesso.html",  # Substitua com sua URL de sucesso
                "failure": "https://StatusPagamento/falha.html",  # Substitua com sua URL de falha
                "pending": "https://StatusPagamento/pendente.html"  # Substitua com sua URL de pendente
            },
            "auto_return": "approved"
        }

        # Criando a preferência de pagamento
        preference = mp.create_preference(preference_data)

        # Retorna o link de pagamento
        return jsonify({"init_point": preference["response"]["init_point"]})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
