'use strict'

const navbarMenu = document.querySelector('.navbar__menu');
const contactme = document.querySelector('.home__contact');
const arrowup = document.querySelector('.arrow-up');
const hamburger = document.querySelector('.navbar__toggle-btn');
const workCategoiesBtn = document.querySelector('.work__categories');
const workProjects = document.querySelector('.work__projects');

// scroll 시 navbar dark , transparent 변경
document.addEventListener('scroll', () => {
    const navbar = document.querySelector('#navbar');
    const navbarHeight = navbar.getBoundingClientRect().height;
    if(navbarMenu.classList.contains('open')){
        navbarMenu.classList.remove('open');
    }

    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar-dark')
    }else{
        navbar.classList.remove('navbar-dark')
    }
    
    // Make home fadeout as the window scroll down
    const home = document.querySelector('.home__container');
    const arrowup = document.querySelector('.arrow-up');
    const homeHeight = home.getBoundingClientRect().height;
    let heightRate =  window.scrollY / homeHeight;

    home.style.opacity = heightRate > 1 ? 1 : 1 - heightRate; 
    if(heightRate > .5){
        arrowup.classList.add('show')
    }else{
        arrowup.classList.remove('show')
    }

})

// navbar button click moving certain section

navbarMenu.addEventListener('click', (e) => {
    if(!e.target.dataset.link){
        return; 
    }
    scrollIntoView(e.target.dataset.link);
})
workCategoiesBtn.addEventListener('click', (e) => {
    workCategoiesBtn.querySelectorAll('button').forEach((e) =>{
        e.classList.remove('active');
    })

    let target = e.target.dataset.target || e.target.parentNode.dataset.target;
    if(!target){
        return; 
    }

    var targetBtn = e.target.nodeName == 'button' ? e.target : e.target.parentNode;
    targetBtn.classList.add('active');
    visibleProject(target);
})
hamburger.addEventListener('click', (e) => {
    navbarMenu.classList.toggle('open');
})
contactme.addEventListener('click', (e) => {
    scrollIntoView('#contact');
})

arrowup.addEventListener('click', (e) => {
    scrollIntoView('#home');
})


function visibleProject(target){
    workProjects.classList.add('anim-out');
    setTimeout(()=>{
        document.querySelectorAll(`a[data-target]`).forEach((e) =>{
            if(e.dataset.target == target || target == 'all'){
                e.classList.remove('invisible');
            }else{
                e.classList.add('invisible');
            }
        })
        workProjects.classList.remove('anim-out');
    }, 300)
}

function scrollIntoView(selector){
    var target = document.querySelector(selector);
    target.scrollIntoView({behavior:'smooth'});
}