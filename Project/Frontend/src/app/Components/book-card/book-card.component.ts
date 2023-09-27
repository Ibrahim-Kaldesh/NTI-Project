import { Component } from '@angular/core';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css'],
})
export class BookCardComponent {
  fav: boolean = false;
  exists: boolean = false;
  content: string = 'Add';
  type: string = 'btn btn-success';
  handleClick() {
    this.exists = this.exists ? false : true;
    this.content = this.exists ? 'Remove' : 'Add';
    this.type = this.exists ? 'btn btn-danger' : 'btn btn-success';
  }
}
