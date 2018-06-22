import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  isNewUser: boolean = true;
  signUpForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public fb: FormBuilder,
    public auth: AuthProvider
  ) {
    this.signUpForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]],
      'name': ['']
    });
  }

  ionViewDidLoad() {
    
  }

  get email() { return this.signUpForm.get('email') }
  get password() { return this.signUpForm.get('password') }
  get name() { return this.signUpForm.get('name') }

  toggleSignIn() {
    this.isNewUser = !this.isNewUser;
  }

  submit() {
    if (this.isNewUser) {
      this.signUp();
    }
    else {
      this.signIn();
    }
  }

  async signUp() { 
    await this.auth.emailSignUp(this.email.value, this.password.value, this.name.value);
    await this.navCtrl.setRoot(HomePage);
  }

  async signIn() { 
    await this.auth.emailSignIn(this.email.value, this.password.value);
    await this.navCtrl.setRoot(HomePage);
  }

}
