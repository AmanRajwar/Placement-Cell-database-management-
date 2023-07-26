
$(document).ready(function () {
  let url = '/';
  let offset = 10; // Initial offset for the next batch of students



$('#student').addClass('active')
  

  function makePostCall(url, data) {
    return $.ajax({
      url: url,
      method: 'POST',
      dataType: 'json',
      data: data,
    });
  }

  function makeGetCall(url) {
    return $.ajax({
      url: url,
      method: 'get',
      dataType: 'json',
      contentType: 'application/json',
    })
  }





  
  function getFormattedDate(dateString) {
  
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
  
    // Return the formatted date as "Month Year" (e.g., "July 2023")
    return `${month} ${year}`;
  }

  // Function to fetch and render the next batch of students
  async function loadMoreStudents() {
    console.log('aman')
    url = `/students/get-student?offset=${offset}`
    const data = await makeGetCall(url);
    const ulTag = document.getElementById('students-list')

    data.forEach(student => {
      const element = `<li class="student" id=" ${student._id}">
    <div class="left-side">
        <h2>
             ${student.name}
        </h2>
        <span class="inline">
            <h2>College:</h2>
            <h4>
               ${student.college}
            </h4>
        </span>
        <span class="inline">
        <h2>Batch:</h2>
        <h4>
        ${getFormattedDate(student.batch)}
        </h4>
    </span>
        <span class="inline">
            <h3>Status:</h3>
            <select name="status" class="status-select" data-student-id="${ student._id}">
                <option value="placed" ${student.status === 'placed' ? 'selected' : ''}>Placed</option>
                <option value="not_placed" ${student.status === 'not_placed' ? 'selected' : ''} >Not Placed
                </option>
            </select>
    </div>
    <div class="right-side">
        <span class="inline">
            <h3>DSA Score:</h3>
            <p>${student.course_scores.DSA_Score}</p>
           
        </span>
        <span class="inline">
            <h3>WebD Score:</h3>
            <p>
                 ${student.course_scores.DSA_Score}
            </p>
           
        </span>
        <span class="inline">
            <h3>React Score:</h3>
            <p>
                 ${student.course_scores.DSA_Score} 
            </p>
        </span>
        <span class="inline">
        <h3>Student ID:</h3>
        <p>
            ${student._id} 
        </p>
    </span>
    </div>
</li>`

      ulTag.insertAdjacentHTML('beforeend', element);
    });
    offset += data.length;
  }




  async function updateStatus(data){
    url ='/students/update-data';
    const response= await makePostCall(url,data);
    if(response.message){
      console.log(response.message);
    }
  }

// Add event listener to handle changes in the select elements
$('#students-list').on('change', '.status-select', function () {
  // Get the student ID from the data attribute of the selected select element
  const studentId = $(this).data('student-id');
  const newStatus = $(this).val();
  const data = {
    studentId: studentId,
    status: newStatus,
  };
  // Call the updateStatus function to update the status in the database
  updateStatus(data);
});



  $(window).scroll(function () {
    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {

      // User has scrolled to the bottom of the page, load more students
      loadMoreStudents();
    }
  });








});

