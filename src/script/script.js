$(document).ready(function () {
    new WOW({
        animateClass: 'animate__animated',
    }).init();
    const header = $('.header');
    $(window).scroll(function () {
        $(window).scrollTop() > 0 ? header.css('background', 'rgb(7, 0, 21)') : header.css('background', 'none');
    });

    $(document).on('click', '#main-button, .footer-button', function (e) {
        e.preventDefault();
        $('.form')[0].scrollIntoView({behavior: 'smooth'});
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
    numberPhone.mask('+7-(000)-000-00-00');

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
      "img": "../src/assets/product-1.png"
    },
    {
      "id": 2,
      "title": "Кальян на фрукте",
      "subtitle": "Фрукт на выбор: ананас, грейпфрут, гранат.",
      "paragraph": "Максимальная длительность курения кальяна - 90 минут.",
      "price": 1500,
      "category": "кальяны",
      "img": "../src/assets/product-2.png"
    },
    {
      "id": 3,
      "title": "Классическая чаша",
      "subtitle": "Используется кальян с подсветкой и премиальный табак",
      "paragraph": "Один перезабив табака и добавки в колбу бесплатно.",
      "price": 2000,
      "category": "кальяны",
      "img": "../src/assets/product-3.png"
    },
    {
      "id": 4,
      "title": "Дополнительно",
      "subtitle": "Добавки в колбу на выбор:",
      "paragraph": "-молоко -сок -сиропы -ликер",
      "price": 200,
      "category": "кальяны"
    },
    {
      "id": 5,
      "title": "Сырная тарелка",
      "subtitle": "Ассорти из сыров с орехами и виноградом",
      "paragraph": "Идеально для компании из 2-4 человек.",
      "price": 1200,
      "category": "закуски",
      "img": "../src/assets/food-1.jpeg"
    },
    {
      "id": 6,
      "title": "Мясное ассорти",
      "subtitle": "Разнообразие мясных деликатесов",
      "paragraph": "Подается с горчицей и хлебом.",
      "price": 1500,
      "category": "закуски",
      "img": "../src/assets/food-2.jpeg"
    },
    {
      "id": 7,
      "title": "Оливки и маслины",
      "subtitle": "Ассорти из оливок и маслин",
      "paragraph": "Подается с оливковым маслом и специями.",
      "price": 800,
      "category": "закуски",
      "img": "../src/assets/food-3.jpeg"
    },
    {
      "id": 8,
      "title": "Картофель фри",
      "subtitle": "Хрустящий картофель фри",
      "paragraph": "Подается с соусами на выбор.",
      "price": 600,
      "category": "закуски",
      "img": "../src/assets/food-4.jpeg"
    },
    {
      "id": 9,
      "title": "Зеленый чай",
      "subtitle": "Свежезаваренный зеленый чай",
      "paragraph": "Подается с лимоном или медом.",
      "price": 300,
      "category": "чай и б/а коктейли",
      "img": "../src/assets/drink-1.jpeg"
    },
    {
      "id": 10,
      "title": "Черный чай",
      "subtitle": "Крепкий черный чай",
      "paragraph": "Подается с молоком или сахаром.",
      "price": 300,
      "category": "чай и б/а коктейли",
      "img": "../src/assets/drink-2.jpeg"
    },
    {
      "id": 11,
      "title": "Мохито безалкогольный",
      "subtitle": "Освежающий мохито без алкоголя",
      "paragraph": "С лаймом, мятой и льдом.",
      "price": 500,
      "category": "чай и б/а коктейли",
      "img": "../src/assets/drink-3.jpeg"
    },
    {
      "id": 12,
      "title": "Лимонад",
      "subtitle": "Домашний лимонад",
      "paragraph": "Свежий лимон, мята и лед.",
      "price": 400,
      "category": "чай и б/а коктейли",
      "img": "../src/assets/drink-4.jpeg"
    },
    {
      "id": 13,
      "title": "Виски",
      "subtitle": "Элитный виски",
      "paragraph": "Подается со льдом или водой.",
      "price": 1500,
      "category": "барная карта",
      "img": "../src/assets/bar-1.jpeg"
    },
    {
      "id": 14,
      "title": "Водка",
      "subtitle": "Классическая русская водка",
      "paragraph": "Подается охлажденной.",
      "price": 1000,
      "category": "барная карта",
      "img": "../src/assets/bar-2.jpeg"
    },
    {
      "id": 15,
      "title": "Коктейль Маргарита",
      "subtitle": "Классический коктейль",
      "paragraph": "С текилой, лаймом и солью.",
      "price": 1200,
      "category": "барная карта",
      "img": "../src/assets/bar-3.jpeg"
    },
    {
      "id": 16,
      "title": "Пиво",
      "subtitle": "Свежее разливное пиво",
      "paragraph": "Подается охлажденным.",
      "price": 500,
      "category": "барная карта",
      "img": "../src/assets/bar-4.jpeg"
    }
  ]
}
    `
    const json = JSON.parse(data);
    const bar = $('#bar');
    const hookah = $('#hookah');
    const drink = $('#drink');
    const food = $('#food');

    function renderProducts(category) {
        let htmlContent = '';
        json.data.forEach((item) => {
            if (item['category'] === category) {
                if (item['title'].toLowerCase() === 'дополнительно') {
                    htmlContent += `
                                <div class="products-item none-border wow animate__fadeInUp">
                                    <div class="products-item-text">
                                        <div class="products-item-title">${item['title']}</div>
                                        <div class="products-item-subtitle-top-text">${item['subtitle']}</div>
                                        <div class="products-item-subtitle-bottom-text">
                                            ${item['paragraph'].replace(/ -/g, '<br>-')}
                                        </div>
                                        <div class="products-item-price">${item['price']} руб.</div>
                                    </div>
                                </div>
                            `;
                } else {
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
                }
            }
        });
        $('.products-items').html(htmlContent);
    }

    hookah.click(function () {
        // Удаляем класс active у всех кнопок и скрываем их border-bot
        $('.menu-item-link').removeClass('active');
        $('.border-bot').css('opacity', '0');

        // Добавляем класс active к текущей кнопке и показываем её border-bot
        $(this).addClass('active');
        $(this).next('.border-bot').css('opacity', '1');

        renderProducts('кальяны');
    });

    food.click(function () {
        $('.menu-item-link').removeClass('active');
        $('.border-bot').css('opacity', '0');
        $(this).addClass('active');
        $(this).next('.border-bot').css('opacity', '1');
        renderProducts('закуски');
    });

    drink.click(function () {
        $('.menu-item-link').removeClass('active');
        $('.border-bot').css('opacity', '0');
        $(this).addClass('active');
        $(this).next('.border-bot').css('opacity', '1');
        renderProducts('чай и б/а коктейли');
    });

    bar.click(function () {
        $('.menu-item-link').removeClass('active');
        $('.border-bot').css('opacity', '0');
        $(this).addClass('active');
        $(this).next('.border-bot').css('opacity', '1');
        renderProducts('барная карта');
    });

// Инициализация - делаем первую вкладку активной при загрузке
    hookah.addClass('active');
    hookah.next('.border-bot').css('opacity', '1');

    $('#date').text(`${new Date().getFullYear()}`)
    let center = [55.7422267565145, 37.65525091393979];

    function init() {
        let map = new ymaps.Map('hookah-map', {
            center: center,
            zoom: 18,
            type: 'yandex#map'
        });
        // map.controls.remove('geolocationControl'); // удаляем геолокацию
        // map.controls.remove('searchControl'); // удаляем поиск
        // map.controls.remove('trafficControl'); // удаляем контроль трафика
        // map.controls.remove('typeSelector'); // удаляем тип
        // map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
        // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
        // map.controls.remove('rulerControl');
        const svgIcon = `
    <svg
 xmlns="http://www.w3.org/2000/svg"
 xmlns:xlink="http://www.w3.org/1999/xlink"
 width="83px" height="94px">
<image  x="0px" y="0px" width="83px" height="94px"  xlink:href="data:img/png;base64,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" />
</svg>
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


});
