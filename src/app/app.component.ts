import { Component, ViewChild } from '@angular/core';

import { Platform, MenuController, Nav } from 'ionic-angular';

import { StatusBar } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { UserServices } from '../service/user';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { RegisterLoginPage } from '../pages/register-login/register-login';
import { RegisterIndividualProfilePage } from '../pages/register-individual-profile/register-individual-profile';

@Component({
  templateUrl: 'app.html',
  providers: [UserServices]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  storage: Storage = new Storage();
  key: any = { key: 'key' };
  errors: Array<string> = [];
  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any }>;
  username: String = "weo";
  constructor(
    public platform: Platform,
    public menu: MenuController,
    private userServices: UserServices
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Login', component: LoginPage },
      { title: 'Home', component: HomePage },
      { title: 'Login Registration', component: RegisterLoginPage },
      { title: 'Profile Registration', component: RegisterIndividualProfilePage }
    ];
  }

  initializeApp() {
    let us = this.userServices;
        this.storage.get('id')
            .then(
            value => {
console.log('UID: '+value);              
                if (value) us.user.id = value;
                us.getMyProfile();
            });

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

    });
  }

  openPage(page) {
    // close the menu when clicking a link from the menu
    this.menu.close();
    // navigate to the new page if it is not the current page
    this.nav.setRoot(page.component);
  }
}