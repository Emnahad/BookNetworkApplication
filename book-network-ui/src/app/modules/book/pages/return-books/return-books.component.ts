import {Component, OnInit} from '@angular/core';
import {BorrowedBookResponse} from '../../../../services/models/borrowed-book-response';
import {PageResponseBorrowedBookResponse} from '../../../../services/models/page-response-borrowed-book-response';
import {BookService} from '../../../../services/services/book.service';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-return-books',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './return-books.component.html',
  styleUrl: './return-books.component.scss'
})
export class ReturnBooksComponent implements OnInit{
  page = 0;
  size = 5;
  pages: any = [];
  returnedBooks: PageResponseBorrowedBookResponse = {};
  message = '';
  level: 'success' |'error' = 'success';
  constructor(
    private bookService: BookService
  ) {
  }

  ngOnInit(): void {
    this.findAllReturnedBooks();
  }

  private findAllReturnedBooks() {
    this.bookService.findAllReturnedBooks({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (resp) => {
        this.returnedBooks = resp;
        this.pages = Array(this.returnedBooks.totalPages)
          .fill(0)
          .map((x, i) => i);
      }
    });
  }

  gotToPage(page: number) {
    this.page = page;
    this.findAllReturnedBooks();
  }

  goToFirstPage() {
    this.page = 0;
    this.findAllReturnedBooks();
  }

  goToPreviousPage() {
    this.page --;
    this.findAllReturnedBooks();
  }

  goToLastPage() {
    this.page = this.returnedBooks.totalPages as number - 1;
    this.findAllReturnedBooks();
  }

  goToNextPage() {
    this.page++;
    this.findAllReturnedBooks();
  }

  get isLastPage() {
    return this.page === this.returnedBooks.totalPages as number - 1;
  }

  approveBookReturn(book: BorrowedBookResponse) {
    console.log("Approve book return called with book:", book); // Log the book parameter
    if (!book.returned) {
      console.log("Book has not been returned. Exiting function."); // Log if the book has not been returned
      return;
    }

    console.log("Book has been returned. Proceeding to approve the return."); // Log if the book has been returned

    this.bookService.approveReturnBorrowBook({
      'book-id': book.id as number
    }).subscribe({
      next: () => {
        console.log("Book return approved successfully."); // Log on successful approval
        this.level = 'success';
        this.message = 'Book return approved';
        this.findAllReturnedBooks();
      },
      error: (err) => {
        console.error("Error approving book return:", err); // Log any error that occurs
      }
    });
  }


}
