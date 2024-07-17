import { Router } from '@angular/router';
import { Compineddata } from './../../model/compineddata';
import { Transaction } from 'src/app/model/transaction';
import { Customer } from './../../model/customer';
import { CustomerstransactionsService } from './../../services/customerstransactions.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  //^ ========================= constructor =======================
  constructor(
    private _CustomerstransactionsService: CustomerstransactionsService,
    private _Router: Router
  ) {}

  //^ ========================= Properties =======================
  customers: Customer[] = [];
  transactions: Transaction[] = [];
  compinedData: Compineddata[] = [];

  selectedCustomerId: number = 0;

  curPage!: number;
  pageSize!: number;

  //^ filtering pipes properties =======================
  filterCustomerName: string = '';
  filterTransactionAmount!: number;

  //^ ========================= Methods =======================
  ngOnInit(): void {
    this.handleCustomers();
    this.handleTransactions();
    this.handleCompinedData();

    this.curPage = 1;
    this.pageSize = 5; //& u can change this value if you want
  }

  numberOfPages() {
    return Math.ceil(this.compinedData.length / this.pageSize);
  }

  handleCustomers(): void {
    this._CustomerstransactionsService.getCustomers().subscribe({
      next: (response) => {
        this.customers = response;
        console.log('customers', this.customers);
      },
      error: () => {},
    });
  }

  handleTransactions(): void {
    this._CustomerstransactionsService.getTransactions().subscribe({
      next: (response) => {
        this.transactions = response;
        console.log('transactions', this.transactions);
      },
      error: () => {},
    });
  }

  handleCompinedData(): void {
    this._CustomerstransactionsService.getCombinedData().subscribe({
      next: (response) => {
        this.compinedData = response;
        console.log('compined data ', response); //? just for testing
      },
      error: () => {},
    });
  }

  handleSpeCificTransactions(customerId: number): void {
    Swal.fire({
      title: `Customer's Transactions Chart ? `,
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: 'Watch',
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Welcome!', '', 'success');
        this._Router.navigate(['graph/', customerId]);
      } else if (result.isDenied) {
        Swal.fire('Action Is Canceled', '', 'info');
        this.selectedCustomerId = 0;
      }
    });
  }
}
