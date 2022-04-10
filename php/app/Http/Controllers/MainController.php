<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Recipe;
use App\Models\RecipeImg;
use Illuminate\Support\Facades\DB;

class MainController extends Controller
{
    public function login(Request $req){
        $ifCredCorrect = User::where("email", $req->email)
        ->where("password", $req->password)
        ->exists();

        // $ifPasswordCorrect = User::where("password", 
        // $req->password)
        // ->exists();

        // if collection was empty, record was not found
        if(!$ifCredCorrect){
            return response()->json(["msg" => "Sorry, the email or password is incorrect."], 202);
        }

        // // if collection was empty, record was not found
        // if($ifPasswordCorrect){
        //     return response()->json(["msg" => "Sorry, the password is incorrect."], 202);
        // }

        else {
            $user = User::select("id", "firstName", 
            "lastName", "userType", "savedRecipes", 
            "postedRecipes", "username", "email", "password")
            ->where("email", $req->email)
            ->where("password", $req->password)
            ->first();

            $result = array();
            $result["successMSG"] = "Login successfully!";
            $result["data"] = $user;

            return response()->json($result, 200);
        }
    }

    public function newUser(Request $req){
        $ifUsernameExist = User::where("username", $req->username)
        ->exists();
        
        $ifEmailExist = User::where("email", $req->email)
        ->exists();

        if($ifUsernameExist){
            return response()->json(["msg" => "Sorry, this username already exists."], 202);
        }

        if($ifEmailExist){
            return response()->json(["msg" => "Sorry, this email already exists."], 202);
        }

        else {
            $newUser = new User();
            $newUser->firstName = $req->firstName;
            $newUser->lastName = $req->lastName;
            $newUser->email = $req->email;
            $newUser->username = $req->username;
            $newUser->password = $req->password;
            $newUser->save();
    
            return response()->json(["successMSG" => "You have signed up successfully!"], 200);
        }
    }

    public function getProfile(Request $req, $id){
        $ifUserExist = User::where("id", $id)
        ->exists();

        if($ifUserExist){
            $user = User::select("id", "firstName", 
            "lastName", "userType", "savedRecipes", 
            "postedRecipes", "username", "email", "password")
            ->where("id", $id)
            ->first();

            $result = array();
            $result["successMSG"] = "A profile was found successfully!";
            $result["data"] = $user;

            return response()->json($result, 200);
        }

        else {
            return response()->json(["msg" => "Sorry, this profile was not found."], 202);
        }
    }

    // update username only
    public function updateUsername(Request $req, $id){
        $ifUserExist = User::where("id", $id)
        ->exists();

        if($ifUserExist){
            $ifUsernameExist = User::where("username", $req->username)
            ->exists();

            if($ifUsernameExist){
                return response()->json(["msg" => "Sorry, this username already exists."], 202);
            }

            else {
                /* check if request body (form data type) 
                username input field are empty/null */
                $usernameInput = $req->input("username");

                $newUsername = User::select("username")
                ->where("id", $id)
                ->update(["username" => $req->username]);

                return response()->json(["successMSG" => "Username was changed successfully!"], 200);
            }
        }

        else {
            return response()->json(["msg" => "Sorry, this profile was not found."], 202);
        }
    }

    // update email only
    public function updateEmail(Request $req, $id){
        $ifUserExist = User::where("id", $id)
        ->exists();

        if($ifUserExist){
            $ifEmailExist = User::where("email", $req->email)
            ->exists();

            if($ifEmailExist){
                return response()->json(["msg" => "Sorry, this email already exists."], 202);
            }

            else {
                /* check if request body (form data type) 
                email input field are empty/null */
                // $emailInput = $req->input("email");

                $newEmail = User::select("email")
                ->where("id", $id)
                ->update(["email" => $req->email]);

                return response()->json(["successMSG" => "Email was changed successfully!"], 200);        
            }
        }

        else {
            return response()->json(["msg" => "Sorry, this profile was not found."], 202);
        }
    }

    // update password only
    public function updatePassword(Request $req, $id){
        $ifUserExist = User::where("id", $id)
        ->exists();

        if($ifUserExist){
            $ifPasswordExist = User::where("password", $req->password)
            ->exists();

            if($ifPasswordExist){
                return response()->json(["msg" => "Sorry, this password is already registered."], 202);
            }

            else {
                /* check if request body (form data type) 
                password input field are empty/null */
                // $passwordInput = $req->input("password");

                $newEmail = User::select("password")
                ->where("id", $id)
                ->update(["password" => $req->password]);

                return response()->json(["successMSG" => "Password was changed successfully!"], 200);        
            }
        }

        else {
            return response()->json(["msg" => "Sorry, this profile was not found."], 202);
        }
    }

