import { Controller, Get, Query } from '@nestjs/common';
import { CompanyUseCases } from 'src/usecases/france-travail/company-use-cases';

@Controller('api/')
export class FranceTravailController {
    constructor(private companyUseCases: CompanyUseCases){}


    @Get()
    async getCompanies(@Query('city') city: string, @Query('job') job: string){
        return this.companyUseCases.getCompaniesByJobAndSector(city, job)
    }

}

