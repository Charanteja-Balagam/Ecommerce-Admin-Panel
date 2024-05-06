import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { InventoryComponent } from './components/inventory/inventory.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SalesComponent } from './components/sales/sales.component';
import { CustomersComponent } from './components/customers/customers.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [

    {path:'', component:LoginComponent},
    {path:'register', component: RegisterComponent},
    {
        path:'dashboard', 
        component:DashboardComponent, canActivate:[authGuard],
        children:[
            { path:'home',  component:HomeComponent },
            { path:'products',  component:ProductsComponent },
            { path:'inventory',  component:InventoryComponent },
            { path:'orders',  component:OrdersComponent },
            { path:'sales',  component:SalesComponent },
            { path:'customers',  component:CustomersComponent}
        ]
    }
];
