'use strict'

function init() {
    var doc = document
    var table = doc.getElementById('table')
    var action = doc.getElementById('action')
    var rob = new Robot(150, 150)
    table.appendChild(rob.element)
    action.addEventListener('click', function (e) {
        if (e.target.tagName.toLowerCase() === 'button') {
            rob.go(e.target.getAttribute('key'))
        }
    }, false)
    rob.element.addEventListener('transitionend', function (e) {
        if (e.propertyName === "transform"){
            e.target.style.borderRadius = "0"
          }
    }, false)
}

function Robot(x, y) {
    this.element = creatRobotDom(x, y)
    this.x = x
    this.y = y
    this.direction = 0
    this.face = 0
    this.changeDirection = function (deg) {
        if (!this.element.style.transform) {
            this.element.style.transform = `rotate(${deg}deg)`
        } else {
            this.element.style.transform = `rotate(${this.direction + deg}deg)`
        }
        this.element.style.borderRadius = '50%'
        this.direction += deg
    }
    this.go = function (action) {
        switch (action) {
            case 'tra-top':
                this.toTop()
                break;
            case 'tra-left':
                this.toLeft()
                break;
            case 'tra-bottom':
                this.toBottom()
                break;
            case 'tra-right':
                this.toRight()
                break;
            case 'move-top':
                if (this.face === 0) {
                    this.toTop()
                } else {
                    if (this.face === 1) {
                        this.changeDirection(-90)
                    } else {
                        this.changeDirection((4 - this.face) * 90)
                    }
                    this.toTop()
                    this.face = 0
                }
                console.log(this.direction)
                break;
            case 'move-left':
                if (this.face === 3) {
                    this.toLeft()
                } else {
                    if (this.face === 0) {
                        this.changeDirection(-90)
                    } else {
                        this.changeDirection((3-this.face) * 90)
                    }
                    this.toLeft()
                    this.face = 3
                }
                console.log(this.direction)
                break;
            case 'move-bottom':
                if (this.face === 2) {
                    this.toBottom()
                } else {
                    if (this.face === 3) {
                        this.changeDirection(-90)
                    } else {
                        this.changeDirection((2 - this.face) * 90)
                    }
                    this.toBottom()
                    this.face = 2
                }
                console.log(this.direction)
                break;
            case 'move-right':
                if (this.face === 1) {
                    this.toRight()
                } else {
                    if (this.face === 2) {
                        this.changeDirection(-90)
                    } else {
                        this.changeDirection(Math.abs(1 - this.face) * 90)
                    }
                    setTimeout(function () {
                        this.toRight()
                    }.bind(this), 1000)
                    //this.toRight()
                    this.face = 1
                }
                console.log(this.direction)
                break;
            default:
                break;
        }
    }
    this.toTop = function () {
        if (this.y === 50) {
            return false
        }
        this.y -= 50
        this.element.style.top = `${this.y}px`
    }
    this.toLeft = function () {
        if (this.x === 50) {
            return false
        }
        this.x -= 50
        this.element.style.left = `${this.x}px`
    }
    this.toBottom = function () {
        if (this.y === 450) {
            return false
        }
        this.y += 50
        this.element.style.top = `${this.y}px`
    }
    this.toRight = function () {
        if (this.x === 450) {
            return false
        }
        this.x += 50
        this.element.style.left = `${this.x}px`
    }
}

function creatRobotDom(x, y) {
    var element = document.createElement('div')
    var headStock = document.createElement('div')
    element.className = 'bg-red'
    element.style.cssText = `top: ${y}px; left: ${x}px;`
    headStock.className = 'stock'
    element.appendChild(headStock)
    return element
}

init()
