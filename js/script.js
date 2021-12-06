var urlBase = "https://www.databases-group25-project.com/API"
var extension = ".php";
var fid;
var isStaff;

window.onload = function () {
  $("#login-error").text("");
  $("#signup-error").text("");
};

$("#signIn").click(function() {
  var login = $("#user-email").val().trim().toLowerCase();
  var Password = $("#user-password").val().trim();

  // hashing password
  Password = md5(Password);

  var jsonPayload =
      '{"email" : "' + login + '", "password" : "' + Password + '"}';
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

        fid = jsonObject.fid;
        isStaff = jsonObject.isStaff;
        saveCookie();

        window.location.href = "/pages/main.html";
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
      0 +
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
        isStaff = jsonObject.isStaff;
        saveCookie();

        window.location.href = "main.html";
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert(err);
    location.reload();
  }
})

$("#sendForgotPasswordEmail").click(function () {
  var error = true;
  var userExists = false;

  var Email = $("#user-email").val().trim().toLowerCase();

  // validate email format
  var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

  var errorMsg = "";
  // validating email
  if (!regex.test(Email)) {
    errorMsg = "Invalid email";
  } else {
    error = false;
  }

  // if validation error reload the page and exit
  // this function before API call starts
  if (error) {
    $("#forgot-password-error").text(errorMsg);
    return;
  }

  // Check to see if the faculty member exists for the entered email
  // (only professors may request a temporary password)

  var jsonPayload = '{"email" : "' + Email + '"}';

  var url = urlBase + "/GetUserByEmail" + extension;
  
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  // Perform check to see if faculty member exists for the entered email
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);

        if (jsonObject.error !== undefined) {
          $("#forgot-password-error").text(jsonObject.error);
          return;
        }
        // Account exists if this point is reached
        userExists = true;
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert(err);
    location.reload();
  }

  // Check if user is staff (illegal to do forgotPassword on staff account)
  if (jsonObject.isStaff == 1) {
    $("#forgot-password-error").text("No account for this email exists");
    return;
  }

  // User is professor if this point is reached, generate new random password
  $newPassword = generateTempPassword();

  // Assign new password to user in database
  assignTempPassword(newPassword, jsonObject.fid);

  // Send an email to the user containing the new password
  sendForgotPasswordEmail(newPassword, Email);

});

// Send an email to the user with the new password
function sendForgotPasswordEmail(newPassword, Email) {

}

// Updates the user in the database with the new password
function assignTempPassword(newPassword, fid) {

  // Build json package (send password, fid)
  var jsonPayload = '{"password" : "' + newPassword + '", "fid": "' + fid + '"}';

  // Call UpdateUserPass.php
  var url = urlBase + "/UpdateUserPass" + extension;
  
  var xhr = new XMLHttpRequest();
  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);

        if (jsonObject.error !== undefined) {
          $("#forgot-password-error").text("Failed to change user password to a temporary one");
          return;
        }
        // Successfully changed user password at this point
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    alert(err);
    location.reload();
  }
}

function saveCookie() {
  var minutes = 60;
  var date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie = "fid=" + fid + "isStaff=" + isStaff + ";expires=" + date.toGMTString();
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

// Generates an 8 character long randomized password
function generateTempPassword() {
  var length = 8;
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * 
charactersLength));
 }
 return result;
}
