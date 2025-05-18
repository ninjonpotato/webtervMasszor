import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdopontCardComponent } from './idopont-card.component';

describe('IdopontCardComponent', () => {
  let component: IdopontCardComponent;
  let fixture: ComponentFixture<IdopontCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdopontCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdopontCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
