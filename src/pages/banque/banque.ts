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
import { CaisePage } from '../caise/caise';
import { AlertController } from 'ionic-angular';
import { AComptePage } from '../a-compte/a-compte';
import { AcChequePage } from '../ac-cheque/ac-cheque';

import { AngularFireDatabase ,AngularFireList} from 'angularfire2/database';

import { FichePage } from '../fiche/fiche';
import { Page } from '../page/page';
import { DetailsPage } from '../details/details';



@Component({
  selector: 'page-banque',
  templateUrl: 'banque.html',
})
export class BanquePage {
  public compteRef :firebase.database.Reference;
  public chequeRef :firebase.database.Reference;
  public numchequeRef :firebase.database.Reference;
  public creditRef :firebase.database.Reference;

item : any ;

items0 : Array<any> = [] ; 
items1 : Array<any> = [] ; 
items2 : Array<any> = [] ; 
result : Array<any> = [] ; 
name : any ;


today : any  = new Date();
dd : any  = this.today.getDate();
mm : any  = this.today.getMonth()+1; //January is 0!
yyyy : any = this.today.getFullYear();



  Image1 : string ;
  comptes : Array<any> =[] ;
  cheques : Array<any> =[] ;
  chequess : Array<any> =[] ;

  k  :any ;
  nvmontant : any ;
  public historiqueRef :firebase.database.Reference;
  histoire : Array<any> =[];


  isDanger: boolean = true;
  isSecondary: boolean = false;
  isRound: boolean = true;
  isOutline: boolean = false;
  isClear: boolean = true;
  myColor: string = 'secondary';
  myColor2: string = 'dark';
  nombanque : any ; 

