from app import db

class Med(db.Model):
    med_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    med_name = db.Column(db.String)
    rxcui = db.Column(db.String)
    dose = db.Column(db.String)
    frequency = db.Column(db.String)
    checkmateuser_id = db.Column(db.Integer,db.ForeignKey('checkmateuser.user_id'))
    checkmateuser = db.relationship("Checkmateuser", back_populates="meds")

    def to_dict(self):
        med_dict = {
            "med_id": self.med_id,
            "med_name": self.med_name,
            "rxcui":self.rxcui,
            "dose": self.dose,
            "frequency": self.frequency
        }
        return med_dict
    
    @classmethod
    def from_dict(cls, request):
        med = cls(med_name=request["med_name"], rxcui=request["rxcui"], dose=request["dose"], frequency=request["frequency"])
        return med
