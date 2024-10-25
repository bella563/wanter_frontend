import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  template: '<canvas id="myChart"></canvas>',
  styleUrls: ['./chart.component.css'],
  standalone:true
})
export class ChartComponent implements OnInit {
  @Input() chartData: any;
  @Input() chartLabels: any;

  ngOnInit() {
    this.createChart();
  }

  createChart() {
    const ctx = document.getElementById('myChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar', // ou 'line', 'pie', etc.
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Données du tableau de bord',
          data: this.chartData,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
