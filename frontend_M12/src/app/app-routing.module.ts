import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { EquipListComponent } from './equip-list/equip-list.component';
import { EquipEditComponent } from './equip-edit/equip-edit.component';
import { EquipCreateComponent } from './equip-create/equip-create.component';
import { RankingEquipsListComponent } from './ranking-equips-list/ranking-equips-list.component';
import { TorneigListComponent } from './torneig-list/torneig-list.component';
import { TorneigEditComponent } from './torneig-edit/torneig-edit.component';
import { TorneigCreateComponent } from './torneig-create/torneig-create.component';
import { TicketQueixaListComponent } from './ticket-queixa-list/ticket-queixa-list.component';
import { TicketQueixaEditComponent } from './ticket-queixa-edit/ticket-queixa-edit.component';
import { TicketQueixaCreateComponent } from './ticket-queixa-create/ticket-queixa-create.component';
import { RankingTorneigListComponent } from './ranking-torneig-list/ranking-torneig-list.component';
import { RankingParticipantListComponent } from './ranking-participant-list/ranking-participant-list.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
    { path: 'welcome', component: WelcomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'equip-list', component: EquipListComponent },
    { path: 'equip-edit/:id', component: EquipEditComponent },
    { path: 'equip-create', component: EquipCreateComponent },
    { path: 'ranking-equips', component: RankingEquipsListComponent },
    { path: 'torneig-list', component: TorneigListComponent },
    { path: 'torneig-edit/:id', component: TorneigEditComponent },
    { path: 'torneig-create', component: TorneigCreateComponent },
    { path: 'ticket-queixa-list', component: TicketQueixaListComponent },
    { path: 'ticket-queixa-edit/:id', component: TicketQueixaEditComponent },
    { path: 'ticket-queixa-create', component: TicketQueixaCreateComponent },
    { path: 'ranking-tornejos', component: RankingTorneigListComponent },
    { path: 'ranking-participants', component: RankingParticipantListComponent },
    { path: '', redirectTo: 'welcome', pathMatch: 'full' },
    { path: '**', redirectTo: 'welcome', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }