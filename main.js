'use strict'
document.addEventListener('scroll', () => {
    console.log(window.scrollY);
    const navbar = document.querySelector('#navbar');
    const navbarHeight = navbar.getBoundingClientRect().height;
    
    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar-dark')
    }else{
        navbar.classList.remove('navbar-dark')
    }
})