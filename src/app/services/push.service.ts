import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Platform } from '@ionic/angular';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';

@Injectable({
  providedIn: 'root'
})
export class PushService {
  constructor(
    private readonly platform: Platform,
    private readonly apiService: ApiService,
    private readonly push: Push
  ) {
    // this.register()
  }

  async register(address: string) {
    this.platform.ready().then(() => {
      if (this.platform.is('cordova')) {
        console.log('IS DEVICE, REQUESTING PUSH');
        this.push.hasPermission().then((res: any) => {
          if (res.isEnabled) {
            console.log('We have permission to send push notifications');
          } else {
            console.log('We do not have permission to send push notifications');
          }
        });

        const options: PushOptions = {
          android: {},
          ios: {
            alert: 'true',
            badge: true,
            sound: 'false'
          }
        };

        const pushObject: PushObject = this.push.init(options);

        pushObject.on('notification').subscribe((notification: any) => {
          console.log('Received a notification', JSON.stringify(notification));
          const {
            challenge,
            host,
            date,
            requestId,
            address
          } = notification.additionalData;
        });

        pushObject.on('registration').subscribe((registration: any) => {
          console.log('Device registered', registration.registrationId);
          this.apiService.registerPushToken(
            address,
            registration.registrationId
          );
        });

        pushObject
          .on('error')
          .subscribe(error => console.error('Error with Push plugin', error));
      }
    });
  }
}
