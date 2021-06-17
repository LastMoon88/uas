function hitungUmur(tgl_lahir_str){
    // format tgl lahir harus mm/dd/yyyy
    let diff_month = Date.now() - new Date(tgl_lahir_str).getTime();
    let temp_umur = new Date(diff_month).getUTCFullYear();
    let umur = Math.abs(temp_umur - 1970);  
    return umur;
}

function validasiTanggal(tgl_str){
    // return true kalo format dd/mm/yyyy

    // return /^(?:(?:(?:(?:0[1-9]|1[0-9]|2[0-8])[\/](?:0[1-9]|1[012]))|(?:(?:29|30|31)[\/](?:0[13578]|1[02]))|(?:(?:29|30)[\/](?:0[4,6,9]|11)))[\/](?:19|[2-9][0-9])\d\d)|(?:29[\/]02[\/](?:19|[2-9][0-9])(?:00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96))$/.test(tgl_str) // ngetest
    return /(^(((0[1-9]|1[0-9]|2[0-8])[\/](0[1-9]|1[012]))|((29|30|31)[\/](0[13578]|1[02]))|((29|30)[\/](0[4,6,9]|11)))[\/](19|[2-9][0-9])\d\d$)|(^29[\/]02[\/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/.test(tgl_str)
}

function alphaNumeric(str){
    // return true kalo ada angka & huruf 
    return /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$/.test(str)
}
function isDigitWithComma(str){
    // return true kalo angka + koma(,) / titik(.)
    return /^[1-9][\.\d]*(,\d+)?$/.test(str)
}
function cumanAngka(str){
    // return true kalo cuman angka ga pake koma
    return /^\d+$/.test(str)
}
function isEmail(str){
    // return true kalo ada @ email (.) domain ex(anu@mail.com | true)
    return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(str)
}
function passwordUppercaseLowercaseNumber(str){
    // return true kalo password 1 uppercase , 1 lowercase, 1 number
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(str)
}

function rand_str() {
    const list = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNPQRSTUVWXYZ0123456789";
    var res = "";
    for(var i = 0; i < 16; i++) {
        var rnd = Math.floor(Math.random() * list.length);
        res = res + list.charAt(rnd);
    }
    return res;
}

//bikin log
const fs= require("fs");
const morgan=require('morgan');
const accessLogStream  = fs.createWriteStream('./6748.log', {flags:'a'},);

let msg = '';
morgan.token('msg',(req,res)=>{return "Message: "+msg+";"});
morgan.token('status',(req,res)=>{return "Status: "+ res.statusCode+";"});
morgan.token('method',(req,res)=>{return "Method: "+ req.method+";"});
//morgan.token('url',(req,res)=>{return "URL: localhost:3000/api/users"+ req.url+";"});
morgan.token('date',(req,res)=>{ return "DateTime: "+  new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear() + " "+new Date().getHours()+ ":"+new Date().getMinutes()+";"});
let format = morgan(`:method URL: :url ; :status :msg :date `,{stream:accessLogStream,});

app.use(format);