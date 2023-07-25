// $(document).ready(() => {


//     function makePostCall(url, data) {
//         return $.ajax({
//             url: url,
//             method: 'POST',
//             dataType: 'json',
//             data: data,
//         });
//     }

//     function makeGetCall(url) {
//         return $.ajax({
//             url: url,
//             method: 'get',
//             dataType: 'json',
//             contentType: 'application/json',
//         })
//     }





//     $('#search-jobs').on('click', async (event) => {
// event.preventDefault();

// const searchField = $('#searchInput');
// const search = searchField.val();
// const url=`/jobs/search`
// const response = await makePostCall(url,{search});
// displayJobs(response);

//     })

//     function displayJobs(jobs) {
//         const jobListings = document.getElementById('jobListings');
//         jobListings.innerHTML = '';
    
//         jobs.forEach((job) => {
//             const jobCard = document.createElement('div');
//             jobCard.classList.add('job');
//             jobCard.innerHTML = `
//                 <h2>${job.title}</h2>
//                 <p>${job.location}</p>
//                 <p>${job.company}</p>
//                 <a href="${job.url}" target="_blank">Apply</a>
//             `;
//             jobListings.appendChild(jobCard);
//         });
//     }

    
// })
