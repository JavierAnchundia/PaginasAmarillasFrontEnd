import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavBarService {

  private imPostulanteSubject: BehaviorSubject<boolean> = new BehaviorSubject(false );
  public readonly imPostulante: Observable<boolean> = this.imPostulanteSubject.asObservable();

  constructor() { }

  setImPostulante(imPostulante: boolean): void {
    this.imPostulanteSubject.next(imPostulante);
  }
}
