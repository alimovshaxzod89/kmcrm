import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seh-yuklanma',
  templateUrl: './seh-yuklanma.component.html',
  styleUrls: ['./seh-yuklanma.component.scss']
})
export class SehYuklanmaComponent implements OnInit {
  rows = [
    {
      abs1:'1',
      abs2:'222',
      abs3:'333',
      abs4:'444',
      abs5:'555',
      abs6:'666',
      abs7:'777',
      abs8:'888',
    },
    {
      abs1:'1',
      abs2:'Сборка',
      color: 'bg-pink-400',
      abs3:'333',
      abs4:'444',
      abs5:'555',
      abs6:'666',
      abs7:'777',
      abs8:'888',
    },
    {
      abs1:'1',
      abs2:'Мягкий',
      color: 'bg-blue-400',
      abs3:'333',
      abs4:'444',
      abs5:'555',
      abs6:'666',
      abs7:'777',
      abs8:'888',
    },
    {
      abs1:'1',
      abs2:'222',
      abs3:'333',
      abs4:'444',
      abs5:'555',
      abs6:'666',
      abs7:'777',
      abs8:'888',
    },
    {
      abs1:'1',
      abs2:'222',
      abs3:'333',
      abs4:'444',
      abs5:'555',
      abs6:'666',
      abs7:'777',
      abs8:'888',
    },
  ]

  data: any = {}
  options: any = {}

  ngOnInit() {

    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
        datasets: [
            {
                label: 'Мягкий' ,
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                tension: 0.4
            },
            {
                label: 'Сборка' ,
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                tension: 0.4
            }
        ]
    };
    

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.6,
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      },
      scales: {
          x: {
              ticks: {
                  color: textColorSecondary
              },
              grid: {
                  color: surfaceBorder,
                  drawBorder: false
              }
          },
          y: {
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
