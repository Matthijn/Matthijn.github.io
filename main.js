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
});

if(!/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
    window.onresize = debounce(function () {
        initPhysics()
    })
}