/* Outputs below are SQL output
   Final output will be encoded to JSON
*/

/* Student logs into app, and is given a list of
   eligible exams for a specific student.id = 1
*/
select e.id "ExamID", e.name "ExamName"
from exams e, students2exams se 
where e.id = se.examsid 
and current_timestamp > e.opens
and current_timestamp < e.closes
and se.studentsid = 1

/* A student selects which exam to take
   and all the questions for the specific exam 
   are returned for exam.id = 1
*/
select q.id "QuestionID",
       q.question "Question",
       q.a "A",
       q.b "B",
       q.c "C",
       q.d "D",
       q.e "E",
       q.numberchoices
from questions q, questions2exams qe
where q.id = qe.questionsid
and qe.examsid = 1;