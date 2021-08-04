window.addEventListener('DOMContentLoaded', function() {

    // Tabs
    
	let tabs = document.querySelectorAll('.tabheader__item'),
		tabsContent = document.querySelectorAll('.tabcontent'),
		tabsParent = document.querySelector('.tabheader__items');

	function hideTabContent() {
        
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
	}

	function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    
    hideTabContent();
    showTabContent();

	tabsParent.addEventListener('click', function(event) {
		const target = event.target;
		if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
		}
    });
    

    let current = 1,
        previesItem = null,
        currentItem = null,
        offset = 0, //переменная для второго слайдера, хранит значение на сколько мы отсупили
        dots = [],
        prevDots = null;
    function changeSlides(prev,next) { //slider #1
        prev.classList.remove("fade");
        next.classList.remove("antiFade");
        next.classList.add("fade");
        prev.classList.add("antiFade");
    }
    const next = document.querySelector(".offer__slider-next"),
          prev = document.querySelector(".offer__slider-prev"),
          currentItemID = document.querySelector("#current"),
          lengthOfItems = document.querySelectorAll(".offer__slide").length,
          slides = document.querySelectorAll(".offer__slide"),
          slidesWrapper = document.querySelector(".offer__slider-wrapper"),
          slidesField = document.querySelector(".offer__slider-inner"),
          width = window.getComputedStyle(slidesWrapper).width;

    slidesField.style.width = 100*lengthOfItems+"%"; //обертка для slider #2
    slidesField.style.display = 'flex';
    slidesField.style.transition = "0.5s all";

    slidesWrapper.style.overflow = 'hidden';
    slides.forEach(item=> {
        item.style.width = width;
    });
    document.querySelector("#total").innerHTML = lengthOfItems;
    if (lengthOfItems < 10) {
        document.querySelector("#total").innerHTML = `0${lengthOfItems}`;
    }
    currentItemID.innerHTML=`0${current}`;
    /* slides[0].classList.toggle("fade"); slider #1
    currentItem = slides[0]; */

    //dots

    let dotsWrapper = document.createElement('div');
    dotsWrapper.classList.add("dotsWrapper");
    for (let i=0; i<lengthOfItems; i++) {
        dots[i] = document.createElement('span');
        dots[i].classList.add("sim-dots");
        dots[i].id = `dotsToImg№${i+1}`;
        dotsWrapper.append(dots[i]);
    }
    slidesWrapper.append(dotsWrapper);
    dots[0].classList.add("activeDot");

    next.addEventListener("click", (e) => {
        e.preventDefault();
        if (++current >lengthOfItems) {
            current = 1;
            offset = 0;
            dots[lengthOfItems-1].classList.toggle("activeDot");
        } else {
            offset += parseInt(width, 10);
            dots[current-2].classList.toggle("activeDot");
        }
        dots[current-1].classList.toggle("activeDot");
        prevDots = dots[current-1];
        currentItemID.innerHTML=`${parseInt(current / 10)}${current % 10}`;   
        previesItem = currentItem;
        currentItem = slides[current-1];

        slidesField.style.transform = `translateX(-${offset}px)`;
        //changeSlides(previesItem,currentItem);
    });
    prev.addEventListener("click",(e)=> {
        e.preventDefault();
        if (--current < 1) {
            current = lengthOfItems;
            offset = parseInt(width, 10)*(lengthOfItems-1);
            dots[0].classList.toggle("activeDot");
        } else {
            offset -= parseInt(width, 10);
            dots[current].classList.toggle("activeDot"); 
        }
        prevDots = dots[current-1];
        dots[current-1].classList.toggle("activeDot");
        currentItemID.innerHTML=`${parseInt(current / 10)}${current % 10}`;  
        previesItem = currentItem;
        currentItem = slides[current-1];
        slidesField.style.transform = `translateX(-${offset}px)`;
        //changeSlides(previesItem,currentItem);
    });

    dots.forEach((item, i, arr)=> {
        item.addEventListener("click", (e) => {
            e.preventDefault();
            if (prevDots != null) {
                prevDots.classList.toggle("activeDot");
            } else {
                arr[0].classList.toggle("activeDot");
            }
            prevDots = item;
            item.classList.toggle("activeDot");
            current = i+1;
            offset = (current-1)*parseInt(width,10);
            currentItemID.innerHTML=`${parseInt(current / 10)}${current % 10}`;   
            slidesField.style.transform = `translateX(-${offset}px)`;
        });
    });

    // Timer

    const deadline = '2021-07-30';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor( (t/(1000*60*60*24)) ),
            seconds = Math.floor( (t/1000) % 60 ),
            minutes = Math.floor( (t/1000/60) % 60 ),
            hours = Math.floor( (t/(1000*60*60) % 24) );
        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num){
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector("#days"),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    // Modal

    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal');
        //modalCloseBtn = document.querySelector('[data-close]');

    modalTrigger.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        //clearInterval(modalTimerId);
    }
    
    //modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal || e.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')) { 
            closeModal();
        }
    });

    // const modalTimerId = setTimeout(openModal, 3000);
    // Закомментировал, чтобы не отвлекало

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
    window.addEventListener('scroll', showModalByScroll);

    // Используем классы для создание карточек меню

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = "menu__item";
                element.classList.add(this.classes);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    const getResources = async (url) => { //функция для получения данных на сервер
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${status}`);
        }

        return await res.json();
    };

    axios.get("http://localhost:3000/menu")
        .then(data=>{
            data.data.forEach(({img,altimg,title,descr,price})=> {
                new MenuCard(img,altimg,title,descr,price,".menu .container").render();
            });
        });
    /* getResources("http://localhost:3000/menu")
    .then(data=> {
        data.forEach(({img,altimg,title,descr,price})=> {
            new MenuCard(img,altimg,title,descr,price,".menu .container").render();
        });
    }); */

    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    const postData = async (url, data) => { //функция для постинга данных на сервер
        const res = await fetch(url, {
            method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
        });

        return await res.json();
    };

    function bindPostData(form) {
        form.addEventListener('submit', (e)=> {
            e.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
            `;

            form.insertAdjacentElement('afterend',statusMessage);
           /*  отправка данных через request
           const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'application/json'); */
            
            

            //request.send(formData);

            //request.send(json);

           /*  request.addEventListener('load',()=> {
                if (request.status === 200) {
                    console.log(request.response);
                    showThanksModal(message.success);
                    form.reset();
                    statusMessage.remove();
                } else {
                    showThanksModal(message.failure);
                }
            }); */
            //отправка данных через fetch 
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            axios.post('http://localhost:3000/requests',json)
                .then(data=> {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(error => {
                    console.log(error);
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });
            /* postData('http://localhost:3000/requests', json)
            .then(data=> {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(()=> {
                showThanksModal(message.failure);
            }).finally(()=> {
                form.reset();
            }); */
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector(".modal__dialog");
        prevModalDialog.classList.add("hide");
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
        <div class="modal__content">
            <div class="modal__close">×</div>
            <div class="modal__title">${message}</div>
        </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000);
    }

    fetch('db.json')
        .then(data=>data.json())
        .then(res=>console.log(res));

    //калькулятор

    const result = document.querySelector(".calculating__result span");

    
    if (!localStorage.getItem('sex')) {
        localStorage.setItem('sex', 'female');
        localStorage.setItem('ratio',1.375);
    } else {
        document.querySelectorAll(".calculating__choose-item").forEach(item=> {
            item.classList.remove("calculating__choose-item_active");
        });
        document.querySelector(`#${localStorage.getItem('sex')}`).classList.add("calculating__choose-item_active");
        document.querySelector("#height").value = localStorage.getItem("height");
        document.querySelector("#weight").value = localStorage.getItem("weight");
        document.querySelector("#age").value = localStorage.getItem("age");
        document.querySelector(`[data-ratio='${localStorage.getItem('ratio')}']`).classList.add("calculating__choose-item_active");
    }

    function calcTotal() {
        if(!localStorage.getItem('sex') || !localStorage.getItem('height')|| !localStorage.getItem('weight') || !localStorage.getItem('age') || !localStorage.getItem('ratio')) {
            result.textContent = "_____";
            return;
        }
        if (localStorage.getItem('sex') === 'female') {
            result.textContent = ((447.6 + (9.2 * localStorage.getItem('weight')) + (3.1 * localStorage.getItem('height')) - (4.3 * localStorage.getItem('age'))) * localStorage.getItem('ratio')).toFixed(2);
        } else {
            result.textContent = ((88.36 + (13.4 * localStorage.getItem('weight')) + (4.8 * localStorage.getItem('height')) - (5.7 * localStorage.getItem('age'))) * localStorage.getItem('ratio')).toFixed(2);
        }
    }
    calcTotal();
    document.querySelector("#clearCalc").addEventListener("click",()=> {
        localStorage.clear();
        document.querySelector("#height").value = document.querySelector("#weight").value = document.querySelector("#age").value ='';
    });
    function getDynamicInf(elementID) {
        document.querySelector(`#${elementID}`).addEventListener("input",()=> {
            localStorage.setItem(`${elementID}`, document.querySelector(`#${elementID}`).value);
            calcTotal();
        });
    }

    function getStaticInf(parentSelector, activeClass) {
        const elements = document.querySelectorAll(`${parentSelector} div`);
        document.querySelector(parentSelector).addEventListener('click', (e)=> {
            if (e.target.getAttribute('data-ratio')) {
                localStorage.setItem('ratio',e.target.getAttribute('data-ratio'));
                calcTotal();
            } else {
                localStorage.setItem('sex',e.target.id);
                calcTotal();
            }
            if  (e.target.getAttribute('data-ratio') || !e.target.classList.contains("calculating__choose")) {
                elements.forEach(item => {
                    item.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
            }
        });
    }  
    getStaticInf("#gender", "calculating__choose-item_active");
    getStaticInf(".calculating__choose_big", "calculating__choose-item_active");
    getDynamicInf("height");
    getDynamicInf("age");
    getDynamicInf("weight");
});