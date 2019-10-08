import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ClipboardModule} from 'ngx-clipboard';
import {SelectModule} from 'ng2-select';
import {DataTableModule} from "angular5-data-table";
import {PaginationModule} from 'ngx-bootstrap/pagination';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  imports: [
    NgbModule,
    ClipboardModule,
    SelectModule,
    DataTableModule,
    PaginationModule,

ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    })
  ],
  exports: [
    NgbModule,
    ClipboardModule,
    SelectModule,
    DataTableModule,
    PaginationModule,
  ]
})
export class ThirdPartyModule { }
