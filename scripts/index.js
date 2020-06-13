// DOM elements
const guideList = document.querySelector('.guides');
const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');
const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
  if (user) {
    if (user.admin) {
      adminItems.forEach(item => item.style.display = 'block');
    }
    // account info
    db.collection('users').doc(user.uid).get().then(doc => {
      const html = `
        <div>Logged in as ${user.email}</div>
        <div>${doc.data().bio}</div>
        <div class="pink-text">${user.admin ? 'Admin' : ''}</div>
      `;
      accountDetails.innerHTML = html;
    });
    // toggle user UI elements
    loggedInLinks.forEach(item => item.style.display = 'block');
    loggedOutLinks.forEach(item => item.style.display = 'none');
  } else {
    // clear account info
    accountDetails.innerHTML = '';
    // toggle user elements
    adminItems.forEach(item => item.style.display = 'none');
    loggedInLinks.forEach(item => item.style.display = 'none');
    loggedOutLinks.forEach(item => item.style.display = 'block');
  }
};

// setup guides
const setupGuides = (data) => {

  if (data.length) {
    let html = '';
    data.forEach(doc => {
      const guide = doc.data();
      const li = `
        <li>
          
          <div class="collapsible-header indigo lighten-4" style="color:#5B08B6;font-family: 'ABeeZee'; font-size:18px;"> ➼ ${guide.title} </div>
          <div class="collapsible-body grey lighten-5" style="color:#5B2C6F;font-family: 'Architects Daughter';font-size: 18px;"> ${guide.content} </div>
          <div class="collapsible-body  indigo lighten-5" style="color:#249CCA;font-size:19px;font-family:'Caveat';"> 
          Written by: ${guide.username}
          <div> Subject: ${guide.subject} </div>
                        </div>
        </li>
      `;
      html += li;
    });
    guideList.innerHTML = html
  }
  else {
      guideList.innerHTML = `<div class="center-align" 
                          style="padding-top:200px;
                          color:white;
                          font-size:80px;
                          font-family: Satisfy;
                          text-shadow: DarkOrchid 2px 1px 13px;"> 
                            Login to view our blogs!
                            </div>`;
    }
   
  

};

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

  var modals = document.querySelectorAll('.modal');
  M.Modal.init(modals);

  var items = document.querySelectorAll('.collapsible');
  M.Collapsible.init(items);

});