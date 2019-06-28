CREATE TABLE students ( 
    id             INT NOT NULL AUTO_INCREMENT,
    firstname      VARCHAR(50) NOT NULL,
    lastname       VARCHAR(50) NOT NULL,
    email          VARCHAR(50) UNIQUE NOT NULL,
    password       VARCHAR(200) NOT NULL,
    isAdmin        BOOLEAN DEFAULT false,
    challenge      VARCHAR(6),
    verified       BOOLEAN DEFAULT false,
    lastlogindate  DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    createdate     DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE questions (
    id             INT NOT NULL AUTO_INCREMENT,
    question       varchar(320) NOT NULL,
    a              varchar(160),
    b              varchar(160),
    c              varchar(160),
    d              varchar(160),
    e              varchar(160),
    answer         varchar(1),
    numberchoices  int,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE exams (
    id             INT NOT NULL AUTO_INCREMENT,
    name           varchar(50),
    opens          DATETIME,
    closes         DATETIME,
    PRIMARY KEY(id)
) ENGINE=INNODB;

CREATE TABLE questions2exams (
    id             INT NOT NULL AUTO_INCREMENT,
    examsid        INT,
    questionsid    INT,
    PRIMARY KEY(id),
    FOREIGN KEY (examsid) REFERENCES exams(id),
    FOREIGN KEY (questionsid) REFERENCES questions(id)
) ENGINE=INNODB;

CREATE TABLE students2exams (
    id             INT NOT NULL AUTO_INCREMENT,
    examsid        INT,
    studentsid     INT,
    taken          BOOLEAN,
    score          float,
    PRIMARY KEY(id),
    FOREIGN KEY (examsid) REFERENCES exams(id),
    FOREIGN KEY (studentsid) REFERENCES students(id)
) ENGINE=INNODB;

CREATE TABLE examresults (
    id             INT NOT NULL AUTO_INCREMENT,
    examsid        INT,
    studentsid     INT,
    questionsid    INT,
    answered       VARCHAR(1),
    PRIMARY KEY(id),
    FOREIGN KEY (examsid) REFERENCES exams(id),
    FOREIGN KEY (studentsid) REFERENCES students(id),
    FOREIGN KEY (questionsid) REFERENCES questions(id)
)


