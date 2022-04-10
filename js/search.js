var sessionID, recipeID;

$(function(){
    console.log("Ready!");

    // recipes page
    displayRecipes();
    // to execute a different function for these 2 pages
    checkPageClass();

    $(".loginCont").addClass("hideBox");
    $(".signUpCont").addClass("hideBox");
    
    // search page (login)
    // $(".navBar ul .loginBtn").on("click", login);
    // search page (sign up)
    // $(".navBar ul .signUpBtn").on("click", showSignUp);
    // go back to top of page
    $(".goBackUpBtn").on("click", scrollBackToTop);

    $(".sortRecipeTitleBtn").on("click", filterRecipeByTit);
    $(".sortPrepTimeBtn").on("click", filterRecipeByPrepTime);
    $(".sortDiffLevelBtn").on("click", filterRecipeByDiffLevel);
    // $(".sortReviewsBtn").on("click", filterRecipeByReviews);

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

            window.location.href = "index.html";

            $(".navBar ul .dropdownBox").addClass("hideBox");
            $(".navBar ul .dropdownBox .dropdownCont").addClass("hideDropdown");
        });
    }
}

function checkPageClass(){
    ifRecipePageIsShown  = $("#inner").hasClass("recipesPage");

    // if on recipes page, do this
    if(ifRecipePageIsShown){
        goToSearchPage();
        // console.log("on recipes");
    }

    // if on search page, do this
    if(!ifRecipePageIsShown){
        searchRecipe();
        // console.log("on search page");
    }
}

// login popup configure
function login(){
    $(".loginCont").removeClass("hideBox");
    $(".loginCont .loginBanner .closeBtn").on("click", function(){
        $(".loginCont").addClass("hideBox");
    });
}

// signup and newsletter popups configure
function showSignUp(){
    $(".signUpCont").removeClass("hideBox");
    $(".signUpCont .signUpBanner .closeBtn").on("click", function(){
        $(".signUpCont").addClass("hideBox");
    });
}

function scrollBackToTop(){
    $("#inner").animate({scrollTop: 0}, 500);
}

