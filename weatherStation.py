"""given a beginning number and end number,
 prints out the names of weather stations, and assigns them with a unique weather type
    """

import random
import json
s = 100
e = 0
b = ""
biome = ["rainforest","tundra","desert","plains"]
class makeWeatherStation:
    def __init__(self,):
        self.biome = random.choice(biome)
        self.coordinates = []
        self.temp = 0
        self.hum = 0
        self.wind = 0
        self.battery = 100
        self.name = ""
    def makeTemp(self):
        if(self.biome == "rainforest"):
          self.temp = random.randint(70,85)
        elif (self.biome == "tundra"):
             self.temp = random.randint(-15, 20)
        elif (self.biome == "desert"):
             self.temp = random.randint(90, 110)
        elif (self.biome == "plains"):
            self.temp = random.randint(45, 69)

    def makeHum(self):
        if (self.biome == "rainforest"):

                self.hum = random.randint(77, 88)
        elif (self.biome == "tundra"):
                self.hum = random.randint(1, 15)
        elif (self.biome == "desert"):
                self.hum  = random.randint(20,30)
        elif (self.biome == "plains"):
                self.hum =random.randint(50, 65)

    def makeWind(self):
        if (self.biome == "rainforest"):
                self.wind = random.randint(3, 10)
        elif (self.biome == "tundra"):
              self.wind = random.randint(50,200)
        elif (self.biome == "desert"):
                self.wind = random.randint(4, 11)
        elif (self.biome == "plains"):
                self.wind = random.randint(10, 30)

    def makeLongAndLat(self):
        if (self.biome == "rainforest"):
            self.coordinates = [random.uniform(76.234587, 72.458019),random.uniform(-47.421122, -33.847574)]
        elif (self.biome == "tundra"):
            self.coordinates = [random.uniform(76.234587, 72.458019),random.uniform(-47.421122, -33.847574)]

        elif (self.biome == "desert"):
            self.coordinates = [random.uniform(37.637423,40.723223),random.uniform(-119.774298, -116.331553)]

        elif (self.biome == "plains"):
            self.coordinates = [random.uniform(42.193239,44.211069),random.uniform(-109.993484, -105.423172)]

    def simulateDay(self,days):
        for x in range(days):
            self.makeTemp()
            self.makeWind()
            self.makeHum()
            self.battery -= random.randint(1,5)
jsonStr = ""
stations = []
weatherStation = makeWeatherStation()
weatherStation2 = makeWeatherStation()
weatherStation3 = makeWeatherStation()
weatherStation4 = makeWeatherStation()
weatherStation5 = makeWeatherStation()
stations.append(weatherStation)
stations.append(weatherStation2)
stations.append(weatherStation3)
stations.append(weatherStation4)
stations.append(weatherStation5)
c = 1
for i in stations:

     i.name = "weatherStation " + str(c)
     c = c+1
for x in stations:

    x.makeTemp()
    x.makeHum()
    x.makeWind()
    x.makeLongAndLat()
    jsonStr += "{\"type\": \"Feature\", \"geometry\":{\"type\": \"Point\", \"coordinates\":" + str(x.coordinates) + "},\"properties\": " + json.dumps(x.__dict__)
    jsonStr += "\n"



f = open("stationCreation.json","w+")
f.write(jsonStr)
f.close()
