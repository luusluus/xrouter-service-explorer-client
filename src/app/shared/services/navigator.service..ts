
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';


@Injectable()
export class NavigatorService{
  constructor(private router: Router) {}

  go(path: string) {
    this.router.navigate([path]);
  }

  serviceNodeDetails(name: string) {
    this.go('/xrouter-snodes/' + name);
  }

  spvWalletDetails(name: string) {
    this.go('/spv-wallets/' + name);
  }

  xCloudServiceDetails(name: string) {
    this.go('/xcloud-services/' + name);
  }
}
