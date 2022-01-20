const initStyle = function() {
    let selectList = document.querySelector('.select-list')

    selectList.addEventListener('click', function() {
        selectList.classList.toggle('show')
    })
}

window.addEventListener('load', initStyle)