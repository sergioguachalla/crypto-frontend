import {createStore, select, setProp, setProps, withProps} from '@ngneat/elf';
import {InvestmentPosition} from "../model/investmentPosition";
import {
  addEntities,
  selectAllEntities,
  selectAllEntitiesApply, setEntities,
  updateEntities, upsertEntities, withEntities,
} from '@ngneat/elf-entities';

import {inject, Injectable} from "@angular/core";

import {Cryptocurrency} from "../model/cryptocurrency";
import {ApiResponse, Paginator} from "../model/paginator";
import {Portfolio} from "../model/portfolio";


export interface PortfolioProps {
  totalElements: number;
  totalPages: number;
  currentPage: number;
}

const store = createStore(
  {name : 'portfolio'},
  withEntities<Portfolio>(),
  withProps<PortfolioProps>({totalElements: 0, totalPages: 0, currentPage: 0}),
);

@Injectable({ providedIn: 'root' })
export class PortfolioRepository {
  portfolio$ = store.pipe(selectAllEntities());

  getPortfolioProps(){
    return store.query((state) => state);
  }

  setPortfolio(response: Paginator<Portfolio>) {
    store.update(setEntities(response.content),
      setProps({
        totalElements: response.totalElements,
        totalPages: response.totalPages,
        currentPage: response.number
      }));
  }
}
