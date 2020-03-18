export interface IPersonel {
    id: string,
    fornavn: string,
    etternavn: string,
    brukerkonto: string,
    kjonn: string,
    epost: string,
    telefon: string,
    gateadresse: string,
    postnummerid: string,
    opprettet: string,
    fodselsdato: Date,
    arb_status: string
}

export interface IPersonFormValues extends Partial<IPersonel>{
    
}


export class PersonFormValues implements IPersonFormValues{
    id?: string = undefined;
    fornavn: string = '';
    etternavn: string= '';
    brukerkonto: string= '';
    kjonn: string='';
    epost: string ='';
    telefon: string ='';
    arb_status: string= '';
    fodselsdato?: Date  = undefined;
    gateadresse: string ='';
    postnummerid: string = '';
    opprettet: string = '';
    
    constructor(init?: IPersonFormValues) {
        Object.assign(this, init);
    }
}