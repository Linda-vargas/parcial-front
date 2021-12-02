import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AluCur, Alumno, Curso } from 'src/app/models/models';
import { AlumnoService } from 'src/app/service/alumno.service';
import { environment } from 'src/environments/environment.prod';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-portal',
  templateUrl: './portal.component.html',
  styleUrls: ['./portal.component.scss']
})
export class PortalComponent implements OnInit {
  codigo:string=""
  data:any
  enabled:boolean=false
  sumnota:number=0;
  sumcredito:number=0;
  promedio:number=0;
  mensaje:any
  isError:boolean=false
  isLoad:boolean=false
  nota:AluCur=new AluCur()

  active = 1;

  curso: Curso = new Curso();
  cursoE: Curso = new Curso();
  cursos: any
  alumnos:any;
  alumnoA:Alumno=new Alumno()
  alumnoM:Alumno=new Alumno()

  constructor(config: NgbModalConfig, private modalService: NgbModal,private http: HttpClient, private alumService:AlumnoService) {
    // customize default values of modals used by this component tree
    config.backdrop = 'static';
    config.keyboard = false;
  }
  ngOnInit(): void {
    this.listarCurso();
    this.listaralumno()

    
  }

  listarCurso(){
    this.alumService.listarCurso().subscribe(x=>{
      this.cursos=x

    })
  }

  listaralumno(){
    this.alumService.listarAlumnos().subscribe(x=>{
      this.alumnos=x

    })
  }


  obtenerDatos(){
    this.promedio=0;
    this.sumnota=0
    this.sumcredito=0
    this.isError=false
    this.isLoad=true
    this.api().subscribe(x=>{

        this.data=x
        if(this.data.curso.length===0){
          this.promedio=0
          this.mensaje="El alumno no ha sido matriculado en ningun curso"
        this.isError=true
        this.enabled=true
        this.isLoad=false
        }else{
        this.enabled=true
        let i=0
        this.data.curso.forEach((e:any) => {
          
          this.sumnota+= e.nota*e.credito
          console.log(this.sumnota)
          this.sumcredito+=e.credito
          i++;
          if(i==this.data.curso.length){
            console.log(i,this.data.curso.length)
            console.log(this.sumcredito,this.sumnota)
            this.promedio=this.sumnota/this.sumcredito
          }
        });
        
        this.isLoad=false
      }
      
    
    })
  }

  api(){
    return this.http.get<any>(environment.url+'pc/listar_alumnos?codalu='+this.codigo).pipe(
      catchError((e:any)=>{
        this.mensaje="El código no existe"
        this.isError=true
        this.isLoad=false
        this.enabled=false
        return throwError(e);
      })
    );
  }

  abrirModal(content:any){

      this.modalService.open(content);
    
  }

  abrirModalM(content:any,data:any){
    this.curso=data
    this.modalService.open(content);
  
}

abrirModalNota(content:any,data:any){
  this.nota=data
  this.modalService.open(content);

}
abrirModalA(content:any,data:any){
  this.alumnoA=data
  this.modalService.open(content);

}

  GuardarCurso(){
    this.alumService.agregarCurso(this.curso).subscribe(x=>{
      this.listarCurso()
      Swal.fire('Agregar curso','El curso ha sido agregado con éxito', 'success')
    })
  }

  GuardarE(){

    this.alumService.modificarCurso(this.curso).subscribe(x=>{
      this.listarCurso()
      Swal.fire('Modificar Curso','El curso ha sido modificado con éxito', 'success')
    })
  }

  eliminarCursoAlu(id:any){
    Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        let dat:AluCur=new AluCur()
        dat.codalu=this.codigo
        dat.codcur=id
        this.alumService.eliminarcuralu(dat).subscribe(x=>{
          this.obtenerDatos()
          Swal.fire('Eliminar Curso','El curso ha sido eliminado con éxito', 'success')
        })
      } 
    })
  }

  eliminarCurso(){
    Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        
      } 
    })
  }

  eliminarAlu(){
    Swal.fire({
      title: 'Esta seguro que desea eliminar?',
      showCancelButton: true,
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        
      } 
    })
  }

  GuardarAl(){
    this.alumService.agregarAlumnos(this.alumnoA).subscribe(x=>{
      this.listaralumno()
      Swal.fire('Agregar Alumno','El alumno ha sido agregado con éxito', 'success')
    })
  }

  GuardarAlM(){
    this.alumService.modificarAlumnos(this.alumnoA).subscribe(x=>{
      this.listaralumno()
      Swal.fire('Modificar Alumno','El alumno ha sido modificado con éxito', 'success')
    })
  }

  GuardarNota(){
    let data:AluCur=new AluCur()
    data.codcur=this.nota.codcur
    data.nota=this.nota.nota
    data.codalu=this.codigo
    this.alumService.actualizarAlumnoCur(data).subscribe(x=>{
      this.obtenerDatos()
      Swal.fire('Modificar Nota','El nota ha sido modificada con éxito', 'success')

    })
  }
  codcurso:any
  notaA:any
  GuardarAgreNot(){
    let data:AluCur=new AluCur()
    data.codcur=this.codcurso
    data.nota=this.notaA
    data.codalu=this.codigo
    this.alumService.agregarAlumnoCur(data).subscribe(x=>{
      this.obtenerDatos()
      Swal.fire('Agregar Curso','El curso ha sido agregado con éxito', 'success')

    })
  }

}
