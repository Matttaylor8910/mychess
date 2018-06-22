import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
// import * as firebase from 'firebase/app';

import { Observable } from 'rxjs/Observable';
import { switchMap, take } from 'rxjs/operators';
import { Platform } from 'ionic-angular';

// import { Facebook } from '@ionic-native/facebook';

@Injectable()
export class AuthProvider {

  user: Observable<any>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    // private facebook: Facebook,
    private platform: Platform
  ) {
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        }
        else {
          return Observable.of(null);
        }
      })
    )
  }

  // Current user as promise
  async getCurrentUser(): Promise<any> {
    return this.user.pipe(take(1)).toPromise();
  }

  // Determine if the user is logged in
  async isLoggedIn(): Promise<boolean> {
    const user = await this.getCurrentUser();
    return !!user;
  }

  // Save customuser data in Firestore
  private setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || null
    };
    return userRef.set(data, { merge: true });
  }

  // Update user data
  updateUserData(user: any) {
    return this.afs.doc(`users/${user.uid}`).update(user);
  }

  //// EMAIL/PASSWORD ////

  async emailSignUp(email: string, passsword: string, name: string) {
    try {
      let user = await this.afAuth.auth.createUserWithEmailAndPassword(email, passsword);
      user.displayName = name;
      await this.setUserData(user);
    }
    catch(err) {
      console.log(err);
    }
  }

  async emailSignIn(email: string, passsword: string) {
    try {
      const user = await this.afAuth.auth.signInWithEmailAndPassword(email, passsword);
      await this.setUserData(user);
    }
    catch(err) {
      console.log(err);
    }
  }


  //// ANONYMOUS ////

  async anonymousLogin(): Promise<void> {
    const user = await this.afAuth.auth.signInAnonymously();
    await this.setUserData(user);
  }


  //// FACEBOOK ////

  // async facebookLogin() {
  //   if (this.platform.is('cordova')) {
  //     return await this.nativeFacebookLogin();
  //   }
  //   else {
  //     return await this.webFacebookLogin();
  //   }
  // }

  // async nativeFacebookLogin(): Promise<void> {
  //   try {
  //     const response = await this.facebook.login(['email', 'public_profile']);
  //     const facebookCredential = firebase.auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
  //     const firebaseUser = await firebase.auth().signInWithCredential(facebookCredential);
  //     return await this.setUserData(firebaseUser);
  //   }
  //   catch(err) {
  //     console.log(err);
  //   }
  // }

  // async webFacebookLogin(): Promise<void> {
  //   try {
  //     const provider = new firebase.auth.FacebookAuthProvider();
  //     const credential = await this.afAuth.auth.signInWithPopup(provider);
  //     return await this.setUserData(credential.user);
  //   }
  //   catch(err) {
  //     console.log(err);
  //   }
  // }


  //// HELPERS ////

  async logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }
}
