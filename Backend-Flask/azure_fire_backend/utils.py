import requests
import json
from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.ai.vision.imageanalysis.models import VisualFeatures
from azure.core.credentials import AzureKeyCredential
from geopy.distance import geodesic
import pandas as pd
import os
import base64
from openai import AzureOpenAI
import math
from math import floor, sqrt
from math import ceil
from random import randint
import numpy as np
import re

def animal_number(places):
    chat_prompt = [
    {
        "role": "system",
        "content": [
            {
                "type": "text",
                "text": "You are a farmer, and your task is to find the approximate number of farm animal like cow, sheep, chicken, etc. at each location given to you as a list of coordinates, sum them up, and provide me with the total number of farm animal count. Do not explain to me, just give a total number. Give me number of every one of the kinf invidivual. Such as 10 cow, 20 sheep, etc."
            }
        ]
    },
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": f"{places}"
            }
        ]
    }
    ]

    # Include speech result if speech is enabled
    messages = chat_prompt

    completion = client_nlp.chat.completions.create(
    model=deployment_nlp,
    messages=messages,
    max_tokens=800,
    temperature=0.7,
    top_p=0.95,
    frequency_penalty=0,
    presence_penalty=0,
    stop=None,
    stream=False
    )

    # completion.to_json() çıktısını bir değişkene atayalım
    completion_json = completion.to_json()

    # JSON verisini bir Python dictionary'sine dönüştürelim
    completion_dict = json.loads(completion_json)

    # "choices" listesindeki ilk elemanın "message" dictionary'sinden "content" kısmını alalım
    content = completion_dict["choices"][0]["message"]["content"]
    numbers = re.findall(r'\d{1,3}(?:,\d{3})*', content)
    return numbers

def population_number(places):
    chat_prompt = [
    {
        "role": "system",
        "content": [
            {
                "type": "text",
                "text": "You are a population officer, and your task is to find the approximate population at each location given to you as a list of coordinates, sum them up, and provide me with the total population count. Do not explain to me, just give a total number."
            }
        ]
    },
    {
        "role": "user",
        "content": [
            {
                "type": "text",
                "text": f"{places}"
            }
        ]
    }
    ]

    # Include speech result if speech is enabled
    messages = chat_prompt

    completion = client_nlp.chat.completions.create(
    model=deployment_nlp,
    messages=messages,
    max_tokens=800,
    temperature=0.7,
    top_p=0.95,
    frequency_penalty=0,
    presence_penalty=0,
    stop=None,
    stream=False
    )

    # completion.to_json() çıktısını bir değişkene atayalım
    completion_json = completion.to_json()

    # JSON verisini bir Python dictionary'sine dönüştürelim
    completion_dict = json.loads(completion_json)

    # "choices" listesindeki ilk elemanın "message" dictionary'sinden "content" kısmını alalım
    content = completion_dict["choices"][0]["message"]["content"]
    numbers = re.findall(r'\d{1,3}(?:,\d{3})*', content)
    return numbers

def city_finder3(around, latitude, longitude):   
                overpass_query = f"""
                [out:json][timeout:25];
                (
                node["place"~"city"](around:{around},{latitude},{longitude});
                way["place"~"city"](around:{around},{latitude},{longitude});
                relation["place"~"city"](around:{around},{latitude},{longitude});
                );
                out center;
                """

                # Overpass API URL
                overpass_url = "https://overpass-api.de/api/interpreter"

                # API'ye istek gönder
                response = requests.get(overpass_url, params={"data": overpass_query})

                # Yanıtı kontrol et
                if response.status_code == 200:
                    data_city = response.json()

                    city_sources = []
                    for element in data.get("elements", []):
                        if "lat" in element and "lon" in element:
                            city_lat = element["lat"]
                            city_lon = element["lon"]
                        elif "center" in element:  # way ve relation için center kullanımı
                            city_lat = element["center"]["lat"]
                            city_lon = element["center"]["lon"]
                        else:
                            continue

                        place_name = element.get("tags", {}).get("name", "Bilinmiyor")
                        distance = geodesic((latitude, longitude), (city_lat, city_lon)).meters
                        city_sources.append((place_name, distance, city_lat, city_lon))

                    # En yakın 3 su kaynağını sırala ve al
                    city_sources.sort()
                    city_closest_3 = city_sources[:3]
                    return city_closest_3
                    
                else:
                    print("Hata:", response.status_code)


