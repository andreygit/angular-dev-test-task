import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bp-daily-table',
  templateUrl: './daily-table.component.html'
})
export class DailyTableComponent implements OnInit {
  public city: string = ""

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.city = params.city 
    })
  }
}
