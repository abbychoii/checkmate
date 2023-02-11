from app import db

class Checkmateuser(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    jtw = db.Column(db.String)
    meds = db.relationship("Med", back_populates="checkmateuser")

    def to_dict(self):
        obj_dict ={
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "jtw": self.jtw,
        }

        return obj_dict