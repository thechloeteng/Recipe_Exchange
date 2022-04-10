var username, email, password, updateID;

$(function(){
    console.log("Ready!");

    $(".loginCont").addClass("hideBox");
    $(".signUpCont").addClass("hideBox");

    $(".goBackUpBtn").on("click", scrollBackToTop);

    // if session id is set
    ifSessionIsSet();
});

function ifSessionIsSet(){
    // if session id is empty
    if(sessionStorage.id != null){
        sessionID = JSON.parse(sessionStorage.id);
        // console.log(sessionID);

        $(".navBar ul .loginBtn").addClass("hideBox");
        $(".navBar ul .signUpBtn").addClass("hideBox");

        $(".navBar ul .dropdownBox").removeClass("hideBox");
        $(".navBar ul .dropdownBox .dropdownCont").addClass("hideDropdown");

        $(".navBar ul .dropdownBox .dropdownBtn").on("click", function(){
            $(".navBar ul .dropdownBox .dropdownCont").removeClass("hideBox");
            $(".navBar ul .dropdownBox .dropdownCont").toggleClass("hideDropdown showDropdown");                        
        });

        displayProfile();

        // logout from page
        $(".navBar .dropdownCont .logoutBtn").on("click", function(){
            sessionStorage.clear();

            window.location.href = "index.html";

            $(".navBar ul .loginBtn").removeClass("hideBox");
            $(".navBar ul .signUpBtn").removeClass("hideBox");

            $(".navBar ul .dropdownBox").addClass("hideBox");
            $(".navBar ul .dropdownBox .dropdownCont").addClass("hideDropdown");
        });
    }

    else {
        console.log("Sorry, no existing profile was found.");
    }
}

function displayProfile(){
    $.ajax({
        url: "https://recipe-exchange.tchloe.com/php/recipesx/profile/" + sessionID,
        method: "get"
    })

    .done((result)=>{
        console.log(result.successMSG);
        console.log(result);

        username = result.data.username;
        email = result.data.email;
        password = result.data.password;

        $(".profileSection").append(`
        <div class="profileSect">
                <div class="banner">
                    <div class="content">
                        <img src="img/blankbg.png" alt="Image of a user" class="profileImg">
                        <p>@${result.data.username}</p>
                        <h5>${result.data.firstName}${result.data.lastName}</h5>
                        <p>${result.data.userType}</p>
                        <div class="others">
                            <div class="savedDetails">
                                <i class="heartIcon fa fa-heart"></i>
                                <span>SAVED RECIPES</span>
                                <p>${result.data.savedRecipes}</p>
                            </div>
                            <div class="postedDetails">
                                <i class="recipeIcon fa fa-clipboard"></i>
                                <span>POSTED RECIPES</span>
                                <p>${result.data.postedRecipes}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="particularsSect">
                <h5>PERSONAL PARTICULARS</h5>
                <div class="content">
                    <ul>
                        <li>
                            <div class="usernameBox">
                                <button type="button" class="usernameIcon"><i class="fa fa-user-circle"></i></button>
                                <input type="text" name="username" value="${result.data.username}" placeholder="Current Username" disabled>
                                <button type="button" class="editBtn" id="editUsernameBtn"><i class="fa fa-edit" id=${result.data.id}></i></button>
                            </div>
                        </li>
                        <li>
                            <div class="emailBox">
                                <button type="button" class="emailIcon"><i class="fa fa-envelope"></i></button>
                                <input type="email" name="email" value="${result.data.email}" placeholder="Registered Email" disabled>
                                <button type="button" class="editBtn" id="editEmailBtn"><i class="fa fa-edit" id=${result.data.id}></i></button>
                            </div>
                        </li>
                        <li>
                            <div class="passwordBox">
                                <button type="button" class="passwordIcon"><i class="fa fa-lock"></i></button>
                                <input type="password" name="password" value="${result.data.password}" placeholder="Current Password" disabled>
                                <button type="button" class="editBtn" id="editPasswordBtn"><i class="fa fa-edit" id=${result.data.id}></i></button>
                            </div>
                        </li>
                        <li>
                            <button type="button" class="saveBtn">SAVE</button>
                        </li>
                    </ul>
                </div>
            </div>
        `);

        $("#editUsernameBtn").on("click", function(e){
            editUsername(e);
        });

        $("#editEmailBtn").on("click", function(e){
            editEmail(e);
        });

        $("#editPasswordBtn").on("click", function(e){
            editPassword(e);
        });
    })

    .fail(()=>{
        console.log("Sorry, the requested URL is unavailable at this moment.");
    });
}

