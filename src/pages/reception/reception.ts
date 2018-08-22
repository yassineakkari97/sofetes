import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import * as firebase from 'firebase';
import {Calendar} from '@ionic-native/calendar'

import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import { HomePage } from '../home/home';
import { ArticlePage } from '../article/article';
import { ClientPage } from '../client/client';
import { FournisseurPage } from '../fournisseur/fournisseur';
import { CaisePage } from '../caise/caise';
import { ReservationPage } from '../reservation/reservation';
import { EprevisionPage } from '../eprevision/eprevision';

import { Subject } from 'rxjs/Subject';

import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent
} from 'angular-calendar';
import { BanquePage } from '../banque/banque';

@Component({
  selector: 'page-reception',
  templateUrl: 'reception.html',
})
export class ReceptionPage {
  Image1 : string ;

  eventDate: any ; 


  date:any= new Date();
  yyyy:any=this.date.getFullYear();


  
  viewDate: Date = new Date();
  view = 'week';
  locale: string = 'en';
  isDragging = false;
  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  

  reservations : number =0 ; 
  reservationnp:number =0 ; 
  reservationp:number =0 ; 
  reservationpp:number =0 ; 


  public reservationsRef :firebase.database.Reference;
  public especesRef :firebase.database.Reference;
  public chequesRef :firebase.database.Reference;


