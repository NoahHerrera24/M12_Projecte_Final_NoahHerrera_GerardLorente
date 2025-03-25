import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingEquipsListComponent } from './ranking-equips-list.component';

describe('RankingEquipsListComponent', () => {
  let component: RankingEquipsListComponent;
  let fixture: ComponentFixture<RankingEquipsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingEquipsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingEquipsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
