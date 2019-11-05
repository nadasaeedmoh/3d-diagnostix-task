import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { QuestionFormComponent } from '../../create-quiz/question-form/question-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Question } from 'src/app/shared/question';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  lists=[];
@Output() sendeditQuestion = new EventEmitter();

  constructor(private sharedService:SharedService,private modalService: NgbModal) { 
    this.sharedService.getQuestion().subscribe(res=>{
      console.log(res)
      if(res !== undefined){
      //   res.forEach(element => {
      //   this.lists.push(element)
      // });
      this.lists = res;
      }
      
    }) 
   }

  ngOnInit() {
  
  }

  deleteQuestion(list,i){
    this.lists.splice(i,1);
    this.sharedService.clearQuestion();
    this.sharedService.setQuestion(this.lists)
  }

  editQuestion(list,i){
    const modalRefrence = this.modalService.open(QuestionFormComponent);
    modalRefrence.componentInstance.openState="edit";
    modalRefrence.componentInstance.questionToEdit = list;
      modalRefrence.componentInstance.questionEdited.subscribe((res)=>{
      console.log(res);
      if(res){
        this.sendeditQuestion.emit(res);
        // this.detectEdit = res;
        this.lists[i]= new Question(res.id, res.title, [res.possibleAnsOne, res.possibleAnsTwo, res.possibleAnsThree, res.possibleAnsFour], res.correctAns, res.Explanation);
        this.sharedService.clearQuestion()
        this.sharedService.setQuestion(this.lists);
        
      }
    })
  }

}
