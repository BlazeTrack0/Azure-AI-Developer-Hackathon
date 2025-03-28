from flask import Blueprint, request
from azure_fire_backend.utils import get_json_data, get_water_source, get_outpost_source, get_all_data, get_nasa_data

fireRoute = Blueprint('fireRoute', __name__)


@fireRoute.route('/')
def fire():
    return 'Hello Fire Route'



@fireRoute.route('/fire')
def fire_detection():
    return get_json_data()


@fireRoute.route('/water',methods=['POST'])
def water_source():

    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    print("Water source function called")
    return get_water_source(latitude,longitude)



@fireRoute.route('/outpost',methods=['POST'])
def outpost_source():
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    return get_outpost_source(latitude,longitude)



@fireRoute.route('/all',methods=['POST'])
def all_source():
    data = request.get_json()
    latitude = data.get('latitude')
    longitude = data.get('longitude')
    return get_all_data(latitude,longitude)

@fireRoute.route('/nasa',methods=['GET'])
def nasa_source():
    return get_nasa_data()
