/**
 * Created by jzy96 on 2018/2/27.
 */
//节点
function Node(element){
    this.element = element;//数据
    this.next = null;
}
//链表
function LList(){
    this.head = new Node('head');
    this.find = find;
    this.insert = insert;
    //this.remove = remove;
    this.display = display;
}
//寻找后面的节点
function find(item){
    var currNode = this.head;
    while (currNode.element != item){
        currNode = currNode.next;
    }
    return currNode;
}

//插入一个元素
function insert(newElement, item){
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
}

}


//测试程序
var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Alma", "Russellville");
cities.display();