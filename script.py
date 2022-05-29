from pyodide.http import pyfetch
import asyncio
import pyodide
import sys 

inputElement = document.querySelector('#input')
buttonElement = document.querySelector('#button')
artistInfoElement = document.querySelector('.artist-info')

async def fetch(url):
    response = await pyfetch(url=url, method="GET")
    data = await response.json()
    return data

async def get_artist(e):
    artistInfoElement.innerHTML = ""
    spotify_uri = inputElement.value

    error_msg = "Please enter a valid URI like the example above."
    if not "artist:" in spotify_uri or inputElement.value == "":
        return artistInfoElement.insertAdjacentHTML('afterbegin', error_msg)

    spotify_url = 'https://open.spotify.com/artist/' + spotify_uri.split("artist:")[1]
    query_for_mbid = "https://musicbrainz.org/ws/2/url/?query=" + spotify_url + "&fmt=json&limit=1"

    mb_data = await fetch(query_for_mbid)
    mbid = mb_data['urls'][0]['relation-list'][0]['relations'][0]['artist']['id']

    query_artist = "https://musicbrainz.org/ws/2/artist/" + mbid + "?inc=url-rels+aliases+genres&fmt=json&limit=1"
    artist_data = await fetch(query_artist)

    if artist_data["name"] == "Frederick Westcott":
        return artistInfoElement.insertAdjacentHTML('afterbegin', "Artist not found")

    artist_alias = []
    artist_genre = []
    artist_resource = []

    for i in artist_data['aliases']:
        alias = i['name']
        artist_alias.append(alias)
  
    for i in artist_data['genres']:
        genre = i['name']
        artist_genre.append(genre)
   
    for i in artist_data['relations']:
        url = i['url']
        artist_resource.append(url['resource'])

    markup = []
    markup.append('<p>Name: <strong> %s </strong> </p>' % artist_data['name'])
    markup.append('<p>Disambiguation: <strong> %s </strong> </p>' % artist_data['disambiguation'])
    markup.append('<p>Type: <strong> %s </strong> </p>' % artist_data['type'])
    markup.append('<p>Country: <strong> %s </strong> </p>' % artist_data['country'])
    markup.append('<p>Gender: <strong> %s </strong> </p>' % artist_data['gender'])
    markup.append('<p>ISNI: <strong> %s </strong> </p>' % artist_data['isnis'][0])
    markup.append('<p>IPI: <strong> %s </strong> </p>' % artist_data['ipis'][0])
    markup.append('<p>Alias: <strong> %s </strong> </p>' % ', '.join(artist_alias))
    markup.append('<p>Genres: <strong> %s </strong> </p>' % ', '.join(artist_genre))
    markup.append('<p>Spotify URI: <strong> %s </strong> </p>' % spotify_uri)
    markup.append('<p>MusicBrainz ID: <strong> %s </strong> </p>' % mbid)
    markup.append('<p> <strong> Artist Resource List: </strong> <br> %s </p>' % '<br>'.join(artist_resource))
   
    artistInfoElement.insertAdjacentHTML('afterbegin', ' '.join(markup))
    inputElement.value = ""

def main():
    buttonElement.addEventListener('click', pyodide.create_proxy(get_artist))

main()


