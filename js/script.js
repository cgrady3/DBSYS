var urlBase = "http://ucfbookstore.live/API";
var extension = ".php";
var fid;

window.onload = function () {
  $("#login-error").text("");
  $("#signup-error").text("");
};

$("#signIn").click(function() {
  fid = 0;

  var login = $("#user-email").val().trim().toLowerCase();
  var Password = $("#user-password").val().trim();

  // hashing password
  Password = md5(Password);

  var jsonPayload =
      '{"Email" : "' + login + '", "Password" : "' + Password + '"}';
  var url = urlBase + "/Login" + extension;

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);
        if (jsonObject.error !== "") {
          $("#login-error").text("Invalid username/password");
          return;
        }

        fid = jsonObject.results[0];
        saveCookie();
        if (jsonObject.results[1])
          window.location.href = "/pages/professorMain.html";
        else  
          window.location.href = "/pages/adminMain.html";
      }
    };

    xhr.send(jsonPayload);
  } catch (err) {
    alert(err.message);
  }
})

$("#signUp").click(function() {
  var error = true;

  var Email = $("#user-email").val().trim().toLowerCase();
  var Password = $("#user-password").val().trim();
  var Name = $("#name").val().trim().toLowerCase();
  var facultyType = $("#facultyType").val()

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
      '", "isProf" : "' +
      facultyType +
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

        fid = jsonObject.fid;
        saveCookie();

        window.location.href = "contact.html";
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert(err);
    location.reload();
  }
})

function saveCookie() {
  var minutes = 60;
  var date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie = "fid=" + fid + ";expires=" + date.toGMTString();
}

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

  if (fid <= 0) {
    window.location.href = "index.html";
  } else {
    $("userName").innerHTML = "Logged in as " + FirstName + " " + LastName;
  }
}
