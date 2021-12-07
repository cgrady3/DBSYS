var urlBase = "http://www.databases-group25-project.com/API";
var extension = ".php";
var fid;
var currSemester;
var isStaff;

window.onload = function () {
  readCookie();
  if (fid <= 0) doLogout();

  $("#viewRequestsContent").hide();

  if (isStaff == 1) {
    $(".adminTools").show();
    $(".profTools").hide();
  } else {
    $(".profTools").show();
    $(".adminTools").hide();
  }
};

$("#editUserpassword").click((e) => {
  var password = $("#facutlyNewPassword").val();

  var user = '{"fid" : "' + fid + '", "Password" : "' + password + '"}';

  var url = urlBase + "/UpdateUserPass" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.results) {
          $("#edit-error-message").text(
            "Your Account Information has been Successfully Updated"
          );
        } else {
          $("#edit-error-message").text("Could not update account");
        }
      }
    };
    xhr.send(user);
  } catch (err) {
    console.log(err.message);
  }
});

$("#changeFacultyInfo").click((e) => {
  var facultyID = $("#facutlyNewPassword").val();
  var name = $("#facutlyNewName").val();
  var email = $("#facutlyNewEmail").val();

  updateEmail(facultyID, email);
  updateName(facultyID, name);
});

$("#editFacultypassword").click((e) => {
  var facultyID = $("#passwordfacultyID").val();
  var password = $("#facultyNewPassword").val();

  var user = '{"fid" : "' + facultyID + '", "Password" : "' + password + '"}';

  var url = urlBase + "/UpdateUserPass" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.results) {
          $("#edit-error-message").text(
            "Your Account Information has been Successfully Updated"
          );
        } else {
          $("#edit-error-message").text("Could not update account");
        }
      }
    };
    xhr.send(user);
  } catch (err) {
    console.log(err.message);
  }
});

$("#deleteAdminAcct").click((e) => {
  if (
    confirm(
      "Are you sure you want to delete this account?"
    )
  ) {
    var facultyID = $("#deletefacultyID").val();

    var payload = '{"fid" : "' + facultyID + '"}';
    // send request to api
    var url = urlBase + "/DeleteUser" + extension;
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          doLogout();
        }
      };
      xhr.send(payload);
    } catch (err) {
      console.log(err.message);
    }
  }
});

$("#deleteAcct").click((e) => {
  if (
    confirm(
      "Are you sure you want to delete your account?"
    )
  ) {

    var payload = '{"fid" : "' + fid + '"}';
    // send request to api
    var url = urlBase + "/DeleteUser" + extension;
    var xhr = new XMLHttpRequest();
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try {
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          doLogout();
        }
      };
      xhr.send(payload);
    } catch (err) {
      console.log(err.message);
    }
  }
});

$("#createNewFacultyAcct").click((e) => {
  var Email = $("#user-email").val().trim().toLowerCase();
  var Password = $("#user-password").val().trim();
  var Name = $("#name").val().trim().toLowerCase();

  // validate email format
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

  var errorMsg = "";
  // validating password length
  if (!regex.test(Email)) {
    errorMsg = "Invalid email";
  } else if (Password.length < 8 || Password.length > 15) {
    errorMsg = "Invalid password length";
  } else {
    error = false;
  }

  // if validation error reload the page and exit
  // this function before API call starts
  if (error) {
    $("#signup-error").text(errorMsg);
    return;
  }

  // hashing password
  Password = md5(Password);

  var jsonPayload =
      '{"email" : "' +
      Email +
      '", "password" : "' +
      Password +
      '", "name" : "' +
      Name +
      '", "isStaff" : "' +
      1 +
      '"}';

  // URL path    
  var url = urlBase + "/RegisterUser" + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);

        if (jsonObject.error !== undefined) {
          $("#signup-error").text(jsonObject.error);
          return;
        }
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert(err);
    location.reload();
  }
})

$(".viewForms").click((e) => {
  e.preventDefault();

  $("#viewRequestsContent").show();
});

