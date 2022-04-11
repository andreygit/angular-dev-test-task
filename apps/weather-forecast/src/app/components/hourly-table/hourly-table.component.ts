import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bp-hourly-table',
  templateUrl: './hourly-table.component.html'
})
export class HourlyTableComponent implements OnInit {
  public city: string = ""

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.city = params.city 
    })
  }
}
