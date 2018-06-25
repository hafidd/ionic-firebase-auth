import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController } from 'ionic-angular';
import { HomePage } from '../../pages/home/home';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
	selector:'page-login',
	templateUrl:'login.html',
})
export class LoginPage {

	credentials: any = {
		email:'',
		password:''
	}

	constructor(
		public navCtrl: NavController,
		public loadingCtrl: LoadingController,
		public authProvider: AuthProvider
		) {
	}

	ionViewDidLoad() {
		if (localStorage.getItem("isLogin") == "true") {
			this.navCtrl.setRoot(HomePage);
		}
	}

	login() {
		let loading = this.loadingCtrl.create({
			content:'Anda sedang masuk ...'
		});
		loading.present();

		this.authProvider
		.login(this.credentials)
		.then((res: any) => {
			loading.dismiss();
			this.navCtrl.setRoot(HomePage);
		}).catch((err) => {
			loading.dismiss();
			alert(err.message);
		});
	}

	register() {
		this.navCtrl.push("RegisterPage")
	}

}