def water_finder(around, latitude, longitude):
                overpass_query = f"""
                [out:json][timeout:25];
                (
                node["natural"="water"](around:{around},{latitude},{longitude});
                node["waterway"="river"](around:{around},{latitude},{longitude});
                node["waterway"="canal"](around:{around},{latitude},{longitude});
                node["waterway"="stream"](around:{around},{latitude},{longitude});
                node["landuse"="reservoir"](around:{around},{latitude},{longitude});
                node["man_made"="dam"](around:{around},{latitude},{longitude});

                way["natural"="water"](around:{around},{latitude},{longitude});
                way["waterway"="river"](around:{around},{latitude},{longitude});
                way["waterway"="canal"](around:{around},{latitude},{longitude});
                way["waterway"="stream"](around:{around},{latitude},{longitude});
                way["landuse"="reservoir"](around:{around},{latitude},{longitude});
                way["man_made"="dam"](around:{around},{latitude},{longitude});

                relation["natural"="water"](around:{around},{latitude},{longitude});
                relation["waterway"="river"](around:{around},{latitude},{longitude});
                relation["waterway"="canal"](around:{around},{latitude},{longitude});
                relation["waterway"="stream"](around:{around},{latitude},{longitude});
                relation["landuse"="reservoir"](around:{around},{latitude},{longitude});
                relation["man_made"="dam"](around:{around},{latitude},{longitude});
                );
                out center;
                """

                # Overpass API URL
                overpass_url = "https://overpass-api.de/api/interpreter"

                # API'ye istek gönder
                response = requests.get(overpass_url, params={"data": overpass_query})

                # Yanıtı kontrol et
                if response.status_code == 200:
                    data = response.json()

                    water_sources = []
                    for element in data.get("elements", []):
                        if "lat" in element and "lon" in element:
                            water_lat = element["lat"]
                            water_lon = element["lon"]
                        elif "center" in element:  # way ve relation için center kullanımı
                            water_lat = element["center"]["lat"]
                            water_lon = element["center"]["lon"]
                        else:
                            continue
                        distance = geodesic((latitude, longitude), (water_lat, water_lon)).meters
                        water_sources.append((distance, water_lat, water_lon))
                        
                    return water_sources
                else:
                    print("Hata:", response.status_code)
    
def outpost_finder(around, latitude, longitude):   
                overpass_query = f"""
                [out:json][timeout:25];
                (
                node["place"~"village|hamlet|isolated_dwelling|farm|allotments"](around:{around},{latitude},{longitude});
                way["place"~"village|hamlet|isolated_dwelling|farm|allotments"](around:{around},{latitude},{longitude});
                relation["place"~"village|hamlet|isolated_dwelling|farm|locality|suburb|allotments"](around:{around},{latitude},{longitude});
                node["landuse"~"farmyard"](around:{around},{latitude},{longitude});
                way["landuse"~"farmyard"](around:{around},{latitude},{longitude});
                relation["landuse"~"farmyard"](around:{around},{latitude},{longitude});
                );
                out center;
                """

                # Overpass API URL
                overpass_url = "https://overpass-api.de/api/interpreter"

                # API'ye istek gönder
                response = requests.get(overpass_url, params={"data": overpass_query})

                # Yanıtı kontrol et
                if response.status_code == 200:
                    data = response.json()

                    outpost_sources = []
                    for element in data.get("elements", []):
                        if "lat" in element and "lon" in element:
                            outpost_lat = element["lat"]
                            outpost_lon = element["lon"]
                        elif "center" in element:  # way ve relation için center kullanımı
                            outpost_lat = element["center"]["lat"]
                            outpost_lon = element["center"]["lon"]
                        else:
                            continue
                        place_name = element.get("tags", {}).get("name", "Unknown")
                        distance = geodesic((latitude, longitude), (outpost_lat, outpost_lon)).meters
                        outpost_sources.append((place_name, distance, outpost_lat, outpost_lon))

                    # En yakın 3 su kaynağını sırala ve al
                    return outpost_sources
                else:
                    print("Hata:", response.status_code)
                    

                        

    
FIRE_SIZE = 1000

plantation_flammabilities = {
    # Highly Flammable (Oil-rich, Resinous, Dry shrubs, and Needle-leaved Trees)
    "pine": 1.5,
    "eucalyptus": 1.5,
    "cypress": 1.5,
    "cedar": 1.5,
    "juniper": 1.5,
    "fir": 1.5,
    "spruce": 1.5,
    "chaparral": 1.5,  # Dry shrubland, burns rapidly
    "palmetto": 1.5,  # Flammable due to high oil content
    "gorse": 1.5,  # Oil-rich shrub, common in dry regions
    "bamboo": 1.5,  # Hollow structure allows fast ignition
    "heath": 1.5,  # Grows in dry, acidic soil, highly combustible
    "manzanita": 1.5,  # Common in California, burns intensely
    "mesquite": 1.5,  # Arid-climate tree, burns easily when dry
    "tamarisk": 1.5,  # Found in deserts, burns intensely

    # Moderately Flammable (Broadleaf, Mixed Forest, Dry Savanna & Tropical Dry Forest Trees)
    "oak": 1.2,
    "maple": 1.2,
    "birch": 1.2,
    "poplar": 1.2,
    "larch": 1.2,  # Conifer but sheds leaves, reducing fire spread
    "chestnut": 1.2,
    "black locust": 1.2,
    "hickory": 1.2,  # Dense wood, burns well but not extremely fast
    "sweetgum": 1.2,  # Common in temperate forests, moderate burnability
    "acacia": 1.2,  # Found in savannas, moderate ignition risk
    "teak": 1.2,  # Found in tropical dry forests, resists fire slightly
    "kapok": 1.2,  # Found in tropical dry forests, moderate burnability
    "brazilian cerrado trees": 1.2,  # Native to fire-prone savannas
    "maquis": 1.2,  # Mediterranean shrubland, burns but not as fast as chaparral
    "phrygana": 1.2,  # Another Mediterranean shrub, common in dry areas

    # Low Flammability (Moist Trees, Fire-resistant Broadleaf, Wetland species)
    "aspen": 0.7,
    "alder": 0.7,
    "dogwood": 0.7,
    "redbud": 0.7,
    "magnolia": 0.7,
    "sycamore": 0.7,
    "beech": 0.7,
    "willow": 0.7,
    "cottonwood": 0.7,
    "walnut": 0.7,
    "mangrove": 0.7,  # Grows in wet areas, highly resistant
    "baobab": 0.7,  # Stores water in trunk, very fire-resistant
    "avocado": 0.7,  # Thick, moist leaves reduce fire spread
    "sequoia": 0.7,  # Thick bark protects against fire

    "other": 0.5
}


