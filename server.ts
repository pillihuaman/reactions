import 'zone.js/node';
import { renderApplication } from '@angular/platform-server';
import { provideServerRendering } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './src/app/app.component';
import { appConfig } from './src/app/app.config';


// Function to bootstrap the app for SSR
const bootstrap = () => {
  return renderApplication(() => bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [provideServerRendering()]
  }), 
  {
    document: '<!doctype html><html><head></head><body><app-root></app-root></body></html>',
    url: '', // You can set a dynamic URL here if needed
    platformProviders: []
  });
};

export default bootstrap;
