import { Component, AfterViewInit, OnInit } from '@angular/core';

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
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.scss']
})
export class AccountDetailsComponent implements OnInit {
  tabs = ['First', 'Second', 'Third'];

  constructor() { }

  ngOnInit() {
  }

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

}
