var ban_words = ["\\","[","}","]","}","&","#","+"]

function httpGet(theUrl){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

var lo_na = document.getElementById("nama_login")
var lo_pa = document.getElementById("password_login")
var lo_bu = document.getElementById("login_button")
lo_na.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key == "Enter" || event.key == "ArrowDown") {
        lo_pa.focus()
    }
})

lo_pa.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key == "Enter") {
        lo_bu.click()
        lo_bu.focus()
    }else if(event.key == "ArrowUp"){
        lo_na.focus()
    }else if(event.key == "ArrowDown"){
        lo_bu.focus()
    }
})

lo_bu.addEventListener("keyup", function(event) {
    event.preventDefault();
    if(event.key == "ArrowUp"){
        lo_pa.focus()
    }
})

var si_na = document.getElementById("nama_signup") 
var si_pa = document.getElementById("password_signup")
var si_em = document.getElementById("emel_signup")
var si_ag = document.getElementById("telefon_signup")
var si_bu = document.getElementById("button_signup")
var si_id = document.getElementById("id_signup")

si_id.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key == "Enter"||event.key == "ArrowDown") {
        si_na.focus()
    }
})

si_na.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key == "Enter"||event.key == "ArrowDown") {
        si_pa.focus()
    }else if(event.key == "ArrowUp"){
        si_id.focus()
    }
})

si_pa.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key == "Enter" || event.key == "ArrowDown") {
        si_em.focus()
    }else if(event.key == "ArrowUp"){
        si_na.focus()
    }
})

si_em.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key == "Enter" || event.key == "ArrowDown") {
        si_ag.focus()
    }else if(event.key == "ArrowUp"){
        si_pa.focus()
    }
})

si_ag.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.key == "Enter") {
        si_bu.click()
        si_bu.focus()
    }else if(event.key == "ArrowDown"){
        si_bu.focus()
    }else if(event.key == "ArrowUp"){
        si_em.focus()
    }
})

si_bu.addEventListener("keyup", function(event) {
    event.preventDefault();
    if(event.key == "ArrowUp"){
        si_ag.focus()
    }
})
//paparkan password
function unhide(pass_id,btn_num){
    var password = document.getElementById(pass_id)
    var hidebtn = document.getElementsByClassName("hidebtn")
    var hidebtn1 = hidebtn[btn_num]
    if(hidebtn1.innerText == "visibility_off"){
        hidebtn1.innerText = "visibility"
        password.type = "password"
    }else if(hidebtn1.innerText == "visibility"){
        hidebtn1.innerText = "visibility_off"
        password.type = "text"
    }
}

function redirect(url){
    window.location.href=url
}
//paparkan message kepada pengguna
function show_info(parent,child,text,clo = "var(--color_1)",clo_t="#fff"){
    var parents = document.getElementById(parent)
    var childs = document.getElementById(child)
    var comp,wi
    childs.innerText=text
    parents.style.backgroundColor=clo
    parents.style.color= clo_t
    parents.classList.add("expand")
    parents.classList.remove("hiding")
    setTimeout(() => {
        parents.classList.remove("expand")
        parents.classList.add("hiding")
    }, 2500);
}
//pengguna login
function login(){
    //show_info("loginn","loginn_text","your text here")
    //show_info("loginp","loginp_text","your text here")
    //Error : #FF4C29
    //Success : #32965D
    var name = document.getElementById("nama_login")
    var password = document.getElementById("password_login")
    var check = 0

    if(name.value ==""){
        show_info("loginn","loginn_text","Nama pengguna tidak boleh kosong","#FF4C29")
    }else if(name.value.length < 4){
        show_info("loginn","loginn_text","Nama pengguna mesti lebih daripada 4","#FF4C29")
    }else if(ban_words.some(v => name.value.includes(v))){
        show_info("loginn","loginn_text","Nama pengguna tidak boleh mengandungi \\ [] {} & # +","#FF4C29")
    }else{
        check += 1
    }

    if(password.value == ""){
        show_info("loginp","loginp_text","Kata Laluan tidak boleh kosong","#FF4C29")
    }else if(password.value.length < 8){
        show_info("loginp","loginp_text","Kata Laluan mesti lebih daripada 8","#FF4C29")
    }else if(ban_words.some(v => password.value.includes(v))){
        show_info("loginp","loginp_text","Kata Laluan tidak boleh mengandungi \\ [] {} & # +","#FF4C29")
    }else{
        check += 1
    }
    var exist = 0
    if(check== 2){
        var existed_usr = httpGet("/php/check_usr.php").split("\n")
        for(var a = 0;a < existed_usr.length;a++){
            if(existed_usr[a]==name.value){
                exist = 1
            }
        }
        if(exist == 1){
            var pass = httpGet("/php/get_usr_pass.php?id="+name.value).slice(0,-1)
            if(pass == password.value){
                var admin = httpGet("/php/get_usr_admin.php?id="+name.value)
                var nama = httpGet("/php/get_usr_id.php?id="+name.value)
                show_info("loginn","loginn_text","Selamat datang "+nama,"#32965D")
                localStorage.setItem("Aras",admin)
                localStorage.setItem("Nama pengguna",nama)
                localStorage.setItem("Login","True")
                localStorage.setItem("UserId",name.value)
                setTimeout(() => {
                    window.location.href="/"
                }, 1500);
            }else{
                show_info("loginp","loginp_text","Kata Laluan tidak betual","#FF4C29")
            }
        }else{
            show_info("loginn","loginn_text","Tiada account","#FF4C29")
        }
    }
    
}

