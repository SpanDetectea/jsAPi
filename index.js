const dataJson = `{
    "classes": [
            {
        "id": 1,
        "name": "Йога",
        "time": "10:00 - 11:00",
        "max_participants": 15,
        "current_participants": 10
    },
    {
        "id": 2,
        "name": "Пилатес",
        "time": "14:00 - 15:00",
        "max_participants": 20,
        "current_participants": 18
    }
    ]
}`
const data = JSON.parse(dataJson).classes

function createClasses(classe) {
    const wrapper = document.createElement('div')
    const title = document.createElement('h3')
    const time = document.createElement('p')
    const maxPeople = document.createElement('p')
    const currentPeople = document.createElement('p')
    const signUp = document.createElement('button')

    title.textContent = classe.name
    time.textContent = classe.time
    maxPeople.textContent = `Максимальное количество участников: ${classe.max_participants}`
    currentPeople.textContent = `Текущего количество участников: ${classe.current_participants}`
    currentPeople.classList.add('current-people')
    signUp.textContent = 'Записаться'
    signUp.classList.add('sign-up')
    signUp.classList.add('btn')
    signUp.classList.add('btn-primary')
    signUp.disabled = classe.max_participants == classe.current_participants ? true : false
    signUp.addEventListener('click', () => record(classe.id))
    wrapper.classList.add('wrapper')
    wrapper.appendChild(title)
    wrapper.appendChild(time)
    wrapper.appendChild(maxPeople)
    wrapper.appendChild(currentPeople)
    wrapper.appendChild(signUp)
    return wrapper
}

function displayClasses() {
    const content = document.querySelector('.content')
    content.textContent = ''
    // content.innerHTML = ''
    data.forEach(element => content.appendChild(createClasses(element)))
}

function update(wrapper, index) {
    const buttonSignUp = wrapper.querySelector('.sign-up')
    const curPeople = wrapper.querySelector('.current-people')
    curPeople.textContent = `Текущего количество участников: ${data[index].current_participants}`

}

function record(id) {
    const indexClasse = data.findIndex(classe => classe.id === id)
    const closeButton = document.createElement('button')
    const wrappers = document.querySelectorAll('.wrapper')

    closeButton.textContent = 'Отменить Запись'
    closeButton.classList.add('close')
    closeButton.classList.add('btn')
    closeButton.classList.add('btn-danger')
    closeButton.addEventListener('click', () => close(wrappers[indexClasse], indexClasse))

    data[indexClasse].current_participants++

    wrappers[indexClasse].appendChild(closeButton)
    wrappers[indexClasse].querySelector('.sign-up').disabled = true

    update(wrappers[indexClasse], indexClasse)
}

function close(wrapper, indexClasse) {
    data[indexClasse].current_participants--
    wrapper.querySelector('.sign-up').disabled = false
   const buttonCLose = wrapper.querySelector('.close')
   wrapper.removeChild(buttonCLose)
   update(wrapper, indexClasse)
}

displayClasses()