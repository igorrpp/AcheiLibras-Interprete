import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CadastrarInterpretePage } from './cadastrar-interprete.page';

describe('CadastrarInterpretePage', () => {
  let component: CadastrarInterpretePage;
  let fixture: ComponentFixture<CadastrarInterpretePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarInterpretePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CadastrarInterpretePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
