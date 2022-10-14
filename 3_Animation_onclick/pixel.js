window.addEventListener('load', function () {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const explosion01 = new Audio('./explosion01.mp3');

    class Particle {
        constructor(effect, x, y, color) {
            this.effect = effect;
            this.x = x;
            this.y = y;
            this.OriginX = Math.floor(x);
            this.OriginY = Math.floor(y);
            this.size = this.effect.gap;
            this.vx = 0;
            this.vy = 0;
            this.color = color;
            this.ease = 0.8;
        }
        draw(context) {
            context.fillRect(this.x, this.y, this.size, this.size);
            context.fillStyle = this.color;
        }
        update() {
            this.x += (this.OriginX - this.x) * this.ease;
            this.y += (this.OriginY - this.y) * this.ease;
        }
        warp() {
            //explosion
            this.ease = Math.random() * 0.1 - 0.01;
            this.OriginX = (Math.random() * this.effect.width * 5) - this.effect.width * 2.5;
            this.OriginY = (Math.random() * this.effect.height * 5) - this.effect.height * 2.5;
        }

    }

    class Effect {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.particlesArray = [];
            this.image = document.getElementById('image1');
            this.centerx = this.width * 0.5;
            this.centery = (this.height * 0.5) -50;
            this.x = this.centerx - this.image.width * 0.5 - 0.9;
            this.y = this.centery - this.image.height * 0.5;
            this.gap = 2;
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
        explosion01.play();
        effect.warp();
    });

    // TIME

    const time = document.getElementById('time');
   

    function timer() {
        setInterval(function () {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            var timeZone = date.getTimezoneOffset() / 60;
            if (seconds < 10) {
                seconds = '0' + seconds;
            }
            if (minutes < 10) {
                minutes = '0' + minutes;
            }
            if (hours < 10) {
                hours = '0' + hours;
            }
            if (day < 10) {
                day = '0' + day;
            }
            if (month < 10) {
                month = '0' + month;
            }
           
            time.innerHTML = year + '/' + month + '/' + day + ' ' + hours + ':' + minutes + ':' + seconds + ' UTC: ' + timeZone;
        }, 100);
    }

    timer();



});


