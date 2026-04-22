from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required
from models import db, Drama
from sqlalchemy import func
from models import Rating

dramas_bp = Blueprint("dramas", __name__, url_prefix="/api/dramas")

def drama_to_dict(drama, avg_rating=None):
    return {
        "id":          drama.id,
        "title":       drama.title,
        "description": drama.description,
        "genre":       drama.genre,
        "year":        drama.year,
        "channel":     drama.channel,
        "poster_url":  drama.poster_url,
        "avg_rating":  round(float(avg_rating), 2) if avg_rating else None
    }

@dramas_bp.route("", methods=["GET"])
def get_dramas():
    genre = request.args.get("genre")
    search = request.args.get("search", "")
    query = Drama.query
    if genre:
        query = query.filter_by(genre=genre)
    if search:
        query = query.filter(Drama.title.ilike(f"%{search}%"))
    dramas = query.order_by(Drama.title).all()

    # Compute avg ratings in one SQL query
    avg_map = dict(
        db.session.query(Rating.drama_id, func.avg(Rating.score))
        .group_by(Rating.drama_id).all()
    )
    return jsonify([drama_to_dict(d, avg_map.get(d.id)) for d in dramas])

@dramas_bp.route("/<int:drama_id>", methods=["GET"])
def get_drama(drama_id):
    drama = Drama.query.get_or_404(drama_id)
    avg = db.session.query(func.avg(Rating.score)).filter_by(drama_id=drama_id).scalar()
    return jsonify(drama_to_dict(drama, avg))

@dramas_bp.route("", methods=["POST"])
@jwt_required()
def create_drama():
    data = request.get_json()
    drama = Drama(**{k: data.get(k) for k in
                     ("title","description","genre","year","channel","poster_url")})
    db.session.add(drama)
    db.session.commit()
    return jsonify(drama_to_dict(drama)), 201