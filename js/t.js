
/**
 * Created by jzy96 on 2018/3/5.
 */
var setting = {
    view: {
        //addHoverDom: addHoverDom,
       // removeHoverDom: removeHoverDom,
        selectedMulti: false,
      //  fontCss: setFontCss


    },
    edit: {
        enable: true,
        editNameSelectAll: true,
        showRemoveBtn: showRemoveBtn,
        showRenameBtn: showRenameBtn

    },
    data: {
        keep: {
            parent:true,
            leaf:false
        },
        simpleData: {
            enable: true
        }
    },
    callback: {
        beforeDrag: beforeDrag,
        beforeDrop: beforeDrop,
        beforeEditName: beforeEditName,
        beforeRemove: beforeRemove,
        beforeRename: beforeRename,
        onRemove: onRemove,
        onRename: onRename,
      // beforeClick: beforeClick,
      //onClick:onClick,
       //  beforeRightClick: beforeRightClick,
        //onRightClickClick:onRightClickClick
    }
};

var zNodes=localStorage.getItem("zNodes");
zNodes =JSON.parse(zNodes);

var log, className = "dark";

function beforeRightClick(treeId, treeNode, clickFlag) {
    return (treeNode.isParent != true);
}
 function onRightClickClick(event, treeId, treeNode) {
     if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
         showRMenu("root", event.clientX, event.clientY);
     } else if (treeNode && !treeNode.noR) {
         showRMenu("node", event.clientX, event.clientY);
     }
 }
//显示右键菜单
function showRMenu(type, x, y) {
    $("#rMenu ul").show();
    rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"}); //设置右键菜单的位置、可见
    $("body").bind("mousedown", onBodyMouseDown);
}
//隐藏右键菜单
function hideRMenu() {
    if (rMenu) rMenu.css({"visibility": "hidden"}); //设置右键菜单不可见
    $("body").unbind("mousedown", onBodyMouseDown);
}
//鼠标按下事件
function onBodyMouseDown(event){
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
        rMenu.css({"visibility" : "hidden"});
    }
}
//function beforeDrag(treeId, treeNodes) {
  //  return false;
//}

