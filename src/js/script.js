// import SimpleLightbox from "simplelightbox";
//
// let gallery = new SimpleLightbox('a.gallery');

const navbarCollapse = document.querySelector('.collapse.navbar-collapse');

Array.from(document.querySelectorAll('a')).forEach((a) => {
    a.addEventListener('click', (e) => {
        const href = e.target.closest('a').href.replace(window.location.origin + window.location.pathname, '');

        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
            navbarCollapse.classList.remove('show');
        }

        if (href === "#home") {
            window.scrollTo({top: 0, behavior: 'smooth'});
            e.preventDefault();
        } else if (href.indexOf('#') === 0) {
            var element = document.querySelector(href);

            if (element) {
                element.scrollIntoView({behavior: 'smooth'});
                e.preventDefault();
            }
        }
    })
})

/**
 * Navbar background
 */

const triggerNavbarBackground = (scrollTop, header, navbar) => {
    const {height} = header.getBoundingClientRect();
    const optionalBackground = navbar.dataset.background;

    if (!optionalBackground) return;

    if (scrollTop >= height - 90) {

        navbar.classList.add('bg-' + optionalBackground);
    } else {
        navbar.classList.remove('bg-' + optionalBackground);
    }
}

addEventListener("load", (event) => {
    const header = document.querySelector('header');
    const navbar = document.querySelector('nav.navbar');

    if (header && navbar) {
        triggerNavbarBackground(document.body.scrollTo, header, navbar)

        addEventListener("scroll", (event) => {
            const scrollTop = event.target.scrollingElement.scrollTop;
            triggerNavbarBackground(scrollTop, header, navbar);
        })
    }
});

document.querySelector('.navbar-toggler').addEventListener('click', () => {
    const navbar = document.querySelector('nav');
    const optionalBackground = navbar.dataset.background;

    if (!optionalBackground) return;

    if(navbar.classList.contains('bg-' + optionalBackground)){

        const scrollTop = document.scrollingElement.scrollTop;
        const header = document.querySelector('header');
        const {height} = header.getBoundingClientRect();


        if (scrollTop >= height - 90) {
            navbar.classList.add('bg-' + optionalBackground);
        } else {
            navbar.classList.remove('bg-' + optionalBackground);
        }




    }else{
        navbar.classList.add('bg-' + optionalBackground);
    }
})

/**
 * dynamicka h2-ka na homepage
 *
 */


let sections = null;
const lastScrollTop = document.body.scrollTop;

const subheader = document.querySelector('header>h2');

function invisibleHomepageHeaderElement(element, activeSection) {
    console.log("invisibleHomepageHeaderElement", {activeSection}, element);
    if (element) {
        if (activeSection !== null) {
            element.classList.add('invisible');
        } else {
            element.classList.remove('invisible');
        }
    }
}

addEventListener("resize", (event) => {
    const scrollTop = document.scrollingElement.scrollTop;

    sections = Array.from(document.querySelectorAll('main>section')).map((section) => {
        const {top, bottom} = section.getBoundingClientRect();
        return {id: section.id, top: top + scrollTop, bottom: bottom + scrollTop};
    })
});

addEventListener("load", (event) => {
    const scrollTop = document.scrollingElement.scrollTop;

    sections = Array.from(document.querySelectorAll('main>section')).map((section) => {
        const {top, bottom} = section.getBoundingClientRect();
        return {id: section.id, top: top + scrollTop, bottom: bottom + scrollTop};
    })
});


addEventListener("scroll", (event) => {
    if (!sections || !sections.length) return;

    const scrollTop = event.target.scrollingElement.scrollTop;

    if (Math.abs(lastScrollTop - scrollTop) > 10) {
        const activeSection = sections.reduce((a, c) => {
            // if((scrollTop + (window.innerHeight / 2) >= c.top && scrollTop + (window.innerHeight / 2) <= c.bottom)){
            //     console.log(c.id, scrollTop + (window.innerHeight / 2), c.top, scrollTop + (window.innerHeight / 2), c.bottom);
            // }

            return ((scrollTop + (window.innerHeight * (3 / 4)) >= c.top && scrollTop + (window.innerHeight * (1 / 4)) <= c.bottom) ? c : a)
        }, null);

        invisibleHomepageHeaderElement(document.querySelector('header.home h3'), activeSection);
        invisibleHomepageHeaderElement(document.querySelector('header.home a'), activeSection);


        if (activeSection) {

            if (activeSection.id === 'o-mne') {
                subheader.innerHTML = 'grafika';
            } else if (activeSection.id === 'interier') {
                subheader.innerHTML = 'interiér';
            } else {
                subheader.innerHTML = activeSection.id;
            }

        } else {
            subheader.innerHTML = 'design'
        }
    }
});


/**
 * img-flip
 */


Array.from(document.querySelectorAll(".img-flip")).forEach((flip) => {
    const images = Array.from(flip.querySelectorAll('figure'));
    let image = 0;
    setInterval(() => {
        image++;
        if (image >= images.length) image = 0;

        images.forEach((image) => image.classList.add('d-none'));
        images[image].classList.remove('d-none');

    }, flip.dataset.time ?? 5000);
})







