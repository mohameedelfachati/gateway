import { Moment } from 'moment';

export interface IDemandeMiseDisposition {
  id?: number;
  matricule?: string;
  datedemande?: Moment;
  datedebutmisedisposition?: Moment;
  datefinmisedisposition?: Moment;
  heurdebut?: Moment;
  heurfin?: Moment;
  motif?: string;
  typevehicule?: string;
  lieudepart?: string;
  lieuarrive?: string;
  division?: string;
  services?: string;
  nombrebenificiaire?: number;
  beneficiaire?: string;
  piecejointesContentType?: string;
  piecejointes?: any;
  statutdis?: string;
}

export class DemandeMiseDisposition implements IDemandeMiseDisposition {
  constructor(
    public id?: number,
    public matricule?: string,
    public datedemande?: Moment,
    public datedebutmisedisposition?: Moment,
    public datefinmisedisposition?: Moment,
    public heurdebut?: Moment,
    public heurfin?: Moment,
    public motif?: string,
    public typevehicule?: string,
    public lieudepart?: string,
    public lieuarrive?: string,
    public division?: string,
    public services?: string,
    public nombrebenificiaire?: number,
    public beneficiaire?: string,
    public piecejointesContentType?: string,
    public piecejointes?: any,
    public statutdis?: string
  ) {}
}
