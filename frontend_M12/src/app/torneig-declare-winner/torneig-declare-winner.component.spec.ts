import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneigDeclareWinnerComponent } from './torneig-declare-winner.component';

describe('TorneigDeclareWinnerComponent', () => {
  let component: TorneigDeclareWinnerComponent;
  let fixture: ComponentFixture<TorneigDeclareWinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TorneigDeclareWinnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneigDeclareWinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
