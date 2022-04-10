var i, ifLoginIsShown, emailVal, passwordVal; // login
var firstNameVal, lastNameVal, usernameVal, emailAddVal, passWordVal; // sign up
var sessionID;

$(function(){
    // all elements inside html
    // rootElement = document.documentElement;
    // console.log(rootElement);
    console.log("Ready!");
    // homepage
    showPromoBanner();
    // homepage
    displayPopRecipes();
    // homepage (newsletter + login)
    showNewsletter();
    // homepage (newsletter + sign up)
    showNewsletter2();
    //send newsletter
    sendNewsletter();

    // signup to page in popup
    $(".signUpCont .signUpBanner .signUpBtn").on("click", signUp);
    // login to page in popup
    $(".loginCont .loginBanner .loginBtn").on("click", login);
    // go back to top of page
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
        // logout from page
        $(".navBar .dropdownCont .logoutBtn").on("click", function(){
            sessionStorage.clear();

            $(".navBar ul .loginBtn").removeClass("hideBox");
            $(".navBar ul .signUpBtn").removeClass("hideBox");

            $(".navBar ul .dropdownBox").addClass("hideBox");
            $(".navBar ul .dropdownBox .dropdownCont").addClass("hideDropdown");
        });
    }
}

// inside sign up popup, when href link is clicked
function showLogin(){
    let getEmail = document.getElementsByClassName("email");
    let getPassword = document.getElementsByClassName("password");

    $(".signUpCont").removeClass("showBox");
    $(".loginCont").removeClass("hideBox");

    $(".loginCont .loginBanner .closeBtn").on("click", function(){
        $(".loginCont").removeClass("showBox");
        $(".loginCont").addClass("hideBox");
        getEmail[0].value="";
        getPassword[0].value="";
    });
}

// inside login popup, when href link is clicked
function showSignUp(){
    let getFirstName = document.getElementsByClassName("firstName");
    let getLastName = document.getElementsByClassName("lastName");
    let getUsername = document.getElementsByClassName("username");
    let getEmail = document.getElementsByClassName("emailAdd");
    let getPassword = document.getElementsByClassName("passWord");

    $(".loginCont").removeClass("showBox");
    $(".loginCont").addClass("hideBox");
    $(".signUpCont").removeClass("hideBox");
    $(".signUpCont").addClass("showBox");

    $(".signUpCont .signUpBanner .closeBtn").on("click", function(){
        $(".signUpCont").removeClass("showBox");
        $(".signUpCont").addClass("hideBox");
        getFirstName[0].value="";
        getLastName[0].value="";
        getUsername[0].value="";
        getEmail[0].value="";
        getPassword[0].value="";    
    });
}

