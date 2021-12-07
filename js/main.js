var urlBase = "http://www.databases-group25-project.com/API";
var extension = ".php";
var fid;
var currSemester;
var isStaff;
var selectedOrder;
var oid;

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

$("#logout").click((e) => {
  doLogout();
});

$("#editUserpassword").click((e) => {
  var password = $("#facultyNewPassword").val();

  // Ensure that the password enter conforms to our password requirements
  if (password.length < 8 || password.length > 15) {
    $("#change-password-message").text("Invalid password length");
  }

  var hashedPassword = md5(password);

  var user = '{"fid" : "' + fid + '", "password" : "' + hashedPassword + '"}';

  var url = urlBase + "/UpdateUserPass" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        console.log(jsonObject);
        console.log(jsonObject.results);
        if (jsonObject.results) {
          $("#change-password-message").text(
            "Your Account Information has been Successfully Updated"
          );
        } else {
          $("#change-password-message").text("Could not update account");
        }
      }
    };
    xhr.send(user);
  } catch (err) {
    console.log(err.message);
  }
});

$("#changeFacultyInfo").click((e) => {
  var facultyID = $("#facultyNewPassword").val();
  var name = $("#facultyNewName").val();
  var email = $("#facultyNewEmail").val();

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
  if (confirm("Are you sure you want to delete this account?")) {
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

$("#deleteUserAcct").click((e) => {
  if (confirm("Are you sure you want to delete your account?")) {
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

  // find out whether we're creating a professor or staff account
  // true = staff, false = professor
  radioSelection = document.querySelector(
    'input[id="facultyType"]:checked'
  ).value;
  if (radioSelection) {
    staffRadioSelection = 1; // staff
  } else {
    staffRadioSelection = 0; // professor
  }

  var jsonPayload =
    '{"email" : "' +
    Email +
    '", "password" : "' +
    Password +
    '", "name" : "' +
    Name +
    '", "isStaff" : "' +
    staffRadioSelection +
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
        $("#signup-error").text("Successfully created account");
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert(err);
    location.reload();
  }
});

$(".viewForms").click((e) => {
  e.preventDefault();
  $("#row-1").empty();
  $("#viewRequestsContent").show();
});

// set current semester and start create table process
$(".semester1").click((e) => {
  e.preventDefault();

  $("#viewRequestsContent").hide();

  currSemester = "spring 2022";

  if (isStaff) {
    loadSemesterOrders(currSemester);
  } else {
    loadProfsSemesterOrders(currSemester);
  }
});
$(".semester2").click((e) => {
  e.preventDefault();

  $("#viewRequestsContent").hide();

  currSemester = "summer 2022";
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

  currSemester = "fall 2022";
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

  currSemester = "spring 2023";
  console.log("currsememster: " + currSemester);

  if (isStaff) {
    loadSemesterOrders(currSemester);
  } else {
    loadProfsSemesterOrders(currSemester);
  }
});

$("#submitOrder").on("click", (e) => {
  var subject = $("#edit-order-subject").val();
  var courseNumber = $("#edit-order-courseNumber").val();
  var season = $("#edit-order-semester").val();
  var year = $("#edit-order-year").val();

  var cid = subject + " " + courseNumber;
  var semester = season + " " + year;
  var uniqueID = fid + subject + courseNumber + season + year + isbn;

  let order = {
    fid: fid,
    cid: cid,
    deadline: $("#edit-order-date").val(),
    semester: semester,
    title: $("#edit-order-title").val(),
    edition: $("#edit-order-edition").val(),
    authors: $("#edit-order-authors").val(),
    publisher: $("#edit-order-publisher").val(),
    isbn: $("#edit-order-isbn").val(),
    uniqueID: uniqueID,
  };

  CreateNewOrder(order)

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
});

// submit prof order edits
$("#submitOrderEdit").click(function () {
  var subject = $("#edit-order-subject").val();
  var courseNumber = $("#edit-order-courseNumber").val();
  var season = $("#edit-order-semester").val();
  var year = $("#edit-order-year").val();
  var isbn = $("#edit-order-isbn").val()

  var cid = subject + " " + courseNumber;
  var semester = season + " " + year;
  var uniqueID = fid + subject + courseNumber + season + year + isbn;

  let order = {
    fid: fid,
    cid: cid,
    deadline: $("#edit-order-date").val(),
    semester: semester,
    title: $("#edit-order-title").val(),
    edition: $("#edit-order-edition").val(),
    authors: $("#edit-order-authors").val(),
    publisher: $("#edit-order-publisher").val(),
    isbn: isbn,
    uniqueID: uniqueID,
  };

  CreateNewOrder(order)
  deleteOrder()

  // Close modal and clear fields
  $("#edit-orderModal").modal("hide");
  $("#edit-order-subject").val("");
  $("#edit-order-courseNumber").val("");
  $("#edit-order-semester").val("");
  $("#edit-order-year").val("");
  $("#edit-order-title").val("");
  $("#edit-order-edition").val("");
  $("#edit-order-authors").val("");
  $("#edit-order-publisher").val("");
  $("#edit-order-isbn").val("");
  $("#edit-order-date").val("");
  $("#edit-error-message").text("");
});

function selectOrder (){
  if (isStaff) {
    $("#submitOrderEdit").hide()
    $("#submitOrder1").show()
  } else {
    $("#submitOrderEdit").show()
    $("#submitOrder1").hide()
  }

  var body = this.querySelectorAll("li");

  selectedOrder = {
    oid: $(this).attr("data-id"),
    subject: body[0].innerText.split(" ")[1],
    courseNumber: body[0].innerText.split(" ")[2],
    title: body[1].innerText.split(" ")[1],
    authors: body[2].innerText.split(": ")[1],
    edition: body[3].innerText.split(" ")[1],
    publisher: body[4].innerText.split(" ")[1],
    isbn: body[5].innerText.split(" ")[1],
    season: body[6].innerText.split(" ")[1],
    year: body[6].innerText.split(" ")[2],
    deadline: body[7].innerText.split(" ")[1],
  };
  console.log(selectedOrder.season + " " + selectedOrder.year)

  oid = selectedOrder.oid;
  $("#edit-order-subject").text(selectedOrder.subject);
  $("#edit-order-courseNumber").val(selectedOrder.courseNumber);
  $("#edit-order-semester").val(selectedOrder.season);
  $("#edit-order-year").val(selectedOrder.year);
  $("#edit-order-title").val(selectedOrder.title);
  $("#edit-order-edition").val(selectedOrder.edition);
  $("#edit-order-authors").val(selectedOrder.authors);
  $("#edit-order-publisher").val(selectedOrder.publisher);
  $("#edit-order-isbn").val(selectedOrder.isbn);
  $("#edit-order-date").val(selectedOrder.deadline);
}

let CreateNewOrder = (order) => {
  var newOrder =
    '{"fid" : "' +
    order.fid +
    '", "cid" : "' +
    order.cid +
    '", "deadline" : "' +
    order.deadline +
    '", "semester" : "' +
    order.semester +
    '", "title" : "' +
    order.title +
    '", "edition" : "' +
    order.edition +
    '", "authors" : "' +
    order.authors +
    '", "publisher" : "' +
    order.publisher +
    '", "isbn" : "' +
    order.isbn +
    '", "uniqueID" : "' +
    order.uniqueID +
    '"}';

  var url = urlBase + "/CreateNewOrder" + extension;
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        // Close modal and clear fields
        loadProfsSemesterOrders(currSemester);
      }
    };
    xhr.send(newOrder);
  } catch (err) {
    document.getElementById("orderResult").innerHTML = err.message;
  }
};

