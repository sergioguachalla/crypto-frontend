import { createStore, select } from '@ngneat/elf';

import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply,
  updateEntities, withEntities,
} from '@ngneat/elf-entities';
import {Injectable} from "@angular/core";


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
  cryptos$ = cryptoStore.pipe(selectAllEntities());


}

