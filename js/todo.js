/**
 * Created by jzy96 on 2018/3/3.
 */
// 定义一个 log 函数
var log=function(){
    console.log.apply(console, arguments)
}
// 用自己实现的 e 替代 document.querySelector
var e = function(selector) {
    return document.querySelector(selector)
}

// 给 add button 绑定添加 todo 事件
var addButton = e('#id-button-add')
addButton.addEventListener('click', function(){
// 获得 input.value
    var todoInput = e('#id-input-todo')
    var todo = todoInput.value;
// 添加到 container 中
    insertTodo(todo, false)
// 添加之后 保存todos
    saveTodos()
})

var insertTodo=function (todo,done) {
    //添加container
    var todoContainer = e('#id-div-container')
    var t = templateTodo(todo, done) /
    // / 这个方法用来添加元素 /
    // / 第一个参数 'beforeend' 意思是放在最后
    todoContainer.insertAdjacentHTML('beforeend', t);
}

var templateTodo=function (todo,done){
    var status=''
    if(done){
        status='done'
    }
    var t=` <div class='todo-cell ${status}'>
         <button class='todo-done'>完成</button> 
         <button class='todo-delete'>删除</button> 
         <span class='todo-content' contenteditable='true'>${todo}</span> 
         </div> 
`
    return t
}

// 问题在于todo都是运行的时候才添加的元素
// 对于这样的元素, 我们没办法实现绑定事件
// 我们可以把 click 事件绑定在事先存在的父元素上
// 然后在运行的时候检查被点击的对象(通过 event.target 属性) 判断是否是我们需要的对象, 这个概念就是事件委托

var todoContainer=e('#id-div-container')
//通过 event.target 的 class 来检查点击的是什么
todoContainer.addEventListener('click', function(event) {
    log('container click', event, event.target)
    var target = event.target
// classList.contains 可以检查元素是否有一个 class
    if (target.classList.contains('todo-done')) {
        log('done')
        // target.parentElement 用来获取按钮的父节点
        //给todo div 开关一个状态 class
        var todoDiv = target.parentElement
        toggleClass(todoDiv(), 'done')
        //保存todos
        saveTodos()
    }
})

// 这个函数用来开关一个元素的某个 class
var toggleClass = function(element, className) {
// 检查元素是否拥有某个 classs
    if (element.classList.contains(className)) {
        // 拥有则删除之
        element.classList.remove(className)
    } else {
        // 没有则加上
        element.classList.add(className)
    }
}
//时间
var now=function () {
    var d = new Date()
    var nian = d.getFullYear()
    var yue = d.getMonth()
    var ri=d.getDate()
    var shi=d.getHours()
    var fen=d.getMinutes()
    var miao=d.getSeconds()
    return`${nian}/${yue}/${ri} ${shi}:${fen}:${miao}`
}

localStorage.name="gua"
var s = JSON.stringify([1, 2, 3, 4])
log('序列化后的字符串', typeof s, s)
var a = JSON.parse(s)
log('反序列化后的数组', typeof a, a)
// 使用 JSON 序列化后, 就可以把 todo 存入浏览器的 localStorage 了

// 定义一个函数， 用于把 数组 写入 localStorage
var save = function(array) {
    var s = JSON.stringify(array)
    localStorage.todos = s
}
// 定义一个函数， 读取 localStorage 中的数据并解析返回
var load = function() {
    var s = localStorage.todos
    return JSON.parse(s)
}
var saveTodos = function() {
// 1 先选出所有的 content 标签
// 2 取出 todo
// 3 添加到一个 数组中
// 4 保存数组
    log('save todos')
    var contents = document.querySelectorAll('.todo-content')
    var todos = []
    for (var i = 0; i < contents.length; i++) {
        var c = contents[i]
        var done = c.parentElement.classList.contains('done')
        var todo = {done: done, content: c.innerHTML,}
        todos.push(todo)
    }
    save(todos)
}
    var loadTodos = function() {
        var todos = load()
        log('load todos', todos)
        // 添加到页面中
        for (var i = 0; i < todos.length; i++) {
            var todo = todos[i]
            insertTodo(todo.content, todo.done)
        }
    }
loadTodos()



