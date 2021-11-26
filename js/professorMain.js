//#################################################################################################
//                                     API Calling Functions
//#################################################################################################
// TODO: Implement, does nothing at the moment
function doChangePassword() {
    alert("I don't work yet! :)");
}

//#################################################################################################
//                                   Front End Handler Functions
//#################################################################################################
// TODO: Implement, does nothing at the moment
function viewRequestForm(semester) {
    alert("The selected semester is : " + semester + " and I don't do anything else yet :(");
}

// TODO: Implement, does nothing at the moment
function editRequestForm(semester) {
    alert("The selected semester is : " + semester + " and I don't do anything else yet :(");  
}

//#################################################################################################
//                                        JQuery Functions
//#################################################################################################
// Updates the View Requests dropdown label text to match the selected semester
$(".dropdown-menu li a").click(function(){
    $(this).parents(".dropdown").find('.btn').html($(this).text() + ' <span class="caret"></span>');
    $(this).parents(".dropdown").find('.btn').val($(this).data('value'));
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