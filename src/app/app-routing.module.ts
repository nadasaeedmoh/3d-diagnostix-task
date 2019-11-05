import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';
import { LoginComponent } from './login/login.component';
import { CreateQuizComponent } from './teacher/create-quiz/create-quiz.component';
import { QuizListComponent } from './teacher/quiz-list/quiz-list.component';
import { HomeComponent } from './teacher/home/home.component';
import { TeacherAuthGuardService } from './guard/teacher-auth-guard.service';
import { EditQuizComponent } from './teacher/edit-quiz/edit-quiz.component';

const routes: Routes = [
  {path:"teacher", component: TeacherComponent , 
  children:[
    {path:'editQuiz/:id',component:EditQuizComponent},
    {path:"createquiz", component:CreateQuizComponent},
    {path:"savedquizzes", component:QuizListComponent},
    {path:"publishedquizzes", component:QuizListComponent},
    {path:"home", component: HomeComponent}

  ],
  canActivate:[TeacherAuthGuardService]
},
  {path: "login", component: LoginComponent},
  {path: "", component: LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
