const dbConnection = require("../config/database_connection");
const data=require("../data/");
const recipeData=data.recipes;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();
  //console.log(recipeData);
  try{
    await recipeData.addRecipe(
    "Fried Eggs", 
    [
    {
      name: "Egg",
      amount: "2 eggs"
    },
    {
      name: "Olive Oil",
      amount: "2 tbsp"
    },
    ],
    [
    "First, heat a non-stick pan on medium-high until hot",
    "Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.",
    "Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!",
    "Gently pour the egg from the bowl onto the oil",    
    "Wait for egg white to turn bubbly and completely opaque (approx 2 min)",
    "Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)",
    "Remove from oil and plate",
    "Repeat for second egg"
    ]
  );
    await recipeData.addRecipe(
    "Advanced Fried Eggs", 
    [
    {
      name: "Egg",
      amount: "2 eggs"
    },
    {
      name: "Olive Oil",
      amount: "2 tbsp"
    },
    {
      name: "Salt",
      amount: "2 g"
    },
    ],
    [
    "First, heat a non-stick pan on medium-high until hot",
    "Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.",
    "Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!",
    "Gently pour the egg from the bowl onto the oil",    
    "Wait for egg white to turn bubbly and completely opaque (approx 2 min)",
    "Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)",
    "Add salt",
    "Remove from oil and plate",
    "Repeat for second egg"
    ]
  );
    await recipeData.addRecipe(
    "Advanced Fried Eggs 2", 
    [
    {
      name: "Egg",
      amount: "2 eggs"
    },
    {
      name: "Olive Oil",
      amount: "2 tbsp"
    },
    {
      name: "Salt",
      amount: "2 g"
    },
    ],
    [
    "First, heat a non-stick pan on medium-high until hot",
    "Add the oil to the pan and allow oil to warm; it is ready the oil immediately sizzles upon contact with a drop of water.",
    "Crack the egg and place the egg and yolk in a small prep bowl; do not crack the yolk!",
    "Gently pour the egg from the bowl onto the oil",    
    "Wait for egg white to turn bubbly and completely opaque (approx 2 min)",
    "Using a spatula, flip the egg onto its uncooked side until it is completely cooked (approx 2 min)",
    "Remove from oil and plate",
    "Repeat for second egg"
    ]
  );
    let Recipes=await recipeData.getAllRecipes();
    console.log("Recipes after adding two");
    console.log("a",Recipes);
    await recipeData.removeRecipe(Recipes[0]._id);
    Recipes=await recipeData.getAllRecipes();
    console.log("Recipes after delete the first");
    console.log("b",Recipes);
    //console.log(a[0].ingredients);
  }catch(e){
    console.log(e);
  }
  
  console.log("Done seeding database");
  await db.serverConfig.close();
}

main();