import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-books',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './all-books.component.html',
  styleUrl: './all-books.component.css',
})
export class AllBooksComponent implements OnInit {
  private http: any;
  public bookList: any;
  public selectedBook: any = {};

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.loadAllBooks();
  }

  setSelectedBook(book: any) {
    this.selectedBook = book;
  }

  loadAllBooks() {
    let url = 'http://localhost:8081/book/all';
    this.http.get(url).subscribe((data: any) => {
      this.bookList = data;
    });
  }

  deleteBook() {
    let url: string = 'http://localhost:8081/book/' + this.selectedBook.id;
    this.http.delete(url).subscribe((res: any) => {
      this.loadAllBooks();
      Swal.fire({
        title: 'Deleted!',
        text: `${this.selectedBook.title} Deleted!`,
        icon: 'success',
      });
      this.selectedBook = {};
    });
  }

  saveBook() {
    let url: string = 'http://localhost:8081/book/add';
    this.http.post(url, this.selectedBook).subscribe((res: any) => {
      this.loadAllBooks();
      Swal.fire({
        title: 'Updated!',
        text: `${this.selectedBook.title} Updated!`,
        icon: 'success',
      });
      this.selectedBook = {};
    });
  }
}
