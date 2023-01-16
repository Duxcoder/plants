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
