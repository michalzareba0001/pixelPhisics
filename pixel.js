window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const image1 = document.getElementById('image1');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = 50;
        }
        draw(context) {
            context.fillRect(this.x, this.y, this.size, this.size);
        }

    }

    class Effect {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.particlesArray = [];
        }
        init() {
            this.particlesArray.push(new Particle());
        }
        draw(context) {
            this.particlesArray.forEach((particle) =>
                particle.draw(context));
        }

    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.init();
    effect.draw(ctx);
    console.log('effect', effect);

    function animate() {

    }


});