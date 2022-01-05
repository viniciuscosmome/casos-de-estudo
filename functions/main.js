let getAllSelectButtons = document.querySelectorAll('.select')
let getDisplayPreview = document.querySelector('[data-preview]')
let getIframe = document.querySelector('.iframe')
let getEntryButton = document.querySelector('.entry')

function changePreview(el) {
    let reference = el.getAttribute('data-href')

    getDisplayPreview.setAttribute('data-preview', `DESAFIO ${reference}`)
    getIframe.setAttribute('src', `desafios/desafio_${reference}`)
    getEntryButton.setAttribute('href', `desafios/desafio_${reference}`)
}

if (!!getAllSelectButtons && getAllSelectButtons.length > 0) {

    getAllSelectButtons.forEach(function(element) {
        element.addEventListener('click', function() {
            changePreview(element)
        })
    })

}