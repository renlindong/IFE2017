'use strict'

function init() {
    var content = document.getElementById('content')
    let config = [
        {
            type: 'name',
            name: '姓名',
            needSort: false
        },
        {
            type: 'chineseGrade',
            name: '语文',
            needSort: true
        },
        {
            type: 'mathGrade',
            name: '数学',
            needSort: true
        },
        {
            type: 'englishGrade',
            name: '英语',
            needSort: false
        },
        {
            type: 'sum',
            name: '总分',
            needSort: true
        }
    ]
    let stu1 = new Student('rld', 99, 100, 60)
    let stu2 = new Student('cl', 80, 80, 70)
    let stu3 = new Student('lsc', 85, 90, 54)
    let stu4 = new Student('zed', 50, 77, 82)
    let stu5 = new Student('zed2', 80, 66, 99)
    let table = new Table([stu1, stu2, stu3, stu4, stu5], config)
    content.appendChild(table.renderTable())
}

function Table(data, config) {
    this.element = document.createElement('table')
    this.data = data
    this.sortUp = function (e) {
        let key = e.target.getAttribute('key')
        this.data.sort(function (prev, next) {
            return prev[key] - next[key]
        })
        this.renderData()
        
    }
    this.sortDown = function (e) {
        let key = e.target.getAttribute('key')
        this.data.sort(function (prev, next) {
            return -(prev[key] - next[key])
        })
        this.renderData()
    }
    this.renderData = function () {
        this.element.children[1].innerHTML = ''
        for (var index = 0, length = this.data.length; index < length; index++) {
            let tr = document.createElement('tr')
            let item = this.data[index]
            for (var key in item) {
                let td = document.createElement('td')
                td.innerText = item[key]
                tr.appendChild(td)
            }
            this.element.children[1].appendChild(tr)
        }
    }
    
    this.renderTable = function () {
        let doc = document
        let thead = doc.createElement('thead')
        let tbody = doc.createElement('tbody')
        let tr = doc.createElement('tr')
        tbody.id = 'container'
        tr.style.backgroundColor = '#000'
        tr.style.color = '#fff'
        for (let index = 0, length = config.length; index < length; index++) {
            let td = createTdNode(config[index].name)
            if (config[index].needSort) {
                //按钮父元素
                let div = doc.createElement('div')
                div.style.marginLeft = '5px'

                //升序
                let triangleUp = doc.createElement('div')
                triangleUp.className = 'triangle-up'
                triangleUp.setAttribute('key', config[index].type)
                triangleUp.addEventListener('click', function (e) {
                    this.sortUp(e)
                }.bind(this), false)

                //降序
                let triangleDown = doc.createElement('div')
                triangleDown.className = 'triangle-down'
                triangleDown.setAttribute('key', config[index].type)
                triangleDown.addEventListener('click', function (e) {
                    this.sortDown(e)
                }.bind(this), false)

                div.appendChild(triangleUp)
                div.appendChild(triangleDown)
                td.appendChild(div)
            }
            tr.appendChild(td)
        }
        thead.appendChild(tr)
        this.element.appendChild(thead)
        this.element.appendChild(tbody)
        this.renderData()
        return this.element
    }
}

function Student(name, chineseGrade, mathGrade, englishGrade) {
    this.name = name || 'rld'
    this.chineseGrade = chineseGrade || 0
    this.mathGrade = mathGrade || 0
    this.englishGrade = englishGrade || 0
    this.sum = this.chineseGrade + this.mathGrade + this.englishGrade
}

function createTrNode() {
    let tr = document.createElement('tr')
    return tr
}

function createTdNode(value) {
    let td = document.createElement('td')
    td.innerText = value
    return td
}

init()