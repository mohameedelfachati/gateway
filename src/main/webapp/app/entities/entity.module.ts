import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'demande-mise-disposition',
        loadChildren: () =>
          import('./demandemisdisposition/demande-mise-disposition/demande-mise-disposition.module').then(
            m => m.DemandemisdispositionDemandeMiseDispositionModule
          ),
      },
      {
        path: 'voiture',
        loadChildren: () => import('./voiture/voiture/voiture.module').then(m => m.VoitureVoitureModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class GatewayEntityModule {}
