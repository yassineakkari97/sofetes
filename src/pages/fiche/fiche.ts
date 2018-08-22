import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import * as firebase from 'firebase';

import { HomePage } from '../home/home';
import { ArticlePage } from '../article/article';
import { ClientPage } from '../client/client';
import { FournisseurPage } from '../fournisseur/fournisseur';
import { ReceptionPage } from '../reception/reception';
import { ReservationPage } from '../reservation/reservation';
import { EprevisionPage } from '../eprevision/eprevision';
import { SdPage } from '../sd/sd';
import { EspecePage } from '../espece/espece';
import { BanquePage } from '../banque/banque';
import { AlertController } from 'ionic-angular';
import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';
import { ReservePage } from '../reserve/reserve';
import { CServicePage } from '../c-service/c-service';
import { UServicePage } from '../u-service/u-service';
import { FServiePage } from '../f-servie/f-servie';
import { Page } from '../page/page';


@Component({
  selector: 'page-fiche',
  templateUrl: 'fiche.html',
})
export class FichePage {

 

  public compteRef :firebase.database.Reference;
  public chequeRef :firebase.database.Reference;
  public numchequeRef :firebase.database.Reference;
item : any ;

it : Array<any> = [] ; 



items0 : Array<any> = [] ; 
items1 : Array<any> = [] ; 
items2 : Array<any> = [] ; 
result : Array<any> = [] ; 
name : any ;
today : any  = new Date();
yyyy : any = this.today.getFullYear();
dd : any  = this.today.getDate();
mm : any  = this.today.getMonth()+1; //January is 0!

aff:Array<any>=[] ;


mmmm : Array<any>=[] ;
nnnn : Array<any>=[] ;


payer : number=0 ;  

test : boolean = true ; 


/////////////////////////

especet : any= [] ; ;
especetotal : number = 0 ;


chequet : any= [] ; ;
chequetotal : number = 0 ;


public especeRef :firebase.database.Reference;
public serviceRef :firebase.database.Reference;


  public creditRef :firebase.database.Reference;
  public especesRef :firebase.database.Reference;
  Image1 : string ;
  items : Array<any> =[] ;




  constructor(private afdb: AngularFireDatabase,public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
   

    
    this.test=this.navParams.get("test") ;

    if (this.test!=true) {
      this.test=true ;
    this.navCtrl.setRoot(FichePage,{
      test: this.test

    });
  }

    this.creditRef = firebase.database().ref('/credit' );
    this.serviceRef = firebase.database().ref('/services' );
    this.especesRef = firebase.database().ref('/especes' );


      this.compteRef = firebase.database().ref('/banque' );
      this.chequeRef = firebase.database().ref('/cheques' );
      this.numchequeRef = firebase.database().ref('/ncheque' );

      this.serviceRef.on('value', produitList => {
      
        produitList.forEach( produit => {
          this.items.push(produit.val());
          return false;
        });
        
      });


      this.especeRef = firebase.database().ref('/especes' );
      this.chequeRef = firebase.database().ref('/cheques' );

      this.serviceRef.on('value', produitList => {

       let d : number = 0 ; 
     
       produitList.forEach( produit => {

         this.especeRef.on('value', especeList => {
     
           especeList.forEach( espece => {
             
                console.log(true);
                
               d=0;
             d=d+Number(espece.val().montant) ;
               
           
                  this.mmmm.push({montant : d , id :espece.val().fact });
             return false;
           });
           
         });
       
let p : number = 0 ; 
         this.chequeRef.on('value', chequeList => {
        
           chequeList.forEach( cheque => {
             
              
                p=0 ;
             p=p+Number(cheque.val().montant) ;
           
           this.nnnn.push({montant : p , id :cheque.val().fact });

            return false;
          });
          
        });
        console.log(this.mmmm);
        console.log(this.nnnn);
        this.payer =0 ;
        
        console.log(produit.val());
        let z : any =produit.val().id+"s" ;
        console.log(z);
         
        for (var  i of this.mmmm) 
        { ///////////////////////////////////////////////////////////////////////z matita9rach fi wost for 
      
        
          if (i.id=='s'+produit.val().id) {
            this.payer=this.payer +Number(i.montant) ;

          }
        }
        console.log(this.payer);


        for (var  j of this.nnnn) {
          console.log(j);
          console.log(produit.val());
          
         if (j.id=='s'+produit.val().id) {
           this.payer=this.payer +Number(j.montant) ;
           
         }
       }


       console.log( Number(produit.val().cout) - this.payer);
       

        
         this.items1.push({
           item: produit.val() ,
           reste : Number(Number(produit.val().cout) - this.payer).toFixed(3)  
         })
         return false;
       });
       
     });

     console.log(this.items1);
     

     var sortedArray: string[] = this.items1.sort((n1,n2) => {
      if (n1.item.date > n2.item.date) {
          return -1;
      }
    
      if (n1.item.date < n2.item.date) {
          return 1;
      }
    
      return 0;
    });
  
 

  }


  GoToService(){
    this.navCtrl.push(FichePage);

  }

  GoToFactures(){
    this.navCtrl.push(Page);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReceptionPage');
  }
  StayHere(){
    console.log("ok");
    
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

  PushToBnaque(){
this.navCtrl.push(BanquePage);
  }

  PushToEspece(){

this.navCtrl.push(EspecePage) ;
  }

  PushToST(){
this.navCtrl.push(SdPage);
  }

  pushToDashboard(){
    this.navCtrl.push(ReceptionPage);
    
  }

  ////////////////////////////////////////

  PushToCSercice(){
    this.navCtrl.push(CServicePage) ;
  }
 

  Update(item:any) {

    this.navCtrl.push(UServicePage, {
      item : item
    }) 
  }

  Details(item:any) {

    

  this.chequeRef.on('value', produitList => {
    produitList.forEach( produit => {
       console.log((produit.val().fact));
       console.log(item.id);
       
       
     
        if(produit.val().fact=="s"+item.item.id){
      this.chequet.push(produit.val());
      this.chequetotal=this.chequetotal+Number(produit.val().montant) ; 
      console.log(this.chequetotal);
      
        }
      return false;
    });
    
  });

  this.especeRef.on('value', produitList => {
    produitList.forEach( produit => {
     
       
        if(produit.val().fact=="s"+item.item.id){
          this.especet.push(produit.val());
          this.especetotal=this.especetotal+Number(produit.val().montant) ;     
    }
     
      return false;
    });

 
    
  });



console.log(this.especetotal);
console.log(this.especet);


console.log(this.chequetotal);
console.log(this.chequet);




    this.navCtrl.push(FServiePage,{
      especetotal: this.especetotal,
      especet:this.especet,
    chequetotal:this.chequetotal,
    chequet:this.chequet,
    item:item
    })

  }


  Delete(item:any) {
    console.log(item.key);
    console.log(this.afdb.object("/services/"+item.key));
    
    
    this.afdb.object("/services/"+item.key).remove() ;
    this.items=[];

    this.serviceRef.on('value', produitList => {
      
      produitList.forEach( produit => {
        this.items.push(produit.val());
        return false;
      });
      
    });


    console.log(this.items);
    


  }


}
