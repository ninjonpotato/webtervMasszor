import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "masszor-82d9e", appId: "1:399044799404:web:ce3760ec51c69f061fe809", storageBucket: "masszor-82d9e.firebasestorage.app", apiKey: "AIzaSyBvrzQh00PTAZGrFxTZCHssONVx02L2LBU", authDomain: "masszor-82d9e.firebaseapp.com", messagingSenderId: "399044799404" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore())]
};
