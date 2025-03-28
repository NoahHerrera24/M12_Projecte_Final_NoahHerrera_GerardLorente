import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipCreateComponent } from './equip-create.component';

describe('EquipCreateComponent', () => {
  let component: EquipCreateComponent;
  let fixture: ComponentFixture<EquipCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