//pengguna signup

function signup(){
    var id = document.getElementById("id_signup")
    var name = document.getElementById("nama_signup")
    var password = document.getElementById("password_signup")
    var emel = document.getElementById("emel_signup")
    var phone = document.getElementById("telefon_signup")
    var check = 0

    if(id.value == ""){
        show_info("signupi","signupi_text","Id pengguna tidak boleh kosong","#FF4C29")
    }else if(id.value.length < 4){
        show_info("signupi","signupi_text","Id pengguna mesti lebih daripada 4","#FF4C29")
    }else if(ban_words.some(v => id.value.includes(v))){
        show_info("signupi","signupi_text","Id pengguna tidak boleh mengandungi \\ [] {} & # +","#FF4C29")
    }else{
        check += 1
    }

    if(name.value == ""){
        show_info("signupn","signupn_text","Nama pengguna tidak boleh kosong","#FF4C29")
    }else if(name.value.length < 4){
        show_info("signupn","signupn_text","Nama pengguna mesti lebih daripada 4","#FF4C29")
    }else if(ban_words.some(v => name.value.includes(v))){
        show_info("signupn","signupn_text","Nama pengguna tidak boleh mengandungi \\ [] {} & # +","#FF4C29")
    }else{
        check += 1
    }

    if(password.value == ""){
        show_info("signupp","signupp_text","Kata Laluan tidak boleh kosong","#FF4C29")
    }else if(password.value.length < 8){
        show_info("signupp","signupp_text","Kata Laluan mesti lebih daripada 8","#FF4C29")
    }else if(ban_words.some(v => password.value.includes(v))){
        show_info("signupp","signupp_text","Kata Laluan tidak boleh mengandungi \\ [] {} & # +","#FF4C29")
    }else{
        check += 1
    }
    if(emel.value == ""){
        show_info("signupe","signupe_text","Emel tidak boleh kosong","#FF4C29")
    }else if(emel.value.includes("@") == false || emel.value.includes(".") == false){
        show_info("signupe","signupe_text","Sila masukkan e-mel yang sah","#FF4C29")
    }else{
        check += 1
    }

    if(phone.value == ""){
        show_info("signupt","signupt_text","Nombor telefon tidak boleh kosong","#FF4C29")
    }else if(/^\d+$/.test(phone.value) == false){
        show_info("signupt","signupt_text","Sila masukkan nombor telefon yang sah","#FF4C29")
    }else if(phone.value.length < 7){
        show_info("signupt","signupt_text","Sila masukkan nombor telefon yang sah","#FF4C29")
    }else{
        check += 1
    }
    var exist = 0
    if(check == 5){
        var existed_usr = httpGet("/php/check_usr.php").split("\n")
        for(var a = 0;a < existed_usr.length;a++){
            if(existed_usr[a]==id.value){
                show_info("signupi","signupi_text","Id pengguna sudah diambil","#FF4C29")
                exist = 1
            }
        }
        if(exist != 1){
            var createusr = httpGet("/php/add_usr.php?username="+name.value+"&password="+password.value+"&email="+emel.value+"&phone="+phone.value+"&id="+id.value).toString()
            if(createusr == "New record created successfully"){
                show_info("signupn","signupn_text","Akaun anda berjaya dibuat","#32965D")
                document.getElementById("nama_login").value = id.value
                document.getElementById("password_login").value = password.value
            }else{          
                console.log(createusr)          
                show_info("signupn","signupn_text","Ada sesuatu yang tidak kena","#FF4C29")
            }
        }
    }
}