let ind_Q=0;
let arr_names=[];
let counter=0; //for increase degree once true question
let selected_student_name='';
let No_of_questions=4; //just edit this number for increase or decrease no of question
arr_names=JSON.parse(localStorage.getItem('stu_data'));
const questions=[
    {
    Q_no:"Full form of URL is?",
    answers:{
        a:"Uniform Resource Locator",
        b: "Unifrom Registered Link",
        c:"Uniform Resource Link",
        d:"Unified esource Link"
        },
         correct_choice:"Uniform Resource Locator"
    },//end Q1
    {
        Q_no:"What is the sum of 100+1?",
        answers:{
            a:"1",
            b: "100",
            c:"101",
            d:"10"
            },
            correct_choice:101
        },//end Q2
        {
            Q_no:"What is the sum of 10+10?",
            answers:{
                a:"1",
                b: "20",
                c:"101",
                d:"10"
                }, 
                correct_choice:20
            },//end Q3
            {
                Q_no:"json stands for?",
                answers:{
                    a:"JavaScript Object Notation",
                    b: "Java Object Notation",
                    c:"JQuery Object Notation",
                    d:"none of the above"
                    }, 
                    correct_choice:'JavaScript Object Notation'
                }//end Q3


];//end array of question



//to get Unique Randome index of array for Randome Question
const arr = [];
while (arr.length < No_of_questions) {
  let r = Math.floor(Math.random() * No_of_questions);
  if (arr.indexOf(r) === -1) {
    arr.push(r);
  }
}


let obj_answers=questions[arr [ind_Q]].answers;

ind_Q=-1;
let name_status=[];
document.getElementById("names").addEventListener("input",function(){
    selected_student_name=this.value;
    document.getElementById("student_name").innerHTML=`<u>Student Name:</u><span style="color:#eaeaea"> ${this.value} </span>`;
    document.querySelector(".main div").innerHTML="";
    if(arr_names ==null){
        arr_names=[];
    }
    name_status=arr_names.find( (ele)=>{ 
        if(ele.studentName == selected_student_name){
            return 'true';
        }

    }
    );

    if(name_status !=undefined) {
        document.getElementById("btn_start").style.visibility="hidden";
        finish();

    }




    localStorage.setItem("studentName",this.value );
   




});//end of select name


// Start button
document.getElementById("btn_start").addEventListener("click",function(){
    this.style.visibility="hidden";
    // document.getElementById("btn_next").style.visibility="hidden";
    // document.getElementById("btn_back").style.visibility="visible";
    document.querySelector(".main div").innerHTML="<h2>your Exam will start now. As soon as you start! you have only 3 minutes<br></h2> <h1 style='color:white; background:green'>You Must press button Finish to finish your exam and get your degree</h1><br><button class='btn_agree' onclick='leftOut();next_question()' >I agree</button>";
    
    if(arr_names ==null) { //to solve problem of return array null 
        arr_names= [];
       }
    s_data={'studentName':selected_student_name, 'correctAnswer':counter};
    arr_names.push(s_data);
    localStorage.setItem("stu_data", JSON.stringify(arr_names));

    
}); //end of start button 








//function to get degree once enter the correct answer

function radio_value(){
    let correctAnswer=document.querySelector('input[type = radio]:checked').value;
    if(correctAnswer== questions[arr [ind_Q]].correct_choice){
        counter++;
    }
   
    localStorage.setItem("correctAnswer", counter);
}


function get(){
    let item=localStorage.getItem("correctAnswer");
console.log(item)
}

//function to finish exam if you want before time out
function finish(){
    document.querySelector(".main div").style.display="block";
    document.getElementById("answer").innerHTML="";
    document.getElementById("question_no").style.display="none";
    document.getElementById("btn_back").style.visibility="hidden";
    document.getElementById("btn_next").style.visibility="hidden";
    //this two line for modify degree after press finish button for every student
      arr_names[arr_names.length -1].correctAnswer=counter;
      localStorage.setItem("stu_data", JSON.stringify(arr_names));

    name_status=arr_names.find( (ele)=>{ 
        if(ele.studentName == selected_student_name){
            return true;
        }
    }
    );
   
    const stu_name=name_status.studentName;
    const stu_degree=name_status.correctAnswer;

    document.querySelector(".main div").innerHTML="<h2>you Finish this exam</h2>";
    if(stu_degree==No_of_questions){
        document.querySelector(".main div").innerHTML += `<div style="color:green"><u>Your Name is</u> : ${stu_name}</div><br>`;
        document.querySelector(".main div").innerHTML += `<div style="color:green"><u>Your Grade is :</u> ${stu_degree}</div>`;
    }
    else{
        document.querySelector(".main div").innerHTML += `<div style="color:red"><u>Your Name is</u> : ${stu_name}</div><br>`;
    document.querySelector(".main div").innerHTML += `<div style="color:red"><u>Your Grade is :</u> ${stu_degree}</div>`;
    }
    

}

