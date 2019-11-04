import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbModal,ModalDismissReasons, NgbModalRef, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { THROW_IF_NOT_FOUND } from '@angular/core/src/di/injector';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  @Output() questionAdded:EventEmitter<any> = new EventEmitter(); 
  @Output() questionEdited:EventEmitter<any> = new EventEmitter(); 
  questionForm:FormGroup;
  @Input() openState;
  @Input() questionToEdit;

  constructor(private formBuilder:FormBuilder, private modalService: NgbModal , private modalref:NgbActiveModal) {
    this.questionForm = this.formBuilder.group({
      "id":[],
      "title":[null, Validators.required],
      "possibleAnsOne": [null, Validators.required],
      "possibleAnsTwo": [null, Validators.required],
      "possibleAnsThree": [null, Validators.required],
      "possibleAnsFour": [null],
      "correctAns": [null, Validators.required],
      "Explanation": [null, Validators.required],

    });
    
  }

  ngOnInit() {
    console.log(this.openState)
    if(this.openState === 'open'){
      this.questionForm = this.formBuilder.group({
        "title":[null, Validators.required],
        "possibleAnsOne": [null, Validators.required],
        "possibleAnsTwo": [null, Validators.required],
        "possibleAnsThree": [null, Validators.required],
        "possibleAnsFour": [null],
        "correctAns": [null, Validators.required],
        "Explanation": [null, Validators.required],
  
      });
    }
    else if(this.openState==='edit'){
      console.log(this.questionToEdit)
      console.log(this.questionToEdit['Id'])
      this.questionForm = this.formBuilder.group({
        "id":[this.questionToEdit['Id']],
        "title":[this.questionToEdit['title'], Validators.required],
        "possibleAnsOne": [this.questionToEdit['possibleAnswers'][0], Validators.required],
        "possibleAnsTwo": [this.questionToEdit['possibleAnswers'][1], Validators.required],
        "possibleAnsThree": [this.questionToEdit['possibleAnswers'][2], Validators.required],
        "possibleAnsFour": [this.questionToEdit['possibleAnswers'][3]||null],
        "correctAns": [this.questionToEdit['correctAnswer'], Validators.required],
        "Explanation": [this.questionToEdit['explanation'], Validators.required],
  
      });
    }

  }

  dismissModal(){
    this.modalref.close();
  }

  addQuestion(){
    console.log(this.questionForm.value)
    this.questionAdded.emit(this.questionForm.value);
    this.modalref.close();
  }

  EditQuestion(){
    console.log(this.questionForm.value)
    this.questionEdited.emit(this.questionForm.value);
    this.modalref.close();
  }
}
