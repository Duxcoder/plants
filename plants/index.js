'use strict'

console.log(`
1: "24" \n
2: "24" \n
3: "15" \n
4: "22" \n
Score: "85"
`);

// Hamburger menu

function HamburgerMenu(){
    const btnHamburger = document.querySelector('.hamburger_menu');
    const navigation = document.querySelector('.navigation')
    const body = document.querySelector('body');
    const header = document.querySelector('header');
    const container = document.querySelector('.container');

    const clickOnBurger = () => {
        body.classList.toggle('inactive');
        container.classList.toggle('inactive');
        header.classList.toggle('inactive');
        btnHamburger.classList.toggle('active');
        navigation.classList.toggle('hamburger');
    }

    const closeMenuClickOnLinks = (e) => {
        const links = navigation.querySelectorAll('a');
        links.forEach(link => {
            if (link === e.target){
                clickOnBurger();
                navigation.removeEventListener('click', closeMenuClickOnLinks);
            }
        })
    }

    const closeMenuClickOnBackground = (e) => {
        if (e.target === container) {
           clickOnBurger()
           container.removeEventListener('click', closeMenuClickOnBackground)
        }
    }

    const openMenuMobile = () => {
        navigation.addEventListener('click', closeMenuClickOnLinks);
        container.addEventListener('click', closeMenuClickOnBackground);
        clickOnBurger();
    }

    btnHamburger.addEventListener('click', openMenuMobile)

}

HamburgerMenu()

// Service choice

const domBtnsService = document.querySelectorAll('.service__btn');
const domCards = document.querySelectorAll('[data-card]');

let activeBtns = []
const addToActiveBtns = (item) => {
    if (activeBtns.length < 2) {
        activeBtns.push(item)
    }
    if (activeBtns.length === 2) {
       let arr = Array.from(domBtnsService)
       arr.filter((elem) => !activeBtns.includes(elem))[0].classList.add('disabled')
    }
    activeBtns.forEach(elem => elem.classList.add('active'))
}
const removeActiveBtns = (item) => {
   item.classList.remove('active');
   activeBtns = activeBtns.filter(elem => elem != item);
   domBtnsService.forEach(elem => elem.classList.remove('disabled'));
}

document.addEventListener('click', (e) => {
    domBtnsService.forEach(item => {
        if (e.target.name === item.name){
            activeBtns.includes(item) ? removeActiveBtns(item) : addToActiveBtns(item);
            if (activeBtns.length){
                let arrCards = Array.from(domCards)
                let arr = [];
                activeBtns.forEach(btn => {arr = [...arr, ...arrCards.filter(card => card.dataset.card === btn.name)]})
                domCards.forEach(elem => elem.classList.add('active'));
                arr.forEach(elem => elem.classList.remove('active'))
            } else {
                domCards.forEach(elem => elem.classList.remove('active'))
            }
        }
    }) 
})


// Accordion

const domPrices = document.querySelector('.prices__content')
const domBtnsPrices = document.querySelectorAll('.btn__prices');
let openedPriceCard = '';

domPrices.addEventListener('mousedown', (e) => {
    const target = e.target
    console.dir(e.layerY)
    domBtnsPrices.forEach(item => {
        if ((item === target && e.layerY <= 52) || 
        (target.parentElement.parentElement === item && e.layerY <= 52)
        || target.parentElement === item && e.layerY <= 52) {
            if (item === openedPriceCard) {
                item.children[1].classList.remove('active'); 
                item.classList.remove('active'); 
                openedPriceCard = '';
            } else {
                domBtnsPrices.forEach(btn => {
                    btn.children[1].classList.remove('active'); 
                    btn.classList.remove('active');  
                })
                item.children[1].classList.add('active'); 
                item.classList.add('active');
                openedPriceCard = item;
            }
        }
        if (e.target.className === 'btn__order'){
            window.location = '#contacts';
        }
    })
})

domPrices.addEventListener('mousemove', (e) => {
    if (e.layerY >= 52 && 'btn__order' != e.target.className) {e.target.style.cursor = 'auto'}
    else {e.target.style.cursor = 'pointer'}

})


// Custom select

const wrapper = document.querySelector('.address__block');
const domSelected = document.querySelector('.selected');
const spanSelected = domSelected.querySelector('span');
const domOptionsWrapper = document.querySelector('.options');
const domFarmer = document.querySelector('.farmer');
const cityCard = document.querySelector('.city__card');
const fieldCity = cityCard.querySelector('.city_field');
const fieldPhone = cityCard.querySelector('.phone_field');
const fieldAddress = cityCard.querySelector('.address_field');
const btnCall  = cityCard.querySelector('.call_href')
const cardsData = [
    {
        city: 'Yonkers, NY',
        phone: '+1	914	678 0003',
        address: '511 Warburton Ave'
    },
    {
        city: 'Canandaigua, NY',
        phone: '+1	585	393 0001',
        address: '151 Charlotte Street'
    },
    {
        city: 'Sherrill, NY',
        phone: '+1	315	908 0004',
        address: '14 WEST Noyes BLVD'
    },
    {
        city: 'New York City',
        phone: '+1	212	456 0002',
        address: '9 East 91st Street'
    }
];
let active = false

wrapper.addEventListener('click', (e) => {
    if (e.target === domSelected || e.target.parentElement === domSelected) {
        domOptionsWrapper.classList.add('active');
        domSelected.classList.add('active');
        cityCard.classList.remove('active');
        domFarmer.classList.add('inactive');
        if (active) {
            domOptionsWrapper.classList.remove('active');
            domSelected.classList.remove('active');
            domSelected.textContent === 'City' ? cityCard.classList.remove('active') : cityCard.classList.add('active') 
            domSelected.textContent === 'City' ? domFarmer.classList.remove('inactive') : null

        }
        active = !active;
    }
    if (e.target.classList.contains('option')) {
        cardsData.forEach(card => {
            if (e.target.textContent === card.city ){
                spanSelected.style.fontSize = '16px';
                // domSelected.style.paddingLeft = '34px';
                spanSelected.textContent = card.city;
                    fieldCity.textContent = card.city;
                    fieldPhone.textContent = card.phone;
                    fieldAddress.textContent = card.address;
                    btnCall.href = `tel:${card.phone.replace(/\s/g, '')}`;
                domOptionsWrapper.classList.remove('active');
                domSelected.classList.remove('active');
                domSelected.classList.add('activeAlways');
                wrapper.classList.add('activeAlways')
                cityCard.classList.add('active');
            }
        })
        active = !active;   
    }
})

