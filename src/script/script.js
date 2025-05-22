$(document).ready(function () {
    new WOW({
        animateClass: 'animate__animated',
    }).init();
    const header = $('.header');
    const windowScrollTop = $('#scroll-top');
    $(window).scroll(function () {
        $(window).scrollTop() > 0 ? header.css('background', 'rgba(7, 0, 21)') : header.css('background', 'none');
        $(window).scrollTop() > 0 ? windowScrollTop.css('opacity', '1') : windowScrollTop.css('opacity', '0');
    });

    $(document).on('click', '#main-button, .footer-button', function (e) {
        e.preventDefault();
        $('.form')[0].scrollIntoView({behavior: 'smooth'});
    });

    windowScrollTop.click(() => {
        $('.main')[0].scrollIntoView({behavior: 'smooth'});
    });

    const promotionsSlider = $('#promotions-slider');
    const gallerySlider = $('#gallery-slider');
    const staffSlider = $('.slider');
    staffSlider.slick({
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        adaptiveHeight: true,
        prevArrow: $('.prev'),
        nextArrow: $('.next'),
        variableWidth: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }, {
                breakpoint: 375,
                settings: {
                    arrows: false,
                    dots: false,
                    slidesToScroll: 1,
                    slidesToShow: 1,
                }
            }, {
                breakpoint: 320,
                settings: {
                    arrows: false,
                    dots: false,
                    slidesToScroll: 1,
                    slidesToShow: 1,
                }
            }

        ]
    });

    const numberPhone = $('#form-input-number');
    Inputmask({
        mask: "+7-(999)-999-99-99",
        showMaskOnHover: false,
        showMaskOnFocus: true,
        clearIncomplete: true
    }).mask(numberPhone);

    const formName = $('#form-input-name');
    const buttonForm = $('#button-form');
    const popup = $('.popup-block');
    const loaderBlock = $('.loader-block');
    const orderSuccess = $('.order-success');
    const blockForm = $('.block-form');

    $('.popup-button').on('click', function () {
        popup.css('display', 'none');
    });

    buttonForm.click(function (e) {
        e.preventDefault();
        const name = formName.val().trim();
        const number = numberPhone.val().trim();
        const errorName = $('#error-name');
        const errorNumber = $('#error-phone');
        let hasError = false;
        $('.error').css('opacity', '0');
        $('.input').css('border', '1px solid rgb(98, 36, 223)');


        if (!name) {
            errorName.css('opacity', '1');
            formName.css('border', '1px solid red');
            hasError = true;
        }

        if (!number || number.length < 15) {
            errorNumber.css('opacity', '1');
            numberPhone.css('border', '1px solid red');
            hasError = true;
        }

        if (!hasError) {
            loaderBlock.css('display', 'flex');

            $.ajax({
                method: 'POST',
                url: 'https://testologia.ru/checkout',
                data: {name: name, phone: number},
            })
                .done(function (response) {
                    loaderBlock.hide();
                    if (response.success) {
                        formName.val('');
                        numberPhone.val('');
                        // Прячем форму с анимацией
                        blockForm.css('opacity', '0');
                        setTimeout(() => {
                            blockForm.hide();

                            // Показываем сообщение об успехе
                            orderSuccess.css({
                                'display': 'flex',
                                'opacity': '0'
                            });
                            setTimeout(() => {

                                orderSuccess.css('opacity', '1');

                                // Через 3 секунды скрываем сообщение
                                setTimeout(() => {
                                    orderSuccess.css('opacity', '0');

                                    // И показываем форму обратно
                                    setTimeout(() => {
                                        orderSuccess.hide();
                                        blockForm.css('opacity', '0').show();
                                        setTimeout(() => {
                                            blockForm.css('opacity', '1');
                                        }, 10);
                                    }, 500); // время анимации исчезновения
                                }, 3000); // время показа сообщения
                            }, 10);
                        }, 500); // время анимации исчезновения формы
                    } else {
                        popup.css('display', 'flex');
                        formName.val('');
                        numberPhone.val('');
                    }
                })
                .fail(function () {
                    popup.css('display', 'flex');
                    loaderBlock.hide();
                    formName.val('');
                    numberPhone.val('');
                });
        }
    });
    const data = `
    {
  "data": [
    {
      "id": 1,
      "title": "Классическая чаша",
      "subtitle": "Табак на выбор (в ассортименте)",
      "paragraph": "Сессия на классической чаше рассчитана на компанию до 3 гостей",
      "price": 750,
      "category": "кальяны",
      "img": "src/assets/product-1.jpeg"
    },
    {
      "id": 2,
      "title": "Кальян на фрукте",
      "subtitle": "Фрукт на выбор: ананас, грейпфрут, гранат.",
      "paragraph": "Максимальная длительность курения кальяна - 90 минут.",
      "price": 1500,
      "category": "кальяны",
      "img": "src/assets/product-2.jpeg"
    },
    {
      "id": 3,
      "title": "Классическая чаша",
      "subtitle": "Используется кальян с подсветкой и премиальный табак",
      "paragraph": "Один перезабив табака и добавки в колбу бесплатно.",
      "price": 2000,
      "category": "кальяны",
      "img": "src/assets/product-3.jpeg"
    },
    {
      "id": 4,
      "title": "Дополнительно",
      "subtitle": "Добавки в колбу на выбор:",
      "paragraph": "-молоко -сок -сиропы -ликер",
      "price": 200,
      "img": "src/assets/product-8.jpeg",
      "category": "кальяны"
    },
    {
      "id": 5,
      "title": "Сырная тарелка",
      "subtitle": "Ассорти из сыров с орехами и виноградом",
      "paragraph": "Идеально для компании из 2-4 человек.",
      "price": 1200,
      "category": "блюда",
      "img": "src/assets/food-1.jpeg"
    },
    {
      "id": 6,
      "title": "Мясное ассорти",
      "subtitle": "Разнообразие мясных деликатесов",
      "paragraph": "Подается с горчицей и хлебом.",
      "price": 1500,
      "category": "блюда",
      "img": "src/assets/food-2.jpeg"
    },
    {
      "id": 7,
      "title": "Оливки и маслины",
      "subtitle": "Ассорти из оливок и маслин",
      "paragraph": "Подается с оливковым маслом и специями.",
      "price": 800,
      "category": "блюда",
      "img": "src/assets/food-3.jpeg"
    },
    {
      "id": 8,
      "title": "Картофель фри",
      "subtitle": "Хрустящий картофель фри",
      "paragraph": "Подается с соусами на выбор.",
      "price": 600,
      "category": "блюда",
      "img": "src/assets/food-4.jpeg"
    },
    {
      "id": 9,
      "title": "Зеленый чай",
      "subtitle": "Свежезаваренный зеленый чай",
      "paragraph": "Подается с лимоном или медом.",
      "price": 300,
      "category": "чай и б/а коктейли",
      "img": "src/assets/drink-1.jpeg"
    },
    {
      "id": 10,
      "title": "Черный чай",
      "subtitle": "Крепкий черный чай",
      "paragraph": "Подается с молоком или сахаром.",
      "price": 300,
      "category": "чай и б/а коктейли",
      "img": "src/assets/drink-2.jpeg"
    },
    {
      "id": 11,
      "title": "Мохито безалкогольный",
      "subtitle": "Освежающий мохито без алкоголя",
      "paragraph": "С лаймом, мятой и льдом.",
      "price": 500,
      "category": "чай и б/а коктейли",
      "img": "src/assets/drink-3.jpeg"
    },
    {
      "id": 12,
      "title": "Лимонад",
      "subtitle": "Домашний лимонад",
      "paragraph": "Свежий лимон, мята и лед.",
      "price": 400,
      "category": "чай и б/а коктейли",
      "img": "src/assets/drink-4.jpeg"
    },
    {
      "id": 13,
      "title": "Виски",
      "subtitle": "Элитный виски",
      "paragraph": "Подается со льдом или водой.",
      "price": 1500,
      "category": "барная карта",
      "img": "src/assets/bar-1.jpeg"
    },
    {
      "id": 14,
      "title": "Водка",
      "subtitle": "Классическая русская водка",
      "paragraph": "Подается охлажденной.",
      "price": 1000,
      "category": "барная карта",
      "img": "src/assets/bar-2.jpeg"
    },
    {
      "id": 15,
      "title": "Коктейль Маргарита",
      "subtitle": "Классический коктейль",
      "paragraph": "С текилой, лаймом и солью.",
      "price": 1200,
      "category": "барная карта",
      "img": "src/assets/bar-3.jpeg"
    },
    {
      "id": 16,
      "title": "Пиво",
      "subtitle": "Свежее разливное пиво",
      "paragraph": "Подается охлажденным.",
      "price": 500,
      "category": "барная карта",
      "img": "src/assets/bar-4.jpeg"
    },
    {
      "id": 17,
      "title": "Коктейль Негрони",
      "subtitle": "Классический итальянский коктейль",
      "paragraph": "С джином, кампари и сладким вермутом.",
      "price": 1300,
      "category": "барная карта",
      "img": "src/assets/bar-5.jpeg"
    },
    {
      "id": 18,
      "title": "Салат Цезарь",
      "subtitle": "Классический салат с курицей",
      "paragraph": "С хрустящими крутонами и соусом Цезарь.",
      "price": 900,
      "category": "блюда",
      "img": "src/assets/food-5.jpeg"
    },
    {
      "id": 19,
      "title": "Фруктовая тарелка",
      "subtitle": "Ассорти из свежих фруктов",
      "paragraph": "Идеально для легкого перекуса.",
      "price": 1100,
      "category": "блюда",
      "img": "src/assets/food-6.jpeg"
    },
    {
      "id": 20,
      "title": "Клубничный лимонад",
      "subtitle": "Освежающий напиток с клубникой",
      "paragraph": "С мятой и льдом.",
      "price": 450,
      "category": "чай и б/а коктейли",
      "img": "src/assets/drink-5.jpeg"
    },
        {
    "id": 21,
    "title": "Шоколадный фондан",
    "subtitle": "Десерт с жидким шоколадом внутри",
    "paragraph": "Подается с шариком ванильного мороженого.",
    "price": 600,
    "category": "блюда",
    "img": "src/assets/food-7.jpeg"
    },
    {
    "id": 22,
    "title": "Тирамису",
    "subtitle": "Классический итальянский десерт",
    "paragraph": "С кремом маскарпоне и кофе.",
    "price": 700,
    "category": "блюда",
    "img": "src/assets/food-8.jpeg"
    },
    {
    "id": 23,
    "title": "Чизкейк Нью-Йорк",
    "subtitle": "Классический чизкейк",
    "paragraph": "Подается с ягодным соусом.",
    "price": 750,
    "category": "блюда",
    "img": "src/assets/food-10.jpeg"
    },
    {
    "id": 24,
    "title": "Фруктовый салат",
    "subtitle": "Ассорти из свежих фруктов",
    "paragraph": "С йогуртовой заправкой.",
    "price": 500,
    "category": "блюда",
    "img": "src/assets/food-9.jpeg"
    },
    {
    "id": 25,
    "title": "Капучино",
    "subtitle": "Кофе с молочной пенкой",
    "paragraph": "Подается с сахаром или без.",
    "price": 300,
    "category": "чай и б/а коктейли",
    "img": "src/assets/drink-6.jpeg"
    },
    {
    "id": 26,
    "title": "Эспрессо",
    "subtitle": "Крепкий черный кофе",
    "paragraph": "Подается в маленькой чашке.",
    "price": 250,
    "category": "чай и б/а коктейли",
    "img": "src/assets/drink-7.jpeg"
    },
    {
    "id": 27,
    "title": "Латте",
    "subtitle": "Кофе с молоком",
    "paragraph": "Подается с сиропом на выбор.",
    "price": 350,
    "category": "чай и б/а коктейли",
    "img": "src/assets/drink-8.jpeg"
    },
    {
    "id": 28,
    "title": "Кальян на молоке",
    "subtitle": "Табак на выбор, молоко в колбе",
    "paragraph": "Сессия на молочной основе для мягкого вкуса.",
    "price": 1000,
    "category": "кальяны",
    "img": "src/assets/product-4.jpeg"
    },
    {
    "id": 29,
    "title": "Кальян на соке",
    "subtitle": "Табак на выбор, сок в колбе",
    "paragraph": "Сессия с добавлением фруктового сока для яркого вкуса.",
    "price": 1200,
    "category": "кальяны",
    "img": "src/assets/product-5.jpeg"
    },
    {
    "id": 30,
    "title": "Кальян на вине",
    "subtitle": "Табак на выбор, вино в колбе",
    "paragraph": "Изысканный вкус с добавлением красного или белого вина.",
    "price": 2000,
    "category": "кальяны",
    "img": "src/assets/product-6.jpeg"
    },
    {
    "id": 31,
    "title": "Кальян на шампанском",
    "subtitle": "Табак на выбор, шампанское в колбе",
    "paragraph": "Легкий и праздничный вкус для особых случаев.",
    "price": 2500,
    "category": "кальяны",
    "img": "src/assets/product-7.jpeg"
    },
    {
    "id": 32,
    "title": "Джин",
    "subtitle": "Классический джин",
    "paragraph": "Подается с тоником и лаймом.",
    "price": 1200,
    "category": "барная карта",
    "img": "src/assets/bar-6.jpeg"
    },
    {
    "id": 33,
    "title": "Ром",
    "subtitle": "Классический темный ром",
    "paragraph": "Подается с колой или льдом.",
    "price": 1300,
    "category": "барная карта",
    "img": "src/assets/bar-7.jpeg"
    },
    {
    "id": 34,
    "title": "Текила",
    "subtitle": "Классическая текила",
    "paragraph": "Подается с солью и лаймом.",
    "price": 1400,
    "category": "барная карта",
    "img": "src/assets/bar-8.jpeg"
    },
    {
    "id": 35,
    "title": "Коктейль Пина Колада",
    "subtitle": "Коктейль на основе рома",
    "paragraph": "С ананасовым соком и кокосовым молоком.",
    "price": 1100,
    "category": "барная карта",
    "img": "src/assets/bar-9.jpeg"
    },
    {
    "id": 36,
    "title": "Коктейль Космополитен",
    "subtitle": "Коктейль на основе водки",
    "paragraph": "С клюквенным соком и лаймом.",
    "price": 1000,
    "category": "барная карта",
    "img": "src/assets/bar-10.jpeg"
    },
    {
      "id": 37,
      "title": "Коктейль Манхэттен",
      "subtitle": "Классический виски-коктейль",
      "paragraph": "С сладким вермутом и биттерами.",
      "price": 1400,
      "category": "барная карта",
      "img": "src/assets/bar-11.jpeg"
    },
    {
      "id": 38,
      "title": "Брускетта с томатами",
      "subtitle": "Итальянская закуска на гриле",
      "paragraph": "С чесноком, базиликом и оливковым маслом.",
      "price": 650,
      "category": "блюда",
      "img": "src/assets/food-11.jpeg"
    },
    {
      "id": 39,
      "title": "Белое вино",
      "subtitle": "Охлажденное белое вино",
      "paragraph": "Подается бокалом (150 мл) или бутылкой.",
      "price": 900,
      "category": "барная карта",
      "img": "src/assets/bar-12.jpeg"
    },
    {
      "id": 40,
      "title": "Креветки в чесночном соусе",
      "subtitle": "Тигровые креветки на гриле",
      "paragraph": "Подаются с лимоном и зеленью.",
      "price": 1800,
      "category": "блюда",
      "img": "src/assets/food-12.jpeg"
    }
  ]
}
    `
    const json = JSON.parse(data);
    const bar = $('#bar');
    const hookah = $('#hookah');
    const drink = $('#drink');
    const food = $('#food');
    const windowInnerScreen = $(window).innerWidth();
    let currentPage = 1;
    let itemsPerPage = windowInnerScreen > 768 ? 4 : windowInnerScreen > 450 && windowInnerScreen < 768 ? 3 : 2;
    let filteredProducts = []; // Делаем глобальной

    function renderProducts(category) {
        filteredProducts = json.data.filter((item) => item['category'] === category);
        currentPage = 1; // Сбрасываем на первую страницу
        updatePagination();
    }

    function updatePagination() {
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const productsToShow = filteredProducts.slice(start, end);

        let htmlContent = '';
        productsToShow.forEach((item) => {
            htmlContent += `
                <div class="products-item wow animate__fadeInUp">
                    <div class="products-item-text">
                        <div class="products-item-title">${item['title']}</div>
                        <div class="products-item-subtitle-top">${item['subtitle']}</div>
                        <div class="products-item-subtitle-bottom">${item['paragraph']}</div>
                        <div class="products-item-price">${item['price']} руб.</div>
                    </div>
                    ${item['img'] ? `<img src="${item['img']}" alt="${item['title']}">` : ''}
                </div>
            `;

        });


        $('.products-items').html(htmlContent);
        $('#prev-page').prop('disabled', currentPage === 1);
        $('#next-page').prop('disabled', currentPage === totalPages || totalPages === 0);
        $('#pagination-info').text(`${currentPage} / ${totalPages}`);
    }

    function setActiveCategory(category) {
        localStorage.setItem('activeCategory', category);
        renderProducts(category);

        // Удаляем активный класс у всех кнопок
        $('.menu-item-link').removeClass('active');
        $('.border-bot').css('opacity', '0');

        // Находим нужную кнопку по ID и добавляем активный класс
        const categoryId = getCategoryId(category);
        $(`#${categoryId}`).addClass('active');
        $(`#${categoryId}`).next('.border-bot').css('opacity', '1');
    }

    const savedCategory = localStorage.getItem('activeCategory') || 'кальяны';
    setActiveCategory(savedCategory);
