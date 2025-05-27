import { Module } from '@nestjs/common';
import { FranceTravailController } from './france-travail/france-travail.controller';

@Module({
  imports: [],
  controllers: [FranceTravailController],
  providers: [],
  exports: [],
})
export class ControllerModule {}
