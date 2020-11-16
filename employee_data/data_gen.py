import json
from random import random, randrange
def getRandomIndex(start = 1,end = 10):
    return int(randrange(start, end))

def getSkills(noOfSkills):
    skills = [" ML", "java", " python"," full stack"," sql"," mongodb", " react"," angular", " fultter"," devops"," docker"," testing"]
    temp = []
    for i in range(0, noOfSkills):
        skill = skills[getRandomIndex(end = len(skills))]
        if not(skill in temp):
            temp.append(skill)
    return temp

def getDesignation():
    pos = [" manager", " developer"," tester"," hr"," engineer"," admin"]
    return pos[getRandomIndex(end = len(pos))]


def getDoj():
    monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
    return f"{getRandomIndex(end = 25)}-{monthNames[getRandomIndex(end = 11)]}-{getRandomIndex(2010, 2020)}"

data_file = open("db.json");
with data_file as f:
    data = json.loads(f.read())




newData = []
for i in data["data"]:
    index = getRandomIndex()
    i["skills"] = getSkills(index)
    i["designation"] = getDesignation()
    i["DOJ"] = getDoj()
    newData.append(i);

with open("db1.json","w") as f:
    json.dump({"data":newData},f)

print({"data":newData})


    
