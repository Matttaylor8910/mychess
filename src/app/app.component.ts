import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';
import { GamesListPage } from '../pages/games-list/games-list';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = null;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth: AuthProvider
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      // Determine if the user is logged in
      this.auth.getCurrentUser().then(user => {
        if (user) {
          this.rootPage = GamesListPage;
        }
        else {
          this.rootPage = LoginPage;
        }

        this.statusBar.styleDefault();
        this.splashScreen.hide();
      });
    });
  }
}

