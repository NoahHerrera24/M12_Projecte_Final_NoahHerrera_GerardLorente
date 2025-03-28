import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipEditComponent } from './equip-edit.component';

describe('EquipEditComponent', () => {
  let component: EquipEditComponent;
  let fixture: ComponentFixture<EquipEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
