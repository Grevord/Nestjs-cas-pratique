import { Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { HttpService } from '@nestjs/axios';
import { AuthCredEntity } from '../entities/auth-cred.entity';

@Injectable()
export abstract class ICompanyServices {

    constructor(readonly httpService: HttpService){}

    abstract getCompaniesByJobAndSector(city: string, job: string): Promise<Company[]>
    protected abstract getAuthCredentials(): Promise<AuthCredEntity>
}
