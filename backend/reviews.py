from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Review

reviews_bp = Blueprint("reviews", __name__, url_prefix="/api/reviews")

def review_to_dict(r):
    return {
        "id":         r.id,
        "content":    r.content,
        "created_at": r.created_at.isoformat(),
        "user_id":    r.user_id,
        "username":   r.author.username,
        "drama_id":   r.drama_id,
    }

@reviews_bp.route("/<int:drama_id>", methods=["GET"])
def get_reviews(drama_id):
    page     = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 5, type=int)
    paginated = (Review.query
                 .filter_by(drama_id=drama_id)
                 .order_by(Review.created_at.desc())
                 .paginate(page=page, per_page=per_page, error_out=False))
    return jsonify({
        "reviews":  [review_to_dict(r) for r in paginated.items],
        "total":    paginated.total,
        "pages":    paginated.pages,
        "page":     page,
    })

@reviews_bp.route("", methods=["POST"])
@jwt_required()
def post_review():
    data    = request.get_json()
    user_id = int(get_jwt_identity())
    review  = Review(content=data["content"], user_id=user_id, drama_id=data["drama_id"])
    db.session.add(review)
    db.session.commit()
    return jsonify(review_to_dict(review)), 201