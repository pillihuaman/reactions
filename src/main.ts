
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app/app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { UserRepository } from './app/@domain/repository/repository/user.repository';
import { UserService } from './app/@data/services/user.service';
import { AuthenticationRepository } from './app/@domain/repository/repository/authentication.repository';
import { AuthenticationService } from './app/@data/services/authentication.service';
import { ChatService } from './app/@data/services/chat.service';
import { LocaleService } from './app/@data/services/locale.service';
import { ModalService } from './app/@data/services/modal.service';
import { SupportService } from './app/@data/services/support.service';
import { ChatRepository } from './app/@domain/repository/repository/chat.repository';
import { LocalRepository } from './app/@domain/repository/repository/local.repository';
import { SupportRepository } from './app/@domain/repository/repository/support.repository';
import { ApiService } from './app/@data/services/api.service';
import { ModalRepository } from './app/@domain/repository/repository/modal.repository ';
import { bootstrapApplication } from '@angular/platform-browser';
import { APP_INITIALIZER, importProvidersFrom, LOCALE_ID } from '@angular/core';
import { Const } from './app/utils/const';

import { MyHttpInterceptorInterceptor } from './app/@data/interceptors/my-http-interceptor.interceptor';
import { ErrorInterceptorInterceptor } from './app/@data/interceptors/error-interceptor.interceptor';
import { AppInterceptor } from './app/@data/interceptors/app.interceptor';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { registerLocaleData } from '@angular/common';
import localeEsPe from '@angular/common/locales/es-PE';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
export function initConfig(constService: Const) {
  return () => Promise.all([
    constService.loadCommonConfig(),
    constService.loadEntidadConfig() // Ensure this is called as well
  ]);
}
registerLocaleData(localeEsPe, 'es-PE');
bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideHttpClient(
      // registering interceptors
      withInterceptors([MyHttpInterceptorInterceptor, ErrorInterceptorInterceptor])
    ),
    provideAnimationsAsync(),
    importProvidersFrom(

      MatDatepickerModule,
      MatNativeDateModule, // Necesario para el soporte nativo de fechas
      MatInputModule,
      MatIconModule,
      MatFormFieldModule,  // ✅ Necesario  
      MatToolbarModule,
      MatButtonModule,
      MatToolbarModule,
      MatIconModule,
      MatInputModule,
      MatFormFieldModule,
      MatCardModule,
    ),
    Const,
    { provide: UserRepository, useClass: UserService },
    { provide: AuthenticationRepository, useClass: AuthenticationService },
    { provide: ModalRepository, useClass: ModalService },
    { provide: ChatRepository, useClass: ChatService },
    { provide: SupportRepository, useClass: SupportService },
    { provide: LocalRepository, useClass: LocaleService },
    { provide: APP_INITIALIZER, useFactory: initConfig, deps: [Const], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppInterceptor, multi: true },
    { provide: MAT_DATE_LOCALE, useValue: 'es-PE' }, // Esto puede ser cambiado dinámicamente
    { provide: LOCALE_ID, useValue: 'es-PE' },
    ApiService,
    provideAnimationsAsync(), provideAnimationsAsync(),
  ],
});