
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ICompanyServices } from 'src/core/abstracts/company-services.service';
import { AuthCredEntity } from 'src/core/entities/auth-cred.entity';
import { Company } from 'src/core/entities/company.entity';


@Injectable()
export class CompanyService extends ICompanyServices {  


  async getCompaniesByJobAndSector(city: string, job: string): Promise<Company[]> {
   

    const authInfo = await this.getAuthCredentials();


    let token = `${authInfo.token_type} ${authInfo.access_token}`;
    console.log(process.env.CLIENT_ID);
    

    const { data } = await firstValueFrom(
      this.httpService.get(`https://api.francetravail.io/partenaire/labonneboite/v2/recherche?city=Dijon&job=Boul`, 
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
    return data;

  }

  protected async getAuthCredentials(): Promise<AuthCredEntity> {
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
          }
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


