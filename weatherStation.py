"""Standard API get call for rapidAPI api, will use to get data."""
import requests
import random
import json

def getInfo(c):
    url = "https://covid-193.p.rapidapi.com/statistics"

    querystring = {"country":c}

    headers = {
    'x-rapidapi-host': "covid-193.p.rapidapi.com",
    'x-rapidapi-key': "18f213381bmshfae7bdf8680ceaep120d66jsnf626bc5aa4a1"
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    response.encoding = 'utf-8'

    json_response = response.json()

    country = json_response['response'][0]
    day = json_response['response'][0]["day"]
    time = json_response['response'][0]["time"]
    new = json_response['response'][0]["cases"]["new"]
    active =  json_response['response'][0]["cases"]["active"]
    crit = json_response['response'][0]["cases"]["critical"]
    recov = json_response['response'][0]["cases"]["recovered"]
    newDeaths = json_response['response'][0]["deaths"]["new"]
    totalDeaths = json_response['response'][0]["deaths"]["total"]
    total=  json_response['response'][0]["cases"]["total"]

    new = new[1:]
    newDeaths = newDeaths[1:]

    def toString():

        return   "Stats in: " + c + "-> New cases: " + str(new) +  " Active cases: " + str(active) + " Critical cases: " + str(crit) + " Recoveries: " + str(recov) + " New Deaths: "+ str(newDeaths) + " Total Deaths: " + str(totalDeaths)+ " Total infections: " +str(total)+ " Day: "+ str(day)+ " Time: " + str(time)

    print(country)
    print(toString())
getInfo("China")


