import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiServiceProvider } from '../services/api.service';
import { LoaderService } from '../services/loader.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { Network } from '@ionic-native/network/ngx';

@Component({
  selector: 'app-edit-tdg',
  templateUrl: './edit-tdg.page.html',
  styleUrls: ['./edit-tdg.page.scss'],
})
export class EditTdgPage implements OnInit {
  selectedTab: any;
  ApplicationForm: FormGroup;
  documentDetail: any;
  type: any;
  userId: any;
  userDetail: any;
  private counter = 0;
  postData: any;
  formId: any;
  isEnabled: boolean = true;

  headers = new Headers();
  constructor(public formBuilder: FormBuilder, public httpClient: HttpClient, private route: ActivatedRoute, private router: Router,
    public toastController: ToastController, private loader: LoaderService, private apiService: ApiServiceProvider, public auth: AuthGuardService,  private network: Network) {


    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.documentDetail = state.member ? JSON.parse(state.member) : '';
      this.type = state.type ? state.type : '';
      console.log("document detail====>", this.documentDetail)
    }

    if (navigator.onLine) {
      this.apiService.isOnline = true;
      console.log('Internet is connected', this.apiService.isOnline);
    } 
    else {
       this.apiService.isOnline = false;
      console.log('No internet connection', this.apiService.isOnline);
    }


    // let time = new Date();

    // var date = new Date(); // Or the date you'd like converted.

    // var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();


    // console.log("isoDateTime",isoDateTime)

