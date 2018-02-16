import { Component, ViewChild } from '@angular/core';
import { NavController, Nav, App, ViewController } from 'ionic-angular';

import { ListPage } from '../list/list';
import { CreateEntry } from '../create/create';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

  @ViewChild(Nav) nav: Nav;
  pushPage: any;
  newEntry: any;

  constructor(
  	public navCtrl: NavController,
  	public viewCtrl: ViewController,
    public appCtrl: App) {

  	this.pushPage = ListPage;
  	this.newEntry = CreateEntry;
  	
  }

  test(page) {
    console.log(page)
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(CreateEntry);
  }
}