let deleteOrder = () => {
  var url = urlBase + "/DeleteOrder" + extension;
  var xhr = new XMLHttpRequest();

  var search = '{"oid" : "' + oid + '"}';

  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        $("#row-1").empty();
        loadProfsSemesterOrders(currSemester);
      }
    };

    xhr.send(search);
  } catch (err) {
    document.getElementById("orderResult").innerHTML = err.message;
  }
};

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
          $("#row-1").text("No orders found");
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
          $("#row-1").text("No orders found");
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
  $("#row-1").empty();
  var template = document.getElementById("orderForm");
  var clone = template.content.firstElementChild.cloneNode(true);
  // var header = clone.getElementsByClassName("card-header");
  var row = document.getElementById("row-1");
  var body = clone.querySelectorAll("li");
  // var buttons = clone.querySelectorAll("button");
  // var footer = clone.getElementsByClassName("card-footer");

  for (var i = 0; i < orders.length; i++) {
    console.log("order: " + orders[i])
    body[0].textContent = "Class: " + orders[i].cid;
    body[1].textContent = "Title: " + orders[i].title;
    body[2].textContent = "Authors: " + orders[i].authors;
    body[3].textContent = "Edition: " + orders[i].edition;
    body[4].textContent = "Publisher: " + orders[i].publisher;
    body[5].textContent = "ISBN: " + orders[i].isbn;
    body[6].textContent = "Semester: " + orders[i].semester;
    body[7].textContent = "Submit By: " + orders[i].deadline;

    $(clone).attr("data-id", orders[i].oid);
    clone.addEventListener("click", selectOrder);

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

$("#InviteProfessor").click(function () {
  var url = urlBase + "/sendIndividualEmail" + extension;
  var xhr = new XMLHttpRequest();
  var link = "http://www.databases-group25-project.com";
  var email = $("#emailForInvite").val().trim().toLowerCase();
  // validate email format
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

  var errorMsg = "";
  // validating email
  if (!regex.test(email)) {
    errorMsg = "Invalid email";
  } else {
    error = false;
  }

  var jsonPayload = '{"emails" : "' + email + '", "url" : "' + link + '"}';

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        //var jsonObject = JSON.parse(xhr.responseText);
        console.log("success");
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    console.log("broadcast-error");
  }
});

