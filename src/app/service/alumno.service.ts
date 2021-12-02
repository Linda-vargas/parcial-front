import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class AlumnoService {

  constructor( private http: HttpClient) { }
   listarAlumnos():Observable<any>{
    return this.http.get<any>(environment.url+'pc/listarAlumnos')
  }

  listarCurso():Observable<any>{
    return this.http.get<any>(environment.url+'pc/listarCursos')
  }

  agregarAlumnos(alumno:any):Observable<any>{
    return this.http.post<any>(environment.url+'pc/agregarAlumno',alumno)
  }

  agregarCurso(curso:any):Observable<any>{
    return this.http.post<any>(environment.url+'pc/agregar',curso)
  }

  modificarAlumnos(alumno:any):Observable<any>{
    return this.http.put<any>(environment.url+'pc/actualizarAlumno',alumno)
  }

  modificarCurso(curso:any):Observable<any>{
    return this.http.put<any>(environment.url+'pc/actualizar',curso)
  }

  actualizarAlumnoCur(curalu:any):Observable<any>{
    return this.http.put<any>(environment.url+'pc/actualizarAlumnoCur',curalu)
  }

  agregarAlumnoCur(curalu:any):Observable<any>{
    return this.http.post<any>(environment.url+'pc/agregarAlumnoCur',curalu)
  }
  eliminarcuralu(curalu:any):Observable<any>{
    return this.http.put<any>(environment.url+'pc/eliminarcuralu',curalu)
  }
}
