delete from examresults;
alter table examresults auto_increment = 1;

delete from questions2exams;
alter table questions2exams auto_increment = 1;

delete from students2exams;
alter table students2exams auto_increment = 1;

delete from questions;
alter table questions auto_increment = 1;

delete from exams;
alter table exams auto_increment = 1;

delete from students;
alter table students auto_increment = 1;

insert into students (firstname, lastname, email, password, isAdmin, challenge, verified)
values ('Mark', 'Fuller', 'fuller.mark.e@gmail.com', 'welcome123', true, '184769', true),
       ('Thanh', 'Dat Le', 'dat0816@gmail.com', 'welcome123', true, '247591', true),
       ('Michael', 'Santiago', 'michael.alec.santiago@gmail.com', 'welcome123', true, '937847', true),
       ('Enelson', 'Castro', 'enecastro@knights.ucf.edu', 'welcome123', true, '162985', true),
       ('Nicholas', 'Riley', 'nicholasR4132@gmail.com', 'welcome123', true, '839561', true),
       ('Carmen', 'Fuller', 'carmenfuller@gmail.com', 'welcome123', false, '184769', false);
       
insert into questions (question, a , b, c, d, e, answer, numberchoices)
values ('All of following are part of the waterfall method except for:',
        'Requirement Analysis', 'System Design', 'Scrum Meetings', 'Coding', 'Testing', 
        'c', 5),
       ('Two major components of software engineering are analysis and synthesis.',
        'True', 'False', null, null, null,
        'a', 2),
       ('Which diagram is used to show aggregation and composition of objects?',
        'Entity Relationship Diagram', 'UML Class Diagram', 'Organizational Chart',
        'Event Trace Chart', 'State Diagram',
        'b', 5),
       ('All of the following are forms of system testing as a whole except',
        'function testing','performance testing', 'acceptance testing', 'unit testing', null,
        'd', 4);
        
insert into exams (name, opens, closes)
values ('cop4331_exam1', '2019-06-27 16:00:00', '2019-08-02 23:59:00'),
       ('cop4331_exam2', '2019-07-15 16:00:00', '2019-08-02 23:59:00'),
       ('cop4331_exam2a', '2019-07-15 16:00:00', '2019-08-02 23:59:00'),
       ('cop4331_exam2b', '2019-07-15 16:00:00', '2019-08-02 23:59:00'),
       ('cop4331_exam2c', '2019-07-15 16:00:00', '2019-08-02 23:59:00'),
       ('cop4331_exam3', '2019-07-29 16:00:00', '2019-08-02 23:59:00');

insert into questions2exams (examsid, questionsid)
values (1,1),
       (1,2),
       (1,4);
       
insert into students2exams (examsid, studentsid, taken, score)
values (1, 1, true, 0.33),
       (2, 1, false, 0.0),
       (3, 1, false, 0.0),
       (1, 2, false, 0.0),
       (2, 2, false, 0.0),
       (3, 2, false, 0.0),
       (4, 2, false, 0.0),
       (5, 2, false, 0.0),
       (1, 3, false, 0.0),
       (1, 4, false, 0.0),
       (1, 5, false, 0.0);

insert into examresults (examsid, studentsid, questionsid, answered)
values (1,1,1,'c'),
       (1,1,2,'b'),
       (1,1,4,'a');

commit;