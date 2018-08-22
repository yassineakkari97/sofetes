import { Component } from '@angular/core';
import {  NavController, NavParams, AlertController,LoadingController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { HomePage } from '../home/home';



@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public usersRef :firebase.database.Reference;
  pass : any ;
  cpass : any ;
  email :any ;
  constructor(private toastCtrl: ToastController,  private afauth:AngularFireAuth,public navCtrl: NavController,private alertCtrl: AlertController, private fire:AngularFireAuth,
    public navParams: NavParams, public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController, private afDb: AngularFireDatabase) {

      this.usersRef = firebase.database().ref('/admines' );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }


  
  presentToast(msg : string ) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Attention!',
      subTitle: 'verifier vos donnes SVP!',
      buttons: ['OK']
    });
    alert.present();
  }

  PushToSingup(){

    this.navCtrl.push(HomePage);
  }
  registerUser() 
  { 
    console.log(this.email , this.pass , this.cpass);
    
    if(this.email==undefined || this.pass==undefined || this.cpass==undefined) {
    this.showAlert();}
    
    else {
   
    if (this.pass!=this.cpass) {
      this.presentToast("mot de passe et confirmation ne sont pas confondu!");}
      else 
      if (this.pass==this.cpass) {
         
        
        
        this.usersRef.push({
          email: this.email
        });
    this.fire.auth.createUserWithEmailAndPassword(this.email , this.pass)
    .then(data => {
      console.log('got data ', data);
      this.presentToast('Registered!');
      
     this.navCtrl.setRoot(HomePage);

    })
    .catch(error => {
      console.log('got an error ', error);
      this.presentToast(error.message);
    });
    
    return true;
  }
  else {
    this.showAlert() ;
  }
} }

}
