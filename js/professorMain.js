var urlBase = "http://ucfbookstore.live/API";
var extension = ".php";
var fid;
var currSemester;

window.onload = function () {
  readCookie();
  if (fid <= 0) doLogout();
};

function doChangePassword() {
  alert("I don't work yet! :)");
}

// set current semester and start create table process
$(".semester").click((e) => {
  e.preventDefault();

  currSemester = this.val();

  loadOrders(currSemester);
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
        $("#order-date").val(jsonObject.orderBy)
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

        loadOrders(currSemester);
      }
    };
    xhr.send(order);
  } catch (err) {
    document.getElementById("orderResult").innerHTML = err.message;
  }
});

// load order form for the currently selected semester
let loadOrders = (semester) => {
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
    order.find(".date").text(orders[i].orderBy)

    order.find(".editOrder").attr("orderID", orders[i].orderID);
    order.find(".deleteOrder").attr("orderID", orders[i].orderID);

    $("#requestFormTableBody").append(order);
  }
};

// read cookie to get fid
function readCookie() {
  fid = -1;
  var data = document.cookie;
  var splits = data.split(",");
  for (let i = 0; i < splits.length; i++) {
    var thisOne = splits[i].trim();
    var tokens = thisOne.split("=");
    if (tokens[0] === "fid") {
      fid = parseInt(tokens[1].trim());
    }
  }
}

function doLogout() {
  fid = 0;
  document.cookie = "fid = 0; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "../index.html";
}
