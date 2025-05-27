import { Module } from '@nestjs/common';
import { ICompanyServices } from '../../../core/abstracts/company-services.service';


import { CompanyService } from './company-service.service';

@Module({
  providers: [
    {
      provide: ICompanyServices,
      useClass: CompanyService
    }    
  ],
  exports: [ICompanyServices]
})
export class CompanyServiceModule { }