  especes :Array<any>=[] ;
  cheques :Array<any>=[] ;

  
  especespayer :Array<any>=[] ;
  chequespayer :Array<any>=[] ;


payer : number = 0 ; 
////////////////////////////////////////////
///public lineChartLabels:Array<any>= [];
/////public lineChartData:Array<any>= [];
public Labels:any[] = [] ;
public Data:number []= [] ;
public test : boolean = false  ;
verif : boolean = false ;
indexValue : any ;
public  bla : any ;
public indexv :number = 10  ;
///////////////////////////////////
public tele : number = 0 ;
public ampoules : number = 0 ;
public informatique : number = 0 ;
public autres : number = 0 ;
public electromenager : number = 0 ;
/*
public doughnutChartLabels:string[] ;
public doughnutChartData:number[] ;
public doughnutChartType:string ;*/
public barChartLabels:string[] ;

public barChartData:any[];

max : any ;
min : any ;
curr : any ;
//////////////////////////////////////////////////

Janvier:number =0;
Fivrier:number =0;
Mars:number =0;
Avril:number =0;
Mai:number =0;
Juin:number =0;
Juillet:number =0;
Auot:number =0;
Septembre:number =0;
October:number =0;
Nouvembre:number =0;
Decembre:number =0;

///////////////////////////////////////////////////////

public lineChartData:Array<any> = [] ;
data : Array<any> = [] ;

public lineChartLabels:Array<any> = ['Janvier', 'Fivrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet','Auot' ,'Septembre','October','Nouvembre','Decembre'];
public lineChartOptions:any = {
  responsive: true
};
public lineChartColors:Array<any> = [
  { 
    backgroundColor: '#EFE2BA',
    borderColor: 'rgb(0,0,0)',
    pointBackgroundColor: 'rgb(184,134,11)',
    pointBorderColor: '#fff',
    pointHoverBackgroundColor: '#fff',
    pointHoverBorderColor: 'rgba(48,159,2,0.8)'}
 
];
public lineChartLegend:boolean = true;
public lineChartType:string = 'line';


public doughnutChartLabels:string[] = ['Payer', 'Non Payer', 'Partiellemeent Payer'];
public doughnutChartData:number[] = [350, 450, 100];
public doughnutChartType:string = 'doughnut';




////////////////////////////////////////////////////////////////////////////
mm : any  = this.date.getMonth()+1; //January is 0!
m1 : number = 0 ;
m2 : number = 0 ;

mm1 :number=0 ;
mm2 :number=0 ;
mm3 :number=0 ;

public barChartOptions:any = {
  scaleShowVerticalLines: false,
  responsive: true
};
public barChartType:string = 'bar';
public barChartLegend:boolean = true;

reser : Array<any> =[] ;
target : any ;

id : any ;
client : any ;
eventstart : any ;
eventend : any ;
datee : any ;

///////////////////////////////////////////////////////////////////////////////////
  constructor( private plt:Platform ,  private alertCtrl: AlertController ,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
   

    this.reservationsRef = firebase.database().ref('/reservations' );
    this.chequesRef = firebase.database().ref('/cheques' );
    this.especesRef = firebase.database().ref('/especes' );
    this.verif=this.navParams.get("test") ;

    if(this.verif!=true) {
      this.navCtrl.setRoot(ReceptionPage, {
        test : true 
      }) ;
      
    }

    if(this.mm==12) {
      this.m1=1 ;
      this.m2=2;
    }
    else if (this.mm==11) {
      this.m1=12;
      this.m2=1;
    }
    else {
      this.m1=this.mm+1;
      this.m2=this.mm+2;
    }

   

    if (this.mm==11) {

      this.Labels=["nouvembre" , "Decembre" ,"Janvier"]
    
    }else if (this.mm==12) {
      this.Labels=["Decembre" , "Janvier" ,"février"]
    
    }else if (this.mm==1) {
      this.Labels=[ "Janvier","Fevrier" ,"Mars"]
    
    
    }else if (this.mm==2) {
      this.Labels=["Fevrier" ,"Mars","Avril"]
    
    
    }else  if (this.mm==3) {
      this.Labels=["Mars","Avril","Mai"]
    
    
    }else if (this.mm==4) {
      this.Labels=["Avril","Mai","juin"]
    
    
    }else if (this.mm==5) {
      this.Labels=["Mai","juin","Juillet"]
    
    
    }else if (this.mm==6) {
      this.Labels=["juin","Juillet","Auot"]
    
    
    }else if (this.mm==7) {
      this.Labels=["Juillet","Auot","Septembre"]
    
    }else if (this.mm==8) {
      this.Labels=["Auot","Septembre","October"]
    
    
    }else if  (this.mm==9) {
      this.Labels=["Septembre","October","Nouvembre"]
    
    
    } else  if  (this.mm==10)  {
      this.Labels=["October","Nouvembre","Decembre"]
    
    }



   

    this.chequesRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        this.cheques.push(produit.val());
        return false;
      });
      
    });


    this.especesRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        this.especes.push(produit.val());
        return false;
      });
      
    });




    this.reservationsRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        this.reser.push(produit.val()) ;
        
        let year= (produit.val().eventDate+"").substr(0,4) ;


        if(year==this.yyyy){
          let final= (produit.val().eventDate+"").substr(5,2) ;

          if(final=="01") {
            this.Janvier=this.Janvier+1 ;

          }
          if(final=="02") {
            this.Fivrier=this.Fivrier+1 ;

            
          }if(final=="03") {
            this.Mars=this.Mars+1 ;

            
          }if(final=="04") {
            this.Avril=this.Avril+1 ;

            
          }if(final=="05") {
            this.Mai=this.Mai+1 ;

            
          }if(final=="06") {
            this.Juin=this.Juin+1 ;

            
          }if(final=="07") {
            this.Juillet=this.Juillet+1 ;

            
          }if(final=="08") {
            this.Auot=this.Auot+1 ;

            
          }if(final=="09") {
            this.Septembre=this.Septembre+1 ;

            
          }if(final=="10") {
            this.October=this.October+1 ;

            
          }if(final=="11") {
            this.Nouvembre=this.Nouvembre+1 ;

            
          }
          if(final=="12") {
            this.Decembre=this.Decembre+1 ;

            
          }



          if(Number ((produit.val().eventDate+"").substr(5,2)) ==this.mm ){
            this.mm1=this.mm1+ 1 ;
       }
       if(Number ((produit.val().eventDate+"").substr(5,2)) ==this.m1 ){
         this.mm2=this.mm2+ 1 ;
   }
   if(Number ((produit.val().eventDate+"").substr(5,2)) ==this.m2 ){
     this.mm3=this.mm3+ 1 ;
   }

          
          
        }

        this.data= [this.Janvier, this.Fivrier, this.Mars,
          this.Avril, this.Mai, this.Juin, this.Juillet,this.Auot , this.Septembre,
           this.October, this.Nouvembre, this.Decembre];
           


        this.reservations=this.reservations+1 ;
        this.chequespayer=[] ;
        this.especespayer=[] ;
        this.payer = 0 ; 

       if(produit.val().payement.espece!=false){
        this.especespayer=produit.val().payement.espece ;
       }

       if(produit.val().payement.cheque!=false){
        this.chequespayer=produit.val().payement.cheque ;
       }

      

       for(var i of this.especespayer) {
         
       for(var ii of this.especes) {
         if(i==ii.key)
         {
           this.payer=this.payer+Number(ii.montant) ;
           
         }
      } }

      

       for(var j of this.chequespayer) {
   
        for(var jj of this.cheques) {
          if(j==jj.key)
          {
            this.payer=this.payer+Number(jj.montant) ;
            
          }
       } 
       }

       
       
       



        let dateString=produit.val().eventDate ;
        let newDate = new Date(dateString);
       let ts=produit.val().timeStarts.substr(0,2) ;
       let te= produit.val().timeEnds.substr(0,2) ;


       let tss=Number(ts) ;
       let tee=Number(te);
       if(this.payer==0) {
   
        this.reservationnp=this.reservationnp+1 ;
        this.events.push({


          start: addHours(startOfDay(newDate),Number(tss)),
          end: addHours(startOfDay(newDate),Number(tee)),
          title: "EVNT "+produit.val().id +" :"+produit.val().client+""+" " +(Number(produit.val().prix)-this.payer),
          cssClass: 'custom-event',
          color: {
            primary: '#FFFFFF',
            secondary: '#FF0000'
          },
          resizable: {
            beforeStart: false,
            afterEnd: false
          },
          draggable: false
       

         });

       }

       else if((Number(produit.val().prix)-this.payer)==0) {

         this.reservationp=this.reservationp+1 ;
        this.events.push({


          start: addHours(startOfDay(newDate),Number(tss)),
          end: addHours(startOfDay(newDate),Number(tee)),
          title: "EVNT "+produit.val().id +" :"+produit.val().client+""+" " +(Number(produit.val().prix)-this.payer),
          cssClass: 'custom-event',
          color: {
            primary: '#FFFFFF',
            secondary: '#34C924'
          },
          resizable: {
            beforeStart: false,
            afterEnd: false
          },
          draggable: false
       

         });

       }else if((Number(produit.val().prix)-this.payer)>0 && (Number(produit.val().prix)-this.payer)!=0) {

        console.log(this.reservationpp);
        console.log(produit.val());
        
        
         this.reservationpp=this.reservationpp+1 ;
        this.events.push({


          start: addHours(startOfDay(newDate),Number(tss)),
          end: addHours(startOfDay(newDate),Number(tee)),
          title: "EVNT "+produit.val().id +" :"+produit.val().client+""+" " +(Number(produit.val().prix)-this.payer),
          cssClass: 'custom-event',
          color: {
            primary: '#FFFFFF',
            secondary: '#ED7F10'
          },
          resizable: {
            beforeStart: false,
            afterEnd: false
          },
          draggable: false
       

         });


       }

       
      
        return false;
      });
      
    });









