const _content = [
    {
        post_id: 'post_1',
        date: '02 de jul, 2021',
        title: 'Agora é oficial: o Windows 11 está vindo',
        short_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat impedit debitis quasi veniam voluptatum nobis, fuga possimus sit.'
    },
    {
        post_id: 'post_2',
        date: '02 de jul, 2021',
        title: 'Tim Berners-Lee vai leiloar código-fonte da web',
        short_description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto odit natus dolore sint rerum eum dignissimos expedita est eius provident quos dolorem sequi neque quae officiis aperiam, labore eaque quo.'
    },
    {
        post_id: 'post_3',
        date: '02 de jul, 2021',
        title: 'Tem Firefox novo no pedaço e você vai querer migrar',
        short_description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat corrupti quod dolores velit atque voluptates dolorem, tempora saepe ab iusto commodi! Similique quas odio ipsam provident a iusto eaque tenetur!'
    },
    {
        post_id: 'post_4',
        date: '02 de jul, 2021',
        title: 'John McAfee, criador do antivírus McAfee, morre',
        short_description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic at, ad obcaecati odit sed harum deserunt ipsam recusandae vero ratione corporis doloremque quam expedita molestiae, nostrum, facere aut impedit maiores.'
    }
];

const _id = (id) => document.getElementById(id);
const _element = (tag) => document.createElement(tag);

const post = ({post_id, date, title, short_description}) => {
    let article = _element('article');
    let div_date = _element('div');
    let div_like = _element('div');
    let i_like = _element('i');
    let h3 = _element('h3');
    let p = _element('p');

    article.id = post_id;
    article.classList.add('section');

    div_date.innerText = date;
    div_date.classList.add('date');

    div_like.classList.add('like');
    i_like.classList.add('bi');
    i_like.classList.add('bi-heart');

    h3.innerText = title;
    h3.classList.add('title');

    p.innerText = short_description;
    p.classList.add('paragraph');

    div_like.appendChild(i_like);

    article.appendChild(div_date);
    article.appendChild(div_like);
    article.appendChild(h3);
    article.appendChild(p);

    _id('main')?.appendChild(article);
};

_content.forEach(post);
