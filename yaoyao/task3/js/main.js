'use strict'
// 定义在校生的信息，以及默认选项
var choice = 'student'
var aqiData = [
    {
        name: '北京',
        univerSitys: [
            '北京大学',
            '清华大学',
            '北京邮电大学',
            '北京师范大学',
        ]
    },
    {
        name: '上海',
        univerSitys: [
            '上海大学',
            '复旦大学',
            '上海交通大学'
        ]
    },
    {
        name: '西安',
        univerSitys: [
            '西安电子科技大学',
            '西安交通大学',
            '西北大学',
            '西北政法大学'
        ]
    }
]
var selectCityIndex = 0
//var selectUniverSityIndex = 0
var cityDom = document.getElementById('city')
var univerSitysDom = document.getElementById('university')
function init() {
    var doc = document
    var isStudent = doc.getElementById('isStudent')
    var isSocial = doc.getElementById('isSocial')
    var isStudentDom = doc.getElementById('student')
    var isSocialDom = doc.getElementById('social')

    //切换在校生与非在校生的选择状态，控制显示与隐藏
    isStudent.addEventListener('click', function () {
        if (choice === 'student') {
            return false
        }
        choice = 'student'
        isStudentDom.style.display = 'block'
        isSocialDom.style.display = 'none'
        renderCityDom()
    }, false)
    isSocial.addEventListener('click', function () {
        if (choice === 'social') {
            return false
        }
        choice = 'social'
        isStudentDom.style.display = 'none'
        isSocialDom.style.display = 'block'
    }, false)
    /*  监听city，university的改变，当改变城市时，修改全局变量selectedCityIndex的值，更新universitys的数据。
        当改变大学时，则只需要改变全局变量selectUniverSityIndex的值 
    */
    cityDom.addEventListener('change', function (e) {
        selectCityIndex = e.target.selectedIndex
        renderUniverSitysDom()
    }, false)
    /*univerSitysDom.addEventListener('change', function (e) {
        selectUniverSityIndex  = e.target.selectedIndex
    }, false)*/
    //渲染初始状态
    isStudentDom.style.display = 'block'
    renderCityDom()
}

function renderCityDom() {
    var cityTempHtml = ''
    for (var outer = 0, outerLength = aqiData.length; outer < outerLength; outer++) {
        cityTempHtml += `<option>${ aqiData[outer].name }</option>`
        if (outer === selectCityIndex) {
            renderUniverSitysDom()
        }
    }
    city.innerHTML = cityTempHtml
}

function renderUniverSitysDom() {
    var { univerSitys } = aqiData[selectCityIndex]
    var univerSitysTempHtml = ''
    for (var index = 0, length = univerSitys.length; index < length; index++) {
        univerSitysTempHtml += `<option>${ univerSitys[index] }</option>`    
    }
    univerSitysDom.innerHTML = univerSitysTempHtml
}

init()