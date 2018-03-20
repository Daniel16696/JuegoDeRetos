import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { JugarOnlinePage } from '../jugar-online/jugar-online';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  jugarOnline(){
    this.navCtrl.push(JugarOnlinePage);
  }
}
