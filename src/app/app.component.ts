import { Component } from '@angular/core';
import { ValidationTableComponent } from './validation-table/validation-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ValidationTableComponent],
  template: `
    <div class="page">
      <div class="page-header">
        <h1>Suivi des validations</h1>
        <p>Survolez un indicateur pour voir les métadonnées · Utilisez les boutons pour valider ou refuser</p>
      </div>
      <app-validation-table />
    </div>
  `,
  styles: [`
    .page {
      padding: 36px 32px;
      max-width: 1100px;
      margin: 0 auto;
    }
    .page-header h1 {
      font-size: 22px;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
    }
    .page-header p {
      font-size: 13px;
      color: #64748b;
      margin: 4px 0 24px;
    }
  `],
})
export class AppComponent {}
