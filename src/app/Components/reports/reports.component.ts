import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../Service/report.service';
import { FormsModule } from '@angular/forms';
import { Reports } from '../../Model/reports';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent implements OnInit {
  
  reports: Reports[] = [];

  reportType: string = 'daily';

  /**
   *
   */
  constructor(private reportService: ReportService) {}


  ngOnInit(): void {
      this.getReport();
  }

  getReport(): void {
     this.reportService.generateReport(this.reportType).subscribe({
      next: (data) => {
        this.reports = data;
      },
      error(err) {
        alert('No Report For This Search');
        console.error('Failed to load reports', err);
      },
     })
  }
  
  onReportTypeChange(type: string): void{
      this.reportType = type
      this.getReport();
  }
  
}
