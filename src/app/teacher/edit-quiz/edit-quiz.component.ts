import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'src/app/shared/shared.service';
import { Router, ActivatedRoute } from '@angular/router';
import { QuestionFormComponent } from '../create-quiz/question-form/question-form.component';
import { Question } from 'src/app/shared/question';

@Component({
  selector: 'app-edit-quiz',
  templateUrl: './edit-quiz.component.html',
  styleUrls: ['./edit-quiz.component.css']
})
export class EditQuizComponent implements OnInit {
  EditQuizTitle:FormGroup;
  quiz;
  quizQuestion=[];
  constructor(private modalService: NgbModal, private sharedService:SharedService,
    private fB:FormBuilder, private route:Router,
    private activateRoute: ActivatedRoute) { 
      // this.activateRoute.params.subscribe(res=>{
      //   // console.log(res['id'])
      //   this.sharedService.getQuizById(res['id'])
      //   .then(res=>{
      //     console.log(res)
      //     this.quiz = res[0];
      //   })
      //   .catch(err=>console.log(err))
      // })
    this.EditQuizTitle = fB.group({
      'quizTitle' : [null, Validators.required] 
    })

  }

  ngOnInit() {
    this.activateRoute.params.subscribe(res=>{
      // console.log(res['id'])
      this.sharedService.getQuizById(res['id'])
      .then(res=>{
        console.log([res][0][0]['questions'])
        this.quiz = res[0];
        this.quizQuestion = [res][0][0]['questions'];
        this.sharedService.clearQuestion();
        this.sharedService.setQuestion(this.quizQuestion);
        this.EditQuizTitle = this.fB.group({
          'quizTitle' : [this.quiz.quizTitle, Validators.required] 
        })
      })
      .catch(err=>console.log(err))
    })
  }

  Exit(){
    this.route.navigateByUrl('teacher/savedquizzes');
  }

  addQuestion(){
    const modalRefrence = this.modalService.open(QuestionFormComponent);
    modalRefrence.componentInstance.openState="add";
      modalRefrence.componentInstance.questionAdded.subscribe((result)=>{
      console.log(result);
      if(result){
        this.quizQuestion.push(new Question(this.quizQuestion.length+1,result['title'], [result['possibleAnsOne'],result['possibleAnsTwo'],result['possibleAnsThree'],result['possibleAnsFour']], result['correctAns'], result['Explanation']));
        this.sharedService.clearQuestion()
        this.sharedService.setQuestion(this.quizQuestion)
      }
    })
  }

  actionToQuiz(state){
    console.log(this.quiz)

     if(this.EditQuizTitle.status === "VALID"){
       console.log('p')
      let quiz = {
        "id": this.quiz.id,
        "quizTitle":this.EditQuizTitle.get('quizTitle').value,
        "questions":this.quizQuestion,
        "teacherId":parseInt(localStorage.getItem('teacherId')),
        "saved":0,
        "published":0
      };
      if(state==='save')
        quiz.saved = 1;
      else if(state === 'publish')
        quiz.published =1;
      
      this.sharedService.updateQuiz(quiz).then(res=>{
        console.log('c')
        if(state === 'save'){
          alert('Quiz Updated Successfully');
        }
        else if(state === 'publish'){
          alert('Quiz Published Successfully');
        }
        }).catch(err=>console.log('update',err))
      
      }else if(this.EditQuizTitle.status === "INVALID")
      alert('Quiz title is required.')
    
  }

}
