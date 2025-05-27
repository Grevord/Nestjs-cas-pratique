import { Injectable } from '@nestjs/common';
import { Company } from '../entities/company.enity';
@Injectable()
export abstract class ICompanyServices {
    abstract getCompaniesByJobAndSector(city: string, job: string): Promise<Company[]>
}
