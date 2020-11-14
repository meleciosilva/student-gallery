// Student Gallery Project

// This variable represents how many data objects (students) are displayed on each page
const perPage = 9;

//selects appropriate list and assigns to studentList variable
const studentList = document.querySelector('.student-list'); 

/* 
This function creates and appends the appropriate elements needed to display a single page of the correct number of students
Each student's name, picture, email address, and date of registration are displayed
*/

function showPage(list, page) {
   
   const startIndex = (page * perPage) - perPage; //identifies starting point of list items to display
   const endIndex = page * perPage; //identifies ending point of list items to display

   //assigns studentList to an empty string in order to remove previously displayed students
   studentList.innerHTML = ''; 
   
   for (let i = 0; i < list.length; i++) {
      //HTML will only display for students within starting and ending index on selected page
      if (i >= startIndex && i < endIndex) { 
         //creates HTML elements needed to display for each student on selected page/button and assigned to studentItem variable
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
         //displays studentItem at the end of studentList list
         studentList.insertAdjacentHTML('beforeend', studentItem); 
      };
   }
}

/* 
This function creates and appends the elements needed to display the appropriate number of pagination buttons on the bottom of the page
*/

function addPagination(list) {
   //dynamically displays the appropriate number of pagination buttons for a given number of students 
   let numberButtons = Math.ceil(list.length / perPage); 
   //selects appropriate list and assigns to linkList variable
   const linkList = document.querySelector('.link-list');
   //assigns linkList to an empty string in order to remove previously displayed pagination buttons
   linkList.innerHTML = '';

   for (let i = 0; i < numberButtons; i++) {
      //creates HTML elements needed to display the correct number of pagination buttons with correct number
      let listItem = `
         <li>
            <button type='button'>${[i + 1]}</button>
         </li>
      `;
         //displays listItem at the end of linkList list
         linkList.insertAdjacentHTML('beforeend', listItem);
   }
   
   //selects the first pagination button in linkList 
   const firstButton = linkList.firstElementChild.firstElementChild;
   //assigns the first pagination button an active class
   firstButton.className = 'active';

   //creates an event listener for click events
   linkList.addEventListener('click', (e) => {
      //creates and assigns the target event to the button variable
      const button = e.target;
      //selects the button with the .active class and assigns it to activeButton variable
      const activeButton = document.querySelector('.active');

      //condition = target event must be a button
      if (button.tagName === 'BUTTON') {
         activeButton.className = ''; //removes .active class from button with .active class
         button.className = 'active'; //adds .active class to targeted/clicked button
         }
      //calls function to display the list/data of students according to selected page/button number
      showPage(list, button.textContent);
   });
}

//calls showPage() function to display students on the first page (data objects 0-8)
showPage(data, 1);
//calls addPagination() function to display the correct number of pagination buttons for students/objects listed in the data array
addPagination(data);


// SEARCH BAR //

//selects the element with the .header class and assigns it to header variable
const header = document.querySelector('.header');
//creates a label element and assigns it to the label variable
const label = document.createElement('label');
//appends the label variable to the header element
header.appendChild(label);
//assigns the 'for' and 'search' attributes to the label element
label.setAttribute('for','search');
//assigns the class .student-search to the label element
label.className = 'student-search';
//creates and inserts the HTML elements needed to display a search bar with a search button
label.innerHTML = `
   <input id="search" placeholder="Search by name...">
   <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
`;

// selects input element with #search id and assigns it to search variable
const search = document.querySelector('#search');
// selects search button and assigns it to searchButton variable
const searchButton = label.getElementsByTagName('button')[0];

/*
This function compares search input with data/students and displays matched names on the page
*/
function searchItems(searchInput, list) {
   //creates a new data array and assigns it to searchedData variable
   let searchedData = [];
   //converts search input into lowercase letters and assigns it to searchedInputValue variable
   const searchedInputValue = searchInput.value.toLowerCase();
   
   for (let i = 0; i < list.length; i++) {
      let firstName = list[i].name.first.toLowerCase();
      let lastName = list[i].name.last.toLowerCase();
      //condition: if search input does not equal 0 and includes characters from first or last name
      if (searchedInputValue !== 0 && firstName.includes(searchedInputValue) || lastName.includes(searchedInputValue)) {
         searchedData.push(list[i]); //adds data objects that meet condition into new searchedData array
         showPage(searchedData, 1); //displays page with filtered data objects from searchedData array
         addPagination(searchedData); //displays correct number of pagination buttons specific to search input
      //condition: if searchedData array contains no objects/matches
      } else if (searchedData.length === 0) {
         //assigns studentList to an empty string in order to remove previously displayed students
         studentList.innerHTML = '';  
         //creates elements needed to display error message and assigns it to error variable
         let error = `
         <h1 style='color:red'>
         <center>
            Sorry, ${searchedInputValue} cannot be found. Try again.
         </center>
         </h1>
         `;
         //inserts error message at the beginning of studentList list
         studentList.insertAdjacentHTML('afterbegin', error);
       }
   }
}

//calls searchItems() function when searchButton is selected
searchButton.addEventListener('click', (e) => {
   searchItems(search, data);
});

//calls searchItems() function as search input is being filled
search.addEventListener('keyup', (e) => {
   searchItems(search, data);
}); 