# -------- helper functions --------

def wind_coefficient_calc(speed):
    # wind speed is given in m/s
    # convert to km/h
    speed = speed * 3.6
    if speed >= 0 and speed <= 5: 
        coeff = 1
    elif speed > 5 and speed <= 15: 
        coeff = 1.2
    elif speed > 15 and speed <= 30: 
        coeff = 1.5
    elif speed > 30: 
        coeff = 2
    else:
        coeff = 0.7
    return coeff

def temp_coefficient_calc(temperature):
    # temperature is given in kelvin (K)
    # convert to celcius (°C)
    temperature = temperature - 273.15

    if temperature >= 0 and temperature <= 10:
        coeff = 0.5
    elif temperature > 10 and temperature <= 25:
        coeff = 1
    elif temperature > 25 and temperature <= 35:
        coeff = 1.2
    elif temperature > 35:
        coeff = 1.5
    else:
        coeff = 0.3

    return coeff

def dewpoint_coefficient_calc(dewpoint):
    # dewpoint is given in kelvin (K)
    # convert to celcius (°C)
    dewpoint = dewpoint - 273.15

    if dewpoint < 0:
        coeff = 2
    elif 0 <= dewpoint < 5:
        coeff = 1.5
    elif 5 <= dewpoint < 10:
        coeff = 1.2
    else:
        coeff = 1
    return coeff

def rh_coefficient_calc(rh):
    # relative humidity (%)

    if rh < 20:
        coeff = 1.3
    elif rh > 50:
        coeff = 0.8
    else:
        coeff = 1
    return coeff

def pressure_coefficient_calc(pressure):
    # pressure is given in pascal (Pa)
    # convert to hPa
    pressure = pressure / 100

    if pressure < 1000:
        coeff = 1.5
    elif 1000 <= pressure < 1015:
        coeff = 1.2
    else:
        coeff = 1
    return coeff

def hectare_to_m2(area):
    '''
    Converts the burned area from hectares to square meters(m^2).
    '''
    return area * 1e4

def hectare_to_radius(area):
    '''
    Returns the approximate radius (in meters) of a circle equivalent to the given burnable area in hectares.
    '''
    m2 = hectare_to_m2(area)
    pi = math.pi
    r = sqrt(m2/pi)
    return ceil(r)

def calc_coefficients(vegetation, wind_u, wind_v,
                    temperature, dewpoint, humidity, pressure):
    
    wind_speed = sqrt(wind_u**2 + wind_v**2) # wind speed magnitude

    try:
        vegetation_coeff = plantation_flammabilities[vegetation]
    except:
        vegetation_coeff = plantation_flammabilities['other']

    wind_coeff = wind_coefficient_calc(wind_speed)
    temp_coeff = temp_coefficient_calc(temperature)
    dewpoint_coeff = dewpoint_coefficient_calc(dewpoint)
    humidity_coeff = rh_coefficient_calc(humidity)
    pressure_coeff = pressure_coefficient_calc(pressure)

    return vegetation_coeff, wind_coeff, temp_coeff, dewpoint_coeff, humidity_coeff, pressure_coeff

# -------- helper functions end --------


def burned_area(fire_duration, vegetation, 
                wind_u, wind_v,
                temperature, dewpoint,
                humidity, pressure):
    '''
    Returns the estimated area the fire is spread in given time duration (hours), in 3 different units: hectares, square meters and radius.
    '''

    vegetation_coeff, wind_coeff, temp_coeff, dewpoint_coeff, humidity_coeff, pressure_coeff = calc_coefficients(vegetation, wind_u, wind_v,
                                                                                                                temperature, dewpoint, humidity, pressure)
    if fire_duration < 48:
        rate = 0.05
    elif fire_duration >= 48 and fire_duration < 96:
        rate = 0.04
    else:
        rate = 0.023
    
    # linear growth
    #hourly_damage_rate = 13.75 * vegetation_coeff * wind_coef * temp_coef * dewpoint_coef * humidity_coef * pressure_coef
    #estimated_total_damage_1 = hourly_damage_rate * fire_duration

    # exoponential growth
    spread_rate = rate * wind_coeff * temp_coeff * dewpoint_coeff * humidity_coeff * pressure_coeff * vegetation_coeff
    estimated_total_damage_2 = FIRE_SIZE * math.exp(spread_rate * fire_duration)

    damage_in_hectares = ceil(estimated_total_damage_2)
    damage_in_m2 = hectare_to_m2(damage_in_hectares)
    damage_in_radius = hectare_to_radius(damage_in_hectares)
    
    return damage_in_hectares, damage_in_m2, damage_in_radius


