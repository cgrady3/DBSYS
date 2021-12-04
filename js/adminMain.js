
function showChangePasswordContent()
{
    $("#createAdminContent").hide();
    $("#viewRequestsContent").hide();
    $("#changePasswordContent").toggle();
}

function showCreateAdminContent()
{
    $("#changePasswordContent").hide();
    $("#viewRequestsContent").hide();
    $("#createAdminContent").toggle();
}

function showBookRequestContent()
{
    $("#changePasswordContent").hide();
    $("#createAdminContent").hide();
    $("#viewRequestsContent").toggle();
}