import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IDemandeMiseDisposition, DemandeMiseDisposition } from 'app/shared/model/demandemisdisposition/demande-mise-disposition.model';
import { DemandeMiseDispositionService } from './demande-mise-disposition.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-demande-mise-disposition-update',
  templateUrl: './demande-mise-disposition-update.component.html',
})
export class DemandeMiseDispositionUpdateComponent implements OnInit {
  isSaving = false;
  datedemandeDp: any;
  datedebutmisedispositionDp: any;
  datefinmisedispositionDp: any;
  heurdebutDp: any;
  heurfinDp: any;

  editForm = this.fb.group({
    id: [],
    matricule: [],
    datedemande: [],
    datedebutmisedisposition: [],
    datefinmisedisposition: [],
    heurdebut: [],
    heurfin: [],
    motif: [],
    typevehicule: [],
    lieudepart: [],
    lieuarrive: [],
    division: [],
    services: [],
    nombrebenificiaire: [],
    beneficiaire: [],
    piecejointes: [],
    piecejointesContentType: [],
    statutdis: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected demandeMiseDispositionService: DemandeMiseDispositionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ demandeMiseDisposition }) => {
      this.updateForm(demandeMiseDisposition);
    });
  }

  updateForm(demandeMiseDisposition: IDemandeMiseDisposition): void {
    this.editForm.patchValue({
      id: demandeMiseDisposition.id,
      matricule: demandeMiseDisposition.matricule,
      datedemande: demandeMiseDisposition.datedemande,
      datedebutmisedisposition: demandeMiseDisposition.datedebutmisedisposition,
      datefinmisedisposition: demandeMiseDisposition.datefinmisedisposition,
      heurdebut: demandeMiseDisposition.heurdebut,
      heurfin: demandeMiseDisposition.heurfin,
      motif: demandeMiseDisposition.motif,
      typevehicule: demandeMiseDisposition.typevehicule,
      lieudepart: demandeMiseDisposition.lieudepart,
      lieuarrive: demandeMiseDisposition.lieuarrive,
      division: demandeMiseDisposition.division,
      services: demandeMiseDisposition.services,
      nombrebenificiaire: demandeMiseDisposition.nombrebenificiaire,
      beneficiaire: demandeMiseDisposition.beneficiaire,
      piecejointes: demandeMiseDisposition.piecejointes,
      piecejointesContentType: demandeMiseDisposition.piecejointesContentType,
      statutdis: demandeMiseDisposition.statutdis,
    });
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType: string, base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  setFileData(event: any, field: string, isImage: boolean): void {
    this.dataUtils.loadFileToForm(event, this.editForm, field, isImage).subscribe(null, (err: JhiFileLoadError) => {
      this.eventManager.broadcast(
        new JhiEventWithContent<AlertError>('gatewayApp.error', { message: err.message })
      );
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const demandeMiseDisposition = this.createFromForm();
    if (demandeMiseDisposition.id !== undefined) {
      this.subscribeToSaveResponse(this.demandeMiseDispositionService.update(demandeMiseDisposition));
    } else {
      this.subscribeToSaveResponse(this.demandeMiseDispositionService.create(demandeMiseDisposition));
    }
  }

  private createFromForm(): IDemandeMiseDisposition {
    return {
      ...new DemandeMiseDisposition(),
      id: this.editForm.get(['id'])!.value,
      matricule: this.editForm.get(['matricule'])!.value,
      datedemande: this.editForm.get(['datedemande'])!.value,
      datedebutmisedisposition: this.editForm.get(['datedebutmisedisposition'])!.value,
      datefinmisedisposition: this.editForm.get(['datefinmisedisposition'])!.value,
      heurdebut: this.editForm.get(['heurdebut'])!.value,
      heurfin: this.editForm.get(['heurfin'])!.value,
      motif: this.editForm.get(['motif'])!.value,
      typevehicule: this.editForm.get(['typevehicule'])!.value,
      lieudepart: this.editForm.get(['lieudepart'])!.value,
      lieuarrive: this.editForm.get(['lieuarrive'])!.value,
      division: this.editForm.get(['division'])!.value,
      services: this.editForm.get(['services'])!.value,
      nombrebenificiaire: this.editForm.get(['nombrebenificiaire'])!.value,
      beneficiaire: this.editForm.get(['beneficiaire'])!.value,
      piecejointesContentType: this.editForm.get(['piecejointesContentType'])!.value,
      piecejointes: this.editForm.get(['piecejointes'])!.value,
      statutdis: this.editForm.get(['statutdis'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDemandeMiseDisposition>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
