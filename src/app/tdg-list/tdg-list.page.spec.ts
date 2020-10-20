import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TdgListPage } from './tdg-list.page';

describe('TdgListPage', () => {
  let component: TdgListPage;
  let fixture: ComponentFixture<TdgListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TdgListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TdgListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
