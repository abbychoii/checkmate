from flask import Blueprint, jsonify, abort, request, make_response
from app import db
from app.models.med import Med
from .routes_helper import validate_input, validate_id

med_bp = Blueprint("med_bp", __name__, url_prefix="/meds")


@med_bp.route("", methods=["GET"])
def get_all_meds():
    meds = Med.query.all()

    all_meds = []
    for med in meds:
        all_meds.append(med.to_dict())
    return jsonify(all_meds), 200

@med_bp.route("/<med_id>", methods=["DELETE"])
def delete_med_with_id(med_id):
    selected_med = validate_id(Med, med_id)
    
    db.session.delete(selected_med)
    db.session.commit()

    return jsonify({"message": f"{selected_med.med_name.capitalize()} deleted"}), 200

@med_bp.route("/<med_id>", methods=["PUT"])
def update_med_with_id(med_id):
    selected_med = validate_id(Med, med_id)
    request_body = request.get_json()
    
    selected_med.med_name=request_body["med_name"]
    selected_med.rxcui=request_body["rxcui"]
    selected_med.dose=request_body["dose"]
    selected_med.frequency=request_body["frequency"]

    db.session.commit()

    return make_response(f"{selected_med.med_name.capitalize()} successfully updated")
    
