import { Customer } from './../../model/customer';
import { Compineddata } from './../../model/compineddata';
import { CustomerstransactionsService } from './../../services/customerstransactions.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Transaction } from 'src/app/model/transaction';
import { Chart } from 'angular-highcharts';
import { filter } from 'rxjs';

@Component({
  selector: 'app-customergraph',
  templateUrl: './customergraph.component.html',
  styleUrls: ['./customergraph.component.scss'],
})
export class CustomergraphComponent implements OnInit {
  //^ constructor
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _CustomerstransactionsService: CustomerstransactionsService,
    private _Router: Router
  ) {
    const paramID = this._ActivatedRoute.snapshot.params['id'];

    // this._CustomerstransactionsService.getCombinedData().pipe().subscribe();

    this._CustomerstransactionsService
      .getCustomerTransactions(paramID)
      .subscribe({
        next: (response) => {
          console.log(response); //? just for test
          this.cusTran = response;
          this.dates = this.cusTran.map((date) => date.date);
          console.log(this.dates); //? just for test

          this.amounts = this.cusTran.map((amount) => amount.amount);
          console.log(this.amounts); //? just for test

          this.showData();
        },
        error: (error) => {
          console.log(error); //? just for test
        },
      });
  }

  //^ properties
  cusTran: Transaction[] = [];
  dates!: any[];
  amounts!: any[];
  testChart!: Chart;

  customer!: Customer[];

  //^ methods
  ngOnInit(): void {
    const paramID = this._ActivatedRoute.snapshot.params['id'];
    this._CustomerstransactionsService.getSpecificCustomers(paramID).subscribe({
      next: (response) => {
        this.customer = response;
      },
    });
  }
  showData(): void {
    this.testChart = new Chart({
      title: {
        text: 'Customer Total Amout Of Transactions Per Day',
      },
      xAxis: {
        categories: this.dates,
      },
      yAxis: {
        title: {
          text: 'Amounts',
        },
      },
      series: [
        {
          type: 'line',
          data: this.amounts,
          name: 'Transaction Amount Per Day',
        },
      ],
    });
  }

  goBack(): void {
    this._Router.navigate(['/home']); //? go back to customers list page
  }
}