/*
function beforeClick(treeId, treeNode, clickFlag) {
    return (treeNode.isParent != true);

}

function onClick(event, treeId, treeNode) {
    var pri;
    var Count3 = JSON.parse(localStorage.getItem("Count3"));
    if (Count3 == null) {
        Count3 = 1;
    }
     var nodes=treeNode.name;
    $("#name").val=nodes;
  //  $("#name").val(treeNode.name);

    $("#pri").keydown(function (event) {
        if (event.keyCode == 13) {
            pri = $("#pri").val();
            localStorage.setItem("pri", pri);

            pri = localStorage.getItem("pri");


           // priority = String(priority);
            localStorage.setItem("TASK" + Count3, priority);
            $("input[id='pri']").val("").focus();
            Count3++;
            localStorage.setItem("Count3", Count3);
        }
    })
}
*/
function beforeEditName(treeId, treeNode) {
    className = (className === "dark" ? "":"dark");
    showLog("[ "+getTime()+" beforeEditName ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.selectNode(treeNode);
    setTimeout(function() {
        if (confirm("进入节点 -- " + treeNode.name + " 的编辑状态吗？")) {
            setTimeout(function() {
                zTree.editName(treeNode);
            }, 0);
        }
    }, 0);
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var str=[];
    var nodes = treeObj.transformToArray(treeObj.getNodes());
    for(var p in nodes)
    {   if(nodes[p].isParent){
        str.push("{"+"\"id\":"+ nodes[p].id+",\"pId\":"+nodes[p].pId+",\"name\":"+"\""+nodes[p].name+"\""+","+"\"isParent\":true"+"}")
    }else{
        str.push("{"+"\"id\":"+ nodes[p].id+",\"pId\":"+nodes[p].pId+",\"name\":"+"\""+nodes[p].name+"\"" +"}")}
        if(p>0)
        {str[p]=str[p]+","+str[p-1]}
    }var test=String("["+str[p]+"]");
    localStorage.setItem("zNodes",test)
}
function beforeRemove(treeId, treeNode) {
    className = (className === "dark" ? "":"dark");
    showLog("[ "+getTime()+" beforeRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.selectNode(treeNode);
   confirm("确认删除 节点 -- " + treeNode.name + " 吗？")
    return true;
}
function onRemove(e, treeId, treeNode) {
    showLog("[ "+getTime()+" onRemove ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name);
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        var str=[];
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        for(var p in nodes)
        {    if(nodes[p].isParent){
            str.push("{"+"\"id\":"+ nodes[p].id+",\"pId\":"+nodes[p].pId+",\"name\":"+"\""+nodes[p].name+"\""+","+"\"isParent\":true"+"}")
        }else{
            str.push("{"+"\"id\":"+ nodes[p].id+",\"pId\":"+nodes[p].pId+",\"name\":"+"\""+nodes[p].name+"\"" +"}")}
            if(p>0)
            {str[p]=str[p]+","+str[p-1]}
        }var test=String("["+str[p]+"]");
        localStorage.setItem("zNodes",test);
}
function beforeRename(treeId, treeNode, newName, isCancel) {
    className = (className === "dark" ? "":"dark");
    showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" beforeRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
    if (newName.length == 0) {
        setTimeout(function() {
            var zTree = $.fn.zTree.getZTreeObj("treeDemo");
            zTree.cancelEditName();
            alert("节点名称不能为空.");
        }, 0);
        return false;
    }
    return true;
}
function onRename(e, treeId, treeNode, isCancel) {
    showLog((isCancel ? "<span style='color:red'>":"") + "[ "+getTime()+" onRename ]&nbsp;&nbsp;&nbsp;&nbsp; " + treeNode.name + (isCancel ? "</span>":""));
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var str=[];
    var nodes = treeObj.transformToArray(treeObj.getNodes());
    for(var p in nodes)
    {    if(nodes[p].isParent){
        str.push("{"+"\"id\":"+ nodes[p].id+",\"pId\":"+nodes[p].pId+",\"name\":"+"\""+nodes[p].name+"\""+","+"\"isParent\":true"+"}")
    }else{
        str.push("{"+"\"id\":"+ nodes[p].id+",\"pId\":"+nodes[p].pId+",\"name\":"+"\""+nodes[p].name+"\"" +"}")}
        if(p>0)
        {str[p]=str[p]+","+str[p-1]}
    }var test=String("["+str[p]+"]");
    localStorage.setItem("zNodes",test)
}
function showRemoveBtn(treeId, treeNode) {

   return true;
}
function showRenameBtn(treeId, treeNode) {
    return true;
}
function showLog(str) {
    if (!log) log = $("#log");
    log.append("<li class='"+className+"'>"+str+"</li>");
    if(log.children("li").length > 8) {
        log.get(0).removeChild(log.children("li")[0]);
    }
}
function getTime() {
    var now= new Date(),
        h=now.getHours(),
        m=now.getMinutes(),
        s=now.getSeconds(),
        ms=now.getMilliseconds();
    return (h+":"+m+":"+s+ " " +ms);
}

function beforeDrag(treeId, treeNodes) {
    for (var i=0,l=treeNodes.length; i<l; i++) {
        if (treeNodes[i].drag === false) {
            return false;
        }
    }
    return true;
}
function beforeDrop(treeId, treeNodes, targetNode, moveType) {
    return targetNode ? targetNode.drop !== false : true;
}



function add(e) {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
        isParent = e.data.isParent,
        nodes = zTree.getSelectedNodes(),
        treeNode = nodes[0];

    if (treeNode) {
        var Count1 = JSON.parse(localStorage.getItem("Count1"));
        if(Count1==null){
            Count1=1;}
        treeNode = zTree.addNodes(treeNode, {id:(treeNode.id + Count1), pId:treeNode.id, isParent:isParent, name:"new node"});//增加子节点
       Count1++;
        localStorage.setItem("Count1",Count1);
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        var str=[];
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        for(var p in nodes)
        {   if(nodes[p].isParent){
            str.push("{"+"\"id\":"+ nodes[p].id+",\"pId\":"+nodes[p].pId+",\"name\":"+"\""+nodes[p].name+"\""+","+"\"isParent\":true"+"}")
        }else{
            str.push("{"+"\"id\":"+ nodes[p].id+",\"pId\":"+nodes[p].pId+",\"name\":"+"\""+nodes[p].name+"\"" +"}")}
            if(p>0)
            {str[p]=str[p]+","+str[p-1]}
        }var test=String("["+str[p]+"]");
        localStorage.setItem("zNodes",test);


    } else {
        var Count2 = JSON.parse(localStorage.getItem("Count2"));//母结点
        if(Count2==null){
            Count2=1;}
        treeNode = zTree.addNodes(null, {id:(Count2), pId:0, isParent:isParent, name:"new node" }); //增加母结点
        Count2++;
        localStorage.setItem("Count2",Count2);
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        var str=[];
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        for(var p in nodes)
        {   if(nodes[p].isParent){
            str.push("{"+"\"id\":"+ nodes[p].id+",\"pId\":"+nodes[p].pId+",\"name\":"+"\""+nodes[p].name+"\""+","+"\"isParent\":true"+"}")
        }else{
            str.push("{"+"\"id\":"+ nodes[p].id+",\"pId\":"+nodes[p].pId+",\"name\":"+"\""+nodes[p].name+"\""+"}")}
            if(p>0)
            {str[p]=str[p]+","+str[p-1]}
        }var test=String("["+str[p]+"]");
        localStorage.setItem("zNodes",test);

    }
    if (treeNode) {
        zTree.editName(treeNode[0]);
        var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
        var str=[];
        var nodes = treeObj.transformToArray(treeObj.getNodes());
        for(var p in nodes)
        {    if(nodes[p].isParent){
            str.push("{"+"\"id\":"+ nodes[p].id+",\"pId\":"+nodes[p].pId+",\"name\":"+"\""+nodes[p].name+"\""+","+"\"isParent\":true"+"}")
        }else{
            str.push("{"+"\"id\":"+ nodes[p].id+",\"pId\":"+nodes[p].pId+",\"name\":"+"\""+nodes[p].name+"\"" +"}")}
            if(p>0)
            {str[p]=str[p]+","+str[p-1]}
        }var test=String("["+str[p]+"]");
        localStorage.setItem("zNodes",test);
    } else {
        alert("叶子节点被锁定，无法增加子节点");
    }

}

function selectAll() {
    var zTree = $.fn.zTree.getZTreeObj("treeDemo");
    zTree.setting.edit.editNameSelectAll =  $("#selectAll").attr("checked");
}
var task_list=[];
var task=[];
var pri_list=[];
function display()
{
    var task2=[];
    var j=0;
    var i=1;
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.transformToArray(treeObj.getNodes());
    for(var p in nodes){
        if(!nodes[p].isParent){
            task[j]=nodes[p].name;
            task_list[i]=i+"."+nodes[p].name+"\n";
            i++;
            j++;
           //alert(task_list[i]);
        }
    }
 task2=task_list.join("\b");

    //console.log(task2);
    $("#des").val(task2);
}
function check() {
  //  var i=task.length;
  //  var len=JSON.parse(localStorage.getItem("order")).length;

    var i=task.length;
    var str=[];
    //var i=task.length;
    for(var j=0;j<i;++j){
        str.push("{"+"\"name\":"+"\""+task[j]+"\""+","+"\"pri\":"+pri_list[j]+"}")
    }
    str=str.join(",");
    var test=String("["+str+"]");
    localStorage.setItem("order",test);


}
function order() {
    var i=task.length;
    var len=JSON.parse(localStorage.getItem("order")).length;
   // display();

   //input();
  //  for(var j=0;j<i;++j){
  //      if( pri_list[j]==null)
  //      {
   //         setTimeout("",500)
  //      }
  //  }
    if(len!=i)
    {check()};
    var colId="pri";
    var order=localStorage.getItem("order");
    order=JSON.parse(order);
    var asc = function(x,y)
    {
        return (x[colId] > y[colId]) ? 1 : -1
    }
    order.sort(asc);
    for(var p in order){
        var i=order[p].name;
        $("#pri").after("<br/>"+i);
    }


}

function sort(arr) {
    if (arr.length <= 1) { return arr; } //长度判断
    var pivotIndex = Math.floor(arr.length / 2);//返回整数
    var pivot = arr.splice(pivotIndex, 1)[0];
    var left = [];
    var right = [];
    for (var i = 0; i < arr.length; i++){
        if (arr[i] < pivot) {
            left.push(arr[i]);
        } else {
            right.push(arr[i]);
        }
    }
    return quickSort (left).concat([pivot], quickSort(right));
}


$("#addParent").onclick="return false";
$("#addLeaf").onclick="return false";

$(document).ready(function(){
    var treeObj=$.fn.zTree.init($("#treeDemo"), setting, zNodes);
    treeObj.expandAll(true);
   // $("#copy").bind("change", setCheck);
  //  $("#move").bind("change", setCheck);
//    $("#prev").bind("change", setCheck);
 //   $("#inner").bind("change", setCheck);
   // $("#next").bind("change", setCheck);
  $("#addParent").bind("click", {isParent:true}, add);
  $("#addLeaf").bind("click", {isParent:false}, add);
  $("#display").bind("click", display);
    $("#pri").keydown(function () {
        if (event.keyCode == 13) {

            var fo = document.getElementById('pri').value;
            pri_list.push(fo);
            $("input[id='pri']").val("").focus();
            //window.localStorage.setItem("today", fo)
        }
    });
  //  console.log(pri_list);
  $("#sort").bind("click",order);
 // $("#red").bind("click",red);
//  $("#yellow").bind("click",yellow);
  //$("#blue").bind("click",blue);
})


//-->
