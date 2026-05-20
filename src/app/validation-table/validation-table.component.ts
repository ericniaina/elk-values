import { Component, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';

export type ValidationStatus = 'validé' | 'en attente' | 'invalide';

export interface ValidationMeta {
  status: ValidationStatus;
  date: string | null;
  user: string | null;
}

export interface DemandRow {
  id: string;
  projet: string;
  responsable: string;
  edm: ValidationMeta;
  it: ValidationMeta;
}

@Component({
  selector: 'app-validation-table',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatChipsModule,
    MatSnackBarModule,
    MatDividerModule,
  ],
  templateUrl: './validation-table.component.html',
  styleUrls: ['./validation-table.component.scss'],
})
export class ValidationTableComponent {
  displayedColumns = ['id', 'projet', 'responsable', 'validation', 'actions'];

  data = signal<DemandRow[]>([
    {
      id: 'REQ-001', projet: 'Migration Cloud', responsable: 'A. Martin',
      edm: { status: 'validé',     date: '2025-05-12', user: 'J. Moreau' },
      it:  { status: 'validé',     date: '2025-05-14', user: 'P. Chen'   },
    },
    {
      id: 'REQ-002', projet: 'Refonte API', responsable: 'B. Dupont',
      edm: { status: 'validé',     date: '2025-05-10', user: 'J. Moreau' },
      it:  { status: 'en attente', date: null,          user: null        },
    },
    {
      id: 'REQ-003', projet: 'Audit Sécurité', responsable: 'C. Leroy',
      edm: { status: 'invalide',   date: '2025-05-08', user: 'S. Blanc'  },
      it:  { status: 'en attente', date: null,          user: null        },
    },
    {
      id: 'REQ-004', projet: 'Déploiement v3', responsable: 'D. Bernard',
      edm: { status: 'en attente', date: null,          user: null        },
      it:  { status: 'en attente', date: null,          user: null        },
    },
    {
      id: 'REQ-005', projet: 'Intégration SSO', responsable: 'E. Petit',
      edm: { status: 'validé',     date: '2025-05-11', user: 'J. Moreau' },
      it:  { status: 'invalide',   date: '2025-05-13', user: 'P. Chen'   },
    },
  ]);

  constructor(private snackBar: MatSnackBar) {}

  getStatusIcon(status: ValidationStatus): string {
    return { 'validé': 'check_circle', 'en attente': 'schedule', 'invalide': 'cancel' }[status];
  }

  getStatusClass(status: ValidationStatus): string {
    return { 'validé': 'status-valid', 'en attente': 'status-pending', 'invalide': 'status-invalid' }[status];
  }

  getConnectorClass(edmStatus: ValidationStatus): string {
    return edmStatus === 'validé' ? 'connector-active' : 'connector-inactive';
  }

  tooltipText(meta: ValidationMeta): string {
    if (!meta.user && !meta.date) return '';
    const parts: string[] = [];
    if (meta.user) parts.push(`👤 ${meta.user}`);
    if (meta.date) parts.push(`📅 ${this.formatDate(meta.date)}`);
    return parts.join('\n');
  }

  formatDate(d: string | null): string {
    if (!d) return '';
    const [y, m, day] = d.split('-');
    return `${day}/${m}/${y}`;
  }

  hasActions(row: DemandRow): boolean {
    return row.edm.status === 'en attente' || row.it.status === 'en attente';
  }

  act(row: DemandRow, role: 'edm' | 'it', newStatus: 'validé' | 'invalide') {
    this.data.update(rows =>
      rows.map(r => {
        if (r.id !== row.id) return r;
        const today = new Date().toISOString().split('T')[0];
        return { ...r, [role]: { status: newStatus, date: today, user: 'Moi' } };
      })
    );
    const verb = newStatus === 'validé' ? 'validé ✓' : 'refusé ✕';
    this.snackBar.open(`${row.id} — ${role.toUpperCase()} ${verb}`, 'OK', { duration: 3000 });
  }
}