// Инициализация обработчиков один раз при загрузке
    $('#prev-page').on('click', function () {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    $('#next-page').on('click', function () {
        const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    function setActiveCategory(category) {
        localStorage.setItem('activeCategory', category);
        renderProducts(category); // Теперь будет работать правильно
    }

// Обработчики кликов для категорий
    hookah.click(function () {
        $('.menu-item-link').removeClass('active');
        $('.border-bot').css('opacity', '0');
        $(this).addClass('active');
        $(this).next('.border-bot').css('opacity', '1');
        setActiveCategory('кальяны');
    });

    food.click(function () {
        $('.menu-item-link').removeClass('active');
        $('.border-bot').css('opacity', '0');
        $(this).addClass('active');
        $(this).next('.border-bot').css('opacity', '1');
        setActiveCategory('блюда');
    });

    drink.click(function () {
        $('.menu-item-link').removeClass('active');
        $('.border-bot').css('opacity', '0');
        $(this).addClass('active');
        $(this).next('.border-bot').css('opacity', '1');
        setActiveCategory('чай и б/а коктейли');
    });

    bar.click(function () {
        $('.menu-item-link').removeClass('active');
        $('.border-bot').css('opacity', '0');
        $(this).addClass('active');
        $(this).next('.border-bot').css('opacity', '1');
        setActiveCategory('барная карта');
    });

    $('#date').text(`${new Date().getFullYear()}`)
    let center = [55.7422267565145, 37.65525091393979];

    function init() {
        let map = new ymaps.Map('hookah-map', {
            center: center,
            zoom: 18,
            type: 'yandex#map'
        });
        map.controls.remove('geolocationControl'); // удаляем геолокацию
        map.controls.remove('searchControl'); // удаляем поиск
        map.controls.remove('trafficControl'); // удаляем контроль трафика
        map.controls.remove('typeSelector'); // удаляем тип
        map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
        map.controls.remove('zoomControl'); // удаляем контрол зуммирования
        map.controls.remove('rulerControl');
        const svgIcon = `
    svg
    `
        const svgUrl = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svgIcon)}`

        let placemark1 = new ymaps.Placemark(center, {
            balloonContent: `
            <div class="balloon">
            <div class="balloon-header">
            SmokeCity</div>
            <div class="balloon-footer">hookah bar</div>
            </div>
            `
        }, {
            iconLayout: 'default#image',
            iconImageHref: svgUrl,
            iconContent: '1',
            iconImageSize: [40, 40],
            iconImageOffset: [-15, -15],
        });
        map.geoObjects.add(placemark1);
    }

    ymaps.ready(init);

    $('#burger').click(function () {
        $('#menu').addClass('open');
    });

    $('#menu *').click(function () {
        $('#menu').removeClass('open');
    });

    function updateLayout() {
        const isExactly320px = window.innerWidth <= 375;
        $('.promotions-dots-container, .gallery-dots-container').hide();
        $('.prev').hide();
        $('.next').hide();
        const mainContainer = $('.main-container');
        if (isExactly320px) {
            if (promotionsSlider.hasClass('slick-initialized')) {
                promotionsSlider.slick('unslick');
            }
            if (gallerySlider.hasClass('slick-initialized')) {
                gallerySlider.slick('unslick');
            }
            mainContainer.html(`
            <div class="main-text-title">С нами вы почувствуете дымный вкус жизни!</div>

            <div class="main-image wow animate__backInRight">
                <img src="src/assets/hookah.png" alt="кальян" class="main-kalyan">
                <div class="main-image-circle">
                    <div class="main-image-discount">
                        <div class="main-image-discount-text">Новым гостям 15% скидки !</div>
                    </div>
                </div>
                <img src="src/assets/main-sparks.png" alt="уголь" class="main-ygol">
            </div>

            <div class="main-text-subtitle">Только качественный табак и лучшее обслуживание. Мы создаем тренды в
                кальянных тусовках и у нас
                каждый сможет почувствовать себя важным
                гостем и неотъемлемой частью заведения.</div>

            <button class="button main-button"  id="main-button">
                Забронировать стол
            </button>
        `);
            $('.custom-dots').show();
            $('.prev').hide();
            $('.next').hide();
            initSliders();
        } else {
            if (promotionsSlider.hasClass('slick-initialized')) {
                promotionsSlider.slick('unslick');
            }
            if (gallerySlider.hasClass('slick-initialized')) {
                gallerySlider.slick('unslick');
            }
            $('.custom-dots').hide();
            $('.prev').show();
            $('.next').show();
            mainContainer.html(`
            <div class="main-text wow animate__backInLeft">
                <div class="main-text-title">С нами вы почувствуете дымный вкус жизни!</div>
                <div class="main-text-subtitle">Только качественный табак и лучшее обслуживание. Мы создаем тренды в
                    кальянных тусовках и у нас
                    каждый сможет почувствовать себя важным
                    гостем и неотъемлемой частью заведения.</div>
                <button class="button main-button"  id="main-button">
                    Забронировать стол
                </button>
            </div>
            <div class="main-image wow animate__backInRight">
                <img src="src/assets/hookah.png" alt="кальян" class="main-kalyan">
                <div class="main-image-circle">
                    <div class="main-image-discount">
                        <div class="main-image-discount-text">Новым гостям 15% скидки !</div>
                    </div>
                </div>
                <img src="src/assets/main-sparks.png" alt="уголь" class="main-ygol">
            </div>

        `);
        }
    }

    function initSliders() {
        const slickOptions = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            arrows: false,
        };
        promotionsSlider.slick(slickOptions);
        gallerySlider.slick(slickOptions);

        function createCustomDots(slider, containerClass) {
            const dotsContainer = $(`<div class="${containerClass}"></div>`);
            slider.after(dotsContainer);

            let dotsHtml = '';
            const slideCount = slider.slick('getSlick').slideCount;

            for (let i = 0; i < slideCount; i++) {
                dotsHtml += `<button type="button" data-index="${i}" ${i === 0 ? 'class="active"' : ''}></button>`;
            }

            dotsContainer.html(`<div class="custom-dots">${dotsHtml}</div>`);

            dotsContainer.on('click', 'button', function () {
                const index = $(this).data('index');
                slider.slick('slickGoTo', index);
                $(this).addClass('active').siblings().removeClass('active');
            });

            slider.on('afterChange', function (event, slick, currentSlide) {
                dotsContainer.find('button').removeClass('active')
                    .eq(currentSlide).addClass('active');
            });
        }

        createCustomDots(promotionsSlider, 'promotions-dots-container');
        createCustomDots(gallerySlider, 'gallery-dots-container');
        createCustomDots(staffSlider, 'gallery-dots-container');
    }

    $(document).ready(function () {
        updateLayout();

        let currentWidth = window.innerWidth;
        $(window).on('resize', function () {
            const newWidth = window.innerWidth;

            if ((currentWidth <= 375 || newWidth <= 375) && currentWidth !== newWidth) {
                updateLayout();
            }
            currentWidth = newWidth;
        });
    });

    if (!localStorage.getItem('cookieAccepted')) {
        $('.cookie').show();
    }
    $('.cookie-accept').click(() => {
        $('.cookie').hide();
        localStorage.setItem('cookieAccepted', '1');
    });


});
