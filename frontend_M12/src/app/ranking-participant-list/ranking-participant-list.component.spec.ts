import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingParticipantListComponent } from './ranking-participant-list.component';

describe('RankingParticipantListComponent', () => {
  let component: RankingParticipantListComponent;
  let fixture: ComponentFixture<RankingParticipantListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingParticipantListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingParticipantListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
