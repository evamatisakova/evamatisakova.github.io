Array.from(document.querySelectorAll('a')).forEach((a) => {
    a.addEventListener('click', (e) => {
        console.log(window.location)
        console.log('click', e.target.href);
        console.log(e.target.href.replace(window.location.origin, ''));

        const href = e.target.href.replace(window.location.origin + window.location.pathname, '');

        if(href.indexOf('#') === 0){


            var element = document.querySelector(href);
            if(element){
                element.scrollIntoView({ behavior: 'smooth'});
                e.preventDefault();
            }

// smooth scroll to element and align it at the bottom


        }
    })
})



let sections = null;

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



const lastScrollTop = document.body.scrollTop;

console.log({lastScrollTop});
console.log(document.body.scrollHeight);
console.log(document.body.clientHeight);

addEventListener("scroll", (event) => {
    if(!sections) return;


    const scrollTop = event.target.scrollingElement.scrollTop;



    if (Math.abs(lastScrollTop - scrollTop) > 10) {
        const activeSection = sections.reduce((c, a) => ((scrollTop + window.innerHeight >= a.top && scrollTop <= a.bottom) ? a : c), null);
        const innerHeight = window.innerHeight;
        const jozko = scrollTop + window.innerHeight;
        console.log({scrollTop, innerHeight, jozko});
        console.log(activeSection?.id ?? null);
        console.log(sections);

        if (activeSection) {
            subheader.innerHTML = activeSection.id;
        } else {
            subheader.innerHTML = 'design'
        }

    }

    // var b = element.scrollHeight - element.clientHeight;


});