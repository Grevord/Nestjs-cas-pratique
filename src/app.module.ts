import { Module } from '@nestjs/common';

//Controllers
import { FranceTravailController } from './controllers/france-travail/france-travail.controller';

//Modules
import { ThrottlerModule } from '@nestjs/throttler';
import { FranceTravailServicesModule } from './services/france-travail-services/france-travail-services.module';

//UseCases
import { FranceTravailModule } from './usecases/france-travail/france-travail-use-cases.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 2,
        },
      ],
    }),
    FranceTravailModule,
    FranceTravailServicesModule
  ],
  controllers: [FranceTravailController],
  providers: [],
})
export class AppModule {}
