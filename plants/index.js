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

console.log(domBtnsService, domCards);
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
            if (activeBtns){
                let arrCards = Array.from(domCards)
                let arr = [];
                activeBtns.forEach(btn => {arr = [...arr, ...arrCards.filter(card => card.dataset.card === btn.name)]})
                domCards.forEach(elem => elem.classList.remove('active'));
                arr.forEach(elem => elem.classList.add('active'))
            }
        }
    }) 
})