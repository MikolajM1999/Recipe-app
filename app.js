let recipes = []

const loadRecipes = () => {
    const recipesJSON = localStorage.getItem('recipes')
    try {
        recipes = recipesJSON ? JSON.parse(recipesJSON) : []
    } catch (e) {
        recipes = []
    }
}

const getRecipes = () => recipes

const saveRecipes = () => {
    localStorage.setItem('recipes', JSON.stringify(recipes))
}

const createRecipe = () => {
    const id = uuidv4()

    recipes.push({
        title: '',
        instructions: 'Step 1...',
        id,
        ingredients: []
    })
    saveRecipes()

    return id
}

const deleteRecipe = () => {
    const recipeIndex = recipes.findIndex((recipe) => {
        if (recipe.id === recipeID) {
            return recipe
        }
    })

    if (recipeIndex > -1) {
        recipes.splice(recipeIndex, 1)
        saveRecipes()
        location.assign('/index.html')
    }
}

loadRecipes()
renderRecipes(recipes)