// set current semester and start create table process
$(".semester1").click((e) => {
  e.preventDefault();

  $("#viewRequestsContent").hide();

  currSemester = "spring 2022"
  console.log("currsememster: " + currSemester);

  if (isStaff) {
    loadSemesterOrders(currSemester);
  } else {
    loadProfsSemesterOrders(currSemester);
  }
});
$(".semester2").click((e) => {
  e.preventDefault();

  $("#viewRequestsContent").hide();

  currSemester = "summer 2022"
  console.log("currsememster: " + currSemester);

  if (isStaff) {
    loadSemesterOrders(currSemester);
  } else {
    loadProfsSemesterOrders(currSemester);
  }
});
$(".semester3").click((e) => {
  e.preventDefault();

  $("#viewRequestsContent").hide();

  currSemester = "fall 2022"
  console.log("currsememster: " + currSemester);

  if (isStaff) {
    loadSemesterOrders(currSemester);
  } else {
    loadProfsSemesterOrders(currSemester);
  }
});
$(".semester4").click((e) => {
  e.preventDefault();

  $("#viewRequestsContent").hide();

  currSemester = "spring 2023"
  console.log("currsememster: " + currSemester);

  if (isStaff) {
    loadSemesterOrders(currSemester);
  } else {
    loadProfsSemesterOrders(currSemester);
  }
});

// prefill modal fields for prof to edit
$("#editOrder").on("click", (e) => {
  e.preventDefault();

  var search = '{"oid" : "' + $(this).attr("orderID") + '"}';

  var url = urlBase + "/GetOrder" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);

        var courseResponse = jsonObject.course;
        var courseArr = courseResponse.split("");
        var semesterResponse = jsonObject.semester;
        var semesterArr = semesterResponse.split(" ");

        $("#order-subject").val(courseArr[0]);
        $("#order-courseNumber").val(courseArr[1]);
        $("#order-semester").val(semesterArr[0]);
        $("#order-year").val(semesterArr[1]);
        $("#order-title").val(jsonObject.title);
        $("#order-edition").val(jsonObject.edition);
        $("#order-authors").val(jsonObject.authors);
        $("#order-publisher").val(jsonObject.publisher);
        $("#order-isbn").val(jsonObject.isbn);
        $("#order-date").val(jsonObject.orderBy);
        $("#error-message").text("");
      }
    };
    xhr.send(search);
  } catch (err) {
    document.getElementById("orderResult").innerHTML = err.message;
  }
});

$("#submitOrder").on("click", (e) => {
  e.preventDefault();

  var subject = $("#order-subject").val();
  var courseNumber = $("#order-courseNumber").val();
  var cid = subject + " " + courseNumber;
  var season = $("#order-semester").val();
  var year = $("#order-year").val();
  var semester = season + " " + year;
  var isbn = $("#order-isbn").val();
  var uniqueID = fid + subject + courseNumber + season + year + isbn;

  var order =
    '{"fid" : "' +
    fid +
    '", "course" : "' +
    cid +
    '", "orderBy" : "' +
    $("#order-date").val() +
    '", "semester" : "' +
    semester +
    '", "title" : "' +
    $("#order-title").val() +
    '", "edition" : "' +
    $("#order-edition").val() +
    '", "authors" : "' +
    $("#order-authors").val() +
    '", "publisher" : "' +
    $("#order-publisher").val() +
    '", "isbn" : "' +
    isbn +
    '", "uniqueID" : "' +
    uniqueID +
    '"}';

  var url = urlBase + "/CreateNewOrder" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // Close modal and clear fields
        $("#orderModal").modal("hide");
        $("#order-subject").val("");
        $("#order-courseNumber").val("");
        $("#order-semester").val("");
        $("#order-year").val("");
        $("#order-title").val("");
        $("#order-edition").val("");
        $("#order-authors").val("");
        $("#order-publisher").val("");
        $("#order-isbn").val("");
        $("#order-date").val("");
        $("#error-message").text("");

        loadProfsSemesterOrders(currSemester);
      }
    };
    xhr.send(order);
  } catch (err) {
    document.getElementById("orderResult").innerHTML = err.message;
  }
});

// load order form for the currently selected semester
let loadProfsSemesterOrders = (semester) => {
  $("#requestFormTableBody").empty();

  var url = urlBase + "/GetProfsSemesterOrders" + extension;
  var xhr = new XMLHttpRequest();

  var search = '{"fid" : "' + fid + '", "semester" : "' + semester + '"}';

  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);

        if (jsonObject.length === undefined) {
          $("#searchMsg").text("No orders found");
          return;
        } else {
          createOrderTable(jsonObject);
        }
      }
    };

    xhr.send(search);
  } catch (err) {
    document.getElementById("orderResult").innerHTML = err.message;
  }
};

