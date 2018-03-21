var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
var str=[];
var nodes = treeObj.transformToArray(treeObj.getNodes());
for(var p in nodes)
{str.push("\"id\":"+ nodes[p].id+",\"pId\":"+nodes[p].pId+",\"name\":"+"\""+nodes[p].name+"\"");
    if(p>0)
    {str[p]=str[p]+","+str[p-1]}
}var test=tring("{"+str[p]+"}"); var json=JSON.parse(test);



var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
var str=[];
var nodes = treeObj.transformToArray(treeObj.getNodes());
for(var p in nodes)
{str.push("\"id\":"+ nodes[p].id+",\"pId\":"+nodes[p].pId+",\"name\":"+"\""+nodes[p].name+"\"");
    if(p>0)
    {str[p]=str[p]+","+str[p-1]}
}var test=String("{"+str[p]+"}");
localStorage.setItem("jiedian",test);