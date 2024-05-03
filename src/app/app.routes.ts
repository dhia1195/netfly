import { Route } from '@angular/router';
import { initialDataResolver } from 'app/app.resolvers';
import { AuthGuard } from 'app/core/auth/guards/auth.guard';
import { NoAuthGuard } from 'app/core/auth/guards/noAuth.guard';
import { LayoutComponent } from 'app/layout/layout.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ResolverS } from './service/resolveS.service';
import { ProfileComponent } from './profile/profile.component';
import { ResolverE } from './service/resolveE.service';
import { DeconnexionComponent } from './deconnexion/deconnexion.component';
import { EmployeComponent } from './employe/employe.component';
import { ResolverA } from './service/resolveA.service';
import { ListReclamationComponent } from './modules/admin/dashboards/list-reclamation/list-reclamation.component';
import { AddReclamationComponent } from './modules/admin/dashboards/add-reclamation/add-reclamation.component';
import { UpdateReclamationComponent } from './modules/admin/dashboards/update-reclamation/update-reclamation.component';
import { UpdateOffreComponent } from './modules/admin/dashboards/update-offre/update-offre.component';
import { ListOffreComponent } from './modules/admin/dashboards/list-offre/list-offre.component';
import { AddOffreComponent } from './modules/admin/dashboards/add-offre/add-offre.component';
import { AddClientsComponent } from './modules/admin/dashboards/add-clients/add-clients.component';
import { AddVentesComponent } from './modules/admin/dashboards/add-ventes/add-ventes.component';
import { ListClientsComponent } from './modules/admin/dashboards/list-clients/list-clients.component';
import { ListeVentesComponent } from './modules/admin/dashboards/liste-ventes/liste-ventes.component';
import { UpdateClientsComponent } from './modules/admin/dashboards/update-clients/update-clients.component';
import { UpdateVentesComponent } from './modules/admin/dashboards/update-ventes/update-ventes.component';
import { AddachatComponent } from './modules/admin/dashboards/addachat/addachat.component';
import { AddfournisseurComponent } from './modules/admin/dashboards/addfournisseur/addfournisseur.component';
import { ListachatComponent } from './modules/admin/dashboards/listachat/listachat.component';
import { ListefournisseurComponent } from './modules/admin/dashboards/listefournisseur/listefournisseur.component';
import { UpdateachatComponent } from './modules/admin/dashboards/updateachat/updateachat.component';
import { UpdatefournisseurComponent } from './modules/admin/dashboards/updatefournisseur/updatefournisseur.component';
import { ListProduitsComponent } from './modules/admin/dashboards/list-produits/list-produits.component';
import { ResolverAE } from './service/resolverAE.service';
import { FactureComponent } from './modules/admin/dashboards/facture/facture.component';
import { ZegocloudComponent } from './modules/admin/dashboards/zegocloud/zegocloud.component';
import { CalendarComponent } from './calendar/calendar.component';
import { ChatgeminiComponent } from './chatgemini/chatgemini.component';
import { ListFacturesComponent } from './modules/admin/dashboards/list-factures/list-factures.component';

