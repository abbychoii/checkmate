from flask import Blueprint, jsonify, abort, request, make_response
from app.models.checkmateuser import Checkmateuser
from app.models.med import Med

def validate_id(cls, id):
    try:
        id = int(id)
    except:
        abort(make_response({"details": "Invalid data"}, 400))
    
    query_result = cls.query.get(id)

    if not query_result:
        abort(make_response({"details": f"{cls.__name__} {id} Not Found"}, 404))

    return query_result

def validate_input(cls, request_body):
    if cls == Med:
        if "med_name" not in request or "rxcui" not in request or "dose" not in request or "frequency" not in request:
            abort(make_response({"details":"Invalid data"},400))
    elif cls == Checkmateuser:
        if "jtw" not in request_body or "name" not in request_body or "picture" not in request_body:
            abort(make_response({"details":"Invalid data"},400))