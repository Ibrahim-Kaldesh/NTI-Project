import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppHomeComponent } from './Pages/app-home/app-home.component';
import { UserHomeComponent } from './Pages/user-home/user-home.component';
import { AdminHomeComponent } from './Pages/admin-home/admin-home.component';
import { LogInComponent } from './Pages/log-in/log-in.component';
import { SignUpComponent } from './Pages/sign-up/sign-up.component';
import { SingleUserComponent } from './Pages/single-user/single-user.component';
import { AllUsersComponent } from './Pages/all-users/all-users.component';
import { AllBooksComponent } from './Pages/all-books/all-books.component';
import { ActiveUsersComponent } from './Pages/active-users/active-users.component';
import { InactiveUsersComponent } from './Pages/inactive-users/inactive-users.component';
import { ShowUserProfileComponent } from './Pages/show-user-profile/show-user-profile.component';
import { ChangePasswordComponent } from './Pages/change-password/change-password.component';
import { WishListBooksComponent } from './Pages/wish-list-books/wish-list-books.component';

const routes: Routes = [
  { path: '', component: AppHomeComponent },
  { path: 'user-home', component: UserHomeComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'log-in', component: LogInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'show-single-user', component: SingleUserComponent },
  { path: 'allUsers', component: AllUsersComponent },
  { path: 'active', component: ActiveUsersComponent },
  { path: 'inactive', component: InactiveUsersComponent },
  { path: 'show-profile', component: ShowUserProfileComponent },
  { path: 'change-password', component: ChangePasswordComponent },
  { path: 'allbooks', component: AllBooksComponent },
  { path: 'wishlistBooks', component: WishListBooksComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
