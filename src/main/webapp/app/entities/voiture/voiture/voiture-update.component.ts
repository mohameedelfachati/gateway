import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { JhiDataUtils, JhiFileLoadError, JhiEventManager, JhiEventWithContent } from 'ng-jhipster';

import { IVoiture, Voiture } from 'app/shared/model/voiture/voiture.model';
import { VoitureService } from './voiture.service';
import { AlertError } from 'app/shared/alert/alert-error.model';

@Component({
  selector: 'jhi-voiture-update',
  templateUrl: './voiture-update.component.html',
})
export class VoitureUpdateComponent implements OnInit {
  isSaving = false;
  datemiscirculationDp: any;
  dateacquisitionDp: any;

  editForm = this.fb.group({
    id: [],
    typeVehicule: [],
    marque: [],
    modele: [],
    usage: [],
    typecarburant: [],
    matricule: [],
    matriculeww: [],
    nChassi: [],
    capacite: [],
    division: [],
    puissancefiscal: [],
    datemiscirculation: [],
    dateacquisition: [],
    affectationdivision: [],
    affectationService: [],
    beneficiaire: [],
    kilometrage: [],
    pieceJointe: [],
    pieceJointeContentType: [],
    status: [],
  });

  constructor(
    protected dataUtils: JhiDataUtils,
    protected eventManager: JhiEventManager,
    protected voitureService: VoitureService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ voiture }) => {
      this.updateForm(voiture);
    });
  }

  updateForm(voiture: IVoiture): void {
    this.editForm.patchValue({
      id: voiture.id,
      typeVehicule: voiture.typeVehicule,
      marque: voiture.marque,
      modele: voiture.modele,
      usage: voiture.usage,
      typecarburant: voiture.typecarburant,
      matricule: voiture.matricule,
      matriculeww: voiture.matriculeww,
      nChassi: voiture.nChassi,
      capacite: voiture.capacite,
      division: voiture.division,
      puissancefiscal: voiture.puissancefiscal,
      datemiscirculation: voiture.datemiscirculation,
      dateacquisition: voiture.dateacquisition,
      affectationdivision: voiture.affectationdivision,
      affectationService: voiture.affectationService,
      beneficiaire: voiture.beneficiaire,
      kilometrage: voiture.kilometrage,
      pieceJointe: voiture.pieceJointe,
      pieceJointeContentType: voiture.pieceJointeContentType,
      status: voiture.status,
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
    const voiture = this.createFromForm();
    if (voiture.id !== undefined) {
      this.subscribeToSaveResponse(this.voitureService.update(voiture));
    } else {
      this.subscribeToSaveResponse(this.voitureService.create(voiture));
    }
  }

  private createFromForm(): IVoiture {
    return {
      ...new Voiture(),
      id: this.editForm.get(['id'])!.value,
      typeVehicule: this.editForm.get(['typeVehicule'])!.value,
      marque: this.editForm.get(['marque'])!.value,
      modele: this.editForm.get(['modele'])!.value,
      usage: this.editForm.get(['usage'])!.value,
      typecarburant: this.editForm.get(['typecarburant'])!.value,
      matricule: this.editForm.get(['matricule'])!.value,
      matriculeww: this.editForm.get(['matriculeww'])!.value,
      nChassi: this.editForm.get(['nChassi'])!.value,
      capacite: this.editForm.get(['capacite'])!.value,
      division: this.editForm.get(['division'])!.value,
      puissancefiscal: this.editForm.get(['puissancefiscal'])!.value,
      datemiscirculation: this.editForm.get(['datemiscirculation'])!.value,
      dateacquisition: this.editForm.get(['dateacquisition'])!.value,
      affectationdivision: this.editForm.get(['affectationdivision'])!.value,
      affectationService: this.editForm.get(['affectationService'])!.value,
      beneficiaire: this.editForm.get(['beneficiaire'])!.value,
      kilometrage: this.editForm.get(['kilometrage'])!.value,
      pieceJointeContentType: this.editForm.get(['pieceJointeContentType'])!.value,
      pieceJointe: this.editForm.get(['pieceJointe'])!.value,
      status: this.editForm.get(['status'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IVoiture>>): void {
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
