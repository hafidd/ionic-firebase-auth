import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
	selector:'page-register',
	templateUrl:'register.html',
})
export class RegisterPage {

	credentials: any = {
		username:'',
		email:'',
		password:''
	}

	constructor(
		public navCtrl: NavController,
		public loadingCtrl: LoadingController, 
		public toastCtrl: ToastController,
		public authProvider: AuthProvider
		) { }

	register() {
		var toaster = this.toastCtrl.create({
			duration:3000,
			position:'bottom'
		});
		if (this.credentials.email == '' || this.credentials.password == '' || 
			this.credentials.username == '') {
			toaster.setMessage('Semua kolom isian tidak boleh kosong');
		toaster.present();
	} else if (this.credentials.password.length<7) {
		toaster.setMessage('Kata sandi tidak kuat. Coba berikan lebih dari enamkarakter');
		toaster.present();
	} else {
		let loader = this.loadingCtrl.create({
			content:'Mohon tunggu . . .'
		});
		loader.present();

		this.authProvider
		.register(this.credentials)
		.then((res: any) => {
			loader.dismiss();
			localStorage.setItem("isLogin", "true");
			this.navCtrl.setRoot(HomePage);
		}).catch((err) => {
			loader.dismiss();
			alert(err.message);
		});
	}
}
}
