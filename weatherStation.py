import random
import json
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

cred = credentials.Certificate("./wilderness-weather-stati-d17e8-firebase-adminsdk-ya554-26ff292e9f.json")
default_app = firebase_admin.initialize_app(cred)

db = firestore.client()


biomes= ["rainforest", "tundra", "desert", "plains"]


class makeWeatherStation:
    def __init__(self):
        self.biome = random.choice(biomes)
        self.coordinates = []
        self.temp = []
        self.hum = []
        self.wind = []
        self.battery = 100

    def makeTemp(self):
        if self.biome == "rainforest":
            for x in range(50):
                self.temp.append(random.randint(70, 85))
        elif self.biome == "tundra":
            for x in range(50):
                self.temp.append(random.randint(-15, 20))
        elif self.biome == "desert":
            for x in range(50):
                self.temp.append(random.randint(90, 110))
        elif self.biome == "plains":
            for x in range(50):
                self.temp.append(random.randint(45, 69))

    def makeHum(self):
        if self.biome == "rainforest":
            for x in range(50):
                self.hum.append(random.randint(77, 88))
        elif self.biome == "tundra":
            for x in range(50):
                self.hum.append(random.randint(1, 15))
        elif self.biome == "desert":
            for x in range(50):
                self.hum.append(random.randint(20, 30))
        elif self.biome == "plains":
            for x in range(50):
                self.hum.append(random.randint(50, 65))

    def makeWind(self):
        if self.biome == "rainforest":
            for x in range(50):
                self.wind.append(random.randint(3, 10))
        elif self.biome == "tundra":
            for x in range(50):
                self.wind.append(random.randint(50, 200))
        elif self.biome == "desert":
            for x in range(50):
                self.wind.append(random.randint(4, 11))
        elif self.biome == "plains":
            for x in range(50):
                self.wind.append(random.randint(10, 30))

    def makeLongAndLat(self):
        if self.biome == "rainforest":
            self.coordinates.append(random.uniform(76.234587, 72.458019))
            self.coordinates.append(random.uniform(-47.421122, -33.847574))
        elif self.biome == "tundra":
            self.coordinates.append(random.uniform(76.234587, 72.458019))
            self.coordinates.append(random.uniform(-47.421122, -33.847574))
        elif self.biome == "desert":
            self.coordinates.append(random.uniform(37.637423, 40.723223))
            self.coordinates.append(random.uniform(-119.774298, -116.331553))
        elif self.biome == "plains":
            self.coordinates.append(random.uniform(42.193239, 44.211069))
            self.coordinates.append(random.uniform(-109.993484, -105.423172))

    def simulateDay(self, days):
        for x in range(days):
            self.makeTemp()
            self.makeWind()
            self.makeHum()
            self.battery -= random.randint(1, 5)

def uploadtests():
    for x in range(3):
        biome = makeWeatherStation()
        biome.makeTemp()
        biome.makeHum()
        biome.makeWind()
        biome.makeLongAndLat()

        iteration = str(x)
        ref_station_type = db.collection(u'station'+iteration).document(u'Type')
        ref_station_geometry = db.collection(u'station'+iteration).document(u'Geometry')


        stationData = {
          u'Type': u'Feature'
        }

        geometryData={
            u'Type':u'Point',
            u'Coordinates':biome.coordinates,
            u'Properties':{
                u'battery': biome.battery,
                u'biome': biome.biome,
                u'temp': biome.temp,
                u'coordinates': biome.coordinates,
                u'humidity': biome.hum,
                u'wind': biome.wind,
                }
        }

        ref_station_type.set(stationData)
        ref_station_geometry.set(geometryData)

uploadtests()
