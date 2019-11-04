export class Question {
    public title:String;
    public possibleAnswers:String[];
    public correctAnswer:String;
    public explanation:string;
    // public static counter : number=0;
    public Id:number;

    constructor(id:number,title:string, possAns:string[], corrAns:string, explan:string){
        this.title = title;
        this.correctAnswer = corrAns;
        this.possibleAnswers = possAns;
        this.explanation = explan;
        this.Id = id;
        
        

    }
}
