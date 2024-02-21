import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AllBooksComponent } from './pages/all-books/all-books.component';
import { RegisterComponent } from './pages/register/register.component';
import { AllBorrowersComponent } from './pages/all-borrowers/all-borrowers.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'all-books',
    component: AllBooksComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'all-borrowers',
    component: AllBorrowersComponent,
  },
];
