import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InterpretesPerfilDetalhePage } from './interpretes-perfil-detalhe.page';

describe('InterpretesPerfilDetalhePage', () => {
  let component: InterpretesPerfilDetalhePage;
  let fixture: ComponentFixture<InterpretesPerfilDetalhePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InterpretesPerfilDetalhePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(InterpretesPerfilDetalhePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
