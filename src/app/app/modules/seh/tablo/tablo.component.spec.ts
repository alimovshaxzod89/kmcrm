import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabloComponent } from './tablo.component';

describe('TabloComponent', () => {
  let component: TabloComponent;
  let fixture: ComponentFixture<TabloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
