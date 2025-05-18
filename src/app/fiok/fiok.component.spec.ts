import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiokComponent } from './fiok.component';

describe('FiokComponent', () => {
  let component: FiokComponent;
  let fixture: ComponentFixture<FiokComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiokComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiokComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
