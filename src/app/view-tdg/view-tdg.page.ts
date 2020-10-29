import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceProvider } from '../services/api.service';
import { LoaderService } from '../services/loader.service';
import { ToastController } from '@ionic/angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Network } from '@ionic-native/network/ngx';
import { AuthGuardService } from '../services/auth-guard.service';
import { identifierModuleUrl } from '@angular/compiler';


@Component({
  selector: 'app-view-tdg',
  templateUrl: './view-tdg.page.html',
  styleUrls: ['./view-tdg.page.scss'],
})
export class ViewTdgPage implements OnInit {
documentDetail: any;
type: any;
  constructor(private route: ActivatedRoute, private router: Router, public httpClient: HttpClient,  private loader: LoaderService,
    private apiService: ApiServiceProvider, public toastController: ToastController, private network: Network, public auth: AuthGuardService) { 
  
    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.documentDetail = state.member ? JSON.parse(state.member) : '';
      this.type = state.type ? state.type : '';
      console.log("document detail====>",  this.documentDetail);
   
    }

    if (navigator.onLine) {
      this.apiService.isOnline = true;
      console.log('Internet is connected', this.apiService.isOnline);
    } 
    else {
       this.apiService.isOnline = false;
      console.log('No internet connection', this.apiService.isOnline);
    }

  }

  ngOnInit() {
    this.auth.canActivate();
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
      console.log("document detail in offline mode====>",  this.documentDetail);
      if(this.documentDetail.shippingdetails[0].packinggroup){
        if(this.documentDetail.shippingdetails[0].packinggroup == '1e1c2657-3f4e-418d-b4e6-bdea549d4e0c'){
         this.documentDetail.shippingdetails[0].packinggroup = 'II';
        }
        else if(this.documentDetail.shippingdetails[0].packinggroup == 'aead26fc-448c-42f4-afb3-92c4b0633633'){
         this.documentDetail.shippingdetails[0].packinggroup = 'I';
        }
        else if(this.documentDetail.shippingdetails[0].packinggroup == 'eb55aa27-b01f-443f-aa0f-4f88e972b6b3'){
         this.documentDetail.shippingdetails[0].packinggroup = 'III';
        }
      }
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
           console.log('data', res[0].shippingdetails[0].packinggroup);
           if(this.documentDetail.shippingdetails[0].packinggroup){
             if(this.documentDetail.shippingdetails[0].packinggroup == '1e1c2657-3f4e-418d-b4e6-bdea549d4e0c'){
               this.documentDetail.shippingdetails[0].packinggroup = 'II';
             }
             else if(this.documentDetail.shippingdetails[0].packinggroup == 'aead26fc-448c-42f4-afb3-92c4b0633633'){
               this.documentDetail.shippingdetails[0].packinggroup = 'I';
             }
             else if(this.documentDetail.shippingdetails[0].packinggroup == 'eb55aa27-b01f-443f-aa0f-4f88e972b6b3'){
               this.documentDetail.shippingdetails[0].packinggroup = 'III';
             }
           }
        
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

 
    // fetchPackingGroup(packingId) {
    //        // call get API
    //        console.log("packingId==>", packingId);
    //        this.apiService.getRequest('manifestapi/getpackinggroupbyid/'+packingId+'/tourmalinetest').then((res) => {
    //          console.log('data', res);
         
    //        }).catch((err) => {
    //         console.error(err.error.text);
    //         if (err.error !== null || err.error !== undefined) {
    //           if (err.error.text) {
    //             this.presentToast(err.error.text);
    //           }
    //         }
    //        })
    //  }

    async presentToast(message: string = '') {
      const toast = await this.toastController.create({
        message,
        duration: 4000
      });
      toast.present();
    }


    RegUnitName(id){
      
      if(id){
          if(id == 'UN02'){
            id = 'm3';
            return id;
          }
          else if(id == 'UN03'){
            id = 'kg';
            return id;
          }
          else if(id == 'UN04'){
            id = 'L';
            return id;
          }
          else if(id == '06086137-6a7d-4c41-bd6d-e12593ba23b4'){
            id = 'NEQ (kg)';
            return id;
          }
          else if(id == '0d6478a3-ea2c-4e0c-85ff-af9b00b15686'){
            id = 'articles';
            return id;
          }
      }
      else{
        return id;
      }
    }

}
