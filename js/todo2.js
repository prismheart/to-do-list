/**
 * Created by jzy96 on 2018/3/5.
 */
//删除任务分类
var jsq = 0;
preOrder(treedata);                                               //先序遍历treeframe(treeframe初始储存于treedata）
function preOrder(treeframe) {
    for(var key in treeframe) {
        if(jsq===fatherIdArr.indexOf(choseDiv.id)) {              //查找到当前要删除的结点（通过查看当前要删除结点的id在储存结点id的数组(treeClassfiy.list)中的位置）
            delete treeframe[key];                                   //通过detele删除对象的属性来删除结点
            var pos = treeClassifyIdArr.list.indexOf(choseDiv.id);//查找当前要删除的结点id在储存结点id的数组中(treeClassfiy.list)的位置
            treeClassifyIdArr.list.splice(pos,1);                  //把id从数组中删除
            fatherIdArr.splice(jsq, 1);
            break;
        }
        jsq++;
        if(typeof treeframe[key] === "object") {
            preOrder(treeframe[key]);
        }
    }
}
localStorage.setItem('treeframe', JSON.stringify(treedata));      //将更新的treedata存入设置的值treeframe中</code>
//添加分类
var jsq = 0;
preOrder(treedata);
function preOrder(treeframe) {
    for(var key in treeframe) {
        if(jsq===fatherIdArr.indexOf(choseDiv.id)) {             //找到被选中的结点
            fatherIdArr.push("fatherId"+fatherIdjsq);            //先在数组中添加新的id，使新的结点渲染到页面上
            treeframe[key][value] = {};                          //更新树状结构，添加结点(为记录树的结构的对象添加属性)
            preOrder2(treeframe[key]);
            function preOrder2(treeframe) {                      //jsq记录被选中结点的的最后一个子节点
                for(var key in treeframe) {
                    jsq++;
                    if(typeof treeframe[key] === "object") {
                        preOrder2(treeframe[key]);
                    }
                }
            }
            break;
        }
        jsq++;
        if(typeof treeframe[key] === "object") {
            preOrder(treeframe[key]);
        }
    }
}
localStorage.setItem('treeframe', JSON.stringify(treedata));     //将更新的treedata存入设置的值treeframe中
/*此处渲染页面*/
fatherIdArr.pop();                                               //新的结点渲染到页面上后删除该结点的id
fatherIdArr.splice(jsq, 0, "fatherId"+fatherIdjsq++);            //更新该结点id在id数组中的位置
treeClassifyIdArr.list = [];                                     //将id数组中的元素添加到对象中
for(var j=0;j<fatheridarr.length;j++) code="" 将更新的fatheridjsq存入设置的值fatheridjsq中<="" fatheridjsq);="" localstorage.setitem('fatheridjsq',="" 将更新的treeclassifyidarr存入设置的值treeclassify中="" json.stringify(treeclassifyidarr));="" localstorage.setitem('treeclassify',="" }="" treeclassifyidarr.list.push(fatheridarr[j]);="" {=""></fatheridarr.length;j++)></code>

allTasks.list = [];
for(var i=0;i<tasklistarr.length;i++)
    code="" }="" {="" 更新储存<="" json.stringify(alltasks));="" localstorage.setitem('alltasks',="" alltasks.list.push(tasklistarr[i]);=""></tasklistarr.length;i++)></code>