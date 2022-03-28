function setupAnimation() {
    setupDevTextAnimation()
}

function setupDevTextAnimation() {
    // Wrap every letter in a span
    var textWrapper = document.querySelector('.ml11 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/([^\x00-\x80]|\w)/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: false})
        .add({
            targets: '.ml11 .line',
            scaleY: [0,1],
            opacity: [0.5,1],
            easing: "easeOutExpo",
            duration: 700
        })
        .add({
            targets: '.ml11 .line',
            translateX: [0, document.querySelector('.ml11 .letters').getBoundingClientRect().width + 10],
            easing: "easeOutExpo",
            duration: 2100,
            delay: 0
        }).add({
        targets: '.ml11 .letter',
        opacity: [0,1],
        easing: "easeOutExpo",
        duration: 600,
        offset: '-=2000',
        delay: (el, i) => 34 * (i+1)
    });

    setTimeout(() => {
        anime.timeline({ loop: true })
            .add({
                targets: '.ml11 .line',
                opacity: 0,
                duration: 0,
                easing: "easeOutExpo",
                delay: 500
            })
            .add({
                targets: '.ml11 .line',
                opacity: 1,
                duration: 0,
                easing: "easeOutExpo",
                delay: 500
            })
    }, 2500)
}