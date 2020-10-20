import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable()
export class LoaderService {
    loading: any;
    constructor(
        public loadingController: LoadingController
    ) { }

    async presentLoading() {
        this.loading = await this.loadingController.create({
            cssClass: 'my-custom-class',
            message: 'Please wait...',
        });
        await this.loading.present();
        console.log('Loading presnt!');
    }
    dismissLoading() {
        this.loading.dismiss();
        console.log('Loading dismissed!');

    }

}