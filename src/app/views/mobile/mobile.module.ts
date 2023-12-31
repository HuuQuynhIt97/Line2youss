import { SharedModule } from 'src/app/_core/commons/shared.module';
import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgendaService, DayService, MonthAgendaService, MonthService, ScheduleModule, WeekService, WorkWeekService } from '@syncfusion/ej2-angular-schedule';


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
// resolvers




// module
import { MobileComponent } from './mobile.component';
import { MobileRoutingModule } from './mobile-routing.module';
import { NgbModule, NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

import { DatePickerAllModule, TimePickerAllModule } from '@syncfusion/ej2-angular-calendars';

import { CoreDirectivesModule } from 'src/app/_core/_directive/core.directives.module';
import { MenuAllModule, SidebarModule, TreeViewAllModule } from '@syncfusion/ej2-angular-navigations';
import { LayoutComponent } from './layout/layout.component';
import { HomeComponent } from './home/home.component';

import { SigninScreenComponent } from './signin-screen/signin-screen.component';
import { environment } from 'src/environments/environment';
import { AccountScreenComponent } from './account-screen/account-screen.component';
import { LandlordProfileComponent } from './landlord-profile/landlord-profile.component';
import { LandlordDemoComponent } from './landlord-demo/landlord-demo.component';
import { LandlordLoginComponent } from './landlord-login/landlord-login.component';
import { LandlordRegisterComponent } from './landlord-register/landlord-register.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { CustomLoader } from 'src/app/_core/_helper/custom-loader';
import { FieldComponent } from './field/field.component';
import { FieldScreenDetailComponent } from './field/field-screen-detail/field-screen-detail.component';
import { BankAccountScreenComponent } from './account-screen/bank-account-screen/bank-account-screen.component';
import { BankAccountFinishScreenComponent } from './account-screen/bank-account-finish-screen/bank-account-finish-screen.component';
import { AlertScreenComponent } from './alert-screen/alert-screen.component';
import { ReportScreenComponent } from './report-screen/report-screen.component';
import { loadCldr, setCulture, L10n } from '@syncfusion/ej2-base';
import { LineUserLoginComponent } from './lineUser-login/lineUser-login.component';
import { LineUserLoginFailComponent } from './lineUser-login/lineUserLoginFail/lineUserLoginFail.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { ChatBoxDirective } from 'src/app/_core/_directive/chatBox.directive';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserBannerComponent } from './user-banner/user-banner.component';
import { MobileUserNewsComponent } from './mobile-user-news/mobile-user-news.component';
import { RichTextEditorModule } from '@syncfusion/ej2-angular-richtexteditor';
import { StoreProfileComponent } from './store-profile/store-profile.component';
import { MobileFooterComponent } from './mobile-footer/mobile-footer.component';
import { MenuCategoryComponent } from './menu-category/menu-category.component';
import { MenuListComponent } from './menu-list/menu-list.component';
import { UserContactComponent } from './user-contact/user-contact.component';
import { UserHelpComponent } from './user-help/user-help.component';
import { MobileCartOrderComponent } from './mobile-cart-order/mobile-cart-order.component';
import { CartOrderDetailComponent } from './mobile-cart-order/cart-order-detail/cart-order-detail.component';
import { Common2Module } from 'src/app/_core/commons/common2.module';
import { NavbarMobileComponent } from './layout/navbar-mobile/navbar-mobile.component';
import { DateRangePickerModule } from '@syncfusion/ej2-angular-calendars';
import { BackPreviousPageComponent } from './back-previous-page/back-previous-page.component';

let lang = localStorage.getItem('lang');
if (!lang) {
  localStorage.setItem('lang', 'tw');
  lang = localStorage.getItem('lang');
}
declare var require: any;
setCulture(lang == 'tw' || lang == 'cn' ? 'zh' : lang);
let languages = JSON.parse(localStorage.getItem('languages'));

let load = {
  [lang]: {
    grid: languages['grid'],
    pager: languages['pager'],
    dropdowns: languages['dropdownlist'],
    schedule: languages['schedule']
  }
};
L10n.load(load);
loadCldr(
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/main/en/ca-gregorian.json'),
  require('cldr-data/main/en/numbers.json'),
  require('cldr-data/main/en/timeZoneNames.json'),
  require('cldr-data/supplemental/weekdata.json')); 

loadCldr(
  require('cldr-data/supplemental/numberingSystems.json'),
  require('cldr-data/main/zh/ca-gregorian.json'),
  require('cldr-data/main/zh/numbers.json'),
  require('cldr-data/main/zh/timeZoneNames.json'),
  require('cldr-data/supplemental/weekdata.json')); 

  loadCldr(
    require('cldr-data/supplemental/numberingSystems.json'),
    require('cldr-data/main/vi/ca-gregorian.json'),
    require('cldr-data/main/vi/numbers.json'),
    require('cldr-data/main/vi/timeZoneNames.json'),
    require('cldr-data/supplemental/weekdata.json'));
import { NgxDropzoneModule } from 'ngx-dropzone';
import { HomeStoreMobilePreviewComponent } from './home-store-mobile-preview/home-store-mobile-preview.component';
// import { SwiperModule } from 'swiper/angular';
import SwiperModule from 'swiper';
import { MobileRestaurantrightsidebarComponent } from './mobile-restaurantrightsidebar/mobile-restaurantrightsidebar.component';
import { HomeStoreAddMoreComponent } from './home-store-add-more/home-store-add-more.component';
import { BarcodeGeneratorAllModule,  } from '@syncfusion/ej2-angular-barcode-generator';
import { QRCodeGeneratorAllModule } from '@syncfusion/ej2-angular-barcode-generator';
import { AdminAddRestaurantComponent } from './admin-add-restaurant/admin-add-restaurant.component';
import { AdminUpdateRestaurantComponent } from './admin-add-restaurant/admin-update-restaurant/admin-update-restaurant.component';
import { StoreTableComponent } from './store-table/store-table.component';
import { HomeBossUpdateRestaurantComponent } from './home/home-boss-update-restaurant/home-boss-update-restaurant.component';
import { HomeBossCartComponent } from './home/home-boss-cart/home-boss-cart.component';
import { PigfarmCoreModule } from 'dist/pigfarm-core/public-api';
// import {MatFormFieldModule} from '@angular/material/form-field';
// import {MatChipsModule} from '@angular/material/chips';
// import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { QRCodeModule } from 'angularx-qrcode';
@NgModule({
  declarations: [
    MobileComponent,
    LayoutComponent,
    HomeComponent,
    SigninScreenComponent,
    AccountScreenComponent,
    LandlordProfileComponent,
    LandlordDemoComponent,
    LandlordLoginComponent,
    LandlordRegisterComponent,
    FieldComponent,
    FieldScreenDetailComponent,
    BankAccountScreenComponent,
    BankAccountFinishScreenComponent,
    AlertScreenComponent,
    ReportScreenComponent,
    LineUserLoginComponent,
    LineUserLoginFailComponent,
    SendMessageComponent,
    UserProfileComponent,
    UserBannerComponent,
    MobileUserNewsComponent,
    StoreProfileComponent,
    MobileFooterComponent,
    MenuCategoryComponent,
    MenuListComponent,
    UserContactComponent,
    UserHelpComponent,
    MobileCartOrderComponent,
    CartOrderDetailComponent,
    NavbarMobileComponent,
    BackPreviousPageComponent,
    HomeStoreMobilePreviewComponent,
    MobileRestaurantrightsidebarComponent,
    HomeStoreAddMoreComponent,
    AdminAddRestaurantComponent,
    AdminUpdateRestaurantComponent,
    StoreTableComponent,
    HomeBossUpdateRestaurantComponent,
    HomeBossCartComponent
    // CoreDirectivesModule
    // ChatBoxDirective
    
  ],
  imports: [
    CommonModule,
    QRCodeModule,
    // MatFormFieldModule,
    // MatAutocompleteModule,
    // MatChipsModule,
    // MaterialModule,
    BarcodeGeneratorAllModule,
    NgxDropzoneModule,
    FormsModule,
    QRCodeGeneratorAllModule,
    ReactiveFormsModule,
    DateRangePickerModule,
    NgxSpinnerModule,
    MobileRoutingModule,
    NgbModule,
    DatePickerAllModule,
    RichTextEditorModule,
    CoreDirectivesModule,
    SidebarModule,
    MenuAllModule,
    TimePickerAllModule,
    ScheduleModule,
    Common2Module.forRoot(),
    SharedModule.forRoot(),
    TranslateModule.forRoot({
      loader: {provide: TranslateLoader, useClass: CustomLoader},
      defaultLanguage: lang
    }),
    PigfarmCoreModule.forRoot(environment.apiUrl)
  ],
  providers: [
    DatePipe,
    DayService, 
    WeekService, 
    WorkWeekService, 
    MonthService,
    AgendaService,
    MonthAgendaService
  ]
})
export class MobileModule {
}
