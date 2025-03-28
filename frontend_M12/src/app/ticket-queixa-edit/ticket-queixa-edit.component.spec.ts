import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketQueixaEditComponent } from './ticket-queixa-edit.component';

describe('TicketQueixaEditComponent', () => {
  let component: TicketQueixaEditComponent;
  let fixture: ComponentFixture<TicketQueixaEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketQueixaEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketQueixaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
