import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';


import { AppComponent } from './app.component';

import { MyServiceNodesModule } from './my-service-nodes/my-service-nodes.module';
import { BlocknetCommonModule } from './blocknet-common/blocknet-common.module';
import { UtxoModule } from './utxo/utxo.module';
import { TabsModule } from './ui/tabs/tabs.module';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorModule } from './core/error/error.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchModule } from './ui/search/search.module';
import { AuthenticationModule } from './core/authentication/authentication.module';
import { BlocknetService } from './blocknet-common/shared/services/blocknet.service';

import { AppRoutingModule } from './app-routing.module';
import { BreadcrumbModule } from './ui/breadcrumb/breadcrumb.module';

// const appInitializerFn = (appConfig: ConfigurationService) => {
//   return () => {
//     return appConfig.loadConfig();
//   };
// }
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    NgxPaginationModule,
        
    AuthenticationModule,
    ErrorModule,
    TabsModule,
    SearchModule,
    BlocknetCommonModule,
    
    MyServiceNodesModule,
    // CommentsModule,
    
    UtxoModule,
    
    AppRoutingModule,
    BreadcrumbModule,
  ],
  providers: [
      BlocknetService,
      // { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]  
})
export class AppModule {}
