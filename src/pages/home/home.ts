import { Component, ViewChild,Injectable, Injector } from '@angular/core';
import {  NavController, NavParams, AlertController,LoadingController} from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { EmailValidator } from '../../validators/email';
import { FormBuilder, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { ToastController } from 'ionic-angular';
import { ReceptionPage } from '../reception/reception';

import { RegisterPage } from '../register/register';
 import { App } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public userRef :firebase.database.Reference;
  public loginForm: any;

  pass : any ;
  email : any ;

	@ViewChild('username') user;
  @ViewChild('password') password;
  @ViewChild('cpassword') cpassword;
  constructor(private app: App,private toastCtrl: ToastController,  private afauth:AngularFireAuth,public navCtrl: NavController,private alertCtrl: AlertController, private fire:AngularFireAuth,
    public navParams: NavParams, public formBuilder: FormBuilder, 
    public loadingCtrl: LoadingController, private afDb: AngularFireDatabase) {
      this.userRef = firebase.database().ref('/admins/' );
      


      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }


  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
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
  
    toast.present();
  }


  
  EmailLogin() {
    console.log(this.email);
    

if(this.email==undefined || this.pass==undefined) {
console.log("true");

this.alert("remplir tous les champs SVP !") ;
}
else {
 

 this.fire.auth.signInWithEmailAndPassword(this.email , this.pass)
 .then( data => {
   console.log('got some data', this.fire.auth.currentUser);
   this.presentToast('Success! You\'re logged in');
   this.navCtrl.setRoot(ReceptionPage);
   // user is logged in
 })
 .catch( error => {
   console.log('got an error', error); 
   this.presentToast(error.message);
 })
 console.log('Would sign in with ', this.email, this.pass);
}


}

  
  PushToSingup(){

    this.navCtrl.push(RegisterPage);

  }
  
}
