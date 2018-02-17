import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';



@Component({
	selector: 'page-create',
	templateUrl: 'create.html'
})



export class CreateEntry {

	_active_tab: number;
	_active_type: number;
	_galleryOpened: boolean = false;
	_land_type: any;
	natural_features: Array<{name: string, selected: boolean, id: number}>;
	undervater_bottom: Array<{name: string, selected: boolean, id: number}>;
	continents: Array<{name: string, code: string}>;
	countries: Array<{name: string, code: string, continent: string}>;
	info: any;
	gallery: any;
	galleryItem: any;

	constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

		this._active_tab = 1;
		this._active_type = 1;

		this._land_type = {};
		this.natural_features = [
			{id: 1, name: 'White sand', selected: false},
			{id: 2, name: 'Brown sand', selected: false},
			{id: 3, name: 'Black sand', selected: false},
			{id: 4, name: 'Peble', selected: false},
			{id: 5, name: 'Parasol', selected: false},
			{id: 6, name: 'Holes', selected: false},
			{id: 7, name: 'Large stones', selected: false},
			{id: 8, name: 'Rocks', selected: false},
			{id: 9, name: 'Grass', selected: false},
			{id: 10, name: 'Caves', selected: false},
			{id: 11, name: 'Natural shade', selected: false}
		]
		this.undervater_bottom = [
			{id: 1, name: 'Sand', selected: false},
			{id: 2, name: 'Grass', selected: false},
			{id: 3, name: 'Rocks', selected: false},
			{id: 4, name: 'Gravel', selected: false},
			{id: 5, name: 'Corals', selected: false}
		]

		this.continents = [{name: "Europa", code: "EU"}, {name: "Azija", code: "AZ"}];
		this.countries = [{name: "Slovenija", code: "SI", continent: "EU"}, {name: "Indija", code: "In", continent: "AZ"}];
		this.info = {parking_image: true, path_image: true, beach_image: null, video: null, sphere: null, draw_path: true, continent: null, country: null, nearest_city: null, beach_name: null, type: "Island"};

		this.gallery = {
			parking: {
				images: [{path: "../assets/imgs/img1.png"}, {path: "../assets/imgs/img2.png"}],
				limit: 3,
				label: "Parking Gallery"
			},
			video: {
				images: [{path: "../assets/imgs/img1.png"}],
				limit: 7,
				label: "Video Gallery"
			},
			beach: {
				images: [{path: "../assets/imgs/img1.png"}, {path: "../assets/imgs/img2.png"}, {path: "../assets/imgs/img3.png"}],
				limit: 20,
				label: "Beach Gallery"
			}
		};


	}

	selectTab(tab) {
		this._active_tab = tab;
	} 
	selectType(type) {
		this._active_type = type;
	} 
	openGallery(item) {
		this._galleryOpened = true;
		this.galleryItem = item;
	} 

	deleteImages() {
		let alert = this.alertCtrl.create({
      title: 'Are you sure you want to delete?',
      subTitle: 'Once images are deleted there is no way to restore them.',
      buttons: [
        {
          text: 'NO',
          role: 'cancel',
          handler: () => {
            //alert.dismiss();
          }
        },
        {
          text: 'YES',
          handler: () => {
            for(var i = this.galleryItem.images.length - 1; i >= 0; i--) {
				if(this.galleryItem.images[i].selected) {
					this.galleryItem.images.splice(i, 1);
				}
			}
          }
        }
      ]
    });
    alert.present(prompt);
		
		
	}

	
}


