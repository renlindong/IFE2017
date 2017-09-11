'use strict'
var direction = 0
var zhDirection = '上'
var topNumber = 150
var leftNumber = 150
function init() {
    var doc = document
    var turnLeft = doc.getElementById('left')
    var turnRight = doc.getElementById('right')
    var goAhead = doc.getElementById('go')

    var carBox = doc.getElementById('car-box')
    carBox.style.cssText = `top: ${topNumber}px; 
                            left: ${leftNumber}px;
                            transform: rotate(0deg)`
    //监听三个按钮
    turnLeft.addEventListener('click', function () {
        direction = changeDirection(carBox, -90)
    }, false)
    turnRight.addEventListener('click', function () {
        direction = changeDirection(carBox, 90)
    }, false)
    goAhead.addEventListener('click', function () {
        move(carBox)
    }, false)
}

function changeDirection(ele, deg) {
    if (!ele.style.transform) {
        ele.style.transform = `rotate(${deg}deg)`
    } else {
        ele.style.transform = `rotate(${direction + deg}deg)`
    }
    if ((direction + deg) % 360 === 0) {
        zhDirection = '上'
    } else if((direction + deg) / 90 === 1 || (direction + deg) / 90 === -3){
        zhDirection = '右'
    } else if((direction + deg) / 90 === -1 || (direction + deg) / 90 === 3) {
        zhDirection = '左'
    } else {
        zhDirection = '下'
    }
    if ((direction + deg) % 360 === 0) {
        return 0
    } else {
        return direction + deg
    }
}

function move(ele) {
    var { top: topNumber, left: leftNumber } = ele.style 
    topNumber = topNumber.slice(0, topNumber.indexOf('p')) / 1
    leftNumber = leftNumber.slice(0, leftNumber.indexOf('p')) / 1
    switch (zhDirection) {
        case '上':
            if (topNumber === 50) {
                console.log('上到顶了')
                return false
            }
            topNumber -= 50
            break;
        case '右':
            if (leftNumber === 450) {
                console.log('右到顶了')
                return false
            }
            leftNumber += 50
            break;
        case '下':
            if (topNumber === 450) {
                console.log('下到顶了')
                return false
            }
            topNumber += 50
            break;
        case '左':
            if (leftNumber === 50) {
                console.log('左到顶了')
                return false
            }
            leftNumber -= 50
            break;
        default:
            break;
    }
    ele.style.cssText += `top: ${topNumber}px;left: ${leftNumber}px;`
}


init()