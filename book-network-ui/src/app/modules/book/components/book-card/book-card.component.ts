import {Component, EventEmitter, Input, Output} from '@angular/core';
import { BookResponse } from '../../../../services/models/book-response';
import {NgIf} from '@angular/common';
import {RatingComponent} from '../rating/rating.component';

@Component({
  selector: 'app-book-card',
  standalone: true,
  templateUrl: './book-card.component.html',
  imports: [
    NgIf,
    RatingComponent
  ],
  styleUrls: ['./book-card.component.scss']
})
export class BookCardComponent {
  private _book: BookResponse = {};
  private _manage = false;
  private _bookCover: string | undefined;
  get bookCover(): String {
    if (this._book.bookCover) {
      // Log cover length to check if it's valid base64 data
      console.log('Cover length:', this._book.bookCover.length);

      // Check if the cover already contains the base64 prefix
      if ((this._book.bookCover.startsWith('data:image/jpeg;base64,')) || this._book.bookCover.startsWith('data:image/png;base64,')){
        console.log('Cover already has base64 format:', this._book.bookCover);
        return this._book.bookCover; // Return as is
      } else if (this._book.bookCover.length > 10) {
        // If not in base64 format, add t+he prefix
        const correctedUrl = `data:image/jpeg;base64,${this._book.bookCover}`;
        console.log('Using cover from book:', correctedUrl);
        return correctedUrl;
      } else {
        console.error('Invalid base64 data, using default image.');
      }
    }

    console.log('No cover available, using default image.');
    return 'https://source.unsplash.com/user/c_v_r/1900x800'; // Default image URL
  }

  get book(): BookResponse {
    return this._book;
  }
  get manage(): boolean {
    return this._manage;
  }

  @Input()
  set manage(value: boolean) {
    this._manage = value;
  }
  @Input()
  set book(value: BookResponse) {
    this._book = value;
    console.log('Book data:', this._book);
    // Log the cover to verify base64 data
    if (this._book.bookCover) {
      console.log('Cover data:', this._book.bookCover.substring(0, 30) + '...'); // Log part of the cover data
    }
  }
  @Output() private share: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private archive: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private addToWaitingList: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private borrow: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private edit: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();
  @Output() private details: EventEmitter<BookResponse> = new EventEmitter<BookResponse>();

  onShare() {
    this.share.emit(this._book);
  }

  onArchive() {
    this.archive.emit(this._book);
  }

  onAddToWaitingList() {
    this.addToWaitingList.emit(this._book);
  }

  onBorrow() {
    this.borrow.emit(this._book);
  }

  onEdit() {
    this.edit.emit(this._book);
  }

  onShowDetails() {
    this.details.emit(this._book);
  }
}
