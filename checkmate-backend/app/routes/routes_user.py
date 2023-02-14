from flask import Blueprint, jsonify, abort, request, make_response
from app import db
from .routes_helper import validate_id, validate_input
from app.models.checkmateuser import Checkmateuser
from app.models.med import Med

user_bp = Blueprint("user_bp", __name__, url_prefix="/users")

@user_bp.route("",methods=["GET"])
def get_all_users():
    users = Checkmateuser.query.all()
    response = [user.to_dict() for user in users]
    return jsonify(response), 200


@user_bp.route("/<user_id>/meds", methods=["POST"])
def add_med_to_user(user_id):
    user = validate_id(Checkmateuser, user_id)
    request_body = request.get_json()
    
    meds = [med.to_dict() for med in user.meds]
    for med in meds: 
        if med["rxcui"] == request_body['rxcui']:
            abort(make_response({"details": f"Med already exists. If you would like to update {request_body['med_name']}, please use the edit button."}, 400))

    new_med = Med.from_dict(request_body)
    new_med.checkmateuser = user

    db.session.add(new_med)
    db.session.commit()
    
    return jsonify({"med": new_med.to_dict()}), 201

@user_bp.route("", methods=["POST"])
def add_id():
    request_body = request.get_json()
    validate_input(Checkmateuser, request_body)

    if not Checkmateuser.query.filter(Checkmateuser.jtw ==request_body['jtw']).count():
        new_user = Checkmateuser.from_dict(request_body)

        db.session.add(new_user)
        db.session.commit()

        return jsonify(new_user.to_dict()), 201
    else:
        return jsonify("user already exists")


@user_bp.route("/<user_id>/meds", methods=["GET"])
def get_all_meds_belonging_to_user(user_id):
    user = validate_id(Checkmateuser, user_id) 

    med_response = [med.to_dict() for med in user.meds]

    return jsonify(med_response), 200

@user_bp.route("/<user_id>", methods=["DELETE"])
def delete_users(user_id):
    user = validate_id(Checkmateuser, user_id)

    db.session.delete(user)
    db.session.commit()

    return jsonify(f"deleted user {user_id}")


@user_bp.route("/<jtw>", methods=["GET"])
def get_user_id(jtw):
    users = Checkmateuser.query.filter(jtw==Checkmateuser.jtw)
    try:
        response = users[0].to_dict()
    except:
        response = {"id": False}

    return jsonify(response), 200
