# Web_dev_projects
This repository contain codes for Web Apps created. 

1. [StocksBee](/StocksBee): 
    It takes stock name as a input and displays quote, simple and exponential moving average, AROON values, Volume Weighted Price, OBV values, Hilbert Transform Trendline for the input stock. [Alphavantage](https://www.alphavantage.co/documentation/#) API is used to fetch data for the given stocks.

    - I have used react-material-ui for creating various components.
    - Since Alphavantage provides only 5 API requests per minute for free, I have added delay in redndering of some of the components.

    [Check out Video Demo here](/StocksBee/Stocksbee_React_app.mp4) 
    <img src="/StocksBee/StocksBee.png">

    To run the code: claim [Alphavantage key](https://www.alphavantage.co/support/#api-key) from here and edit in [Config.js file](/StocksBee/src/apis/CONFIG.js)


<br/><br/><br/>


2. [Quizbee](/QuizBee): 
    It is a simple web app that presents a quiz with five random questions out of 50 questions. It displays submitted answers, correct answers, total score, and play option on submitting the quiz.
    [Check out Video Demo here](/QuizBee/Quizbee.mp4) 

    On Selecting any option, color changes to red.<br>
    <img src="/QuizBee/quiz.png" height="200">

    It displays submitted answers, correct answers, total score, and play option on submitting the quiz
    <img src="/QuizBee/solution.png" height="200">


<br/><br/><br/>


3. [To-do list](/todo-list): 
    A simple web-app that allows user to add a new to-do task or view all the exisiting tasks. User can cross-off or delete item from the list. It uses local storage to maintain the list.

    <img src="/todo-list/TodoApp.png" height="300"> 

