import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  id: any;
  form1: FormGroup;
  groups: any = [];
  status: any = [];
  login: boolean;
  dataLogin: any;
  username: any;
  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, private router: Router, private snackBar: MatSnackBar) { 
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
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    this.http.get(environment.apiUrl+'/groups').subscribe((res: any) => {
      this.groups = res;
    });

    this.http.get(environment.apiUrl+'/status').subscribe((res: any) => {
      this.status = res;
    });

    this.http.get(environment.apiUrl+'/employees/'+this.id).subscribe((res: any) => {
      this.form1 = this.fb.group({
        username: [res.username, Validators.required],
        firstName: [res.firstName, Validators.required],
        lastName: [res.lastName, Validators.required],
        email: [res.email, [Validators.required, Validators.email]],
        birthDate: [res.birthDate, Validators.required],
        basicSalary: [res.basicSalary, Validators.required],
        status: [res.status, Validators.required],
        group: [res.group, Validators.required],
        description: [res.description, Validators.required]
      });
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
    this.http.put(environment.apiUrl+'/employees/'+this.id, this.form1.value).subscribe((res: any) => {
        this.router.navigate(['/employee/list']);
        localStorage.setItem('alert', 'Sukses Update');
        this.router.navigate(['employee/list']);
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
