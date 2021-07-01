import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { VoitureService } from 'app/entities/voiture/voiture/voiture.service';
import { IVoiture, Voiture } from 'app/shared/model/voiture/voiture.model';

describe('Service Tests', () => {
  describe('Voiture Service', () => {
    let injector: TestBed;
    let service: VoitureService;
    let httpMock: HttpTestingController;
    let elemDefault: IVoiture;
    let expectedResult: IVoiture | IVoiture[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(VoitureService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Voiture(
        0,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        0,
        0,
        0,
        'AAAAAAA',
        0,
        currentDate,
        currentDate,
        0,
        0,
        0,
        0,
        'image/png',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            datemiscirculation: currentDate.format(DATE_FORMAT),
            dateacquisition: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Voiture', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            datemiscirculation: currentDate.format(DATE_FORMAT),
            dateacquisition: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datemiscirculation: currentDate,
            dateacquisition: currentDate,
          },
          returnedFromService
        );

        service.create(new Voiture()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Voiture', () => {
        const returnedFromService = Object.assign(
          {
            typeVehicule: 'BBBBBB',
            marque: 'BBBBBB',
            modele: 'BBBBBB',
            usage: 'BBBBBB',
            typecarburant: 'BBBBBB',
            matricule: 1,
            matriculeww: 1,
            nChassi: 1,
            capacite: 1,
            division: 'BBBBBB',
            puissancefiscal: 1,
            datemiscirculation: currentDate.format(DATE_FORMAT),
            dateacquisition: currentDate.format(DATE_FORMAT),
            affectationdivision: 1,
            affectationService: 1,
            beneficiaire: 1,
            kilometrage: 1,
            pieceJointe: 'BBBBBB',
            status: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datemiscirculation: currentDate,
            dateacquisition: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Voiture', () => {
        const returnedFromService = Object.assign(
          {
            typeVehicule: 'BBBBBB',
            marque: 'BBBBBB',
            modele: 'BBBBBB',
            usage: 'BBBBBB',
            typecarburant: 'BBBBBB',
            matricule: 1,
            matriculeww: 1,
            nChassi: 1,
            capacite: 1,
            division: 'BBBBBB',
            puissancefiscal: 1,
            datemiscirculation: currentDate.format(DATE_FORMAT),
            dateacquisition: currentDate.format(DATE_FORMAT),
            affectationdivision: 1,
            affectationService: 1,
            beneficiaire: 1,
            kilometrage: 1,
            pieceJointe: 'BBBBBB',
            status: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datemiscirculation: currentDate,
            dateacquisition: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Voiture', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
