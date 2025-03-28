import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingTorneigListComponent } from './ranking-torneig-list.component';

describe('RankingTorneigListComponent', () => {
  let component: RankingTorneigListComponent;
  let fixture: ComponentFixture<RankingTorneigListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingTorneigListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingTorneigListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
