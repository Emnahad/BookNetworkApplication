import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from '@angular/common';
import {BookRequest} from '../../../../services/models/book-request';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {BookService} from '../../../../services/services/book.service';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-manage-book',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    FormsModule
  ],
  templateUrl: './manage-book.component.html',
  styleUrl: './manage-book.component.scss'
})
export class ManageBookComponent{
  errorMsg: Array<string> = [];
  selectedBookCover: any;
  selectedPicture: String | undefined;
  bookRequest: BookRequest = {
    author_name: "",
    isbn: '',
    synopsis: '',
    title: ''
  };
  constructor(
    private bookService: BookService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    const bookId = this.activatedRoute.snapshot.params['bookId'];
    if (bookId) {
      this.bookService.findBookById({
        'book-id': bookId
      }).subscribe({
        next: (book) => {
          this.bookRequest = {
            id: book.id,
            title: book.title as string,
            author_name: book.author_name as string,
            isbn: book.isbn as string,
            synopsis: book.synopsis as string,
            shareable: book.shareable
          };
          this.selectedPicture=book.bookCover;
          console.log("selectedPic:", this.selectedPicture);
        }
      });
    }
  }
  saveBook() {
    // Attach the Base64-encoded picture directly to the book request
    if (this.selectedPicture) {
      this.bookRequest.bookCover = this.selectedPicture; // Assuming 'bookCover' is the correct field for the image
      console.log('Selected picture (Base64):', this.selectedPicture); // Log the Base64 string
    } else {
      console.log('No picture selected');
    }

    // Log the entire bookRequest object before saving
    console.log('Book request data being saved:', this.bookRequest);

    // Save the book along with the Base64 image
    this.bookService.saveBook({
      body: this.bookRequest
    }).subscribe({
      next: (bookId) => {
        console.log('Book saved successfully with ID:', bookId);
        console.log('Saved book data:', {
          ...this.bookRequest,
          bookId: bookId // Attach the saved book ID to log
        });
        this.router.navigate(['/books/my-books']);
      },
      error: (err) => {
        console.error('Error saving book:', err);
        this.errorMsg = err.error.validationErrors;
      }
    });
  }





  onFileSelected(event: any) {
    this.selectedBookCover = event.target.files[0];
    console.log(this.selectedBookCover);

    if (this.selectedBookCover) {

      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPicture = reader.result as String;
        console.log('Base64 Image:', this.selectedPicture); // Log the Base64-encoded image

      };
      reader.readAsDataURL(this.selectedBookCover);
      console.log(this.selectedBookCover);
    }
  }

}
