import { Moment } from 'moment';

export interface IVoiture {
  id?: number;
  typeVehicule?: string;
  marque?: string;
  modele?: string;
  usage?: string;
  typecarburant?: string;
  matricule?: number;
  matriculeww?: number;
  nChassi?: number;
  capacite?: number;
  division?: string;
  puissancefiscal?: number;
  datemiscirculation?: Moment;
  dateacquisition?: Moment;
  affectationdivision?: number;
  affectationService?: number;
  beneficiaire?: number;
  kilometrage?: number;
  pieceJointeContentType?: string;
  pieceJointe?: any;
  status?: string;
}

export class Voiture implements IVoiture {
  constructor(
    public id?: number,
    public typeVehicule?: string,
    public marque?: string,
    public modele?: string,
    public usage?: string,
    public typecarburant?: string,
    public matricule?: number,
    public matriculeww?: number,
    public nChassi?: number,
    public capacite?: number,
    public division?: string,
    public puissancefiscal?: number,
    public datemiscirculation?: Moment,
    public dateacquisition?: Moment,
    public affectationdivision?: number,
    public affectationService?: number,
    public beneficiaire?: number,
    public kilometrage?: number,
    public pieceJointeContentType?: string,
    public pieceJointe?: any,
    public status?: string
  ) {}
}
