import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form1:FormGroup;
  error: any;
  constructor(private router: Router, private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.form1 = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  submitForm1() {
    if(this.form1.valid) {
      this.http.post(environment.apiUrl+'/login', this.form1.value).subscribe((res: any) => {
        if(res == 'Incorrect username or password') {
          this.error = res;
        }else {
          res.login = true;
          localStorage.clear();
          localStorage.setItem('datalogin', JSON.stringify(res));
          this.router.navigate(['/employee/list']);
        }
      });
    }
  }
}
