/**
 * Created by jzy96 on 2018/3/7.
 */
(function(){
    var $=function(id){return document.getElementById(id);}
    var Tasks = {
        show:function(obj){
            obj.className='';
            return this;
        },
        hide:function(obj){
            obj.className='hide';
            return this;
        },
        //存储dom
        $addItemDiv:$('addItemDiv'),
        $addItemInput:$('addItemInput'),
        $txtTaskTitle:$('txtTaskTitle'),

        $taskItemList:$('taskItemList'),
        $focus:$('focus'),
        //指针
        index:window.localStorage.getItem('Tasks:index'),
        //初始化
        init:function(){
            if(!Tasks.index){
                window.localStorage.setItem('Tasks:index',Tasks.index=0);
            }
            /*注册事件*/
            //打开添加文本框
            Tasks.$addItemDiv.addEventListener('click',function(){
                Tasks.show(Tasks.$addItemInput).hide(Tasks.$addItemDiv);
                Tasks.$txtTaskTitle.focus();
            },true);
            //回车添加
            Tasks.$txtTaskTitle.addEventListener('keyup',function(ev){
                var ev=ev || window.event;
                if(ev.keyCode==13){
                    var task={
                        id:0,
                        name:$('txtTaskTitle').value,
                        add_time:new Date(),

                    };
                    Tasks.Add(task);
                    Tasks.AppendHtml(task);
                    Tasks.$txtTaskTitle.value='';
                    Tasks.hide(Tasks.$addItemInput).show(Tasks.$addItemDiv);
                }
                ev.preventDefault();
            },true);
            //取消
            Tasks.$txtTaskTitle.addEventListener('blur',function(){
                Tasks.$txtTaskTitle.value='';
                Tasks.hide(Tasks.$addItemInput).show(Tasks.$addItemDiv);
            },true);
            //初始化数据
            if(window.localStorage.length-1){
                var task_list=[];
                var key;
                for(var i=0,len=window.localStorage.length;i<len;i++){
                    key=window.localStorage.key(i);
                    if(/task:\d+/.test(key)){
                        task_list.push(JSON.parse(window.localStorage.getItem(key)));
                    }
                }
                for(var i=0,len=task_list.length;i<len;i++){
                    Tasks.AppendHtml(task_list[i]);
                }
            }
        },
        //增加
        Add:function(task){
            //更新指针
            window.localStorage.setItem('Tasks:index', ++Tasks.index);
            task.id=Tasks.index;
            window.localStorage.setItem("task:"+ Tasks.index, JSON.stringify(task));
        },
        //修改
        Edit:function(task){
            window.localStorage.setItem("task:"+ task.id, JSON.stringify(task));
        },
        //删除
        Del:function(task){
            window.localStorage.removeItem("task:"+ task.id);
        },
        AppendHtml:function(task){
            var oDiv=document.createElement('div');
            oDiv.className='taskItem';
            oDiv.setAttribute('id','task_' + task.id);
            var addTime=new Date(task.add_time);
            var timeString=addTime.getMonth() + '-' + addTime.getDate() + ' ' + addTime.getHours() + ':' + addTime.getMinutes() + ':' + addTime.getSeconds();
           oDiv.setAttribute('title',timeString);
            var oLabel=document.createElement('label');
           oLabel.className= task.is_finished ? 'off' : 'on';
            var oSpan=document.createElement('span');
            oSpan.className='taskTitle';
            var oText=document.createTextNode(task.name);
            oSpan.appendChild(oText);
           oDiv.appendChild(oLabel);
            oDiv.appendChild(oSpan);
            Tasks.$taskItemList.appendChild(oDiv);
        },
    };
    Tasks.init();
})();
read();
$("#focus").keydown(function () {
    if(event.keyCode==13){

        var fo=document.getElementById('focus').value;
        $("input[id='focus']").val("").focus();
        window.localStorage.setItem("today",fo)}
    read();



})
function read() {
    var jinri=localStorage.getItem("today")
    if(jinri!=null)
    {document.getElementById("today").value=jinri};
}


