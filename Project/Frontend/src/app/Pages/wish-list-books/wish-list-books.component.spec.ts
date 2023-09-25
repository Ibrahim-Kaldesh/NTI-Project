import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WishListBooksComponent } from './wish-list-books.component';

describe('WishListBooksComponent', () => {
  let component: WishListBooksComponent;
  let fixture: ComponentFixture<WishListBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WishListBooksComponent]
    });
    fixture = TestBed.createComponent(WishListBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
