import { Component, OnInit } from '@angular/core';
import { Globales } from '../../modelo/globales';

import { Plantillaexamen } from '../../modelo/plantillaexamen';
import { HttpClient } from '@angular/common/http';
import swal from 'sweetalert2'
@Component({
  selector: 'app-examenes-maestros',
  templateUrl: './examenes-maestros.component.html',
  styleUrls: ["./examenes-maestros.css"]
})
export class ExamenesMaestrosComponent implements OnInit {
mostrarCatalogoInfo1=false;
mostrarCatalogoInfo3=false;

mostrarCatalogoInfo2=false;
mostrarCatalogoInfo4=false

examenesInfo1=[]
examenesInfo3=[]
examenesInfo2=[]
examenesInfo4=[]


idExamen:string;
mostrarExamenAcual: boolean = false;
puedeMostrarse=false;
plantillaexamensito=null;
mostrar=false;
numeroPreguntas:number;
selectedValue: string;
  constructor(public http: HttpClient) { }

  ngOnInit() {


    
this.examenesInfo1 = Globales.inf1_examenes;

 this.examenesInfo3 = Globales.inf3_examenes;

 this.examenesInfo2 = Globales.inf2_examenes;

 this.examenesInfo4 = Globales.inf4_examenes;
 
 
  }
visualizarInfo1(){
  this.puedeMostrarse=false;
this.mostrarCatalogoInfo3=false;
this.mostrarCatalogoInfo2=false;
this.mostrarCatalogoInfo4=false;
this.mostrarCatalogoInfo1=true;
}

visualizarInfo2(){
  this.puedeMostrarse=false;
  this.mostrarCatalogoInfo3=false;
  this.mostrarCatalogoInfo2=true;
  this.mostrarCatalogoInfo4=false;
  this.mostrarCatalogoInfo1=false;
}


visualizarInfo3(){
  this.puedeMostrarse=false;
  this.mostrarCatalogoInfo3=true;
  this.mostrarCatalogoInfo2=false;
  this.mostrarCatalogoInfo4=false;
  this.mostrarCatalogoInfo1=false;
}

visualizarInfo4(){
  this.puedeMostrarse=false;
  this.mostrarCatalogoInfo3=false;
  this.mostrarCatalogoInfo2=false;
  this.mostrarCatalogoInfo4=true;
  this.mostrarCatalogoInfo1=false;
}
mostrarExamen(id:string){
//Borramos todo
this.plantillaexamensito=null

  this.idExamen=id;
  console.log("Examen seleccionado "+id);
  this.puedeMostrarse=true;
  this.mostrarCatalogoInfo3=false;
  this.mostrarCatalogoInfo2=false;
  this.mostrarCatalogoInfo3=false;
  this.mostrarCatalogoInfo4=false;


  let estaUrl: string = Globales.urlBase + "/plantillaexamen/" + id;
  console.log("La es esta  url" + estaUrl);
  this.http.get<Plantillaexamen>(estaUrl).subscribe(respuesta => { this.plantillaexamensito = respuesta });



  setTimeout(() => {

  //Checamos que haya devuelto un examen que no sea null o que este este activo
  if(this.plantillaexamensito==null){
    
this.puedeMostrarse=false;

swal(
  'Examen no activo!',
  'Todavia no está activo este examen',
  'error'
)

  }

    this.mostrar = false;


    this.numeroPreguntas = this.plantillaexamensito.preguntas.length;


    console.log("El examen tiene son numero "+this.plantillaexamensito.preguntas.length);
    console.log("El examen es "+JSON.stringify(this.plantillaexamensito));


  }, 1700);


}



}
