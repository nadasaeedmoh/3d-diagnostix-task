import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy, Output,EventEmitter, DoCheck, IterableDiffers } from '@angular/core';
import { Question } from 'src/app/shared/question';
import { SharedService } from 'src/app/shared/shared.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { QuestionFormComponent } from '../question-form/question-form.component';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush    

})
export class QuestionListComponent implements OnInit, OnChanges{
@Output() sendeditQuestion = new EventEmitter();
@Input() questlistProp;
@Output() detectDeleted = new EventEmitter();
questionList:Question[]=[];
detectEdit;

  constructor(private sharedService:SharedService,private modalService: NgbModal,private iterableDiffers: IterableDiffers) {
    
   
    // console.log(this.questlistProp)
   }

  ngOnInit() {
  }

  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(changes['questlistProp']){
      console.log(changes['questlistProp']['currentValue'])
      if(changes['questlistProp']['currentValue']!==undefined)
      this.questionList.push(this.questlistProp);
      console.log("change",this.questionList)


    }
   console.log(changes['questionList'])
  }

  editQuestion(list,i){
    const modalRefrence = this.modalService.open(QuestionFormComponent);
    modalRefrence.componentInstance.openState="edit";
    modalRefrence.componentInstance.questionToEdit = list;
      modalRefrence.componentInstance.questionEdited.subscribe((res)=>{
      console.log(res);
      if(res){
        this.sendeditQuestion.emit(res);
        this.detectEdit = res;
        this.questionList[i]= new Question(res.id, res.title, [res.possibleAnsOne, res.possibleAnsTwo, res.possibleAnsThree, res.possibleAnsFour], res.correctAns, res.Explanation);
       
        
      }
    })
  }

  deleteQuestion(list,i){
    this.detectDeleted.emit(list);
    this.questionList.splice(i,1)
    
  }


  

}
