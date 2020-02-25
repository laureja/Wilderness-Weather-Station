import random
import json

biome = ["rainforest","tundra","desert","plains"]

class makeWeatherStation:
    def __init__(self):
        self.biome = random.choice(biome)
        self.coordinates = []
        self.temp = []
        self.hum = []
        self.wind = []
        self.battery = 100

    def makeTemp(self):
        if(self.biome == "rainforest"):
            for x in range(50):
                self.temp.append(random.randint(70,85))
        elif (self.biome == "tundra"):
            for x in range(50):
                self.temp.append(random.randint(-15, 20))
        elif (self.biome == "desert"):
            for x in range(50):
                self.temp.append(random.randint(90, 110))
        elif (self.biome == "plains"):
            for x in range(50):
                self.temp.append(random.randint(45, 69))

    def makeHum(self):
        if (self.biome == "rainforest"):
            for x in range(50):
                self.hum.append(random.randint(77, 88))
        elif (self.biome == "tundra"):
            for x in range(50):
                self.hum.append(random.randint(1, 15))
        elif (self.biome == "desert"):
            for x in range(50):
                self.hum.append(random.randint(20,30))
        elif (self.biome == "plains"):
            for x in range(50):
                self.hum.append(random.randint(50, 65))

    def makeWind(self):
        if (self.biome == "rainforest"):
            for x in range(50):
                self.wind.append(random.randint(3, 10))
        elif (self.biome == "tundra"):
            for x in range(50):
                self.wind.append(random.randint(50,200))
        elif (self.biome == "desert"):
            for x in range(50):
                self.wind.append(random.randint(4, 11))
        elif (self.biome == "plains"):
            for x in range(50):
                self.wind.append(random.randint(10, 30))
    def makeLongAndLat(self):
        if (self.biome == "rainforest"):
            self.coordinates.append(random.uniform(76.234587, 72.458019))
            self.coordunates.append(random.uniform(-47.421122, -33.847574))
        elif (self.biome == "tundra"):
            self.coordinates.append(random.uniform(76.234587, 72.458019))
            self.coordinates.append(random.uniform(-47.421122, -33.847574))
        elif (self.biome == "desert"):
            self.coordinates.append(random.uniform(37.637423,40.723223))
            self.coordinates.append(random.uniform(-119.774298, -116.331553))
        elif (self.biome == "plains"):
            self.coordinates.append(random.uniform(42.193239,44.211069))
            self.coordinates.append(random.uniform(-109.993484, -105.423172))
    def simulateDay(self,days):
        for x in range(days):
            self.makeTemp()
            self.makeWind()
            self.makeHum()
            self.battery -= random.randint(1,5)
            
    


biome = makeWeatherStation()
biome.makeTemp()
biome.makeHum()
biome.makeWind()
biome.makeLongAndLat()
jsonStr = "{\"type\": \"Feature\", \"geometry\":{\"type\": \"Point\", \"coordinates\":" + str(biome.coordinates) + "},\"properties\": " + json.dumps(biome.__dict__)


print(jsonStr)
