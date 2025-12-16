import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintturnoComponent } from './printturno.component';

describe('PrintturnoComponent', () => {
  let component: PrintturnoComponent;
  let fixture: ComponentFixture<PrintturnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrintturnoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
