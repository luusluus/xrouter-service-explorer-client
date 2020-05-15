import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { AppComponent } from './app.component';


import { MyServiceNodesModule } from './my-service-nodes/my-service-nodes.module';
import { CommentsModule } from './comments/comments.module';
import { StatisticsModule } from './statistics/statistics.module';
import { BlocknetCommonModule } from './blocknet-common/blocknet-common.module';
import { XrouterModule } from './xrouter/xrouter.module';
import { XCloudModule } from './xcloud/xcloud.module';
import { UtxoModule } from './utxo/utxo.module';
import { SnodeModule } from './snode/snode.module';
import { HttpRequestTimeInterceptor } from './interceptors/http-responsetime-logging.interceptor';
import { TabsModule } from './ui/tabs/tabs.module';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorModule } from './core/error/error.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchModule } from './ui/search/search.module';
import { AuthenticationModule } from './core/authentication/authentication.module';
import { RouterModule } from '@angular/router';




// const appInitializerFn = (appConfig: ConfigurationService) => {
//   return () => {
//     return appConfig.loadConfig();
//   };
// }
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
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
    CommentsModule,
    StatisticsModule,
    
    XrouterModule,
    XCloudModule,
    SnodeModule,
    UtxoModule,

    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ], { 
      useHash: true,
      onSameUrlNavigation: 'reload',
      anchorScrolling: 'enabled'
    }),
  ],
  providers: [
    // {
      //   provide: HTTP_INTERCEPTORS,
      //   useClass: HttpErrorInterceptor,
      //   multi: true
      // },
      // ConfigurationService, 
      // {
      //   provide: APP_INITIALIZER,
      //   useFactory: checkIfUserIsAuthenticated,
      //   multi: true,
      //   deps: [AccountService]
      // },
      HttpRequestTimeInterceptor
  ],
  bootstrap: [AppComponent]  
})
export class AppModule {}