def inventory_calc(initial_fire_size, vegetation, 
                   wind_u, wind_v,
                   temperature, dewpoint,
                   humidity, pressure):
    '''
    Returns the estimated inventory requirements.
    '''
  
    vegetation_coeff, wind_coeff, temp_coeff, dewpoint_coeff, humidity_coeff, pressure_coeff = calc_coefficients(vegetation, wind_u, wind_v,
                                                                                                                temperature, dewpoint, humidity, pressure)

    cumulative_weather_coef = (wind_coeff + temp_coeff + dewpoint_coeff + humidity_coeff + pressure_coeff) / 5    

    ppl_coef = 0.85 
    eng_coef = 0.075 # arazöz sayısı olarak aldım
    heli_coef = 0.006

    backing_eng_coef = 0.075 # ekstra yardım araçları (su ikmal, dozer vs.)
    
    total_people = floor((initial_fire_size * ppl_coef * cumulative_weather_coef * vegetation_coeff)*0.8)
    engine = ceil(initial_fire_size * eng_coef * cumulative_weather_coef * vegetation_coeff)
    helicopter = floor((initial_fire_size * heli_coef * cumulative_weather_coef * vegetation_coeff)/2)
    backing_engine = floor(initial_fire_size * backing_eng_coef * cumulative_weather_coef * vegetation_coeff)
    plane = floor((initial_fire_size * heli_coef * cumulative_weather_coef * vegetation_coeff)/3)

    required_inventory = {
        "total_people": total_people,
        "engine": engine,
        "helicopter": helicopter,
        "backing_engine": backing_engine,
        "plane": plane
    }

    return required_inventory

def later_need_of_inventory(hours, vegetation, wind_u, wind_v,
                            temperature, dewpoint,
                            humidity, pressure):
    '''
    Returns the amount of inventory needed in the following "hours"
    '''
    
    # calculate the approximate size of the fire in the next given amount of hours (in hectares)
    later_size = burned_area(hours, vegetation, wind_u, wind_v, temperature, dewpoint, humidity, pressure)[0]
    inventory = inventory_calc(later_size, vegetation, wind_u, wind_v, temperature, dewpoint, humidity, pressure)

    return inventory

def estimated_fire_duration_calc(initial_fire_size, vegetation,
                                wind_u, wind_v,
                                temperature, dewpoint,
                                humidity, pressure):
    
    '''
    Returns the estimated time it would take to put the fire out (in hours).
    '''

    vegetation_coeff, wind_coeff, temp_coeff, dewpoint_coeff, humidity_coeff, pressure_coeff = calc_coefficients(vegetation, wind_u, wind_v,
                                                                                                                temperature, dewpoint,humidity, pressure)

    base_days = initial_fire_size/120
    est_time = base_days * wind_coeff * temp_coeff * dewpoint_coeff * humidity_coeff * pressure_coeff * vegetation_coeff
    return ceil(est_time) * 24



endpoint_nlp = 'https://hackathon-serin.openai.azure.com/openai/deployments/gpt-4/chat/completions?api-version=2024-02-15-preview'
subscription_key_nlp = '$AZURE_NLP_SUBSCRIPTION_KEY'
deployment_nlp = 'gpt-4 (version:turbo-2024-04-09)'


client_nlp = AzureOpenAI(
    api_key=subscription_key_nlp,  # Replace with your actual API key
    api_version="2024-05-01-preview",
    azure_endpoint=endpoint_nlp  # Replace with your Azure OpenAI endpoint
)

def get_windy_fire_weather(lat, lon, api_key):
    url = "https://api.windy.com/api/point-forecast/v2"

    params = {
        "lat": lat,
        "lon": lon,
        "model": "gfs",  # Alternatif: "ecmwf", "icon", "nam"
        "parameters": ["wind", "dewpoint", "rh", "pressure", "temp"],
        "levels": ["surface", "850h"],
        "key": api_key
    }

    response = requests.post(url, json=params)

    if response.status_code == 200:
        data = response.json()

        # İstediğiniz key'lere karşılık gelen değerleri al
        weather_data = {
            'wind_u': data['wind_u-surface'][0],  # wind_u-surface'dan ilk değeri al
            'wind_v': data['wind_v-surface'][0],  # wind_v-surface'dan ilk değeri al
            'dewpoint': data['dewpoint-surface'][0],
            'rh': data['rh-surface'][0],
            'pressure': data['pressure-surface'][0],
            'temp': data['temp-surface'][0]
        }

        return weather_data  # İstediğiniz verileri içeren dictionary'yi döndür

    else:
        return f"Hata: {response.status_code}, {response.text}"

