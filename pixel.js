window.addEventListener('load', function() { 
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const image1 = document.getElementById('image1');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(){
            this.x = 100;
            this.y = 100;
            this.size = 50;
        }
        draw(){
            ctx.fillRect(this.x, this.y, this.size, this.size);
        }

    }

    class Effect {
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.particlesArray = [];
        }
        init(){
            this.particlesArray.push(new Particle());
        }


    }

    const particle1 = new Particle();
    particle1.draw();

    function animate() { 

    }


});