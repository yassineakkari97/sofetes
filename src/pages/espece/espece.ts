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
import { BanquePage } from '../banque/banque';
import { CaisePage } from '../caise/caise';
import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';


import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { AlertController } from 'ionic-angular';
import { asTextData } from '../../../node_modules/@angular/core/src/view';
import { HistCaisePage } from '../hist-caise/hist-caise';


@Component({
  selector: 'page-espece',
  templateUrl: 'espece.html',
})
export class EspecePage {
  public caiseRef :firebase.database.Reference;
  public historiqueRef :firebase.database.Reference;

  gid : Array<any>=[] ;
  items : Array<any>=[] ;
  items1 : Array<any>=[] ;

id : any ;
index : number =0 ;
principal : any ;


today : any  = new Date();
dd : any  = this.today.getDate();
mm : any  = this.today.getMonth()+1; //January is 0!
yyyy : any = this.today.getFullYear();



histoire : Array<any> =[];

  Image1 : string ;
  constructor(private afdb: AngularFireDatabase,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
    this.caiseRef= firebase.database().ref('/caises' );
    this.historiqueRef= firebase.database().ref('/historique' );


    if(this.caiseRef!=undefined)
  { this.caiseRef.on('value', produitList => {
   
    produitList.forEach( produit => {
      
        this.items1.push(produit.val()) ;
              
      return false;
    });
    
  });
}


this.historiqueRef.on('value', produitList => {
  
  produitList.forEach( produit => {
    
      this.histoire.push(produit.val());

    return false;
  });
  
});




if(this.dd<10) {
  this.dd = '0'+this.dd
} 

if(this.mm<10) {
  this.mm = '0'+this.mm
} 


this.today = this.mm + '/' + this.dd + '/' + this.yyyy;





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

this.navCtrl.push(BanquePage) ;
  }

  PushToST(){
this.navCtrl.push(SdPage);
  }

  PushToDashboard(){
    this.navCtrl.push(ReceptionPage) ;
  }

  
  GoToService(){
    this.navCtrl.push(FichePage);

  }

  GoToFactures(){
    this.navCtrl.push(Page);

  }
  ////////////////////////////////////////////

