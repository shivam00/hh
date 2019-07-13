1. language node
2. Unzip folder
3. dependencies node > 9, npm
4. npm install yarn
5. to install dependencies  "yarn"
6. To test App "yarn test"
7. to run app "yarn start"
8. API localhost:3000/

Insert data : post request at localhost:3000/
Get data : get request at localhost:3000/

API 

#1.
Request      
get the api without post

Response:
{
    "data": {},
    "status": "200",
    "message": "please call Post API to insert the data"
}

#2
Request:
Post
{
"Pete": "Nick",
"Barbara": "Nick",
"Nick": "Sophie"
}

Response:
{
    "status": "200",
    "message": "Success"
}

#3
Request:
Post
{
"Pete": "Nick",
"Nick": "Pete"
}

Response:
{
    "status": "400",
    "error": "Loop Found in the data"
}

#4
Request
Post
{
"Pete": "Nick",
"Nick": "Nick"
}

Response:
{
    "status": "400",
    "error": "Supervisor name and employee name Cant be same"
}

#5
Request :
Post and get correct data
{
"Pete": "Nick",
"Barbara": "Nick",
"Nick": "Sophie",
"Sophie": "Jonas"
}

Answer:
{
    "data": {
        "Jonas": {
            "Sophie": {
                "Nick": {
                    "Barbara": {},
                    "Pete": {}
                }
            }
        }
    },
    "status": "200"
}

