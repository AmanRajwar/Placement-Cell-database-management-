$(document).ready(() => {

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


    // function to get date month and year from the response
    function getFormattedDate(dateString) {
        const date = new Date(dateString);
        const day = date.toLocaleString('default', { day: 'numeric' });
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        // Return the formatted date as "Day Month Year" (e.g., "21 July 2023")
        return `${month} ${day}, ${year}`;
    }





    //function to add a interview and render it on the page
    function addInterview(data) {
        console.log(data);
        const interviewDate = new Date(data.date);
        console.log(interviewDate);
        const ulTag = $('#interview-list')
        const liElement = `<li class="interview" id = ${data._id}>
                     <span class="inline">
                     <h2> Company:</h2>
                     <h4>
                        ${data.company}
                     </h4>
                 </span>
                 <span class="inline">
                     <h2> Date:</h2>
                     <h4>
                     ${getFormattedDate(data.date)}
                     </h4>
                 </span>
                </li>`


        ulTag.append(liElement);
    }


    async function updateResult(selectElement) {
        const studentId = selectElement.getAttribute('data-student-id');
        const interviewId = selectElement.getAttribute('data-interview-id');
        const result = selectElement.value;
        console.log(studentId, interviewId, result);
        // Now you can proceed with your update logic, either using makePostCall or any other method
    }


    async function fetchStudentsAndResults(interviewId) {
        try {
            const liElement = document.querySelector(`li.interview[id="${interviewId}"]`);
          if (liElement) {
            const existingList = liElement.querySelector('ul.result-list');
            if (existingList) {
              // Handle the click event on the list to prevent it from propagating
              existingList.addEventListener('click', (event) => event.stopPropagation());
              liElement.removeChild(existingList);
            } else {
           
                const url = `/interview/get-results?interviewId=${interviewId}`;
                const response = await makeGetCall(url);              
      
              const ulElement = document.createElement('ul');
              ulElement.classList.add('result-list');
      
              response.forEach((object) => {
                const liItem = document.createElement('li');
                liItem.innerHTML = `
                  <p>Student Name: ${object.student.name}</p>
                  <p>Result: <select class="status-select" data-student-id="${object.student._id}" data-interview-id="${interviewId}">
                    <option value="PASS" ${object.result === 'PASS' ? 'selected' : ''}>PASS</option>
                    <option value="FAIL" ${object.result === 'FAIL' ? 'selected' : ''}>FAIL</option>
                    <option value="On Hold" ${object.result === 'On Hold' ? 'selected' : ''}>On Hold</option>
                    <option value="Didn’t Attempt" ${object.result === 'Didn’t Attempt' ? 'selected' : ''}>Didn’t Attempt</option>
                  </select></p>
                `;
      
                ulElement.appendChild(liItem);
              });
      
              ulElement.style.opacity = '0';
              setTimeout(() => {
                ulElement.style.opacity = '1';
              }, 100);
      
              liElement.appendChild(ulElement);
            }
          } else {
            console.log('Matching <li> element not found.');
          }
        } catch (error) {
          console.log('Error fetching student data:', error);
        }
      }

      

// Delegating the change event to a static parent element
$('#interview-list').on('change', '.status-select', async function() {
    // Get the student ID and interview ID from the data attributes of the selected select element
    const studentId = $(this).data('student-id');
    const interviewId = $(this).data('interview-id');
    const newStatus = $(this).val();
    const data = {
        studentId: studentId,
        status: newStatus,
        interviewId:interviewId
      };
      const url = `/interview/update-result`;
    await makePostCall(url,data)
  });
  
   


    // On click --->when any interview is clicked  elements
    $('.interview-container').on('click', async (event) => {
        const interviewId = $(event.currentTarget).data('interview-id');
        fetchStudentsAndResults(interviewId);
    });


    //on click ---> when allocate button is clicked in an interview
    $('.allocate-interview').on('click', async (event) => {
        event.preventDefault();
        const spanElement = $(event.currentTarget).parent();
        const interviewId = spanElement.data('interview-id');
        const studentId = spanElement.find('.student-input').val();
        const url = '/interview/allocate';
        const data = { interviewId, studentId };
        const response = await makePostCall(url, data);
        if (response.message) {
            console.log(response.message)
        }
    });





    //On click ---> Add Interview
    $('#interviewForm').on('submit', async function (event) {
        event.preventDefault();
        console.log("nitin");
        // Get the form data
        const formData = $(this).serialize();
        const url = '/interview/add';
        const data = await makePostCall(url, formData);
        addInterview(data);// function which adds the interview 
    });
















})