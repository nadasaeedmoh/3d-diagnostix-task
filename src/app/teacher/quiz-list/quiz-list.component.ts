import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.css']
})
export class QuizListComponent implements OnInit {
  state:string;
  listItems:any=[];
  // collectionSize :number;
  // page = 1;
  // pageSize = 4;

  constructor(private route:Router, private sharedService:SharedService) {

    if(history.state['listState'] === 'saved' || history.state['listState'] === 'publish')
      localStorage.setItem('listState',history.state['listState']);

    this.state = localStorage.getItem('listState')

    this.changeAccordingState();

   }

  

  ngOnInit() {
    
  }

  shareQuiz(item){
    let QuizItem = item;
    QuizItem.published = 1;
    QuizItem.saved =0;
    console.log(item);
    this.sharedService.publishQuiz(item.id,QuizItem).then(res=>{
      console.log(res);
      alert('Quiz Shared successfully');
      this.changeAccordingState()
    }).catch(err=>{
      console.log(err)
    })
  }

  deleteQuiz(item){
   
    this.sharedService.DeleteQuiz(item.id).then(res=>{
      console.log(res);
      alert('Quiz Deleted');
      this.changeAccordingState()
    }).catch(err=>{
      console.log(err)
    })
  }

  editQuiz(item){
    console.log(item)
    this.route.navigate(['/teacher/editQuiz/',item.id])
  }

  changeAccordingState(){
    if(this.state === 'saved'){
      this.sharedService.getSavedQuiz()
      .then(res=>{
        this.listItems=res ;
        console.log(this.listItems)
      })

    } else if(this.state === 'publish'){
      this.sharedService.getPublishQuiz()
      .then(res=>{
        this.listItems = res;
      })
    }
  }

}
