import {createStore, select, withProps} from '@ngneat/elf';

import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply,
  updateEntities, upsertEntities, withEntities,
} from '@ngneat/elf-entities';
import {inject, Injectable} from "@angular/core";

import {Cryptocurrency} from "../model/cryptocurrency";


export interface CryptoProps {
  name: string;


}


const cryptoStore = createStore(
  {name : 'cryptoStore'},
  withEntities<Cryptocurrency>(),
  withProps<CryptoProps>({name: ''})
);

@Injectable({ providedIn: 'root' })
export class CryptocurrencyRepository {


  cryptos$ = cryptoStore.pipe(selectAllEntities());

  addCryptoCurrency(crypto: Cryptocurrency) {
    cryptoStore.update(addEntities(crypto));
  }

  setCryptos(cryptos: Cryptocurrency[]) {
    console.log(cryptos);
    cryptoStore.update(addEntities(cryptos));
  }

}









