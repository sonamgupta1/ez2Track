import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiServiceProvider } from '../services/api.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  loginForm: FormGroup;
  SignupForm: FormGroup;
  constructor(private activatedRoute: ActivatedRoute, public toastController: ToastController,
    private loader: LoaderService,
    private router: Router,
    private apiService: ApiServiceProvider) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');

    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'domainname': new FormControl('demoez2Track')
    });
  }

  login() {
    if (this.loginForm.value.username === null || this.loginForm.value.username.length <= 0) {
      this.presentToast('Please Provide required values');
      return;
    }
    if (this.loginForm.value.password === null || this.loginForm.value.password.length <= 0) {
      this.presentToast('Please Provide required values');
      return;
    }

    // call API
    this.loader.presentLoading();
    this.apiService.postData(this.loginForm.value, 'loginapi/getuserlogininfo').then((res) => {
      this.loader.dismissLoading();

      console.log('data', res);
      // now store users details in localstorage
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['tdg-list']);
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








