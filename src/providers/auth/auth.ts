import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

@Injectable()
export class AuthProvider {

	firedata = firebase.database().ref('/users');

	constructor(
		public angFireAuth: AngularFireAuth,
		public angFireDb: AngularFireDatabase
		) {

	}

	register(newUser) {
		return new Promise((resolve, reject) => {
			this.angFireAuth.auth
			.createUserWithEmailAndPassword(newUser.email, newUser.password)
			.then(() => {
				this.angFireAuth.auth.currentUser
				.updateProfile({
					displayName:newUser.username,
					photoURL:''
				}).then(() => {
					this.angFireDb.list('/users/')
					.update(this.angFireAuth.auth.currentUser.uid, {
						uid:this.angFireAuth.auth.currentUser.uid,
						displayName:newUser.username,
					}).then((res) => {
						console.log(res)
						resolve({ success:true });
					});
				}).catch((err) => {
					console.log(err);
					reject(err);
				})
			}).catch((err) => {
				console.log(err);
				reject(err);
			});
		});
	}

	login(credentials) {
		var promise = new Promise((resolve, reject) => {
			this.angFireAuth.auth
			.signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				localStorage.setItem("isLogin", "true");
				resolve(true);
			}).catch((err) => {
				reject(err);
			})
		})
		return promise;
	}

	logout() {
		localStorage.removeItem("isLogin")
	}

}
