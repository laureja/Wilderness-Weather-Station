"""given a beginning number and end number,
 prints out the names of weather stations, and assigns them with a unique weather type
    """

import random
import json
s = 100
e = 0
b = ""
biome = ["rainforest","tundra","desert","plains"]
class makeBiome:
    def __init__(self,):
        self.biome = random.choice(biome)
        self.temp = []
        self.hum = []
        self.wind = []

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


biome = makeBiome()
biome.makeTemp()
biome.makeHum()
biome.makeWind()

jsonStr = json.dumps(biome.__dict__)

print(jsonStr)