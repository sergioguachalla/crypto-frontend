import {Component, inject} from '@angular/core';
import {PortfolioService} from "../../services/portfolio.service";
import {PortfolioRepository} from "../../repository/portfolioRepository";

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {
  portfolioService: PortfolioService = inject(PortfolioService);
  portfolioRepository: PortfolioRepository = inject(PortfolioRepository);
  portfolio$ = this.portfolioRepository.portfolio$;
  maxSize : number = 0;

  constructor() {
  }

  ngOnInit() {

  }
}
