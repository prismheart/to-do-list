/**
 * Created by jzy96 on 2018/3/11.
 */
$(document).ready(function () {
    //对json进行降序排序函数
    var colId="age"
    var desc = function(x,y)
    {
        return (x[colId] < y[colId]) ? 1 : -1
    }
    //对json进行升序排序函数
    var asc = function(x,y)
    {
        return (x[colId] > y[colId]) ? 1 : -1
    }
    var arr2 = [
        {name:"kitty", age:12},
        {name:"sonny", age:9},
        {name:"jake", age:13},
        {name:"fun"}
    ];
    document.writeln("按age进行升序排序：<br>");
    arr2.sort(asc); //升序排序
    document.writeln(JSON.stringify(arr2));


    document.writeln("<br>按age进行降序排序：<br>");
    arr2.sort(desc); //降序排序
    document.writeln(JSON.stringify(arr2));

});

function display(){
    var i;
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var nodes = treeObj.transformToArray(treeObj.getNodes());
    for(var p in nodes)
    {
    $("#name").val(nodes[p].name);
    //初始化lock

        //加锁




    }
}

