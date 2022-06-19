import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  groups: any = [];
  status: any = [];

  form1: FormGroup;

  login: boolean;
  dataLogin: any;
  username: any;
  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) { 
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
  }

  ngOnInit(): void {
    this.buildForm();
    this.http.get(environment.apiUrl+'/groups').subscribe((res: any) => {
      this.groups = res;
    });

    this.http.get(environment.apiUrl+'/status').subscribe((res: any) => {
      this.status = res;
    });
  }

  buildForm() {
    this.form1 = this.fb.group({
      username: [null, Validators.required],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      birthDate: [null, Validators.required],
      basicSalary: [null, Validators.required],
      status: [null, Validators.required],
      group: [null, Validators.required],
      description: [null, Validators.required]
    });
  }

  submitForm1() {
    this.http.post(environment.apiUrl+'/employees', this.form1.value).subscribe((res: any) => {
      localStorage.setItem('alert', 'Sukses Menyimpan');
      this.router.navigate(['employee/list']);
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
