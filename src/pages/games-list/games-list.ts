import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';

@Component({
  selector: 'page-games-list',
  templateUrl: 'games-list.html',
})
export class GamesListPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public auth: AuthProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GamesListPage');
  }

}
