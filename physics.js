document.addEventListener('mousemove', trackMousePosition, false);

let mpx = 0, mpy = 0;
function trackMousePosition(event) {
    mpx = event.clientX
    mpy = event.clientY
}

const KnownTech = [
    "aws",
    "mongo",
    "docker",
    "kubernetes",
    "git",
    "java",
    "javascript",
    "mysql",
    "nodejs",
    "php",
    "react",
    "swift",
    "typescript",
    "objectivec",
    "wordpress",
    "laravel",
    "jenkins",
    "html",
    "css"
]

let options = calculateWindowSize()

function calculateWindowSize() {
    return {
        width: window.innerWidth,
        height: window.innerHeight,
        scale: window.innerWidth <= 428 && 0.5 || 1
    }
}

function initPhysics() {
    options = calculateWindowSize()

    const Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        Body = Matter.Body,
        Events = Matter.Events,
        Composite = Matter.Composite,
        Mouse = Matter.Mouse;

    const engine = Engine.create({
        gravity: {
            y: 0,
            x: 0
        }
    });

    const root = document.querySelector("#knownTech")
    root.innerHTML = ""

    const render = Render.create({
        element: root,
        engine: engine,
        options: {
            ...options,
            wireframes: false,
            background: "#ff624d"
        }
    });

    const bodies = KnownTech.map(createTechBody)
    const attractor = createAttractor(render)

    Composite.add(engine.world, bodies);
    Composite.add(engine.world, attractor)

    // run the renderer
    Render.run(render);

    // create runner
    const runner = Runner.create();

    // run the engine
    Runner.run(runner, engine);

    Events.on(runner, 'afterTick', () => applyAttraction(attractor, bodies))
}

function createTechBody(sprite) {
    const Bodies = Matter.Bodies

    const
        width = 100 * options.scale,
        height = 100 * options.scale,
        cornerRadius = 40 * options.scale

    const spriteSize = 256
    const spriteScale = width/spriteSize

    return  Bodies.rectangle(Math.random() * (options.width - width) + width, Math.random() * (options.height - height) + height, width, height, {
        chamfer: { radius: cornerRadius * spriteScale },
        render: {
            sprite: {
                texture: `/assets/tech/${sprite}.png`,
                xScale: spriteScale,
                yScale: spriteScale
            }
        }
    });
}

function createAttractor(render) {
    const Bodies = Matter.Bodies

    const scale = 0.75 * options.scale

    return Bodies.rectangle(
        render.options.width / 2 + options.width / 4,
        render.options.height / 2 + options.height / 4,
        256 * scale,
        256 * scale,
        {
            isStatic: true,
            chamfer: { radius: 40 * scale },
            render: {
                sprite: {
                    texture: "/assets/dev.png",
                    xScale: scale,
                    yScale: scale
                }
            }
        }
    );

}

function applyAttraction(attractor, bodies) {
    const Body = Matter.Body

    const attractionGravity = 0.003
    const attractorSpeed = 0.0025
    const mouseSpeed = 0.007

    const edge = 20

    const mouseInWindow = mpx > edge && mpy > edge && mpx + edge < window.innerWidth && mpy + edge < window.innerHeight

    if (mouseInWindow) {
        Body.translate(attractor, {
            x: (mpx - attractor.position.x) * mouseSpeed * options.scale,
            y: (mpy - attractor.position.y) * mouseSpeed * options.scale
        });
    }
    else {
        Body.translate(attractor, {
            x: ((options.width / 2) + options.width / 4 - attractor.position.x) * 0.025 * options.scale,
            y: (options.height / 2 + options.height / 4 - attractor.position.y) * 0.025 * options.scale
        });
    }

    const ax = attractor.position.x
    const ay = attractor.position.y

    for(const body of bodies) {
        const bx = body.position.x
        const by = body.position.y

        const xDirection = bx > ax && -attractionGravity || attractionGravity

        const yDirection = by > ay && -attractionGravity || attractionGravity

        Body.applyForce(body, body.position, {
            x: xDirection * options.scale, y: yDirection * options.scale
        })
    }
}