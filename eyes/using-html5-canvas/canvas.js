/**
 * Created by cboozarjomehri on 2/1/2018.
 */
var irisColors = [
    'red', 'maroon', 'firebrick',
    'yellow', 'olive', 'gold',
    'green', 'darkolivegreen', 'forestgreen',
    'cornflowerblue', 'navy', 'teal'];

var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var eyeArray = [];

var c = canvas.getContext('2d');
c.fillStyle = 'black';
c.fillRect(0, 0, canvas.width, canvas.height);

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

function Eye(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.irisColor = irisColors[Math.floor(Math.random() * irisColors.length)];
    this.irisRadius = 15 / 25 * this.height;
    this.pupilRadius = 7 / 25 * this.height;


    this.drawWhiteOfEye = function () {
        xStart = this.x - (this.width / 2);
        c.beginPath();
        //Eye Top
        c.moveTo(
            xStart, this.y);
        c.bezierCurveTo(
            xStart + ((10 / 70) * this.width), this.y,
            xStart + ((15 / 70) * this.width), this.y - (this.height * (10 / 25)),
            xStart + ((20 / 70) * this.width), this.y - (this.height * (15 / 25)));
        c.bezierCurveTo(
            xStart + ((30 / 70) * this.width), this.y - this.height,
            xStart + ((40 / 70) * this.width), this.y - this.height,
            xStart + ((50 / 70) * this.width), this.y - (this.height * (15 / 25)));
        c.bezierCurveTo(
            xStart + ((55 / 70) * this.width), this.y - (this.height * (10 / 25)),
            xStart + ((60 / 70) * this.width), this.y,
            xStart + this.width, this.y);

        //Eye Bottom
        c.moveTo(
            xStart, this.y);
        c.bezierCurveTo(
            xStart + ((10 / 70) * this.width), this.y,
            xStart + ((15 / 70) * this.width), this.y + (this.height * (10 / 25)),
            xStart + ((20 / 70) * this.width), this.y + (this.height * (15 / 25)));
        c.bezierCurveTo(
            xStart + ((30 / 70) * this.width), this.y + this.height,
            xStart + ((40 / 70) * this.width), this.y + this.height,
            xStart + ((50 / 70) * this.width), this.y + (this.height * (15 / 25)));
        c.bezierCurveTo(
            xStart + ((55 / 70) * this.width), this.y + (this.height * (10 / 25)),
            xStart + ((60 / 70) * this.width), this.y,
            xStart + this.width, this.y);

        c.closePath();
        c.stroke();
        c.fillStyle = 'white';
        c.fill();
    }

    this.drawIris = function (x, y) {
        theta = Math.atan((mouse.y - this.y) / (mouse.x - this.x));

        dx = mouse.x;
        dy = mouse.y;

        if (mouse.x >= this.x) {
            xMax = this.x + ((this.height - this.irisRadius) * Math.cos(theta) / 2);
            yMax = this.y + ((this.height - this.irisRadius) * Math.sin(theta) / 2);

            if (dx > xMax) {
                dx = xMax;
            }
            if (dy > this.y && dy > yMax) {
                dy = yMax;
            }
            if (dy < this.y && dy < yMax) {
                dy = yMax;
            }
        } else {
            xMax = this.x - ((this.height - this.irisRadius) * Math.cos(theta) / 2);
            yMax = this.y - ((this.height - this.irisRadius) * Math.sin(theta) / 2);

            if (dx < xMax) {
                dx = xMax;
            }
            if (dy > this.y && dy > yMax) {
                dy = yMax;
            }
            if (dy < this.y && dy < yMax) {
                dy = yMax;
            }
        }

        c.beginPath();
        // c.arc(this.x, this.y, this.irisRadius,
        c.arc(dx, dy, this.irisRadius,
            0, Math.PI * 2, false);
        c.fillStyle = this.irisColor;
        c.fill();
        this.drawPupil(dx, dy);
    }

    this.drawPupil = function (x, y) {
        theta = Math.atan((mouse.y - this.y) / (mouse.x - this.x));
        dx = mouse.x;
        dy = mouse.y;

        if (mouse.x >= this.x) {
            xMax = x + ((this.irisRadius - this.pupilRadius) * Math.cos(theta) / 4);
            yMax = y + ((this.irisRadius - this.pupilRadius) * Math.sin(theta) / 4);

            if (dx > xMax) {
                dx = xMax;
            }
            if (dy > y && dy > yMax) {
                dy = yMax;
            }
            if (dy < y && dy < yMax) {
                dy = yMax;
            }
        } else {
            xMax = x - ((this.irisRadius - this.pupilRadius) * Math.cos(theta) / 4);
            yMax = y - ((this.irisRadius - this.pupilRadius) * Math.sin(theta) / 4);

            if (dx < xMax) {
                dx = xMax;
            }
            if (dy > y && dy > yMax) {
                dy = yMax;
            }
            if (dy < y && dy < yMax) {
                dy = yMax;
            }
        }
        c.beginPath();
        // c.arc(this.x, this.y, this.pupilRadius,
        c.arc(dx, dy, this.pupilRadius,
            0, Math.PI * 2, false);
        c.fillStyle = 'white';
        c.fill();
    }

    this.update = function () {
        this.drawWhiteOfEye();
        this.drawIris();
    };
};

function XLEye(x, y) {
    return new Eye(x, y, 350, 125)
};

function LgEye(x, y) {
    return new Eye(x, y, 280, 100)
};

function MdEye(x, y) {
    return new Eye(x, y, 210, 75)
};

function SmEye(x, y) {
    return new Eye(x, y, 140, 50)
};

function XSEye(x, y) {
    return new Eye(x, y, 70, 25)
};

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    c.fillStyle = 'black';
    c.fillRect(0, 0, canvas.width, canvas.height);

    eyeArray.forEach(function (eye) {
        eye.update();
    });
    // // eye.update();
    // lgEye.update();
    // medEye.update();
    // smlEye.update();
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function init() {
    for (y = getRandomInt(40, 100); y < canvas.height - 100; y += 150) {
        for (x = getRandomInt(100, 200); x < canvas.width - 200; x += 220) {
            x += getRandomInt(10, 50);
            switch (getRandomInt(1, 4)) {
                case 1:
                    eyeArray.push(new MdEye(x, y + getRandomInt(20, 80)));
                    break;
                case 2:
                    eyeArray.push(new SmEye(x, y + getRandomInt(20, 80)));
                    break;
                case 3:
                    eyeArray.push(new XSEye(x, y + getRandomInt(20, 80)));
                    break;
                default:

            }
        }
    }

    // eyeArray.push(new XLEye(200, 200));
    // eyeArray.push(new LgEye(50, 400));
    // eyeArray.push(new MdEye(400, 75));
    // eyeArray.push(new SmEye(50, 50));
    // eyeArray.push(new XSEye(400, 400));

    animate();
}

init();
