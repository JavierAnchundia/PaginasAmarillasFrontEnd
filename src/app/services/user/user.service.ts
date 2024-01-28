import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import URL_SERVICIOS from 'src/app/config/config';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpOptions: any;
  public token!: any;
  public refresh!: string;
  public user!: null;
  public tokenExp!: Date | null;
  public errors: any = [];
  public isLoggedIn = false;

  constructor(
    public http: HttpClient,
    public router: Router
  ) 
  {

    this.loadStorage();
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    };
   }


 // Metodo para autenticar al usuario
 public loginUser(user: any): Observable<boolean> {
  const url = URL_SERVICIOS.login + '/';

  console.log(JSON.stringify(user));
  return this.http.post(url, JSON.stringify(user), this.httpOptions).pipe(
    map((resp: any) => {
      console.log(resp)
      this.isLoggedIn = true;
      this.token = JSON.stringify(resp.access);
      this.refresh = JSON.stringify(resp.refresh).slice(1, -1);
      this.updateData(resp.access);
      localStorage.setItem('token', this.token);
      localStorage.setItem('refresh', this.refresh);
      localStorage.setItem('user', JSON.stringify(this.tokenGestion(resp.access)));
      return true;
    })
  );
} 

  loadStorage(): void {
    if (localStorage.getItem('token') && localStorage.getItem('refresh')) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user')|| '{}');
      const expiresIn = JSON.parse(localStorage.getItem('user')|| '{}').exp;
      const tokenDuration = new Date(expiresIn * 1000).getTime() - new Date().getTime();
      if (tokenDuration <= 300000) {
        this.logoutUser();
      }
    }
    else {
      this.token = null;
      this.user = null;
    }
  }


  logoutUser(): void {
    this.token = '';
    this.tokenExp = null;
    localStorage.removeItem('token');
    localStorage.removeItem('type');
    localStorage.removeItem('user');
    localStorage.removeItem('refresh');
    localStorage.removeItem('status');
    this.isLoggedIn = false;
    this.router.navigateByUrl('/');
  }


  refreshToken(): void {
    const url = URL_SERVICIOS.refresh + '/';
    this.http.post(url, { refresh: localStorage.getItem('refresh') }, this.httpOptions).subscribe(
      (data: any) => {
        localStorage.setItem('token', data.access);
        localStorage.setItem('user', JSON.stringify(this.tokenGestion(data.access)));
        this.updateData(data.access);
      },
      err => {
        this.errors = err.error;
      }
    );
  }


  updateData(accesData: string): void{
    this.token = accesData;
    this.errors = [];

    const tokenParts = this.token.split(/\./);
    const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
    this.tokenExp = new Date(tokenDecoded.exp * 1000);
  }

  // Metodo para extraer payload de token
  tokenGestion(token: string): string {
    const tokenParts = token.split(/\./);
    const tokenDecoded = JSON.parse(window.atob(tokenParts[1]));
    return tokenDecoded;
  }

}
