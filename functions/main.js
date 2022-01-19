let getAllSelectButtons = document.querySelectorAll('.select')
let getIframe = document.querySelector('.iframe')
let getEntryButton = document.querySelector('.entry')

function changePreview() {
    let reference = this.getAttribute('data-href')

    getIframe.setAttribute('src', `desafios/iuricode/desafio_${reference}`)
    getEntryButton.setAttribute('href', `desafios/iuricode/desafio_${reference}`)

    changeButtonActive(this)
}

function changeButtonActive(currentButton) {
    getAllSelectButtons.forEach(function (el) {
        el.classList.remove('active')
    })

    currentButton.classList.add('active')
}

if (!!getAllSelectButtons && getAllSelectButtons.length > 0) {

    getAllSelectButtons.forEach(function(element) {
        element.addEventListener('click', changePreview)
    })

}