function scrollBackToTop(){
    $("#inner").animate({scrollTop: 0}, 500);
}

function editUsername(e){
    let updateID = e.target.id;

    $("input[name='curUsername']").val(username);

    $(".confirmUsernameChangeCont").removeClass("hideBox");

    $(".confirmUsernameChangeCont .closeBtn").on("click", function(){
        $(".confirmUsernameChangeCont").addClass("hideBox");
        $("input[name='newUsername']").val("");
    });

    $(".confirmUsernameChangeCont .cancelBtn").on("click", function(){
        let cancelPrompt = confirm("You still have unsaved changes, are you sure you want to close this?");

        if(cancelPrompt){
            $(".confirmUsernameChangeCont").addClass("hideBox");
            $("input[name='newUsername']").val("");
        }
    });

    $(".confirmUsernameChangeCont .saveBtn").on("click", function(){
        validateUsername(updateID);
    });
}

function validateUsername(updateID){
    let newUsername = $("input[name='newUsername']").val();

    // if empty
    if(!newUsername){
        $(".confirmUsernameChangeCont #usernameErrorBox").append(`<div class=errorBox><p style='color: #d93025;'>Sorry, username field cannot be empty.</p></div>`);

        $(".confirmUsernameChangeCont #usernameErrorBox").on("keypress", function(){
            $(".errorBox").remove();
        });
    }

    // if less than 6 characters
    else if(!isNaN(newUsername)){
        $(".confirmUsernameChangeCont #usernameErrorBox").append(`<div class=errorBox><p style='color: #d93025;'>Sorry, usernames can only be in characters.</p></div>`);

        $(".confirmUsernameChangeCont #usernameErrorBox").on("keypress", function(){
            $(".errorBox").remove();
        });
    }

    // if less than 6 characters
    else if(newUsername.length < 6){
        $(".confirmUsernameChangeCont #usernameErrorBox").append(`<div class=errorBox><p style='color: #d93025;'>Sorry, usernames have to be 6 characters long.</p></div>`);

        $(".confirmUsernameChangeCont #usernameErrorBox").on("keypress", function(){
            $(".errorBox").remove();
        });
    }

    // if more than 10 characters
    else if(newUsername.length > 10){
        $(".confirmUsernameChangeCont #usernameErrorBox").append(`<div class=errorBox><p style='color: #d93025;'>Sorry, usernames should only be 10 characters long.</p></div>`);

        $(".confirmUsernameChangeCont #usernameErrorBox").on("keypress", function(){
            $(".errorBox").remove();
        });
    }

    else {
        let newUsernameData = new FormData();
        newUsernameData.append("username", newUsername);

        $.ajax({
            url: "https://recipe-exchange.tchloe.com/php/recipesx/updateusername/" + updateID,
            method: "post",
            data: newUsernameData,
            processData: false,
            contentType: false
        })
        .done((result)=>{
            if(result.successMSG == null){
                console.log(result.msg);
                $(".confirmUsernameChangeCont #usernameErrorBox").append(`<div class=errorBox><p style='color: #d93025;'>${result.msg}</p></div>`);

                $(".confirmUsernameChangeCont #usernameErrorBox").on("keypress", function(){
                    $(".errorBox").remove();
                });
            }
            else {
                alert(result.successMSG);
                $(".confirmUsernameChangeCont").addClass("hideBox");
                window.location.reload();
            }
        })
        .fail(()=>{
            console.log("Sorry, the requested URL is unavailable at this moment.");
        });
    }
}

function editEmail(e){
    updateID = e.target.id;

    $("input[name='curEmail']").val(email);

    $(".confirmEmailChangeCont").removeClass("hideBox");

    $(".confirmEmailChangeCont .closeBtn").on("click", function(){
        $(".confirmEmailChangeCont").addClass("hideBox");
        $("input[name='newEmail']").val("");
    });

    $(".confirmEmailChangeCont .cancelBtn").on("click", function(){
        let cancelPrompt = confirm("You still have unsaved changes, are you sure you want to close this?");

        if(cancelPrompt){
            $(".confirmEmailChangeCont").addClass("hideBox");
            $("input[name='newEmail']").val("");
        }
    });

    $(".confirmEmailChangeCont .saveBtn").on("click", function(){
        validateEmail(updateID);
    });
}

