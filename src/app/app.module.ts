import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';

import { AppComponent } from './app.component';

import { MyServiceNodesModule } from './my-service-nodes/my-service-nodes.module';
import { CommentsModule } from './comments/comments.module';
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
import { LoadingInterceptor } from './ui/spinner/interceptors/loading.interceptor';
import { SpinnerModule } from './ui/spinner/spinner.module';
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
    CommentsModule,
    
    UtxoModule,
    
    AppRoutingModule,
    BreadcrumbModule,
  ],
  providers: [
      // {
      //   provide: APP_INITIALIZER,
      //   useFactory: checkIfUserIsAuthenticated,
      //   multi: true,
      //   deps: [AccountService]
      // },
      // HttpRequestTimeInterceptor,
      BlocknetService,
  ],
  bootstrap: [AppComponent]  
})
export class AppModule {}
