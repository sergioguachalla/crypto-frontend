import { createStore, select } from '@ngneat/elf';

import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply,
  updateEntities, withEntities,
} from '@ngneat/elf-entities';
import {inject, Injectable} from "@angular/core";

import {ApiResponse} from "../model/apiResponse";
import {Cryptocurrency} from "../model/cryptocurrency";
import {Observable} from "rxjs";



const cryptoStore = createStore(
  {name : 'cryptoStore'},
  withEntities<Cryptocurrency>()
);

@Injectable({ providedIn: 'root' })
export class CryptocurrencyRepository {



  cryptos$ = cryptoStore.pipe(selectAllEntities());


  addCryptoCurrency(crypto: Cryptocurrency) {
    cryptoStore.update(addEntities([crypto]));

  }




  setCryptos(cryptos: Cryptocurrency[]) {
    console.log(cryptos);
    cryptoStore.update(addEntities(cryptos));
  }

}









