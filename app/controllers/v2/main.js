import Food from '../../models/v2/food.js';
import ListFood from '../../models/v2/listFood.js';
import Validator from '../../models/v2/validator.js';

const tbody = document.getElementById('tbodyFood');
document.getElementById('btnThemMon').addEventListener('click',handleThemMon);
const ObjectListFood = new ListFood();
const validator = new Validator();

function handleThemMon(){
    let id = document.getElementById('foodID').value;
    let tenMon = document.getElementById('tenMon').value;
    let loaiMon = document.getElementById('loai').value;
    let giaMon = document.getElementById('giaMon').value;
    let khuyenMai = document.getElementById('khuyenMai').value;
    let tinhTrang = document.getElementById('tinhTrang').value;
    let fileMon = document.getElementById('hinhMon').files[0];
    let moTa = document.getElementById('moTa').value;
    let hinhAnh = null;
    if(!fileMon)return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(fileMon);
    fileReader.onload = function(event){
        hinhAnh = event.target.result;
        const monAn = new Food(id,tenMon,loaiMon,giaMon,khuyenMai,tinhTrang,hinhAnh,moTa);
        /////////////////////////////////////////
       const test= handleValidator(id,tenMon,loaiMon,giaMon,khuyenMai,tinhTrang,hinhAnh,moTa);
        if(test){
            ObjectListFood.themMonAn(monAn);
            hienThiDanhSach(ObjectListFood.danhSachMon)
        }
        handleClear();
    }
    
}
function handleValidator(id,tenMon,loaiMon,giaMon,khuyenMai,tinhTrang,hinhAnh,moTa){
    let isValide = true;
    isValide &= validator.required('id',id) && validator.testMaFood('id',id);
    isValide &= validator.required('tenMon',tenMon) && validator.testTenFood('tenMon',tenMon);
    isValide &= validator.required('loaiMon',loaiMon);
    isValide &= validator.required('giaMon',giaMon) && validator.testGiaMon('giaMon',giaMon);
    isValide &= validator.required('khuyenMai',khuyenMai);
    isValide &= validator.required('tinhTrang',tinhTrang);
    isValide &= validator.required('moTa',moTa);
     console.log(validator.errors);
    const errors = validator.errors;
    if(!isValide){
        document.getElementById('invalidID').innerHTML = errors.id;
        document.getElementById('invalidTen').innerHTML = errors.tenMon;
        document.getElementById('invalidLoai').innerHTML = errors.loaiMon;
        document.getElementById('invalidGia').innerHTML = errors.giaMon;
        document.getElementById('invalidKM').innerHTML = errors.khuyenMai;
        document.getElementById('invalidTT').innerHTML = errors.tinhTrang;
        document.getElementById('invalidMoTa').innerHTML = errors.moTa;
   
        document.getElementById('invalidID').style.display="block";
        document.getElementById('invalidTen').style.display="block";
        document.getElementById('invalidLoai').style.display="block";
        document.getElementById('invalidGia').style.display="block";
        document.getElementById('invalidKM').style.display="block";
        document.getElementById('invalidTT').style.display="block";
        document.getElementById('invalidMoTa').style.display="block";
    }
     return isValide;
}
function handleClear(){
    document.getElementById('hinhMon').value=null;
    document.getElementById('foodID').value = null;
    document.getElementById('tenMon').value =null;
    document.getElementById('loai').value= null;
    document.getElementById('giaMon').value =null;
    document.getElementById('khuyenMai').value =null;
    document.getElementById('tinhTrang').value=null;
    document.getElementById('moTa').value=null;
}
function handleLoaiMon(loai){
    if(loai==="loai1"){
        return "Chay";
    }
    if(loai==="loai2"){
        return "Mặn";
    }
    return null;
}
function handleKhuyenMai(value){
    if(value==="10"){
        return "10%"
    }
    if(value==="20"){
        return "20%";
    }
    return null;
}
function handleTinhTrang(value){
    if(value==="0"){
        return "Hết";
    }
    if(value==="1"){
        return "Còn";
    }
    return null;
}
function hienThiDanhSach(danhSach){
    let html="";
    for(let value of danhSach){
        const {id,tenMon,loaiMon,giaMon,khuyenMai,tinhTrang,hinhAnh,moTa}=value;
        html +=`<tr>
            <td>${id}</td>
            <td>${tenMon}</td>
            <td>${handleLoaiMon(loaiMon)}</td>
            <td>${giaMon}</td>
            <td>${handleKhuyenMai(khuyenMai)}</td>
            <td>${value.tinhGiaKhuyenMai()}</td>
            <td>${handleTinhTrang(tinhTrang)}</td>
        </tr>`
    }
    tbody.innerHTML=html;
}

