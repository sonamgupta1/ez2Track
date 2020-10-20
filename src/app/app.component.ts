import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Network } from '@ionic-native/network/ngx';
import { ApiServiceProvider } from './services/api.service';
import { LoaderService } from './services/loader.service';
import { ToastController } from '@ionic/angular';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit {
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Login',
      url: '/login',
      icon: 'mail'
    },
    {
      title: 'TDG List',
      url: 'tdg-list',
      icon: 'archive'
    }
    // {
    //   title: 'TDG View',
    //   url: 'view-tdg',
    //   icon: 'archive'
    // },
    // {
    //   title: 'TDG Edit',
    //   url: 'edit-tdg',
    //   icon: 'archive'
    // }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private loader: LoaderService,
    private network: Network,
    private apiService: ApiServiceProvider,
    public toastController: ToastController,
    private screenOrientation: ScreenOrientation
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.updateMultiDocuments();
      if (this.platform.is('cordova')) {
        this.setupNetwork();
        console.log("Running on mobile brower not true", this.platform.isLandscape());
        console.log("screenOrientation",this.screenOrientation.type);
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);
      }
      if (this.platform.is('mobile') || this.platform.is('android')) {
        console.log("Running on mobile brower not true", this.platform.isLandscape());
        console.log("screenOrientation",this.screenOrientation.type);
        this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.LANDSCAPE);

      }
    });
  }





  ngOnInit() {
    const path = window.location.pathname.split('folder/')[1];
    console.log("path====>", path)
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  setupNetwork() {
    console.log("setupNetwork");

    this.network.onDisconnect().subscribe(() => {
      console.log('you are offline');
      this.apiService.isOnline = false;
    });
    this.network.onConnect().subscribe(() => {
      console.log('you are online');
      this.apiService.isOnline = true;
      this.updateMultiDocuments();
    });
  };


  updateMultiDocuments() {
    let finalData = this.listConversion()
    console.log("final data===>", finalData)
    if (finalData) {
      this.apiService.putData(finalData, 'manifestapi/updatetmultipletdgbyid').then((res) => {
        // this.loader.dismissLoading();

        console.log('data', res);
        this.presentToast('TDG Shipping Document Updated Successfully.');

        this.updateLocalDoc(res)

      }).catch((err) => {
        // this.loader.dismissLoading();

        console.error(err.error.text);
        if (err.error !== null || err.error !== undefined) {
          if (err.error.text) {
            this.presentToast(err.error.text);
          }
        }
      })

    }
    else{
      console.log("no data to update!")
    }


  }

  updateLocalDoc(updatedDocList){
    console.log("updatedDocList=====>", updatedDocList);
    let docLength = updatedDocList.length;
    console.log("docLength====>", docLength);
    let storedDocs = JSON.parse(localStorage.getItem("documentHistory"));

    console.log("storedDocs====>", storedDocs);

    for(var i=0; i< docLength; i++){
      console.log("i=====>", i, updatedDocList[0].formid);
      delete storedDocs[updatedDocList[0].formid];
  
       console.log("inside loop=====>",storedDocs);
      //this.findAndDelete(updatedDocList[0].formid);

    }

    console.log("storedDocsstored======>",storedDocs);
   
  }

  findAndDelete(formId){
    return new Promise((resolve, reject) => {
       console.log("formId to be deleted====>", formId);
       let result = localStorage.getItem("documentHistory");
       let ret = JSON.parse(result);
       console.log(ret);
       delete ret[formId];
       console.log("stored data=====>", ret);

      this.addOrUpdate(ret);
      resolve();
    })
         
  }

   ///To save and update data in local storage of an document //////
   addOrUpdate(applications) {

    localStorage.setItem("documentHistory", JSON.stringify(applications));
    // return new Promise((resolve, reject) => {
    //   let res = JSON.parse(localStorage.getItem("documentHistory"));
    //   console.log('res1', res, application);
    //   res = {
    //     ...res,
    //     [application.formid]: application
    //   };
    //   console.log('res2', res);
    //   localStorage.setItem("documentHistory", JSON.stringify(res));
    //   resolve();
    // });
  }

  async presentToast(message: string = '') {
    const toast = await this.toastController.create({
      message,
      duration: 4000
    });
    toast.present();
  }

  listConversion() {
    let result = localStorage.getItem("documentHistory");
    if (result) {
      result = JSON.parse(result);
      let keys = Object.keys(result);
      let result1 = [];
      for (let i = 0; i < keys.length; i++) {
        result1.push(result[keys[i]]);
      }
      return result1;
    }

  }
}
