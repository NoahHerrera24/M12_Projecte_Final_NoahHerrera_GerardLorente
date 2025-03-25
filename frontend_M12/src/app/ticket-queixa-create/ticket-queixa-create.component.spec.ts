import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketQueixaCreateComponent } from './ticket-queixa-create.component';

describe('TicketQueixaCreateComponent', () => {
  let component: TicketQueixaCreateComponent;
  let fixture: ComponentFixture<TicketQueixaCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketQueixaCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketQueixaCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
