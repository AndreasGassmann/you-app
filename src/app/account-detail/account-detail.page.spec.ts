import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDetailPage } from './account-detail.page';

describe('AccountDetailPage', () => {
  let component: AccountDetailPage;
  let fixture: ComponentFixture<AccountDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
