import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { GamePage } from '../pages/game/game';
import { AuthProvider } from '../providers/auth/auth';
import { LoginPage } from '../pages/login/login';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { ComponentsModule } from '../components/components.module';
import { GamesListPage } from '../pages/games-list/games-list';
import { DatabaseProvider } from '../providers/database/database';

const firebase = {
  apiKey: "AIzaSyCMCsutlu39mAlTSjgUq5r1eWlRfDi11Uw",
  authDomain: "mychess-bff3c.firebaseapp.com",
  databaseURL: "https://mychess-bff3c.firebaseio.com",
  projectId: "mychess-bff3c",
  storageBucket: "mychess-bff3c.appspot.com",
  messagingSenderId: "592253921973"
};

@NgModule({
  declarations: [
    MyApp,
    GamesListPage,
    GamePage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    GamesListPage,
    GamePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    DatabaseProvider
  ]
})
export class AppModule {}
