var id, recipeNameVal, postedByInt, placeholderVal, editDiffLvlVal, diffLvlVal, postedByStr, postedByVal, prepTimeVal, recipeDescVal, ingrReqVal, serveApproxVal, stepsToCookVal, addiNotesVal;
// define variables

$(function(){
    console.log();
    // all elements inside html
    // rootElement = document.documentElement;
    // console.log(rootElement);

    postedByInt = String(sessionStorage.id);
    postedByStr = $(".addRecipeCont .addRecipeBanner .postedBy").val(postedByInt);

    console.log("Ready!");

    $(".loginCont").addClass("hideBox");
    $(".signUpCont").addClass("hideBox");

    // signup to page in popup
    $(".signUpCont .signUpBanner .signUpBtn").on("click", signUp);
    
    // login to page in popup
    $(".loginCont .loginBanner .loginBtn").on("click", login);

    // hide new recipe pop up
    $(".addRecipeCont").addClass("hideBox");

    // add recipe to page popup
    $(".myRecipesSection .addRecipeBtn").on("click", newRecipe);

    // add recipe button in add recipe pop up  
    $(".addRecipeCont .buttonsSect .addRecipeBtn").on("click", checkRecipeDataIsEmpty);


    // go back to top of page
    $(".goBackUpBtn").on("click", scrollBackToTop);

    // if session id is set
    ifSessionIsSet();
});

function ifSessionIsSet(){
    // if session id is empty
    if(sessionStorage.id != null){
        sessionID = JSON.parse(sessionStorage.id);
        console.log(sessionID);

        $(".navBar ul .loginBtn").addClass("hideBox");
        $(".navBar ul .signUpBtn").addClass("hideBox");

        $(".navBar ul .dropdownBox").removeClass("hideBox");
        $(".navBar ul .dropdownBox .dropdownCont").addClass("hideDropdown");

        $(".navBar ul .dropdownBox .dropdownBtn").on("click", function(){
            $(".navBar ul .dropdownBox .dropdownCont").removeClass("hideBox");
            $(".navBar ul .dropdownBox .dropdownCont").toggleClass("hideDropdown showDropdown");  
        });

        displayMyRecipes();

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
        $(".myRecipesSection .viewMoreBtn").css("visibility", "hidden");
        console.log("Sorry, there are no recipes available at the moment.");
    }
}

// display my posted recipes according to session id
function displayMyRecipes(){
    $.ajax({
        url: "https://recipe-exchange.tchloe.com/php/recipesx/myrecipe/" + postedByInt,
        method: "get"
    })
    
    .done((results)=>{
    
        if(results.successMSG == null){
            console.log(results.msg);
        }
    
        else {
            console.log(results.successMSG);
            
            results.data.forEach(function(result){

                $(".myRecipesSection .content .recipes ul").append(`
                    <li>
                        <div class="recipe">
                            <a>
                                <div class="imgBox">
                                    <img src="img/blankbg.png" alt="Image of a recipe" class="myRecipeImg">
                                </div>
                                <div class="recipeDetails">
                                    <h5>${result.title}</h5>
                                    <p>${result.description}</p>
                                    <div class="border"></div>
                                    <div class="buttonsSect">
                                        <button type="button" class="likeBtn" id=${result.id}><i class="fa fa-thumbs-up"></i><a>LIKE</a></button>
                                        <button type="button" class="shareBtn" id=${result.id}><i class="fa fa-reply"></i>SHARE</button>
                                        <button type="button" class="deleteBtn" id=${result.id}><i class="fa fa-trash"></i>DELETE</button>
                                    </div>
                                </div>
                                <div class="editRecipeBox">
                                    <a href="#"><button id=${result.id} class="editRecipeBtn"><i class="recipeIcon fa fa-edit"></i>EDIT RECIPE</button></a>
                                </div>
                            </a>
                        </div>
                    </li>
                `);
            });

            $(".myRecipesSection .recipe .buttonsSect .deleteBtn").on("click", function(e){
                deleteRecipe(e);
            });

            $(".sortTitleBtn").on("click", filterRecipeByTitle);
            $(".sortDateBtn").on("click", filterRecipeByDate);

            // edit recipe hereeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
            // $(".myRecipesSection .editRecipeBtn").on("click", function(e){
            //     retrieveRecipeData(e);
            // });
        }
    })
    
    .fail(()=>{
        console.log("Sorry, the requested URL is unavailable at this moment.");
    });
}

