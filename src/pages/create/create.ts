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
	_beach_type: Array<{name: string, selected: boolean, id: number}>;
	natural_features: Array<{name: string, selected: boolean, id: number}>;
	undervater_bottom: Array<{name: string, selected: boolean, id: number}>;
	continents: Array<{name: string, code: string}>;
	countries: Array<{name: string, code: string, continent: string}>;
	available_countries: Array<{name: string, code: string, continent: string}>;
	info: any;
	gallery: any;
	galleryItem: any;


	data: any;

	constructor(public navCtrl: NavController, private alertCtrl: AlertController) {

		this._active_tab = 1;
		this._active_type = 1;

		this._land_type = {};

		this._beach_type = [
			{id: 1, name: 'Island', selected: false},
			{id: 2, name: 'Land', selected: false}
		]
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




		this.data = [
			{
				fields: [
					{
						name: "Continent",
						required: true,
						_display_title: true,
						options: [{name: "Europa", code: "EU"}, {name: "Azija", code: "AZ"}],
						type: "select",
						value: null
					},
					{
						name: "Country",
						required: true,
						_display_title: true,
						options: [{name: "Slovenija", code: "SI", continent: "EU"}, {name: "Indija", code: "In", continent: "AZ"}],
						type: "select",
						value: null
					},
					{
						name: "Nearest city",
						required: true,
						_display_title: true,
						type: "text",
						value: null
					},
					{
						name: "Beach name",
						_display_title: true,
						required: true,
						type: "text",
						value: null
					},
					{
						name: "Beach type",
						required: true,
						_display_title: false,
						type: "checkboxes",
						options: [
							{
								name: "Island",
								selected: false	
							},{
								name: "Land",
								selected: false	
							}
						]
					}

				],
				ready: false
			},
			{
				ready: true
			},
			{
				ready: false,
				tabs: [
					{
						title: "Beach type",
						fields: [
						{
							name: "Natural features",
							required: true,
							_display_title: true,
							type: "checkboxes",
							options: [
								{
									name: "White sand",
									selected: false	
								},{
									name: "Brown sand",
									selected: false	
								},{
									name: "Black sand",
									selected: false	
								},{
									name: "Peble",
									selected: false	
								},{
									name: "Parasol",
									selected: false	
								},{
									name: "Conorete",
									selected: false	
								},{
									name: "Swamp",
									selected: false	
								},{
									name: "Holes",
									selected: false	
								},{
									name: "Large stones",
									selected: false	
								},{
									name: "Rocks",
									selected: false	
								},{
									name: "Grass",
									selected: false	
								},{
									name: "Caves",
									selected: false	
								},{
									name: "Natural shade",
									selected: false	
								}
							]
						},
						{
							name: "Underwater Bottom",
							required: true,
							_display_title: true,
							type: "checkboxes",
							options: [
								{
									name: "Sand",
									selected: false	
								},
								{
									name: "Grass",
									selected: false	
								},
								{
									name: "Rocks",
									selected: false	
								},
								{
									name: "Gravel",
									selected: false	
								},
								{
									name: "Corals",
									selected: false	
								}
							]
						},
						{
							name: "Slope type",
							required: true,
							_display_title: true,
							options: [{name: "Europa", code: "EU"}, {name: "Azija", code: "AZ"}],
							type: "select",
							value: null
						},
						{
							name: "Beach type",
							required: true,
							_display_title: true,
							options: [{name: "Europa", code: "EU"}, {name: "Azija", code: "AZ"}],
							type: "select",
							value: null
						},
						{
							name: "Beach occupation",
							required: true,
							_display_title: true,
							options: [{name: "Europa", code: "EU"}, {name: "Azija", code: "AZ"}],
							type: "select",
							value: null
						},
						{
							name: "Beach length",
							required: true,
							_display_title: true,
							options: [{name: "Europa", code: "EU"}, {name: "Azija", code: "AZ"}],
							type: "select",
							value: null
						},
						{
							name: "Beach width",
							required: true,
							_display_title: true,
							options: [{name: "Europa", code: "EU"}, {name: "Azija", code: "AZ"}],
							type: "select",
							value: null
						}
					],
					ready: false
					}
				]
			}
		]



		this.gallery = {
			parking: {
				images: [{path: "assets/imgs/img1.png"}, {path: "assets/imgs/img2.png"}],
				limit: 3,
				label: "Parking Gallery"
			},
			video: {
				images: [{path: "assets/imgs/img1.png"}],
				limit: 7,
				label: "Video Gallery"
			},
			beach: {
				images: [{path: "assets/imgs/img1.png"}, {path: "assets/imgs/img2.png"}, {path: "assets/imgs/img3.png"}],
				limit: 20,
				label: "Beach Gallery"
			}
		};


	}
	// check if all required fields are entered
	validateStep(step) {
		console.log(step)
		if(step.ready) {
			return true;
		} else {
			for(var i = 0; i < step.fields.length; i++) {
				if(step.fields[i].required && 
					!step.fields[i].value &&
					step.fields[i].type != "checkboxes") {
					return step.fields[i].name;
				} else if(step.fields[i].type == "checkboxes") {
					var counter = 0;
					step.fields[i].options.forEach(function(item) {
						if(item.selected) {
							counter++;
						}
					})
					if(counter == 0) return step.fields[i].name;
				}
			} 
		}
		
		return true;
	}
	selectTab(tab) {
		// user wants to go back
		if(this._active_tab > tab) {
			this._active_tab = tab;
			return;
		}
		var validate = this.validateStep(this.data[this._active_tab - 1]);

		if(validate == true) {
			this._active_tab = tab;
		}
		else {
			let alert = this.alertCtrl.create({
		      title: 'Missing fields',
		      subTitle: validate + ' is required.',
		      buttons: [
		        {
		          text: 'OK',
		          role: 'cancel'
		        }
		      ]
		    });
		    alert.present(prompt);
		}
	} 
	selectType(type) {
		var validate = this.validateStep(this.data[2].tabs[this._active_type - 1]);

		if(validate == true) {
			this._active_type = type;
		}
		else {
			let alert = this.alertCtrl.create({
		      title: 'Missing fields',
		      subTitle: validate + ' is required.',
		      buttons: [
		        {
		          text: 'OK',
		          role: 'cancel'
		        }
		      ]
		    });
		    alert.present(prompt);
		}
		
	} 
	openGallery(item) {
		this._galleryOpened = true;
		this.galleryItem = item;
	} 

	proceed(direction) {

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


