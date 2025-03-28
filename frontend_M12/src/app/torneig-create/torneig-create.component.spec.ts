import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneigCreateComponent } from './torneig-create.component';

describe('TorneigCreateComponent', () => {
  let component: TorneigCreateComponent;
  let fixture: ComponentFixture<TorneigCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorneigCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneigCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