// retrieve a recipe data
function retrieveRecipeData(e){
    console.log(e.target.id);
    
    $.ajax({
        url: "https://recipe-exchange.tchloe.com/php/recipesx/recipes/recipe/" + e.target.id,
        method: "get"
    })
    
    .done((results)=>{
    
        if(results.successMSG == null){
            console.log(results.msg);
        }
    
        else {
            console.log(results.successMSG);
            // console.log(results);

            $(".addRecipeCont .recipeDescBox").css("border", "none");
            $(".addRecipeBanner .content .recipeDesc").css("display", "block");

            $(".addRecipeCont .ingrReqBox").css("border", "none");
            $(".addRecipeBanner .content .ingrReq").css("display", "block");

            $(".addRecipeCont .stepsToCookBox").css("border", "none");
            $(".addRecipeBanner .content .stepsToCook").css("display", "block");

            $(".addRecipeCont .addiNotesBox").css("margin-top", "0rem");

            editDiffLvlVal = results.data.difficultyLvl;
            
            $(".addRecipeCont .addRecipeBanner .recipeName").val(results.data.title);
            $(".addRecipeCont .diffLevelTxt").html(results.data.difficultyLvl);
            $(".addRecipeCont .diffLevelTxt").css({"color":"#202020", "font-weight":"400"});
            $(".addRecipeCont .addRecipeBanner .prepTime").val(results.data.prepTime);
            $(".addRecipeCont .addRecipeBanner .recipeDesc").val(results.data.description);
            // $(".addRecipeCont .addRecipeBanner .ingrReq").val(results.data.ingredientsReq);
            $(".addRecipeCont .addRecipeBanner .serveApprox").val(results.data.servesNo);
            // $(".addRecipeCont .addRecipeBanner .stepsToCook").val(results.data.stepsToCook);
            $(".addRecipeCont .addRecipeBanner .addiNotes").val(results.data.additionalNotes);     
            
            $(".myRecipesSection .recipe .editRecipeBtn").on("click", function(e){
                editRecipe(e);
            });
        }
    })
    
    .fail(()=>{
        console.log("Sorry, the requested URL is unavailable at this moment.");
    });
}

// edit recipe

function editRecipe(e){
    console.log('editing recipe');
    id = e.target.id;
    console.log(id);

    // if one of the difficulty level options is selected
    $(".addRecipeBanner .diffLevelBox .dropdownBtn").on("click", function(){
        $(".addRecipeCont .diffLevelCont .dropdownBox").css("display", "block");
        $(".addRecipeCont .diffLevelCont .dropdownBox").addClass("dropdownAni");
    });

    $(".easyBtn").on("click", function(e){
        placeholderVal = $(e.target).html();

        $(".addRecipeCont .diffLevelTxt").html('Easy');
        $(".addRecipeCont .diffLevelTxt").css({"color":"#202020", "font-weight":"400"});

        $(".addRecipeCont .diffLevelCont .dropdownBox").css("display", "none");
        $(".addRecipeCont .diffLevelCont .dropdownBox").removeClass("dropdownAni");
    });

    $(".mediumBtn").on("click", function(e){
        placeholderVal = $(e.target).html();

        $(".addRecipeCont .diffLevelTxt").html('Medium');
        $(".addRecipeCont .diffLevelTxt").css({"color":"#202020", "font-weight":"400"});

        $(".addRecipeCont .diffLevelCont .dropdownBox").css("display", "none");
        $(".addRecipeCont .diffLevelCont .dropdownBox").removeClass("dropdownAni");
    });

    $(".hardBtn").on("click", function(e){
        placeholderVal = $(e.target).html();

        $(".addRecipeCont .diffLevelTxt").html('Hard');
        $(".addRecipeCont .diffLevelTxt").css({"color":"#202020", "font-weight":"400"});

        $(".addRecipeCont .diffLevelCont .dropdownBox").css("display", "none");
        $(".addRecipeCont .diffLevelCont .dropdownBox").removeClass("dropdownAni");
    });

    let recipeName = document.getElementsByClassName("recipeName");
    let prepTime = document.getElementsByClassName("prepTime");
    let recipeDesc = document.getElementsByClassName("recipeDesc");
    // let ingrReq = document.getElementsByClassName("ingrReq");
    let serveApprox = document.getElementsByClassName("serveApprox");
    // let stepsToCook = document.getElementsByClassName("stepsToCook");
    let addiNotes = document.getElementsByClassName("addiNotes");

    // console.log(e.target.id);

    $(".addRecipeCont .content h6").html("EDIT RECIPE");
    $(".addRecipeCont .addRecipeBtn").html("EDIT RECIPE");

    $(".addRecipeCont .recipeDescBox").on("click", function(){
        $(this).css("border", "none");
        $(".addRecipeBanner .content .recipeDesc").css("display", "block");
    });

    // $(".addRecipeCont .ingrReqBox").on("click", function(){
    //     $(this).css("border", "none");
    //     $(".addRecipeBanner .content .ingrReq").css("display", "block");
    // });

    // $(".addRecipeCont .stepsToCookBox").on("click", function(){
    //     $(this).css("border", "none");
    //     $(".addRecipeCont .addiNotesBox").addClass("addRecipeMargin");
    //     $(".addRecipeCont .content .stepsToCookBox").css("height", "26rem");
    //     $(".addRecipeBanner .content .stepsToCook").css("display", "block");
    // });

    $(".addRecipeCont").removeClass("hideBox");

    $(".addRecipeCont .closeBtn").on("click", function(){
        $(".addRecipeCont").addClass("hideBox");
        recipeName[0].value="";
        prepTime[0].value="";
        recipeDesc[0].value="";
        // ingrReq[0].value="";
        serveApprox[0].value="";
        // stepsToCook[0].value="";
        addiNotes[0].value="";

        $(".addRecipeCont .errorBox").remove();
        $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
        $(".errorBox").remove();
    });

    // $(".addRecipeCont .recipeNameBox").on("keypress", function(e){
    //     // console.log(e.target.value);
    //     recipeNameVal = e.target.value;
    //     console.log(recipeNameVal);
    // })

        $(".addRecipeCont .buttonsSect .addRecipeBtn").on("click", function(){
            validateEditCred(e);
        });

        $(".addRecipeCont .buttonsSect .cancelBtn").on("click", function(){
            let cancelPrompt = confirm("You still have unsaved changes, are you sure you want to close this?");

            if(cancelPrompt){
                $(".addRecipeCont").addClass("hideBox");
            }
        });
}

