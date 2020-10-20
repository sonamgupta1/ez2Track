// import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable()
export class ApiServiceProvider {
    public baseUrl = 'https://ez2trackmobileapi.azurewebsites.net/api/';

    isOnline: boolean = false;
    constructor(public http: HttpClient) {
        console.log('Hello ApiServiceProvider Provider');
    }


    postData(data, url) {
        return new Promise((resolve, reject) => {
            const headers = new HttpHeaders().set('Content-Type', 'application/json');
            this.http.post(this.baseUrl + url, data, { headers })
                .subscribe(res => {
                    console.log('respo', res);

                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });

    }


    putData(data, url) {
        return new Promise((resolve, reject) => {
            // const headers = new HttpHeaders().set('Content-Type', 'application/json');
            var httpOptions;
            httpOptions = {
              headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": 'application/json'
              })
            }
            this.http.put(this.baseUrl + url, data, httpOptions)
                .subscribe(res => {
                    console.log('respo', res);

                    resolve(res);
                }, (err) => {
                    reject(err);
            });
        });

    }

    getRequest(url){
        return new Promise((resolve, reject) => {          
            let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', }) };
            this.http.get(this.baseUrl + url, httpOptions)
                .subscribe(res => {
                    console.log('respo', res);

                    resolve(res);
                }, (err) => {
                    reject(err);
            });
        });
    }

    putMultiData(data, url) {
        return new Promise((resolve, reject) => {
            // const headers = new HttpHeaders().set('Content-Type', 'application/json');
            var httpOptions;
            httpOptions = {
              headers: new HttpHeaders({
                "Content-Type": "application/json",
                "Accept": 'application/json'
              })
            }
            this.http.put(this.baseUrl + url, data, httpOptions)
                .subscribe(res => {
                    console.log('respo', res);

                    resolve(res);
                }, (err) => {
                    reject(err);
            });
        });

    }

    

}
