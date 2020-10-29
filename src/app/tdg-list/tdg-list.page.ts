import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { NetworkService, ConnectionStatus } from '../services/network.service';
import { Network } from '@ionic-native/network/ngx';
import { ApiServiceProvider } from '../services/api.service';
import { LoaderService } from '../services/loader.service';
import { ToastController } from '@ionic/angular';
import { AuthGuardService } from '../services/auth-guard.service';


@Component({
  selector: 'app-tdg-list',
  templateUrl: './tdg-list.page.html',
  styleUrls: ['./tdg-list.page.scss'],
})


export class TdgListPage implements OnInit {
  documentList: any;
  headers = new Headers();
  totalLiveDoc: number;

  constructor(private router: Router, public httpClient: HttpClient, private networkService: NetworkService, private network: Network,
    private loader: LoaderService, private apiService: ApiServiceProvider, public toastController: ToastController,
    public auth: AuthGuardService) {

    console.log('isOnline list page', this.apiService.isOnline);

    if (navigator.onLine) {
      this.apiService.isOnline = true;
      console.log('Internet is connected', this.apiService.isOnline);

   } else {
    this.apiService.isOnline = false;
      console.log('No internet connection', this.apiService.isOnline);
   }

  }

  ngOnInit() {
     console.log('calling ngoninit of list page');
    // validate whether user is already logged in or not
    this.auth.canActivate();

  }
 
  ionViewDidEnter(){
    this.auth.canActivate();
    if (this.apiService.isOnline) {
      console.log("online ion view Did list page enter===>");
      this.getDocumentList(null);
    }
    else {
      console.log("offline ion view Did list page enter===>", this.apiService.isOnline);
       this.getOfflineDocument(null);
    }
  }

  getOfflineDocument(event){
    console.log("offline data called")
    if (localStorage.getItem("documentList")) {
      this.documentList = JSON.parse(localStorage.getItem("documentList"))
      this.totalLiveDoc = this.documentList.length;
      this.sortData();
      if(event)
      event.target.complete();
 
    }
    else {
      this.documentList = [];
      this.totalLiveDoc = 0;
      if(event)
      event.target.complete();
 
    }
  }


  getDocumentList(event) {
    if (this.apiService.isOnline){
      this.loader.presentLoading();
      this.apiService.getRequest('manifestapi/getmanifestlist/demoez2Track').then((res) => {
        this.loader.dismissLoading();
        this.documentList = res;
        var myquotes = this.documentList;
        localStorage["documentList"] = JSON.stringify(myquotes);
        this.totalLiveDoc = myquotes.length;
        console.log('data', myquotes.length);
        this.sortData();
        if(event)
          event.target.complete();  
      }).catch((err) => {
        this.loader.dismissLoading();
  
        console.error(err.error.text);
        if (err.error !== null || err.error !== undefined) {
          if (err.error.text) {
            this.presentToast(err.error.text);
          }
        }
        
        if (event)
          event.target.complete();
      })
    }
    else{
      this.getOfflineDocument(event);
    }
  }

  sortData() {
    return this.documentList.sort((a, b) => {   
      return <any>new Date(b.generator.dateshipped) - <any>new Date(a.generator.dateshipped);
    });
  }



  //// To open view TDG Page /////

  viewTDG(documentInfo) {
    console.log("click the function=====>", documentInfo)
    this.router.navigate(['/view-tdg'], {
      state: {
        member: JSON.stringify(documentInfo),
        type: 'reader'
      }
    });

  }


  //// To open edit TDG Page /////


  editTDG(documentInfo) {
    console.log("click the function")
    this.router.navigate(['/edit-tdg'], {
      state: {
        member: JSON.stringify(documentInfo),
        type: 'reader'
      }
    });

  }


  /// To get data from json storage //////
  fetchData1() {
    fetch('./assets/data/documents.json').then(res => res.json())
      .then(json => {
        this.documentList = json;
        console.log(this.documentList);

    });
  }

 


  ////Date formater /////////

  DateShortFormat = function(dateFormat) {
  
    let anyDate = new Date(dateFormat);
    let monthNames =["Jan","Feb","Mar","Apr",
                      "May","Jun","Jul","Aug",
                      "Sep", "Oct","Nov","Dec"];
    
    let day = anyDate.getDate();
    
    let monthIndex = anyDate.getMonth();
    let monthName = monthNames[monthIndex];
    
    let year = anyDate.getFullYear();


    let dateToShown = monthName+" "+ day + ", "+ year;
      return dateToShown;
    // and it can represent itself in the custom format defined above.  
  }




  fetchData() {
    // call API
    this.loader.presentLoading();
    this.apiService.getRequest('manifestapi/getmanifestlist/demoez2Track').then((res) => {
      this.loader.dismissLoading();
      this.documentList = res;
      var myquotes = this.documentList;
      localStorage["documentList"] = JSON.stringify(myquotes);
      this.totalLiveDoc = myquotes.length;
      console.log('data', myquotes.length);
      // now store tdg list details in localstorage

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
