import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InterpretesUpdatePage } from './interpretes-update.page';

describe('InterpretesUpdatePage', () => {
  let component: InterpretesUpdatePage;
  let fixture: ComponentFixture<InterpretesUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpretesUpdatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InterpretesUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
