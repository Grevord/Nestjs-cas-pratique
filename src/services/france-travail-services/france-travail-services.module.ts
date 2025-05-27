import { Module } from '@nestjs/common';

import { CompanyServiceModule } from '../../frameworks/franceTravail/company/company-service.module'

@Module({
  imports: [CompanyServiceModule],
  exports: [CompanyServiceModule]
})
export class FranceTravailServicesModule {}
