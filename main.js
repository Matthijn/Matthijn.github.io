function debounce(func, timeout = 300){
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
}

window.addEventListener('load', (event) => {
    initPhysics()
    setupAnimation()
    unhideEmail()
});

if(!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
    window.onresize = debounce(function () {
        initPhysics()
    })
}

// Just to thwart the basic email collectors
function unhideEmail() {
    const emailLink = document.querySelector("[data-mail]")
    emailLink.addEventListener('mouseenter', () => {
        const data = emailLink.getAttribute("data-mail")
        const decoded = atob(data)
        emailLink.href = `mailto: ${decoded}`
    })
}