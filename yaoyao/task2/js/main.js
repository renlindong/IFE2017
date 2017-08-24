// 储存用户的输入
let values = {
    name: '',
    password: '',
    repassword: '',
    email: '',
    phone: ''
}

// 储存正确输入后的tip
let valid = {
    name: '名称可用',
    password: '密码可用',
    repassword: '两次密码一致',
    email: '邮箱可用',
    phone: '手机号可用'
}

// 储存dom节点
let domList = {
    name: {},
    password: {},
    repassword: {},
    email: {},
    phone: {}
}

function init() {
    let form = document.getElementById('test-form')
    let input = form.getElementsByTagName('input')
    let btn = document.getElementById('submit')
    for (let index = 0; index < input.length; index++) {
        //遍历dom储存到domList
        let { parentElement, nextElementSibling : tipElement } = input[index]
        let field = input[index].getAttribute('field')
        domList[field].tipElement = tipElement
        domList[field].parentElement = parentElement
        
        //为每个input添加bulr事件
        input[index].addEventListener('blur', function (e) {
            values[field] = e.target.value.trim()
            if (verification(values)[field]){
                renderError(field)
            } else {
                renderVaild(field)
            }
        }, false)

        //为每个input添加focus事件
        input[index].addEventListener('focus', function (e) {
         if (!domList[field].isEdit) {
             domList[field].parentElement.style.border = '1px solid #1264ab'
             domList[field].tipElement.style.display = 'block'
             domList[field].isEdit = true
         }
        }, false)
    }
    btn.addEventListener('click', function (e) {
        e.preventDefault()
        let errors = verification(values)
        console.log(errors)
        //遍历errors，如果属性存在，则显示错误信息，如果没有则显示正确的信息
        for (var field in errors) {
            if (errors.hasOwnProperty(field)) {
                domList[field].tipElement.style.display = 'block'
                if (errors[field]) {
                    renderError(field)
                } else {
                    renderVaild(field)
                }
            }
        }
    }, false)
}

function renderError(field) {
    domList[field].parentElement.style.border = '1px solid red'
    domList[field].tipElement.style.color = 'red'
    domList[field].tipElement.innerText = verification(values)[field]
}

function renderVaild(field) {
    domList[field].parentElement.style.border = '1px solid green'
    domList[field].tipElement.style.color = 'green'
    domList[field].tipElement.innerText = valid[field]
}

//验证规则
function verification(values) {
    let phoneReg = /^1[3458]\d{9}$/
    let emailReg = /^([a-zA-Z_0-9-])+@([a-zA-Z_0-9-])+(.[a-zA-Z_0-9-])+$/
    let errors = {
        name: '',
        password: '',
        repassword: '',
        email: '',
        phone: ''
    }
    if (!values.name) {
        errors.name = '名称不能为空'
    } else if (values.name.length < 4 || values.name.length > 16) {
        errors.name = '长度请控制在4-16个字符之间'
    }
    if (!values.password) {
        errors.password = '请输入密码'
    }
    if (values.password.length < 6 || values.password.length >12) {
        errors.password = '密码长度请控制在6-12个字符之间'
    }
    if (values.password != values.repassword || !values.password) {
        errors.repassword = '两次密码不一致'
    }
    if (!values.email) {
        errors.email = '邮箱不能为空'
    }
    if (!emailReg.test(values.email) && values.email) {
        errors.email = '邮箱格式不对'
    }
    if (!values.phone) {
        errors.phone = '手机号不能为空'
    }
    if (!phoneReg.test(values.phone) && values.phone) {
        errors.phone = '手机号格式不对'
    }
    return errors
}
init()