this.lineChartData=[  {data:this.data , label: 'Nombre de Reservations par mois'}];
this.doughnutChartData=[this.reservationp ,this.reservationnp,this.reservationpp] ;

this.barChartData=[{data:[this.mm1,0,0],label: 'nb reservation(mois '+this.Labels[0]+')' },{data:[0,this.mm2,0],label:'nb reservation(mois '+this.Labels[1]+')'},{data:[0,0,this.mm3],label: 'nb reservation(mois '+this.Labels[2]+')'}] ;
this.barChartLabels=this.Labels ; 




var sortedArray: string[] = this.reser.sort((n1,n2) => {
  if (n1.eventDate > n2.eventDate) {
      return -1;
  }

  if (n1.eventDate < n2.eventDate) {
      return 1;
  }

  return 0;
});
console.log(this.reser[0]);

let j : any ;
let rang : number = 0 ; 

for(var i of this.reser) {
 
  
  let dateString = i.eventDate;
let newDate = new Date(dateString);
console.log(this.date); console.log(newDate);
if(this.date>newDate) {
  console.log(true);
  this.id= j.id ;
  this.eventstart=j.timeStarts
  this.eventend=j.timeEnds;
  this.datee=j.eventDate ;
  this.client=j.client   
 break ;

}
rang = rang +1 ; 
j=i ;


}

this.target=this.reser[rang-1];
console.log(this.datee);
console.log(this.eventend);

/*
this.id= this.target.id ;
this.eventstart=this.target.timeStarts
this.eventend=this.target.timeEnds;
this.datee=this.target.eventDate ;
this.client=this.target.client ;*/

//console.log(this.reser[rang-1].id);




}
  Search(){

    
    let dateString=this.eventDate ;
    let newDate = new Date(dateString);

    this.viewDate=newDate ;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceptionPage');
  }
  StayHere(){
    console.log("ok");
    
  }

  public randomize():void {
    let _lineChartData:Array<any> = new Array(this.lineChartData.length);
    for (let i = 0; i < this.lineChartData.length; i++) {
      _lineChartData[i] = {data: new Array(this.lineChartData[i].data.length), label: this.lineChartData[i].label};
      for (let j = 0; j < this.lineChartData[i].data.length; j++) {
        _lineChartData[i].data[j] = Math.floor((Math.random() * 100) + 1);
      }
    }
    this.lineChartData = _lineChartData;
  }
  
  // events
  public chartClicked(e:any):void {
    console.log(e);
  }
  
  public chartHovered(e:any):void {
    console.log(e);
  }



  sanitize(url:string){
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  PushToGA(){
   this.navCtrl.push(ArticlePage) ;
  }

  PushToGC(){
this.navCtrl.push(ClientPage);
  }


  PushToFournisseurs(){
    this.navCtrl.push(FournisseurPage);
  }

  PushToReservation(){
this.navCtrl.push(ReservationPage);
  }

  PushToCaise(){
this.navCtrl.push(BanquePage);
  }

  PushToEP(){
this.navCtrl.push(EprevisionPage) ;
  }

  Logout(){
    firebase.auth().signOut() ;
    this.navCtrl.setRoot(HomePage);
  }


  GoToService(){
    this.navCtrl.push(FichePage);

  }

  GoToFactures(){
    this.navCtrl.push(Page);

  }

/////////////////////////////////////////////



  handleEvent(event: CalendarEvent): void {

  }
 

 
  eventTimesChanged({event, newStart, newEnd} : CalendarEventTimesChangedEvent): void {
    if (this.isDragging) {
      return;
    }
    this.isDragging = true;
 
    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();
 
    setTimeout(() => {
      this.isDragging = false;
    },1000);
  }
 
  hourSegmentClicked(event): void {
    
  }

}
