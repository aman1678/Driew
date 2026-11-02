from app import app, db, create_app

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    create_app().run(debug=True)
