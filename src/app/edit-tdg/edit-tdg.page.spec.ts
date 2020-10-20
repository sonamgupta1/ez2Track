import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditTdgPage } from './edit-tdg.page';

describe('EditTdgPage', () => {
  let component: EditTdgPage;
  let fixture: ComponentFixture<EditTdgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTdgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditTdgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