$("#broadcastEmailReminder").click(function () {
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
    xhr.send();
  } catch (err) {
    console.log("broadcast-error");
  }
});

function getDeadline(emailList) {
  var url = urlBase + "/GetSemesterOrders" + extension;
  var xhr = new XMLHttpRequest();
  var semester = $("#order-semester-reminder").val();
  var year = $("#order-year-reminder").val();
  var semesterYear = semester + " " + year;
  //console.log(semesterYear);
  var jsonPayload = '{"semester" : "' + semesterYear + '"}';
  // console.log(jsonPayload);
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  // Get json object of all emails
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        //console.log(jsonObject[0]);
        console.log(jsonObject[0].deadline);
        var thiss = jsonObject[0].deadline;
        console.log(thiss);
        testFunction(emailList, jsonObject[0].deadline);
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    console.log("broadcast-error");
  }
}

function sendBroadcastEmailReminder(emails) {
  var emailList = "";
  if (emails.error !== undefined) {
    $("#broadcast-error").text(emails.error);
    return;
  }
  console.log(emails[0]);
  for (let i = 0; i < emails.length; i++) {
    emailList += emails[i];
    emailList += ",";
  }

  emailList.slice(0, -1);
  console.log(emailList);

  var deadline = getDeadline(emailList);
}

function testFunction(emailList, deadline) {
  var jsonPayload =
    '{"emails" : "' + emailList + '", "date" : "' + deadline + '"}';
  console.log("you missed ya chance dummy");
  //call sendEmail.php
  var url = urlBase + "/sendEmail" + extension;
  var xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        //var jsonObject = JSON.parse(xhr.responseText);
        console.log("success");
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
