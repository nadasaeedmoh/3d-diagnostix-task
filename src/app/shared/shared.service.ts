import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginComponent } from '../login/login.component';
import { resolve, reject } from 'q';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseUrl:string = "http://localhost:3000/";
  constructor(private http:HttpClient) { 
    
  }

  login(loginValue){
    return new Promise((resolve,reject)=>{
      this.http.get(this.baseUrl+"users?email="+loginValue.email+"&password="+loginValue.password)
      .subscribe(res=>{
        resolve(res);
      },reject)
    })
  }

  createQuiz(data){
    return new Promise((resolve,reject)=>{
      this.http.post(this.baseUrl+"quizs",data)
      .subscribe(res=>{
        resolve(res);
      },reject)
    })
  }

  getQuizListLength(){
    return new Promise((resolve,reject)=>{
      this.http.get(this.baseUrl+'quizs')
      .subscribe(res=>{
        resolve(res);
      },reject)
    })
  }

  getQuizById(id){
    return new Promise((resolve,reject)=>{
      this.http.get(this.baseUrl+'quizs?id='+id)
      .subscribe(res=>{
        resolve(res);
      },reject)
    })
  }

  updateQuiz(quiz){
    return new Promise((resolve,reject)=>{
      this.http.put(this.baseUrl+"quizs/"+quiz.id,quiz )
      .subscribe(res=>{
        resolve(res);
      },reject)
    })

  }

  getPublishQuiz(){
    console.log('ser',localStorage.getItem('teacherId'))
    return new Promise((resolve,reject)=>{
      this.http.get(this.baseUrl+'quizs?published=1&teacherId='+localStorage.getItem('teacherId'))
      .subscribe(res=>{
    console.log('ser',res)
        resolve(res);
      },reject);
    });
  }

  getSavedQuiz(){
    return new Promise((resolve,reject)=>{
      this.http.get(this.baseUrl+'quizs?saved=1&teacherId='+localStorage.getItem('teacherId'))
      .subscribe(res=>{
        resolve(res);
      },reject);
    });
  }

  publishQuiz(quizId,quiz){
    return new Promise((resolve,reject)=>{
      this.http.put(this.baseUrl+'quizs/'+quizId,quiz)
      .subscribe(res=>{
        resolve(res);
      },reject)
    })
  }

  saveQuiz(){

  }

  DeleteQuiz(quizId){
    return new Promise((resolve,reject)=>{
      this.http.delete(this.baseUrl+'quizs/'+quizId)
      .subscribe(res=>{
        resolve(res);
      },reject);
    })
  }

  
}
