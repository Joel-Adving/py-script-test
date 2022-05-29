const API_URL = 'https://musicbrainz.org/ws/2'
// 5b11f4ce-a62d-471e-81fc-a69a8278c7da

const inputELement = document.querySelector('#input')
const button = document.querySelector('#button')
const displayDataElement = document.querySelector('.display-data')

async function fetchData(url) {
    try {
        const res = await fetch(url)
        const data = await res.json()
        return data
    } catch (error) {
        console.log(error)
    }
}

function renderData(data) {
    displayDataElement.innerHTML = ''
    if (data.error)
        return displayDataElement.insertAdjacentText('afterbegin', data.error)

    const markup = `
    <p>Name: <strong>${data.name}</strong></p>
    <p>type:  <strong>${data.type}</strong></p>
    <p>Disambiguation: <strong>${data.disambiguation}</strong></p>
    <p>Country:  <strong>${data.area.name}</strong></p>
    <p>Life span: From <strong>${data['life-span'].begin}</strong> to <strong>${data['life-span'].end}</strong></p>
    `
    displayDataElement.insertAdjacentHTML('afterbegin', markup)
    inputELement.value = ''
}

async function handleClick() {
    const q = inputELement.value.trim()
    if (!q) return
    const data = await fetchData(`${API_URL}/artist/${q}?fmt=json&limit=1`)
    console.log(data)
    renderData(data)
}

button.addEventListener('click', handleClick)
