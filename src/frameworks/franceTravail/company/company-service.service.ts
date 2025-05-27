import { Injectable } from '@nestjs/common';
import { ICompanyServices } from 'src/core/abstracts/company-services.service';
import { Company } from 'src/core/entities/company.enity';
@Injectable()
export class CompanyService implements ICompanyServices {
  getCompaniesByJobAndSector(city: string, job: string): Promise<Company[]> {
   
    const testCompany1 = new Company();
    const testCompany2 = new Company();

    const test = new Promise<Company[]>((res) => {
      res( [testCompany1, testCompany2]);
    })

    return test;

  }
 
}
