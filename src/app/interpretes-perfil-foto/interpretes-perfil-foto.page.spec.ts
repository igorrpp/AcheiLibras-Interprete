import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InterpretesPerfilFotoPage } from './interpretes-perfil-foto.page';

describe('InterpretesPerfilFotoPage', () => {
  let component: InterpretesPerfilFotoPage;
  let fixture: ComponentFixture<InterpretesPerfilFotoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpretesPerfilFotoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InterpretesPerfilFotoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
