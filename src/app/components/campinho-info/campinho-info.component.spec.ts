import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampinhoInfoComponent } from './campinho-info.component';

describe('CampinhoInfoComponent', () => {
  let component: CampinhoInfoComponent;
  let fixture: ComponentFixture<CampinhoInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampinhoInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampinhoInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
