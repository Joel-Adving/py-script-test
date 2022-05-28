// const artistinfoURL = 'https://musicbrainz.org/ws/2/artist/5b11f4ce-a62d-471e-81fc-a69a8278c7da?fmt=json&limit=1'
const baseURL = 'https://musicbrainz.org/ws/2/artist/'

const url =
    'https://musicbrainz.org/ws/2/url/?query=https://open.spotify.com/artist/26dSoYclwsYLMAKD3tpOr4&fmt=json&limit=1'

const inputELement = document.querySelector('#input')
const button = document.querySelector('#button')

async function fetchData(url) {
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    return data
}
button.addEventListener('click', async () => {
    const data = await fetchData(baseURL + inputELement.value + '?fmt=json&limit=1')
    renderData(data)
})

function renderData(data) {
    const markup = `
    <div>${data.country} </div>
    <div>${data.name} </div>
    <div>${data.type} </div>
    <div>${data.country} </div>
    <div>${data.country} </div>
    <div>${data.country} </div>
    `
    const element = document.querySelector('.responseData')
    element.insertAdjacentHTML('afterbegin', markup)
}

// const data = await fetchData(artistinfoURL)
// renderData(data)
