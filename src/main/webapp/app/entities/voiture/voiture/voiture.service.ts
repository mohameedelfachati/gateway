import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IVoiture } from 'app/shared/model/voiture/voiture.model';

type EntityResponseType = HttpResponse<IVoiture>;
type EntityArrayResponseType = HttpResponse<IVoiture[]>;

@Injectable({ providedIn: 'root' })
export class VoitureService {
  public resourceUrl = SERVER_API_URL + 'services/voiture/api/voitures';

  constructor(protected http: HttpClient) {}

  create(voiture: IVoiture): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(voiture);
    return this.http
      .post<IVoiture>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(voiture: IVoiture): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(voiture);
    return this.http
      .put<IVoiture>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IVoiture>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IVoiture[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(voiture: IVoiture): IVoiture {
    const copy: IVoiture = Object.assign({}, voiture, {
      datemiscirculation:
        voiture.datemiscirculation && voiture.datemiscirculation.isValid() ? voiture.datemiscirculation.format(DATE_FORMAT) : undefined,
      dateacquisition:
        voiture.dateacquisition && voiture.dateacquisition.isValid() ? voiture.dateacquisition.format(DATE_FORMAT) : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.datemiscirculation = res.body.datemiscirculation ? moment(res.body.datemiscirculation) : undefined;
      res.body.dateacquisition = res.body.dateacquisition ? moment(res.body.dateacquisition) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((voiture: IVoiture) => {
        voiture.datemiscirculation = voiture.datemiscirculation ? moment(voiture.datemiscirculation) : undefined;
        voiture.dateacquisition = voiture.dateacquisition ? moment(voiture.dateacquisition) : undefined;
      });
    }
    return res;
  }
}
