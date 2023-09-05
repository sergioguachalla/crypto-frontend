import {createStore, select, withProps} from '@ngneat/elf';

import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply, setEntities,
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
    cryptoStore.update(addEntities({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      currentPrice: crypto.currentPrice,
      status: crypto.status
    })
    );
    console.log(crypto);
  }

  setCryptos(cryptos: Cryptocurrency[]) {
    console.log(cryptos);
    cryptoStore.update(setEntities(cryptos));

  }
  updateCryptoCurrency( crypto: Cryptocurrency) {
   cryptoStore.update((state => ({
      ...state,
     crypto
   })));
    //cryptoStore.update(updateEntities([crypto.id], (entity) => ({...entity, currentPrice: crypto.currentPrice})));
  }

  deleteCryptoCurrency(crypto: Cryptocurrency) {
    cryptoStore.update(updateEntities(crypto.id, (entity) => ({...entity, status: false})));

  }

}









