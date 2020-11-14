import json
from random import random, randrange
def getRandomIndex(start = 1,end = 10):
    return int(randrange(start, end))

def getSkills(noOfSkills):
    skills = ["java", "python","full stack","sql","mongodb", "react","angular", "fultter","devops","docker","texting"]
    temp = []
    for i in range(0, noOfSkills):
        temp.append(skills[getRandomIndex(end = len(skills))])
    return temp

def getDesignation():
    pos = ["manager", "developer","tester","hr","engineer","admin"]
    return pos[getRandomIndex(end = len(pos))]


def getDoj():
    return f"{getRandomIndex(end = 25)}-{getRandomIndex(end = 11)}-{getRandomIndex(2010, 2020)}"

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


    
