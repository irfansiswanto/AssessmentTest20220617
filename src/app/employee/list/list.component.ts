import { AfterViewInit, Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements AfterViewInit  {
  displayedColumns: string[] = ['id', 'username', 'name', 'email', 'birthdate', 'basicsalary', 'action'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  login: boolean;
  dataLogin: any;
  username: any;
  dataAlert: any;

  alertsuccess: boolean=false;
  alertdelete: boolean=false;
  alert: any;
  constructor(private router: Router ,private liveAnnouncer: LiveAnnouncer, private http: HttpClient, private dialog: MatDialog) {
    this.dataLogin = localStorage.getItem('datalogin');
    if(this.dataLogin) {
      this.dataLogin = JSON.parse(this.dataLogin);
      this.login = this.dataLogin.login;
      this.username = this.dataLogin.username;
    } else {
      this.login = false;
      this.username = '';
      this.router.navigate(['/login']);
    }

    this.dataAlert = localStorage.getItem('alert');
    if(this.dataAlert) {
      this.alertsuccess = true;
      this.alert = this.dataAlert;
    }
  }
  async ngAfterViewInit() {
    this.getData();
  }

  getData() {
    let DATA: PeriodicElement[] = [];
    this.http.get(environment.apiUrl+'/employees').subscribe((res: any) => {
      res.forEach(element => {
        DATA.push({
          id: element.id,
          username: element.username,
          name: element.firstName+' '+element.lastName,
          email: element.email,
          birthDate: element.birthDate,
          basicSalary: this.formatRupiah(element.basicSalary, 'Rp')
        });
      });
      this.dataSource = new MatTableDataSource<PeriodicElement>(DATA);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filter1(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  filter2(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  add() {
    this.router.navigate(['/employee/add']);
  }

  edit(id: number) {
    this.router.navigate(['/employee/edit', {id : id}]);
  }

  detail(id: number) {
    this.router.navigate(['/employee/detail', {id : id}]);
  }

  formatRupiah(angka: number, prefix: string){
    let angkaString = angka.toString();
    var number_string = angkaString.replace(/[^,\d]/g, '').toString(),
    split   		= number_string.split(','),
    sisa     		= split[0].length % 3,
    rupiah     		= split[0].substr(0, sisa),
    ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
    if(ribuan){
      let separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
    return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah + ',00' : '');
  }

  delete(id: any, username: string): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {id: id, username: username},
    });

    dialogRef.afterClosed().subscribe(result => {
      this.alertdelete = true;
      this.alertsuccess = false;
      this.alert = 'Sukses Delete';
      this.getData();
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}

export interface PeriodicElement {
  id: number,
  username: string,
  name: string,
  email: string,
  birthDate: string,
  basicSalary: string
}

export interface DialogData {
  id: number;
  username: string;
}

@Component({
  selector: 'dialog-delete',
  templateUrl: 'dialog-delete.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private http: HttpClient
  ) {}

  yes(id:number) {
    this.http.delete(environment.apiUrl+'/employees/'+id).subscribe((res: any) => {
      this.dialogRef.close();
    });
  }

  no() {
    this.dialogRef.close();
  }
}
