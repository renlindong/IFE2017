function init() {
    var verify = document.getElementById('verify')
    verify.addEventListener('click', function () {
        var input = document.getElementsByClassName('input')[0]
        var value = document.getElementById('input').value.trim()
        var tip = document.getElementsByClassName('tip')[0]
        var result = verifyFun(value)
        if (!result) {
            tip.innerText = '名称格式正确'
            tip.classList.add('green')
            tip.classList.remove('red')
            input.classList.remove('red-border')
            input.classList.add('green-border')
        } else {
            tip.innerText = result.name
            tip.classList.add('red')
            tip.classList.remove('green')
            input.classList.remove('green-border')
            input.classList.add('red-border')
        }
    }, false)
}

function verifyFun(value) {
    var error = {}
    var length = 0
    if (!value) {
        error.name = '姓名不能为空'
        return error
    }
    for (var index = 0; index < value.length; index++) {
        if (value.charCodeAt(index) > 255) {
            length += 2
        } else {
            length ++
        }
    }
    if (length > 16 || length < 4) {
        error.name = '姓名长度在4-16个字符'
        return error
    }
    return false
}
init()