import { EncryptStorage } from 'encrypt-storage';
import env from "../env.config";


class Storage {

  storeKey = env.STORE_KEY;
  storage = new EncryptStorage(this.storeKey);

  store(key: string, value: any) {
    this.storage.setItem(key, value);
  }

  retrieve(key: string) {
    return this.storage.getItem(key);
  }

}

export default Storage;