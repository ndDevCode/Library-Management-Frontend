import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-borrowers',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './all-borrowers.component.html',
  styleUrl: './all-borrowers.component.css',
})
export class AllBorrowersComponent implements OnInit {
  private http;
  public borrowerList: any;
  public filteredList: any;
  public updatedBorrower: any;
  public updatedStatus: any;

  @ViewChild('btnModalOpen') confirmModal:
    | ElementRef<HTMLButtonElement>
    | undefined;

  constructor(private httpClient: HttpClient) {
    this.http = httpClient;
  }

  ngOnInit(): void {
    this.getAllBorrowers();
  }

  getAllBorrowers() {
    const url = 'http://localhost:8082/api/borrow-list';
    this.http.get(url).subscribe((res: any) => {
      this.borrowerList = res;
      this.filteredList = this.borrowerList;
    });
  }

  filterByStatus(status: string) {
    if (status === 'ALL') {
      this.filteredList = this.borrowerList;
      return;
    }

    this.filteredList = this.borrowerList.filter(
      (borrower: any) => borrower.status === status
    );
  }

  setUpdatedBorrower(borrower: any) {
    this.updatedBorrower = borrower;
  }

  changeStatus() {
    if (
      this.updatedBorrower &&
      this.updatedBorrower.status === this.updatedStatus
    ) {
      Swal.fire({
        title: `Current Status is ${String(this.updatedStatus).toLowerCase()}!`,
        text: '',
        icon: 'warning',
      });
      return;
    }

    if (this.updatedStatus) {
      this.updatedBorrower.status = this.updatedStatus;
      this.confirmModal?.nativeElement.click();
    } else {
      Swal.fire({
        title: `Please select a status!`,
        text: '',
        icon: 'warning',
      });
      return;
    }
  }

  updateBorrowStatus() {
    const url = 'http://localhost:8082/api/save-borrower';
    this.http.post(url, this.updatedBorrower).subscribe((res: any) => {
      if (res.isSuccess) {
        Swal.fire({
          title: `Status Update Success!`,
          text: '',
          icon: 'success',
        });
      } else {
        Swal.fire({
          title: `Status Update unsuccessful!`,
          text: '',
          icon: 'error',
        });
      }
      this.getAllBorrowers();
    });
  }
}
