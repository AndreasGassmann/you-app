import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { accountsPage } from './accounts.page';

describe('accountsPage', () => {
  let component: accountsPage;
  let fixture: ComponentFixture<accountsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [accountsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(accountsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