    // console.log("ssssssss", time.toISOString())
    this.intilizedBankForm();

  }

  intilizedBankForm(){
    this.ApplicationForm = this.formBuilder.group({
      ConsignorName: [''],
      loadPoint: [''],
      ConsignorAddress: [''],
      ConsignorShippingDocument: [''],
      ConsignorCity: [''],
      Consignor24_NUMBER: [''],
      ConsignorProvince: [''],
      ConsignorErap_Reference: [''],
      ConsignorPostalCode: [''],
      ConsignorERAPTelNumber: [''],
      ConsignorDateShipped: [''],
      ConsignorNameCarrier: [''],
      ConsignorConsigneeName: [''],
      ConsignorDestination: [''],
      CarrierName: [''],
      CarrierDriver: [''],
      CarrierTruckTicket: [''],
      CarrierTractor: [''],
      CarrierDriverName: [''],
      CarrierTrailer: [''],
      CarrierAddress: [''],
      CarrierCity: [''],
      CarrierProvince: [''],
      CarrierPostalCode: [''],
      ConsigneeName: [''],
      ConsigneeAddress: [''],
      ConsigneeProvince: [''],
      ConsigneeCity: [''],
      ConsigneePostalCode: [''],
      RegUnNumber: [''],
      RegShippingName: [''],
      RegPrimaryClass: [''],
      RegSubsidiaryClass: [''],
      RegPackingGroup: [''],
      // RegHazardDescription: [this.documentDetail.shippingdetails[0].ToxicByInhalation],
      RegHazardDescription: [''],
      RegTotalQuantity: [''],
      RegUnitLKg: [''],
      RegSdsAttach: [''],
      NonRegPackage: [''],
      NonRegDescription: [''],
      NonRegWeight: [''],
      ConsignorSignature: [''],
      ConsignorNameAuthPerson: [''],
      ConsignorStatus: [''],
      CarrierNameAuthPerson: [''],
      CarrierStatus: [''],
      ConsigneeSignature: [''],
      ConsigneeNameAuthPerson: [''],
      ConsigneeStatus: ['']

    })
  }
  ngOnInit() {
    this.selectedTab = 'consignor';
    console.log("ngOnit function called edit page.")
   this.auth.canActivate();


    this.userId = JSON.parse(localStorage.getItem('user')).userid;
    this.userDetail = JSON.parse(localStorage.getItem('user'));
    // if (this.apiService.isOnline) {
    //   alert("Wao !, you are online.")
    //   console.log("online===>", this.apiService.isOnline);
    //   this.fetchData();
    // }
    // else {
    //   console.log("offline===>", this.apiService.isOnline);
    //     alert("Oh! offline mode activated");

    //   if (this.router.getCurrentNavigation().extras.state) {
    //     const state = this.router.getCurrentNavigation().extras.state;
    //     this.documentDetail = state.member ? JSON.parse(state.member) : '';
    //     this.type = state.type ? state.type : '';
    //     console.log("document detail====>", this.documentDetail);
    //     this.intializedForm();

    //   }
    //   else {
    //     this.documentDetail = [];
    //   }

    // }
  }


  ionViewDidEnter(){
    this.selectedTab = 'consignor';
    
    console.log("ionView Did Enter on edit page.");
   this.auth.canActivate();


    this.userId = JSON.parse(localStorage.getItem('user')).userid;
    this.userDetail = JSON.parse(localStorage.getItem('user'));
    if (this.apiService.isOnline) {
      console.log("online===>", this.apiService.isOnline);
      this.fetchData();
    }
    else {
      console.log("offline===>", this.apiService.isOnline, this.formId);
      this.getDetailOffline(this.formId);
      if (history.state) {
        const state = history.state;
        this.documentDetail = state.member ? JSON.parse(state.member) : '';
        this.type = state.type ? state.type : '';
        console.log("document detail====>", this.documentDetail);
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
        this.intializedForm();

      }
      else {
        this.documentDetail = [];
      }

    }
  }

  getDetailOffline(formId){
   let documents = JSON.parse(localStorage.getItem("documentList"));
   console.log("documents", documents);
   if(documents){
    for(var i=0; i<documents.length; i++){
     if(formId == documents[i]._id){
      this.documentDetail = documents[i];
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
      console.log("document detail====>", this.documentDetail);
      this.intializedForm();
     }
    }
   }
   else{
    this.documentDetail = [];
   }
  }

  changeEnvironment(statusName){
       console.log("statusName",statusName.detail.value)
      //  if()
  }



  intializedForm(){

    this.ApplicationForm = this.formBuilder.group({
      ConsignorName: [this.documentDetail.generator.name],
      loadPoint: [this.documentDetail.generator.sourcesitelocation],
      ConsignorAddress: [this.documentDetail.generator.address.street],
      ConsignorShippingDocument: [''],
      ConsignorCity: [this.documentDetail.generator.address.city.name],
      Consignor24_NUMBER: [this.documentDetail.generator.emergency24hrnumber],
      ConsignorProvince: [this.documentDetail.generator.address.province.name],
      ConsignorErap_Reference: [this.documentDetail.erapNumber],
      ConsignorPostalCode: [this.documentDetail.generator.address.postalcode],
      ConsignorERAPTelNumber:[this.documentDetail.erapTelNumber],
      ConsignorDateShipped: [this.documentDetail.generator.dateshipped],
      ConsignorNameCarrier: [this.documentDetail.transporter.name],
      ConsignorConsigneeName: [this.documentDetail.receiver.name],
      ConsignorDestination: [this.documentDetail.generator.receivingsitelocation],
      CarrierName: [this.documentDetail.transporter.name],
      CarrierDriver: [this.documentDetail.transporter.unitnumber],
      CarrierTruckTicket: [this.documentDetail.transporter.wayBilNumber],
      CarrierTractor: [this.documentDetail.transporter.Tractor],
      CarrierDriverName: [this.documentDetail.transporter.driverName],
      CarrierTrailer: [this.documentDetail.transporter.Trailers],
      CarrierAddress: [this.documentDetail.transporter.address.street],
      CarrierCity: [this.documentDetail.transporter.address.city.name],
      CarrierProvince: [this.documentDetail.transporter.address.province.name],
      CarrierPostalCode: [this.documentDetail.transporter.address.postalcode],
      ConsigneeName: [this.documentDetail.receiver.name],
      ConsigneeAddress: [this.documentDetail.receiver.address.street],
      ConsigneeProvince: [this.documentDetail.receiver.address.province.name],
      ConsigneeCity: [this.documentDetail.receiver.address.city.name],
      ConsigneePostalCode: [this.documentDetail.receiver.address.postalcode],
      RegUnNumber: [this.documentDetail.shippingdetails[0].unnumber],
      RegShippingName: [this.documentDetail.shippingdetails[0].tdgshippingname],
      RegPrimaryClass: [this.documentDetail.shippingdetails[0].PrimaryClass],
      RegSubsidiaryClass: [this.documentDetail.shippingdetails[0].SubsidiaryClass],
      RegPackingGroup: [this.documentDetail.shippingdetails[0].packinggroup],
      // RegHazardDescription: [this.documentDetail.shippingdetails[0].ToxicByInhalation],
      RegHazardDescription: [this.documentDetail.shippingdetails[0].ToxicByInhalation ='Yes' ? 'Toxic by inhalation' : '-'],
      RegTotalQuantity: [this.documentDetail.shippingdetails[0].quantityshipped],
      RegUnitLKg: [this.documentDetail.shippingdetails[0].unitsshipped],
      RegSdsAttach: [''],
      NonRegPackage: [this.documentDetail.NonRegulatedDangerousGoods[0].Packages],
      NonRegDescription: [this.documentDetail.NonRegulatedDangerousGoods[0].Description],
      NonRegWeight: [this.documentDetail.NonRegulatedDangerousGoods[0].Weight],
      ConsignorSignature: [''],
      ConsignorNameAuthPerson: [this.documentDetail.generator.nameofauthorisedperson],
      ConsignorStatus: [this.documentDetail.generator.status.name],
      CarrierNameAuthPerson: [this.documentDetail.transporter.nameofauthorisedperson],
      CarrierStatus: [this.documentDetail.transporter.statusname],
      ConsigneeSignature: [''],
      ConsigneeNameAuthPerson: [''],
      ConsigneeStatus: [this.documentDetail.receiver.statusname]

    })
  }

  fetchData() {
    let id = this.documentDetail._id;
    // call get API
    this.loader.presentLoading();
    this.apiService.getRequest('manifestapi/getmanifestbyid/' + id + '/demoez2Track').then((res) => {
      this.loader.dismissLoading();
      this.documentDetail = res[0];
      console.log('data', res[0]);
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
      this.intializedForm();
    }).catch((err) => {
      this.loader.dismissLoading();

      console.error(err.error.text);
      if (err.error !== null || err.error !== undefined) {
        this.documentDetail = [];
        if (err.error.text) {
          this.presentToast(err.error.text);
        }
      }
    })
  }



  tabSelection(val) {
    console.log("val====>", val)
    this.selectedTab = val;
  }


  sendPostRequest() {
    var httpOptions;
    httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Accept": 'application/json'
      })
    }
    var date = new Date(); // Or the date you'd like converted.

    var isoDateTime = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
  
    this.postData = {
      "domainname": "tourmalinetest",
      "userId": this.userId,
      "formid": this.documentDetail._id,
      "quantityshipped": this.ApplicationForm.value.RegTotalQuantity,
      "unitsshipped": this.ApplicationForm.value.RegUnitLKg,
      "formNumber": this.documentDetail.formnumber,
      "statusname": this.ApplicationForm.value.ConsigneeStatus,
      "createdbyid": "d018ddbe-4082-43c0-b40a-d3ec5aae419a",
      "createdby": "admin",
      "modifiedby": this.userDetail.username, ///user login detail
      "modifiedbyid": this.userDetail.userid, //// user id after login
      "modifiedon": isoDateTime   //// current time
    }


    console.log("new status==>", this.ApplicationForm.value.ConsigneeStatus);

    //////// call update API   //////////////////
    if(this.apiService.isOnline){
     this.loader.presentLoading();
      console.log("online===>",this.apiService.isOnline);
     
     this.apiService.putData(this.postData, 'manifestapi/updatetdgshippingdocumentbyid').then((res) => {
        this.loader.dismissLoading();

      console.log('data', res);
      this.presentToast('TDG Shipping Document Updated Successfully.');
      this.counter += 1;
      this.router.navigate([`/tdg-list/${this.counter}`]);

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
    else{
    console.log("offline===>", this.apiService.isOnline);
      this.addOrUpdate(this.postData);
      this.presentToast('TDG Shipping Document Updated Successfully.');
      //this.loader.dismissLoading();
      this.counter += 1;
      this.router.navigate([`/tdg-list/${this.counter}`]);
    }
     
  }


  //To save and update data in complete list ////

  updateDocList(postData){
    console.log("postData===>",postData);
    let savedDocument = JSON.parse(localStorage.getItem("documentList"));
    console.log("savedDocument====>",savedDocument)

    for(var i =0; i<savedDocument.length; i++){
      if(savedDocument[i]._id == postData.formid){
        savedDocument[i].shippingdetails[0].quantityshipped = postData.quantityshipped;
        savedDocument[i].shippingdetails[0].unitsshipped = postData.unitsshipped;
        savedDocument[i].receiver.statusname = postData.statusname;

      }
    }
       console.log("final list======>",savedDocument);
       localStorage["documentList"] = JSON.stringify(savedDocument);
      // this.intilizedBankForm();

  }


  ///To save and update data in local storage of an document //////
  addOrUpdate(application) {
    return new Promise((resolve, reject) => {
      let res = JSON.parse(localStorage.getItem("documentHistory"));
      console.log('res1', res);
      res = {
        ...res,
        [application.formid]: application
      };
      console.log('res2', res);
      localStorage.setItem("documentHistory", JSON.stringify(res));
      this.updateDocList(application);

      resolve();
    });
  }

  /// Cancel the update functionality of an document ////
  cancelRequest() {
    console.log("Request Cancel.")
    this.counter += 1;
    this.router.navigate([`/tdg-list/${this.counter}`]);
  }

  async presentToast(message: string = '') {
    const toast = await this.toastController.create({
      message,
      duration: 4000
    });
    toast.present();
  }

}