//function that calculate time
let sec=0;
let min=3;
function leftOut(){
    document.getElementById("clock").innerHTML=`0${min} : 0${sec}`;
    sec=59;
    min=2;
    let _timer=setInterval(function(){
        document.getElementById("clock").innerHTML=`0${min} : ${sec}`;
        if(sec<9){
            document.getElementById("clock").innerHTML=`0${min} : 0${sec}`;
        }
        if(sec <= 0){
            min --;
            sec=59;
        }  
        sec--;
        //display student degree
        if(min <0){
            clearInterval(_timer);
            document.getElementById("btn_back").style.visibility="hidden";
            document.getElementById("btn_next").style.visibility="hidden";
            finish();
        }
    },1000);
}

//function for next button

function next_question(){
    document.getElementById("btn_back").style.visibility="hidden";
    document.getElementById("btn_next").style.visibility="visible";
    ind_Q++;
    document.querySelector(".main div").style.display="none";
    document.getElementById("answer").innerHTML="";
    document.getElementById("question_no").style.display="block";
   
    document.getElementById("question_no").innerHTML=questions[arr [ind_Q]].Q_no; // display random question
    for(obj in obj_answers){
        document.getElementById("answer").innerHTML += `<div class="lbl_answer"><input type="radio" style=" width: 18px;
        height: 18px;"  name="g1" value='${questions[arr [ind_Q]].answers[obj]}' ><label style="font-size:24px;padding-left:10px" for="lbl_"${ind_Q} >${questions[arr [ind_Q]].answers[obj]} </label></div><br>`;
       
    }
   
}

// next button
document.getElementById("btn_next").addEventListener("click", function(){
   let checked_status=false;  // to force user choose one answer
    for(let i=0; i<4;i++){
        if((document.querySelectorAll('input[type = radio]')[i].checked) ==true){
           checked_status=true;
        }  
    }

   
   
    if(ind_Q >= No_of_questions-1){
        document.getElementById("btn_next").style.visibility="hidden";
        document.getElementById("btn_back").style.visibility="visible";
        
    }// disable next button
    else{
        if(checked_status ==false){
            document.getElementById("answer").innerHTML +="<div class='warning' style='background-color:red ;text-align: center;'>You Must Choose One answer</div>"
            // alert("You Must Choose One answer");
        }
        else{
            next_question()
            document.getElementById("btn_back").style.visibility="visible";
        }
       
    }

   
});

// previous button
document.getElementById("btn_back").addEventListener("click", function(){
    if(ind_Q <1){
        document.getElementById("btn_back").style.visibility="hidden";
        document.getElementById("btn_next").style.visibility="visible";
        // document.getElementById("btn_back").disabled =true
    }// disable next button
    else{
        document.getElementById("btn_next").style.visibility="visible";
        document.querySelector(".main div").innerHTML="";
        document.getElementById("answer").innerHTML="";
        document.getElementById("question_no").innerHTML="";
        ind_Q--;
        
        document.getElementById("question_no").innerHTML=questions[arr [ind_Q]].Q_no; // display random question
        for(obj in obj_answers){
            document.getElementById("answer").innerHTML += `<div class="lbl_answer"><input type="radio" style=" width: 18px;
            height: 18px;"  name="g1" value='${questions[arr [ind_Q]].answers[obj]}' ><label style="font-size:24px;padding-left:10px" for="lbl_"${ind_Q} >${questions[arr [ind_Q]].answers[obj]} </label></div><br>`;
           
        }
    }

    document.getElementById("answer").onclick =function(){
        let correctAnswer2=document.querySelector('input[type = radio]:checked').value;
       if(correctAnswer2==questions[arr [ind_Q]].correct_choice ){
        counter++;
       }
    }

});


