import React, {useState} from "react";

function QuestionBox({question, options, selected}){
    const [answer, setAnswer] = useState( options.map( x => {
        return {
            text: x,
            color: 'orange'
        }
    }));

    // const [userAnswer, setUserAnswer] = useState(1);
    function handleOnClick(id){
        setAnswer( answer.map(({text, color}, index) => {
            if( index === id ){
                return {
                    text: text,
                    color: 'green'
                }
            }

            return {
                text: text,
                color: 'orange'
            }

        }))
    } 

    return (
        <div className="questionBox">
            <div className="question">{question}</div>
            <div>
                { answer.map(( {text, color}, index) => (
                    <button key={index} 
                        className='answerBtn'
                        style={{backgroundColor:color}} 
                        onClick={() => {
                            handleOnClick(index)
                            selected( text )
                        }}>
                        {text}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionBox;