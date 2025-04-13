import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IdopontComponent } from './idopont.component';

describe('IdopontComponent', () => {
  let component: IdopontComponent;
  let fixture: ComponentFixture<IdopontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdopontComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IdopontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
