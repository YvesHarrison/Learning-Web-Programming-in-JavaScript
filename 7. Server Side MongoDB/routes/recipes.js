const express = require("express");
const router = express.Router();
const data=require("../data/");
const recipeData=data.recipes;

router.get("/", async (req, res) => {
  //console.log(recipeData);
  try {
    const postList = await recipeData.getAllRecipes();
    res.json(postList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const recipe = await recipeData.getRecipeById(req.params.id);
    res.json(recipe);
  } catch (e) {
    res.status(404).json({ message: "no data!" });
  }
});

router.post("/", async (req, res) => {
  const blogPostData = req.body;
  try {
    const { title, ingredients, steps} = blogPostData;
    const newPost = await recipeData.addRecipe(title, ingredients, steps);
    res.json(newPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.put("/:id", async (req, res) => {
  const updatedData = req.body;
  try {
    await recipeData.getRecipeById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
  }

  try {
    const updatedPost = await recipeData.updateRecipe(req.params.id, updatedData);
    res.json(updatedPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
  
});

router.patch("/:id", async (req, res) => {
  const updatedData = req.body;
  try {
    await recipeData.getRecipeById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
  }

  try {
    const updatedPost = await recipeData.renewRecipe(req.params.id, updatedData);
    //console.log(updatedPost);
    res.json(updatedPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await recipeData.getRecipeById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
  }

  try {
    const a=await recipeData.removeRecipe(req.params.id);
    res.json(a);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;