window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            this.x = Math.random() * this.effect.width;
            this.y = Math.random() * this.effect.height;
            this.OriginX = Math.floor(x);
            this.OriginY = Math.floor(y);
            this.size = this.effect.gap;
            this.vx = 0;
            this.vy = 0;
            this.color = color;
            this.ease = 0.1;
            this.dx = 0;
            this.dy = 0;
            this.distance = 0;
            this.force = 0;
            this.angle = 0;
            this.friction = 0.92;
        }
        draw(context) {
            context.fillRect(this.x, this.y, this.size, this.size);
            context.fillStyle = this.color;
        }
        update() {
            this.dx = this.effect.anim.x - this.x;
            this.dy = this.effect.anim.y - this.y;
       
            this.dy = this.effect.anim.y - this.y;
            this.distance = (this.dx * this.dx + this.dy * this.dy);
            this.force = -this.effect.anim.radius / this.distance;

            this.x += (this.vx *= this.friction) + (this.OriginX - this.x) * this.ease;
            this.y += (this.vy *= this.friction) + (this.OriginY - this.y) * this.ease;

            if (this.distance < this.effect.anim.radius) {
                this.angle = Math.atan2(this.dy, this.dx);
                this.vx += this.force * Math.cos(this.angle);
                this.vy += this.force * Math.sin(this.angle);
            }
        }
        warp() {

            this.ease = 0.5;
        }

    }

    class Effect {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.particlesArray = [];
            this.image = document.getElementById('image1');
            this.centerx = this.width * 0.5;
            this.centery = this.height * 0.5;
            this.x = this.centerx - this.image.width * 0.5;
            this.y = this.centery - this.image.height * 0.5;
            this.gap = 2;
            this.mouse = {
                radius: 500,
                x: undefined,
                y: undefined
            };
            this.anim = {
                radius: 9000,
                x: 0,
                y: canvas.height/2
            }
            
            window.addEventListener('mousemove', (event) => {
                this.mouse.x = event.x;
                this.mouse.y = event.y;
            });
            
            setInterval(() => {
            if (this.anim.x<canvas.width) {
                this.anim.x += 40;
            }
            else {
                this.anim.x = 0;;
            }
            console.log(this.anim.y);
        }, 1000/60);

            
        }
        init(context) {
            context.drawImage(this.image, this.x, this.y,);
            const pixels = context.getImageData(0, 0, this.width, this.height).data;
            for (let y = 0; y < this.height; y += this.gap) {
                for (let x = 0; x < this.width; x += this.gap) {
                    const index = (y * this.width + x) * 4;
                    const red = pixels[index];
                    const green = pixels[index + 1];
                    const blue = pixels[index + 2];
                    const alpha = pixels[index + 3];
                    const color = 'rgb(' + red + ',' + green + ',' + blue + ')';

                    if (alpha > 0) {
                        this.particlesArray.push(new Particle(this, x, y, color));
                    }
                }

            }

        }
        draw(context) {
            this.particlesArray.forEach((particle) => particle.draw(context));
        }
        update() {
            this.particlesArray.forEach((particle) => particle.update());
        }
        warp() {
            this.particlesArray.forEach((particle) => particle.warp());
        }

    }

    const effect = new Effect(canvas.width, canvas.height);
    effect.init(ctx);


    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        effect.draw(ctx);
        effect.update();
        requestAnimationFrame(animate);
    }

    animate();

    //button

    const button = document.getElementById('WarpButton');
    button.addEventListener('click', function () {
        effect.warp();
    });

});

