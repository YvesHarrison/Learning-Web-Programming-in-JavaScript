const bluebird = require("bluebird");
const Promise = bluebird.Promise;
const uuidv4 = require("uuid/v4");
const collection = require("../config/collection");
const tasks = collection.tasks;

const exportedMethods={
	async getAllRecipes(){
    	const task_collection = await tasks();
    	const get_tasks =  await task_collection.find({}).toArray();
    	//console.log(get_tasks);
    	return get_tasks;
	},//get /recipes
	async getRecipeById(id){
    	if (id==null||id==undefined||id=="") throw "You must provide an id to search for";
    	if (typeof(id) !== 'string') throw "Invalid id";

    	const task_collection = await tasks();
    	const result = await task_collection.findOne({_id:id});
    	if(result === null) throw "No such recipe";
    	return result;
	},// get /recipes/:id
	async removeRecipe(id){
    	if (id==null||id==undefined||id=="") throw "You must provide an id to remove for";
    	if (typeof(id) !== 'string') throw "Invalid id";

    	const task_collection = await tasks();
    	const result = await task_collection.removeOne({_id:id});
    	if(result.deletedCount === 0) throw `Could not remove recipe with id of ${id}`;
    	console.log(`Removed recipe with id of ${id} successfully`);
    	return true;
	},//delete /recipes/:id
	async addRecipe(title, ingredients, steps) {
		if(title==null||title==undefined||title=="") throw "You must provide a title to update for";
		if(ingredients==null||ingredients==undefined||ingredients=="") throw "You must provide an ingredient to update for";
		if(steps==null||steps==undefined||steps=="") throw "You must provide a step to update for";
    	if (typeof(title) !== "string") throw "Invalid title!";
   		if (!Array.isArray(ingredients)) throw "Invalid ingredients!";
        if (!Array.isArray(steps)) throw "Invalid steps!";

    	const task_collection = await tasks();

    	const newPost = {
    		_id: uuidv4(),
      		title: title,
      		ingredients: ingredients,
      		steps:steps
    	};
    	//console.log(newPost.ingredients);
    	//console.log(newPost);
    	
    	const newInsertInformation = await task_collection.insertOne(newPost);
    	if (newInsertInformation.insertedCount === 0)throw "Could not add recipe";
    	const newId = newInsertInformation.insertedId;
    		//console.log(newId);
    	return await this.getRecipeById(newId);
	},//post /recipes
	async updateRecipe(id,updatedData){
		if (id==null||id==undefined||id=="") throw "You must provide an id to update for";
		if (updatedData==null||updatedData==undefined) throw "You must provide an updatedData to update for";
		if (typeof(id) !== 'string') throw "Invalid id";
		if (typeof(updatedData) !== 'object') throw "Invalid updatedData";
		if(updatedData.title==null||updatedData.title==undefined||updatedData.title=="") throw "You must provide a title for update data";
		if(!Array.isArray(updatedData.ingredients)||!updatedData.ingredients[0].name||!updatedData.ingredients[0].amount) throw "Invalid ingredients!";
		if(!Array.isArray(updatedData.steps)) throw "Invalid steps!";

		const task_collection = await tasks();

		const newdata={
			title: updatedData.title,
			ingredients: updatedData.ingredients,
			steps:updatedData.steps
		}

		
		const update = await task_collection.updateOne({_id: id}, {$set: newdata});
			//console.log(newdata);
		if (update.modifiedCount === 0) throw "Could not update recipe successfully";
		else console.log("Update recipe successfully");
		
		return await this.getRecipeById(id);
	},//put
	async renewRecipe(id,updatedData){
		if (id==null||id==undefined||id=="") throw "You must provide an id to renew for";
		if (updatedData==null||updatedData==undefined) throw "You must provide an updatedData to update for";
		if (typeof(id) !== 'string') throw "Invalid id";
		if (typeof(updatedData) !== 'object') throw "Invalid updatedData";

		const task_collection = await tasks();
		const newdata={};

		if(updatedData.title) newdata.title= updatedData.title;
		
		if(Array.isArray(updatedData.ingredients)&&updatedData.ingredients[0].name&&updatedData.ingredients[0].amount) newdata.ingredients=updatedData.ingredients;

		if(Array.isArray(updatedData.steps)) newdata.ingredients=updatedData.ingredients;
		
		//console.log(newdata);
		
		const update = await task_collection.updateOne({_id: id}, {$set: newdata});
		//console.log(update);
        if (update.modifiedCount === 0) throw "Could not renew recipe successfully";
        else console.log("Renew recipe successfully");
        //console.log(id);
		return await this.getRecipeById(id);
	}//patch
}

//exportedMethods.getAllRecipes()

module.exports = exportedMethods;