// prob
function validateEditCred(e){
    console.log('engaging edit validation');

    $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

    // set on keypress event and record new recipe value that was written

    // let recipeName = document.getElementsByClassName("recipeName");
    // let prepTime = document.getElementsByClassName("prepTime");
    // let recipeDesc = document.getElementsByClassName("recipeDesc");
    // let ingrReq = document.getElementsByClassName("ingrReq");
    // let serveApprox = document.getElementsByClassName("serveApprox");
    // let stepsToCook = document.getElementsByClassName("stepsToCook");
    // let addiNotes = document.getElementsByClassName("addiNotes");

    var editID = e.target.id;
    // console.log(editID);

    $(".addRecipeCont .recipeNameBox").on("keypress", ()=>{
        $(".recipeNameBox .errorBox").remove();
        $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
    });

    // might be something to do with this???
    recipeNameVal = $(".addRecipeCont .addRecipeBanner .recipeName").val();
    console.log(recipeNameVal);
    postedByVal = $(".addRecipeCont .addRecipeBanner .postedBy").val();
    // diff level here
    console.log(placeholderVal);
    recipeDescVal = $(".addRecipeCont .addRecipeBanner .recipeDesc").val();
    // ingrReqVal = $(".addRecipeCont .addRecipeBanner .ingrReq").val();
    serveApproxVal = $(".addRecipeCont .addRecipeBanner .serveApprox").val();
    // stepsToCookVal = $(".addRecipeCont .addRecipeBanner .stepsToCook").val();
    addiNotesVal = $(".addRecipeCont .addRecipeBanner .addiNotes").val();

    let editRecipeData = new FormData();

    editRecipeData.append("title", recipeNameVal);
    editRecipeData.append("postedByID", postedByVal);
    editRecipeData.append("difficultyLvl",  placeholderVal);
    // console.log(editDiffLvlVal);
    editRecipeData.append("prepTime", prepTimeVal);
    editRecipeData.append("description", recipeDescVal);
    // editRecipeData.append("ingredientsReq", ingrReqVal);
    editRecipeData.append("servesNo", serveApproxVal);
    // editRecipeData.append("stepsToCook", stepsToCookVal);
    editRecipeData.append("additionalNotes", addiNotesVal);

    $.ajax({
        url: "https://recipe-exchange.tchloe.com/php/recipesx/updaterecipe/" + id,
        method: "post",
        data: editRecipeData,
        processData: false,
        contentType: false
    })
    
    .done((results)=>{
        if(results.successMSG == null){
            console.log(results.msg);
            $(".addRecipeCont .recipeNameBox").append(`
                <div class=errorBox><p style='color: #d93025;'>${results.msg}</p></div>
            `);
        }
    
        else {
            console.log(results.successMSG);
            alert(results.successMSG);
            window.location.reload();
            $(".addRecipeCont").addClass("hideBox");
        }
    })
    
    .fail(()=>{
        console.log("Sorry, the requested URL is unavailable at this moment.");
    });

    $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
    $(".addRecipeCont .addRecipeBanner .errorBox").remove();
}

// filter recipes accordingly to title (descending)
function filterRecipeByTitle(){
    $(".myRecipesSection .sortTitleBtn li::after").css({"transform": 
    "translateX(-5px)", "width": "47%", "background-color": "#f1a71d87"});

    $.ajax({
        url: "https://recipe-exchange.tchloe.com/php/recipesx/myrecipe/filtertitle/" + sessionID,
        method: "get"
    })
    
    .done((results)=>{
    
        if(results.successMSG == null){
            console.log(results.msg);
        }
    
        else {
            console.log(results.successMSG);

            // clear previous my recipes before filter
            $(".myRecipesSection .content .recipes ul li").remove();

            results.data.forEach(function(result){

                $(".myRecipesSection .content .recipes ul").append(`
                    <li>
                        <div class="recipe">
                            <a>
                                <div class="imgBox">
                                    <img src="img/blankbg.png" alt="Image of a recipe" class="myRecipeImg">
                                </div>
                                <div class="recipeDetails">
                                    <h5>${result.title}</h5>
                                    <p>${result.description}</p>
                                    <div class="border"></div>
                                    <div class="buttonsSect">
                                        <button type="button" class="likeBtn" id=${result.id}><i class="fa fa-thumbs-up"></i><a>LIKE</a></button>
                                        <button type="button" class="shareBtn" id=${result.id}><i class="fa fa-reply"></i>SHARE</button>
                                        <button type="button" class="deleteBtn" id=${result.id}><i class="fa fa-trash"></i>DELETE</button>
                                    </div>
                                </div>
                                <div class="editRecipeBox">
                                    <a href="#"><button id=${result.id} class="editRecipeBtn"><i class="recipeIcon fa fa-edit"></i>EDIT RECIPE</button></a>
                                </div>
                            </a>
                        </div>
                    </li>
                `);
            });
        }

        $(".sortTitleBtn").on("click", function(){
            window.location.reload();
        });
    })
    
    .fail(()=>{
        console.log("Sorry, the requested URL is unavailable at this moment.");
    });
}

