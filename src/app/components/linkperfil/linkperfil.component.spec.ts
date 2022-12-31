import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkperfilComponent } from './linkperfil.component';

describe('LinkperfilComponent', () => {
  let component: LinkperfilComponent;
  let fixture: ComponentFixture<LinkperfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkperfilComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkperfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
