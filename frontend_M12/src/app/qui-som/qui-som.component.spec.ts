import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuiSomComponent } from './qui-som.component';

describe('QuiSomComponent', () => {
  let component: QuiSomComponent;
  let fixture: ComponentFixture<QuiSomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [QuiSomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuiSomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
