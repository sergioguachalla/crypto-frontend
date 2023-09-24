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

export interface UIState {
  loading: boolean;
  error: string | null;
}


const store = createStore(
  {name : 'cryptocurrency'},
  withEntities<Cryptocurrency>(),
  withProps<CryptoProps>({totalElements: 0, totalPages: 0, currentPage: 0}),
  withProps<UIState>({loading: false, error: null}),
);

@Injectable({ providedIn: 'root' })
export class CryptocurrencyRepository {


  cryptos$ = store.pipe(selectAllEntities());

  getCurrencyProps(){
    return store.query((state) => state);
  }

  getUIState(){
    return store.query((state) => state);
  }

  setUIState(isLoading: boolean, error: string | null) {
    store.update(setProps({
      loading: isLoading,
      error: error
    }));

  }

  setCryptos(response: Paginator<Cryptocurrency>) {

    store.update(setEntities(response.content),
      setProps({
        currentPage: response.number,
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        loading: false
      })

    );

  }


}









