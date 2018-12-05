$(function () {

    $('#chatBody').hide();
    $('#loginBlock').show();
    
    // New message event
    $.connection.chatHub.client.addMessage = function (name, message) {
        
        $('#chatroom').append('<p><b>' + htmlEncode(name)
            + '</b>: ' + htmlEncode(message) + '</p>');
    };

    // Connect event
    $.connection.chatHub.client.onConnected = function (id, userName, allUsers) {

        $('#loginBlock').hide();
        $('#chatBody').show();
      
        $('#hdId').val(id);
        $('#username').val(userName);
        $('#header').html('<h3>Welcome, ' + userName + '</h3>');

        // Show all user
        for (i = 0; i < allUsers.length; i++) {

            AddUser(allUsers[i].Id, allUsers[i].LoginName);
        }
    }

    // Add new user event
    $.connection.chatHub.client.onNewUserConnected = function (id, name) {
        AddUser(id, name);
    }

    // Disconected users events
    $.connection.chatHub.client.onUserDisconnected = function (id, userName) {

        $('#' + id).remove();
    }

    //Open new conection
    $.connection.hub.start().done(function () {

        $('#sendmessage').click(function () {
            // Call method send from Hub
            $.connection.chatHub.server.send($('#username').val(), $('#message').val());
            $('#message').val('');
        });

        
        $("#btnLogin").click(function () {

            var name = $("#txtUserName").val();
            if (name.length > 0) {
                $.connection.chatHub.server.connect(name);
            }
            else {
                alert("Enter login , please");
            }
        });
    });
});

function htmlEncode(value) {
    var encodedValue = $('<div />').text(value).html();
    return encodedValue;
}

//Add new user to htnl page
function AddUser(id, name) {

    var userId = $('#hdId').val();

    if (userId != id) {

        $("#chatusers").append('<p id="' + id + '"><b>' + name + '</b></p>');
    }
}