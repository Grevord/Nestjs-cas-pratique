import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ICompanyServices } from '../../../core/abstracts/company-services.service';

import { CompanyService } from './company-service.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: ICompanyServices,
      useClass: CompanyService,
    },
  ],
  exports: [ICompanyServices],
})
export class CompanyServiceModule {}
