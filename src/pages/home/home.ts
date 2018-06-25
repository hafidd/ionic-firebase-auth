import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth'
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
	selector:'page-home',
	templateUrl:'home.html'
})
export class HomePage {
	username: string;

	constructor(
		public navCtrl: NavController, 
		public authProvider: AuthProvider, 
		private angFireAuth: AngularFireAuth, 
		private toastCtrl : ToastController
		) {
		this.load(); 
	}

	load() {
		this.angFireAuth.authState.subscribe(data=> {
			if (data.displayName&&data.uid) {
				this.username = data.displayName;
			}
			else {
				this.toastCtrl.create({
					message:'Tidak dapat menemukan detail autentikasi',
					duration:3000
				}).present();
			}
		});
	}

	logout() {
		this.authProvider.logout();
		this.navCtrl.setRoot("LoginPage");
	}

}
