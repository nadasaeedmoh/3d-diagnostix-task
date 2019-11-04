import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/shared/question';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { QuestionFormComponent } from './question-form/question-form.component';
import { SharedService } from 'src/app/shared/shared.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-quiz',
  templateUrl: './create-quiz.component.html',
  styleUrls: ['./create-quiz.component.css']
})
export class CreateQuizComponent implements OnInit {
  questions:Question[]=[];
  sendQuestToList:Question;
  id:number;
  questionIDArray=[];
  quizId:number;
  quizTitle:FormGroup;

  constructor( private modalService: NgbModal, private sharedService:SharedService,
     private fB:FormBuilder, private route:Router) { 
    this.sharedService.getQuizListLength().then(res=>{
      this.quizId = res['length']+1;
    });

    this.quizTitle = fB.group({
      'quizTitle' : [null, Validators.required] 
    }); 
  }
  ngOnInit() {
  }

  addQuestion(){
    const modalRefrence = this.modalService.open(QuestionFormComponent);
    modalRefrence.componentInstance.openState="add";
      modalRefrence.componentInstance.questionAdded.subscribe((result)=>{
      console.log(result);
      if(result){
        this.questions.push(new Question(this.questionIDArray.length+1,result['title'], [result['possibleAnsOne'],result['possibleAnsTwo'],result['possibleAnsThree'],result['possibleAnsFour']], result['correctAns'], result['Explanation']));
        this.sendQuestToList = this.questions[this.questions.length-1];
        this.questionIDArray.push(this.questionIDArray.length+1)
        console.log(this.questions)
      }
    })
     
  }

  getEditQues(e){
    console.log(e)
    this.questions.find((element,i)=>{
      if(element['Id'] === e['id']){
        this.questions[i]= new Question(e.id, e.title, [e.possibleAnsOne, e.possibleAnsTwo, e.possibleAnsThree, e.possibleAnsFour], e.correctAns, e.Explanation)
        return true;
      }
    })
  }

  getDeletedQues(e){
    console.log('delete',e);
     this.questions.find((ele,i)=>{
      if(ele['Id']===e['Id']){
        this.questions.splice(i,1);
        return true;
      }
    })
  }

  actionToQuiz(state){
     console.log(this.quizTitle.get('quizTitle').value)
     if(this.quizTitle.status === "VALID"){
      let quiz = {
        "id": this.quizId,
        "quizTitle":this.quizTitle.get('quizTitle').value,
        "questions":this.questions,
        "teacherId":parseInt(localStorage.getItem('teacherId')),
        "saved":0,
        "published":0
      };
      if(state==='save')
        quiz.saved = 1;
      else if(state === 'publish')
        quiz.published =1;
  
      this.sharedService.getQuizById(this.quizId).then(res=>{
        console.log(res);
        if(res['length']===0){
          this.sharedService.createQuiz(quiz).then(res=>{
            if(state === 'save')
              alert('Quiz Saved Successfully');
            else if(state === 'publish')
              alert('Quiz Published Successfully')
          })
        } 
        else{
          this.sharedService.updateQuiz(quiz).then(res=>{
            if(state === 'save')
              alert('Quiz Updated Successfully');
            else if(state === 'publish')
              alert('Quiz Published Successfully');
  
          }).catch(err=>console.log('update',err))
        }
      }).catch(err=>console.log('ased',err))
      
     }else if(this.quizTitle.status === "INVALID")
      alert('Quiz title is required.')
    
  }

  Exit(){
    this.route.navigateByUrl('/teacher/home')
  }

}
