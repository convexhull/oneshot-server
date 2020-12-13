require('dotenv').config();
require('../db/db');
const mongoose = require('mongoose');


/**
 * This is a script to insert fake data into the database.
 * This is to be run only once, for indexing data into db for demo purpose.
 */

//import mongoose models
const College = require('../components/colleges/model');
const Student = require('../components/students/model');



/**
 * College fake data generators
 */

const stockStateNames = [
    {
        stateName: "UP",
        cities: ["Varanasi", "Agra", "Lucknow"]
    },
    {
        stateName: "MP",
        cities: ["Bhopal", "Indore", "Gwalior"]
    },
    {
        stateName: "Rajasthan",
        cities: ["Jaipur", "Kota", "Pilani"]
    },
    {
        stateName: "Gujarat",
        cities: ["Ahmedabad", "Vadodara"]
    },
    {
        stateName: "AP",
        cities: ["Vijaywada", "Tirupati", "Vishakhapatnam"]
    },
    {
        stateName: "Maharashtra",
        cities: ["Mumbai", "Nagpur", "Nashik"]
    },
    {
        stateName: "Sikkim",
        cities: ["Gangtok", "Ravangla"]
    },
    {
        stateName: "West Bengal",
        cities: ["Kolkata", "Durgapur", "Darjeeling"]
    },
    {
        stateName: "Tamil Nadu",
        cities: ["Chennai", "Madurai", "Kodaikanal"]
    }
];



const randomCoursesGenerator = () => {
    const stockCourses = [
        "computer science", "IT", "electrical", "electronics", "civil", "mechanical", "biotech", "chemical", "metallurgical", "marine", "aerospace"
    ]

    const selectedCourses = [];
    
    //select 3 random courses
    selectedCourses.push(stockCourses[randomNumberGenerator(0, stockCourses.length)]);
    selectedCourses.push(stockCourses[randomNumberGenerator(0, stockCourses.length)]);
    selectedCourses.push(stockCourses[randomNumberGenerator(0, stockCourses.length)]);

    //remove duplicates and return set of selected courses
    return selectedCourses.filter( (el, idx) => selectedCourses.indexOf(el) === idx);

}




const randomNumberGenerator = (low, high) => {
    //this function returns a random integer in range [low, high) 
    let diff = high - low;
    return low + Math.floor(Math.random()*diff);
}


/**
 * Random generators for student info
 */

const randomStudentNameGenerator = () => {
    const firstNames = [
        "Romit", "Rahul", "Anil", "Aamir", "Sneha", "Shreya", "Riya", "Amit", "Gaurav", "Sanju", "Ranbir", "Aalia", "Sudhir", "Anjana", "Natalie"
    ]
    const lastNames = [
        "Sharma", "Awasthi", "Vyas", "Reddy", "Singh", "Malhotra", "Khan", "Patil", "Gautam", "Ganesan", "Saxena", "Bharadwaj", "Bajaj", "Samson"
    ]
    const randomName = firstNames[randomNumberGenerator(0, firstNames.length)] + " " + lastNames[randomNumberGenerator(0, lastNames.length)];
    return randomName;
}



const randomSkillsGenerator = () => {
    const stockSkills = [
        "c++",
        "python",
        "java",
        "javascript",
        "algorithms",
        "data structures",
        "react.js",
        "node.js",
        "flutter",
        "rabbit-mq"
    ]
    const selectedSkills = [];

    //randomly select skills
    selectedSkills.push(stockSkills[randomNumberGenerator(0,10)]);
    selectedSkills.push(stockSkills[randomNumberGenerator(0,10)]);
    selectedSkills.push(stockSkills[randomNumberGenerator(0,10)]);

    //filter duplicates and return
    return selectedSkills.filter( (el, idx) => selectedSkills.indexOf(el) === idx)
}

/**
 * The db data indexer
 * # dataIndexer() indexes the colleges into db. 
 * # It first creates 100 student documents for each college and stores their _id in student_ids array of the college document.
 * # It indexes each of the student document into db 
 * # Then it indexes the college document into db. 
 * # dataIndexer() is evoked 100 times using for loop. Each time the college counter is incremented.
 */


//this counter refers to current college and is incremented after each invocation of dataIndexer()
let collegeCounter = 1;

const dataIndexer = async () => {
    let randomStateIndex = randomNumberGenerator(0, 9);
    let chosenState = stockStateNames[randomStateIndex];
    let numberOfCities = chosenState.cities.length;
    let chosenCityIndex = randomNumberGenerator(0, numberOfCities);

    const collegeInfo = {
        _id: mongoose.Types.ObjectId(),
        name: `College ${collegeCounter}, ${chosenState.cities[chosenCityIndex]}`,
        yearFounded: randomNumberGenerator(1950, 1980),
        city: chosenState.cities[chosenCityIndex],
        state: chosenState.stateName,
        country: "India",
        courses: randomCoursesGenerator(),
        student_ids: []
    }

    //insert 100 students into each college
    for(let i = 1; i<= 100; i++){
        const studentInfo = {
            _id: mongoose.Types.ObjectId(),
            name: randomStudentNameGenerator(),
            yearOfBatch: randomNumberGenerator(2000, 2020),
            college_id: collegeInfo._id,
            skills: randomSkillsGenerator()
        }
        collegeInfo.student_ids.push(studentInfo._id);
        let studentObj = new Student(studentInfo);
        await studentObj.save();
    }
    const collegeObj = new College(collegeInfo);
    await collegeObj.save();
}



for(let i = 1;i<=100;i++){
    dataIndexer();
    collegeCounter++;
}