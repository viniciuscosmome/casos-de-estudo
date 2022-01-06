function checkURL() {
    let params = (new URL(document.location)).searchParams
    let reference = params.get("ref").replace(/[^a-z]/gi, '')

    if (reference === 'mdl')
        document.querySelector('.return-to-home').remove()
}

window.addEventListener('load', checkURL)