  CCaise(){
    const prompt = this.alertCtrl.create({
      title: 'Creer une caise',
      message: "Entrer la Description et le montant initial de la caise",
      inputs: [
        {
          name: 'caise',
          placeholder: 'Caise'
        },
        {
          name: 'montant',
          placeholder: 'Montant initial'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            data.montant=Number(data.montant).toFixed(3) ;
            let ref = this.caiseRef.push({}) ;
            ref.set({
              montant:data.montant ,
              caise: data.caise ,
              key : ref.key
            }) ;
            let msg ='Creation du Caise C-'+data.caise+'avec le budget initial '+data.montant ;
            let tab= [] ;
            tab.push(msg) ;
        
             data.caise=Number(data.caise).toFixed(3) ;
            let ref1 = this.historiqueRef.push({}) ;
            ref1.set({
              hist : tab, 
              caise: data.caise ,
              key : ref1.key
            })

          
            this.items1=[] ;

            if(this.caiseRef!=undefined)
  { this.caiseRef.on('value', produitList => {
   
    produitList.forEach( produit => {
      
        this.items1.push(produit.val()) ;
              
      return false;
    });
    
  });
}


          }
        }
      ]
    });
    prompt.present();
  }
  
  Update(item :any ) {
    if(item.caise=="Caise Principal") {
      const prompt = this.alertCtrl.create({
        title: 'Modifier Caise Principal ',
        message: "donner le nouveau budget de la Caise Principal",
        inputs: [
          {
            name: 'montant',
            placeholder: 'Montant'
          },
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              if (data.montant==''){
                return false ;
              }else
             { 
               data.montant=Number(data.montant).toFixed(3) ;

               this.afdb.object('/caises/'+item.key).update({
                montant:data.montant 
              });
              
              
        let kkk : any ;
        let tab : any =  [] ;
        for(var z of this.histoire) {
          if (z.caise=="Caise Principal") {
            kkk=z.key ;
          }
        }
               data.montant=Number(data.montant).toFixed(3) ;

        let msg =this.today+": initialiser la Caise Principal avec le montant "+data.montant ;
        tab.push(msg) ;

        this.afdb.object('/historique/'+kkk).update({ hist : tab});


            
              this.items1=[] ;
    
              this.caiseRef.on('value', produitList => {
                produitList.forEach( produit => {
                  this.items1.push(produit.val());
                  return false;
                });
                
              });
            
            }
            }
          }
        ]
      });
      prompt.present();
  

    } else {

      const prompt = this.alertCtrl.create({
        title: 'Modiifier '+item.caise,
        message: "Donner le nouveau budget de votre caise ",
        inputs: [{
            name: 'montant',
            placeholder: 'Montant'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Save',
            handler: data => {
              if ((data.montant=='')){
                return false ;
              }else 
             {  
               if(data.montant=="") {data.montant=item.montant ;} 
               
               data.montant=Number(data.montant).toFixed(3) ;
              this.afdb.object('/caises/'+item.key).update({
               montant:data.montant 
              });

                     
        let kkk : any ;
        let tab : any =  [] ;
        for(var z of this.histoire) {
          if (z.caise==item.caise) {
            kkk=z.key ;
            tab=z.hist ;

          }
        }

        let msg =this.today+": initialiser la Caise '" +item.caise+ "' avec le montant "+data.montant ;
        tab.push(msg) ;

        this.afdb.object('/historique/'+kkk).update({ hist : tab});


            
      this.items1=[] ;
    
      this.caiseRef.on('value', produitList => {
        produitList.forEach( produit => {
          this.items1.push(produit.val());
          return false;
        });
        
      });
            
            }
            }
          }
        ]
      });
      prompt.present();
  





    }

  }
  Delete(item:any) {
    this.afdb.object('/caises/'+item.key).remove();
    
    this.items1=[] ;
    
    this.caiseRef.on('value', produitList => {
      produitList.forEach( produit => {
        this.items1.push(produit.val());
        return false;
      });
      
    });

    let kkk : any ;
    for(var z of this.histoire) {
      if (z.caise==item.caise) {
        kkk=z.key ;

      }
    }

    this.afdb.object('/historique/'+kkk).remove();






  }


  
  Ret(item:any) {
    console.log(item);
    

  const prompt = this.alertCtrl.create({
    title: 'Retrait Argent',
    inputs: [
      {
        name: 'desc',
        placeholder: 'Description'
      }, {
        name: 'montant',
        placeholder: 'Montnat'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          if((data.montant!='')&&(data.desc!='')) {
            console.log(data.montant);
            console.log(data.desc);
            
            


          let final : number= 0 ;
          final = Number(item.montant)-Number(data.montant) ;
     final = Number(Number(final).toFixed(3)) ;
          this.afdb.object('/caises/'+item.key).update({ montant : final});

          let kkk : any ;
          let tab : any =  [] ;
          for(var z of this.histoire) {
            if (z.caise==item.caise) {
              kkk=z.key ;
              tab=z.hist ;
            }
          }
          // zyada milouta zada tansach 
  console.log(kkk);
  if (tab==undefined) {
    tab=[] ;
  }
  
          let msg =this.today+": Retrait d'un montant "+data.montant+"dt grace au L'opération '"+data.desc+"'" ;
          tab.push(msg) ;
  
          this.afdb.object('/historique/'+kkk).update({ hist : tab});
  


       

        this.items1=[] ;


        if(this.caiseRef!=undefined)
        { this.caiseRef.on('value', produitList => {
         
          produitList.forEach( produit => {
            
              this.items1.push(produit.val()) ;
                    
            return false;
          });
          
        });
      }
      
      
      }}}
    ],
    cssClass: 'foo',
  });
  prompt.present();
}

Aj(item:any) {

  const prompt = this.alertCtrl.create({
    title: 'Ajouter Argent',
    inputs: [
      {
        name: 'desc',
        placeholder: 'Description'
      }, {
        name: 'montant',
        placeholder: 'Montnat'
      },
    ],
    buttons: [
      {
        text: 'Cancel',
        handler: data => {
          console.log('Cancel clicked');
        }
      },
      {
        text: 'Save',
        handler: data => {
          if((data.montant!='')&&(data.desc!='')) {
            console.log(data.montant);
            console.log(data.desc);
            
            


          let final : number= 0 ;
          final = Number(item.montant)+Number(data.montant) ;

          this.afdb.object('/caises/'+item.key).update({ montant : final});

          let kkk : any ;
          let tab : any =  [] ;
          for(var z of this.histoire) {
            if (z.caise==item.caise) {
              console.log("okkkkkkkkkkkkkkk");
              
              kkk=z.key ;
              tab=z.hist ;
            }
          }
          // zyada milouta zada tansach 
          if (tab==undefined) {
            tab=[] ;
          }
          data.montant=Number(data.montant).toFixed(3) ;
          
          let msg =this.today+": Ajout d'un montant "+data.montant+"dt grace au L'opération '"+data.desc+"'" ;
          tab.push(msg) ;
  
          this.afdb.object('/historique/'+kkk).update({ hist : tab});
  


     


        this.items1=[] ;
        if(this.caiseRef!=undefined)
        { this.caiseRef.on('value', produitList => {
         
          produitList.forEach( produit => {
            
              this.items1.push(produit.val()) ;
                    
            return false;
          });
          
        });
      }
      
      }
      }}
    ]
  });
  prompt.present();
}


Details(item:any) {
  this.navCtrl.push(HistCaisePage,{
    item:item
  });
}



}
