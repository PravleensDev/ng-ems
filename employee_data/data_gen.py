import json
from random import random, randrange

skills = [" ML", " java", " python"," full stack"," sql"," mongodb", " react"," angular", " fultter"," devops"," docker"," testing"]
pos = [
    " Senior Engg",
    " Senior Dev",
    " Developer",
    " Traniee",
    " Engineer",
    " System Admin"
  ]


def getRandomIndex(start = 1,end = 10):
    return int(randrange(start, end))

def getSkills(noOfSkills):
    
    temp = []
    for i in range(0, noOfSkills):
        skill = skills[getRandomIndex(end = len(skills))]
        if not(skill in temp):
            temp.append(skill)
    return temp


def getEmail(empName):
    return empName.replace(" ",".") + "@gmail.com"

def getDesignation():
   
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
count = 23
for i in data["data"]:
    index = getRandomIndex()
    i["skills"] = getSkills(index)
    i["designation"] = getDesignation()
    i["DOJ"] = getDoj()
    i["employee_email"] = getEmail(i["employee_name"])
    i["employee_password"] = "12345"
    i["emp_id"] = count
    count += 1
    newData.append(i);

with open("db.json","w") as f:
    json.dump({"data":newData, "skills": skills, "designations":pos},f)

print({"data":newData, "skills": skills, "designations":pos})


    
