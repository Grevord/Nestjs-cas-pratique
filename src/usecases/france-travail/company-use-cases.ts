import { Injectable } from "@nestjs/common";
import { ICompanyServices } from "src/core/abstracts/company-services.service";
import { Company } from "src/core/entities/company.entity";

@Injectable()
export class CompanyUseCases {
    constructor(
        private companyServices: ICompanyServices
    ) {}

    getCompaniesByJobAndSector(city: string, job: string): Promise<Company[]> {
        return this.companyServices.getCompaniesByJobAndSector(city, job);
    }
}
