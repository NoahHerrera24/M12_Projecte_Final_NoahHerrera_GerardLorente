import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketQueixaListComponent } from './ticket-queixa-list.component';

describe('TicketQueixaListComponent', () => {
  let component: TicketQueixaListComponent;
  let fixture: ComponentFixture<TicketQueixaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketQueixaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketQueixaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
