import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IDemandeMiseDisposition, DemandeMiseDisposition } from 'app/shared/model/demandemisdisposition/demande-mise-disposition.model';
import { DemandeMiseDispositionService } from './demande-mise-disposition.service';
import { DemandeMiseDispositionComponent } from './demande-mise-disposition.component';
import { DemandeMiseDispositionDetailComponent } from './demande-mise-disposition-detail.component';
import { DemandeMiseDispositionUpdateComponent } from './demande-mise-disposition-update.component';

@Injectable({ providedIn: 'root' })
export class DemandeMiseDispositionResolve implements Resolve<IDemandeMiseDisposition> {
  constructor(private service: DemandeMiseDispositionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDemandeMiseDisposition> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((demandeMiseDisposition: HttpResponse<DemandeMiseDisposition>) => {
          if (demandeMiseDisposition.body) {
            return of(demandeMiseDisposition.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new DemandeMiseDisposition());
  }
}

export const demandeMiseDispositionRoute: Routes = [
  {
    path: '',
    component: DemandeMiseDispositionComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'DemandeMiseDispositions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DemandeMiseDispositionDetailComponent,
    resolve: {
      demandeMiseDisposition: DemandeMiseDispositionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DemandeMiseDispositions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DemandeMiseDispositionUpdateComponent,
    resolve: {
      demandeMiseDisposition: DemandeMiseDispositionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DemandeMiseDispositions',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DemandeMiseDispositionUpdateComponent,
    resolve: {
      demandeMiseDisposition: DemandeMiseDispositionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'DemandeMiseDispositions',
    },
    canActivate: [UserRouteAccessService],
  },
];
