const k = '6xSBp2dl-wTwCCahATxXFrnCunp49eDXjuAbArpKK_4'

let page = 1
let likeFlag = false
async function fetchPhotos() {
    try {
        const response = await fetch(`https://api.unsplash.com/photos/random?client_id=${k}`)     
        // const response = await fetch('https://api.thecatapi.com/v1/images/search')
        const photo = await response.json();
        console.log(photo)
        return photo
    } catch (error) {
        console.error('Ошиюка', error)
    }
}
const img = document.querySelector('.container__img')
const photographer = document.querySelector('.photographer')
const likes = document.querySelector('.like-count')
const likeButton = document.querySelector('.like-btn')
async function main() {
    const photo = await fetchPhotos();
    img.src = photo.urls.full
    img.alt = photo.alt_description
    photographer.textContent = photo.user.first_name
    likes.textContent = photo.likes ? photo.likes : 0
    likeButton.addEventListener('click', (e) => {
        addLike(e)
    })
}

function addLike(e) {
    // const button = e.target;
    if (!likeFlag) {
        // button.disabled = true
        likes.textContent = +likes.textContent + 1
        likeFlag = true
        return
    }
    likes.textContent = +likes.textContent - 1
    likeFlag = false
}
main()