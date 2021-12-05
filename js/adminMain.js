var urlBase = "http://ucfbookstore.live/API";
var extension = ".php";
var fid;
var currSemester;

window.onload = function () {
  readCookie();
  if (fid <= 0) doLogout();
};

function showChangePasswordContent() {
  $("#createAdminContent").hide();
  $("#viewRequestsContent").hide();
  $("#changePasswordContent").toggle();
}

function showCreateAdminContent() {
  $("#changePasswordContent").hide();
  $("#viewRequestsContent").hide();
  $("#createAdminContent").toggle();
}

function showBookRequestContent() {
  $("#changePasswordContent").hide();
  $("#createAdminContent").hide();
  $("#viewRequestsContent").toggle();
}

function CreateTableFromJSON() {
  var myBooks = [
    {
      "Book Name": "Computer Architecture",
      Author: "Computers",
      Price: "125.60",
    },
    {
      "Book Name": "Asp.Net 4 Blue Book",
      Author: "Programming",
      Price: "56.00",
    },
    {
      "Book Name": "Popular Science",
      Author: "Science",
      Price: "210.40",
    },
  ];

  // EXTRACT VALUE FOR HTML HEADER.
  // ('Book ID', 'Book Name', 'Category' and 'Price')
  var col = [];
  for (var i = 0; i < myBooks.length; i++) {
    for (var key in myBooks[i]) {
      if (col.indexOf(key) === -1) {
        col.push(key);
      }
    }
  }

  // CREATE DYNAMIC TABLE.
  var table = document.createElement("table");

  // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

  var tr = table.insertRow(-1); // TABLE ROW.

  for (var i = 0; i < col.length; i++) {
    var th = document.createElement("th"); // TABLE HEADER.
    th.innerHTML = col[i];
    tr.appendChild(th);
  }

  // ADD JSON DATA TO THE TABLE AS ROWS.
  for (var i = 0; i < myBooks.length; i++) {
    tr = table.insertRow(-1);

    for (var j = 0; j < col.length; j++) {
      var tabCell = tr.insertCell(-1);
      tabCell.innerHTML = myBooks[i][col[j]];
    }
  }

  // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
  var divContainer = document.getElementById("showData");
  divContainer.innerHTML = "";
  divContainer.appendChild(table);
}

$("#signOut-Btn").on("click", function (event) {
  event.preventDefault();
  doLogout();
});

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
