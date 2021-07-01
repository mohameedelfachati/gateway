import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JhiDataUtils } from 'ng-jhipster';

import { IVoiture } from 'app/shared/model/voiture/voiture.model';

@Component({
  selector: 'jhi-voiture-detail',
  templateUrl: './voiture-detail.component.html',
})
export class VoitureDetailComponent implements OnInit {
  voiture: IVoiture | null = null;

  constructor(protected dataUtils: JhiDataUtils, protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ voiture }) => (this.voiture = voiture));
  }

  byteSize(base64String: string): string {
    return this.dataUtils.byteSize(base64String);
  }

  openFile(contentType = '', base64String: string): void {
    this.dataUtils.openFile(contentType, base64String);
  }

  previousState(): void {
    window.history.back();
  }
}
