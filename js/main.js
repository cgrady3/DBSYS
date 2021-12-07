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
$(".semester").click((e) => {
  e.preventDefault();

  $("#viewRequestsContent").hide();

  currSemester = $(this).text();
  console.log(currSemester);

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
  var template = $("#orderForm");
  var order = template.clone();

  for (var i = 0; i < orders.length; i++) {
    order.find(".class").text(orders[i].class);
    order.find(".title").text(orders[i].title);
    order.find(".authors").text(orders[i].authors);
    order.find(".edition").text(orders[i].edition);
    order.find(".publisher").text(orders[i].publisher);
    order.find(".isbn").text(orders[i].isbn);
    order.find(".date").text(orders[i].orderBy);

    order.find(".editOrder").attr("orderID", orders[i].orderID);
    order.find(".deleteOrder").attr("orderID", orders[i].orderID);

    $("#requestFormTableBody").append(order);
  }

  if (isStaff) {
    var button =
      '<td><button type="button" class="btn btn-light tableButton" id="submitOrder">Submit Order</button></td>';

    $("#requestFormTableBody").append(button);
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
