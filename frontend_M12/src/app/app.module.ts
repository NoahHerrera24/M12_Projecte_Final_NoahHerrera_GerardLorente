import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
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
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EquipListFilterPipe } from './equip-list/equip-list-filter.pipe';
import { TicketQueixaListFilterPipe } from './ticket-queixa-list/ticket-queixa-list-filter.pipe';
import { TorneigListFilterPipe } from './torneig-list/torneig-list-filter.pipe';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  declarations: [
    AppComponent,
    EquipListComponent,
    EquipEditComponent,
    EquipCreateComponent,
    TorneigListComponent,
    TorneigEditComponent,
    TorneigCreateComponent,
    TicketQueixaListComponent,
    TicketQueixaEditComponent,
    TicketQueixaCreateComponent,
    RankingEquipsListComponent,
    RankingTorneigListComponent,
    RankingParticipantListComponent,
    WelcomeComponent,
    NavBarComponent,
    EquipListFilterPipe,
    TicketQueixaListFilterPipe,
    TorneigListFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
