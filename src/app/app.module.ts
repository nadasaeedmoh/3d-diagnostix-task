import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule, FormsModule} from '@angular/forms'
import { SharedService } from './shared/shared.service';
import { HttpClientModule } from '@angular/common/http';
import { TeacherComponent } from './teacher/teacher.component';
import { HeaderComponent } from './teacher/header/header.component';
import { CreateQuizComponent } from './teacher/create-quiz/create-quiz.component';
import { QuestionFormComponent } from './teacher/create-quiz/question-form/question-form.component';
import {NgbModule, NgbModalRef} from '@ng-bootstrap/ng-bootstrap';
import { QuestionListComponent } from './teacher/create-quiz/question-list/question-list.component';
import { QuizListComponent } from './teacher/quiz-list/quiz-list.component';
import { HomeComponent } from './teacher/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TeacherComponent,
    HeaderComponent,
    CreateQuizComponent,
    QuestionFormComponent,
    QuestionListComponent,
    QuizListComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule
    
  ],
  providers: [SharedService],
  bootstrap: [AppComponent],
  entryComponents:[QuestionFormComponent]
})
export class AppModule { }
