import { Location } from "./location.entity";

export class Company {
    id: number;
    rome: Array<string>;
    siret: Array<string>;
    email: Array<string>;
    company_name: Array<string>;
    office_name: Array<string>;
    headcount_min: number;
    headcount_max: number;
    naf: Array<string>;
    naf_label: Array<string>;
    location: Location;
    city: Array<string>;
    citycode: Array<string>;
    postcode: Array<string>;
    departement: Array<string>;
    region: Array<string>;
    departement_number: Array<string>;
    hiring_potential: number;
    is_high_potential: boolean;
}
