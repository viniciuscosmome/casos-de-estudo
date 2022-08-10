const _id = (id) => document.getElementById(id);
const _element = (tag) => document.createElement(tag);

function mostrar_menu() {
    _id('header').classList.toggle('show');
}

function adicionar_eventos() {
    _id('menu').addEventListener('click', mostrar_menu);
}

adicionar_eventos();