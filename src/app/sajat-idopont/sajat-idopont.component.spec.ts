import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SajatIdopontComponent } from './sajat-idopont.component';

describe('SajatIdopontComponent', () => {
  let component: SajatIdopontComponent;
  let fixture: ComponentFixture<SajatIdopontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SajatIdopontComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SajatIdopontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
