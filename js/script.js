// Student Gallery Project

// This variable represents how many data objects (students) are displayed on each page
const perPage = 9;

/* 
This function creates and appends the appropriate elements needed to display a single page of the correct number of students
Each student's name, picture, email address, and date of registration are displayed
*/

function showPage(list, page) {
   const startIndex = (page * perPage) - perPage;
   const endIndex = page * perPage;
   const studentList = document.querySelector('.student-list');
   studentList.innerHTML = '';
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let studentItem = ` 
            <li class = 'student-item cf'>
               <div class = 'student-details'>
                 <img class = 'avatar' src = ${list[i].picture.large} alt = 'Profile Picture'>
                 <h3>${list[i].name.first} ${list[i].name.last}</h3> 
                 <span class = 'email'> ${list[i].email} </span>
               </div>
               <div class = 'joined-details'>
                  <span class = 'date'> Joined: ${list[i].registered.date}</span>
               </div>
            </li>
         `; 
         studentList.insertAdjacentHTML('beforeend', studentItem);
      };
   }
}

/* 
This function creates and appends the elements needed to display the appropriate number of pagination buttons on the bottom of the page
*/

function addPagination(list) {
   let numberPages = Math.ceil(list.length / perPage);
   const ul = document.querySelector('.link-list');
   ul.innerHTML = '';
   for (let i = 0; i < numberPages; i++) {
      let pageNumber = `
         <li>
            <button type='button'>${[i + 1]}</button>
         </li>
      `;
      ul.insertAdjacentHTML('beforeend', pageNumber);
   }
   const firstListItem = ul.firstElementChild;
   firstListItem.className = 'active';
   
   ul.addEventListener('click', (event) => {
      const allButtons = ul.getAttribute('button');
      const activeButton = event.target;
      if (activeButton.tagName === 'BUTTON') {
         for (let i = 0; i < allButtons; i++) {
            ul.querySelector('.active') = '';
            activeButton.className = 'active';
            }
         showPage(list, activeButton.textContent);   
      }
   });
   console.log(list);
}

// Calling showPage(list, page) and addPagination(list) functions to display first page of students and pagination buttons

showPage(data, 1);
addPagination(data);

// Creates and appends the elements needed to display a search bar on the top of the page

const h2 = document.querySelector('h2');
const label = document.createElement('label');
h2.appendChild(label);
label.setAttribute('for','search');
label.className = 'student-search';
label.innerHTML = `
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
`;