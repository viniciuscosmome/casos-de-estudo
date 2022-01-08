function checkURL() {
    let params = (new URL(document.location)).searchParams.get("ref")
    let reference = params ? params.replace(/[^a-z]/gi, '') : ''

    if (!!reference && reference === 'mdl')
        document.querySelector('.return-to-home').remove()
}

window.addEventListener('load', checkURL)