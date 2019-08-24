import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { settingsPage } from "./settings.page";

describe("settingsPage", () => {
  let component: settingsPage;
  let fixture: ComponentFixture<settingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [settingsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(settingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
