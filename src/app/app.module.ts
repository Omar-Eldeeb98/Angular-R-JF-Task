import { MyhttpInterceptor } from './interceptors/myhttp.interceptor';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChartModule } from 'angular-highcharts';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { CustomergraphComponent } from './pages/customergraph/customergraph.component';
import { FilterByCustomerNamePipe } from './pipes/filter-by-customer-name.pipe';
import { FilterByTransactionAmountPipe } from './pipes/filter-by-transaction-amount.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CustomergraphComponent,
    FilterByCustomerNamePipe,
    FilterByTransactionAmountPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartModule,
    HttpClientModule,
    FormsModule,
    NgxSpinnerModule,
  ],

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyhttpInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