def get_json_data():




    api_key_weather = "WEATHER_API_KEY"

    full_data = []


    client_cv = ImageAnalysisClient(
        endpoint="https://hackhathondenemevisionv1.cognitiveservices.azure.com/",
        credential=AzureKeyCredential("AZURE_KEY_CREDENTIAL")
    )

    BASE_URL = "https://archive-api.open-meteo.com/v1/era5"

    # NASA Worldview API URL'si
    api_url = "https://wvs.earthdata.nasa.gov/api/v1/snapshot"

    # Kullanılacak katman (Sentinel-2 L2A - True Color)
    layers = "VIIRS_SNPP_CorrectedReflectance_TrueColor"

    # Çözünürlük (Yüksek kalite için 250m)
    resolution = 250  # 250m, 500m, 1000m gibi seçenekler var

    # # JSON dosyasını oku
    # with open("/content/filtered_coordinates.json", "r") as f:
    #     locations = json.load(f)


    MAP_KEY = "MAP_KEY"
    area_url = 'https://firms.modaps.eosdis.nasa.gov/api/area/csv/' + MAP_KEY + '/VIIRS_NOAA20_NRT/world/1'
    df_area = pd.read_csv(area_url)


    for i, row in df_area[50:55].iterrows():
        latitude = row["latitude"]
        longitude = row["longitude"]
        date = row["acq_date"]


        # API parametreleri
        params = {
            "REQUEST": "GetSnapshot",
            "TIME": date,
            "BBOX": f"{latitude-0.5},{longitude-0.5},{latitude+0.5},{longitude+0.5}",
            "CRS": "EPSG:4326",
            "LAYERS": layers,
            "WIDTH": "4000",  # Görüntü genişliği
            "HEIGHT": "4000",  # Görüntü yüksekliği
            "RESOLUTION": resolution
        }

        # API isteği gönder
        response = requests.get(api_url, params=params)

        # Yanıt başarılı mı?
        if response.status_code == 200:
            filename = "test_helper.txt"
            with open(filename, "wb") as file:
                # file.write(response.content)
                # image_path = filename
                # with open(image_path, "rb") as image_file:
                #     image_data = image_file.read()

                # # Görüntü analizi yap
                # result = client_cv.analyze(
                #     image_data=image_data,  # Burada URL yerine dosya içeriğini veriyoruz
                #     visual_features=[VisualFeatures.CAPTION, VisualFeatures.READ],
                #     gender_neutral_caption=True
                # )

                # print("Image analysis results:")
                # # Print caption results to the console
                # print(" Caption:")
                # if result.caption is not None:
                #     print(f"   '{result.caption.text}', Confidence {result.caption.confidence:.4f}")


                # os.remove(filename)

                chat_prompt = [
                    {
                        "role": "system",
                        "content": [
                            {
                                "type": "text",
                                "text": "You are a forester who has extensive knowledge on vegetation cover. According to the coordinates the user give, you will give the most populated plant from the list below. Only write the name of the plant as output, no explanation needed.\nPine\nEucalyptus\nCypress\nCedar\nJuniper\nFir\nSpruce\nChaparral\nPalmetto\nGorse\nBamboo\nHeath\nManzanita\nMesquite\nTamarisk\nOak\nMaple\nBirch\nPoplar\nLarch\nChestnut\nBlack Locust\nHickory\nSweetgum\nAcacia\nTeak\nKapok\nBrazilian Cerrado Trees\nMaquis\nPhrygana\nAspen\nAlder\nDogwood\nRedbud\nMagnolia\nSycamore\nBeech\nWillow\nCottonwood\nWalnut\nMangrove\nBaobab\nAvocado\nSequoia\n"
                            }
                        ]
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": f"{latitude},{longitude}"
                            }
                        ]
                    }
                ]

                # Include speech result if speech is enabled
                messages = chat_prompt

                completion = client_nlp.chat.completions.create(
                    model=deployment_nlp,
                    messages=messages,
                    max_tokens=800,
                    temperature=0.7,
                    top_p=0.95,
                    frequency_penalty=0,
                    presence_penalty=0,
                    stop=None,
                    stream=False
                )

                # completion.to_json() çıktısını bir değişkene atayalım
                completion_json = completion.to_json()

                # JSON verisini bir Python dictionary'sine dönüştürelim
                completion_dict = json.loads(completion_json)

                # "choices" listesindeki ilk elemanın "message" dictionary'sinden "content" kısmını alalım
                content = completion_dict["choices"][0]["message"]["content"]

                weather_data = get_windy_fire_weather(latitude, longitude, api_key_weather)


                print(weather_data)
                inventory = inventory_calc(FIRE_SIZE, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
                est_area_1hour = burned_area(1, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
                est_area_5hour = burned_area(5, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
                est_area_10hour = burned_area(10, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
                est_inventory_1hour = later_need_of_inventory(1, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
                est_inventory_5hour = later_need_of_inventory(5, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
                est_inventory_10hour = later_need_of_inventory(10, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))

                fire_duration = estimated_fire_duration_calc(FIRE_SIZE, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))


                around_1hour = np.sqrt(est_area_1hour[1])
                around_5hour = np.sqrt(est_area_5hour[1])
                around_10hour = np.sqrt(est_area_10hour[1])


                try:
                    water_sources_1hour = water_finder(around_1hour, latitude, longitude)
                except: 
                    water_1hour = []
                try:
                    water_sources_5hour = water_finder(around_5hour, latitude, longitude)
                except:
                    water_5hour = []
                try:
                    water_sources_10hour = water_finder(around_10hour, latitude, longitude)
                except:
                    water_10hour = []

                try:
                    outpost_sources_1hour = outpost_finder(around_1hour, latitude, longitude)
                except:
                    outpost_1hour = []
                try:
                    outpost_sources_5hour = outpost_finder(around_5hour, latitude, longitude)
                except:
                    outpost_5hour = []
                try:
                    outpost_sources_10hour = outpost_finder(around_10hour, latitude, longitude)
                except:
                    outpost_10hour = []

                try:
                    city_sources = city_finder3(1000000, latitude, longitude)
                except:
                    city_sources = []

                try:
                    outpost_names_1hour = [outpost[0] for outpost in outpost_sources_1hour]
                except:
                    outpost_names_1hour = []
                try:
                    outpost_names_5hour = [outpost[0] for outpost in outpost_sources_5hour]
                except:
                    outpost_names_5hour = []
                try:
                    outpost_names_10hour = [outpost[0] for outpost in outpost_sources_10hour]
                except:
                    outpost_names_10hour = []

                population_number_1hour = population_number(outpost_names_1hour)
                population_number_5hour = population_number(outpost_names_5hour)
                population_number_10hour = population_number(outpost_names_10hour)

                animal_number_1hour = animal_number(outpost_names_1hour)
                animal_number_5hour = animal_number(outpost_names_5hour)
                animal_number_10hour = animal_number(outpost_names_10hour)

                print(water_sources_1hour)

                data = {
                        'date': date,
                        'latitude': latitude,
                        'longitude': longitude,
                        'nature': content,
                        'inventory': inventory,
                        'est_area_1hour' : est_area_1hour,
                        'est_area_5hour' : est_area_5hour,
                        'est_area_10hour' : est_area_10hour,
                        'est_inventory_1hour' : est_inventory_1hour,
                        'est_inventory_5hour' : est_inventory_5hour,
                        'est_inventory_10hour' : est_inventory_10hour,
                        'fire_duration': fire_duration,
                        'water_sources_1hour': water_sources_1hour,
                        'water_sources_5hour': water_sources_5hour,
                        'water_sources_10hour': water_sources_10hour,
                        'outpost_sources_1hour': outpost_sources_1hour,
                        'outpost_sources_5hour': outpost_sources_5hour,
                        'outpost_sources_10hour': outpost_sources_10hour,
                        'population_number_1hour': population_number_1hour,
                        'population_number_5hour': population_number_5hour,
                        'population_number_10hour': population_number_10hour,
                        'animal_number_1hour': {'cow_number': animal_number_1hour[0], 'sheep_number': animal_number_1hour[1], 'chicken_number': animal_number_1hour[2]},
                        'animal_number_5hour': {'cow_number': animal_number_5hour[0], 'sheep_number': animal_number_5hour[1], 'chicken_number': animal_number_5hour[2]},
                        'animal_number_10hour': {'cow_number': animal_number_10hour[0], 'sheep_number': animal_number_10hour[1], 'chicken_number': animal_number_10hour[2]},
                        'city_sources' : city_sources,
                        'wind_u': weather_data['wind_u'],
                        'wind_v': weather_data['wind_v'],
                        'dewpoint': weather_data['dewpoint'],
                        'rh': weather_data['rh'],
                        'pressure': weather_data['pressure'],
                        'temp': weather_data['temp']
                    }


                print(data)

                full_data.append(data)
                

                with open('data.json', 'w', encoding='utf-8') as f:
                      json.dump(full_data, f, ensure_ascii=False, indent=4)


def get_water_source(latitude=71.2578,longitude=72.07068):


    chat_prompt = [
                    {
                        "role": "system",
                        "content": [
                            {
                                "type": "text",
                                "text": "You are a forester who has extensive knowledge on vegetation cover. According to the coordinates the user give, you will give the most populated plant from the list below. Only write the name of the plant as output, no explanation needed.\nPine\nEucalyptus\nCypress\nCedar\nJuniper\nFir\nSpruce\nChaparral\nPalmetto\nGorse\nBamboo\nHeath\nManzanita\nMesquite\nTamarisk\nOak\nMaple\nBirch\nPoplar\nLarch\nChestnut\nBlack Locust\nHickory\nSweetgum\nAcacia\nTeak\nKapok\nBrazilian Cerrado Trees\nMaquis\nPhrygana\nAspen\nAlder\nDogwood\nRedbud\nMagnolia\nSycamore\nBeech\nWillow\nCottonwood\nWalnut\nMangrove\nBaobab\nAvocado\nSequoia\n"
                            }
                        ]
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": f"{latitude},{longitude}"
                            }
                        ]
                    }
                ]

                # Include speech result if speech is enabled
    messages = chat_prompt

    completion = client_nlp.chat.completions.create(
                    model=deployment_nlp,
                    messages=messages,
                    max_tokens=800,
                    temperature=0.7,
                    top_p=0.95,
                    frequency_penalty=0,
                    presence_penalty=0,
                    stop=None,
                    stream=False
            )

                # completion.to_json() çıktısını bir değişkene atayalım
    completion_json = completion.to_json()

                # JSON verisini bir Python dictionary'sine dönüştürelim
    completion_dict = json.loads(completion_json)

                # "choices" listesindeki ilk elemanın "message" dictionary'sinden "content" kısmını alalım
    content = completion_dict["choices"][0]["message"]["content"]

    api_key_weather = "WEATHER_API_KEY"

    weather_data = get_windy_fire_weather(latitude, longitude, api_key_weather)
    
    est_area_1hour = burned_area(1, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
    est_area_5hour = burned_area(5, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
    est_area_10hour = burned_area(10, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
    
    around_1hour = np.sqrt(est_area_1hour[1])
    around_5hour = np.sqrt(est_area_5hour[1])
    around_10hour = np.sqrt(est_area_10hour[1])


    try:
        water_sources_1hour = water_finder(around_1hour, latitude, longitude)
    except: 
        water_sources_1hour = []
    try:
        water_sources_5hour = water_finder(around_5hour, latitude, longitude)
    except:
        water_sources_1hour = []
    try:
        water_sources_10hour = water_finder(around_10hour, latitude, longitude)
    except:
        water_sources_1hour = []
    
    data = {
                        'water_sources_1hour': water_sources_1hour,
                        'water_sources_5hour': water_sources_5hour,
                        'water_sources_10hour': water_sources_10hour,
                    }

    return data             

def get_all_data(latitude=71.2578,longitude=72.07068):
    api_key_weather = "WEATHER_API_KEY"


    chat_prompt = [
                {
                    "role": "system",
                    "content": [
                            {
                                "type": "text",
                                "text": "You are a forester who has extensive knowledge on vegetation cover. According to the coordinates the user give, you will give the most populated plant from the list below. Only write the name of the plant as output, no explanation needed.\nPine\nEucalyptus\nCypress\nCedar\nJuniper\nFir\nSpruce\nChaparral\nPalmetto\nGorse\nBamboo\nHeath\nManzanita\nMesquite\nTamarisk\nOak\nMaple\nBirch\nPoplar\nLarch\nChestnut\nBlack Locust\nHickory\nSweetgum\nAcacia\nTeak\nKapok\nBrazilian Cerrado Trees\nMaquis\nPhrygana\nAspen\nAlder\nDogwood\nRedbud\nMagnolia\nSycamore\nBeech\nWillow\nCottonwood\nWalnut\nMangrove\nBaobab\nAvocado\nSequoia\n"
                            }
                        ]
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": f"{latitude},{longitude}"
                            }
                        ]
                    }
                ]

                # Include speech result if speech is enabled
    messages = chat_prompt

    completion = client_nlp.chat.completions.create(
                    model=deployment_nlp,
                    messages=messages,
                    max_tokens=800,
                    temperature=0.7,
                    top_p=0.95,
                    frequency_penalty=0,
                    presence_penalty=0,
                    stop=None,
                    stream=False
                )

                # completion.to_json() çıktısını bir değişkene atayalım
    completion_json = completion.to_json()

                # JSON verisini bir Python dictionary'sine dönüştürelim
    completion_dict = json.loads(completion_json)

                # "choices" listesindeki ilk elemanın "message" dictionary'sinden "content" kısmını alalım
    content = completion_dict["choices"][0]["message"]["content"]

    weather_data = get_windy_fire_weather(latitude, longitude, api_key_weather)


    print(weather_data)
    inventory = inventory_calc(FIRE_SIZE, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
    est_area_1hour = burned_area(1, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
    est_area_5hour = burned_area(5, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
    est_area_10hour = burned_area(10, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
    est_inventory_1hour = later_need_of_inventory(1, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
    est_inventory_5hour = later_need_of_inventory(5, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
    est_inventory_10hour = later_need_of_inventory(10, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))

    fire_duration = estimated_fire_duration_calc(FIRE_SIZE, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))


    around_1hour = np.sqrt(est_area_1hour[1])
    around_5hour = np.sqrt(est_area_5hour[1])
    around_10hour = np.sqrt(est_area_10hour[1])


    try:
        water_sources_1hour = water_finder(around_1hour, latitude, longitude)
    except: 
        water_1hour = []
    try:
        water_sources_5hour = water_finder(around_5hour, latitude, longitude)
    except:
        water_5hour = []
    try:
        water_sources_10hour = water_finder(around_10hour, latitude, longitude)
    except:
        water_10hour = []

    try:
        outpost_sources_1hour = outpost_finder(around_1hour, latitude, longitude)
    except:
        outpost_1hour = []
    try:
        outpost_sources_5hour = outpost_finder(around_5hour, latitude, longitude)
    except:
        outpost_5hour = []
    try:
        outpost_sources_10hour = outpost_finder(around_10hour, latitude, longitude)
    except:
        outpost_10hour = []

    try:
        city_sources = city_finder3(1000000, latitude, longitude)
    except:
        city_sources = []

    try:
        outpost_names_1hour = [outpost[0] for outpost in outpost_sources_1hour]
    except:
        outpost_names_1hour = []
    try:
        outpost_names_5hour = [outpost[0] for outpost in outpost_sources_5hour]
    except:
        outpost_names_5hour = []
    try:
        outpost_names_10hour = [outpost[0] for outpost in outpost_sources_10hour]
    except:
        outpost_names_10hour = []

    population_number_1hour = population_number(outpost_names_1hour)
    population_number_5hour = population_number(outpost_names_5hour)
    population_number_10hour = population_number(outpost_names_10hour)

    animal_number_1hour = animal_number(outpost_names_1hour)
    animal_number_5hour = animal_number(outpost_names_5hour)
    animal_number_10hour = animal_number(outpost_names_10hour)

    print(water_sources_1hour)

    data = {
            'latitude': latitude,
            'longitude': longitude,
            'nature': content,
            'inventory': inventory,
            'est_area_1hour' : est_area_1hour,
            'est_area_5hour' : est_area_5hour,
            'est_area_10hour' : est_area_10hour,
            'est_inventory_1hour' : est_inventory_1hour,
            'est_inventory_5hour' : est_inventory_5hour,
            'est_inventory_10hour' : est_inventory_10hour,
            'fire_duration': fire_duration,
            'water_sources_1hour': water_sources_1hour,
            'water_sources_5hour': water_sources_5hour,
            'water_sources_10hour': water_sources_10hour,
            'outpost_sources_1hour': outpost_sources_1hour,
            'outpost_sources_5hour': outpost_sources_5hour,
            'outpost_sources_10hour': outpost_sources_10hour,
            'population_number_1hour': population_number_1hour,
            'population_number_5hour': population_number_5hour,
            'population_number_10hour': population_number_10hour,
            'animal_number_1hour': {'cow_number': animal_number_1hour[0], 'sheep_number': animal_number_1hour[1], 'chicken_number': animal_number_1hour[2]},
            'animal_number_5hour': {'cow_number': animal_number_5hour[0], 'sheep_number': animal_number_5hour[1], 'chicken_number': animal_number_5hour[2]},
            'animal_number_10hour': {'cow_number': animal_number_10hour[0], 'sheep_number': animal_number_10hour[1], 'chicken_number': animal_number_10hour[2]},
            'city_sources' : city_sources,
            'wind_u': weather_data['wind_u'],
            'wind_v': weather_data['wind_v'],
            'dewpoint': weather_data['dewpoint'],
            'rh': weather_data['rh'],
            'pressure': weather_data['pressure'],
            'temp': weather_data['temp']
            }


    print(data)

    return data

def get_outpost_source(latitude=71.2578,longitude=72.07068):
    

    api_key_weather = "WEATHER_API_KEY"
    chat_prompt = [
                    {
                        "role": "system",
                        "content": [
                            {
                                "type": "text",
                                "text": "You are a forester who has extensive knowledge on vegetation cover. According to the coordinates the user give, you will give the most populated plant from the list below. Only write the name of the plant as output, no explanation needed.\nPine\nEucalyptus\nCypress\nCedar\nJuniper\nFir\nSpruce\nChaparral\nPalmetto\nGorse\nBamboo\nHeath\nManzanita\nMesquite\nTamarisk\nOak\nMaple\nBirch\nPoplar\nLarch\nChestnut\nBlack Locust\nHickory\nSweetgum\nAcacia\nTeak\nKapok\nBrazilian Cerrado Trees\nMaquis\nPhrygana\nAspen\nAlder\nDogwood\nRedbud\nMagnolia\nSycamore\nBeech\nWillow\nCottonwood\nWalnut\nMangrove\nBaobab\nAvocado\nSequoia\n"
                            }
                        ]
                    },
                    {
                        "role": "user",
                        "content": [
                            {
                                "type": "text",
                                "text": f"{latitude},{longitude}"
                            }
                        ]
                    }
                ]

                # Include speech result if speech is enabled
    messages = chat_prompt

    completion = client_nlp.chat.completions.create(
                    model=deployment_nlp,
                    messages=messages,
                    max_tokens=800,
                    temperature=0.7,
                    top_p=0.95,
                    frequency_penalty=0,
                    presence_penalty=0,
                    stop=None,
                    stream=False
    )

                # completion.to_json() çıktısını bir değişkene atayalım
    completion_json = completion.to_json()

                # JSON verisini bir Python dictionary'sine dönüştürelim
    completion_dict = json.loads(completion_json)

                # "choices" listesindeki ilk elemanın "message" dictionary'sinden "content" kısmını alalım
    content = completion_dict["choices"][0]["message"]["content"]

    weather_data = get_windy_fire_weather(latitude, longitude, api_key_weather)



    est_area_1hour = burned_area(1, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
    est_area_5hour = burned_area(5, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
    est_area_10hour = burned_area(10, wind_u=weather_data['wind_u'], wind_v=weather_data['wind_v'], temperature=weather_data['temp'], dewpoint=weather_data['dewpoint'], humidity=weather_data['rh'], pressure=weather_data['pressure'], vegetation=str(content))
                


    around_1hour = np.sqrt(est_area_1hour[1])
    around_5hour = np.sqrt(est_area_5hour[1])
    around_10hour = np.sqrt(est_area_10hour[1])




    try:
        outpost_sources_1hour = outpost_finder(around_1hour, latitude, longitude)
    except:
        outpost_sources_1hour = []
    try:
       outpost_sources_5hour = outpost_finder(around_5hour, latitude, longitude)
    except:
        outpost_sources_5hour = []
    try:
        outpost_sources_10hour = outpost_finder(around_10hour, latitude, longitude)
    except:
        outpost_sources_10hour = []



    data = {
            'outpost_sources_1hour': outpost_sources_1hour,
            'outpost_sources_5hour': outpost_sources_5hour,
            'outpost_sources_10hour': outpost_sources_10hour,
            }

    return data


def get_nasa_data():
    MAP_KEY = "MAP_KEY"
    area_url = 'https://firms.modaps.eosdis.nasa.gov/api/area/csv/' + MAP_KEY + '/VIIRS_NOAA20_NRT/world/1'
    df_area = pd.read_csv(area_url)


    df_area.to_csv("area.csv", index=False)

    data = [] 


    for i, row in df_area.iterrows():
        if(i % 100 == 0):
            data.append({
                "latitude": row["latitude"],
                "longitude": row["longitude"],
            })
    return data