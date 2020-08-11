import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellerComponent } from './seller/seller.component';
import { SellerlistComponent } from './sellerlist/sellerlist.component';
import { EditsellerComponent } from './editseller/editseller.component';

const routes: Routes = [
    {path: 'sellerform', component:SellerComponent },
    {path: 'sellerlist', component:SellerlistComponent },
    { path: 'edit/:id', component: EditsellerComponent },
    { path: '', redirectTo: '/sellerlist', pathMatch: 'full' },
    // redirects "invalid" urls
    { path: '**', redirectTo: '/sellerlist', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