// load the orders for an entire semester
let loadSemesterOrders = (semester) => {
  $("#requestFormTableBody").empty();

  var url = urlBase + "/GetSemesterOrders" + extension;
  var xhr = new XMLHttpRequest();

  var search = '{"semester" : "' + semester + '"}';

  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.length === undefined) {
          $("#searchMsg").text("No orders found");
          return;
        } else {
          createOrderTable(jsonObject);
        }
      }
    };

    xhr.send(search);
  } catch (err) {
    document.getElementById("orderResult").innerHTML = err.message;
  }
};

// build table of order form
let createOrderTable = (orders) => {
  var template = document.getElementById("orderForm");
  var clone = template.content.firstElementChild.cloneNode(true);
  var header = clone.getElementsByClassName("card-header");
  var row = document.getElementById("row-1");
  var body = clone.querySelectorAll("li");
  var buttons = clone.querySelectorAll("button");
  var footer = clone.getElementsByClassName("card-footer");

  for (var i = 0; i < orders.length; i++) {
    let order = orders[i].orderBy
    var jsDate = new Date(Date.parse(order))
console.log("due by: " + jsDate)
    body[0].textContent = "Class: " + orders[i].class;
    body[1].textContent = "Title: " + orders[i].title;
    body[2].textContent = "Authors: " + orders[i].authors;
    body[3].textContent = "Edition: " + orders[i].edition;
    body[4].textContent = "Publisher: " + orders[i].publisher;
    body[5].textContent = "ISBN: " + orders[i].isbn;
    body[6].textContent = "Submit By: " + orders[i].orderBy;

    $(buttons[0]).attr("data-oid", orders[i].oid)
    $(buttons[1]).attr("data-oid", orders[i].oid)

    if (isStaff) {
      footer[0].html('<td><button type="button" class="btn btn-light tableButton" data-oid=' + orders[i].oid +  'id="submitOrder">Submit Order</button></td>')
    }

    row.appendChild(clone);
  }
};

let updateEmail = (facultyID, email) => {
  var user = '{"fid" : "' + facultyID + '", "email" : "' + email + '"}';

  var url = urlBase + "/UpdateUserEmail" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.results) {
          $("#edit-error-message").text(
            "The faculty's Email has been Successfully Updated"
          );
        } else {
          $("#edit-error-message").text("Could not update account");
        }
      }
    };
    xhr.send(user);
  } catch (err) {
    console.log(err.message);
  }
};

let updateName = (facultyID, name) => {
  var user = '{"fid" : "' + facultyID + '", "name" : "}';

  var url = urlBase + "/UpdateUserName" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.results) {
          $("#edit-error-message").text(
            "The faculty's Name has been Successfully Updated"
          );
        } else {
          $("#edit-error-message").text("Could not update account");
        }
      }
    };
    xhr.send(user);
  } catch (err) {
    console.log(err.message);
  }
};


$("#broadcastEmailReminder").click(function(){ 
  
  //call Broadcast.php
  var url = urlBase + "/Broadcast" + extension;
  var xhr = new XMLHttpRequest();
  
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  // Get json object of all emails
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        sendBroadcastEmailReminder(jsonObject);
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    console.log("broadcast-error");
  }
})

function sendBroadcastEmailReminder(emails){
  let emailList;
  if (emails.error !== undefined) {
    $("#broadcast-error").text(emails.error);
    return;
  }
  
  for(let i=0; i < emails.length; i++)
  {
    emailList.concat(emails[i], ',');
  }

  emailList.slice(0,-1);

  var jsonPayload = '{"emails" : "' + emailList + '"}';

  //call Broadcast.php
  var url = urlBase + "/SendIndividualEmail" + extension;
  var xhr = new XMLHttpRequest();
  
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  // Get json object of all emails
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        sendBroadcastEmailReminder(jsonObject);
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    console.log("broadcast-error");
  }
}


function readCookie() {
  var data = document.cookie;
  var splits = data.split(";");
  var thisOne = splits[0].trim();
  var tokens = thisOne.split("=");
  fid = parseInt(tokens[1].trim());
  isStaff = parseInt(tokens[3].trim());
}

function doLogout() {
  fid = 0;
  isStaff = 0;
  document.cookie =
    "fid = 0; isStaff = 0; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "../index.html";
}
