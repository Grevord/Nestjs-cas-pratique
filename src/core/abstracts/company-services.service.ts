import { Injectable } from '@nestjs/common';
import { Company } from '../entities/company.entity';
import { HttpService } from '@nestjs/axios';
import { AuthCredEntity } from '../entities/auth-cred.entity';

@Injectable()
export abstract class ICompanyServices {
  constructor(protected readonly httpService: HttpService) {}

  abstract getCompaniesByJobAndSector(
    city: string,
    job: string,
    limit: number,
  ): Promise<Company[]>;
  protected abstract getAuthCredentials(): Promise<AuthCredEntity>;
}
