import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isValidFormSubmitted = false;
  showContainer: boolean;
  hide: boolean;
  showAnimation: boolean;
  showTemperature: boolean;
  temperature: any;
  loading: boolean;
  data: any;
  lat: number;
  lon: number;
  minNumLat = -90;
  maxNumLat = 90;
  minNumLon = -180;
  maxNumLon = 180;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.showTemperature = false;
    this.showAnimation = true;
    setTimeout(() => {
      this.showAnimation = false;
    }, 5500)
    setTimeout(() => {
      this.hide = true;
    }, 5000)
    setTimeout(() => {
      this.showContainer = true;
    }, 5550)

  }

  zapisz(form: NgForm) {
    document.body.style.backgroundColor =  'grey';    
    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }
    this.isValidFormSubmitted = true;
    this.loading = true;
    this.http.get('https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=' + form.value.lat + '&lon=' + form.value.lon + '&units=metric&APPID=8ffbb88b91e17c55caec95db6d8e40de').subscribe(data => {
      this.data = data;
      this.temperature = this.data.main.temp;
      console.log(this.data);
      this.loading = false;
      this.showTemperature = true;
      form.resetForm();
    })
  }


}