function validateEmail(updateID){
    let emailInput = document.getElementsByName("newEmail");

    if(!emailInput[0].value){
        $(".confirmEmailChangeCont #emailErrorBox").append(`<div class=errorBox><p style='color: #d93025;'>Sorry, email field cannot be empty.</p></div>`);

        $(".confirmEmailChangeCont #emailErrorBox").on("keypress", function(){
            $(".errorBox").remove();
        });
    }

    else if(emailInput[0].checkValidity()){
        let newEmail = $("input[name='newEmail']").val();
    
        let newEmailData = new FormData();
        newEmailData.append("email", newEmail);

        $.ajax({
            url: "https://recipe-exchange.tchloe.com/php/recipesx/updateemail/" + updateID,
            method: "post",
            data: newEmailData,
            processData: false,
            contentType: false
        })
        .done((result)=>{
            if(result.successMSG == null){
                $(".confirmEmailChangeCont #emailErrorBox").on("keypress", function(){
                    $(".errorBox").remove();
                });
            }
            else {
                alert(result.successMSG);
                $(".confirmEmailChangeCont").addClass("hideBox");
                window.location.reload();
            }
        })
        .fail(()=>{
            console.log("Sorry, the requested URL is unavailable at this moment.");
        });
    }

    else {
        $(".confirmEmailChangeCont #emailErrorBox").append(`<div class=errorBox><p style='color: #d93025;'>Sorry, email format is incorrect.</p></div>`);

        $(".confirmEmailChangeCont #emailErrorBox").on("keypress", function(){
            $(".errorBox").remove();
        });
    }
}

function editPassword(e){
    updateID = e.target.id;

    $("input[name='curPassword']").val(password);

    $(".confirmPasswordChangeCont").removeClass("hideBox");

    $(".confirmPasswordChangeCont .closeBtn").on("click", function(){
        $(".confirmPasswordChangeCont").addClass("hideBox");
        $("input[name='newPassword']").val("");
    });

    $(".confirmPasswordChangeCont .cancelBtn").on("click", function(){
        let cancelPrompt = confirm("You still have unsaved changes, are you sure you want to close this?");

        if(cancelPrompt){
            $(".confirmPasswordChangeCont").addClass("hideBox");
            $("input[name='newPassword']").val("");
        }
    });

    $(".confirmPasswordChangeCont .saveBtn").on("click", function(){
        validatePassword(updateID);
    });
}

function validatePassword(updateID){
    let newPassword = $("input[name='newPassword']").val();
    // if empty
    if(!newPassword){
        $(".confirmPasswordChangeCont #passwordErrorBox").append(`<div class=errorBox><p style='color: #d93025;'>Sorry, password field cannot be empty.</p></div>`);

        $(".confirmPasswordChangeCont #passwordErrorBox").on("keypress", function(){
            $(".errorBox").remove();
        });
    }

    // if a number
    else if(!isNaN(newPassword)){
        $(".confirmPasswordChangeCont #passwordErrorBox").append(`<div class=errorBox><p style='color: #d93025;'>Sorry, passwords can only be in characters.</p></div>`);

        $(".confirmPasswordChangeCont #passwordErrorBox").on("keypress", function(){
            $(".errorBox").remove();
        });
    }

    // if less than 8 characters
    else if(newPassword.length < 8){
        $(".confirmPasswordChangeCont #passwordErrorBox").append(`<div class=errorBox><p style='color: #d93025;'>Sorry, passwords have to be 8 characters long.</p></div>`);

        $(".confirmPasswordChangeCont #passwordErrorBox").on("keypress", function(){
            $(".errorBox").remove();
        });
    }

    // if more than 15 characters
    else if(newPassword.length > 15){
        $(".confirmPasswordChangeCont #passwordErrorBox").append(`<div class=errorBox><p style='color: #d93025;'>Sorry, passwords should only be 15 characters long.</p></div>`);

        $(".confirmPasswordChangeCont #passwordErrorBox").on("keypress", function(){
            $(".errorBox").remove();
        });
    }

    let newPasswordData = new FormData();
    newPasswordData.append("password", newPassword);

    $.ajax({
        url: "https://recipe-exchange.tchloe.com/php/recipesx/updatepassword/" + updateID,
        method: "post",
        data: newPasswordData,
        processData: false,
        contentType: false
    })
    .done((result)=>{
        if(result.successMSG == null){
            $(".confirmPasswordChangeCont #passwordErrorBox").on("keypress", function(){
                $(".errorBox").remove();
            });
        }
        else {
            alert(result.successMSG);
            $(".confirmPasswordChangeCont").addClass("hideBox");
            window.location.reload();
        }
    })
    .fail(()=>{
        console.log("Sorry, the requested URL is unavailable at this moment.");
    });
}