// @formatter:off
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
export const appRoutes: Route[] = [

    // Redirect empty path to '/dashboards/project'
    {path: '', pathMatch : 'full', redirectTo: 'dashboards/project'},

    // Redirect signed-in user to the '/dashboards/project'
    //
    // After the user signs in, the sign-in page will redirect the user to the 'signed-in-redirect'
    // path. Below is another redirection for that path to redirect the user to the desired
    // location. This is a small convenience to keep all main routes together here on this file.
    {path: 'signed-in-redirect', pathMatch : 'full', redirectTo: 'dashboards/project'},
    {path:"deconnexion",component:DeconnexionComponent},
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
            condition:ResolverE
        },
         children: [
        {path: 'profileE', component:ProfileComponent},
        
       
        
    ]}

    ,
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
            condition:ResolverA
        },
         children: [
        {path: 'listemployeA', component:EmployeComponent},
       
        
    ]}

    ,
    
    {
        path: '',
        resolve : {condition:ResolverS},
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'inscription', component : InscriptionComponent},
            {path: 'login', component : ConnexionComponent}
        ]
    },

    // Auth routes for guests
    {
        path: '',
        canActivate: [NoAuthGuard],
        canActivateChild: [NoAuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'confirmation-required', loadChildren: () => import('app/modules/auth/confirmation-required/confirmation-required.routes')},
            {path: 'forgot-password', loadChildren: () => import('app/modules/auth/forgot-password/forgot-password.routes')},
            {path: 'reset-password', loadChildren: () => import('app/modules/auth/reset-password/reset-password.routes')},
            {path: 'sign-in', loadChildren: () => import('app/modules/auth/sign-in/sign-in.routes')},
            {path: 'sign-up', loadChildren: () => import('app/modules/auth/sign-up/sign-up.routes')},
            
        ]
    },

    // Auth routes for authenticated users
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'sign-out', loadChildren: () => import('app/modules/auth/sign-out/sign-out.routes')},
            {path: 'unlock-session', loadChildren: () => import('app/modules/auth/unlock-session/unlock-session.routes')}
        ]
    },

    // Landing routes
    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [
            {path: 'home', loadChildren: () => import('app/modules/landing/home/home.routes')},
        ]
    },

    // Admin routes
    {
        path: '',
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        component: LayoutComponent,
        resolve: {
            initialData: initialDataResolver,
            condition:ResolverAE
        },
        children: [
           
            // Dashboards
            {path: 'dashboards', children: [
                {path: 'project', loadChildren: () => import('app/modules/admin/dashboards/project/project.routes')},
                {path: 'analytics', loadChildren: () => import('app/modules/admin/dashboards/analytics/analytics.routes')},
                {path: 'finance', loadChildren: () => import('app/modules/admin/dashboards/finance/finance.routes')},
                {path: 'crypto', loadChildren: () => import('app/modules/admin/dashboards/crypto/crypto.routes')},
                { path: 'listreclamation', component:ListReclamationComponent },
                { path: 'addrec', component:AddReclamationComponent },
                { path: 'updaterec/:id', component: UpdateReclamationComponent },
                { path: 'updateoffre/:id', component: UpdateOffreComponent },
                { path: 'listoffre', component:ListOffreComponent },
                { path: 'addoffre', component:AddOffreComponent },
                { path: 'addclients', component:AddClientsComponent },
                { path: 'addventes', component:AddVentesComponent },
                { path: 'listclients', component:ListClientsComponent },
                { path: 'listventes', component:ListeVentesComponent },
                { path: 'updateclients/:id', component:UpdateClientsComponent },
                { path: 'updateventes/:id', component:UpdateVentesComponent },
                { path: 'addachats', component:AddachatComponent },
                { path: 'addfournisseurs', component:AddfournisseurComponent },
                { path: 'listachats', component:ListachatComponent },
                { path: 'listfournisseurs', component:ListefournisseurComponent },
                { path: 'updateachats/:id', component:UpdateachatComponent },
                { path: 'updatefournisseurs/:id', component:UpdatefournisseurComponent },
                { path: 'listproduits', component:ListProduitsComponent },
                { path: 'listfactures', component:ListFacturesComponent },
                { path: 'facture', component:FactureComponent },
                {path:'meeting', component:ZegocloudComponent},
                { path: 'calendar', component:CalendarComponent },
                { path: 'chatgemini', component:ChatgeminiComponent },


    
                
            ]},

            // App
            {path: 'apps', children: [
                {path: 'academy', loadChildren: () => import('app/modules/admin/apps/academy/academy.routes')},
                {path: 'chat', loadChildren: () => import('app/modules/admin/apps/chat/chat.routes')},
                {path: 'contacts', loadChildren: () => import('app/modules/admin/apps/contacts/contacts.routes')},
                {path: 'ecommerce', loadChildren: () => import('app/modules/admin/apps/ecommerce/ecommerce.routes')},
                {path: 'file-manager', loadChildren: () => import('app/modules/admin/apps/file-manager/file-manager.routes')},
                {path: 'help-center', loadChildren: () => import('app/modules/admin/apps/help-center/help-center.routes')},
                {path: 'mailbox', loadChildren: () => import('app/modules/admin/apps/mailbox/mailbox.routes')},
                {path: 'notes', loadChildren: () => import('app/modules/admin/apps/notes/notes.routes')},
                {path: 'scrumboard', loadChildren: () => import('app/modules/admin/apps/scrumboard/scrumboard.routes')},
                {path: 'tasks', loadChildren: () => import('app/modules/admin/apps/tasks/tasks.routes')},
            ]},

            // Pages
            {path: 'pages', children: [

                // Activities
                {path: 'activities', loadChildren: () => import('app/modules/admin/pages/activities/activities.routes')},

                // Authentication
                {path: 'authentication', loadChildren: () => import('app/modules/admin/pages/authentication/authentication.routes')},

                // Coming Soon
                {path: 'coming-soon', loadChildren: () => import('app/modules/admin/pages/coming-soon/coming-soon.routes')},

                // Error
                {path: 'error', children: [
                    {path: '404', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.routes')},
                    {path: '500', loadChildren: () => import('app/modules/admin/pages/error/error-500/error-500.routes')}
                ]},

                // Invoice
                {path: 'invoice', children: [
                    {path: 'printable', children: [
                        {path: 'compact', loadChildren: () => import('app/modules/admin/pages/invoice/printable/compact/compact.routes')},
                        {path: 'modern', loadChildren: () => import('app/modules/admin/pages/invoice/printable/modern/modern.routes')}
                    ]}
                ]},

                // Maintenance
                {path: 'maintenance', loadChildren: () => import('app/modules/admin/pages/maintenance/maintenance.routes')},

                // Pricing
                {path: 'pricing', children: [
                    {path: 'modern', loadChildren: () => import('app/modules/admin/pages/pricing/modern/modern.routes')},
                    {path: 'simple', loadChildren: () => import('app/modules/admin/pages/pricing/simple/simple.routes')},
                    {path: 'single', loadChildren: () => import('app/modules/admin/pages/pricing/single/single.routes')},
                    {path: 'table', loadChildren: () => import('app/modules/admin/pages/pricing/table/table.routes')}
                ]},

                // Profile
                {path: 'profile', loadChildren: () => import('app/modules/admin/pages/profile/profile.routes')},

                // Settings
                {path: 'settings', loadChildren: () => import('app/modules/admin/pages/settings/settings.routes')},
            ]},

            // User Interface
            {path: 'ui', children: [

                // Material Components
                {path: 'material-components', loadChildren: () => import('app/modules/admin/ui/material-components/material-components.routes')},

                // Fuse Components
                {path: 'fuse-components', loadChildren: () => import('app/modules/admin/ui/fuse-components/fuse-components.routes')},

                // Other Components
                {path: 'other-components', loadChildren: () => import('app/modules/admin/ui/other-components/other-components.routes')},

                // TailwindCSS
                {path: 'tailwindcss', loadChildren: () => import('app/modules/admin/ui/tailwindcss/tailwindcss.routes')},

                // Advanced Search
                {path: 'advanced-search', loadChildren: () => import('app/modules/admin/ui/advanced-search/advanced-search.routes')},

                // Animations
                {path: 'animations', loadChildren: () => import('app/modules/admin/ui/animations/animations.routes')},

                 // Cards
                {path: 'cards', loadChildren: () => import('app/modules/admin/ui/cards/cards.routes')},

                // Colors
                {path: 'colors', loadChildren: () => import('app/modules/admin/ui/colors/colors.routes')},

                // Confirmation Dialog
                {path: 'confirmation-dialog', loadChildren: () => import('app/modules/admin/ui/confirmation-dialog/confirmation-dialog.routes')},

                // Datatable
                {path: 'datatable', loadChildren: () => import('app/modules/admin/ui/datatable/datatable.routes')},

                // Forms
                {path: 'forms', loadChildren: () => import('app/modules/admin/ui/forms/forms.routes')},

                // Icons
                {path: 'icons', loadChildren: () => import('app/modules/admin/ui/icons/icons.routes')},

                // Page Layouts
                {path: 'page-layouts', loadChildren: () => import('app/modules/admin/ui/page-layouts/page-layouts.routes')},

                // Typography
                {path: 'typography', loadChildren: () => import('app/modules/admin/ui/typography/typography.routes')}
            ]},

            // Documentation
            {path: 'docs', children: [

                // Changelog
                {path: 'changelog', loadChildren: () => import('app/modules/admin/docs/changelog/changelog.routes')},

                // Guides
                {path: 'guides', loadChildren: () => import('app/modules/admin/docs/guides/guides.routes')}
            ]},

            // 404 & Catch all
            {path: '404-not-found', pathMatch: 'full', loadChildren: () => import('app/modules/admin/pages/error/error-404/error-404.routes')},
            {path: '**', redirectTo: '404-not-found'}

        ]
    }
];