// filter recipes accordingly to date created (descending)
function filterRecipeByDate(){
    $(".myRecipesSection .sortDateBtn li::after").css({"transform": 
    "translateX(-3.5px)", "width": "60%", "background-color": "#f1a71d87"});

    $.ajax({
        url: "https://recipe-exchange.tchloe.com/php/recipesx/myrecipe/filterdate/" + sessionID,
        method: "get"
    })
    
    .done((results)=>{
    
        if(results.successMSG == null){
            console.log(results.msg);
        }
    
        else {
            console.log(results.successMSG);

            // clear previous my recipes before filter
            $(".myRecipesSection .content .recipes ul li").remove();

            results.data.forEach(function(result){

                $(".myRecipesSection .content .recipes ul").append(`
                    <li>
                        <div class="recipe">
                            <a>
                                <div class="imgBox">
                                    <img src="img/blankbg.png" alt="Image of a recipe" class="myRecipeImg">
                                </div>
                                <div class="recipeDetails">
                                    <h5>${result.title}</h5>
                                    <p>${result.description}</p>
                                    <div class="border"></div>
                                    <div class="buttonsSect">
                                        <button type="button" class="likeBtn" id=${result.id}><i class="fa fa-thumbs-up"></i><a>LIKE</a></button>
                                        <button type="button" class="shareBtn" id=${result.id}><i class="fa fa-reply"></i>SHARE</button>
                                        <button type="button" class="deleteBtn" id=${result.id}><i class="fa fa-trash"></i>DELETE</button>
                                    </div>
                                </div>
                                <div class="editRecipeBox">
                                    <a href="#"><button id=${result.id} class="editRecipeBtn"><i class="recipeIcon fa fa-edit"></i>EDIT RECIPE</button></a>
                                </div>
                            </a>
                        </div>
                    </li>
                `);
            });
        }

        $(".sortDateBtn").on("click", function(){
            window.location.reload();
        });
    })
    
    .fail(()=>{
        console.log("Sorry, the requested URL is unavailable at this moment.");
    });
}

// delete recipe in page
function deleteRecipe(e){
    let deletePrompt = confirm("Are you sure you want to delete this recipe?");
    if(deletePrompt){
        $.ajax({
            url: "https://recipe-exchange.tchloe.com/php/recipesx/deleterecipe/" + e.target.id,
            method: "post"
        })
        
        .done((results)=>{
        
            if(results.successMSG == null){
                console.log(results.msg);
            }
        
            else {
                alert(results.successMSG);
                window.location.reload();
            }
        })
        
        .fail(()=>{
            console.log("Sorry, the requested URL is unavailable at this moment.");
        });
    }
}

