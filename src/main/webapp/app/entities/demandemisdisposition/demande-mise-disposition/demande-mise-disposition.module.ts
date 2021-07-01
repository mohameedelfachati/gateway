import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GatewaySharedModule } from 'app/shared/shared.module';
import { DemandeMiseDispositionComponent } from './demande-mise-disposition.component';
import { DemandeMiseDispositionDetailComponent } from './demande-mise-disposition-detail.component';
import { DemandeMiseDispositionUpdateComponent } from './demande-mise-disposition-update.component';
import { DemandeMiseDispositionDeleteDialogComponent } from './demande-mise-disposition-delete-dialog.component';
import { demandeMiseDispositionRoute } from './demande-mise-disposition.route';

@NgModule({
  imports: [GatewaySharedModule, RouterModule.forChild(demandeMiseDispositionRoute)],
  declarations: [
    DemandeMiseDispositionComponent,
    DemandeMiseDispositionDetailComponent,
    DemandeMiseDispositionUpdateComponent,
    DemandeMiseDispositionDeleteDialogComponent,
  ],
  entryComponents: [DemandeMiseDispositionDeleteDialogComponent],
})
export class DemandemisdispositionDemandeMiseDispositionModule {}
