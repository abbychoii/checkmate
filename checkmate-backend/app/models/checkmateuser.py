from app import db

class Checkmateuser(db.Model):
    user_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String)
    email = db.Column(db.String)
    jtw = db.Column(db.String)
    meds = db.relationship("Med", back_populates="checkmateuser")
    picture = db.Column(db.String)

    def to_dict(self):
        obj_dict ={
            "id": self.user_id,
            "name":self.name,
            "email": self.email,
            "jtw": self.jtw,
            "picture":self.picture
        }

        return obj_dict
    
    @classmethod
    def from_dict(cls, request):
        checkmateuser = cls(name=request["name"], email=request["email"], jtw=request["jtw"], picture=request['picture'])
        return checkmateuser