    public function deleteUser(Request $req, $id){
        $ifUserExist = User::where("id", $id)
        ->exists();

        if($ifUserExist){
            $deleteUser = User::where("id", $id)
            ->delete();

            if($deleteUser){
                return response()->json(["msg" => "Your account was deleted successfully!"], 200);  
            }

            else {
                return response()->json(["msg" => "Sorry, the user account was not deleted."], 202);  
            }
        }

        else {
            return response()->json(["msg" => "Sorry, the account that you are trying to delete does not exist."], 202);
        }
    }

    public function retrieveARecipe(Request $req, $id){
        $ifRecipeExist = Recipe::where("id", $id)->exists();

        if($ifRecipeExist){
            $recipe = Recipe::select("id", "title",
            "difficultyLvl", "description", "prepTime",
            "servesNo", "additionalNotes")
            ->where("id", $id)
            ->first();

            $results = array();
            $results["successMSG"] = "A related recipe was retrieved successfully!";
            $results["data"] = $recipe;

            return response()->json($results, 202);
        }

        else {
            return response()->json(["msg" => "Sorry, there are no recipes available at the moment."], 202);
        }
    }

    public function getARecipe(Request $req, $id){
        $ifRecipeExist = Recipe::where("postedByID", $id)->exists();

        if($ifRecipeExist){
            $recipes = Recipe::select("id", "title",
            "description")
            ->orderBy("title", "asc")
            ->where("postedByID", $id)
            ->get();

            $results = array();
            $results["successMSG"] = "All recipes was retrieved successfully!";
            $results["data"] = $recipes;

            return response()->json($results, 202);
        }

        else {
            return response()->json(["msg" => "Sorry, there are no recipes available at the moment."], 202);
        }
    }

    public function getFourRecipes(Request $req){
        $allRecipes = Recipe::count();

        if($allRecipes > 0){
            $recipes = Recipe::select("id", "title", 
            "prepTime", "difficultyLvl", "description")
            ->skip(0) // offset
            ->take(4) // max limit
            ->get();

            // $recipeimgs = RecipeImg::select(
            // "imgAlt")
            // ->skip(0) // offset
            // ->take(4) // max limit
            // ->get();

            $results = array();
            $results["successMSG"] = "All recipes was retrieved successfully!";
            $results["data"] = $recipes;
            // $results["data"]["img"] = $recipeimgs;

            return response()->json($results, 200);
        }

        else {
            return response()->json(["msg" => "Sorry, there are no recipes available at the moment."], 202);
        }
    }

    public function getAllRecipes(Request $req){
        $allRecipes = Recipe::count();

        if($allRecipes > 0){
            $recipes = Recipe::select("id", "title", 
            "prepTime", "difficultyLvl", "description")
            ->get();

            $results = array();
            $results["successMSG"] = "All recipes was retrieved successfully!";
            $results["data"] = $recipes;

            return response()->json($results, 202);
        }

        else {
            return response()->json(["msg" => "Sorry, there are no recipes available at the moment."], 202);
        }
    }

    public function filterRecipesByTitle(Request $req){
        $allRecipeTitles = Recipe::count();

        if($allRecipeTitles > 0){
            $recipes = Recipe::select("id", "title", "prepTime",
            "difficultyLvl", "description")
            ->orderBy("title", "desc")
            ->get();

            $results = array();
            $results["successMSG"] = "All recipes was retrieved successfully!";
            $results["data"] = $recipes;

            return response()->json($results, 202);
        }

        else {
            return response()->json(["msg" => "Sorry, there are no recipes available at the moment."], 202);
        }
    }

    public function filterRecipesByTime(Request $req){
        $allRecipeTitles = Recipe::count();

        if($allRecipeTitles > 0){
            $recipes = Recipe::select("id", "title", "prepTime",
            "difficultyLvl", "description")
            ->orderBy("prepTime", "desc")
            ->get();

            $results = array();
            $results["successMSG"] = "All recipes was retrieved successfully!";
            $results["data"] = $recipes;

            return response()->json($results, 202);
        }

        else {
            return response()->json(["msg" => "Sorry, there are no recipes available at the moment."], 202);
        }
    }

    public function filterRecipesByDiffLevel(Request $req){
        $allRecipeTitles = Recipe::count();

        if($allRecipeTitles > 0){
            $recipes = Recipe::select("id", "title", "prepTime",
            "difficultyLvl", "description")
            ->orderBy("difficultyLvl", "desc")
            ->get();

            $results = array();
            $results["successMSG"] = "All recipes was retrieved successfully!";
            $results["data"] = $recipes;

            return response()->json($results, 202);
        }

        else {
            return response()->json(["msg" => "Sorry, there are no recipes available at the moment."], 202);
        }
    }

    public function filterRecipeByTitle(Request $req, $id){
        $ifRecipeExist = Recipe::where("postedByID", $id)->exists();

        if($ifRecipeExist){
            $recipes = Recipe::select("id", "title", "prepTime",
            "difficultyLvl", "description")
            ->orderBy("title", "desc")
            ->where("postedByID", $id)
            ->get();

            $results = array();
            $results["successMSG"] = "All recipes was retrieved successfully!";
            $results["data"] = $recipes;

            return response()->json($results, 202);
        }

        else {
            return response()->json(["msg" => "Sorry, there are no recipes available at the moment."], 202);
        }
    }

