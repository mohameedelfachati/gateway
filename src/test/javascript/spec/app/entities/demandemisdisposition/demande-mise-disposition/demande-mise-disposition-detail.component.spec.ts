import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { JhiDataUtils } from 'ng-jhipster';

import { GatewayTestModule } from '../../../../test.module';
import { DemandeMiseDispositionDetailComponent } from 'app/entities/demandemisdisposition/demande-mise-disposition/demande-mise-disposition-detail.component';
import { DemandeMiseDisposition } from 'app/shared/model/demandemisdisposition/demande-mise-disposition.model';

describe('Component Tests', () => {
  describe('DemandeMiseDisposition Management Detail Component', () => {
    let comp: DemandeMiseDispositionDetailComponent;
    let fixture: ComponentFixture<DemandeMiseDispositionDetailComponent>;
    let dataUtils: JhiDataUtils;
    const route = ({ data: of({ demandeMiseDisposition: new DemandeMiseDisposition(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GatewayTestModule],
        declarations: [DemandeMiseDispositionDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(DemandeMiseDispositionDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(DemandeMiseDispositionDetailComponent);
      comp = fixture.componentInstance;
      dataUtils = fixture.debugElement.injector.get(JhiDataUtils);
    });

    describe('OnInit', () => {
      it('Should load demandeMiseDisposition on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.demandeMiseDisposition).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });

    describe('byteSize', () => {
      it('Should call byteSize from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'byteSize');
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.byteSize(fakeBase64);

        // THEN
        expect(dataUtils.byteSize).toBeCalledWith(fakeBase64);
      });
    });

    describe('openFile', () => {
      it('Should call openFile from JhiDataUtils', () => {
        // GIVEN
        spyOn(dataUtils, 'openFile');
        const fakeContentType = 'fake content type';
        const fakeBase64 = 'fake base64';

        // WHEN
        comp.openFile(fakeContentType, fakeBase64);

        // THEN
        expect(dataUtils.openFile).toBeCalledWith(fakeContentType, fakeBase64);
      });
    });
  });
});
