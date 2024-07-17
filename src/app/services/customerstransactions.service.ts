import { Transaction } from 'src/app/model/transaction';
import { Compineddata } from './../model/compineddata';
import { Customer } from './../model/customer';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomerstransactionsService {
  constructor(private _HttpClient: HttpClient) {}

  // baseUrl: string = 'http://localhost:3000';  //? for local json server only

  baseUrl: string =
    'https://my-json-server.typicode.com/Omar-Eldeeb98/my-json-server';

  //!=============== get all customers ======================
  getCustomers(): Observable<Customer[]> {
    return this._HttpClient.get<Customer[]>(`${this.baseUrl}/customers`);
  }
  //!=============== get specific customer ======================
  getSpecificCustomers(id: number): Observable<Customer[]> {
    return this._HttpClient.get<Customer[]>(
      `${this.baseUrl}/customers?id=${id}`
    );
  }

  //! ================ get all transactions ====================
  getTransactions(): Observable<Transaction[]> {
    return this._HttpClient.get<Transaction[]>(`${this.baseUrl}/transactions`);
  }

  //!======================mix Transactions & Customers =================================================
  getCombinedData(): Observable<Compineddata[]> {
    return forkJoin([this.getCustomers(), this.getTransactions()]).pipe(
      map(([customers, transactions]) => {
        return transactions.map((transaction) => {
          const customer = customers.find(
            (c) => c.id == transaction.customer_id
          );
          return {
            transactionId: transaction.id,
            customerId: customer!.id,
            customerName: customer!.name,
            date: transaction.date,
            amount: transaction.amount,
          };
        });
      })
    );
  }
  //^============================ specific customer transactions =================
  getCustomerTransactions(customerId: number): Observable<Transaction[]> {
    return this._HttpClient.get<Transaction[]>(
      `${this.baseUrl}/transactions?customer_id=${customerId}`
    );
  }
}
