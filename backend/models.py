from config import db
from datetime import datetime, timezone

def utcnow():
    return datetime.now(timezone.utc)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    drama = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, default=utcnow, nullable=False)
    description = db.Column(db.Text, nullable=False)

    def to_dict(self):
        return {
            "id": self.id,
            "drama": self.drama,
            "date": self.date.isoformat() + "Z" if self.date else None,
            "description": self.description
        }
