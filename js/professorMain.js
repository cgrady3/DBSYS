var urlBase = "http://dbsys-shy4s.ondigitalocean.app/API";
var extension = ".php";
var fid;

window.onload = function () {
    readCookie();
    if (fid <= 0) doLogout();
};

//#################################################################################################
//                                     API Calling Functions
//#################################################################################################
// TODO: Implement, does nothing at the moment
function doChangePassword() {
    alert("I don't work yet! :)");
}

// TODO: Implement, does nothing at the moment
function doSubmitNewBookRequest() {
    alert("I don't work yet! :)");

    // Check the database to see if any request forms exist for the selected term

    // If the request form exists, display a message to the user that the form already exists
    // and they must "Edit Existing Form" to make changes to it

    // If the request form does not exist, display a success message to the user that a new form
    // was created
}

//#################################################################################################
//                                   Front End Handler Functions
//#################################################################################################
// TODO: Implement, does nothing at the moment
$(".semester").click((e) => {
  e.preventDefault();
  $("#requestFormTableBody").empty();

  var url = urlBase + "/SearchProfsSemesterOrders" + extension;
  var xhr = new XMLHttpRequest();

  var semester = this.val()
  var search = '{"fid" : "' + fid + '", "semester" : "' + semester + '"}';

  xhr.open("PUT", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        var jsonObject = JSON.parse(xhr.responseText);        
        if (jsonObject.length === undefined) {
          $("#searchMsg").text("No contacts found");
          return;
        } else {
            createOrderTable(jsonObject)
        }
      }
    };

    xhr.send(search);
  } catch (err) {
    document.getElementById("contactResult").innerHTML = err.message;
  }
})

// TODO: Implement, does nothing at the moment
function editRequestForm(semester) {
    alert("The selected semester is : " + semester + " and I don't do anything else yet :(");

    // Check the database to see if any request forms exist for the selected term

    // If the request form exists, import its information into a table and allow the user to
    // add books, delete books, or delete the current request form

    // If the request form does not exist, display a message to the user
}

//#################################################################################################
//                                        JQuery Functions
//#################################################################################################
// Updates the View Requests dropdown label text to match the selected semester
$("#semester").click(function(){
    var semester = 
});

//#################################################################################################
//                                 Main Content View Controllers
//#################################################################################################
function showChangePasswordContent() {
    // Toggle all other Content off
    $("#viewRequestsContent").hide();
    $("#newRequestContent").hide();
    $("#editRequestContent").hide();
    
    // Show Change Password Content
    $("#changePasswordContent").show();  
}

function showViewBookRequestsContent() {
    // Toggle all other Content off
    $("#changePasswordContent").hide();
    $("#newRequestContent").hide();
    $("#editRequestContent").hide();
    
    // Show View Existing Request Content
    $("#viewRequestsContent").show();  
}

function showNewBookRequestContent() {
    // Toggle all other Content off
    $("#changePasswordContent").hide();
    $("#viewRequestsContent").hide();
    $("#editRequestContent").hide();
    
    // Show View Existing Request Content
    $("#newRequestContent").show();  
}

function showEditRequestContent() {
    // Toggle all other Content off
    $("#changePasswordContent").hide();
    $("#newRequestContent").hide();
    $("#viewRequestsContent").hide();
    
    // Show View Existing Request Content
    $("#editRequestContent").show();  
}

function clearWorkspaceWindow() {
    // Toggle all Content off
    $("#changePasswordContent").hide();
    $("#newRequestContent").hide();
    $("#viewRequestsContent").hide();
    $("#editRequestContent").hide();  
}

function createOrderTable(orders) {
    var template = $("#orderForm");
    var order = template.clone()

    for (i = 0; i < orders.length; i++) {
        $("#class").text(orders.class)
        $("#title").text(orders.title)
        $("#authors").text(orders.authors)
        $("#edition").text(orders.edition)
        $("#publisher").text(orders.publisher)
        $("#isbn").text(orders.isbn)

        $(".editOrder").attr("orderID", orders.orderID)
        $(".deleteOrder").attr("orderID", orders.orderID)

        $("#requestFormTableBody").append(order)
    }
}