import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleLoginProvider } from '@abacritt/angularx-social-login';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { IgxCalendarModule } from 'igniteui-angular';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule } from '@angular/forms';
import { appRoutes } from './app.routes';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
            HttpClientModule,
        RouterModule.forRoot(appRoutes),

        CommonModule,
        RouterModule,
        SocialLoginModule,
        BrowserAnimationsModule,
        HammerModule,
        IgxCalendarModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        ////
        ReactiveFormsModule,
        
        MatCardModule,
        MatToolbarModule,
        BrowserModule,
    RouterModule.forRoot(appRoutes)
   
    ],
    
    providers: [
        {
            provide: 'SocialAuthServiceConfig',
            useValue: {
                autoLogin: false,
                providers: [
                    {
                        id: GoogleLoginProvider.PROVIDER_ID,
                        provider: new GoogleLoginProvider('559595036763-57sesap5ls3e9jve2p8semqf4m77cb9l.apps.googleusercontent.com', {
                            scopes: 'openid profile email',
                        }),
                    },
                ],
                onError: (err) => {
                    console.error(err);
                },
            } as SocialAuthServiceConfig,
        },
    ],
    
})
export class AppModule { }
