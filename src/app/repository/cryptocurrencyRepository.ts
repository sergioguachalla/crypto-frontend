import {createStore, select, setProp, setProps, withProps} from '@ngneat/elf';

import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply, setEntities,
  updateEntities, upsertEntities, withEntities,
} from '@ngneat/elf-entities';
import {inject, Injectable} from "@angular/core";

import {Cryptocurrency} from "../model/cryptocurrency";
import {ApiResponse, Paginator} from "../model/paginator";


export interface CryptoProps {
  totalElements: number;
  totalPages: number;
  currentPage: number;


}


const store = createStore(
  {name : 'cryptocurrency'},
  withEntities<Cryptocurrency>(),
  withProps<CryptoProps>({totalElements: 0, totalPages: 0, currentPage: 0}),
);

@Injectable({ providedIn: 'root' })
export class CryptocurrencyRepository {


  cryptos$ = store.pipe(selectAllEntities());

  getCurrencyProps(){
    return store.query((state) => state);
  }

  addCryptoCurrency(crypto: Cryptocurrency) {
    store.update(addEntities({
      id: crypto.id,
      name: crypto.name,
      symbol: crypto.symbol,
      currentPrice: crypto.currentPrice,
      status: crypto.status
    })
    );

    console.log(crypto);
  }

  setCryptos(response: Paginator<Cryptocurrency>) {

    store.update(setEntities(response.content),
      setProps({
        currentPage: response.number,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
      })
    );

  }

  updateCryptoCurrency( response: Paginator<Cryptocurrency>) {
   store.update((state => ({
      ...state,
     crypto
   })));
    //cryptoStore.update(updateEntities([crypto.id], (entity) => ({...entity, currentPrice: crypto.currentPrice})));
  }

  deleteCryptoCurrency(crypto: Cryptocurrency) {
    store.update(updateEntities(crypto.id, (entity) => ({...entity, status: false})));

  }

}









