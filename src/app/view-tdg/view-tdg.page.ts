import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceProvider } from '../services/api.service';
import { LoaderService } from '../services/loader.service';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Network } from '@ionic-native/network/ngx';


@Component({
  selector: 'app-view-tdg',
  templateUrl: './view-tdg.page.html',
  styleUrls: ['./view-tdg.page.scss'],
})
export class ViewTdgPage implements OnInit {
documentDetail: any;
type: any;
  constructor(private route: ActivatedRoute, private router: Router, public httpClient: HttpClient,  private loader: LoaderService,
    private apiService: ApiServiceProvider, public toastController: ToastController, private network: Network) { 
  
    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.documentDetail = state.member ? JSON.parse(state.member) : '';
      this.type = state.type ? state.type : '';
      console.log("document detail====>",  this.documentDetail)
    }

  }

  ngOnInit() {
    if(this.apiService.isOnline){
      console.log("online===>",this.apiService.isOnline);
     this.fetchData();
    }
   else{
    console.log("offline===>",this.apiService.isOnline);
    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.documentDetail = state.member ? JSON.parse(state.member) : '';
      this.type = state.type ? state.type : '';
      console.log("document detail in offline mode====>",  this.documentDetail)
    }
   }
  }


    fetchData() {
     let id = this.documentDetail._id;
          // call get API
          this.loader.presentLoading();
          this.apiService.getRequest('manifestapi/getmanifestbyid/'+id+'/demoez2Track').then((res) => {
           this.loader.dismissLoading();
           this.documentDetail = res[0];
           console.log('data', res[0]);
        
          }).catch((err) => {
           this.loader.dismissLoading();
     
           console.error(err.error.text);
           if (err.error !== null || err.error !== undefined) {
             if (err.error.text) {
               this.presentToast(err.error.text);
             }
           }
          })
    }


    async presentToast(message: string = '') {
      const toast = await this.toastController.create({
        message,
        duration: 4000
      });
      toast.present();
    }

}
