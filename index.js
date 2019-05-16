recipes = getRecipes()

document.getElementById('search').addEventListener('input', (e) => {
    const filteredRecipes = recipes.filter((recipe) => {
        return recipe.title.toLowerCase().includes(e.target.value.toLowerCase())
    })
    renderRecipes(filteredRecipes)
})

document.getElementById('addRecipe').addEventListener('click', () => {
    const noteID = createRecipe(recipes)
    location.assign(`/edit.html#${noteID}`)
})