// filter recipes by title (ascending)
function filterRecipeByTit(){
    $(".searchSection .sortRecipeTitleBtn li::after").css({"transform": 
    "translateX(-5px)", "width": "65%", "background-color": "#f1a71d87"});

    $.ajax({
        url: "https://recipe-exchange.tchloe.com/php/recipesx/filter/titles",
        method: "get"
    })
    
    .done((results)=>{
    
        if(results.successMSG == null){
            console.log(results.msg);
        }
    
        else {
            console.log(results.successMSG);

            // clear previous my recipes before filter
            $(".searchSection .content .recipes .recipe").remove();

            results.data.forEach(function(result){

                $(".searchSection .content .recipes").append(`
                    <div class="recipe">
                        <div class="searchImg">
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

        $(".sortRecipeTitleBtn").on("click", function(){
            window.location.reload();
        });
    })
    
    .fail(()=>{
        console.log("Sorry, the requested URL is unavailable at this moment.");
    });
}

// filter recipes by prep time (ascending)
function filterRecipeByPrepTime(){
    $(".searchSection .sortPrepTimeBtn li::after").css({"transform": 
    "translateX(-1px)", "width": "55%", "background-color": "#f1a71d87"});

    $.ajax({
        url: "https://recipe-exchange.tchloe.com/php/recipesx/filter/times",
        method: "get"
    })
    
    .done((results)=>{
    
        if(results.successMSG == null){
            console.log(results.msg);
        }
    
        else {
            console.log(results.successMSG);

            // clear previous my recipes before filter
            $(".searchSection .content .recipes .recipe").remove();

            results.data.forEach(function(result){

                $(".searchSection .content .recipes").append(`
                    <div class="recipe">
                        <div class="searchImg">
                            <img src="img/blankbg.png" alt="Image of a recipe">                        </div>
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

        $(".sortPrepTimeBtn").on("click", function(){
            window.location.reload();
        });
    })
    
    .fail(()=>{
        console.log("Sorry, the requested URL is unavailable at this moment.");
    });
}

// filter recipes by difficulty level (ascending)
function filterRecipeByDiffLevel(){
    $(".searchSection .sortRecipeTitleBtn li::after").css({"transform": 
    "translateX(0px)", "width": "61%", "background-color": "#f1a71d87"});

    $.ajax({
        url: "https://recipe-exchange.tchloe.com/php/recipesx/filter/difflevel",
        method: "get"
    })
    
    .done((results)=>{
    
        if(results.successMSG == null){
            console.log(results.msg);
        }
    
        else {
            console.log(results.successMSG);

            // clear previous my recipes before filter
            $(".searchSection .content .recipes .recipe").remove();

            results.data.forEach(function(result){

                $(".searchSection .content .recipes").append(`
                    <div class="recipe">
                        <div class="searchImg">
                            <img src="img/blankbg.png" alt="Image of a recipe">                        </div>
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

        $(".sortDiffLevelBtn").on("click", function(){
            window.location.reload();
        });
    })
    
    .fail(()=>{
        console.log("Sorry, the requested URL is unavailable at this moment.");
    });
}

// filter recipes by no. of reviews (ascending)
// recipes page
function displayRecipes(){
    $.ajax({
        url: "https://recipe-exchange.tchloe.com/php/recipesx/recipes",
        method: "get"
    })
    
    .done((results)=>{
    
        if(results.successMSG == null){
            console.log(results.msg);
        }
    
        else {
            console.log(results.successMSG);

            results.data.forEach(function(result){
                $(".searchSection .content .recipes").append(`
                    <div class="recipe">
                        <div class="searchImg">
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
            
            $(".searchSection .saveRecipeBtn").on("click", function(e){
                recipeID = e.target.id;
                console.log(recipeID);
                $(e.target).prev().css("background-color", "#f1a81d");
                $(e.target).css("color", "#fff");
            });

            $(".popularSection .viewMoreBtn").css("visibility", "visible");
        }
    })
    
    .fail(()=>{
        console.log("Sorry, the requested URL is unavailable at this moment.");
    });
}

// go from recipes page to go to search page
function goToSearchPage(){
    $(".searchSection .topSect .searchBox .searchRecipe").on("keypress", function(e){
        if(e.key=="Enter"){
            // if search box is empty
            if(!$(".searchRecipe").val()){
                window.location.href="search.html";
            }

            // if search box has value
            else {
                let searchStr = $(".searchRecipe").val();
                window.location.href="search.html?q=" + searchStr;
                $(".searchRecipe").val(""); 
            }
        }
    });

    // else go to search page when search button is clicked
    $(".searchSection .topSect .searchBox .searchBtn").on("click", function(){
        // if search box is empty
        if(!$(".searchRecipe").val()){
            window.location.href="search.html";
        }

        // if search box has value
        else {
            let searchStr = $(".searchRecipe").val();
            window.location.href="search.html?q=" + searchStr;
            $(".searchRecipe").val(""); 
        }
    });
}

// search page
function searchRecipe(){
    var getQueryStr = new URLSearchParams(window.location.search);
    var searchStr = getQueryStr.get("q");

    $.ajax({
        url: "https://recipe-exchange.tchloe.com/php/recipesx/recipes/search/" + searchStr,
        method: "get"
    })
    
    .done((results)=>{
        if(results.successMSG == null){
            $(".searchSection .topSect .searchTitle").append(`<h3 style='right: 2.3rem;'>Search</h3>`)
            $(`<div class=errorBox>
                <h3>${results.msg}</h3>
            </div>`).insertBefore(".searchSection .content .viewMoreBtn");
            $(".searchSection .viewMoreBtn").css("visibility", "hidden");
        }

        else {
            console.log(results.successMSG);
            $(".searchSection .topSect .searchTitle").append(`<h3>${results.data.length} Results</h3>`)

            results.data.forEach(function(result){
                $(".searchSection .content .recipesResults").append(`
                    <div class="recipe">
                        <div class="searchImg">
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

    // if enter key was pressed, search
    $(".searchSection .topSect .searchBox .searchRecipe").on("keypress", function(e){
        if(e.key=="Enter"){
            // if search box is empty
            if(!$(".searchRecipe").val()){
                window.location.href="search.html";
            }

            // if search box has value
            else {
                doSearchRecipeAgain();
            }
        }
    });

    // else when search button is pressed, search
    $(".searchSection .topSect .searchBox .searchBtn").on("click", function(e){
        // if search box is empty
        if(!$(".searchRecipe").val()){
            window.location.href="search.html";
        }

        // if search box has value
        else {
            doSearchRecipeAgain();
        }
    });
}

// search page
function doSearchRecipeAgain(){
    let newSearchStr = $(".searchRecipe").val();
    window.location.href="search.html?q=" + newSearchStr;
    $(".searchRecipe").val("");

    var getQueryStr = new URLSearchParams(window.location.search);
    var newestSearchStr = getQueryStr.get("q");

    $.ajax({
        url: "https://recipe-exchange.tchloe.com/php/recipesx/recipes/search/" + newestSearchStr,
        method: "get"
    })
    
    .done((results)=>{
        if(results.successMSG == null){
            console.log(results.msg);
            $(".searchSection .topSect .searchTitle").append(`<h3 style='right: 2.3rem;'>Search</h3>`);
        }

        else {
            console.log(results.successMSG);
            $(".searchSection .topSect .searchTitle").append(`<h3>${results.data.length} Results</h3>`)

            results.data.forEach(function(result){
                $(".searchSection .content .recipesResults").append(`
                    <div class="recipe">
                        <div class="searchImg">
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