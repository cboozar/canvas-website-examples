/**
 * Created by cboozarjomehri on 1/30/2018.
 */
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var circleArray = [];

var maxRadius = 50;

//Circle colors: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value
var colors = [
    'cornflowerblue',
    'dimgray',
    'lightgray',
    'orange',
    'purple'
];

//Adobe Palette Combos: https://color.adobe.com/explore/?filter=most-popular&time=month
// var colors = [
//     '#FFBC67',
//     '#DA727E',
//     '#AC6C82',
//     '#685C79',
//     '#455C7B'
// ];

var mouse = {
    x: undefined,
    y: undefined
};

window.addEventListener('mousemove',
    function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse);
    });

window.addEventListener('resize',
    function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.minRadius = radius;
    this.radius = radius;
    this.color = colors[Math.floor(Math.random() * colors.length)];

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();

    }

    this.update = function () {
        if (this.x + this.radius > innerWidth
            || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight
            || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        if (mouse.x - this.x < 50
            && mouse.x - this.x > -50
            && mouse.y - this.y < 50
            && mouse.y - this.y > -50
        ) {
            if (this.radius < maxRadius) {
                this.radius += 1;
            }
        } else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

function animate() {
    requestAnimationFrame(animate);

    //Clear the canvas
    c.clearRect(0, 0, innerWidth, innerHeight);

    //Update all circles
    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }

}

function init() {
    maxCircles = ((innerWidth * innerHeight) / (maxRadius * 10));

    console.log(maxCircles);

    if (maxCircles > 500) {
        maxCircles = 500;
    }

    for (var i = 0; i < maxCircles; i++) {
        circleArray.push(
            new Circle(
                Math.random() * innerWidth,
                Math.random() * innerHeight,
                (Math.random() - 0.5) * 8,
                (Math.random() - 0.5) * 8,
                1 + (Math.random() * 9)
            )
        )
    }

    animate();
    console.log('Made it here');
}

init();