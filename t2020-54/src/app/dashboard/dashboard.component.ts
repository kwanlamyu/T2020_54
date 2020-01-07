import { Component, AfterViewInit, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';

import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
declare var require: any;

const data: any = require('./data.json');

export interface Chart {
  type: ChartType;
  data: Chartist.IChartistData;
  options?: any;
  responsiveOptions?: any;
  events?: ChartEvent;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  tabs = ['First', 'Second', 'Third'];
  userId: any;

  constructor(
    private dashboardService: DashboardService,
  ) { }

  ngAfterViewInit() { }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {

    this.userId = sessionStorage.getItem('userId');

    document.getElementById("dashimg")['src'] = "assets/images/users/" + this.userId + ".jpg";
    // console.log(data['Pie']);
    console.log(this.userId)
    this.dashboardService.dashboard(this.userId).then(
      response => {
        console.log('dashboard res ', response);
      }
    );
  }

  // Barchart
  // tslint:disable-next-line: member-ordering
  barChart1: Chart = {
    type: 'Bar',
    data: {
      labels: ['Jan', 'Feb', 'Mar'],
      series: [[1, 2, 3, 4, 5, 16]]
    },
    options: {
      seriesBarDistance: 15,
      high: 20,

      axisX: {
        showGrid: false,
        offset: 20
      },
      axisY: {
        showGrid: true,
        offset: 40
      },
      height: 360
    },

    responsiveOptions: [
      [
        'screen and (min-width: 640px)',
        {
          axisX: {
            labelInterpolationFnc: function (
              value: number,
              index: number
            ): string {
              return index % 1 === 0 ? `${value}` : null;
            }
          }
        }
      ]
    ]
  };

  // This is for the donute chart
  // tslint:disable-next-line: member-ordering
  donuteChart1: Chart = {
    type: 'Pie',
    data: {
      series: [10, 10, 10, 10, 60]
    },
    options: {
      donut: true,
      height: 260,
      showLabel: false,
      donutWidth: 20
    }
  };
}
