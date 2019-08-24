import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { clientsPage } from "./clients.page";

describe("clientsPage", () => {
  let component: clientsPage;
  let fixture: ComponentFixture<clientsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [clientsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(clientsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
