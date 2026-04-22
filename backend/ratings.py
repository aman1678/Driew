from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy import func
from models import db, Rating

ratings_bp = Blueprint("ratings", __name__, url_prefix="/api/ratings")

@ratings_bp.route("/<int:drama_id>", methods=["GET"])
def get_avg_rating(drama_id):
    avg   = db.session.query(func.avg(Rating.score)).filter_by(drama_id=drama_id).scalar()
    count = Rating.query.filter_by(drama_id=drama_id).count()
    return jsonify({"drama_id": drama_id, "avg_rating": round(float(avg), 2) if avg else None, "count": count})

@ratings_bp.route("", methods=["POST"])
@jwt_required()
def submit_rating():
    data    = request.get_json()
    user_id = int(get_jwt_identity())
    drama_id = data["drama_id"]
    score    = data["score"]
    if not 1 <= score <= 5:
        return jsonify({"error": "Score must be 1–5"}), 400

    existing = Rating.query.filter_by(user_id=user_id, drama_id=drama_id).first()
    if existing:
        existing.score = score
    else:
        db.session.add(Rating(score=score, user_id=user_id, drama_id=drama_id))
    db.session.commit()

    avg = db.session.query(func.avg(Rating.score)).filter_by(drama_id=drama_id).scalar()
    return jsonify({"avg_rating": round(float(avg), 2)})