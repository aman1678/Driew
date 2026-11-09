from flask import request, jsonify
from models import Post
from config import app, db

def create_app():

    # Get all posts
    @app.route("/api/posts/all", methods=["GET"])
    def get_posts():
        posts = Post.query.all()
        return jsonify([p.to_dict() for p in posts]), 200

    # Get posts by drama
    @app.route("/api/posts/<string:drama>", methods=["GET"])
    def get_post_by_drama(drama):
        posts = Post.query.filter_by(drama=drama).all()
        return jsonify([p.to_dict() for p in posts]), 200
    
    # Create a post
    @app.route("/api/posts", methods=["POST"])
    def create_post():
        data = request.get_json()

        if not data or "description" not in data:
            return jsonify({"error": "Please enter description"}), 400

        new_post = Post(drama=data["drama"], description=data["description"])

        # Error handling for adding a post
        try: 
            db.session.add(new_post)
            db.session.commit()
        except Exception as e:
            return jsonify({"message": str(e)}), 400

        return jsonify(new_post.to_dict()), 201

    # Edit an existing post
    @app.route("/api/posts/<int:post_id>", methods=["PATCH"])
    def edit_post(post_id):
        post = Post.query.get(post_id)

        if not post:
            return jsonify({"message": "Post not found"}), 404

        data = request.get_json()
        post.description = data.get("description", post.description)

        db.session.commit()

        return jsonify(post.to_dict()), 200

    # Delete an exisitng post
    @app.route("/api/delete/<int:post_id>", methods=["DELETE"])
    def delete_post(post_id):
        post = Post.query.get(post_id)

        if not post:
            return jsonify({"message": "Post not found!"}), 404

        db.session.delete(post)
        db.session.commit()

        return jsonify({"message": "Post successfully deleted"}), 200
    
    return app