import { createStore, select } from '@ngneat/elf';

import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply,
  updateEntities, withEntities,
} from '@ngneat/elf-entities';
import {inject, Injectable} from "@angular/core";
import {CryptoService} from "../services/crypto.service";

interface Cryptocurrency {
  id: number;
  name: string;
  symbol: string;
  currentPrice: number;

}

const cryptoStore = createStore(
  {name : 'cryptoStore'},
  withEntities<Cryptocurrency>()
);

@Injectable({ providedIn: 'root' })
export class CryptocurrencyRepository {

  cryptoService: CryptoService = inject(CryptoService);

  cryptos$ = this.cryptoService.getAllCryptocurrencies()


  addCryptoCurrency(crypto: Cryptocurrency) {
    cryptoStore.update(addEntities([crypto]));

  }

  getAllCryptocurrencies() {
    return this.cryptoService.getAllCryptocurrencies().subscribe((data: Cryptocurrency[]) => {
      cryptoStore.update(addEntities(data));
      console.log(data);
    }
    );


  }
}