// sign up pop up configure
function signUp(e){
    let getFirstName = document.getElementsByClassName("firstName");
    let getLastName = document.getElementsByClassName("lastName");
    let getUsername = document.getElementsByClassName("username");
    let getEmail = document.getElementsByClassName("emailAdd");
    let getPassword = document.getElementsByClassName("passWord");

    // if first nane field is empty
    if(!getFirstName[0].value){
        $(".signUpCont .signUpBanner .content .firstNameBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, first name field cannot be empty.</p></div>
        `);

        $(e.target).prop("disabled", true);

        $(".signUpCont .signUpBanner .content .firstNameBox").keypress(function(){
            $(".signUpCont .signUpBanner .content .firstNameBox .errorBox").remove();
            $(".signUpCont .signUpBanner .content .signUpBtn").prop("disabled", false);
        });
    }
    // if last name field is empty
    if(!getLastName[0].value){
        $(".signUpCont .signUpBanner .content .lastNameBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, last name field cannot be empty.</p></div>
        `);

        $(e.target).prop("disabled", true);

        $(".signUpCont .signUpBanner .content .lastNameBox").keypress(function(){
            $(".signUpCont .signUpBanner .content .lastNameBox .errorBox").remove();
            $(".signUpCont .signUpBanner .content .signUpBtn").prop("disabled", false);
        });
    }
    // if username field is empty
    if(!getUsername[0].value){
        $(".signUpCont .signUpBanner .content .usernameBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, username field cannot be empty.</p></div>
        `);

        $(e.target).prop("disabled", true);

        $(".signUpCont .signUpBanner .content .usernameBox").keypress(function(){
            $(".signUpCont .signUpBanner .content .usernameBox .errorBox").remove();
            $(".signUpCont .signUpBanner .content .signUpBtn").prop("disabled", false);
        });
    }
    // if email field is empty
    if(!getEmail[0].value){
        $(".signUpCont .signUpBanner .content .emailBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, email field cannot be empty.</p></div>
        `);

        $(e.target).prop("disabled", true);

        $(".signUpCont .signUpBanner .content .emailBox").keypress(function(){
            $(".signUpCont .signUpBanner .content .emailBox .errorBox").remove();
            $(".signUpCont .signUpBanner .content .signUpBtn").prop("disabled", false);
        });
    }
    // if password field is empty
    if(!getPassword[0].value){
        $(".signUpCont .signUpBanner .content .passwordBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, password field cannot be empty.</p></div>
        `);

        $(e.target).prop("disabled", true);

        $(".signUpCont .signUpBanner .content .passwordBox").keypress(function(){
            $(".signUpCont .signUpBanner .content .passwordBox .errorBox").remove();
            $(".signUpCont .signUpBanner .content .signUpBtn").prop("disabled", false);
        });
    }
    else {
        validateSignUpCred(e);
    }

    getFirstName[0].value="";
    getLastName[0].value="";
    getUsername[0].value="";
    getEmail[0].value="";
    getPassword[0].value="";
}

// validate sign up credentials
function validateSignUpCred(e){
    let getFirstName = document.getElementsByClassName("firstName");
    let getLastName = document.getElementsByClassName("lastName");
    let getUsername = document.getElementsByClassName("username");
    let getEmail = document.getElementsByClassName("emailAdd");
    let getPassword = document.getElementsByClassName("passWord");

    // if first name field is a number
    if(!isNaN(getFirstName[0].value)){
        $(".signUpCont .signUpBanner .content .firstNameBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, first names can only be in characters.</p></div>
        `);

        $(".signUpCont .signUpBanner .content .firstNameBox").on("keypress", function(e){
            $(".signUpCont .signUpBanner .content .firstNameBox .errorBox").remove();
            $(".signUpCont .signUpBanner .content .signUpBtn").prop("disabled", false);
        });
    }
    // if last name field is a number
    if(!isNaN(getLastName[0].value)){
        $(".signUpCont .signUpBanner .content .lastNameBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, last names can only be in characters.</p></div>
        `);

        $(".signUpCont .signUpBanner .content .lastNameBox").on("keypress", function(e){
            $(".signUpCont .signUpBanner .content .lastNameBox .errorBox").remove();
            $(".signUpCont .signUpBanner .content .signUpBtn").prop("disabled", false);
        });
    }
    // if username field is a 6 characters long min
    else if(getUsername[0].value.length < 6){
        $(".signUpCont .signUpBanner .content .usernameBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, usernames have to be 6 characters long.</p></div>
        `);

        $(".signUpCont .signUpBanner .content .usernameBox").on("keypress", function(e){
            $(".signUpCont .signUpBanner .content .usernameBox .errorBox").remove();
            $(".signUpCont .signUpBanner .content .signUpBtn").prop("disabled", false);
        });
    }
    // if username field is a 10 characters long max
    else if(getUsername[0].value.length > 10){
        $(".signUpCont .signUpBanner .content .usernameBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, usernames should only be 10 characters long.</p></div>
        `);

        $(".signUpCont .signUpBanner .content .usernameBox").on("keypress", function(e){
            $(".signUpCont .signUpBanner .content .usernameBox .errorBox").remove();
            $(".signUpCont .signUpBanner .content .signUpBtn").prop("disabled", false);
        });
    }
    // check email format
    if(getEmail[0].checkValidity()){
        emailAddVal = getEmail[0].value;
    }
    // if email format is incorrect
    else {
        $(".signUpCont .signUpBanner .content .emailBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, email format is incorrect.</p></div>
        `);

        $(".signUpCont .signUpBanner .content .emailBox").on("keypress", function(e){
            $(".signUpCont .signUpBanner .content .emailBox .errorBox").remove();
            $(".signUpCont .signUpBanner .content .signUpBtn").prop("disabled", false);
        });
    }
    // if password field is a number
    if(!isNaN(getPassword[0].value)){
        $(".signUpCont .signUpBanner .content .passwordBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, passwords can only be in characters.</p></div>
        `);

        $(".signUpCont .signUpBanner .content .passwordBox").on("keypress", function(e){
            $(".signUpCont .signUpBanner .content .passwordBox .errorBox").remove();
            $(".signUpCont .signUpBanner .content .signUpBtn").prop("disabled", false);
        });
    }
    // if password field is a 8 characters long min
    else if(getPassword[0].value.length < 8){
        $(".signUpCont .signUpBanner .content .passwordBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, passwords have to be 8 characters long.</p></div>
        `);

        $(".signUpCont .signUpBanner .content .passwordBox").on("keypress", function(e){
            $(".signUpCont .signUpBanner .content .passwordBox .errorBox").remove();
            $(".signUpCont .signUpBanner .content .signUpBtn").prop("disabled", false);
        });
    }
    // if password field is a 15 characters long max
    else if(getPassword[0].value.length > 15){
        $(".signUpCont .signUpBanner .content .passwordBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, passwords should only be 15 characters long.</p></div>
        `);

        $(".signUpCont .signUpBanner .content .passwordBox").on("keypress", function(e){
            $(".signUpCont .signUpBanner .content .passwordBox .errorBox").remove();
            $(".signUpCont .signUpBanner .content .signUpBtn").prop("disabled", false);
        });
    }
    else {
        $(e.target).prop("disabled", false);

        firstNameVal = $(".signUpCont .signUpBanner .firstName").val();
        lastNameVal = $(".signUpCont .signUpBanner .lastName").val();
        usernameVal = $(".signUpCont .signUpBanner .username").val();
        passWordVal = $(".signUpCont .signUpBanner .passWord").val();

        let signUpData = new FormData();
        signUpData.append("firstName", firstNameVal);
        signUpData.append("lastName", lastNameVal);
        signUpData.append("username", usernameVal);
        signUpData.append("email", emailAddVal);
        signUpData.append("password", passWordVal);

        $.ajax({
            url: "https://recipe-exchange.tchloe.com/php/recipesx/signup",
            method: "post",
            data: signUpData,
            processData: false,
            contentType: false
        })
        .done((results)=>{
        
            if(results.successMSG == null){
                // console.log(results.msg);
                $(".signUpCont .signUpBanner .content .passwordBox").append(`
                    <div class=errorBox><p style='color: #d93025;'>${results.msg}</p></div>
                `);
                $(".signUpCont .signUpBanner .content .firstNameBox").on("keypress", function(e){
                    $(".signUpCont .signUpBanner .content .usernameBox .errorBox").remove();
                    $(".signUpCont .signUpBanner .content .passwordBox .errorBox").remove();
                    $(".signUpCont .signUpBanner .content .signUpBtn").prop("disabled", false);
                });
            }
        
            else {
                // console.log(results.successMSG);
                $(".signUpCont").addClass("hideBox");
                alert(results.successMSG);
            }
        })
        .fail(()=>{
            console.log("Sorry, the requested URL is unavailable at this moment.");
        });
    }

    $(e.target).prop("disabled", true);
}

// login popup configure
function login(e){
    let getEmail = document.getElementsByClassName("email");
    let getPassword = document.getElementsByClassName("password");

    // if email field is empty
    if(!getEmail[0].value){
        $(".loginCont .loginBanner .content .emailBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, email field cannot be empty.</p></div>
        `);

        $(e.target).prop("disabled", true);

        $(".loginCont .loginBanner .content .emailBox").keypress(function(){
            $(".loginCont .loginBanner .content .emailBox .errorBox").remove();
            $(".loginCont .loginBanner .content .loginBtn").prop("disabled", false);
        });
    }
    // if password field is empty
    if(!getPassword[0].value){
        $(".loginCont .loginBanner .content .passwordBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, password field cannot be empty.</p></div>
        `);

        $(e.target).prop("disabled", true);

        $(".loginCont .loginBanner .content .passwordBox").keypress(function(){
            $(".loginCont .loginBanner .content .passwordBox .errorBox").remove();
            $(".loginCont .loginBanner .content .loginBtn").prop("disabled", false);
        });
    }
    else {
        validateLoginCred(e);
    }

    getEmail[0].value= "";
    getPassword[0].value= "";
}

// validate login credentials
function validateLoginCred(e){
    let getEmail = document.getElementsByClassName("email");
    let getPassword = document.getElementsByClassName("password");

    // check email format
    if(getEmail[0].checkValidity()){
        emailVal = getEmail[0].value;
    }
    // if email format is incorrect
    else {
        $(".loginCont .loginBanner .content .emailBox").append(`
        <div class=errorBox><p style='color: #d93025;'>Sorry, email format is incorrect.</p></div>
        `);

        $(".loginCont .loginBanner .content .emailBox").on("keypress", function(e){
            $(".loginCont .loginBanner .content .emailBox .errorBox").remove();
            $(".loginCont .loginBanner .content .loginBtn").prop("disabled", false);
        });
    }
    // if password field is a number
    if(!isNaN(getPassword[0].value)){
        $(".loginCont .loginBanner .content .passwordBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, passwords can only be in characters.</p></div>
        `);

        $(".loginCont .loginBanner .content .passwordBox").on("keypress", function(e){
            $(".loginCont .loginBanner .content .passwordBox .errorBox").remove();
            $(".loginCont .loginBanner .content .loginBtn").prop("disabled", false);
        });
    }
    // if password field is a 8 characters long min
    else if(getPassword[0].value.length < 8){
        $(".loginCont .loginBanner .content .passwordBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, passwords have to be 8 characters long.</p></div>
        `);

        $(".loginCont .loginBanner .content .passwordBox").on("keypress", function(e){
            $(".loginCont .loginBanner .content .passwordBox .errorBox").remove();
            $(".loginCont .loginBanner .content .loginBtn").prop("disabled", false);
        });
    }
    // if password field is a 15 characters long max
    else if(getPassword[0].value.length > 15){
        $(".loginCont .loginBanner .content .passwordBox").append(`
        <div class=errorBox><p style='color: #d93025;'>Sorry, passwords should only be 15 characters long.</p></div>
        `);

        $(".loginCont .loginBanner .content .passwordBox").on("keypress", function(e){
            $(".loginCont .loginBanner .content .passwordBox .errorBox").remove();
            $(".loginCont .loginBanner .content .loginBtn").prop("disabled", false);
        });
    }
    else {
        $(e.target).prop("disabled", false);

        passwordVal = $(".loginCont .loginBanner .password").val();

        let loginData = new FormData();
        loginData.append("email", emailVal);
        loginData.append("password", passwordVal);

        $.ajax({
            url: "https://recipe-exchange.tchloe.com/php/recipesx/login",
            method: "post",
            data: loginData,
            processData: false,
            contentType: false
        })
        .done((results)=>{
            if(results.successMSG == null){
                console.log(results.msg);
                $(".loginCont .loginBanner .content .passwordBox").append(`
                    <div class=errorBox><p style='color: #d93025;'>${results.msg}</p></div>
                `);
                $(".loginCont .loginBanner .content .emailBox").on("keypress", function(e){
                    $(".loginCont .loginBanner .content .passwordBox .errorBox").remove();
                    $(".loginCont .loginBanner .content .loginBtn").prop("disabled", false);
                });
            }
            else {
                // console.log(results.successMSG);
                $(".loginCont").addClass("hideBox");
                alert(results.successMSG);
                // storing session id for login users
                sessionStorage.id = JSON.stringify(results.data.id);
                // if session id is set, do these
                if(sessionStorage.id != null){
                    if(sessionStorage.id == results.data.id){
                        $(".navBar ul .loginBtn").addClass("hideBox");
                        $(".navBar ul .signUpBtn").addClass("hideBox");

                        $(".navBar ul .dropdownBox").removeClass("hideBox");
                        $(".navBar ul .dropdownBox .dropdownCont").addClass("hideDropdown");

                        $(".navBar ul .dropdownBox .dropdownBtn").on("click", function(){
                            $(".navBar ul .dropdownBox .dropdownCont").removeClass("hideBox");
                            $(".navBar ul .dropdownBox .dropdownCont").toggleClass("hideDropdown showDropdown");                        
                        });
                    }
                }
            }
        })
        .fail(()=>{
            console.log("Sorry, the requested URL is unavailable at this moment.");
        });
    }

    $(e.target).prop("disabled", true);
}

// login and newsletter popups configure
function showNewsletter(){
    let getSubscribeEmail = document.getElementsByClassName("subscribeEmail");
    let getEmail = document.getElementsByClassName("email");
    let getPassword = document.getElementsByClassName("password");

    $(".loginCont").addClass("hideBox");
    $(".subscribeCont").addClass("hideBox");
    ifLoginIsHidden = $(".loginCont").hasClass("hideBox");

    // true
    if(ifLoginIsHidden){ // if login is hidden
        $(".navBar ul .loginBtn").on("click", function(){
            $(".loginCont").removeClass("hideBox");
            $(".loginCont").addClass("showBox");
            clearInterval(i);

            $(".loginCont .loginBanner .closeBtn").on("click", function(){
                $(".loginCont").removeClass("showBox");
                getEmail[0].value="";
                getPassword[0].value="";
                $(".loginCont .loginBanner .content .errorBox").remove(); 
                $(".loginCont .loginBanner .loginBtn").prop("disabled", false);    
                $(".loginCont").addClass("hideBox");
            });
        });
        i = setInterval(function(){
            $(".subscribeCont").removeClass("hideBox");
            $(".subscribeCont").addClass("showBox");
        }, 3000);

        $(".subscribeCont .subscribeBanner .closeBtn").on("click", function(){
            $(".subscribeCont").removeClass("showBox");
             getSubscribeEmail[0].value = "";
            $(".subscribeCont").addClass("hideBox");
            clearInterval(i);
        });
    }
}

// signup and newsletter popups configure
function showNewsletter2(){
    let getFirstName = document.getElementsByClassName("firstName");
    let getLastName = document.getElementsByClassName("lastName");
    let getUsername = document.getElementsByClassName("username");
    let getEmail = document.getElementsByClassName("emailAdd");
    let getPassword = document.getElementsByClassName("passWord");

    $(".signUpCont").addClass("hideBox");
    ifSignUpIsHidden = $(".signUpCont").hasClass("hideBox");

    // true
    if(ifSignUpIsHidden){ // if sign up is hidden
        $(".navBar ul .signUpBtn").on("click", function(){
            clearInterval(i); // from previous fn
            $(".signUpCont").removeClass("hideBox");
            $(".signUpCont").addClass("showBox");

            $(".signUpCont .signUpBanner .closeBtn").on("click", function(){
                $(".signUpCont").removeClass("showBox");
                getFirstName[0].value="";
                getLastName[0].value="";
                getUsername[0].value="";
                getEmail[0].value="";
                getPassword[0].value="";
                $(".signUpCont .signUpBanner .content .errorBox").remove();
                $(".signUpCont .signUpBanner .signUpBtn").prop("disabled", false);    
                $(".signUpCont").addClass("hideBox");
            });
        });
    }
}

// do it again
function sendNewsletter(){
    $(".subscribeEmail").on("keypress", function(e){
        $(".errorBox").remove();
        if(e.key=="Enter"){
            let getSubscribeEmail = document.getElementsByClassName("subscribeEmail");
            // checkValidity returns true or false
            // if email format is correct and true
            if(getSubscribeEmail[0].checkValidity()){
                getSubscribeEmail[0].value = "";
                $(".subscribeCont .subscribeBanner .content").append(`
                    <div class=errorBox><p style='color: #39C16C;'>Success! A email with your subscription will be sent soon.</p></div>
                `);

                $(".subscribeCont .subscribeBanner .closeBtn").on("click", function(){
                    $(".subscribeCont").addClass("hideBox");
                    $(".errorBox").remove();
                });
            }
            // if email format is incorrect and false
            else {
                getSubscribeEmail[0].value = "";
                $(".subscribeCont .subscribeBanner .content").append(`
                    <div class=errorBox><p style='color: #d93025;'>Sorry, please try again with the correct email format.</p></div>
                `);

                $(".subscribeCont .subscribeBanner .closeBtn").on("click", function(){
                    $(".subscribeCont").addClass("hideBox");
                    $(".errorBox").remove();
                });
            }
        }
    });
    $(".subscribeBtn").on("click", function(){
        $(".errorBox").remove();
        let getSubscribeEmail = document.getElementsByClassName("subscribeEmail");
        // checkValidity returns true or false
        // if email format is correct and true
        if(getSubscribeEmail[0].checkValidity()){
            getSubscribeEmail[0].value = "";
            $(".subscribeCont .subscribeBanner .content").append(`
                <div class=errorBox><p style='color: #39C16C;'>Success! A email with your subscription will be sent soon.</p></div>
            `);
            
            $(".subscribeCont .subscribeBanner .closeBtn").on("click", function(){
                $(".subscribeCont").addClass("hideBox");
                $(".errorBox").remove();
            });
        }
        // if email format is incorrect and false
        else {
            getSubscribeEmail[0].value = "";
            $(".subscribeCont .subscribeBanner .content").append(`
                <div class=errorBox><p style='color: #d93025;'>Sorry, please try again with the correct email format.</p></div>
            `);
            
            $(".subscribeCont .subscribeBanner .closeBtn").on("click", function(){
                $(".subscribeCont").addClass("hideBox");
                $(".errorBox").remove();
            });
        }
    });
    $(".subscribeCont .subscribeBanner .closeBtn").on("click", function(){
        $(".subscribeCont").addClass("hideBox");
        $(".errorBox").remove();
    });
}

function showPromoBanner(){
    $(".slideShow").css("padding-top", "0rem");

    $("#inner").scroll(function(){
        let scrollPos = $("#inner").scrollTop();
        if(scrollPos >= 70) {
            $(".promoBanner").css("visibility", "visible");
            $(".promoBanner").addClass("bannerAni");
            $(".slideShow").css("padding-top", "5rem");
        }
        if(scrollPos >= 500){
            console.log("yes 500");
            $(".featuredBanner .content .featuredImgs .featuredImg .featuredTxtbox").css({
                "opacity": "1",
                "transform": "translateY(-10rem)",
                "transition": "transform 0.7s"
            });
        }
    });

    $(".promoBanner .closeIcon").on("click", ()=>{
        $(".promoBanner").css("visibility", "hidden");
        $(".slideShow").css("padding-top", "0rem");
    });
}

function scrollBackToTop(){
    console.log("s");
    $("#inner").animate({scrollTop: 0}, 670);
}

function displayPopRecipes(){
    $.ajax({
        url: "https://recipe-exchange.tchloe.com/php/recipesx/popular",
        method: "get"
    })
    .done((results)=>{
        if(results.successMSG == null){
            console.log(results.msg);
        }
        else {
            console.log(results.successMSG);
            results.data.forEach(function(result){
                $(".popularSection .content .recipes").append(`
                    <div class="recipe">
                        <div class="popularImg popular1">
                            <img src="img/blankbg.png" alt="Image of a recipe">
                        </div>
                        <a>
                            <div class="recipeTxtbox">
                                <h5>${result.title}</h5>
                                <a class="clockIcon"><i class="fa fa-clock-o"></i></a>
                                <span>${result.prepTime} MINS</span>
                                <span class="separator"></span>
                                <span>${result.difficultyLvl}</span>
                                <p>${result.description}</p>
                                <a href="#"><button id="${result.id}" class="readMoreBtn">READ MORE</button></a>
                            </div>
                        </a>
                    </div>
                `);
            });
        }
    })
    .fail(()=>{
        console.log("Sorry, the requested URL is unavailable at this moment.");
    });
}