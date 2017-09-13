'use strict'
function init() {
    var doc = document
    var btn = doc.getElementById('btn')
    var content = doc.getElementById('content')
    btn.addEventListener('click', function () {
        var el = new FloatWindow()
        content.appendChild(el.element)
    }, false)
}

function FloatWindow() {
    //this.mouseDown = false
    this.confirm = function () {
        var { parentElement } = this.element
        parentElement.removeChild(this.element)
    }
    this.cancle = function () {
        var { parentElement } = this.element
        parentElement.removeChild(this.element)
    }
    /*this.touchStart = function () {
        console.log('鼠标按下');
    }
    this.touchMove = function () {
        if (!this.mouseDown) {
            return false
        }
        console.log('鼠标移动')
    }
    this.touchend = function () {
        console.log('鼠标松开')
    }*/
    this.element = (function () {
        var doc = document
        var container = doc.createElement('div')
        var win =  doc.createElement('div')
        var shadow = doc.createElement('div')
        container.className = 'container'
        shadow.className = 'shadow'
        shadow.onclick = this.cancle.bind(this)

        win.className = 'window'
        /*win.onmousedown = this.touchStart.bind(this)
        win.onmousemove = this.touchMove.bind(this)
        win.onmouseup = this.touchend.bind(this)*/
        
        var h2 = doc.createElement('h2')
        h2.innerText = '这是一个浮出层'
        h2.style.backgroundColor = '#ccc'
        win.appendChild(h2)

        var p1 = doc.createElement('p')
        p1.innerText = '这是一个浮出层'
        p1.style.height = '220px'
        win.appendChild(p1)

        var action = doc.createElement('div')
        action.className = 'action'

        var btnConfirm = doc.createElement('button')
        btnConfirm.innerText = '确认'
        btnConfirm.onclick = this.confirm.bind(this)
        action.appendChild(btnConfirm)

        var btnCancle = doc.createElement('button')
        btnCancle.innerText = '取消'
        btnCancle.onclick = this.cancle.bind(this)
        action.appendChild(btnCancle)

        win.appendChild(action)

        container.appendChild(shadow)
        container.appendChild(win)
        return container
    }.bind(this))()
}

init()
