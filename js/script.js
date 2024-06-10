document.addEventListener('DOMContentLoaded', function() {
    // Função para o menu de hambúrguer
    function initHamburgerMenu() {
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const navbar = document.getElementById('navbar');

        hamburgerMenu.addEventListener('click', function() {
            navbar.classList.toggle('show');
        });

        // Fechar o menu ao clicar fora dele
        document.addEventListener('click', function(event) {
            if (!navbar.contains(event.target) && !hamburgerMenu.contains(event.target)) {
                navbar.classList.remove('show');
            }
        });

        // Adiciona evento de clique aos itens do menu
        const navItems = document.querySelectorAll('.navbar li');
        navItems.forEach(function(item) {
            item.addEventListener('click', function() {
                const link = item.querySelector('a');
                if (link) {
                    window.location.href = link.href;
                }
            });
        });
    }

    // Função para o carrossel de eventos
    function initCarousel() {
        let currentSlide = 0;
        const slides = document.querySelectorAll('.carousel-item');
        const totalSlides = slides.length;

        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.style.display = i === index ? 'block' : 'none';
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % totalSlides;
            showSlide(currentSlide);
        }

        function previousSlide() {
            currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
            showSlide(currentSlide);
        }

        // Automatic slide change
        let slideInterval = setInterval(nextSlide, 7000); // Change every 7 seconds

        // Touch events for swipe navigation
        let startX = 0;
        let endX = 0;

        document.querySelector('.carousel').addEventListener('touchstart', function(e) {
            startX = e.touches[0].clientX;
        });

        document.querySelector('.carousel').addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].clientX;
            if (startX > endX + 50) {
                nextSlide();
            } else if (startX < endX - 50) {
                previousSlide();
            }
        });

        // Button events for navigation
        document.getElementById('next-slide').addEventListener('click', nextSlide);
        document.getElementById('prev-slide').addEventListener('click', previousSlide);

        // Initialize the first slide
        showSlide(currentSlide);
    }

    // Função para a página "Mariano" e "Divina Misericórdia"
    function initMarianoDivina() {
        const marianoBox = document.getElementById('mariano');
        const divinaMisericordiaBox = document.getElementById('divina-misericordia');
        const marianoOptions = document.getElementById('mariano-options');
        const marianoContent = document.getElementById('mariano-content');
        const divinaMisericordiaContent = document.getElementById('divina-misericordia-content');

        const gozosos = document.getElementById('gozosos');
        const luminosos = document.getElementById('luminosos');
        const dolorosos = document.getElementById('dolorosos');
        const gloriosos = document.getElementById('gloriosos');
        const selectedMystery = document.getElementById('selected-mystery');

        const mysteries = {
            gozosos: [
                "A Anunciação do Anjo a Maria",
                "A Visitação de Maria a Isabel",
                "O Nascimento de Jesus",
                "A Apresentação de Jesus no Templo",
                "O Encontro de Jesus no Templo"
            ],
            luminosos: [
                "O Batismo de Jesus no Rio Jordão",
                "A Auto-revelação de Jesus nas Bodas de Caná",
                "O Anúncio do Reino de Deus",
                "A Transfiguração de Jesus",
                "A Instituição da Eucaristia"
            ],
            dolorosos: [
                "A Agonia de Jesus no Jardim das Oliveiras",
                "A Flagelação de Jesus",
                "A Coroação de Espinhos",
                "A Subida de Jesus ao Calvário carregando a Cruz",
                "A Crucificação e Morte de Jesus"
            ],
            gloriosos: [
                "A Ressurreição de Jesus",
                "A Ascensão de Jesus ao Céu",
                "A Descida do Espírito Santo sobre os Apóstolos",
                "A Assunção de Maria ao Céu",
                "A Coroação de Maria como Rainha do Céu e da Terra"
            ]
        };

        marianoBox.addEventListener('click', function() {
            marianoOptions.classList.remove('hidden');
            marianoContent.classList.add('hidden');
            divinaMisericordiaContent.classList.add('hidden');
        });

        divinaMisericordiaBox.addEventListener('click', function() {
            divinaMisericordiaContent.classList.remove('hidden');
            marianoOptions.classList.add('hidden');
            marianoContent.classList.add('hidden');
        });

        function displayMysteries(type) {
            selectedMystery.innerHTML = mysteries[type].map(mystery => `<li>${mystery}</li>`).join('');
            marianoContent.classList.remove('hidden');
            marianoOptions.classList.add('hidden');
        }

        gozosos.addEventListener('click', function() {
            displayMysteries('gozosos');
        });

        luminosos.addEventListener('click', function() {
            displayMysteries('luminosos');
        });

        dolorosos.addEventListener('click', function() {
            displayMysteries('dolorosos');
        });

        gloriosos.addEventListener('click', function() {
            displayMysteries('gloriosos');
        });
    }

    // Função para a página "Novenas"
    function initNovenas() {
        const searchBar = document.getElementById('search-bar');
        const novenaList = document.getElementById('novena-list');
        const novenaDetail = document.getElementById('novena-detail');
        const novenaTitle = document.getElementById('novena-title');
        const novenaContentElement = document.getElementById('novena-content');
        const pagination = document.querySelector('.pagination');

        const novenas = []; // Popule com os dados das novenas
        const itemsPerPage = 10;
        let currentPage = 1;

        function populateNovenas() {
            novenaList.innerHTML = '';
            const startIndex = (currentPage - 1) * itemsPerPage;
            const endIndex = startIndex + itemsPerPage;
            const currentNovenas = novenas.slice(startIndex, endIndex);

            currentNovenas.forEach(novena => {
                const container = document.createElement('div');
                container.classList.add('novena-container');
                container.innerHTML = `
                    <img src="${novena.image}" alt="${novena.name}">
                    <div class="novena-info">
                        <h3>${novena.name} - ${novena.day}</h3>
                        <p>${novena.quote}</p>
                        <p>${novena.reason}</p>
                        <button>Rezar Novena</button>
                    </div>
                `;
                container.addEventListener('click', () => {
                    showNovenaDetail(novena);
                });
                novenaList.appendChild(container);
            });
        }

        function showNovenaDetail(novena) {
            novenaDetail.classList.remove('hidden');
            novenaTitle.textContent = novena.name;
            novenaContentElement.innerHTML = `
                <h3>Novena de ${novena.name}</h3>
                ${novena.detail}
            `;
            const previousDetail = document.querySelector('.novena-container.active');
            if (previousDetail) {
                previousDetail.classList.remove('active');
            }
            const selectedContainer = document.querySelector(`img[src="${novena.image}"]`).parentElement;
            selectedContainer.classList.add('active');
        }

        function createPagination() {
            pagination.innerHTML = '';
            const pageCount = Math.ceil(novenas.length / itemsPerPage);

            for (let i = 1; i <= pageCount; i++) {
                const button = document.createElement('button');
                button.textContent = i;
                button.addEventListener('click', () => {
                    currentPage = i;
                    populateNovenas();
                    updatePagination();
                });
                pagination.appendChild(button);
            }
        }

        function updatePagination() {
            const buttons = pagination.querySelectorAll('button');
            buttons.forEach(button => {
                button.classList.remove('active');
                if (parseInt(button.textContent) === currentPage) {
                    button.classList.add('active');
                }
            });
        }

        searchBar.addEventListener('input', function() {
            const searchTerm = searchBar.value.toLowerCase();
            const filteredNovenas = novenas.filter(novena => novena.name.toLowerCase().includes(searchTerm));
            novenaList.innerHTML = '';
            filteredNovenas.forEach(novena => {
                const container = document.createElement('div');
                container.classList.add('novena-container');
                container.innerHTML = `
                    <img src="${novena.image}" alt="${novena.name}">
                    <div class="novena-info">
                        <h3>${novena.name} - ${novena.day}</h3>
                        <p>${novena.quote}</p>
                        <p>${novena.reason}</p>
                        <button>Rezar Novena</button>
                    </div>
                `;
                container.addEventListener('click', () => {
                    showNovenaDetail(novena);
                });
                novenaList.appendChild(container);
            });
        });

        // Inicializa a página
        populateNovenas();
        createPagination();
        updatePagination();
    }

    // Função para a página "Santo de Devoção"
    function initSaintDraw() {
        const drawButton = document.getElementById('draw-saint');
        const saintCard = document.getElementById('saint-card');
        const saintImage = document.getElementById('saint-image');
        const saintName = document.getElementById('saint-name');
        const saintDay = document.getElementById('saint-day');
        const saintQuote = document.getElementById('saint-quote');
        const saintInfo = document.getElementById('saint-info');

        const saints = [
            {
                image: 'imagens/sf.jpg',
                name: 'São Francisco de Assis',
                day: '4 de Outubro',
                quote: 'Senhor, fazei-me instrumento de vossa paz.',
                info: 'São Francisco de Assis foi o fundador da Ordem dos Frades Menores e é conhecido por seu amor pela natureza e pelos pobres.'
            },
            {
                image: 'images/santo2.jpg',
                name: 'Santa Teresa de Calcutá',
                day: '5 de Setembro',
                quote: 'A paz começa com um sorriso.',
                info: 'Santa Teresa de Calcutá, conhecida como Madre Teresa, dedicou sua vida a ajudar os pobres e doentes em Calcutá, Índia.'
            },
            // Adicione mais santos aqui
        ];

        drawButton.addEventListener('click', function() {
            saintCard.classList.add('hidden');
            drawButton.disabled = true;
            let iterations = 0;
            const interval = setInterval(() => {
                const randomIndex = Math.floor(Math.random() * saints.length);
                const saint = saints[randomIndex];
                saintImage.src = saint.image;
                saintName.textContent = saint.name;
                saintDay.textContent = saint.day;
                saintQuote.textContent = saint.quote;
                saintInfo.textContent = saint.info;
                iterations++;
                if (iterations > 30) {
                    clearInterval(interval);
                    saintCard.classList.remove('hidden');
                    drawButton.disabled = false;
                }
            }, 100);
        });
    }

    // Inicializa as funções específicas conforme a página
    initHamburgerMenu();

    if (document.querySelector('.carousel')) {
        initCarousel();
    }

    if (document.getElementById('mariano') || document.getElementById('divina-misericordia')) {
        initMarianoDivina();
    }

    if (document.getElementById('search-bar')) {
        initNovenas();
    }

    if (document.getElementById('draw-saint')) {
        initSaintDraw();
    }
});
