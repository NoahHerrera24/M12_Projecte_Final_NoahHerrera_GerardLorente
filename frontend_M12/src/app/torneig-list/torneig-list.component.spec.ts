import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TorneigListComponent } from './torneig-list.component';

describe('TorneigListComponent', () => {
  let component: TorneigListComponent;
  let fixture: ComponentFixture<TorneigListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TorneigListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TorneigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
