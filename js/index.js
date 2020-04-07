document.addEventListener('DOMContentLoaded', () => {

    fetchMonsters()
    monsterForm()
    buttonFunctions()

})

const monsterContainer = document.getElementById('monster-container')
const createMonsterDiv = document.getElementById('create-monster')
let currentPage = 1
const nextPageBtn = document.getElementById('forward')
const backPageBtn = document.getElementById('back')

const fetchMonsters = () => {
    fetch(`http://localhost:3000/monsters/?_limit=10&_page=${currentPage}`)
    .then(res => res.json())
    .then(monsters => monsters.forEach(monster => {
        renderMonsters(monster)
    }))
}

// renders each monster to the page
const renderMonsters = monster => {
    const monsterDiv = document.createElement('div')
    const monsterName = document.createElement('h2')
    const monsterAge = document.createElement('h4')
    const monsterDescription = document.createElement('p')

    monsterName.innerText = monster.name
    monsterAge.innerText = monster.age
    monsterDescription.innerText = monster.description
    
    monsterDiv.append(monsterName, monsterAge, monsterDescription)
    monsterContainer.appendChild(monsterDiv)
    
}

const monsterForm = () => {
    const monsterFormField = document.createElement('form')
    const createMonsterBtn = document.createElement('button')
    const monsterNameInput = document.createElement('input')
    const monsterAgeInput = document.createElement('input')
    const monsterDescriptionInput = document.createElement('input')
    

    monsterNameInput.id = "name"
    monsterNameInput.placeholder = "name..."

    monsterAgeInput.id = "age"
    monsterAgeInput.placeholder = "age..."

    monsterDescriptionInput.id = "description"
    monsterDescriptionInput.placeholder = "description..."

    createMonsterBtn.innerText = "create monster"

    
    monsterFormField.append(monsterNameInput, monsterAgeInput, monsterDescriptionInput, createMonsterBtn)
    createMonsterDiv.appendChild(monsterFormField)

    monsterFormField.addEventListener('submit', e => {
        e.preventDefault()
        fetch("http://localhost:3000/monsters", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: e.target.name.value,
                age: e.target.age.value,
                description: e.target.description.value

            })
        })
        .then(res => res.json())
        .then(res => renderMonsters(res))
        e.target.reset()
    })

    
}



//add event listener to nextpage button
//find a way of incrementing the currentpage variable
//removing current set of monsters
//load next set of monsters
//append next step
const buttonFunctions = () => {
    nextPageBtn.addEventListener('click', () => {
        currentPage++
        // monsterContainer.innerHTML = ""
        while (monsterContainer.firstChild) {
            monsterContainer.firstChild.remove()
        }
        fetchMonsters()
    })
    
    backPageBtn.addEventListener('click', () => {
        currentPage--
        // monsterContainer.innerHTML = ""
        while (monsterContainer.firstChild) {
            monsterContainer.firstChild.remove()
        }
        fetchMonsters()
    })
}

