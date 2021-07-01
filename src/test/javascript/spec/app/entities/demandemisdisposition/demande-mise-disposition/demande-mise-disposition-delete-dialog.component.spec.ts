import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { MockEventManager } from '../../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../../helpers/mock-active-modal.service';
import { DemandeMiseDispositionDeleteDialogComponent } from 'app/entities/demandemisdisposition/demande-mise-disposition/demande-mise-disposition-delete-dialog.component';
import { DemandeMiseDispositionService } from 'app/entities/demandemisdisposition/demande-mise-disposition/demande-mise-disposition.service';

describe('Component Tests', () => {
  describe('DemandeMiseDisposition Management Delete Component', () => {
    let comp: DemandeMiseDispositionDeleteDialogComponent;
    let fixture: ComponentFixture<DemandeMiseDispositionDeleteDialogComponent>;
    let service: DemandeMiseDispositionService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DemandeMiseDispositionDeleteDialogComponent],
      })
        .overrideTemplate(DemandeMiseDispositionDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DemandeMiseDispositionDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(DemandeMiseDispositionService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
