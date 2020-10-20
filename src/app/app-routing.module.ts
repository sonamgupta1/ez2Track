import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [

  // {
  //   path: 'tdg-list', 
  //   redirectTo: 'tdg-list/0',
  //   pathMatch: 'full',

  // },
  {
    path: 'tdg-list',
    loadChildren: () => import('./tdg-list/tdg-list.module').then(m => m.TdgListPageModule),
  },
  {
    path: 'tdg-list/:counter',
    loadChildren: () => import('./tdg-list/tdg-list.module').then(m => m.TdgListPageModule),
  },
  {
    path: 'edit-tdg',
    loadChildren: () => import('./edit-tdg/edit-tdg.module').then(m => m.EditTdgPageModule)
  },
  {
    path: 'view-tdg',
    loadChildren: () => import('./view-tdg/view-tdg.module').then(m => m.ViewTdgPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: 'tdg-list',
    pathMatch: 'full',
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }


// const routes: Routes = [
//   { path: '', redirectTo: 'home/0', pathMatch: 'full' },
//   {
//     path: 'home/:counter',
//     loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
//   }
// ];