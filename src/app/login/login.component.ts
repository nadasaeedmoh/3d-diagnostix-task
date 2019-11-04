import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  showInValidationMess:boolean=false;
  loginForm:FormGroup;
  constructor(form:FormBuilder, private sharedService:SharedService, private route:Router) {
    this.loginForm = form.group({
      "email":[null, [Validators.required, Validators.email]],
      "password":["",Validators.required]
    })
   }

  ngOnInit() {
  }

  login(){
    this.sharedService.login(this.loginForm.value)
    .then(res=>{
      if(res['length'] === 0)
        this.showInValidationMess = true;
      else{
        this.showInValidationMess = false;
        if(res[0]['isTeacher'] === 1){
          localStorage.setItem('teacherId',res[0]['id'])
          //redirect to teacher page
          this.route.navigateByUrl("teacher/home")
          console.log('redirect to teacher page')
        }
        else if(res[0]['isTeacher'] === 0){
          //redirect to student page
          console.log('redirect to student page')
        }
      }
      console.log(res)
    })
    .catch(err=>{
      console.log(err)
    })
  }

}
