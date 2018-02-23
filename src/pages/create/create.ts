import { Component,  ViewChild } from '@angular/core';
import { NavController, Content, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';



@Component({
	selector: 'page-create',
	templateUrl: 'create.html',
    providers: [[Camera]]
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
	response: any;
	data: any;
	options:any;
	base64Image: any;

	@ViewChild(Content) content: Content;

	constructor(public navCtrl: NavController, private alertCtrl: AlertController, private camera: Camera) {
		// active tab in main tabs nav
		this._active_tab = 1;
		// active tab in slider nav
		this._active_type = 1;

		this._land_type = {};

		this._beach_type = [
			{id: 1, name: 'Island', selected: false},
			{id: 2, name: 'Land', selected: false}
		]
		/*
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
*/
		//this.continents = [{name: "Europa", code: "EU"}, {name: "Azija", code: "AZ"}];
		//this.countries = [{name: "Slovenija", code: "SI", continent: "EU"}, {name: "Indija", code: "In", continent: "AZ"}];
		this.info = {parking_image: true, path_image: true, beach_image: null, video: null, sphere: null, draw_path: true, continent: null, country: null, nearest_city: null, beach_name: null, type: "Island"};


		this.response = {"location":{"continent":{"status":true,"data":[{"continent_code":"EU","continent_name":"Europe"}]},"country":{"status":true,"data":[{"country_code":"ES","country_code_nice_url":"spain","country_name":"Spain"},{"country_code":"FR","country_code_nice_url":"france","country_name":"France"},{"country_code":"HR","country_code_nice_url":"croatia","country_name":"Croatia"},{"country_code":"IT","country_code_nice_url":"italy","country_name":"Italy"},{"country_code":"SI","country_code_nice_url":"slovenia","country_name":"Slovenia"}]},"region":{"status":true,"data":[{"region":"Dalmatia - Dubrovnik","region_full_name_nice_url":"dalmatia-dubrovnik"},{"region":"Dalmatia - \u0160ibenik","region_full_name_nice_url":"dalmatia-sibenik"},{"region":"Dalmatia - Split","region_full_name_nice_url":"dalmatia-split"},{"region":"Dalmatia - Zadar","region_full_name_nice_url":"dalmatia-zadar"},{"region":"Istra","region_full_name_nice_url":"istra"},{"region":"Kvarner","region_full_name_nice_url":"kvarner"},{"region":"Lika","region_full_name_nice_url":"lika"},{"region":"Alpes-Maritimes","region_full_name_nice_url":"alpes-maritimes"},{"region":"Var","region_full_name_nice_url":"var"},{"region":"Friuli-Venezia Giulia","region_full_name_nice_url":"friuli-venezia-giulia"},{"region":"Liguria","region_full_name_nice_url":"liguria"},{"region":"Toscana","region_full_name_nice_url":"toscana"},{"region":"Veneto","region_full_name_nice_url":"veneto"},{"region":"Obalno kra\u0161ka","region_full_name_nice_url":"obalno-kraska"},{"region":"\u00c0mbit metropolit\u00e0","region_full_name_nice_url":"ambit-metropolita"},{"region":"Comarques gironines","region_full_name_nice_url":"comarques-gironines"}]},"island":{"status":true,"data":[{"island_name":"Island Bra\u010d","island_name_nice_url":"island-brac"},{"island_name":"Island \u010ciovo","island_name_nice_url":"island-ciovo"},{"island_name":"Island Cres","island_name_nice_url":"island-cres"},{"island_name":"Island Hvar","island_name_nice_url":"island-hvar"},{"island_name":"Island Kor\u010dula","island_name_nice_url":"island-korcula"},{"island_name":"Island Krk","island_name_nice_url":"island-krk"},{"island_name":"island Lido","island_name_nice_url":"island-lido"},{"island_name":"Island Lo\u0161inj","island_name_nice_url":"island-losinj"},{"island_name":"Island Murter","island_name_nice_url":"island-murter"},{"island_name":"Island Pag","island_name_nice_url":"island-pag"},{"island_name":"Island Pa\u0161man","island_name_nice_url":"island-pasman"},{"island_name":"island Pellestrina","island_name_nice_url":"island-pellestrina"},{"island_name":"Island Rab","island_name_nice_url":"island-rab"},{"island_name":"Island \u0160olta","island_name_nice_url":"island-solta"},{"island_name":"Island Ugljan","island_name_nice_url":"island-ugljan"},{"island_name":"Island Vir","island_name_nice_url":"island-vir"},{"island_name":"Island Vis","island_name_nice_url":"island-vis"}]},"city":{"status":true,"data":[{"city":"Alassio","city_nice_url":"alassio"},{"city":"Albenga","city_nice_url":"albenga"},{"city":"Alberoni","city_nice_url":"alberoni"},{"city":"Albisola Marina","city_nice_url":"albisola-marina"},{"city":"Ankaran","city_nice_url":"ankaran"},{"city":"Antibes","city_nice_url":"antibes"},{"city":"Arbanija","city_nice_url":"arbanija"},{"city":"Aregai","city_nice_url":"aregai"},{"city":"Arenys de Mar","city_nice_url":"arenys-de-mar"},{"city":"Arenzano","city_nice_url":"arenzano"},{"city":"Arma di Taggia","city_nice_url":"arma-di-taggia"},{"city":"Arrenzano","city_nice_url":"arrenzano"},{"city":"Aurisina","city_nice_url":"aurisina"},{"city":"Badalona","city_nice_url":"badalona"},{"city":"Bale","city_nice_url":"bale"},{"city":"Bani\u0107i","city_nice_url":"banici"},{"city":"Banj","city_nice_url":"banj"},{"city":"Banjol","city_nice_url":"banjol"},{"city":"Banjole","city_nice_url":"banjole"},{"city":"Barbariga","city_nice_url":"barbariga"},{"city":"Barbat na Rabu","city_nice_url":"barbat-na-rabu"},{"city":"Barcelona","city_nice_url":"barcelona"},{"city":"Ba\u0161anija","city_nice_url":"basanija"},{"city":"Ba\u0161ka","city_nice_url":"baska"},{"city":"Ba\u0161ka Voda","city_nice_url":"baska-voda"},{"city":"Beaulieu-sur-Mer","city_nice_url":"beaulieu-sur-mer"},{"city":"Begur","city_nice_url":"begur"},{"city":"Belej","city_nice_url":"belej"},{"city":"Beli","city_nice_url":"beli"},{"city":"Bergeggi","city_nice_url":"bergeggi"},{"city":"Bergur","city_nice_url":"bergur"},{"city":"Betina","city_nice_url":"betina"},{"city":"Bibinje","city_nice_url":"bibinje"},{"city":"Bibione","city_nice_url":"bibione"},{"city":"Biograd na Moru","city_nice_url":"biograd-na-moru"},{"city":"Blanes","city_nice_url":"blanes"},{"city":"Blato","city_nice_url":"blato"},{"city":"Bobovi\u0161\u0107a","city_nice_url":"bobovisca"},{"city":"Bogomolje","city_nice_url":"bogomolje"},{"city":"Bol","city_nice_url":"bol"},{"city":"Bonassola","city_nice_url":"bonassola"},{"city":"Bordighera","city_nice_url":"bordighera"},{"city":"Borghetto Santo Spirito","city_nice_url":"borghetto-santo-spirito"},{"city":"Borgio","city_nice_url":"borgio"},{"city":"Bormes-les-Mimosas","city_nice_url":"bormes-les-mimosas"},{"city":"Borovici","city_nice_url":"borovici"},{"city":"Brela","city_nice_url":"brela"},{"city":"Brijesta","city_nice_url":"brijesta"},{"city":"Brist","city_nice_url":"brist"},{"city":"Brna","city_nice_url":"brna"},{"city":"Brodarica","city_nice_url":"brodarica"},{"city":"Brse\u010dine","city_nice_url":"brsecine"},{"city":"Brusje","city_nice_url":"brusje"},{"city":"Brussa","city_nice_url":"brussa"},{"city":"Brzac","city_nice_url":"brzac"},{"city":"Bu\u0161inci","city_nice_url":"businci"},{"city":"Bussana","city_nice_url":"bussana"},{"city":"Ca' Savio","city_nice_url":"ca-savio"},{"city":"Cadaqu\u00e9s","city_nice_url":"cadaques"},{"city":"Cagnes-sur-Mer","city_nice_url":"cagnes-sur-mer"},{"city":"Calambrone","city_nice_url":"calambrone"},{"city":"Calella","city_nice_url":"calella"},{"city":"Calonge","city_nice_url":"calonge"},{"city":"Camogli","city_nice_url":"camogli"},{"city":"Canet de Mar","city_nice_url":"canet-de-mar"},{"city":"Cannes","city_nice_url":"cannes"},{"city":"Caorle","city_nice_url":"caorle"},{"city":"Cap-d'Ail","city_nice_url":"cap-d-ail"},{"city":"\u010cara","city_nice_url":"cara"},{"city":"Carrara","city_nice_url":"carrara"},{"city":"Castell-Platja d'Aro","city_nice_url":"castell-platja-d-aro"},{"city":"Castelldefels","city_nice_url":"castelldefels"},{"city":"Cavalaire-sur-Mer","city_nice_url":"cavalaire-sur-mer"},{"city":"Cavallino","city_nice_url":"cavallino"},{"city":"Cavtat","city_nice_url":"cavtat"},{"city":"\u010celina","city_nice_url":"celina"},{"city":"Celle Ligure","city_nice_url":"celle-ligure"},{"city":"Ceriale","city_nice_url":"ceriale"},{"city":"\u010cervar","city_nice_url":"cervar"},{"city":"Cervo","city_nice_url":"cervo"},{"city":"Chiavari","city_nice_url":"chiavari"},{"city":"Chioggia","city_nice_url":"chioggia"},{"city":"\u010ci\u017ei\u0107i","city_nice_url":"cizici"},{"city":"Cogoleto","city_nice_url":"cogoleto"},{"city":"Cogolin","city_nice_url":"cogolin"},{"city":"Colera","city_nice_url":"colera"},{"city":"Cres","city_nice_url":"cres"},{"city":"Crikvenica","city_nice_url":"crikvenica"},{"city":"Crna Punta","city_nice_url":"crna-punta"},{"city":"Crveni Vrh","city_nice_url":"crveni-vrh"},{"city":"\u0106unski","city_nice_url":"cunski"},{"city":"Dajla","city_nice_url":"dajla"},{"city":"Deiva Marina","city_nice_url":"deiva-marina"},{"city":"Diano Marina","city_nice_url":"diano-marina"},{"city":"Diano Marina,","city_nice_url":"diano-marina"},{"city":"Dimini\u0107i","city_nice_url":"diminici"},{"city":"Dinji\u0161ka","city_nice_url":"dinjiska"},{"city":"Dobrava","city_nice_url":"dobrava"},{"city":"Dobropoljana","city_nice_url":"dobropoljana"},{"city":"Doli","city_nice_url":"doli"},{"city":"Donji Karin","city_nice_url":"donji-karin"},{"city":"Dra\u010de","city_nice_url":"drace"},{"city":"Drage","city_nice_url":"drage"},{"city":"Dramalj","city_nice_url":"dramalj"},{"city":"Dramalj,","city_nice_url":"dramalj"},{"city":"Dra\u0161nice","city_nice_url":"drasnice"},{"city":"Drvenik","city_nice_url":"drvenik"},{"city":"Duba","city_nice_url":"duba"},{"city":"Duba Pelje\u0161ka","city_nice_url":"duba-peljeska"},{"city":"Duba Stonska","city_nice_url":"duba-stonska"},{"city":"Duboka","city_nice_url":"duboka"},{"city":"Dubravica","city_nice_url":"dubravica"},{"city":"Dubrovnik","city_nice_url":"dubrovnik"},{"city":"Du\u0107e","city_nice_url":"duce"},{"city":"Duga Luka","city_nice_url":"duga-luka"},{"city":"Dugi Rat","city_nice_url":"dugi-rat"},{"city":"Duino","city_nice_url":"duino"},{"city":"Duna Verde","city_nice_url":"duna-verde"},{"city":"Dvornica","city_nice_url":"dvornica"},{"city":"El Masnou","city_nice_url":"el-masnou"},{"city":"El Port de la Selva","city_nice_url":"el-port-de-la-selva"},{"city":"El Prat de Llobregat","city_nice_url":"el-prat-de-llobregat"},{"city":"Empuriabrava","city_nice_url":"empuriabrava"},{"city":"Eraclea Mare","city_nice_url":"eraclea-mare"},{"city":"\u00c8ze","city_nice_url":"eze"},{"city":"Fa\u017eana","city_nice_url":"fazana"},{"city":"Fiascherino","city_nice_url":"fiascherino"},{"city":"Finale Ligure","city_nice_url":"finale-ligure"},{"city":"Fiumaretta di Ameglia","city_nice_url":"fiumaretta-di-ameglia"},{"city":"Forte dei Marmi","city_nice_url":"forte-dei-marmi"},{"city":"Fr\u00e9jus","city_nice_url":"frejus"},{"city":"Funtana","city_nice_url":"funtana"},{"city":"Gajac","city_nice_url":"gajac"},{"city":"Gassin","city_nice_url":"gassin"},{"city":"Gdinj","city_nice_url":"gdinj"},{"city":"Genova","city_nice_url":"genova"},{"city":"Gradac","city_nice_url":"gradac"},{"city":"Grado","city_nice_url":"grado"},{"city":"Grado Pineta","city_nice_url":"grado-pineta"},{"city":"Greba\u0161tica","city_nice_url":"grebastica"},{"city":"Grignano","city_nice_url":"grignano"},{"city":"Grimaldi","city_nice_url":"grimaldi"},{"city":"Grimaud","city_nice_url":"grimaud"},{"city":"Groman Dolac","city_nice_url":"groman-dolac"},{"city":"Humac","city_nice_url":"humac"},{"city":"Hvar","city_nice_url":"hvar"},{"city":"Igrane","city_nice_url":"igrane"},{"city":"Imperia","city_nice_url":"imperia"},{"city":"Ivan Dolac","city_nice_url":"ivan-dolac"},{"city":"Izola","city_nice_url":"izola"},{"city":"Jadranovo","city_nice_url":"jadranovo"},{"city":"Jadrija","city_nice_url":"jadrija"},{"city":"Jaki\u0161nica","city_nice_url":"jakisnica"},{"city":"Jelsa","city_nice_url":"jelsa"},{"city":"Jesenice","city_nice_url":"jesenice"},{"city":"Jezera","city_nice_url":"jezera"},{"city":"Kali","city_nice_url":"kali"},{"city":"Kampor","city_nice_url":"kampor"},{"city":"Karigador","city_nice_url":"karigador"},{"city":"Karin Gornji","city_nice_url":"karin-gornji"},{"city":"Karlobag","city_nice_url":"karlobag"},{"city":"Ka\u0161tel Kambelovac","city_nice_url":"kastel-kambelovac"},{"city":"Ka\u0161tel Luk\u0161i\u0107","city_nice_url":"kastel-luksic"},{"city":"Ka\u0161tel \u0160tafili\u0107","city_nice_url":"kastel-stafilic"},{"city":"Ka\u0161tel Stari","city_nice_url":"kastel-stari"},{"city":"Ka\u0161tel- \u0160tafili\u0107","city_nice_url":"kastel-stafilic"},{"city":"Ka\u0161tela","city_nice_url":"kastela"},{"city":"Katoro","city_nice_url":"katoro"},{"city":"Kavran","city_nice_url":"kavran"},{"city":"Klek","city_nice_url":"klek"},{"city":"Klenovica","city_nice_url":"klenovica"},{"city":"Klimno","city_nice_url":"klimno"},{"city":"Kolan","city_nice_url":"kolan"},{"city":"Komarna","city_nice_url":"komarna"},{"city":"Komi\u017ea","city_nice_url":"komiza"},{"city":"Koper","city_nice_url":"koper"},{"city":"Kor\u010dula","city_nice_url":"korcula"},{"city":"Korni\u0107","city_nice_url":"kornic"},{"city":"Koroma\u010dno","city_nice_url":"koromacno"},{"city":"Ko\u0161ljun","city_nice_url":"kosljun"},{"city":"Kostrena","city_nice_url":"kostrena"},{"city":"Ko\u017eino","city_nice_url":"kozino"},{"city":"Kozjak","city_nice_url":"kozjak"},{"city":"Kraj","city_nice_url":"kraj"},{"city":"Kraljevica","city_nice_url":"kraljevica"},{"city":"Kri\u017eine","city_nice_url":"krizine"},{"city":"Krk","city_nice_url":"krk"},{"city":"Kru\u010dica","city_nice_url":"krucica"},{"city":"Krvavica","city_nice_url":"krvavica"},{"city":"Ku\u0107i\u0161te","city_nice_url":"kuciste"},{"city":"Kukljica","city_nice_url":"kukljica"},{"city":"Kupari","city_nice_url":"kupari"},{"city":"L'Escala","city_nice_url":"l-escala"},{"city":"La Croix-Valmer","city_nice_url":"la-croix-valmer"},{"city":"Labin","city_nice_url":"labin"},{"city":"Laigueglia","city_nice_url":"laigueglia"},{"city":"Latte","city_nice_url":"latte"},{"city":"Lavagna","city_nice_url":"lavagna"},{"city":"Le Lavandou","city_nice_url":"le-lavandou"},{"city":"Lerici","city_nice_url":"lerici"},{"city":"Levanto","city_nice_url":"levanto"},{"city":"Lido","city_nice_url":"lido"},{"city":"Lido di Jesolo","city_nice_url":"lido-di-jesolo"},{"city":"Lignano Sabbiadoro","city_nice_url":"lignano-sabbiadoro"},{"city":"Liveli","city_nice_url":"liveli"},{"city":"Li\u017enjan","city_nice_url":"liznjan"},{"city":"Ljuba\u010d","city_nice_url":"ljubac"},{"city":"Llanca","city_nice_url":"llanca"},{"city":"Lloret de Mar","city_nice_url":"lloret-de-mar"},{"city":"Loano","city_nice_url":"loano"},{"city":"Lokva Rogoznica","city_nice_url":"lokva-rogoznica"},{"city":"Lopar","city_nice_url":"lopar"},{"city":"Lovi\u0161te","city_nice_url":"loviste"},{"city":"Lovran","city_nice_url":"lovran"},{"city":"Lovre\u010dica","city_nice_url":"lovrecica"},{"city":"Lozica","city_nice_url":"lozica"},{"city":"Lozice","city_nice_url":"lozice"},{"city":"Lucija","city_nice_url":"lucija"},{"city":"Lukoran","city_nice_url":"lukoran"},{"city":"Lukovo","city_nice_url":"lukovo"},{"city":"Lumbarda","city_nice_url":"lumbarda"},{"city":"Lun","city_nice_url":"lun"},{"city":"Makarska","city_nice_url":"makarska"},{"city":"Malgrat de Mar","city_nice_url":"malgrat-de-mar"},{"city":"Mali Lo\u0161inj","city_nice_url":"mali-losinj"},{"city":"Malinska","city_nice_url":"malinska"},{"city":"Mandelieu-la-Napoule","city_nice_url":"mandelieu-la-napoule"},{"city":"Mandre","city_nice_url":"mandre"},{"city":"Marina","city_nice_url":"marina"},{"city":"Marina di Andora","city_nice_url":"marina-di-andora"},{"city":"Marina di Pisa","city_nice_url":"marina-di-pisa"},{"city":"Marinje Zemlje","city_nice_url":"marinje-zemlje"},{"city":"Martin\u0161\u0107ica","city_nice_url":"martinscica"},{"city":"Maru\u0161i\u0107i","city_nice_url":"marusici"},{"city":"Massa","city_nice_url":"massa"},{"city":"Mastrinka","city_nice_url":"mastrinka"},{"city":"Matar\u00f3","city_nice_url":"mataro"},{"city":"Medi\u0107i","city_nice_url":"medici"},{"city":"Medulin","city_nice_url":"medulin"},{"city":"Medveja","city_nice_url":"medveja"},{"city":"Meka Draga","city_nice_url":"meka-draga"},{"city":"Menton","city_nice_url":"menton"},{"city":"Merag","city_nice_url":"merag"},{"city":"Metajna","city_nice_url":"metajna"},{"city":"Metohija","city_nice_url":"metohija"},{"city":"Mihola\u0161\u0107ica","city_nice_url":"miholascica"},{"city":"Milna","city_nice_url":"milna"},{"city":"Mimice","city_nice_url":"mimice"},{"city":"Mirca","city_nice_url":"mirca"},{"city":"Mlini","city_nice_url":"mlini"},{"city":"Moneglia","city_nice_url":"moneglia"},{"city":"Mont-ras","city_nice_url":"mont-ras"},{"city":"Monterosso al Mare","city_nice_url":"monterosso-al-mare"},{"city":"Montgat","city_nice_url":"montgat"},{"city":"Mo\u0161\u0107eni\u010dka Draga","city_nice_url":"moscenicka-draga"},{"city":"Mrljane","city_nice_url":"mrljane"},{"city":"Muline","city_nice_url":"muline"},{"city":"Murter","city_nice_url":"murter"},{"city":"Murvica","city_nice_url":"murvica"},{"city":"Ne\u010dujam","city_nice_url":"necujam"},{"city":"Nerezine","city_nice_url":"nerezine"},{"city":"Nevi\u0111ane","city_nice_url":"nevidane"},{"city":"Nice","city_nice_url":"nice"},{"city":"Nin","city_nice_url":"nin"},{"city":"Njivice","city_nice_url":"njivice"},{"city":"Noli","city_nice_url":"noli"},{"city":"Novalja","city_nice_url":"novalja"},{"city":"Novi Vinodolski","city_nice_url":"novi-vinodolski"},{"city":"Novigrad","city_nice_url":"novigrad"},{"city":"Okrug Donji","city_nice_url":"okrug-donji"},{"city":"Okrug Gornji","city_nice_url":"okrug-gornji"},{"city":"Omi\u0161","city_nice_url":"omis"},{"city":"Omi\u0161alj","city_nice_url":"omisalj"},{"city":"Opatija","city_nice_url":"opatija"},{"city":"Ora\u0161ac","city_nice_url":"orasac"},{"city":"Orebi\u0107","city_nice_url":"orebic"},{"city":"Oskoru\u0161no","city_nice_url":"oskorusno"},{"city":"Osor","city_nice_url":"osor"},{"city":"Ospedaletti","city_nice_url":"ospedaletti"},{"city":"Pag","city_nice_url":"pag"},{"city":"Pako\u0161tane","city_nice_url":"pakostane"},{"city":"Palafrugell","city_nice_url":"palafrugell"},{"city":"Palam\u00f3s","city_nice_url":"palamos"},{"city":"Paraggi","city_nice_url":"paraggi"},{"city":"Pa\u0161man","city_nice_url":"pasman"},{"city":"Pavi\u0107ini","city_nice_url":"pavicini"},{"city":"Pellestrina","city_nice_url":"pellestrina"},{"city":"Peroj","city_nice_url":"peroj"},{"city":"Peru\u0161ki","city_nice_url":"peruski"},{"city":"Petr\u010dane","city_nice_url":"petrcane"},{"city":"Pietra Ligure","city_nice_url":"pietra-ligure"},{"city":"Pineda de Mar","city_nice_url":"pineda-de-mar"},{"city":"Pinezi\u0107i","city_nice_url":"pinezici"},{"city":"Piran","city_nice_url":"piran"},{"city":"Pirovac","city_nice_url":"pirovac"},{"city":"Pisak","city_nice_url":"pisak"},{"city":"Pje\u0161\u010dana uvala","city_nice_url":"pjescana-uvala"},{"city":"Plat","city_nice_url":"plat"},{"city":"Pla\u017ea Lopar","city_nice_url":"plaza-lopar"},{"city":"Plo\u010de","city_nice_url":"ploce"},{"city":"Podaca","city_nice_url":"podaca"},{"city":"Podglavica","city_nice_url":"podglavica"},{"city":"Podgora","city_nice_url":"podgora"},{"city":"Podimo\u0107","city_nice_url":"podimoc"},{"city":"Podobu\u010de","city_nice_url":"podobuce"},{"city":"Podstrana","city_nice_url":"podstrana"},{"city":"Pokrivenik","city_nice_url":"pokrivenik"},{"city":"Poljana","city_nice_url":"poljana"},{"city":"Polje","city_nice_url":"polje"},{"city":"Poljica","city_nice_url":"poljica"},{"city":"Pomer","city_nice_url":"pomer"},{"city":"Popova Luka","city_nice_url":"popova-luka"},{"city":"Porat","city_nice_url":"porat"},{"city":"Pore\u010d","city_nice_url":"porec"},{"city":"Porozina","city_nice_url":"porozina"},{"city":"Portbou","city_nice_url":"portbou"},{"city":"Portoro\u017e","city_nice_url":"portoroz"},{"city":"Posedarje","city_nice_url":"posedarje"},{"city":"Postira","city_nice_url":"postira"},{"city":"Postup","city_nice_url":"postup"},{"city":"Potirna","city_nice_url":"potirna"},{"city":"Poto\u010dnica","city_nice_url":"potocnica"},{"city":"Potomje","city_nice_url":"potomje"},{"city":"Povlja","city_nice_url":"povlja"},{"city":"Povljana","city_nice_url":"povljana"},{"city":"Preko","city_nice_url":"preko"},{"city":"Premantura","city_nice_url":"premantura"},{"city":"Premi\u00e0 de Mar","city_nice_url":"premia-de-mar"},{"city":"Pridraga","city_nice_url":"pridraga"},{"city":"Prigradica","city_nice_url":"prigradica"},{"city":"Primo\u0161ten","city_nice_url":"primosten"},{"city":"Privlaka","city_nice_url":"privlaka"},{"city":"Pri\u017eba","city_nice_url":"prizba"},{"city":"Promajna","city_nice_url":"promajna"},{"city":"Pu\u010di\u0161\u0107a","city_nice_url":"pucisca"},{"city":"Pula","city_nice_url":"pula"},{"city":"Punat","city_nice_url":"punat"},{"city":"Punta Kri\u017ea","city_nice_url":"punta-kriza"},{"city":"Pupnat","city_nice_url":"pupnat"},{"city":"Rab","city_nice_url":"rab"},{"city":"Rabac","city_nice_url":"rabac"},{"city":"Ra\u010di\u0161\u0107e","city_nice_url":"racisce"},{"city":"Rakalj","city_nice_url":"rakalj"},{"city":"Ramatuelle","city_nice_url":"ramatuelle"},{"city":"Rapallo","city_nice_url":"rapallo"},{"city":"Rasti\u0107a","city_nice_url":"rastica"},{"city":"Ravni","city_nice_url":"ravni"},{"city":"Rayol-Canadel-sur-Mer","city_nice_url":"rayol-canadel-sur-mer"},{"city":"Ra\u017eanac","city_nice_url":"razanac"},{"city":"Ra\u017eanj","city_nice_url":"razanj"},{"city":"Recco","city_nice_url":"recco"},{"city":"Ribnica","city_nice_url":"ribnica"},{"city":"Rijeka","city_nice_url":"rijeka"},{"city":"Risika","city_nice_url":"risika"},{"city":"Riva Ligure","city_nice_url":"riva-ligure"},{"city":"Roga\u010d","city_nice_url":"rogac"},{"city":"Roga\u010di\u0107","city_nice_url":"rogacic"},{"city":"Rogoznica","city_nice_url":"rogoznica"},{"city":"Roquebrune-Cap-Martin","city_nice_url":"roquebrune-cap-martin"},{"city":"Roquebrune-sur-Argens","city_nice_url":"roquebrune-sur-argens"},{"city":"Roses","city_nice_url":"roses"},{"city":"Rovanjska","city_nice_url":"rovanjska"},{"city":"Rovinj","city_nice_url":"rovinj"},{"city":"Rtina","city_nice_url":"rtina"},{"city":"Rudina","city_nice_url":"rudina"},{"city":"Rukavac","city_nice_url":"rukavac"},{"city":"Saint-Jean-Cap-Ferrat","city_nice_url":"saint-jean-cap-ferrat"},{"city":"Saint-Laurent-du-Var","city_nice_url":"saint-laurent-du-var"},{"city":"Saint-Rapha\u00ebl","city_nice_url":"saint-raphael"},{"city":"Saint-Tropez","city_nice_url":"saint-tropez"},{"city":"Sainte-Maxime","city_nice_url":"sainte-maxime"},{"city":"San Bartolomeo Al Mare","city_nice_url":"san-bartolomeo-al-mare"},{"city":"San Giacomo","city_nice_url":"san-giacomo"},{"city":"San Lorenzo al Mare","city_nice_url":"san-lorenzo-al-mare"},{"city":"San Pietro in Volta","city_nice_url":"san-pietro-in-volta"},{"city":"Sanremo","city_nice_url":"sanremo"},{"city":"Sant Adri\u00e0 de Bes\u00f2s","city_nice_url":"sant-adria-de-besos"},{"city":"Sant Andreu de Llavaneres","city_nice_url":"sant-andreu-de-llavaneres"},{"city":"Sant Feliu de Gu\u00edxols","city_nice_url":"sant-feliu-de-guixols"},{"city":"Sant Pere Pescador","city_nice_url":"sant-pere-pescador"},{"city":"Sant Pol de Mar","city_nice_url":"sant-pol-de-mar"},{"city":"Sant Vicen\u00e7 de Montalt","city_nice_url":"sant-vicenc-de-montalt"},{"city":"Santa Cristina d'Aro","city_nice_url":"santa-cristina-d-aro"},{"city":"Santa Margherita Ligure","city_nice_url":"santa-margherita-ligure"},{"city":"Santo Stefano al Mare","city_nice_url":"santo-stefano-al-mare"},{"city":"Savona","city_nice_url":"savona"},{"city":"Savudrija","city_nice_url":"savudrija"},{"city":"Seget Donji","city_nice_url":"seget-donji"},{"city":"Seget Vranjica","city_nice_url":"seget-vranjica"},{"city":"Seget Vranjica,","city_nice_url":"seget-vranjica"},{"city":"\u0160egoti\u0107i","city_nice_url":"segotici"},{"city":"Selce","city_nice_url":"selce"},{"city":"Seline","city_nice_url":"seline"},{"city":"Senj","city_nice_url":"senj"},{"city":"Sestri Levante","city_nice_url":"sestri-levante"},{"city":"Sevid","city_nice_url":"sevid"},{"city":"\u0160ibenik","city_nice_url":"sibenik"},{"city":"\u0160ilo","city_nice_url":"silo"},{"city":"\u0160imuni","city_nice_url":"simuni"},{"city":"Sistiana","city_nice_url":"sistiana"},{"city":"Sitges","city_nice_url":"sitges"},{"city":"Slano","city_nice_url":"slano"},{"city":"Slatine","city_nice_url":"slatine"},{"city":"Smokvica","city_nice_url":"smokvica"},{"city":"Soline","city_nice_url":"soline"},{"city":"Sori","city_nice_url":"sori"},{"city":"Split","city_nice_url":"split"},{"city":"Splitska","city_nice_url":"splitska"},{"city":"Spotorno","city_nice_url":"spotorno"},{"city":"Srebreno","city_nice_url":"srebreno"},{"city":"Sreser","city_nice_url":"sreser"},{"city":"Srima","city_nice_url":"srima"},{"city":"Stani\u0107i","city_nice_url":"stanici"},{"city":"Stankovi\u0107","city_nice_url":"stankovic"},{"city":"Stara Ba\u0161ka","city_nice_url":"stara-baska"},{"city":"Stara Novalja","city_nice_url":"stara-novalja"},{"city":"Stari Grad","city_nice_url":"stari-grad"},{"city":"Starigrad Paklenica","city_nice_url":"starigrad-paklenica"},{"city":"Stivan","city_nice_url":"stivan"},{"city":"Stobre\u010d","city_nice_url":"stobrec"},{"city":"Stomorska","city_nice_url":"stomorska"},{"city":"Ston","city_nice_url":"ston"},{"city":"Strunjan","city_nice_url":"strunjan"},{"city":"Su\u0107uraj","city_nice_url":"sucuraj"},{"city":"Suko\u0161an","city_nice_url":"sukosan"},{"city":"Sumartin","city_nice_url":"sumartin"},{"city":"Supetar","city_nice_url":"supetar"},{"city":"Supetarska Draga","city_nice_url":"supetarska-draga"},{"city":"Su\u0161ica","city_nice_url":"susica"},{"city":"Sutivan","city_nice_url":"sutivan"},{"city":"Sutomi\u0161\u0107ica","city_nice_url":"sutomiscica"},{"city":"Sveta Marina","city_nice_url":"sveta-marina"},{"city":"Sveta Nedjelja","city_nice_url":"sveta-nedjelja"},{"city":"Sveti Filip i Jakov","city_nice_url":"sveti-filip-i-jakov"},{"city":"Sveti Jakov","city_nice_url":"sveti-jakov"},{"city":"Sveti Juraj","city_nice_url":"sveti-juraj"},{"city":"Sveti Petar na Moru","city_nice_url":"sveti-petar-na-moru"},{"city":"Th\u00e9oule-sur-Mer","city_nice_url":"theoule-sur-mer"},{"city":"Tirrenia","city_nice_url":"tirrenia"},{"city":"Tisno","city_nice_url":"tisno"},{"city":"Tkon","city_nice_url":"tkon"},{"city":"Torre del Lago","city_nice_url":"torre-del-lago"},{"city":"Torroella de Montgr\u00ed","city_nice_url":"torroella-de-montgri"},{"city":"Tossa de Mar","city_nice_url":"tossa-de-mar"},{"city":"Tribanj","city_nice_url":"tribanj"},{"city":"Tribunj","city_nice_url":"tribunj"},{"city":"Trieste","city_nice_url":"trieste"},{"city":"Trogir","city_nice_url":"trogir"},{"city":"Trpanj","city_nice_url":"trpanj"},{"city":"Trstenik","city_nice_url":"trstenik"},{"city":"Tu\u010depi","city_nice_url":"tucepi"},{"city":"Turanj","city_nice_url":"turanj"},{"city":"Tvrdni Dolac","city_nice_url":"tvrdni-dolac"},{"city":"Ugljan","city_nice_url":"ugljan"},{"city":"Umag","city_nice_url":"umag"},{"city":"Ustrine","city_nice_url":"ustrine"},{"city":"Vabriga","city_nice_url":"vabriga"},{"city":"Vado Ligure","city_nice_url":"vado-ligure"},{"city":"Valbandon","city_nice_url":"valbandon"},{"city":"Vallauris","city_nice_url":"vallauris"},{"city":"Valun","city_nice_url":"valun"},{"city":"Vanta\u010di\u0107i","city_nice_url":"vantacici"},{"city":"Varazze","city_nice_url":"varazze"},{"city":"Varigotti","city_nice_url":"varigotti"},{"city":"Vela Luka","city_nice_url":"vela-luka"},{"city":"Veli Lo\u0161inj","city_nice_url":"veli-losinj"},{"city":"Ventimiglia","city_nice_url":"ventimiglia"},{"city":"Viareggio","city_nice_url":"viareggio"},{"city":"Vidali\u0107i","city_nice_url":"vidalici"},{"city":"Viganj","city_nice_url":"viganj"},{"city":"Viladecans","city_nice_url":"viladecans"},{"city":"Vilassar de Mar","city_nice_url":"vilassar-de-mar"},{"city":"Villaggio Primero","city_nice_url":"villaggio-primero"},{"city":"Villefranche-sur-Mer","city_nice_url":"villefranche-sur-mer"},{"city":"Villeneuve-Loubet","city_nice_url":"villeneuve-loubet"},{"city":"Vini\u0161\u0107e","city_nice_url":"vinisce"},{"city":"Vinjerac","city_nice_url":"vinjerac"},{"city":"Vir","city_nice_url":"vir"},{"city":"Vis","city_nice_url":"vis"},{"city":"Vla\u0161i\u0107i","city_nice_url":"vlasici"},{"city":"Vodice","city_nice_url":"vodice"},{"city":"Vrbnik","city_nice_url":"vrbnik"},{"city":"Vrboska","city_nice_url":"vrboska"},{"city":"Vrsar","city_nice_url":"vrsar"},{"city":"Vrsi","city_nice_url":"vrsi"},{"city":"\u017dabori\u0107","city_nice_url":"zaboric"},{"city":"Zadar","city_nice_url":"zadar"},{"city":"Zambratija","city_nice_url":"zambratija"},{"city":"Zaostrog","city_nice_url":"zaostrog"},{"city":"Zara\u0107e","city_nice_url":"zarace"},{"city":"Zastra\u017ei\u0161\u0107e","city_nice_url":"zastrazisce"},{"city":"Zaton","city_nice_url":"zaton"},{"city":"Zavala","city_nice_url":"zavala"},{"city":"\u017ddrelac","city_nice_url":"zdrelac"},{"city":"\u017divogo\u0161\u0107e","city_nice_url":"zivogosce"},{"city":"Zoagli","city_nice_url":"zoagli"},{"city":"\u017drnovo","city_nice_url":"zrnovo"},{"city":"Zubovi\u0107i","city_nice_url":"zubovici"},{"city":"\u017duljana","city_nice_url":"zuljana"},{"city":"\u0110uba","city_nice_url":"\u0111uba"}]}},"user_type":{"status":true,"data":[{"user_type_id":"1","user_type_name":"l_adventurer"},{"user_type_id":"2","user_type_name":"l_family"},{"user_type_id":"3","user_type_name":"l_youth"}]},"beach":{"type":{"status":true,"data":[{"id":"1","name":"l_sand"},{"id":"4","name":"l_small_stones"},{"id":"5","name":"l_big_stones"},{"id":"6","name":"l_rock_beach"},{"id":"7","name":"l_grass_beach"},{"id":"8","name":"l_concrete"}]},"beach_area":{"status":true,"data":[{"id":"1","name":"l_urban"},{"id":"2","name":"l_part_urban"},{"id":"3","name":"l_natural"}]},"natural_features":{"status":true,"data":[{"id":"1","name":"l_white_sand_nl"},{"id":"2","name":"l_brown_sand_nl"},{"id":"3","name":"l_black_sand_nl"},{"id":"4","name":"l_small_stones_nl"},{"id":"5","name":"l_big_stones_nl"},{"id":"6","name":"l_rocks_nl"},{"id":"7","name":"l_grass_nl"},{"id":"8","name":"l_natural_shade_nl"},{"id":"9","name":"l_sunshade_nl"},{"id":"10","name":"l_concrete_nl"},{"id":"11","name":"l_swamp_nl"},{"id":"12","name":"l_holes_caves_nl"}]},"occupancy":{"status":true,"data":[{"id":"1","name":"l_small"},{"id":"2","name":"l_middle"},{"id":"3","name":"l_big"}]},"accessibility":{"status":true,"data":[{"id":"1","name":"l_easy"},{"id":"2","name":"l_medium"},{"id":"3","name":"l_difficult"}]},"payable":{"status":true,"data":[{"id":"1","name":"l_no"},{"id":"2","name":"l_yes"}]},"length":{"status":true,"data":[{"id":"1","name":"5m"},{"id":"2","name":"10m"},{"id":"3","name":"20m"},{"id":"4","name":"30m"},{"id":"5","name":"40m"},{"id":"6","name":"50m"},{"id":"7","name":"75m"},{"id":"8","name":"100m"},{"id":"9","name":"150m"},{"id":"10","name":"200m"},{"id":"11","name":"250m"},{"id":"12","name":"300m"},{"id":"13","name":"400m"},{"id":"14","name":"500m"},{"id":"15","name":"750m"},{"id":"16","name":"1000m"},{"id":"17","name":"l_more_km"}]},"width":{"status":true,"data":[{"id":"1","name":"3m"},{"id":"2","name":"5m"},{"id":"3","name":"10m"},{"id":"4","name":"15m"},{"id":"5","name":"20m"},{"id":"6","name":"25m"},{"id":"7","name":"30m"},{"id":"8","name":"40m"},{"id":"9","name":"50m"},{"id":"10","name":"75m"},{"id":"11","name":"100m"},{"id":"12","name":">100m"}]},"slope":{"status":true,"data":[{"id":"1","name":"l_small_slope"},{"id":"2","name":"l_normal"},{"id":"3","name":"l_increase"},{"id":"4","name":"l_sudden_drop"},{"id":"5","name":"l_different_mixed"}]},"point_of_swim":{"status":true,"data":[{"id":"1","name":"0m"},{"id":"2","name":"3m"},{"id":"3","name":"5m"},{"id":"4","name":"10m"},{"id":"5","name":"15m"},{"id":"6","name":"20m"},{"id":"7","name":"30m"},{"id":"8","name":"40m"},{"id":"9","name":"50m"},{"id":"10","name":"75m"},{"id":"11","name":"100m"},{"id":"12","name":">100m"},{"id":"13","name":"0m - 5m"},{"id":"14","name":"0m - 10m"},{"id":"15","name":"0m - 15m"},{"id":"16","name":"0m - 20m"},{"id":"17","name":"0m - 25m"},{"id":"18","name":"10m +"}]},"underwater_ground":{"status":true,"data":[{"id":"1","name":"l_sand_ground"},{"id":"2","name":"l_stones"},{"id":"3","name":"l_rocks"},{"id":"4","name":"l_grass"},{"id":"5","name":"l_coral"}]}},"infrastructure":{"status":true,"data":[{"id":"1","name":"l_wc"},{"id":"2","name":"l_shower"},{"id":"3","name":"l_accommodation"},{"id":"4","name":"l_restaurants"},{"id":"5","name":"l_dance_floor"},{"id":"6","name":"l_deckchairs"},{"id":"7","name":"l_sunshades"},{"id":"8","name":"l_swimming_pool"},{"id":"9","name":"l_waterslide"},{"id":"10","name":"l_children_playground"},{"id":"11","name":"l_sports_fields"},{"id":"12","name":"l_marina"},{"id":"13","name":"l_city_beach"},{"id":"14","name":"l_pier"},{"id":"15","name":"l_lifeguard"},{"id":"16","name":"l_parking"},{"id":"17","name":"l_access_for_disabled"},{"id":"18","name":"l_bench"},{"id":"19","name":"l_stairs_into_watter"},{"id":"20","name":"l_slope_for_boat"},{"id":"21","name":"l_trash_can"},{"id":"22","name":"l_voice_cell"},{"id":"23","name":"l_wifi_hotspot"},{"id":"24","name":"l_atm"},{"id":"25","name":"l_no_service"}]},"parking_and_path":{"path_to_the_parking":{"status":true,"data":[{"id":"1","name":"l_asphalt"},{"id":"2","name":"l_concrete_path"},{"id":"3","name":"l_dirt"},{"id":"4","name":"l_dirt_and_rocks"}]},"recommended_access":{"status":true,"data":[{"id":"1","name":"l_walk"},{"id":"2","name":"l_bike"},{"id":"3","name":"l_vehicle"},{"id":"4","name":"l_off_road_vehicle"},{"id":"5","name":"l_camper"},{"id":"6","name":"l_boat"}]}},"accommodation":{"status":true,"data":[{"id":"1","name":"l_no_service"},{"id":"2","name":"l_hotel"},{"id":"3","name":"l_hotel_complex"},{"id":"4","name":"l_apartments"},{"id":"5","name":"l_apartments_complex"},{"id":"6","name":"l_rooms"},{"id":"7","name":"l_motel"},{"id":"8","name":"l_hostel"},{"id":"9","name":"l_camp"},{"id":"10","name":"l_autocamping"},{"id":"11","name":"l_naturist_camp"}]},"food_coffe":{"status":true,"data":[{"id":"1","name":"l_no_service"},{"id":"2","name":"l_restaurant"},{"id":"3","name":"l_bistro"},{"id":"4","name":"l_fast_food"},{"id":"5","name":"l_pizzeria"},{"id":"6","name":"l_bakery"},{"id":"7","name":"l_caffe_bar"},{"id":"8","name":"l_biffe"},{"id":"9","name":"l_beach_bar"},{"id":"10","name":"l_cake_shop"},{"id":"11","name":"l_club_lounge_bar_dance_floor"},{"id":"12","name":"l_improvised_catering_supplies"}]},"sports":{"status":true,"data":[{"id":"1","name":"l_swimming"},{"id":"2","name":"l_snorkeling"},{"id":"3","name":"l_jumping_into_water"},{"id":"4","name":"l_diving"},{"id":"5","name":"l_fishing"},{"id":"6","name":"l_windsurfing"},{"id":"7","name":"l_kiteboarding"},{"id":"8","name":"l_surfing"},{"id":"9","name":"l_water_sports"},{"id":"10","name":"l_skilift_wakeboard"},{"id":"11","name":"l_different_sports"}]}};
		this.continents = this.response.location.continent.data;
		this.countries = this.response.location.country.data;

		this.data = [
			{
				fields: [
					{
						name: "Continent",
						required: true,
						_display_title: true,
						options: this.parse(this.response.location.continent.data),
						type: "select",
						value: null
					},
					{
						name: "Country",
						required: true,
						_display_title: true,
						options: this.parse(this.response.location.country.data),
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
								options: this.parse(this.response.beach.natural_features.data)
							},
							{
								name: "Underwater Bottom",
								required: true,
								_display_title: true,
								type: "checkboxes",
								options: this.parse(this.response.beach.underwater_ground.data)
							},
							{
							name: "Slope type",
							required: true,
							_display_title: true,
							options: this.parse(this.response.beach.slope.data),
							type: "select",
							value: null
						},
						{
							name: "Beach type",
							required: true,
							_display_title: true,
							options: this.parse(this.response.beach.type.data),
							type: "select",
							value: null
						},
						{
							name: "Beach occupation",
							required: true,
							_display_title: true,
							options: this.parse(this.response.beach.occupancy.data),
							type: "select",
							value: null
						},
						{
							name: "Beach length",
							required: true,
							_display_title: true,
							options: this.parse(this.response.beach.length.data),
							type: "select",
							value: null
						},
						{
							name: "Beach width",
							required: true,
							_display_title: true,
							options: this.parse(this.response.beach.width.data),
							type: "select",
							value: null
						},
						{
							name: "Free access",
							required: true,
							_display_title: true,
							options: [{name: "Yes", value: "true", selected: false}, {name: "No", value: "false", selected: false}],
							type: "radio",
							value: null
						},
						{
							name: "Seabed's depth increases to more than 1 meter at",
							required: true,
							_display_title: true,
							options: [{name: "Europa", code: "EU"}, {name: "Azija", code: "AZ"}],
							type: "select",
							value: null
						}
					],
					ready: false
					},
					{
						title: "Gastronomy",
						fields: [
							{
								name: "Gastronomy services",
								required: true,
								_display_title: true,
								type: "checkboxes",
								options: [
									{
										name: "No service",
										selected: false	
									},{
										name: "Restaurant",
										selected: false	
									},{
										name: "Bistro",
										selected: false	
									},{
										name: "Fast food",
										selected: false	
									},
									{
										name: "Pizeria",
										selected: false	
									},
									{
										name: "Bakery",
										selected: false	
									},
									{
										name: "Coffee bar",
										selected: false	
									},
									{
										name: "Club, lounge",
										selected: false	
									},
									{
										name: "Cake shop",
										selected: false	
									},
									{
										name: "Beach bar",
										selected: false	
									},
									{
										name: "Catering",
										selected: false	
									}
								]
							}
						]
					},
					{
						title: "Environment & accomodation",
						fields: [
							{
								name: "Type of environment",
								required: true,
								_display_title: true,
								type: "radio",
								options: [
									{
										name: "Urban",
										selected: false
									},
									{
										name: "Partially urban",
										selected: false	
									},
									{
										name: "Natural",
										selected: false	
									}
								]
							},
							{
								name: "Accomodation type",
								required: true,
								_display_title: true,
								type: "checkboxes",
								options: [
									{
										name: "No service",
										selected: false	
									},
									{
										name: "Hostel",
										selected: false	
									},
									{
										name: "Motel",
										selected: false	
									},
									{
										name: "Hotel Complex",
										selected: false	
									},
									{
										name: "Apart. Complex",
										selected: false	
									},
									{
										name: "Camp Site",
										selected: false	
									},
									{
										name: "Hotel",
										selected: false	
									},
									{
										name: "Apartment",
										selected: false	
									},
									{
										name: "Camp",
										selected: false	
									},
									{
										name: "Naturist Camp",
										selected: false	
									},
									{
										name: "Rooms",
										selected: false	
									}
								]
							}
						]
					}
				]
			},
			{
				ready: true
			}
		]

		this.gallery = {
			parking: {
				images: [],
				limit: 3,
				type: "image",
				label: "Parking Gallery"
			},
			video: {
				images: [{path: "assets/imgs/img1.png"}],
				limit: 7,
				type: "video",
				label: "Video Gallery"
			},
			beach: {
				images: [{path: "assets/imgs/img1.png"}, {path: "assets/imgs/img2.png"}, {path: "assets/imgs/img3.png"}],
				limit: 20,
				type: "image",
				label: "Beach Gallery"
			}
		};


	}


	parse(data) {
		data.forEach(function(item) {
			
			if(!item.name) {
				if(item.continent_name) {
					item.name = item.continent_name;
					item.code = item.continent_code;
				} else if(item.country_name) {
					item.name = item.country_name;
					item.code = item.country_code;
				}
			}
			if(item.name.substring(0,2) == 'l_') {
				item.name = item.name.substring(2);
			}
			item.name = item.name.replace(/_/g, ' ');
			if(item.name.slice(-3) == " nl") {
				item.name = item.name.slice(0, -3);
			}
		})
		return data;
	}


	// check if all required fields are entered
	validateStep(step) {
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
	selectRadio(item, block) {
		block.options.forEach(function(item) {
			item.selected = false;
		})
		item.selected = true;
		block.value = item.name;
	}
	selectTab(tab) {
		console.log(this.response)
		// user wants to go back
		if(this._active_tab > tab) {
			this._active_tab = tab;
			this.content.scrollToTop();
			return;
		}

		// check if all required fields are inserted
		var validate = this.validateStep(this.data[this._active_tab - 1]);

		// all fields are clear, proceed
		if(validate == true) {
			this._active_tab = tab;
			this.content.scrollToTop();
		}
		else {
			let alert = this.alertCtrl.create({
		      title: 'Missing fields',
		      subTitle: validate + ' field is required.',
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
		if(this._active_type > type) {
			this._active_type = type;
			this.content.scrollToTop();
			return;
		}

		var validate = this.validateStep(this.data[2].tabs[this._active_type - 1]);

		if(validate == true) {
			if(type > this.data[2].tabs.length) this._active_tab = 4;
			else this._active_type = type;
			
			this.content.scrollToTop();
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

	takePicture(item){
		if(item.images.length < item.limit) {
			this.options = {
        quality: 100,
			  destinationType: this.camera.DestinationType.DATA_URL,
			  encodingType: this.camera.EncodingType.JPEG,
			  mediaType: this.camera.MediaType.PICTURE
      }

      this.camera.getPicture(this.options)
        .then((imageData)=>{
            item.images.push({path: 'data:image/jpeg;base64,' + imageData});
        }).then((path) => {
        	console.log(path);
        })
		} else {
      let alert = this.alertCtrl.create({
	      title: 'Max number of items',
	      subTitle: 'Well...shi*t happens:)',
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
	
}


/*
{"location":{"continent":{"status":true,"data":[{"continent_code":"EU","continent_name":"Europe"}]},"country":{"status":true,"data":[{"country_code":"ES","country_code_nice_url":"spain","country_name":"Spain"},{"country_code":"FR","country_code_nice_url":"france","country_name":"France"},{"country_code":"HR","country_code_nice_url":"croatia","country_name":"Croatia"},{"country_code":"IT","country_code_nice_url":"italy","country_name":"Italy"},{"country_code":"SI","country_code_nice_url":"slovenia","country_name":"Slovenia"}]},"region":{"status":true,"data":[{"region":"Dalmatia - Dubrovnik","region_full_name_nice_url":"dalmatia-dubrovnik"},{"region":"Dalmatia - \u0160ibenik","region_full_name_nice_url":"dalmatia-sibenik"},{"region":"Dalmatia - Split","region_full_name_nice_url":"dalmatia-split"},{"region":"Dalmatia - Zadar","region_full_name_nice_url":"dalmatia-zadar"},{"region":"Istra","region_full_name_nice_url":"istra"},{"region":"Kvarner","region_full_name_nice_url":"kvarner"},{"region":"Lika","region_full_name_nice_url":"lika"},{"region":"Alpes-Maritimes","region_full_name_nice_url":"alpes-maritimes"},{"region":"Var","region_full_name_nice_url":"var"},{"region":"Friuli-Venezia Giulia","region_full_name_nice_url":"friuli-venezia-giulia"},{"region":"Liguria","region_full_name_nice_url":"liguria"},{"region":"Toscana","region_full_name_nice_url":"toscana"},{"region":"Veneto","region_full_name_nice_url":"veneto"},{"region":"Obalno kra\u0161ka","region_full_name_nice_url":"obalno-kraska"},{"region":"\u00c0mbit metropolit\u00e0","region_full_name_nice_url":"ambit-metropolita"},{"region":"Comarques gironines","region_full_name_nice_url":"comarques-gironines"}]},"island":{"status":true,"data":[{"island_name":"Island Bra\u010d","island_name_nice_url":"island-brac"},{"island_name":"Island \u010ciovo","island_name_nice_url":"island-ciovo"},{"island_name":"Island Cres","island_name_nice_url":"island-cres"},{"island_name":"Island Hvar","island_name_nice_url":"island-hvar"},{"island_name":"Island Kor\u010dula","island_name_nice_url":"island-korcula"},{"island_name":"Island Krk","island_name_nice_url":"island-krk"},{"island_name":"island Lido","island_name_nice_url":"island-lido"},{"island_name":"Island Lo\u0161inj","island_name_nice_url":"island-losinj"},{"island_name":"Island Murter","island_name_nice_url":"island-murter"},{"island_name":"Island Pag","island_name_nice_url":"island-pag"},{"island_name":"Island Pa\u0161man","island_name_nice_url":"island-pasman"},{"island_name":"island Pellestrina","island_name_nice_url":"island-pellestrina"},{"island_name":"Island Rab","island_name_nice_url":"island-rab"},{"island_name":"Island \u0160olta","island_name_nice_url":"island-solta"},{"island_name":"Island Ugljan","island_name_nice_url":"island-ugljan"},{"island_name":"Island Vir","island_name_nice_url":"island-vir"},{"island_name":"Island Vis","island_name_nice_url":"island-vis"}]},"city":{"status":true,"data":[{"city":"Alassio","city_nice_url":"alassio"},{"city":"Albenga","city_nice_url":"albenga"},{"city":"Alberoni","city_nice_url":"alberoni"},{"city":"Albisola Marina","city_nice_url":"albisola-marina"},{"city":"Ankaran","city_nice_url":"ankaran"},{"city":"Antibes","city_nice_url":"antibes"},{"city":"Arbanija","city_nice_url":"arbanija"},{"city":"Aregai","city_nice_url":"aregai"},{"city":"Arenys de Mar","city_nice_url":"arenys-de-mar"},{"city":"Arenzano","city_nice_url":"arenzano"},{"city":"Arma di Taggia","city_nice_url":"arma-di-taggia"},{"city":"Arrenzano","city_nice_url":"arrenzano"},{"city":"Aurisina","city_nice_url":"aurisina"},{"city":"Badalona","city_nice_url":"badalona"},{"city":"Bale","city_nice_url":"bale"},{"city":"Bani\u0107i","city_nice_url":"banici"},{"city":"Banj","city_nice_url":"banj"},{"city":"Banjol","city_nice_url":"banjol"},{"city":"Banjole","city_nice_url":"banjole"},{"city":"Barbariga","city_nice_url":"barbariga"},{"city":"Barbat na Rabu","city_nice_url":"barbat-na-rabu"},{"city":"Barcelona","city_nice_url":"barcelona"},{"city":"Ba\u0161anija","city_nice_url":"basanija"},{"city":"Ba\u0161ka","city_nice_url":"baska"},{"city":"Ba\u0161ka Voda","city_nice_url":"baska-voda"},{"city":"Beaulieu-sur-Mer","city_nice_url":"beaulieu-sur-mer"},{"city":"Begur","city_nice_url":"begur"},{"city":"Belej","city_nice_url":"belej"},{"city":"Beli","city_nice_url":"beli"},{"city":"Bergeggi","city_nice_url":"bergeggi"},{"city":"Bergur","city_nice_url":"bergur"},{"city":"Betina","city_nice_url":"betina"},{"city":"Bibinje","city_nice_url":"bibinje"},{"city":"Bibione","city_nice_url":"bibione"},{"city":"Biograd na Moru","city_nice_url":"biograd-na-moru"},{"city":"Blanes","city_nice_url":"blanes"},{"city":"Blato","city_nice_url":"blato"},{"city":"Bobovi\u0161\u0107a","city_nice_url":"bobovisca"},{"city":"Bogomolje","city_nice_url":"bogomolje"},{"city":"Bol","city_nice_url":"bol"},{"city":"Bonassola","city_nice_url":"bonassola"},{"city":"Bordighera","city_nice_url":"bordighera"},{"city":"Borghetto Santo Spirito","city_nice_url":"borghetto-santo-spirito"},{"city":"Borgio","city_nice_url":"borgio"},{"city":"Bormes-les-Mimosas","city_nice_url":"bormes-les-mimosas"},{"city":"Borovici","city_nice_url":"borovici"},{"city":"Brela","city_nice_url":"brela"},{"city":"Brijesta","city_nice_url":"brijesta"},{"city":"Brist","city_nice_url":"brist"},{"city":"Brna","city_nice_url":"brna"},{"city":"Brodarica","city_nice_url":"brodarica"},{"city":"Brse\u010dine","city_nice_url":"brsecine"},{"city":"Brusje","city_nice_url":"brusje"},{"city":"Brussa","city_nice_url":"brussa"},{"city":"Brzac","city_nice_url":"brzac"},{"city":"Bu\u0161inci","city_nice_url":"businci"},{"city":"Bussana","city_nice_url":"bussana"},{"city":"Ca' Savio","city_nice_url":"ca-savio"},{"city":"Cadaqu\u00e9s","city_nice_url":"cadaques"},{"city":"Cagnes-sur-Mer","city_nice_url":"cagnes-sur-mer"},{"city":"Calambrone","city_nice_url":"calambrone"},{"city":"Calella","city_nice_url":"calella"},{"city":"Calonge","city_nice_url":"calonge"},{"city":"Camogli","city_nice_url":"camogli"},{"city":"Canet de Mar","city_nice_url":"canet-de-mar"},{"city":"Cannes","city_nice_url":"cannes"},{"city":"Caorle","city_nice_url":"caorle"},{"city":"Cap-d'Ail","city_nice_url":"cap-d-ail"},{"city":"\u010cara","city_nice_url":"cara"},{"city":"Carrara","city_nice_url":"carrara"},{"city":"Castell-Platja d'Aro","city_nice_url":"castell-platja-d-aro"},{"city":"Castelldefels","city_nice_url":"castelldefels"},{"city":"Cavalaire-sur-Mer","city_nice_url":"cavalaire-sur-mer"},{"city":"Cavallino","city_nice_url":"cavallino"},{"city":"Cavtat","city_nice_url":"cavtat"},{"city":"\u010celina","city_nice_url":"celina"},{"city":"Celle Ligure","city_nice_url":"celle-ligure"},{"city":"Ceriale","city_nice_url":"ceriale"},{"city":"\u010cervar","city_nice_url":"cervar"},{"city":"Cervo","city_nice_url":"cervo"},{"city":"Chiavari","city_nice_url":"chiavari"},{"city":"Chioggia","city_nice_url":"chioggia"},{"city":"\u010ci\u017ei\u0107i","city_nice_url":"cizici"},{"city":"Cogoleto","city_nice_url":"cogoleto"},{"city":"Cogolin","city_nice_url":"cogolin"},{"city":"Colera","city_nice_url":"colera"},{"city":"Cres","city_nice_url":"cres"},{"city":"Crikvenica","city_nice_url":"crikvenica"},{"city":"Crna Punta","city_nice_url":"crna-punta"},{"city":"Crveni Vrh","city_nice_url":"crveni-vrh"},{"city":"\u0106unski","city_nice_url":"cunski"},{"city":"Dajla","city_nice_url":"dajla"},{"city":"Deiva Marina","city_nice_url":"deiva-marina"},{"city":"Diano Marina","city_nice_url":"diano-marina"},{"city":"Diano Marina,","city_nice_url":"diano-marina"},{"city":"Dimini\u0107i","city_nice_url":"diminici"},{"city":"Dinji\u0161ka","city_nice_url":"dinjiska"},{"city":"Dobrava","city_nice_url":"dobrava"},{"city":"Dobropoljana","city_nice_url":"dobropoljana"},{"city":"Doli","city_nice_url":"doli"},{"city":"Donji Karin","city_nice_url":"donji-karin"},{"city":"Dra\u010de","city_nice_url":"drace"},{"city":"Drage","city_nice_url":"drage"},{"city":"Dramalj","city_nice_url":"dramalj"},{"city":"Dramalj,","city_nice_url":"dramalj"},{"city":"Dra\u0161nice","city_nice_url":"drasnice"},{"city":"Drvenik","city_nice_url":"drvenik"},{"city":"Duba","city_nice_url":"duba"},{"city":"Duba Pelje\u0161ka","city_nice_url":"duba-peljeska"},{"city":"Duba Stonska","city_nice_url":"duba-stonska"},{"city":"Duboka","city_nice_url":"duboka"},{"city":"Dubravica","city_nice_url":"dubravica"},{"city":"Dubrovnik","city_nice_url":"dubrovnik"},{"city":"Du\u0107e","city_nice_url":"duce"},{"city":"Duga Luka","city_nice_url":"duga-luka"},{"city":"Dugi Rat","city_nice_url":"dugi-rat"},{"city":"Duino","city_nice_url":"duino"},{"city":"Duna Verde","city_nice_url":"duna-verde"},{"city":"Dvornica","city_nice_url":"dvornica"},{"city":"El Masnou","city_nice_url":"el-masnou"},{"city":"El Port de la Selva","city_nice_url":"el-port-de-la-selva"},{"city":"El Prat de Llobregat","city_nice_url":"el-prat-de-llobregat"},{"city":"Empuriabrava","city_nice_url":"empuriabrava"},{"city":"Eraclea Mare","city_nice_url":"eraclea-mare"},{"city":"\u00c8ze","city_nice_url":"eze"},{"city":"Fa\u017eana","city_nice_url":"fazana"},{"city":"Fiascherino","city_nice_url":"fiascherino"},{"city":"Finale Ligure","city_nice_url":"finale-ligure"},{"city":"Fiumaretta di Ameglia","city_nice_url":"fiumaretta-di-ameglia"},{"city":"Forte dei Marmi","city_nice_url":"forte-dei-marmi"},{"city":"Fr\u00e9jus","city_nice_url":"frejus"},{"city":"Funtana","city_nice_url":"funtana"},{"city":"Gajac","city_nice_url":"gajac"},{"city":"Gassin","city_nice_url":"gassin"},{"city":"Gdinj","city_nice_url":"gdinj"},{"city":"Genova","city_nice_url":"genova"},{"city":"Gradac","city_nice_url":"gradac"},{"city":"Grado","city_nice_url":"grado"},{"city":"Grado Pineta","city_nice_url":"grado-pineta"},{"city":"Greba\u0161tica","city_nice_url":"grebastica"},{"city":"Grignano","city_nice_url":"grignano"},{"city":"Grimaldi","city_nice_url":"grimaldi"},{"city":"Grimaud","city_nice_url":"grimaud"},{"city":"Groman Dolac","city_nice_url":"groman-dolac"},{"city":"Humac","city_nice_url":"humac"},{"city":"Hvar","city_nice_url":"hvar"},{"city":"Igrane","city_nice_url":"igrane"},{"city":"Imperia","city_nice_url":"imperia"},{"city":"Ivan Dolac","city_nice_url":"ivan-dolac"},{"city":"Izola","city_nice_url":"izola"},{"city":"Jadranovo","city_nice_url":"jadranovo"},{"city":"Jadrija","city_nice_url":"jadrija"},{"city":"Jaki\u0161nica","city_nice_url":"jakisnica"},{"city":"Jelsa","city_nice_url":"jelsa"},{"city":"Jesenice","city_nice_url":"jesenice"},{"city":"Jezera","city_nice_url":"jezera"},{"city":"Kali","city_nice_url":"kali"},{"city":"Kampor","city_nice_url":"kampor"},{"city":"Karigador","city_nice_url":"karigador"},{"city":"Karin Gornji","city_nice_url":"karin-gornji"},{"city":"Karlobag","city_nice_url":"karlobag"},{"city":"Ka\u0161tel Kambelovac","city_nice_url":"kastel-kambelovac"},{"city":"Ka\u0161tel Luk\u0161i\u0107","city_nice_url":"kastel-luksic"},{"city":"Ka\u0161tel \u0160tafili\u0107","city_nice_url":"kastel-stafilic"},{"city":"Ka\u0161tel Stari","city_nice_url":"kastel-stari"},{"city":"Ka\u0161tel- \u0160tafili\u0107","city_nice_url":"kastel-stafilic"},{"city":"Ka\u0161tela","city_nice_url":"kastela"},{"city":"Katoro","city_nice_url":"katoro"},{"city":"Kavran","city_nice_url":"kavran"},{"city":"Klek","city_nice_url":"klek"},{"city":"Klenovica","city_nice_url":"klenovica"},{"city":"Klimno","city_nice_url":"klimno"},{"city":"Kolan","city_nice_url":"kolan"},{"city":"Komarna","city_nice_url":"komarna"},{"city":"Komi\u017ea","city_nice_url":"komiza"},{"city":"Koper","city_nice_url":"koper"},{"city":"Kor\u010dula","city_nice_url":"korcula"},{"city":"Korni\u0107","city_nice_url":"kornic"},{"city":"Koroma\u010dno","city_nice_url":"koromacno"},{"city":"Ko\u0161ljun","city_nice_url":"kosljun"},{"city":"Kostrena","city_nice_url":"kostrena"},{"city":"Ko\u017eino","city_nice_url":"kozino"},{"city":"Kozjak","city_nice_url":"kozjak"},{"city":"Kraj","city_nice_url":"kraj"},{"city":"Kraljevica","city_nice_url":"kraljevica"},{"city":"Kri\u017eine","city_nice_url":"krizine"},{"city":"Krk","city_nice_url":"krk"},{"city":"Kru\u010dica","city_nice_url":"krucica"},{"city":"Krvavica","city_nice_url":"krvavica"},{"city":"Ku\u0107i\u0161te","city_nice_url":"kuciste"},{"city":"Kukljica","city_nice_url":"kukljica"},{"city":"Kupari","city_nice_url":"kupari"},{"city":"L'Escala","city_nice_url":"l-escala"},{"city":"La Croix-Valmer","city_nice_url":"la-croix-valmer"},{"city":"Labin","city_nice_url":"labin"},{"city":"Laigueglia","city_nice_url":"laigueglia"},{"city":"Latte","city_nice_url":"latte"},{"city":"Lavagna","city_nice_url":"lavagna"},{"city":"Le Lavandou","city_nice_url":"le-lavandou"},{"city":"Lerici","city_nice_url":"lerici"},{"city":"Levanto","city_nice_url":"levanto"},{"city":"Lido","city_nice_url":"lido"},{"city":"Lido di Jesolo","city_nice_url":"lido-di-jesolo"},{"city":"Lignano Sabbiadoro","city_nice_url":"lignano-sabbiadoro"},{"city":"Liveli","city_nice_url":"liveli"},{"city":"Li\u017enjan","city_nice_url":"liznjan"},{"city":"Ljuba\u010d","city_nice_url":"ljubac"},{"city":"Llanca","city_nice_url":"llanca"},{"city":"Lloret de Mar","city_nice_url":"lloret-de-mar"},{"city":"Loano","city_nice_url":"loano"},{"city":"Lokva Rogoznica","city_nice_url":"lokva-rogoznica"},{"city":"Lopar","city_nice_url":"lopar"},{"city":"Lovi\u0161te","city_nice_url":"loviste"},{"city":"Lovran","city_nice_url":"lovran"},{"city":"Lovre\u010dica","city_nice_url":"lovrecica"},{"city":"Lozica","city_nice_url":"lozica"},{"city":"Lozice","city_nice_url":"lozice"},{"city":"Lucija","city_nice_url":"lucija"},{"city":"Lukoran","city_nice_url":"lukoran"},{"city":"Lukovo","city_nice_url":"lukovo"},{"city":"Lumbarda","city_nice_url":"lumbarda"},{"city":"Lun","city_nice_url":"lun"},{"city":"Makarska","city_nice_url":"makarska"},{"city":"Malgrat de Mar","city_nice_url":"malgrat-de-mar"},{"city":"Mali Lo\u0161inj","city_nice_url":"mali-losinj"},{"city":"Malinska","city_nice_url":"malinska"},{"city":"Mandelieu-la-Napoule","city_nice_url":"mandelieu-la-napoule"},{"city":"Mandre","city_nice_url":"mandre"},{"city":"Marina","city_nice_url":"marina"},{"city":"Marina di Andora","city_nice_url":"marina-di-andora"},{"city":"Marina di Pisa","city_nice_url":"marina-di-pisa"},{"city":"Marinje Zemlje","city_nice_url":"marinje-zemlje"},{"city":"Martin\u0161\u0107ica","city_nice_url":"martinscica"},{"city":"Maru\u0161i\u0107i","city_nice_url":"marusici"},{"city":"Massa","city_nice_url":"massa"},{"city":"Mastrinka","city_nice_url":"mastrinka"},{"city":"Matar\u00f3","city_nice_url":"mataro"},{"city":"Medi\u0107i","city_nice_url":"medici"},{"city":"Medulin","city_nice_url":"medulin"},{"city":"Medveja","city_nice_url":"medveja"},{"city":"Meka Draga","city_nice_url":"meka-draga"},{"city":"Menton","city_nice_url":"menton"},{"city":"Merag","city_nice_url":"merag"},{"city":"Metajna","city_nice_url":"metajna"},{"city":"Metohija","city_nice_url":"metohija"},{"city":"Mihola\u0161\u0107ica","city_nice_url":"miholascica"},{"city":"Milna","city_nice_url":"milna"},{"city":"Mimice","city_nice_url":"mimice"},{"city":"Mirca","city_nice_url":"mirca"},{"city":"Mlini","city_nice_url":"mlini"},{"city":"Moneglia","city_nice_url":"moneglia"},{"city":"Mont-ras","city_nice_url":"mont-ras"},{"city":"Monterosso al Mare","city_nice_url":"monterosso-al-mare"},{"city":"Montgat","city_nice_url":"montgat"},{"city":"Mo\u0161\u0107eni\u010dka Draga","city_nice_url":"moscenicka-draga"},{"city":"Mrljane","city_nice_url":"mrljane"},{"city":"Muline","city_nice_url":"muline"},{"city":"Murter","city_nice_url":"murter"},{"city":"Murvica","city_nice_url":"murvica"},{"city":"Ne\u010dujam","city_nice_url":"necujam"},{"city":"Nerezine","city_nice_url":"nerezine"},{"city":"Nevi\u0111ane","city_nice_url":"nevidane"},{"city":"Nice","city_nice_url":"nice"},{"city":"Nin","city_nice_url":"nin"},{"city":"Njivice","city_nice_url":"njivice"},{"city":"Noli","city_nice_url":"noli"},{"city":"Novalja","city_nice_url":"novalja"},{"city":"Novi Vinodolski","city_nice_url":"novi-vinodolski"},{"city":"Novigrad","city_nice_url":"novigrad"},{"city":"Okrug Donji","city_nice_url":"okrug-donji"},{"city":"Okrug Gornji","city_nice_url":"okrug-gornji"},{"city":"Omi\u0161","city_nice_url":"omis"},{"city":"Omi\u0161alj","city_nice_url":"omisalj"},{"city":"Opatija","city_nice_url":"opatija"},{"city":"Ora\u0161ac","city_nice_url":"orasac"},{"city":"Orebi\u0107","city_nice_url":"orebic"},{"city":"Oskoru\u0161no","city_nice_url":"oskorusno"},{"city":"Osor","city_nice_url":"osor"},{"city":"Ospedaletti","city_nice_url":"ospedaletti"},{"city":"Pag","city_nice_url":"pag"},{"city":"Pako\u0161tane","city_nice_url":"pakostane"},{"city":"Palafrugell","city_nice_url":"palafrugell"},{"city":"Palam\u00f3s","city_nice_url":"palamos"},{"city":"Paraggi","city_nice_url":"paraggi"},{"city":"Pa\u0161man","city_nice_url":"pasman"},{"city":"Pavi\u0107ini","city_nice_url":"pavicini"},{"city":"Pellestrina","city_nice_url":"pellestrina"},{"city":"Peroj","city_nice_url":"peroj"},{"city":"Peru\u0161ki","city_nice_url":"peruski"},{"city":"Petr\u010dane","city_nice_url":"petrcane"},{"city":"Pietra Ligure","city_nice_url":"pietra-ligure"},{"city":"Pineda de Mar","city_nice_url":"pineda-de-mar"},{"city":"Pinezi\u0107i","city_nice_url":"pinezici"},{"city":"Piran","city_nice_url":"piran"},{"city":"Pirovac","city_nice_url":"pirovac"},{"city":"Pisak","city_nice_url":"pisak"},{"city":"Pje\u0161\u010dana uvala","city_nice_url":"pjescana-uvala"},{"city":"Plat","city_nice_url":"plat"},{"city":"Pla\u017ea Lopar","city_nice_url":"plaza-lopar"},{"city":"Plo\u010de","city_nice_url":"ploce"},{"city":"Podaca","city_nice_url":"podaca"},{"city":"Podglavica","city_nice_url":"podglavica"},{"city":"Podgora","city_nice_url":"podgora"},{"city":"Podimo\u0107","city_nice_url":"podimoc"},{"city":"Podobu\u010de","city_nice_url":"podobuce"},{"city":"Podstrana","city_nice_url":"podstrana"},{"city":"Pokrivenik","city_nice_url":"pokrivenik"},{"city":"Poljana","city_nice_url":"poljana"},{"city":"Polje","city_nice_url":"polje"},{"city":"Poljica","city_nice_url":"poljica"},{"city":"Pomer","city_nice_url":"pomer"},{"city":"Popova Luka","city_nice_url":"popova-luka"},{"city":"Porat","city_nice_url":"porat"},{"city":"Pore\u010d","city_nice_url":"porec"},{"city":"Porozina","city_nice_url":"porozina"},{"city":"Portbou","city_nice_url":"portbou"},{"city":"Portoro\u017e","city_nice_url":"portoroz"},{"city":"Posedarje","city_nice_url":"posedarje"},{"city":"Postira","city_nice_url":"postira"},{"city":"Postup","city_nice_url":"postup"},{"city":"Potirna","city_nice_url":"potirna"},{"city":"Poto\u010dnica","city_nice_url":"potocnica"},{"city":"Potomje","city_nice_url":"potomje"},{"city":"Povlja","city_nice_url":"povlja"},{"city":"Povljana","city_nice_url":"povljana"},{"city":"Preko","city_nice_url":"preko"},{"city":"Premantura","city_nice_url":"premantura"},{"city":"Premi\u00e0 de Mar","city_nice_url":"premia-de-mar"},{"city":"Pridraga","city_nice_url":"pridraga"},{"city":"Prigradica","city_nice_url":"prigradica"},{"city":"Primo\u0161ten","city_nice_url":"primosten"},{"city":"Privlaka","city_nice_url":"privlaka"},{"city":"Pri\u017eba","city_nice_url":"prizba"},{"city":"Promajna","city_nice_url":"promajna"},{"city":"Pu\u010di\u0161\u0107a","city_nice_url":"pucisca"},{"city":"Pula","city_nice_url":"pula"},{"city":"Punat","city_nice_url":"punat"},{"city":"Punta Kri\u017ea","city_nice_url":"punta-kriza"},{"city":"Pupnat","city_nice_url":"pupnat"},{"city":"Rab","city_nice_url":"rab"},{"city":"Rabac","city_nice_url":"rabac"},{"city":"Ra\u010di\u0161\u0107e","city_nice_url":"racisce"},{"city":"Rakalj","city_nice_url":"rakalj"},{"city":"Ramatuelle","city_nice_url":"ramatuelle"},{"city":"Rapallo","city_nice_url":"rapallo"},{"city":"Rasti\u0107a","city_nice_url":"rastica"},{"city":"Ravni","city_nice_url":"ravni"},{"city":"Rayol-Canadel-sur-Mer","city_nice_url":"rayol-canadel-sur-mer"},{"city":"Ra\u017eanac","city_nice_url":"razanac"},{"city":"Ra\u017eanj","city_nice_url":"razanj"},{"city":"Recco","city_nice_url":"recco"},{"city":"Ribnica","city_nice_url":"ribnica"},{"city":"Rijeka","city_nice_url":"rijeka"},{"city":"Risika","city_nice_url":"risika"},{"city":"Riva Ligure","city_nice_url":"riva-ligure"},{"city":"Roga\u010d","city_nice_url":"rogac"},{"city":"Roga\u010di\u0107","city_nice_url":"rogacic"},{"city":"Rogoznica","city_nice_url":"rogoznica"},{"city":"Roquebrune-Cap-Martin","city_nice_url":"roquebrune-cap-martin"},{"city":"Roquebrune-sur-Argens","city_nice_url":"roquebrune-sur-argens"},{"city":"Roses","city_nice_url":"roses"},{"city":"Rovanjska","city_nice_url":"rovanjska"},{"city":"Rovinj","city_nice_url":"rovinj"},{"city":"Rtina","city_nice_url":"rtina"},{"city":"Rudina","city_nice_url":"rudina"},{"city":"Rukavac","city_nice_url":"rukavac"},{"city":"Saint-Jean-Cap-Ferrat","city_nice_url":"saint-jean-cap-ferrat"},{"city":"Saint-Laurent-du-Var","city_nice_url":"saint-laurent-du-var"},{"city":"Saint-Rapha\u00ebl","city_nice_url":"saint-raphael"},{"city":"Saint-Tropez","city_nice_url":"saint-tropez"},{"city":"Sainte-Maxime","city_nice_url":"sainte-maxime"},{"city":"San Bartolomeo Al Mare","city_nice_url":"san-bartolomeo-al-mare"},{"city":"San Giacomo","city_nice_url":"san-giacomo"},{"city":"San Lorenzo al Mare","city_nice_url":"san-lorenzo-al-mare"},{"city":"San Pietro in Volta","city_nice_url":"san-pietro-in-volta"},{"city":"Sanremo","city_nice_url":"sanremo"},{"city":"Sant Adri\u00e0 de Bes\u00f2s","city_nice_url":"sant-adria-de-besos"},{"city":"Sant Andreu de Llavaneres","city_nice_url":"sant-andreu-de-llavaneres"},{"city":"Sant Feliu de Gu\u00edxols","city_nice_url":"sant-feliu-de-guixols"},{"city":"Sant Pere Pescador","city_nice_url":"sant-pere-pescador"},{"city":"Sant Pol de Mar","city_nice_url":"sant-pol-de-mar"},{"city":"Sant Vicen\u00e7 de Montalt","city_nice_url":"sant-vicenc-de-montalt"},{"city":"Santa Cristina d'Aro","city_nice_url":"santa-cristina-d-aro"},{"city":"Santa Margherita Ligure","city_nice_url":"santa-margherita-ligure"},{"city":"Santo Stefano al Mare","city_nice_url":"santo-stefano-al-mare"},{"city":"Savona","city_nice_url":"savona"},{"city":"Savudrija","city_nice_url":"savudrija"},{"city":"Seget Donji","city_nice_url":"seget-donji"},{"city":"Seget Vranjica","city_nice_url":"seget-vranjica"},{"city":"Seget Vranjica,","city_nice_url":"seget-vranjica"},{"city":"\u0160egoti\u0107i","city_nice_url":"segotici"},{"city":"Selce","city_nice_url":"selce"},{"city":"Seline","city_nice_url":"seline"},{"city":"Senj","city_nice_url":"senj"},{"city":"Sestri Levante","city_nice_url":"sestri-levante"},{"city":"Sevid","city_nice_url":"sevid"},{"city":"\u0160ibenik","city_nice_url":"sibenik"},{"city":"\u0160ilo","city_nice_url":"silo"},{"city":"\u0160imuni","city_nice_url":"simuni"},{"city":"Sistiana","city_nice_url":"sistiana"},{"city":"Sitges","city_nice_url":"sitges"},{"city":"Slano","city_nice_url":"slano"},{"city":"Slatine","city_nice_url":"slatine"},{"city":"Smokvica","city_nice_url":"smokvica"},{"city":"Soline","city_nice_url":"soline"},{"city":"Sori","city_nice_url":"sori"},{"city":"Split","city_nice_url":"split"},{"city":"Splitska","city_nice_url":"splitska"},{"city":"Spotorno","city_nice_url":"spotorno"},{"city":"Srebreno","city_nice_url":"srebreno"},{"city":"Sreser","city_nice_url":"sreser"},{"city":"Srima","city_nice_url":"srima"},{"city":"Stani\u0107i","city_nice_url":"stanici"},{"city":"Stankovi\u0107","city_nice_url":"stankovic"},{"city":"Stara Ba\u0161ka","city_nice_url":"stara-baska"},{"city":"Stara Novalja","city_nice_url":"stara-novalja"},{"city":"Stari Grad","city_nice_url":"stari-grad"},{"city":"Starigrad Paklenica","city_nice_url":"starigrad-paklenica"},{"city":"Stivan","city_nice_url":"stivan"},{"city":"Stobre\u010d","city_nice_url":"stobrec"},{"city":"Stomorska","city_nice_url":"stomorska"},{"city":"Ston","city_nice_url":"ston"},{"city":"Strunjan","city_nice_url":"strunjan"},{"city":"Su\u0107uraj","city_nice_url":"sucuraj"},{"city":"Suko\u0161an","city_nice_url":"sukosan"},{"city":"Sumartin","city_nice_url":"sumartin"},{"city":"Supetar","city_nice_url":"supetar"},{"city":"Supetarska Draga","city_nice_url":"supetarska-draga"},{"city":"Su\u0161ica","city_nice_url":"susica"},{"city":"Sutivan","city_nice_url":"sutivan"},{"city":"Sutomi\u0161\u0107ica","city_nice_url":"sutomiscica"},{"city":"Sveta Marina","city_nice_url":"sveta-marina"},{"city":"Sveta Nedjelja","city_nice_url":"sveta-nedjelja"},{"city":"Sveti Filip i Jakov","city_nice_url":"sveti-filip-i-jakov"},{"city":"Sveti Jakov","city_nice_url":"sveti-jakov"},{"city":"Sveti Juraj","city_nice_url":"sveti-juraj"},{"city":"Sveti Petar na Moru","city_nice_url":"sveti-petar-na-moru"},{"city":"Th\u00e9oule-sur-Mer","city_nice_url":"theoule-sur-mer"},{"city":"Tirrenia","city_nice_url":"tirrenia"},{"city":"Tisno","city_nice_url":"tisno"},{"city":"Tkon","city_nice_url":"tkon"},{"city":"Torre del Lago","city_nice_url":"torre-del-lago"},{"city":"Torroella de Montgr\u00ed","city_nice_url":"torroella-de-montgri"},{"city":"Tossa de Mar","city_nice_url":"tossa-de-mar"},{"city":"Tribanj","city_nice_url":"tribanj"},{"city":"Tribunj","city_nice_url":"tribunj"},{"city":"Trieste","city_nice_url":"trieste"},{"city":"Trogir","city_nice_url":"trogir"},{"city":"Trpanj","city_nice_url":"trpanj"},{"city":"Trstenik","city_nice_url":"trstenik"},{"city":"Tu\u010depi","city_nice_url":"tucepi"},{"city":"Turanj","city_nice_url":"turanj"},{"city":"Tvrdni Dolac","city_nice_url":"tvrdni-dolac"},{"city":"Ugljan","city_nice_url":"ugljan"},{"city":"Umag","city_nice_url":"umag"},{"city":"Ustrine","city_nice_url":"ustrine"},{"city":"Vabriga","city_nice_url":"vabriga"},{"city":"Vado Ligure","city_nice_url":"vado-ligure"},{"city":"Valbandon","city_nice_url":"valbandon"},{"city":"Vallauris","city_nice_url":"vallauris"},{"city":"Valun","city_nice_url":"valun"},{"city":"Vanta\u010di\u0107i","city_nice_url":"vantacici"},{"city":"Varazze","city_nice_url":"varazze"},{"city":"Varigotti","city_nice_url":"varigotti"},{"city":"Vela Luka","city_nice_url":"vela-luka"},{"city":"Veli Lo\u0161inj","city_nice_url":"veli-losinj"},{"city":"Ventimiglia","city_nice_url":"ventimiglia"},{"city":"Viareggio","city_nice_url":"viareggio"},{"city":"Vidali\u0107i","city_nice_url":"vidalici"},{"city":"Viganj","city_nice_url":"viganj"},{"city":"Viladecans","city_nice_url":"viladecans"},{"city":"Vilassar de Mar","city_nice_url":"vilassar-de-mar"},{"city":"Villaggio Primero","city_nice_url":"villaggio-primero"},{"city":"Villefranche-sur-Mer","city_nice_url":"villefranche-sur-mer"},{"city":"Villeneuve-Loubet","city_nice_url":"villeneuve-loubet"},{"city":"Vini\u0161\u0107e","city_nice_url":"vinisce"},{"city":"Vinjerac","city_nice_url":"vinjerac"},{"city":"Vir","city_nice_url":"vir"},{"city":"Vis","city_nice_url":"vis"},{"city":"Vla\u0161i\u0107i","city_nice_url":"vlasici"},{"city":"Vodice","city_nice_url":"vodice"},{"city":"Vrbnik","city_nice_url":"vrbnik"},{"city":"Vrboska","city_nice_url":"vrboska"},{"city":"Vrsar","city_nice_url":"vrsar"},{"city":"Vrsi","city_nice_url":"vrsi"},{"city":"\u017dabori\u0107","city_nice_url":"zaboric"},{"city":"Zadar","city_nice_url":"zadar"},{"city":"Zambratija","city_nice_url":"zambratija"},{"city":"Zaostrog","city_nice_url":"zaostrog"},{"city":"Zara\u0107e","city_nice_url":"zarace"},{"city":"Zastra\u017ei\u0161\u0107e","city_nice_url":"zastrazisce"},{"city":"Zaton","city_nice_url":"zaton"},{"city":"Zavala","city_nice_url":"zavala"},{"city":"\u017ddrelac","city_nice_url":"zdrelac"},{"city":"\u017divogo\u0161\u0107e","city_nice_url":"zivogosce"},{"city":"Zoagli","city_nice_url":"zoagli"},{"city":"\u017drnovo","city_nice_url":"zrnovo"},{"city":"Zubovi\u0107i","city_nice_url":"zubovici"},{"city":"\u017duljana","city_nice_url":"zuljana"},{"city":"\u0110uba","city_nice_url":"\u0111uba"}]}},"user_type":{"status":true,"data":[{"user_type_id":"1","user_type_name":"l_adventurer"},{"user_type_id":"2","user_type_name":"l_family"},{"user_type_id":"3","user_type_name":"l_youth"}]},"beach":{"type":{"status":true,"data":[{"id":"1","name":"l_sand"},{"id":"4","name":"l_small_stones"},{"id":"5","name":"l_big_stones"},{"id":"6","name":"l_rock_beach"},{"id":"7","name":"l_grass_beach"},{"id":"8","name":"l_concrete"}]},"beach_area":{"status":true,"data":[{"id":"1","name":"l_urban"},{"id":"2","name":"l_part_urban"},{"id":"3","name":"l_natural"}]},"natural_features":{"status":true,"data":[{"id":"1","name":"l_white_sand_nl"},{"id":"2","name":"l_brown_sand_nl"},{"id":"3","name":"l_black_sand_nl"},{"id":"4","name":"l_small_stones_nl"},{"id":"5","name":"l_big_stones_nl"},{"id":"6","name":"l_rocks_nl"},{"id":"7","name":"l_grass_nl"},{"id":"8","name":"l_natural_shade_nl"},{"id":"9","name":"l_sunshade_nl"},{"id":"10","name":"l_concrete_nl"},{"id":"11","name":"l_swamp_nl"},{"id":"12","name":"l_holes_caves_nl"}]},"occupancy":{"status":true,"data":[{"id":"1","name":"l_small"},{"id":"2","name":"l_middle"},{"id":"3","name":"l_big"}]},"accessibility":{"status":true,"data":[{"id":"1","name":"l_easy"},{"id":"2","name":"l_medium"},{"id":"3","name":"l_difficult"}]},"payable":{"status":true,"data":[{"id":"1","name":"l_no"},{"id":"2","name":"l_yes"}]},"length":{"status":true,"data":[{"id":"1","name":"5m"},{"id":"2","name":"10m"},{"id":"3","name":"20m"},{"id":"4","name":"30m"},{"id":"5","name":"40m"},{"id":"6","name":"50m"},{"id":"7","name":"75m"},{"id":"8","name":"100m"},{"id":"9","name":"150m"},{"id":"10","name":"200m"},{"id":"11","name":"250m"},{"id":"12","name":"300m"},{"id":"13","name":"400m"},{"id":"14","name":"500m"},{"id":"15","name":"750m"},{"id":"16","name":"1000m"},{"id":"17","name":"l_more_km"}]},"width":{"status":true,"data":[{"id":"1","name":"3m"},{"id":"2","name":"5m"},{"id":"3","name":"10m"},{"id":"4","name":"15m"},{"id":"5","name":"20m"},{"id":"6","name":"25m"},{"id":"7","name":"30m"},{"id":"8","name":"40m"},{"id":"9","name":"50m"},{"id":"10","name":"75m"},{"id":"11","name":"100m"},{"id":"12","name":">100m"}]},"slope":{"status":true,"data":[{"id":"1","name":"l_small_slope"},{"id":"2","name":"l_normal"},{"id":"3","name":"l_increase"},{"id":"4","name":"l_sudden_drop"},{"id":"5","name":"l_different_mixed"}]},"point_of_swim":{"status":true,"data":[{"id":"1","name":"0m"},{"id":"2","name":"3m"},{"id":"3","name":"5m"},{"id":"4","name":"10m"},{"id":"5","name":"15m"},{"id":"6","name":"20m"},{"id":"7","name":"30m"},{"id":"8","name":"40m"},{"id":"9","name":"50m"},{"id":"10","name":"75m"},{"id":"11","name":"100m"},{"id":"12","name":">100m"},{"id":"13","name":"0m - 5m"},{"id":"14","name":"0m - 10m"},{"id":"15","name":"0m - 15m"},{"id":"16","name":"0m - 20m"},{"id":"17","name":"0m - 25m"},{"id":"18","name":"10m +"}]},"underwater_ground":{"status":true,"data":[{"id":"1","name":"l_sand_ground"},{"id":"2","name":"l_stones"},{"id":"3","name":"l_rocks"},{"id":"4","name":"l_grass"},{"id":"5","name":"l_coral"}]}},"infrastructure":{"status":true,"data":[{"id":"1","name":"l_wc"},{"id":"2","name":"l_shower"},{"id":"3","name":"l_accommodation"},{"id":"4","name":"l_restaurants"},{"id":"5","name":"l_dance_floor"},{"id":"6","name":"l_deckchairs"},{"id":"7","name":"l_sunshades"},{"id":"8","name":"l_swimming_pool"},{"id":"9","name":"l_waterslide"},{"id":"10","name":"l_children_playground"},{"id":"11","name":"l_sports_fields"},{"id":"12","name":"l_marina"},{"id":"13","name":"l_city_beach"},{"id":"14","name":"l_pier"},{"id":"15","name":"l_lifeguard"},{"id":"16","name":"l_parking"},{"id":"17","name":"l_access_for_disabled"},{"id":"18","name":"l_bench"},{"id":"19","name":"l_stairs_into_watter"},{"id":"20","name":"l_slope_for_boat"},{"id":"21","name":"l_trash_can"},{"id":"22","name":"l_voice_cell"},{"id":"23","name":"l_wifi_hotspot"},{"id":"24","name":"l_atm"},{"id":"25","name":"l_no_service"}]},"parking_and_path":{"path_to_the_parking":{"status":true,"data":[{"id":"1","name":"l_asphalt"},{"id":"2","name":"l_concrete_path"},{"id":"3","name":"l_dirt"},{"id":"4","name":"l_dirt_and_rocks"}]},"recommended_access":{"status":true,"data":[{"id":"1","name":"l_walk"},{"id":"2","name":"l_bike"},{"id":"3","name":"l_vehicle"},{"id":"4","name":"l_off_road_vehicle"},{"id":"5","name":"l_camper"},{"id":"6","name":"l_boat"}]}},"accommodation":{"status":true,"data":[{"id":"1","name":"l_no_service"},{"id":"2","name":"l_hotel"},{"id":"3","name":"l_hotel_complex"},{"id":"4","name":"l_apartments"},{"id":"5","name":"l_apartments_complex"},{"id":"6","name":"l_rooms"},{"id":"7","name":"l_motel"},{"id":"8","name":"l_hostel"},{"id":"9","name":"l_camp"},{"id":"10","name":"l_autocamping"},{"id":"11","name":"l_naturist_camp"}]},"food_coffe":{"status":true,"data":[{"id":"1","name":"l_no_service"},{"id":"2","name":"l_restaurant"},{"id":"3","name":"l_bistro"},{"id":"4","name":"l_fast_food"},{"id":"5","name":"l_pizzeria"},{"id":"6","name":"l_bakery"},{"id":"7","name":"l_caffe_bar"},{"id":"8","name":"l_biffe"},{"id":"9","name":"l_beach_bar"},{"id":"10","name":"l_cake_shop"},{"id":"11","name":"l_club_lounge_bar_dance_floor"},{"id":"12","name":"l_improvised_catering_supplies"}]},"sports":{"status":true,"data":[{"id":"1","name":"l_swimming"},{"id":"2","name":"l_snorkeling"},{"id":"3","name":"l_jumping_into_water"},{"id":"4","name":"l_diving"},{"id":"5","name":"l_fishing"},{"id":"6","name":"l_windsurfing"},{"id":"7","name":"l_kiteboarding"},{"id":"8","name":"l_surfing"},{"id":"9","name":"l_water_sports"},{"id":"10","name":"l_skilift_wakeboard"},{"id":"11","name":"l_different_sports"}]}}
*/


