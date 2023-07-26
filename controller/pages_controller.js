
const Interview = require('../models/interview');
const Student = require('../models/students');
const InterviewResult = require('../models/interview_results');


const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '10c47ccc02mshe0fd12625dd1950p1927eejsn6bf33a06d825',
    'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
  }
};

module.exports.renderInterviews = async (req, res) => {
  try {

    const interviews = await Interview.find({});

    return res.render('interview', {
      title: "Interviews",
      interviews: interviews,
      showHeader:true
    });

  } catch (error) {
    console.log("Error in rendering Interviews --->", error);
    return res.redirect('back');
  }
}

module.exports.addStudentPage = async (req, res) => {
  // console.log('reached to pages controller')
  return res.render('add_student', {
    title: "Add student",
    showHeader:true
  })
}



module.exports.getJobs = async (req, res) => {
  const url = 'https://jsearch.p.rapidapi.com/search?query=india&page=1&num_pages=1';
    
  try {
    const response = await fetch(url, options);
    const result = await response.json();
  
    return res.render('jobs', {
      title: "Jobs Portal",
      jobs: result.data,
      showHeader:true
    })
  } catch (error) {
    console.error("Error in fetching the jobs",error);
    return res.redirect('back')
  }
}

