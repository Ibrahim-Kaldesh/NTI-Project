import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { BookCardComponent } from './Components/book-card/book-card.component';
import { UserCardComponent } from './Components/user-card/user-card.component';
import { AppHomeComponent } from './Pages/app-home/app-home.component';
import { UserHomeComponent } from './Pages/user-home/user-home.component';
import { AdminHomeComponent } from './Pages/admin-home/admin-home.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { LogInComponent } from './Pages/log-in/log-in.component';
import { SingleUserComponent } from './Pages/single-user/single-user.component';
import { ActiveUsersComponent } from './Pages/active-users/active-users.component';
import { InactiveUsersComponent } from './Pages/inactive-users/inactive-users.component';
import { AllUsersComponent } from './Pages/all-users/all-users.component';
import { ShowUserProfileComponent } from './Pages/show-user-profile/show-user-profile.component';
import { AllBooksComponent } from './Pages/all-books/all-books.component';
import { WishListBooksComponent } from './Pages/wish-list-books/wish-list-books.component';
import { ChangePasswordComponent } from './Pages/change-password/change-password.component';
import { AdminNavbarComponent } from './Components/admin-navbar/admin-navbar.component';
import { UserNavbarComponent } from './Components/user-navbar/user-navbar.component';
import { HomeNavbarComponent } from './Components/home-navbar/home-navbar.component';
import { FooterComponent } from './Components/footer/footer.component';
@NgModule({
  declarations: [
    AppComponent,
    BookCardComponent,
    UserCardComponent,
    AppHomeComponent,
    UserHomeComponent,
    AdminHomeComponent,
    SignUpComponent,
    LogInComponent,
    SingleUserComponent,
    ActiveUsersComponent,
    InactiveUsersComponent,
    AllUsersComponent,
    ShowUserProfileComponent,
    AllBooksComponent,
    WishListBooksComponent,
    ChangePasswordComponent,
    AdminNavbarComponent,
    UserNavbarComponent,
    HomeNavbarComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
