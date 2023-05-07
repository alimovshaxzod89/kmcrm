import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seh-earn-month',
  templateUrl: './seh-earn-month.component.html',
  styleUrls: ['./seh-earn-month.component.scss']
})
export class SehEarnMonthComponent implements OnInit{
  data:any = {}
  options:any = {}

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
        datasets: [
            {
                type: 'bar',
                label: 'цех 1',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                data: [50, 25, 12, 48, 90, 76, 42],
            },
            {
                type: 'bar',
                label: 'цех 2',
                backgroundColor: documentStyle.getPropertyValue('--cyan-300'),
                data: [21, 84, 24, 75, 37, 65, 34]
            },
            {
                type: 'bar',
                label: 'цех 3',
                backgroundColor: documentStyle.getPropertyValue('--green-500'),
                data: [41, 52, 24, 74, 23, 21, 32]
            },
            {
              type: 'bar',
              label: 'цех 4',
              backgroundColor: documentStyle.getPropertyValue('--red-500'),
              data: [41, 52, 24, 74, 23, 21, 32]
            },
            {
              type: 'bar',
              label: 'цех 5',
              backgroundColor: documentStyle.getPropertyValue('--purple-500'),
              data: [41, 52, 24, 74, 23, 21, 32]
            }
        ]
    }

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      indexAxis:'y',
      plugins: {
          tooltips: {
              mode: 'index',
              intersect: false
          },
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              stacked: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
              stacked: true,
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          }
      }
    }
  }
}
