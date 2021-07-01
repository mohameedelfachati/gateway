import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDemandeMiseDisposition } from 'app/shared/model/demandemisdisposition/demande-mise-disposition.model';
import { DemandeMiseDispositionService } from './demande-mise-disposition.service';

@Component({
  templateUrl: './demande-mise-disposition-delete-dialog.component.html',
})
export class DemandeMiseDispositionDeleteDialogComponent {
  demandeMiseDisposition?: IDemandeMiseDisposition;

  constructor(
    protected demandeMiseDispositionService: DemandeMiseDispositionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.demandeMiseDispositionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('demandeMiseDispositionListModification');
      this.activeModal.close();
    });
  }
}
