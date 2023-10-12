import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SafePipeModule } from 'safe-pipe';
import { MomentModule } from 'ngx-moment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomLoader } from './_core/_helper/custom-loader';
import { LoginComponent } from './views/login/login.component';
import { AuthService } from './_core/_service/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { AutoLogoutService } from './_core/_service/apply-orders/auto-log-off.service';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthGuard } from './_core/_guards/auth.guard';
import { AlertifyService} from 'herr-core';
import { VersionCheckService } from './_core/_service/version-check.service';
import { ErrorInterceptorProvider } from './_core/_helper/error.interceptor';
import { CommonModule, DatePipe, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { DashboardService } from './_core/_service/dashboard.service';
import { BasicAuthInterceptor } from './_core/_helper/basic-auth.interceptor';
import { CoreModule } from './_core/core.module';
import { sysConfInitializer } from './_core/_helper/sysConfInitializer';
import { SystemConfigService } from './_core/_service/systemconfig.service';
import { appInitializer } from './_core/_helper/appInitializer';

let lang = localStorage.getItem('lang');
if (!lang) {
  localStorage.setItem('lang', 'tw');
  lang = localStorage.getItem('lang');
}
export function tokenGetter() {
  const token = localStorage.getItem('token');
  let pattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
  let result = pattern.test(token);
  if (result) {
    return token;
  }
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('refresh-token');
  localStorage.removeItem('login-event');
  localStorage.removeItem('functions');
  localStorage.removeItem('menuItem');
  localStorage.removeItem('farmGuid');
  localStorage.removeItem('menus');
  return '';
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    HttpClientModule,
    SafePipeModule,
    CoreModule,
    CommonModule,
    MomentModule,
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useClass: CustomLoader},
      defaultLanguage: lang
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter
      }
    }),
  ],
  providers: [
    AutoLogoutService,
    NgbTooltipConfig,
    AuthGuard,
    AlertifyService,
    VersionCheckService,
    ErrorInterceptorProvider,
    AuthService,
    DatePipe,
    DashboardService,
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
