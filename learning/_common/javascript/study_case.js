function __study_case_files() {
    let params;

    if (URLSearchParams && window.location) {
        let a = new URLSearchParams(window.location.search);
        params = Object.fromEntries(a.entries());
    }

    (void 0 === params || 'true' !== params.hidden_info) &&
        (function () {
            const { color, title, description, design } = studycase_config;

            let style = document.createElement('link');
            style.setAttribute('rel', 'stylesheet');
            style.href = '../_common/css/study_case.css';

            const html = `<!-- Code injected by study-case -->
                <aside id="___studycase" class="___studycase" data-css-studycase="${color}">
                    <span class="___studycase_title">
                        <span class="___studycase_title_text">
                            Caso de estudo
                        </span>
                        <i class="bi bi-info-circle-fill ___studycase_title_icon"></i>
                    </span>

                    <div class="___studycase_content">
                        <hr class="___studycase_hr"/>

                        <h5 class="___studycase_content_title">
                            ${title}
                        </h5>

                        <p class="___studycase_content_paragraph">
                            ${description}
                        </p>

                        <p class="___studycase_content_paragraph">
                            Você pode encontrar o código por trás deste e de outros templates de estudo no meu repositório GitHub. Espero que goste.

                            <a href="https://github.com/viniciuscosmome/casos-de-estudo/" target="_self" class="___studycase_content_link">
                                <i class="bi bi-github ___studycase_content_icon"></i> viniciuscosmome
                            </a>
                        </p>

                        <p class="___studycase_content_paragraph">
                            Me sigua nas redes:

                            <a target="_blank" rel="noreferrer" class="___studycase_content_link" href="https://www.instagram.com/viniciuscosmo.me/">
                                <i class="bi bi-instagram ___studycase_content_icon"></i> viniciuscosmo.me
                            </a>
                            <a target="_blank" rel="noreferrer" class="___studycase_content_link" href="https://www.linkedin.com/in/vinicius-cosmo-me">
                                <i class="bi bi-linkedin ___studycase_content_icon"></i> Vinicius Cosmo
                            </a>
                        </p>

                        <hr class="___studycase_hr"/>

                        <h5 class="___studycase_content_title">
                            Créditos
                        </h5>

                        <p class="___studycase_content_paragraph">
                            Design do tema por 
                            <a href="${design.link_to}" target="_blank" rel="noreferrer" class="___studycase_content_inline_link">
                                ${design.profile}
                            </a>
                        </p>
                    </div>
                </aside>`;

            document.head.appendChild(style);
            document.body.innerHTML += html;

            let card = document.getElementById('___studycase');
            card.addEventListener('click', () => {
                card.classList.toggle('___was_opened');
            });
        })();
}

addEventListener('DOMContentLoaded', __study_case_files);