  constructor(private afdb: AngularFireDatabase,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams,public sanitizer : DomSanitizer) {
    this.Image1="https://firebasestorage.googleapis.com/v0/b/sofetes-28d30.appspot.com/o/logo%20png.png?alt=media&token=4cbf34b0-ea2c-4df8-bc73-0823e542f56e";
    this.compteRef = firebase.database().ref('/banque' );
    this.chequeRef = firebase.database().ref('/cheques' );
    this.numchequeRef = firebase.database().ref('/ncheque' );
    this.creditRef = firebase.database().ref('/credit' );
   this.historiqueRef= firebase.database().ref('/historique' );

    this.comptes=[] ;
    this.compteRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        this.comptes.push(produit.val());
        return false;
      });
      
    });

    console.log(this.comptes);
    

    this.cheques=[] ;
    this.chequeRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        if ((produit.val().proprietaire!="sofetes")&&(produit.val().etat==false)) 
        this.cheques.push({n:produit.val().numero ,dv:produit.val().DateVirement , dd :produit.val().DateDepot ,p:produit.val().proprietaire ,m:produit.val().montant,e:"non en caise",key:produit.val().key});
      
        return false;
      });
      
    });


    this.chequess=[];
    
    this.chequeRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        if ((produit.val().proprietaire=="sofetes")&&(produit.val().etat==false)) {
          this.chequess.push(produit.val());

        return false;}
      });
      
    });

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

  



  logEvent(event) {
    console.log(event)
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


  PushToEspece(){

this.navCtrl.push(EspecePage) ;
  }

  PushToST(){
this.navCtrl.push(SdPage);
  }

  PushToDashboard(){
    this.navCtrl.push(ReceptionPage) ;
  }
  ////////////////////////////////

  AddCompte() {
    this.navCtrl.push(AComptePage);
  }


  AddCheque() {
   this.navCtrl.push(AcChequePage);
  }

 
 
  Delete1(item:any) {

    this.afdb.object('/banque/'+item.key).remove();
    this.comptes=[] ;
    this.compteRef.on('value', produitList => {
  
      produitList.forEach( produit => {
  //      if(produit.val().proprietaire!="sofetes")

        this.comptes.push(produit.val());
        return false;
      });
      
    });

    this.numchequeRef.on('value', produitList => {
  
      produitList.forEach( produit => {
if(produit.val().id==item.id)
this.afdb.object('/ncheque/'+produit.val().key).remove();

return false;
      });
      
    });


  }


  GoToService(){
    this.navCtrl.push(FichePage);

  }

  GoToFactures(){
    this.navCtrl.push(Page);

  }

  Update2(item:any) {
    console.log(item);
    
    
    let alert = this.alertCtrl.create();
    alert.setTitle('Liste des Comptes');

    for(var item1 of this.comptes) {
    alert.addInput({
      type: 'radio',
      label: 'CMP-'+item1.id+":"+item1.banque,
      value: item1.id,
      checked: false
    });
  }

    alert.addButton('Cancel');
    alert.addButton({
      text: 'OK',
      handler: data => {
        console.log(data);
        

        
        for (var item1 of this.comptes) {
          if(item1.id==data) 
            {this.k=item1.key ;
            this.nombanque=item1.banque ;}
     
            
            

            this.nvmontant=Number(item1.montant);
     
              }


              console.log(item);
              
       if(item.p=="sofetes") {/*
        this.nvmontant=this.nvmontant-Number(item.m) ;
        this.afdb.object('/banque/'+this.k).update({ montant : this.nvmontant});


console.log(true);
*/
        }
        else {      this.afdb.object('/cheques/'+item.key).update({etat:true}); 
       
        this.nvmontant=this.nvmontant+Number(item.m)
        console.log(this.nvmontant);
        console.log(this.k);
        this.nvmontant=Number(this.nvmontant).toFixed(3) ; 

        
        this.afdb.object('/banque/'+this.k).update({ montant : this.nvmontant});

        let kkk : any ;
        let tab : any =  [] ;
        for(var z of this.histoire) {
          if (z.banque==this.nombanque) {
            kkk=z.key ;
            tab=z.hist ;
          }
        }

        item.m=Number(item.m).toFixed(3) ;

        let msg =this.today+": Ajout d'un montant "+item.m+"dt grace au Drainage de l'instrument bancaire de chéque numero "+item.n ;
        tab.push(msg) ;

        this.afdb.object('/historique/'+kkk).update({ hist : tab});

       }
   
  
     
        this.comptes=[] ;
this.compteRef.on('value', produitList => {
  
  produitList.forEach( produit => {
    if(produit.val().proprietaire!="sofetes")

    this.comptes.push(produit.val());
    return false;
  });
  
});

     

this.cheques=[] ;
this.chequeRef.on('value', produitList => {
  produitList.forEach( produit => {
    if ((produit.val().proprietaire!="sofetes")&&(produit.val().etat==false)) 
   { produit.val().montant=Number(produit.val().montant).toFixed(3) ;
    this.cheques.push({n:produit.val().numero ,dv:produit.val().DateVirement , dd :produit.val().DateDepot ,p:produit.val().proprietaire ,m:produit.val().montant,e:"non en caise",key:produit.val().key});}
    
    return false;
  });
  
});

this.chequess=[];
    
this.chequeRef.on('value', produitList => {

  produitList.forEach( produit => {
    if ((produit.val().proprietaire=="sofetes")&&(produit.val().etat==false)) {
      this.chequess.push(produit.val());

    return false;}
  });
  
});

      }

    });
    alert.present();

    
  }


  Delete2(item:any ) {

    this.afdb.object('/cheques/'+item.key).remove(); 



    this.cheques=[] ;
    this.chequeRef.on('value', produitList => {
  
      produitList.forEach( produit => {
        if ((produit.val().proprietaire!="sofetes")&&(produit.val().etat==false)) 
        { produit.val().montant=Number(produit.val().montant).toFixed(3) ;
        this.cheques.push({n:produit.val().numero ,dv:produit.val().DateVirement , dd :produit.val().DateDepot ,p:produit.val().proprietaire ,m:produit.val().montant,e:"non en caise",key:produit.val().key});}
       
        return false;
      });
      
    });

    
   this.chequess=[] ;  
    this.chequeRef.on('value', produitList => {
    
      produitList.forEach( produit => {
        if ((produit.val().proprietaire=="sofetes")&&(produit.val().etat==false)) 
        {
          this.chequess.push(produit.val());
  
        return false;}
      });
      
    });



  }

  

Update3(item : any) {
  console.log(item);

  let sous = Number(item.montant) ;
let mm : any ;
let bb : any ;
  this.compteRef.on('value', produitList => {
    
    produitList.forEach( produit => {
      console.log(produit.val());
      
      if(produit.val().banque==item.banque)
      {
       mm=produit.val().montant ;
       bb=produit.val().key;
  

      }

      return false;
    });
    
  });
 
    let final : any ; 
  final = Number(mm)-sous ;
final=Number(final).toFixed(3) ;
       this.afdb.object('/banque/'+bb).update({ montant : final});
  this.afdb.object('/cheques/'+item.key).update({etat:true}); 


  let kkk : any ;
        let tab : any =  [] ;
        for(var z of this.histoire) {
          console.log(z);
          console.log(item);
          
          
          if (z.banque==item.banque) {
            kkk=z.key ;
            tab=z.hist ;
          }
        }
        // zyada milouta zada tansach 
item.montant=Number(item.montant).toFixed(3) ;
        let msg =this.today+": retrait d'un montant "+item.montant+"dt grace au Drainage de l'instrument bancaire de chéque numero "+item.numero ;
        tab.push(msg) ;

        this.afdb.object('/historique/'+kkk).update({ hist : tab});


  /////////////

  this.comptes=[] ;
  this.compteRef.on('value', produitList => {
    
    produitList.forEach( produit => {
  
      this.comptes.push(produit.val());
      return false;
    });
    
  });

  
  this.chequess=[];
    
  this.chequeRef.on('value', produitList => {

    produitList.forEach( produit => {
      if ((produit.val().proprietaire=="sofetes")&&(produit.val().etat==false)) {
        this.chequess.push(produit.val());

      return false;}
    });
    
  });

  
  this.cheques=[] ;
  this.chequeRef.on('value', produitList => {

    produitList.forEach( produit => {
      if ((produit.val().proprietaire!="sofetes")&&(produit.val().etat==false)) 
      { produit.val().montant=Number(produit.val().montant).toFixed(3) ;
      this.cheques.push({n:produit.val().numero ,dv:produit.val().DateVirement , dd :produit.val().DateDepot ,p:produit.val().proprietaire ,m:produit.val().montant,e:"non en caise",key:produit.val().key});}
     
      return false;
    });
    
  });

  



}


Delete3(item:any ){
  this.afdb.object('/cheques/'+item.key).remove(); 



  this.cheques=[] ;
  this.chequeRef.on('value', produitList => {

    produitList.forEach( produit => {
      if ((produit.val().proprietaire!="sofetes")&&(produit.val().etat==false))
      { produit.val().montant=Number(produit.val().montant).toFixed(3) ; 
      this.cheques.push({n:produit.val().numero ,dv:produit.val().DateVirement , dd :produit.val().DateDepot ,p:produit.val().proprietaire ,m:produit.val().montant,e:"non en caise",key:produit.val().key});}
     
      return false;
    });
    
  });

  
 this.chequess=[] ;  
  this.chequeRef.on('value', produitList => {
  
    produitList.forEach( produit => {
      if ((produit.val().proprietaire=="sofetes")&&(produit.val().etat==false)) 
      {
        this.chequess.push(produit.val());

      return false;}
    });
    
  });

}

Details(item:any) {

  console.log(true);
  

  this.navCtrl.push(DetailsPage,{
    item :item 
  }) ;

}
  

Retrait(item:any) {

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
              
              


            let final : any= 0 ;
            final = Number(item.montant)-Number(data.montant) ;
            final = Number(final).toFixed(3) ;

            this.afdb.object('/banque/'+item.key).update({ montant : final});

            let kkk : any ;
            let tab : any =  [] ;
            for(var z of this.histoire) {
              if (z.banque==item.banque) {
                kkk=z.key ;
                tab=z.hist ;
              }
            }
            // zyada milouta zada tansach 
    data.montant=Number(data.montant).toFixed(3) ;
            let msg =this.today+": Retrait d'un montant "+data.montant+"dt grace au L'opération '"+data.desc+"'" ;
            tab.push(msg) ;
    
            this.afdb.object('/historique/'+kkk).update({ hist : tab});
    


          }

          this.comptes=[];
          this.compteRef.on('value', produitList => {
  
            produitList.forEach( produit => {
              this.comptes.push(produit.val());
              return false;
            });
            
          });
        
        }
        }
      ],
      cssClass: 'foo',
    });
    prompt.present();
  }

  Ajout(item:any) {

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
              
              


            let final : any= 0 ;
            final = Number(item.montant)+Number(data.montant) ;
           final =Number(final).toFixed(3) ;
            this.afdb.object('/banque/'+item.key).update({ montant : final});

            let kkk : any ;
            let tab : any =  [] ;
            for(var z of this.histoire) {
              if (z.banque==item.banque) {
                console.log("okkkkkkkkkkkkkkk");
                
                kkk=z.key ;
                tab=z.hist ;
              }
            }
            // zyada milouta zada tansach 
    data.montant=Number(data.montant).toFixed(3) ;
            let msg =this.today+": Ajout d'un montant "+data.montant+"dt grace au L'opération '"+data.desc+"'" ;
            tab.push(msg) ;
    
            this.afdb.object('/historique/'+kkk).update({ hist : tab});
    


          }

          this.comptes=[];
          this.compteRef.on('value', produitList => {
  
            produitList.forEach( produit => {
              this.comptes.push(produit.val());
              return false;
            });
            
          });
        
        }
        }
      ]
    });
    prompt.present();
  }


}
  