// add new recipe to page
function newRecipe(){

    $(".addRecipeCont .content h6").html("NEW RECIPE");
    $(".addRecipeCont .addRecipeBtn").html("ADD RECIPE");

    // if one of the difficulty level options is selected
     $(".addRecipeBanner .diffLevelBox .dropdownBtn").on("click", function(){
        $(".addRecipeCont .diffLevelBox i").css({"color": "#f1a81d", "transition":"color 0.3s"});
        $(".addRecipeCont .diffLevelCont .dropdownBox").css("display", "block");
        $(".addRecipeCont .diffLevelCont .dropdownBox").addClass("dropdownAni");
    });

    $(".easyBtn").on("click", function(e){
        diffLvlVal = $(e.target).html();

        $(".addRecipeCont .diffLevelTxt").html(diffLvlVal);
        $(".addRecipeCont .diffLevelTxt").css("color", "#b8b8b8");
        $(".addRecipeCont .diffLevelTxt").css({"color":"#202020", "font-weight":"400"});

        $(".addRecipeCont .diffLevelCont .dropdownBox").css("display", "none");
        $(".addRecipeCont .diffLevelCont .dropdownBox").removeClass("dropdownAni");
    });

    $(".mediumBtn").on("click", function(e){
        diffLvlVal = $(e.target).html();

        $(".addRecipeCont .diffLevelTxt").html(diffLvlVal);
        $(".addRecipeCont .diffLevelTxt").css({"color":"#202020", "font-weight":"400"});

        $(".addRecipeCont .diffLevelCont .dropdownBox").css("display", "none");
        $(".addRecipeCont .diffLevelCont .dropdownBox").removeClass("dropdownAni");
    });

    $(".hardBtn").on("click", function(e){
        diffLvlVal = $(e.target).html();

        $(".addRecipeCont .diffLevelTxt").html(diffLvlVal);
        $(".addRecipeCont .diffLevelTxt").css({"color":"#202020", "font-weight":"400"});

        $(".addRecipeCont .diffLevelCont .dropdownBox").css("display", "none");
        $(".addRecipeCont .diffLevelCont .dropdownBox").removeClass("dropdownAni");
    });

    let recipeName = document.getElementsByClassName("recipeName");
    let prepTime = document.getElementsByClassName("prepTime");
    let recipeDesc = document.getElementsByClassName("recipeDesc");
    // let ingrReq = document.getElementsByClassName("ingrReq");
    let serveApprox = document.getElementsByClassName("serveApprox");
    // let stepsToCook = document.getElementsByClassName("stepsToCook");
    let addiNotes = document.getElementsByClassName("addiNotes");

    $(".addRecipeCont .recipeDescBox").on("click", function(){
        $(this).css("border", "none");
        $(".addRecipeBanner .content .recipeDesc").css("display", "block");
    });

    // $(".addRecipeCont .ingrReqBox").on("click", function(){
    //     $(this).css("border", "none");
    //     $(".addRecipeBanner .content .ingrReq").css("display", "block");
    // });

    // $(".addRecipeCont .stepsToCookBox").on("click", function(){
    //     $(this).css("border", "none");
    //     $(".addRecipeCont .addiNotesBox").addClass("addRecipeMargin");
    //     $(".addRecipeCont .content .stepsToCookBox").css("height", "26rem");
    //     $(".addRecipeBanner .content .stepsToCook").css("display", "block");
    // });

    $(".addRecipeCont").removeClass("hideBox");

    $(".addRecipeCont .closeBtn").on("click", function(){
        $(".addRecipeCont").addClass("hideBox");
        recipeName[0].value="";
        $(".addRecipeCont .diffLevelTxt").html("Select A Difficulty Level");
        $(".addRecipeCont .diffLevelTxt").css("color", "#b8b8b8");
        $(".addRecipeCont .serveApproxBox").css("margin-top", "0rem");
        $(".addRecipeCont .addiNotesBox").css("margin-top", "0rem");
        prepTime[0].value="";
        recipeDesc[0].value="";
        // ingrReq[0].value="";
        serveApprox[0].value="";
        // stepsToCook[0].value="";
        addiNotes[0].value="";

        $(".addRecipeCont .errorBox").remove();
        $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);

        // reset recipe settings
        resetRecipeToOrig();
    });

    $(".addRecipeCont .buttonsSect .cancelBtn").on("click",
        function(){
            let cancelPrompt = confirm("You still have unsaved changes, are you sure you want to close this?");

            if(cancelPrompt){
                $(".addRecipeCont").addClass("hideBox");
                recipeName[0].value="";
                $(".addRecipeCont .diffLevelTxt").html("Select A Difficulty Level");
                $(".addRecipeCont .diffLevelTxt").css("color", "#b8b8b8");        
                prepTime[0].value="";
                recipeDesc[0].value="";
                // ingrReq[0].value="";
                serveApprox[0].value="";
                // stepsToCook[0].value="";
                addiNotes[0].value="";
            }
    });
}

function resetRecipeToOrig(){
    $(".addRecipeCont .diffLevelCont .dropdownBox").css("display", "none");
    $(".addRecipeCont .diffLevelCont .dropdownBox").removeClass("dropdownAni");

    $(".addRecipeCont .addiNotesBox").removeClass("addRecipeMargin");
    $(".addRecipeBanner .content .recipeDesc").css("display", "none");
    $(".addRecipeCont .content .recipeDescBox").css("border", "3px solid #cfcfcf");

    // $(".addRecipeBanner .content .ingrReq").css("display", "none");
    // $(".addRecipeCont .content .ingrReqBox").css("border", "3px solid #cfcfcf");

    // $(".addRecipeBanner .content .stepsToCook").css("display", "none");
    // $(".addRecipeCont .content .stepsToCookBox").css("border", "3px solid #cfcfcf");
}

