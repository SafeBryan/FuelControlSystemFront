import { Component } from '@angular/core';
import { ReportService } from '../../core/services/report.service';
import { FuelConsumptionReport } from '../../core/models/report';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './reports-list.component.html',
  styleUrls: ['./reports-list.component.scss']
})
export class ReportsListComponent {
  reports: FuelConsumptionReport[] = [];
  loading = false;
  error = '';
  routeId = '';

  constructor(private reportService: ReportService) {}

  buscar() {
    if (!this.routeId) return;
    this.loading = true;
    this.reportService.getFuelConsumptionReports(this.routeId).subscribe({
      next: (reports) => {
        this.reports = reports;
        this.loading = false;
      },
      error: () => {
        this.error = 'Error al cargar reportes';
        this.loading = false;
      }
    });
  }
} 