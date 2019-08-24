import { Platform } from '@ionic/angular';

import { SecureStorageServiceMock } from './secure-storage.service.mock';
import { SecureStorageService } from './secure-storage.service';

export function SecureStorageFactory(platform: Platform) {
  if (platform.is('cordova')) {
    return new SecureStorageService();
  } else {
    return new SecureStorageServiceMock();
  }
}
