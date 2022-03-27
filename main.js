window.addEventListener('load', (event) => {
    initPhysics()
    setupFullPage()
    setupAnimation()
});

function setupFullPage() {
    new fullpage('#fullpage', {
        sectionsColor: ['#f624d', '#61b4ff', '#fbff0c', 'whitesmoke', '#ccddff']
    });
}
