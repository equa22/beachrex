import { Component } from '@angular/core';
import { App, ViewController } from 'ionic-angular';
import { HomePage } from '../home/home';



@Component({
	selector: 'page-welcome',
	templateUrl: 'welcome.html'
})



export class WelcomePage {

	constructor(
      public viewCtrl: ViewController,
      public appCtrl: App
    ) {}

}


