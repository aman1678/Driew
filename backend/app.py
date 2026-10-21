from flask import Flask, jsonify

def create_app():
    app = Flask(__name__)

    @app.route("/")
    def home():
        return "Hello World"
    
    @app.route("/<message>")
    def print_message(message):
        return jsonify(
            {
                "mesage": [c for c in message]
            }
        )

    return app

if __name__ == "__main__":
    create_app().run(debug=True, port=8080)
