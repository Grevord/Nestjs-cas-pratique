

## Project setup

```bash
$ npm install
```

## Create .env file

Create a .env file in root directory containing the folowing :

```
CLIENT_ID=id
CLIENT_SECRET=secret
```


## Compile and run the project

In the terminal

```bash
$ npm run start
```

## Access the api

The base route is :
```
 http://localhost:3000/api?city=[yourcity]&job=[yourjob]&limit=number
```

Params :
```
City : name of the city use in the search
Job : Job name or part of the job name
Limit: number of element to show
```