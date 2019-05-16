const backButton = document.getElementById('backHomeButton')
const deleteButton = document.getElementById('deleteButton')
const titleInput = document.getElementById('title')
const instructionsArea = document.getElementById('instructions')
const submit = document.getElementById('submit')
const addedIngredients = document.getElementById('addedIngredients')
const recipeID = location.hash.substring(1)

// Event powrotu
backButton.addEventListener('click', () => {
    location.assign('/index.html')
})

// Event, który usówa przepis
deleteButton.addEventListener('click', () => {
    deleteRecipe()
})

// Tablica ze wszystkimi przepisami
recipes = getRecipes()
const thisRecipe = recipes.find((recipe) => recipe.id === recipeID)

// Eventy zapisujące do localStorage title i instructions:
// title
titleInput.addEventListener('input', (e) => {
    thisRecipe.title = e.target.value
    saveRecipes()
})
// instructions
instructionsArea.addEventListener('input', (e) => {
    thisRecipe.instructions = e.target.value
    saveRecipes()
})

// Renderowanie edit page
const RenderIngredients = () => {
    addedIngredients.innerHTML = ''
    thisRecipe.ingredients.forEach((ingredient) => {
        const containerEl = document.createElement('div')
        const IngredientEl = document.createElement('label')
        const checkbox = document.createElement('input')
        checkbox.setAttribute('type', 'checkbox')
        checkbox.checked = ingredient.doWeHave
        const p = document.createElement('p')
        p.innerHTML = ingredient.title
        const removeBut = document.createElement('button')
        removeBut.innerHTML = 'remove'

        containerEl.setAttribute('class', 'every-ingredient-container')
        checkbox.setAttribute('class', 'every-checkbox')
        p.setAttribute('class', 'text-p')
        removeBut.setAttribute('class', 'remove-button')
        IngredientEl.setAttribute('class', 'label')

        checkbox.addEventListener('change', (e) => {
            ingredient.doWeHave = e.target.checked
            saveRecipes()
        })

        removeBut.addEventListener('click', (e) => {
            const index = thisRecipe.ingredients.findIndex((DelIngredient) => {
                return DelIngredient.title === ingredient.title && ingredient.doWeHave === DelIngredient.doWeHave
            })

            thisRecipe.ingredients.splice(index, 1)
            saveRecipes()
            RenderIngredients()
        })

        IngredientEl.appendChild(checkbox)
        IngredientEl.appendChild(p)
        containerEl.appendChild(IngredientEl)
        containerEl.appendChild(removeBut)
        addedIngredients.appendChild(containerEl)
    });
}

// Ładuje edit page
const loadEditPage = () => {
    titleInput.value = thisRecipe.title
    instructionsArea.innerHTML = thisRecipe.instructions
    RenderIngredients()
}

// Event dodania składnika
submit.addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.text.value.trim()

    if (text) {
        thisRecipe.ingredients.push({
            title: text,
            doWeHave: false
        })
        saveRecipes()
        RenderIngredients()
        e.target.elements.text.value = ''
    }
})

loadEditPage()