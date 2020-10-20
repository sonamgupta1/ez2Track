import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiServiceProvider } from '../services/api.service';
import { LoaderService } from '../services/loader.service';
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

  headers = new Headers();
  constructor(public formBuilder: FormBuilder, public httpClient: HttpClient, private route: ActivatedRoute, private router: Router,
    public toastController: ToastController, private loader: LoaderService, private apiService: ApiServiceProvider) {


    // if (this.router.getCurrentNavigation().extras.state) {
    //   const state = this.router.getCurrentNavigation().extras.state;
    //   this.documentDetail = state.member ? JSON.parse(state.member) : '';
    //   this.type = state.type ? state.type : '';
    //   console.log("document detail====>", this.documentDetail)
    // }

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
    // this.sendPostRequest();

    if (this.router.getCurrentNavigation().extras.state) {
      const state = this.router.getCurrentNavigation().extras.state;
      this.documentDetail = state.member ? JSON.parse(state.member) : '';
      this.type = state.type ? state.type : '';
      console.log("document detail====>", this.documentDetail)
    }


    this.userId = JSON.parse(localStorage.getItem('user')).userid;
    this.userDetail = JSON.parse(localStorage.getItem('user'));
    if (this.apiService.isOnline) {
      console.log("online===>", this.apiService.isOnline);
      this.fetchData();
    }
    else {
      console.log("offline===>", this.apiService.isOnline);
      if (this.router.getCurrentNavigation().extras.state) {
        const state = this.router.getCurrentNavigation().extras.state;
        this.documentDetail = state.member ? JSON.parse(state.member) : '';
        this.type = state.type ? state.type : '';
        console.log("document detail====>", this.documentDetail);
        this.intializedForm();

      }
      else {
        this.documentDetail = [];
      }

    }

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
      ConsignorERAPTelNumber: [''],
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
      "modifiedon": "2020-10-14T06:07:49.000Z"   //// current time
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
