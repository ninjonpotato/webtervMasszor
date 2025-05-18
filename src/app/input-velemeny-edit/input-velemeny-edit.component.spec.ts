import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputVelemenyEditComponent } from './input-velemeny-edit.component';

describe('InputVelemenyEditComponent', () => {
  let component: InputVelemenyEditComponent;
  let fixture: ComponentFixture<InputVelemenyEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputVelemenyEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputVelemenyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
