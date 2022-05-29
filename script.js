const API_URL = 'https://musicbrainz.org/ws/2'

const inputELement = document.querySelector('#input')
const buttonElement = document.querySelector('#button')
const responseDataElement = document.querySelector('.response-data')

async function fetchData(url) {
    try {
        const res = await fetch(url)
        const data = await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

function renderData(data) {
    responseDataElement.innerHTML = ''
    if (data.error)
        return responseDataElement.insertAdjacentText('afterbegin', data.error)

    const markup = `
    <p>Name: <strong>${data.name}</strong></p>
    <p>Type:  <strong>${data.type}</strong></p>
    <p>Disambiguation: <strong>${data.disambiguation}</strong></p>
    <p>Country:  <strong>${data.area.name}</strong></p>
    <p>Life span: From <strong>${data['life-span'].begin}</strong> to <strong>${data['life-span'].end}</strong></p>
    `
    responseDataElement.insertAdjacentHTML('afterbegin', markup)
    inputELement.value = ''
}

async function handleClick() {
    const q = inputELement.value.trim()
    if (!q) return
    const data = await fetchData(`${API_URL}/artist/${q}?fmt=json&limit=1`)
    renderData(data)
}

buttonElement.addEventListener('click', handleClick)
