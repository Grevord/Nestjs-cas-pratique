
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ICompanyServices } from 'src/core/abstracts/company-services.service';
import { AuthCredEntity } from 'src/core/entities/auth-cred.entity';
import { Company } from 'src/core/entities/company.entity';


@Injectable()
export class CompanyService extends ICompanyServices {  

  
  async getCompaniesByJobAndSector(city: string, job: string, limit: number): Promise<Company[]> {

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
          console.log(error)
          throw "Failed to retrieve data";
        })
      )
    )

    // Récupère les entreprises depuis le résultat de la requete
    const companies: Array<Company> = data.items;
    const filteredByHighPotential = companies.filter(c => c.is_high_potential)
    const orderedByPotentialValue = filteredByHighPotential.sort(({hiring_potential:a}, {hiring_potential:b}) => b - a )
    const limitResultsShown = orderedByPotentialValue.slice(0, limit ?? orderedByPotentialValue.length )


    return limitResultsShown;

  }

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
 
}


