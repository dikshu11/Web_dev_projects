import React, {Component} from "react";
import ReactDOM from "react-dom";
import "./assets/style.css"
import quizService from "./quizService"
import QuestionBox from "./components/QuestionBox"


class QuizBee extends Component {
    state = {
        questionBank: [],
        score: 0,
        displayAnswers: "none"
    };

    computeAnswer = (answer, questionId ) => {
        this.setState((state) => ({
            questionBank: state.questionBank.map( question => {
                if( question.questionId === questionId ){
                    return {
                        ...question,
                        userAnswer: answer
                    }
                }
                return {...question}
            })
        }))
        this.setState((state) => ({
            questionBank: state.questionBank,
            score: state.questionBank.filter(question => question.correct === question.userAnswer).length
        }))
    }

    getQuestions = () => {
        quizService().then( response => {
            this.setState({
                questionBank: response.map(x => {
                    return {
                        ...x,
                        userAnswer: ""
                    }
                }),
                score: 0,
                displayAnswers: "none"
            });
        });  
    }

    playAgain = () => {
        this.getQuestions();
    }
    componentDidMount(){
        this.getQuestions();
    }

    onSubmitHandle = (id) => {
         this.setState({
             displayAnswers:"block"
         })
    }

    render(){
        return (
            <div className='container'>
                <div className='title'> QuizBee </div>
                { this.state.questionBank.length > 0 && 
                this.state.questionBank.map( ({question, answers, correct, questionId, userAnswer}) => 
                    <div>
                        <QuestionBox 
                            question={question} 
                            options={answers} 
                            key={questionId}
                            selected={answer => this.computeAnswer(answer, questionId)}/>
                        <div style={{display:this.state.displayAnswers}}>
                            <div className='answer'> 
                                <div><b>Your Answer :  </b> {userAnswer}</div>
                                <div><b>Correct Answer : </b>  {this.state.displayAnswers==="block"?correct:""}</div>
                            </div>
                        </div>
                    </div>
                )};

                <div className='submitBtn' >
                    <button onClick={this.onSubmitHandle} style={{display:this.state.displayAnswers==="block"?"none":"block"}}> Submit Quiz </button>
                </div>
                <div className='playAgain' >
                    <div style={{display:this.state.displayAnswers!=="block"?"none":"block"}}>
                        <h1 > Your Score: {this.state.score}</h1>
                        <button onClick={this.playAgain} > Play Again </button>
                    </div>
                </div>
            </div>

        )
    }
}

ReactDOM.render(<QuizBee/>, document.getElementById("root"));

