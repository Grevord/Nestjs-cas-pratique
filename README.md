

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




#

# Réalisation des différentes étapes

## Limitation à deux appels par secondes

Pour cela, l'utilisation du ThrottlerModule dans le [AppModule](https://github.com/Grevord/Nestjs-cas-pratique/blob/master/src/app.module.ts) a permis la limitation du nombre d'appels sur la totalité de l'application.

```ts
 ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 2,
        },
      ],
    }),
```

## Recherche des X Entreprises d'une ville ayant le plus haut potentiel d'embauche

### Controller

Pour ce qui est du [controller](https://github.com/Grevord/Nestjs-cas-pratique/tree/master/src/controllers/france-travail) nous avons une requête comprenant 3 paramètres:
```ts
  @Get()
  async getCompanies(
    @Query('city') city: string,
    @Query('job') job: string,
    @Query('limit') limit: number,
  ) {
    return this.companyUseCases.getCompaniesByJobAndSector(city, job, limit);
  }
```


### Service


L'ensemble du code pour cette fonctionalitée se trouve dans [Company-service.service.ts](https://github.com/Grevord/Nestjs-cas-pratique/blob/master/src/frameworks/franceTravail/company/company-service.service.ts)


Dans une méthode protégée on récupère les identifiants depuis nos variables d'environement puis on fait une demande à l'API de france travail:
```ts
 protected async getAuthCredentials(): Promise<AuthCredEntity> {

    if(!process.env.CLIENT_ID || !process.env.CLIENT_SECRET){
      throw "No auth credentials provided in env"
    }


    let query = {
      'grant_type': 'client_credentials',
      'client_id': process.env.CLIENT_ID,
      'client_secret': process.env.CLIENT_SECRET,
      'scope': 'api_labonneboitev2 search office' 
    };

    const { data } = await firstValueFrom(
      this.httpService.post('https://francetravail.io/connexion/oauth2/access_token?realm=/partenaire',
        query, 
        {
          headers: {  
            'Content-Type': 'application/x-www-form-urlencoded', 
          },
        }
      ).pipe(
        catchError((error: AxiosError) => {
          throw "Failed to Auth";
        })
      )
    )
    return data;
  }
  ```
Puis la requête pour récupérer la liste des entreprises est effectuée en utilisant le token ainsi récupéré :
```ts
  const authInfo = await this.getAuthCredentials();
    let token = `${authInfo.token_type} ${authInfo.access_token}`;

    const { data } = await firstValueFrom(
      this.httpService.get(`https://api.francetravail.io/partenaire/labonneboite/v2/recherche?city=${city}&job=${job}&page_size=100`, 
        {
          headers: { 
            'Accept': 'application/json', 
            'Authorization': token
        }
        }
      ).pipe(
        catchError((error: AxiosError) => {
          throw "Failed to retrieve data";
        })
      )
    )
```

pour la suite il suffira de trier nos résultats : 
```ts
const companies: Array<Company> = data.items;
const filteredByHighPotential = companies.filter(c => c.is_high_potential);
const orderedByPotentialValue = filteredByHighPotential.sort(({hiring_potential:a}, {hiring_potential:b}) => b - a );
const limitResultsShown = orderedByPotentialValue.slice(0, limit ?? orderedByPotentialValue.length );


return limitResultsShown;
```

# Remarques

 - Les tokens générés par france travail sont valable pendant 24 minutes, il y a surement une meilleure méthode que celle de regénérer à chaque appels.