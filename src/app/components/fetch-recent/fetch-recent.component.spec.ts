import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchRecentComponent } from './fetch-recent.component';

describe('FetchRecentComponent', () => {
  let component: FetchRecentComponent;
  let fixture: ComponentFixture<FetchRecentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchRecentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FetchRecentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
