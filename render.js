// Renderowanie przepisów
const renderRecipes = (array) => {
    const containerEl = document.getElementById('recipes')
    containerEl.innerHTML = ''

    array.forEach((recipe) => {
        const recipeEl = document.createElement('a')
        // recipeEl.setAttribute('herf', `/edit.html#${recipe.id}`)
        const titleEl = document.createElement('p')
        const summaryEl = document.createElement('p')

        recipeEl.setAttribute('class', 'every-single-recipe')
        titleEl.setAttribute('class', 'name')

        // Przypisanie nazwy przepisu
        if (recipe.title.length > 0) {
            titleEl.textContent = recipe.title
        } else {
            titleEl.textContent = 'unnamed'
        }
        recipeEl.appendChild(titleEl)

        if (recipe.ingredients.length === 0) {
            summaryEl.textContent = 'Set your ingredients'
        }

        // Przypisanie każdemu przepisowi informacji o ilości posiadanych składników do realizacji przepisu
        let countTrue = 0
        recipe.ingredients.forEach((ingredient) => {
            if (ingredient.doWeHave === true) {
                countTrue++
            }

            const half = (recipe.ingredients.length / 2)
            const m = 'You have'
            const m2 = 'the ingredients'
            if (countTrue === recipe.ingredients.length) {
                summaryEl.textContent = `${m} all ${m2}`
            } else if (countTrue === 0) {
                summaryEl.textContent = `${m} none ${m2}`
            } else if (countTrue === half) {
                summaryEl.textContent = `${m} half of ${m2}`
            } else if (countTrue > half) {
                summaryEl.textContent = `${m} almost all ${m2}`
            } else if (countTrue < half) {
                summaryEl.textContent = `${m} some ingredients`
            } else {
                throw new Error('Something went wrong with rendering recipes')
            }
        })
        recipeEl.appendChild(summaryEl)
        containerEl.appendChild(recipeEl)

        // Dodanie do każdego przepisu Eventu do przekierowania do edytowania po kliknięciu
        recipeEl.addEventListener('click', () => {
            location.assign(`/edit.html#${recipe.id}`)
        })
    })
}