import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { DemandeMiseDispositionService } from 'app/entities/demandemisdisposition/demande-mise-disposition/demande-mise-disposition.service';
import { IDemandeMiseDisposition, DemandeMiseDisposition } from 'app/shared/model/demandemisdisposition/demande-mise-disposition.model';

describe('Service Tests', () => {
  describe('DemandeMiseDisposition Service', () => {
    let injector: TestBed;
    let service: DemandeMiseDispositionService;
    let httpMock: HttpTestingController;
    let elemDefault: IDemandeMiseDisposition;
    let expectedResult: IDemandeMiseDisposition | IDemandeMiseDisposition[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(DemandeMiseDispositionService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new DemandeMiseDisposition(
        0,
        'AAAAAAA',
        currentDate,
        currentDate,
        currentDate,
        currentDate,
        currentDate,
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        'AAAAAAA',
        0,
        'AAAAAAA',
        'image/png',
        'AAAAAAA',
        'AAAAAAA'
      );
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            datedemande: currentDate.format(DATE_FORMAT),
            datedebutmisedisposition: currentDate.format(DATE_FORMAT),
            datefinmisedisposition: currentDate.format(DATE_FORMAT),
            heurdebut: currentDate.format(DATE_FORMAT),
            heurfin: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a DemandeMiseDisposition', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            datedemande: currentDate.format(DATE_FORMAT),
            datedebutmisedisposition: currentDate.format(DATE_FORMAT),
            datefinmisedisposition: currentDate.format(DATE_FORMAT),
            heurdebut: currentDate.format(DATE_FORMAT),
            heurfin: currentDate.format(DATE_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datedemande: currentDate,
            datedebutmisedisposition: currentDate,
            datefinmisedisposition: currentDate,
            heurdebut: currentDate,
            heurfin: currentDate,
          },
          returnedFromService
        );

        service.create(new DemandeMiseDisposition()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a DemandeMiseDisposition', () => {
        const returnedFromService = Object.assign(
          {
            matricule: 'BBBBBB',
            datedemande: currentDate.format(DATE_FORMAT),
            datedebutmisedisposition: currentDate.format(DATE_FORMAT),
            datefinmisedisposition: currentDate.format(DATE_FORMAT),
            heurdebut: currentDate.format(DATE_FORMAT),
            heurfin: currentDate.format(DATE_FORMAT),
            motif: 'BBBBBB',
            typevehicule: 'BBBBBB',
            lieudepart: 'BBBBBB',
            lieuarrive: 'BBBBBB',
            division: 'BBBBBB',
            services: 'BBBBBB',
            nombrebenificiaire: 1,
            beneficiaire: 'BBBBBB',
            piecejointes: 'BBBBBB',
            statutdis: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datedemande: currentDate,
            datedebutmisedisposition: currentDate,
            datefinmisedisposition: currentDate,
            heurdebut: currentDate,
            heurfin: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of DemandeMiseDisposition', () => {
        const returnedFromService = Object.assign(
          {
            matricule: 'BBBBBB',
            datedemande: currentDate.format(DATE_FORMAT),
            datedebutmisedisposition: currentDate.format(DATE_FORMAT),
            datefinmisedisposition: currentDate.format(DATE_FORMAT),
            heurdebut: currentDate.format(DATE_FORMAT),
            heurfin: currentDate.format(DATE_FORMAT),
            motif: 'BBBBBB',
            typevehicule: 'BBBBBB',
            lieudepart: 'BBBBBB',
            lieuarrive: 'BBBBBB',
            division: 'BBBBBB',
            services: 'BBBBBB',
            nombrebenificiaire: 1,
            beneficiaire: 'BBBBBB',
            piecejointes: 'BBBBBB',
            statutdis: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            datedemande: currentDate,
            datedebutmisedisposition: currentDate,
            datefinmisedisposition: currentDate,
            heurdebut: currentDate,
            heurfin: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a DemandeMiseDisposition', () => {
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
