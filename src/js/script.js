Array.from(document.querySelectorAll('a')).forEach((a) => {
    a.addEventListener('click', (e) => {
        const href = e.target.closest('a').href.replace(window.location.origin + window.location.pathname, '');

        if(href === "#home"){
            window.scrollTo({ top: 0, behavior: 'smooth' });
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

    if(!optionalBackground) return;

    if (scrollTop >= height - 68) {
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

/**
 * dynamicka h2-ka na homepage
 *
 */


let sections = null;
const lastScrollTop = document.body.scrollTop;

const subheader = document.querySelector('header>h2');

addEventListener("resize", (event) => {
    sections = Array.from(document.querySelectorAll('main>section')).map((section) => {
        const {top, bottom} = section.getBoundingClientRect();
        return {id: section.id, top, bottom};
    })
});

addEventListener("load", (event) => {
    sections = Array.from(document.querySelectorAll('main>section')).map((section) => {
        const {top, bottom} = section.getBoundingClientRect();
        return {id: section.id, top, bottom};
    })
});

addEventListener("scroll", (event) => {
    if (!sections || !sections.length) return;

    const scrollTop = event.target.scrollingElement.scrollTop;

    if (Math.abs(lastScrollTop - scrollTop) > 10) {
        const activeSection = sections.reduce((c, a) => ((scrollTop + window.innerHeight >= a.top && scrollTop <= a.bottom) ? a : c), null);

        if (activeSection) {
            subheader.innerHTML = activeSection.id;
        } else {
            subheader.innerHTML = 'design'
        }
    }
});