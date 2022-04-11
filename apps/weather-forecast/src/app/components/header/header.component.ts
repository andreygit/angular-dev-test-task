import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DefaultUrlSerializer, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { DAILY_ROUTE, HOURLY_ROUTE } from '../../app-routing.module';
import { OpenweathermapService } from '../../services/openweathermap.service';

@Component({
  selector: 'bp-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  public cityInput = new FormControl('')
  public searchForm: FormGroup
  private currentPath: string = ""

  constructor(private router: Router, private openweathermap: OpenweathermapService) {
    this.searchForm = new FormGroup({
      cityInput: this.cityInput
    })
  }

  isLinkActive(link: string) {
    return link === this.currentPath
  }

  submitCity(): void {
    this.router.navigate([], { queryParams: { city: this.cityInput.value } })
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    )
      .subscribe(event => {

        const url = (event as NavigationEnd).urlAfterRedirects
        const dus = new DefaultUrlSerializer()
        const city = dus.parse(url).queryParams.city

        this.currentPath = url.includes("?") ? url.substring(1, url.indexOf('?')) : url.substring(1)
        this.cityInput.setValue(city)

        if (city) {
          this.openweathermap.getCoordsTest("moscow").subscribe((data: any) => {
            console.log(data);
            if (data[0]?.lat && data[0]?.lon) {
              if (this.currentPath === DAILY_ROUTE) {
                this.openweathermap.getDailyTest(data[0].lat, data[0].lon).subscribe(dailyData => {
                  console.log(dailyData);

                })
              }
              if (this.currentPath === HOURLY_ROUTE) {
                this.openweathermap.getHourlyTest(data[0].lat, data[0].lon).subscribe(hourlyData => {
                  console.log(hourlyData);

                })
              }
            }
          })
        }
      });
  }
}