    public function filterRecipeByDate(Request $req, $id){
        $ifRecipeExist = Recipe::where("postedByID", $id)->exists();

        if($ifRecipeExist){
            $recipes = Recipe::select("id", "title",
            "description")
            ->orderBy("createdOn", "asc")
            ->where("postedByID", $id)
            ->get();

            $results = array();
            $results["successMSG"] = "All recipes was retrieved successfully!";
            $results["data"] = $recipes;

            return response()->json($results, 202);
        }

        else {
            return response()->json(["msg" => "Sorry, there are no recipes available at the moment."], 202);
        }
    }

    public function searchRecipe(Request $req, $searchStr){
        $ifRecipesExist = Recipe::where("title", 
        "LIKE", "%{$searchStr}%")
        ->exists();

        if($ifRecipesExist){
            $recipe = Recipe::select("title", 
            "prepTime", "difficultyLvl", "description")
            ->where("title", "LIKE", "%{$searchStr}%")
            ->get();

            $results = array();
            $results["successMSG"] = "Similar recipes was found successfully!";
            $results["data"] = $recipe;

            return response()->json($results, 200);
        }

        else {
            return response()->json(["msg" => "Sorry, there are no recipes that matches what you searched for."], 202);
        }

    }

    public function newRecipe(Request $req){

        // $profileimg = \App\Models\User::with("profileImgs")->first();
        // $test = $profileimg->profileImgs->imgPath;
        // return response()->json($test, 202);

        $ifTitleExist = Recipe::where("title", $req->title)
        ->exists();

        if($ifTitleExist){
            return response()->json(["msg" => "Sorry, this recipe title already exists."], 202);
        }

        else {
            $data = array();
            $data["title"] = $req->title;
            $data["difficultyLvl"] = $req->difficultyLvl;
            $data["prepTime"] = $req->prepTime;
            $data["servesNo"] = $req->servesNo;
            $data["description"] = $req->description;
            // $data["ingredientsReq"] = $req->ingredientsReq;
            // $data["stepsToCook"] =  $req->stepsToCook;
            $data["additionalNotes"] = $req->additionalNotes;
            $data["postedByID"] = $req->postedByID; // session id ajax

            $newRecipe = DB::table("recipes")
            ->insert($data);
            
            // $newImg = array();
            // // recipe img path and alt, inner join here
            // $newImg["imgPath"] = $req->imgPath;
            // $newImg["imgAlt"] = $req->imgAlt;

            // $newRecipeImg = DB::table("recipeimgs")
            // ->insert($newImg);
             
            return response()->json(["successMSG" => "A recipe was added successfully!"], 200);
        }
    }

    public function updateRecipe(Request $req, $id){
        $ifRecipeExist = Recipe::where("id", $id)
        ->exists();

        if($ifRecipeExist){
            $ifTitleExist = Recipe::where("title", $req->title)
            ->exists();

            if($ifTitleExist){
                return response()->json(["msg" => "Sorry, this recipe title already exists."], 202);    
            }

            else {
                $newData = array();
                $newData["title"] = $req->title;
                $newData["difficultyLvl"] = $req->difficultyLvl;
                $newData["prepTime"] = $req->prepTime;
                $newData["servesNo"] = $req->servesNo;
                $newData["description"] = $req->description;
                // $newData["ingredientsReq"] = $req->ingredientsReq;
                // $newData["stepsToCook"] =  $req->stepsToCook;
                $newData["additionalNotes"] = $req->additionalNotes;
                $newData["postedByID"] = $req->postedByID; // session id ajax
    
                $updateRecipe = DB::table("recipes")
                ->where("id", $id)
                ->update($newData);

                // do img validation here and if pic not empty
                // $newImg = array();
                // $newImg["imgPath"] = $req->imgPath;
                // $newImg["imgAlt"] = $req->imgAlt;
    
                // $updateRecipeImg = DB::table("recipeimgs")
                // ->where("id", $req->id)
                // ->update($newImg);
    
                return response()->json(["successMSG" => "Recipe was updated successfully!"], 200);    
            }
        }

        else {
            return response()->json(["msg" => "Sorry, this recipe does not exist."], 202);
        }
    }

    public function deleteRecipe(Request $req, $id){
        $ifRecipeExist = Recipe::where("id", $id)
        ->exists();

        if($ifRecipeExist){
            $deleteRecipe = Recipe::where("id", $id)
            ->delete();

            if($deleteRecipe){
                return response()->json(["successMSG" => "Recipe was deleted successfully!"], 200);  
            }

            else {
                return response()->json(["msg" => "Sorry, Recipe was not deleted."], 202);  
            }
        }

        else {
            return response()->json(["msg" => "Sorry, the recipe that you are trying to delete does not exist."], 202);
        }
    }
}
