import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaturnosComponent } from './tablaturnos.component';

describe('TablaturnosComponent', () => {
  let component: TablaturnosComponent;
  let fixture: ComponentFixture<TablaturnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaturnosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablaturnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
