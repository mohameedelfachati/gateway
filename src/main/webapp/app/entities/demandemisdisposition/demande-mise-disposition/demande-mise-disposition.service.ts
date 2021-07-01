import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IDemandeMiseDisposition } from 'app/shared/model/demandemisdisposition/demande-mise-disposition.model';

type EntityResponseType = HttpResponse<IDemandeMiseDisposition>;
type EntityArrayResponseType = HttpResponse<IDemandeMiseDisposition[]>;

@Injectable({ providedIn: 'root' })
export class DemandeMiseDispositionService {
  public resourceUrl = SERVER_API_URL + 'services/demandemisdisposition/api/demande-mise-dispositions';

  constructor(protected http: HttpClient) {}

  create(demandeMiseDisposition: IDemandeMiseDisposition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(demandeMiseDisposition);
    return this.http
      .post<IDemandeMiseDisposition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(demandeMiseDisposition: IDemandeMiseDisposition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(demandeMiseDisposition);
    return this.http
      .put<IDemandeMiseDisposition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IDemandeMiseDisposition>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IDemandeMiseDisposition[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(demandeMiseDisposition: IDemandeMiseDisposition): IDemandeMiseDisposition {
    const copy: IDemandeMiseDisposition = Object.assign({}, demandeMiseDisposition, {
      datedemande:
        demandeMiseDisposition.datedemande && demandeMiseDisposition.datedemande.isValid()
          ? demandeMiseDisposition.datedemande.format(DATE_FORMAT)
          : undefined,
      datedebutmisedisposition:
        demandeMiseDisposition.datedebutmisedisposition && demandeMiseDisposition.datedebutmisedisposition.isValid()
          ? demandeMiseDisposition.datedebutmisedisposition.format(DATE_FORMAT)
          : undefined,
      datefinmisedisposition:
        demandeMiseDisposition.datefinmisedisposition && demandeMiseDisposition.datefinmisedisposition.isValid()
          ? demandeMiseDisposition.datefinmisedisposition.format(DATE_FORMAT)
          : undefined,
      heurdebut:
        demandeMiseDisposition.heurdebut && demandeMiseDisposition.heurdebut.isValid()
          ? demandeMiseDisposition.heurdebut.format(DATE_FORMAT)
          : undefined,
      heurfin:
        demandeMiseDisposition.heurfin && demandeMiseDisposition.heurfin.isValid()
          ? demandeMiseDisposition.heurfin.format(DATE_FORMAT)
          : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datedemande = res.body.datedemande ? moment(res.body.datedemande) : undefined;
      res.body.datedebutmisedisposition = res.body.datedebutmisedisposition ? moment(res.body.datedebutmisedisposition) : undefined;
      res.body.datefinmisedisposition = res.body.datefinmisedisposition ? moment(res.body.datefinmisedisposition) : undefined;
      res.body.heurdebut = res.body.heurdebut ? moment(res.body.heurdebut) : undefined;
      res.body.heurfin = res.body.heurfin ? moment(res.body.heurfin) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((demandeMiseDisposition: IDemandeMiseDisposition) => {
        demandeMiseDisposition.datedemande = demandeMiseDisposition.datedemande ? moment(demandeMiseDisposition.datedemande) : undefined;
        demandeMiseDisposition.datedebutmisedisposition = demandeMiseDisposition.datedebutmisedisposition
          ? moment(demandeMiseDisposition.datedebutmisedisposition)
          : undefined;
        demandeMiseDisposition.datefinmisedisposition = demandeMiseDisposition.datefinmisedisposition
          ? moment(demandeMiseDisposition.datefinmisedisposition)
          : undefined;
        demandeMiseDisposition.heurdebut = demandeMiseDisposition.heurdebut ? moment(demandeMiseDisposition.heurdebut) : undefined;
        demandeMiseDisposition.heurfin = demandeMiseDisposition.heurfin ? moment(demandeMiseDisposition.heurfin) : undefined;
      });
    }
    return res;
  }
}
