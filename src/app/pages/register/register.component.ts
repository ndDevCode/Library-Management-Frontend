import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, HttpClientModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private http: any;
  public countryList: any[] = [];
  public selectedCountry: { name: string; code: string; flag: string } = {
    name: '',
    code: '',
    flag: '',
  };

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.loadCountries();
  }

  loadCountries() {
    let api = 'https://restcountries.com/v3.1/all';
    this.http.get(api).subscribe((res: any) => {
      res.map((item: any) => {
        let country = {
          name: item.name.common,
          code:
            (item.idd.root != undefined ? item.idd.root : '') +
            (item.idd.suffixes != undefined ? item.idd.suffixes[0] : ''),
          flag: item.flag,
        };

        this.countryList.push(country);
      });
    });
  }

  setSelectedCountry(country: any) {
    this.selectedCountry = country;
  }
}
