import { Component } from '@angular/core';
import { AuthProvider } from '../../providers/auth/auth';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'logout',
  templateUrl: 'logout.html'
})
export class LogoutComponent {

  text: string;

  constructor(
    public auth: AuthProvider,
    public nav: NavController
  ) {
    
  }

  async logout() {
    await this.auth.logout();
    await this.nav.setRoot(LoginPage);
  }

}
