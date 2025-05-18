import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VelemenyCardComponent } from './velemeny-card.component';

describe('VelemenyCardComponent', () => {
  let component: VelemenyCardComponent;
  let fixture: ComponentFixture<VelemenyCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VelemenyCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VelemenyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
