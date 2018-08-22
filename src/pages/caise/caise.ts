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


import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';

@Component({
  selector: 'page-caise',
  templateUrl: 'caise.html',
})
export class CaisePage {

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

public especesRef :firebase.database.Reference;

  public creditRef :firebase.database.Reference;
  public fournisseurRef :firebase.database.Reference;
  Image1 : string ;
  items : Array<any> =[] ;
  constructor(private afdb: AngularFireDatabase,public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
    this.creditRef = firebase.database().ref('/credit' );
    this.fournisseurRef = firebase.database().ref('/fournisseurs' );
    this.especesRef = firebase.database().ref('/especes' );

    console.log(Number("llll"));
    

    if(this.creditRef!=undefined){
    this.creditRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        
        if(Number(produit.val().montant)+""!="NaN")
        this.it.push(produit.val());
        return false;
      });

      
      
    });}

    console.log(this.it);

 let tt : number=0;
    for(var n of this.it){
        for(var v of this.it) {
          if(n.fournisseur==v.fournisseur) {
            tt=tt+Number(n.montant);
          }
          else 
       {tt=Number(n.montant);}    


}
let testt: boolean = false ;
for(var w of this.aff) {
  if(w.fournisseur==n.fournisseur) {
    testt = true ;
  }else {
  }
}

if(testt==false) {
  this.aff.push({fournisseur:n.fournisseur,montant:tt}) ;
}
          
    }
    
    
    if(this.fournisseurRef!=undefined){
      this.fournisseurRef.on('value', produitList => {
    
        produitList.forEach( produit => {


          for(var item of this.it) {
            if(item.fournisseur==produit.val().key)
            item.fournisseur=produit.val().nom+" "+produit.val().prenom  ;
        }

          return false;
        });
  
        
        
      });}

      this.compteRef = firebase.database().ref('/banque' );
      this.chequeRef = firebase.database().ref('/cheques' );
      this.numchequeRef = firebase.database().ref('/ncheque' );
      console.log(this.item);
  
      this.compteRef.on('value', produitList => {
    
        produitList.forEach( produit => {
          this.items0.push(produit.val());
          return false;
        });
        
      });
  
      this.numchequeRef.on('value', produitList => {
    
        produitList.forEach( produit => {
          this.items1.push(produit.val());
          return false;
        });
        
      });
  
      this.chequeRef.on('value', produitList => {
    
        produitList.forEach( produit => {
          this.items2.push(produit.val());
          return false;
        });
        
      });
  
      
      this.today = this.mm + '/' + this.dd + '/' + this.yyyy;

      
console.log(this.items0);

console.log(tt);

for(var i of this.items1) {
console.log("///////////////////////////////////////");
  console.log(i);
  


   for(var j of this.items0) {
      console.log(j.id);
      

      console.log(Number(i.compte)==Number(j.id));

      
          
        if(Number(i.compte)==Number(j.id)) {
           
             console.log(true);
             
            this.name=j.banque ;

                for(var z=Number(i.debut) ;z<Number(i.fin);z++) {
                   if(this.verif(z)) {

                   }
                   else {
                     let variable = ""+this.name+" "+z
                     this.result.push(variable) ;
                   }
                    

                }
        }
       }
}





console.log(this.result);



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

  verif(n:any) {
    for(var item of this.items2) {
      if (Number(item.numero)==Number(n)) {
        return true ;
      }
      return false ;
    }}

  Espece(item : any) {
    const prompt = this.alertCtrl.create({
      title: 'Montant',
      message: "Ajouter un montant",
      inputs: [
        {
          name: 'title',
          placeholder: 'Montant'
        },
      ],
      buttons: [
        {
          text: 'Annuler',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Valider',
          handler: data => {
            let newdata : number = 0 ; 
          
           for(var i of this.it) {
                if(i.key==item.key) {
                  newdata=i.montant ;
                }
           }
           let m = -Number(data.title)+Number(newdata) 

           console.log(m);
           
         if(Number(newdata)>Number(data.title))

         
           {
             data.title=Number(data.title).toFixed(3) ;

            let ref =this.especesRef.push({});
            ref.set({
             montant : data.title ,
             payementDate : this.today ,
              key :ref.key,
              client : item.fournisseur 
            });

              m=Number(Number(m).toFixed(3)) ;
              
           this.afdb.object('/credit/'+item.key).update({
              montant : m
           }); 

           this.navCtrl.setRoot(CaisePage) ;

          }  


      
      


           
          }
        }
      ]
    });
    prompt.present();
  

  }


  Cheque(item : any ) {


this.navCtrl.push(ReservePage,{
  item : item 
});

  }

 




}
