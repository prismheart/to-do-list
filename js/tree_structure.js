/**
 * Created by jzy96 on 2018/3/7.
 */
var nodes=localStorage.getItem("zNodes");
//节点数据
function Node(nodes) {
    this.childen=[];
    this.data=nodes.name;
    this.parent =nodes.pId;
}
//树
function Tree(data) {
    var node=new Node(data); //新建实例
    this.root=node;
}//深度优先 回调+递归
Tree.prototype.traverseDF(callback)
{
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }
        // step 4
        callback(currentNode);
        // step 1
    })(this._root);
}
//广度优先1
transformTozTreeFormat: function (setting, sNodes) {
    var i, l,
        key = setting.data.simpleData.idKey,
        parentKey = setting.data.simpleData.pIdKey;
    if (!key || key == "" || !sNodes) return [];

    if (tools.isArray(sNodes)) {
        var r = [];
        var tmpMap = {};
        for (i = 0, l = sNodes.length; i < l; i++) {
            tmpMap[sNodes[i][key]] = sNodes[i];
        }
        for (i = 0, l = sNodes.length; i < l; i++) {
            var p = tmpMap[sNodes[i][parentKey]];
            if (p && sNodes[i][key] != sNodes[i][parentKey]) {
                var children = data.nodeChildren(setting, p);
                if (!children) {
                    children = data.nodeChildren(setting, p, []);
                }
                children.push(sNodes[i]);
            } else {
                r.push(sNodes[i]);
            }
        }
        return r;
    } else {
        return [sNodes];
    }
}
function bfs (simpleNodes) {
    return data.transformTozTreeFormat(setting, simpleNodes);
}
function bfs1() {
    var treeObj = $.fn.zTree.getZTreeObj("treeDemo");
    var simple=JSON.parse(localStorage.getItem("zNodes"));var nodes = treeObj.bfs(simple);
    console.log(nodes);
}
//广度2
nodes=JSON.parse(localStorage.getItem("zNodes"))
for(var p in nodes){
if(nodes[p].pId=null){
    var nodes[p].name=[];
    for(var q in nodes){
        if(nodes[q].pId=nodes[p].id){
            nodes[p].name.push(nodes[q].id);
        }
    }
}
}





//添加
Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function(node) {
            if (node.data === toData) {
                parent = node;
            }
        };

    this.contains(callback, traversal);

    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};
//删除
Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index;

    var callback = function(node) {
        if (node.data === fromData) {
            parent = node;
        }
    };

    this.contains(callback, traversal);

    if (parent) {
        index = findIndex(parent.children, data);

        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }

    return childToRemove;
};
