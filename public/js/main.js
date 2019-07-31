let body = document.querySelector('body');
let section = document.querySelector('section');
let nav = document.querySelector('.nav');
let menu = document.querySelector('.menu');
menu.onclick = function () {
    nav.style.display = 'flex';
    nav.classList.remove('nav-moveout');
    nav.classList.add('nav-movein');
    body.classList.remove('body-moveout');
    body.classList.add('body-movein');
    if (!search) {
        section.classList.remove('section-moveout');
        section.classList.add('section-movein');
    }

    menu.classList.remove('fade-in');
    menu.classList.add('fade-out');
    menu.style.display = 'none';
}
{
    let nav_right = document.querySelector('.nav-right');
    nav_right.onclick = function () {
        nav.classList.remove('nav-movein');
        nav.classList.add('nav-moveout');
        body.classList.add('body-moveout');
        body.classList.remove('body-movein');
        if (!search) {
            section.classList.add('section-moveout');
            section.classList.remove('section-movein');
        }
        menu.style.display = 'flex';
        menu.classList.remove('fade-out');
        menu.classList.add('fade-in');
    }
}

let searchbut = document.querySelector('#search');
let search = document.querySelector('.xian');
search.onclick = function () {
    searchbut.style.display = 'block';
    searchbut.style.width = '10rem';
    search.style.visibility = 'hiddle';
    searchbut.classList.remove('moveout');
    searchbut.classList.add('movein');
    searchbut.focus();
}
searchbut.onfocus = function () {
    searchbut.style.width = '10rem';
    search.style.visibility = 'hiddle';
    searchbut.classList.remove('moveout');
    searchbut.classList.add('movein');
}
searchbut.onblur  = function() {
    searchbut.classList.add('moveout');
    searchbut.classList.remove('movein');
    search.style.visibility = 'visible';
    searchbut.style.width = '0';
}


{
    let search = document.querySelector('#search');
    search.onkeypress = function(e) {
        if (e.charCode === 13) {
            location.href = '/search/?title=' + this.value;
        }
    }
}