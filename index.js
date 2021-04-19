'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const createPopUp = () => {
        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `
        <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-left-content">
                        <div class="slider">
                            <div class="slider-prev">
                                <img src="./icons/arrow_back.svg" alt="prev">
                            </div>
                            <div class="slider-wrapper">
                                <div class="slider-inner">
                                    <div class="ofer-slide">
                                        <img src="./img/4.jpeg" style="height: 250px;" alt="">
                                    </div>
                                    <div class="ofer-slide">
                                        <img src="./img/5.jpeg" style="height: 250px;" alt="">
                                    </div>
                                    <div class="ofer-slide">
                                        <img src="./img/3.jpg" style="height: 250px;" alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="slider-next">
                                <img src="./icons/arrow_forward.svg" alt="next">
                            </div>
                    </div>
                    </div>
                    <div class="modal-right-content">
                        <div class="modal-right-top">
                            <div class="title-content">
                                <p class="product-title"></p>
                                <div class="modal-close-content">
                                    <div data-close class="modal-close">&times;</div>
                                </div>
                            </div>
                            <p class="product-price"></p>
                            
                        </div>
                        <div class="modal-right-size">
                            <p>Rozmiar:</p>
                            <div>
                                <button data-product-type class="U active">Ram 32 GB</button>
                                <button data-product-type class="V">Ram 64 GB</button>
                                <button data-product-type class="W">Ram 96 GB</button>
                            </div>
                        </div>
                        <div class="modal-right-variant">
                            <p>Wariant:</p>
                            <select name="colors" id="colors">
                                <option value="srebny">Srebny</option>
                                <option value="czarny">Czarny</option>
                                <option value="bialy">Biały</option>
                            </select>
                        </div>
                        <div class="modal-right-option">
                            <div class="product-status-option">
                                <img class="product-status-img" src="./icons/done_black.svg" alt="done-icon" >
                                <p class="product-status"></p>
                            </div>
                            <div class="product-status-option-2">
                                <img src="./icons/time.svg" alt="done-icon" >
                                <div>
                                    <p>Mozemy wysłać juz dziś</p>
                                    <a href="#">Sprawdź czasy i koszty wysyłki</a>
                                </div>
                            </div>
                            
                        </div>
                        <div class="modal-right-cart">
                            <div class="product-count">
                                <button class="decrement"><img src="./icons/minus.svg" alt="minus"></button>
                                <p class="counter"></p>
                                <button class="increment"><img src="./icons/plus.svg" alt="plus"></button>
                            </div>
                            <button class="add-to-cart">Dodaj do koszyka</button>
                        </div>
                    </div>
                    </div>
        </div>`;

        document.body.append(modal)
        const openModalBtn = document.querySelector('[data-modal]');
        const closeModalBtn = document.querySelector('[data-close]');

        openModalBtn.addEventListener('click', () => {
            openModal();
        });

        function openModal(){
            modal.classList.add('show');
            modal.classList.remove('hide');
            document.body.style.overflow = "hidden";
        }

        function closeModal() {
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = "";
        }

        closeModalBtn.addEventListener('click', closeModal);

        document.addEventListener('keydown', e => {
            if (e.code === "Escape" && modal.classList.contains('show')) {
                closeModal();
            }
        });

    }
    createPopUp();

    const productTitle = document.querySelector('.product-title');
    const productPrice = document.querySelector('.product-price');
    const productStatus = document.querySelector('.product-status');
    const productTypeBtns = document.querySelectorAll('[data-product-type]');
    const productTypeColor = document.querySelector('#colors');
    const incrementBtn = document.querySelector('.increment');
    const decrementBtn = document.querySelector('.decrement');
    const counterEl = document.querySelector('.counter');
    const addToCartBtn = document.querySelector('.add-to-cart');
    const slides = document.querySelectorAll('.ofer-slide');
    const prev = document.querySelector('.slider-prev');
    const next = document.querySelector('.slider-next');
    const slidesWrapper = document.querySelector('.slider-wrapper');
    const slidesField = document.querySelector('.slider-inner');
    const width = '255px';
    const productStatusImg = document.querySelector('.product-status-img');
    const mainContent = document.querySelector('.main-content');
    let price, counter = 1, amount = 0, offset = 0, curentActiveBtn;

    const initialDataValues = ( json ) => {
        productTitle.innerHTML = json.product.name;
        price = `${json.sizes.items.U.price},00 zł`;
        productPrice.innerHTML = price;
        productStatus.innerHTML = json.sizes.items.U.status;
        counterEl.innerText = counter;
    }

    const onChangeProductTypeSize = ( json ) => {
        productTypeBtns.forEach((btn)=>{
            btn.addEventListener('click', () => {
                const activeBtn = document.querySelector('.active');
                activeBtn.classList.remove('active');
                let type = btn.classList.value;
                onCheckAmount(btn, json);
                curentActiveBtn = btn;
                if(type === 'U'){
                    btn.classList.add('active')
                    price = `${json.sizes.items.U.price},00 zł`;
                    productPrice.innerHTML = price;
                    productStatus.innerHTML = json.sizes.items.U.status;
                    productTypeColor.value ='srebny'
                }
                else if(type === 'V'){
                    btn.classList.add('active')
                    price = `${json.sizes.items.V.price},00 zł`;
                    productPrice.innerHTML = price;
                    productStatus.innerHTML = json.sizes.items.V.status;
                    productTypeColor.value ='srebny'
                }
                else if(type === 'W'){
                    btn.classList.add('active')
                    price = `${json.sizes.items.W.price},00 zł`;
                    productPrice.innerHTML = price;
                    productStatus.innerHTML = json.sizes.items.W.status;
                    productTypeColor.value ='srebny';
                }
            })
        })
    }

    const onChangeImg = () =>{
        if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2); 
        }
        slidesField.style.transform = `translateX(-${offset}px)`;
    }

    const onChangeProductTypeColor = ( json ) => {
        productTypeColor.addEventListener('change', () => {
            const selectedColor = productTypeColor.value;
            if(selectedColor === "srebny") {
                productPrice.innerHTML = `${parseInt(price) + 
                parseInt(json.multiversions[0].items['1-1'].products[0].price_difference)},00 zł`;
                onChangeImg();
            }
            else if(selectedColor === "czarny") {
                productPrice.innerHTML = `${parseInt(price) + 
                parseInt(json.multiversions[0].items['1-2'].products[0].price_difference)},00 zł`;
                onChangeImg();
            }
            else if(selectedColor === "bialy") {
                productPrice.innerHTML = `${parseInt(price) + 
                parseInt(json.multiversions[0].items['1-3'].products[0].price_difference)},00 zł`;
                onChangeImg();
            }
        })
    }

    const onCountAmount = (activeBtn, json) => {
        incrementBtn.addEventListener('click', () => {
            counter++;
            counterEl.innerText = counter;
            activeBtn = document.querySelector('.active');
            onCheckAmount(activeBtn,json)
        })
        decrementBtn.addEventListener('click', () => {
            if (counter > 1){
                counter--;
                counterEl.innerText = counter;
                activeBtn = document.querySelector('.active');
                onCheckAmount(activeBtn,json)
            }
        })
    }

    const onMoveSlider = () => {
        slidesField.style.width = 100 * slides.length + '%';
        slidesField.style.display = 'flex';
        slidesField.style.transition = '0.5s all';
        slidesWrapper.style.overflow = 'hidden';
        slides.forEach(slide => {
            slide.style.width = width;
        });
        
        next.addEventListener('click', () => {
            if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
                offset = 0;
            } else {
                offset += +width.slice(0, width.length - 2); 
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
        });
        
        prev.addEventListener('click', () => {
            if (offset == 0) {
                offset = +width.slice(0, width.length - 2) * (slides.length - 1);
            } else {
                offset -= +width.slice(0, width.length - 2);
            }
            slidesField.style.transform = `translateX(-${offset}px)`;
        });
    }

    const onCheckAmount = (activeBtn, json) => {
        if(activeBtn.textContent === "Ram 32 GB"){
            if(counterEl.textContent > json.sizes.items.U.amount){
                productStatusImg.src = './icons/cross.svg';
                addToCartBtn.disabled = true;
                addToCartBtn.classList.add('disabled');
            }
            else{
                productStatusImg.src = './icons/done_black.svg';
                addToCartBtn.disabled = false;
                addToCartBtn.classList.remove('disabled');
            }
        }
        if(activeBtn.textContent === "Ram 64 GB"){
            if(counterEl.textContent > json.sizes.items.V.amount){
                productStatusImg.src = './icons/cross.svg';
                addToCartBtn.disabled = true;
                addToCartBtn.classList.add('disabled');
            }
            else{
                productStatusImg.src = './icons/done_black.svg';
                addToCartBtn.disabled = false;
                addToCartBtn.classList.remove('disabled');
            }
        }
        if(activeBtn.textContent === "Ram 96 GB"){
            if(counterEl.textContent > json.sizes.items.W.amount){
                productStatusImg.src = './icons/cross.svg';
                addToCartBtn.disabled = true;
                addToCartBtn.classList.add('disabled');
            }
            else{
                productStatusImg.src = './icons/done_black.svg';
                addToCartBtn.disabled = false;
                addToCartBtn.classList.remove('disabled');
            }
        }
    }

    const onAdditingToCart = () => {
        addToCartBtn.addEventListener('click', () => {
            const modal = document.querySelector('.modal');
            modal.classList.add('hide');
            modal.classList.remove('show');
            document.body.style.overflow = "";

            amount = parseInt(productPrice.textContent) * counter;
            mainContent.innerHTML = `
                <div class="cart-content">
                    <div class="left-cart">
                        <img src="./img/3.jpg" alt="konsola">
                    </div>
                    <div class="right-cart">
                        <h1>${productTitle.textContent}</h1>
                        <p>Cena: ${productPrice.textContent}</p>
                        <p>Wariant: ${productTypeColor.value}</p>
                        <p>Ilość: ${counter}</p>
                        <p>Do zapłaty: ${amount},00 zł</p>
                        <div class="cart-butt-content">
                            <button>Zapłacić</button>
                        </div>
                    </div>
                </div>
            `
        })
    }


    fetch('./xbox.json')
        .then(response => response.json())
        .then(json => {
            initialDataValues(json);
            onChangeProductTypeSize(json);
            onChangeProductTypeColor(json);
            onCountAmount(curentActiveBtn, json);
            onMoveSlider()
            onAdditingToCart();
        });
});