const project_list = [
    {
        title: 'Blog Codelândia',
        image_name: 'blog_codelandia',
        project_folder: 'blog_codelandia'
    },
    {
        title: 'Notícias Naped',
        image_name: 'noticias_naped',
        project_folder: 'noticias_naped'
    }
];

const _gid = (id) => document.getElementById(id);
const _celement = (tag) => document.createElement(tag);

function render_cards({
    title,
    image_name,
    project_folder
}) {
    let card = _celement('a');
    let img = _celement('img');
    let div_description = _celement('div');
    let div_title = _celement('div');

    card.className = 'card';
    card.href = `https://viniciuscosmome.github.io/casos-de-estudo/learning/${project_folder}`;

    img.className = 'studycase-image';
    img.src = `assets/images/${image_name}.png`;
    img.alt = `Caso de estudo - ${title}`;
    img.setAttribute('loading', 'lazy');

    div_description.className = 'description';

    div_title.className = 'title';
    div_title.innerText = title;

    div_description.appendChild(div_title);

    card.appendChild(img);
    card.appendChild(div_description);

    _gid('main').prepend(card);
}

window.addEventListener('DOMContentLoaded', function() {
    project_list.forEach(render_cards);
});