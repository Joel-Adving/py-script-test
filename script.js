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
    if (data.error) return displayDataElement.insertAdjacentText('afterbegin', data.error)

    const markup = `
    <p>Country: ${data.area.name}</p>
    <p>type: ${data.type}</p>
    <p>Name: ${data.name}</p>
    <p>Disambiguation: ${data.disambiguation}</p>
    <p>Disambiguation: ${data['life-span'].begin} - ${data['life-span'].end}</p>
    `
    displayDataElement.insertAdjacentHTML('afterbegin', markup)
}

async function handleClick() {
    const q = inputELement.value
    if (!q) return
    const data = await fetchData(`${API_URL}/artist/${q}?fmt=json&limit=1`)
    console.log(data)
    renderData(data)
}

button.addEventListener('click', handleClick)
