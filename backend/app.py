from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Post

def create_app():
    app = Flask(__name__)
    CORS(app)
    mysql = init_db(app)

    with app.app_context():
        create_table(mysql)

    @app.route("/", methods=["GET"])
    def home():
        return "Hello World"
    
    @app.route("/users", methods=["GET"])
    def get_users():
        cur = mysql.connection.cursor()
        cur.execute("SELECT * FROM users")
        data = cur.fetchall()
        cur.close()

        users = [{"id": row[0], "firstname": row[1], "lastname": row[2], "email": row[3]} for row in data]

        return jsonify(users)

    app.route("/users", methods=["POST"])
    def add_user():
        data = request.get_json()
        cur = mysql.connection.cursor()
        cur.execute("INSERT INTO users (firstname, lastname, email) VALUES(%s, %s, %s)",
                    (data["firstname"], data["lastname"], data["email"]))

        mysql.connection.commit()
        cur.close()

        return jsonify({"message": "User added successfully"}), 201

    app.route("/users/<int:id>", methods=["PUT"])
    def update_user(id):
        data = request.get_json()
        cur = mysql.connection.cursor()

        cur.execute("UPDATE users SET firstname=%s, lastname=%s, email=%s WHERE id=%s",
                    (data["firstname"], data["lastname"], data["email"], id))
        
        mysql.connection.commit()
        cur.close()

        return jsonify({"mssage": "User updated"})

    @app.route("/users/<int:id>", methods=["DELETE"])
    def delete_user(id):
        cur = mysql.connection.cursor()
        cur.execute("DELETE FROM users WHERE id=%s", (id,))
        mysql.connection.commit()

        cur.close()
        return jsonify({"message": "User deleted"})

    return app

if __name__ == "__main__":
    create_app().run(debug=True)