function checkRecipeDataIsEmpty(){
    console.log("yes222");
    let recipeName = document.getElementsByClassName("recipeName");
    let prepTime = document.getElementsByClassName("prepTime");
    let recipeDesc = document.getElementsByClassName("recipeDesc");
    // let ingrReq = document.getElementsByClassName("ingrReq");
    let serveApprox = document.getElementsByClassName("serveApprox");
    // let stepsToCook = document.getElementsByClassName("stepsToCook");
    let addiNotes = document.getElementsByClassName("addiNotes");

    if(!recipeName[0].value){
        // console.log("recipe field is empty");

        $(".addRecipeCont .recipeNameBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, recipe name field cannot be empty.</p></div>
        `);

        $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

        $(".addRecipeCont .recipeNameBox").keypress(function(){
            $(".addRecipeCont .recipeNameBox .errorBox").remove();
            $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
        });
    }

    if(!prepTime[0].value){
        $(".addRecipeCont .prepTimeBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, preparation time field cannot be empty.</p></div>
        `);

        $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

        $(".addRecipeCont .prepTimeBox").keypress(function(){
            $(".addRecipeCont .prepTimeBox .errorBox").remove();
            $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
        });
    }

    if(!recipeDesc[0].value){
        // console.log("recipe desc field is empty");
        $(".addRecipeCont .recipeDescBox").append(`
            <div class=errorBox style='margin-top: 4rem';><p style='color: #d93025;'>Sorry, recipe description field cannot be empty.</p></div>
        `);
                          
        $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

        $(".addRecipeCont .recipeDescBox").on("click", function(){
            $(this).css("border", "none");
            $(".addRecipeBanner .content .recipeDesc").css("display", "block");
            $(".addRecipeCont .recipeDescBox .errorBox").remove();
            $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
        });
    }

    // if(!ingrReq[0].value){
    //     $(".addRecipeCont .ingrReqBox").append(`
    //         <div class=errorBox style='margin-top: 9rem;'><p style='color: #d93025;'>Sorry, ingredients required field cannot be empty.</p></div>
    //     `);

    //     $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

    //     $(".addRecipeCont .serveApproxBox").css("margin-top", "6rem");

    //     $(".addRecipeCont .ingrReqBox").on("click", function(){
    //         $(this).css("border", "none");
    //         $(".addRecipeBanner .content .ingrReq").css("display", "block");
    //         $(".addRecipeCont .serveApproxBox").css("margin-top", "0rem");
    //         $(".addRecipeCont .ingrReqBox .errorBox").remove();
    //         $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
    //     });
    // }

    if(!serveApprox[0].value){
        $(".addRecipeCont .serveApproxBox").append(`
        <div class=errorBox><p style='color: #d93025;'>Sorry, serve approximate field cannot be empty.</p></div>
        `);

        $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

        $(".addRecipeCont .serveApproxBox").keypress(function(){
            $(".addRecipeCont .serveApproxBox .errorBox").remove();
            $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
        });
    }

    // if(!stepsToCook[0].value){
    //     $(".addRecipeCont .stepsToCookBox").append(`
    //         <div class=errorBox style='margin-top: 23rem;'><p style='color: #d93025;'>Sorry, steps to cook field cannot be empty.</p></div>
    //     `);

    //     $(".addRecipeCont .addiNotesBox").removeClass("addRecipeMargin");

    //     $(".addRecipeCont .addiNotesBox").css("margin-top", "5rem");

    //     $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

    //     $(".addRecipeCont .stepsToCookBox").on("click", function(){
    //         $(this).css("border", "none");
    //         $(".addRecipeCont .addiNotesBox").addClass("addRecipeMargin");
    //         $(".addRecipeCont .content .stepsToCookBox").css("height", "26rem");
    //         $(".addRecipeBanner .content .stepsToCook").css("display", "block");
    //         $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
    //     });

    //     $(".addRecipeCont .stepsToCook").on("keypress", function(){
    //         $(".addRecipeCont .addiNotesBox").css("margin-top", "8rem");
    //         $(".addRecipeCont .stepsToCookBox .errorBox").remove();
    //     });
    // }

    if(!addiNotes[0].value){
        $(".addRecipeCont .addiNotesBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, additional notes field cannot be empty.</p></div>
        `);

        $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

        $(".addRecipeCont .addiNotesBox").on("keypress", function(){
            $(".addRecipeCont .addiNotesBox .errorBox").remove();
            $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
        });
    }

    else {
        validateRecipeCred();
    }

    recipeName[0].value="";
    prepTime[0].value="";
    recipeDesc[0].value="";
    // ingrReq[0].value="";
    serveApprox[0].value="";
    // stepsToCook[0].value="";
    addiNotes[0].value="";
}

function validateRecipeCred(){
    console.log("validating then add");
    let recipeName = document.getElementsByClassName("recipeName");
    // let diffLevel = document.getElementsByClassName("diffLevel");
    let prepTime = document.getElementsByClassName("prepTime");
    let recipeDesc = document.getElementsByClassName("recipeDesc");
    // let ingrReq = document.getElementsByClassName("ingrReq");
    let serveApprox = document.getElementsByClassName("serveApprox");
    // let stepsToCook = document.getElementsByClassName("stepsToCook");
    let addiNotes = document.getElementsByClassName("addiNotes");

    // if recipe name is a number
    if(!isNaN(recipeName[0].value)){
        // console.log("recipe name cannot be in numbers");
        $(".addRecipeCont .recipeNameBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, recipe names can only be in characters.</p></div>
        `);

        $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

        $(".addRecipeCont .recipeNameBox").keypress(function(){
            $(".addRecipeCont .recipeNameBox .errorBox").remove();
            $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
        });
    }

    // if recipe desc is a number
    if(!isNaN(recipeDesc[0].value)){
        // console.log("recipe desc cannot be in numbers");
        $(".addRecipeCont .recipeDesc").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, recipe descriptions can only be in characters.</p></div>
        `);

        $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

        $(".addRecipeCont .recipeDescBox").on("click", function(){
            $(this).css("border", "none");
            $(".addRecipeBanner .content .recipeDesc").css("display", "block");
            $(".addRecipeCont .recipeDescBox .errorBox").remove();
            $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
        });
    }

    // if recipe desc is less than 50 characters
    if(recipeDesc[0].value.length < 10){
        // console.log("recipe desc cannot be less than 50 characters");
        $(".addRecipeCont .recipeDescBox").append(`
            <div class=errorBox style='margin-top: 20rem;'><p style='color: #d93025;'>Sorry, recipe descriptions have to be 10 characters long.</p></div>
        `);

        $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

        $(".addRecipeCont .recipeDescBox").on("click", function(){
            $(this).css("border", "none");
            $(".addRecipeBanner .content .recipeDesc").css("display", "block");
            $(".addRecipeCont .recipeDescBox .errorBox").remove();
            $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
        });
    }

    // if recipe desc is more than 200 characters
    if(recipeDesc[0].value.length > 200){
        console.log("recipe desc cannot be more than 200 characters");
        $(".addRecipeCont .recipeDescBox").append(`
            <div class=errorBox style='margin-top: 20rem;'><p style='color: #d93025;'>Sorry, recipe descriptions should only be 200 characters long.</p></div>
        `);

        $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

        $(".addRecipeCont .recipeDescBox").on("click", function(){
            $(this).css("border", "none");
            $(".addRecipeBanner .content .recipeDesc").css("display", "block");
            $(".addRecipeCont .recipeDescBox .errorBox").remove();
            $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
        });
    }

    // if ingredients required is a number
    // if(!isNaN(ingrReq[0].value)){
    //     $(".addRecipeCont .ingrReqBox").append(`
    //         <div class=errorBox style='margin-top: 9rem;'><p style='color: #d93025;'>Sorry, ingredients required can only be in characters.</p></div>
    //     `);

    //     $(".addRecipeCont .serveApproxBox").css("margin-top", "6rem");

    //     $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

    //     $(".addRecipeCont .ingrReqBox").click(function(){
    //         $(this).css("border", "none");
    //         $(".addRecipeCont .serveApproxBox").css("margin-top", "0rem");
    //         $(".addRecipeBanner .content .ingrReq").css("display", "block");
    //         $(".addRecipeCont .ingrReqBox .errorBox").remove();
    //         $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
    //     });
    // }

    // // if ingredients required is less than 3 characters
    // else if(ingrReq[0].value.length < 3){
    //     console.log("lol");
    //     $(".addRecipeCont .ingrReqBox").append(`
    //         <div class=errorBox style='margin-top: 9rem;'><p style='color: #d93025;'>Sorry, ingredients required have to be 3 characters long.</p></div>
    //     `);

    //     $(".addRecipeCont .serveApproxBox").css("margin-top", "6rem");

    //     $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

    //     $(".addRecipeCont .ingrReqBox").click(function(){
    //         $(this).css("border", "none");
    //         $(".addRecipeCont .serveApproxBox").css("margin-top", "0rem");
    //         $(".addRecipeBanner .content .ingrReq").css("display", "block");
    //         $(".addRecipeCont .ingrReqBox .errorBox").remove();
    //         $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
    //     });
    // }

    // // if ingredients required is more than 200 characters
    // else if(ingrReq[0].value.length > 200){
    //     $(".addRecipeCont .ingrReqBox").append(`
    //         <div class=errorBox style='margin-top: 9rem;'><p style='color: #d93025;'>Sorry, ingredients required have to be 200 characters long.</p></div>
    //     `);

    //     $(".addRecipeCont .serveApproxBox").css("margin-top", "6rem");

    //     $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

    //     $(".addRecipeCont .ingrReqBox").click(function(){
    //         $(this).css("border", "none");
    //         $(".addRecipeCont .serveApproxBox").css("margin-top", "0rem");
    //         $(".addRecipeBanner .content .ingrReq").css("display", "block");
    //         $(".addRecipeCont .ingrReqBox .errorBox").remove();
    //         $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
    //     });
    // }

    //  // if steps to cook is a number
    //  if(!isNaN(stepsToCook[0].value)){
    //     $(".addRecipeCont .stepsToCookBox").append(`
    //         <div class=errorBox style='margin-top: 23rem;'><p style='color: #d93025;'>Sorry, steps to cook can only be in characters.</p></div>
    //     `);

    //     $(".addRecipeCont .addiNotesBox").css("margin-top", "12rem");

    //     $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

    //     $(".addRecipeCont .stepsToCookBox").click(function(){
    //         $(this).css("border", "none");
    //         $(".addRecipeCont .addiNotesBox").addClass("addRecipeMargin");
    //         $(".addRecipeCont .content .stepsToCookBox").css("height", "26rem");
    //         $(".addRecipeCont .addiNotesBox").css("margin-top", "8rem");
    //         $(".addRecipeBanner .content .stepsToCook").css("display", "block");
    //         $(".addRecipeCont .stepsToCookBox .errorBox").remove();
    //         $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
    //     });
    // }

    // // if steps to cook is less than 50 characters
    // else if(stepsToCook[0].value.length < 50){
    //     $(".addRecipeCont .stepsToCookBox").append(`
    //         <div class=errorBox style='margin-top: 23rem;'><p style='color: #d93025;'>Sorry, steps to cook have to be 50 characters long.</p></div>
    //     `);

    //     $(".addRecipeCont .addiNotesBox").css("margin-top", "14rem");

    //     $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

    //     $(".addRecipeCont .stepsToCookBox").click(function(){
    //         $(this).css("border", "none");
    //         $(".addRecipeCont .addiNotesBox").addClass("addRecipeMargin");
    //         $(".addRecipeCont .content .stepsToCookBox").css("height", "26rem");
    //         $(".addRecipeCont .addiNotesBox").css("margin-top", "8rem");
    //         $(".addRecipeBanner .content .stepsToCook").css("display", "block");
    //         $(".addRecipeCont .stepsToCookBox .errorBox").remove();
    //         $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
    //     });
    // }

    // // if steps to cook is more than 500 characters
    // else if(stepsToCook[0].value.length > 500){
    //     $(".addRecipeCont .stepsToCookBox").append(`
    //         <div class=errorBox style='margin-top: 23rem;'><p style='color: #d93025;'>Sorry, steps to cook should only be 500 characters long.</p></div>
    //     `);

    //     $(".addRecipeCont .addiNotesBox").css("margin-top", "14rem");

    //     $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

    //     $(".addRecipeCont .stepsToCookBox").click(function(){
    //         $(this).css("border", "none");
    //         $(".addRecipeCont .addiNotesBox").addClass("addRecipeMargin");
    //         $(".addRecipeCont .content .stepsToCookBox").css("height", "26rem");
    //         $(".addRecipeCont .addiNotesBox").css("margin-top", "8rem");
    //         $(".addRecipeBanner .content .stepsToCook").css("display", "block");
    //         $(".addRecipeCont .stepsToCookBox .errorBox").remove();
    //         $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
    //     });
    // }

    // if additional notes is less than 40 characters
    if(addiNotes[0].value.length < 40){
        $(".addRecipeCont .addiNotesBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, additional notes have to be 40 characters long.</p></div>
        `);

        $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

        $(".addRecipeCont .addiNotesBox").keypress(function(){
            $(".addRecipeCont .addiNotesBox .errorBox").remove();
            $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
        });
    }

    // if additional notes is more than 200 characters
    if(addiNotes[0].value.length > 200){
        $(".addRecipeCont .addiNotesBox").append(`
            <div class=errorBox><p style='color: #d93025;'>Sorry, additional notes should only be 200 characters long.</p></div>
        `);

        $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", true);

        $(".addRecipeCont .addiNotesBox").keypress(function(){
            $(".addRecipeCont .addiNotesBox .errorBox").remove();
            $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
        });
    }

    else {
        recipeNameVal = $(".addRecipeCont .addRecipeBanner .recipeName").val();
        postedByVal = $(".addRecipeCont .addRecipeBanner .postedBy").val();
        // diff level here
        prepTimeVal = $(".addRecipeCont .addRecipeBanner .prepTime").val();
        recipeDescVal = $(".addRecipeCont .addRecipeBanner .recipeDesc").val();
        // ingrReqVal = $(".addRecipeCont .addRecipeBanner .ingrReq").val();
        serveApproxVal = $(".addRecipeCont .addRecipeBanner .serveApprox").val();
        // stepsToCookVal = $(".addRecipeCont .addRecipeBanner .stepsToCook").val();
        addiNotesVal = $(".addRecipeCont .addRecipeBanner .addiNotes").val();

        let newRecipeData = new FormData();

        newRecipeData.append("title", recipeNameVal);
        newRecipeData.append("postedByID", postedByVal);
        // difficulty level is the problem
        newRecipeData.append("difficultyLvl", diffLvlVal);
        newRecipeData.append("prepTime", prepTimeVal);
        newRecipeData.append("description", recipeDescVal);
        // newRecipeData.append("ingredientsReq", ingrReqVal);
        newRecipeData.append("servesNo", serveApproxVal);
        // newRecipeData.append("stepsToCook", stepsToCookVal);
        newRecipeData.append("additionalNotes", addiNotesVal);

        console.log(recipeNameVal, prepTimeVal, recipeDescVal, serveApproxVal, addiNotesVal, postedByVal);

        $.ajax({
            url: "https://recipe-exchange.tchloe.com/php/recipesx/newrecipe",
            method: "post",
            data: newRecipeData,
            processData: false,
            contentType: false
        })
        
        .done((results)=>{
            if(results.successMSG == null){
                console.log(results.msg);
            }
        
            else {
                alert(results.successMSG);
                window.location.reload();
                $(".addRecipeCont").addClass("hideBox");
            }
        })
        
        .fail(()=>{
            console.log("Sorry, the requested URL is unavailable at this moment.");
        });
    }

    $(".addRecipeCont .buttonsSect .addRecipeBtn").prop("disabled", false);
    $(".addRecipeCont .addRecipeBanner .errorBox").remove();
}

















// inside sign up popup, when href link is clicked
function showLogin(){
    let getEmail = document.getElementsByClassName("email");
    let getPassword = document.getElementsByClassName("password");

    $(".signUpCont").removeClass("showBox");
    $(".signUpCont").addClass("hideBox");
    $(".loginCont").removeClass("hideBox");
    $(".loginCont").addClass("showBox");

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

        var signUpData = new FormData();
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

    getEmail[0].value="";
    getPassword[0].value="";
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

        var loginData = new FormData();
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
            }
        })
        
        .fail(()=>{
            console.log("Sorry, the requested URL is unavailable at this moment.");
        });
    }

    $(e.target).prop("disabled", true);
}

function scrollBackToTop(){
    $("#inner").animate({scrollTop: 0}, 500);
}