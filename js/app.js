(function(){

    read();

})();
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


