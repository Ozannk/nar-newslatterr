import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MailTemplateFormComponent } from './mail-template-form.component';

describe('MailTemplateFormComponent', () => {
  let component: MailTemplateFormComponent;
  let fixture: ComponentFixture<MailTemplateFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MailTemplateFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MailTemplateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
