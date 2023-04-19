import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(private http: HttpClient) {}

  /* this method is used to login user  */
  login(data: any): Observable<any> {
    return this.http.post(
      'https://demo.credy.in/api/v1/usermodule/login/',
      data
    );
  }
  /* It is used to get movie Details */
  movieDetails() {
    let headers = new HttpHeaders().set(
      'Authorization',
      `${localStorage.getItem('token')}`
    );
    return this.http.get('https://demo.credy.in/api/v1/maya/movies/', {
      headers,
    });
  }
  /* It is used to get images for particular movie name */
  image(data: any) {
    return this.http.get(`https://ui-avatars.com/api/?name=${data}`);
  }
}
