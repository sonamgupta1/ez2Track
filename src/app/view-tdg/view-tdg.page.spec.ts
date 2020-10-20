import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewTdgPage } from './view-tdg.page';

describe('ViewTdgPage', () => {
  let component: ViewTdgPage;
  let fixture: ComponentFixture<ViewTdgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewTdgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewTdgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
