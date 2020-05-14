import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountService } from './shared/services/account.service';
import { AuthGuard } from './auth.guard';

@NgModule({
  imports: [
    
  ],
  declarations: [
    
  ],
  providers: [
    AccountService,
    AuthGuard
  ]
})
export class AuthenticationModule { }
