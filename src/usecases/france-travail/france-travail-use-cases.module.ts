import { Module } from '@nestjs/common';
import { CompanyUseCases } from './company-use-cases';
import { FranceTravailServicesModule } from '../../services/france-travail-services/france-travail-services.module';

@Module({
  imports: [FranceTravailServicesModule],
  providers: [CompanyUseCases],
  exports: [CompanyUseCases],
})
export class FranceTravailModule {}
