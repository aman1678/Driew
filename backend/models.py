from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id       = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email    = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), nullable=False)   # stored as hash
    reviews  = db.relationship("Review", backref="author", lazy=True)
    ratings  = db.relationship("Rating", backref="rater",  lazy=True)

class Drama(db.Model):
    __tablename__ = "dramas"
    id          = db.Column(db.Integer, primary_key=True)
    title       = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    genre       = db.Column(db.String(80))
    year        = db.Column(db.Integer)
    channel     = db.Column(db.String(100))
    poster_url  = db.Column(db.String(500))
    reviews     = db.relationship("Review", backref="drama", lazy=True, cascade="all, delete")
    ratings     = db.relationship("Rating", backref="drama", lazy=True, cascade="all, delete")

class Review(db.Model):
    __tablename__ = "reviews"
    id         = db.Column(db.Integer, primary_key=True)
    content    = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    user_id    = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    drama_id   = db.Column(db.Integer, db.ForeignKey("dramas.id"), nullable=False)

class Rating(db.Model):
    __tablename__ = "ratings"
    id       = db.Column(db.Integer, primary_key=True)
    score    = db.Column(db.Integer, nullable=False)   # 1–5
    user_id  = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    drama_id = db.Column(db.Integer, db.ForeignKey("dramas.id"), nullable=False)
    __table_args__ = (db.UniqueConstraint("user_id", "drama_id", name="one_rating_per_user"),)