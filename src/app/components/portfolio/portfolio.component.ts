import {Component, inject, ViewChild} from '@angular/core';
import {PortfolioService} from "../../services/portfolio.service";
import {PortfolioRepository} from "../../repository/portfolioRepository";
import {MatTableDataSource} from "@angular/material/table";
import {Portfolio} from "../../model/portfolio";
import {KeycloakService} from "keycloak-angular";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {MatDialog} from "@angular/material/dialog";
import {BuySellDialogComponent} from "../buy-sell-dialog/buy-sell-dialog.component";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  portfolioService: PortfolioService = inject(PortfolioService);
  portfolioRepository: PortfolioRepository = inject(PortfolioRepository);
  keycloakService: KeycloakService = inject(KeycloakService);
  portfolio$ = this.portfolioRepository.portfolio$;
  maxSize : number = 0;
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dataSource: MatTableDataSource<Portfolio> = new MatTableDataSource<Portfolio>([]);
  displayedColumns = ['Id', 'Cryptocurrency', 'Symbol', 'Amount', 'USD Amount'];
  userId = this.keycloakService.getKeycloakInstance().subject;
  constructor(public dialog: MatDialog) {
  }

  ngOnInit() {
    this.portfolioService.getPortfolio(0, 5).subscribe();

    this.portfolio$
      .subscribe((response) => {
        const currencyProps = this.portfolioRepository.getPortfolioProps();
        this.maxSize = Number(currencyProps.totalElements);

        this.dataSource.data = response;
        console.log(this.dataSource.data);
      });
  }

  pageChangeEvent($event: PageEvent) {
    this.portfolioService.getPortfolio($event.pageIndex, 5).subscribe();
  }

  buyCryptoCurrencyDialog() {
    const dialogRef = this.dialog.open(BuySellDialogComponent,{
      data: {tittle: "Comprar",
        type: "BUY"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined){
        console.log(result);
      }
    }
    );

    }
}
