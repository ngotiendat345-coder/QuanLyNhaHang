import Food from "../../models/v3/food.js";
import ListFood from "../../models/v3/listFood.js";
import Validator from "../../models/v3/validator.js";

const tbody = document.getElementById("tbodyFood");

document.getElementById("btnThemMon").addEventListener("click", handleThemMon);
document.getElementById("btnCapNhat").addEventListener("click", handleCapNhat);
document.getElementById('selLoai').addEventListener('change',handleOnChangeSelect);
tbody.addEventListener("click", delegationTBody);
const ObjectListFood = new ListFood();
let updateID = null;
const validator = new Validator();
document.getElementById("btnThem").addEventListener("click", function () {
  document.getElementById("btnCapNhat").style.display = "none";
  document.getElementById("exampleModalLabel").innerHTML = "Thêm món ăn";
  document.getElementById("btnThemMon").style.display = "block";
  document.getElementById("foodID").removeAttribute("disabled");
  // document.getElementById("moTa").value= "asassa";
});
function handleOnChangeSelect(e){
    //console.log(e.target.value);
    const value = e.target.value;
    if(value==='all'){
        hienThiDanhSach(ObjectListFood.danhSachMon);
        return;
    }
    const filter = ObjectListFood.danhSachMon.filter((food)=>food.loaiMon === value);
    hienThiDanhSach(filter);
}
function handleCapNhat() {
    console.log('zz');
  let id = document.getElementById("foodID").value;
  let tenMon = document.getElementById("tenMon").value;
  let loaiMon = document.getElementById("loai").value;
  let giaMon = document.getElementById("giaMon").value;
  let khuyenMai = document.getElementById("khuyenMai").value;
  let tinhTrang = document.getElementById("tinhTrang").value;
  let moTa = document.getElementById("moTa").value;
  let hinhAnh = null;
  let fileMon = document.getElementById("hinhMon").files[0];
  if (!fileMon) {
      document.getElementById('invalidHinhAnh').innerHTML="Hãy chọn hình ảnh";
      document.getElementById('invalidHinhAnh').style.display="block";
    return;
  };
  console.log('huhu')
  const fileReader = new FileReader();
  fileReader.readAsDataURL(fileMon);
  fileReader.onload = function (event) {
    hinhAnh = event.target.result;
    const monAn = new Food(
      id,
      tenMon,
      loaiMon,
      giaMon,
      khuyenMai,
      tinhTrang,
      hinhAnh,
      moTa
    );
    const test = handleValidator(
        id,
        tenMon,
        loaiMon,
        giaMon,
        khuyenMai,
        tinhTrang,
        hinhAnh,
        moTa
      ) && (updateID ===id);
      
      if (test) {
        ObjectListFood.chinhSuaMonAn(monAn);
        hienThiDanhSach(ObjectListFood.danhSachMon);
      }
      handleClear();
  };
}
function delegationTBody(e) {
  //console.log(e.target);
  const action = e.target.dataset.action;
  const id = e.target.dataset.id;
  //console.log(action,id);
  if (action === "update") {
    $("#exampleModal").modal("show");
    document.getElementById("btnCapNhat").style.display = "block";
    document.getElementById("exampleModalLabel").innerHTML = "Sửa món ăn";
    document.getElementById("btnThemMon").style.display = "none";
    const target = ObjectListFood.timKiemMonTheoID(id);
    updateID = id;
    console.log(target);
    document.getElementById("foodID").setAttribute("disabled", true);
    document.getElementById("foodID").value = target.id;
    document.getElementById("tenMon").value = target.tenMon;
    document.getElementById("loai").value = target.loaiMon;
    document.getElementById("giaMon").value = target.giaMon;
    document.getElementById("khuyenMai").value = target.khuyenMai;
    document.getElementById("tinhTrang").value = target.tinhTrang;
    document.getElementById("moTa").value = target.moTa;

   
    //console.log(target);
  }
  if (action === "delete") {
    ObjectListFood.xoaMonAn(id);
    hienThiDanhSach(ObjectListFood.danhSachMon);
  }
}
function handleThemMon() {
  let id = document.getElementById("foodID").value;
  let tenMon = document.getElementById("tenMon").value;
  let loaiMon = document.getElementById("loai").value;
  let giaMon = document.getElementById("giaMon").value;
  let khuyenMai = document.getElementById("khuyenMai").value;
  let tinhTrang = document.getElementById("tinhTrang").value;
  let fileMon = document.getElementById("hinhMon").files[0];
  let moTa = document.getElementById("moTa").value;
  let hinhAnh = null;
  if (!fileMon) return;
  const fileReader = new FileReader();
  fileReader.readAsDataURL(fileMon);
  fileReader.onload = function (event) {
    hinhAnh = event.target.result;
    const monAn = new Food(
      id,
      tenMon,
      loaiMon,
      giaMon,
      khuyenMai,
      tinhTrang,
      hinhAnh,
      moTa
    );
    /////////////////////////////////////////
    const test = handleValidator(
      id,
      tenMon,
      loaiMon,
      giaMon,
      khuyenMai,
      tinhTrang,
      hinhAnh,
      moTa
    );
    if (test) {
      const isThem =  ObjectListFood.themMonAn(monAn);
      if(!isThem){
          document.getElementById('invalidID').innerHTML = "ID này đã có";
          document.getElementById('invalidID').style.display="block";
          return;
      }
      console.log(ObjectListFood.danhSachMon)
      hienThiDanhSach(ObjectListFood.danhSachMon);
    }
    handleClear();
  };
}
function handleValidator(
  id,
  tenMon,
  loaiMon,
  giaMon,
  khuyenMai,
  tinhTrang,
  hinhAnh,
  moTa
) {
  let isValide = true;
  isValide &= validator.required("id", id) && validator.testMaFood("id", id);
  isValide &=
    validator.required("tenMon", tenMon) &&
    validator.testTenFood("tenMon", tenMon);
  isValide &= validator.required("loaiMon", loaiMon);
  isValide &=
    validator.required("giaMon", giaMon) &&
    validator.testGiaMon("giaMon", giaMon);
  isValide &= validator.required("khuyenMai", khuyenMai);
  isValide &= validator.required("tinhTrang", tinhTrang);
  isValide &= validator.required("moTa", moTa);
  console.log(validator.errors);
  const errors = validator.errors;
  if (!isValide) {
    document.getElementById("invalidID").innerHTML = errors.id;
    document.getElementById("invalidTen").innerHTML = errors.tenMon;
    document.getElementById("invalidLoai").innerHTML = errors.loaiMon;
    document.getElementById("invalidGia").innerHTML = errors.giaMon;
    document.getElementById("invalidKM").innerHTML = errors.khuyenMai;
    document.getElementById("invalidTT").innerHTML = errors.tinhTrang;
    document.getElementById("invalidMoTa").innerHTML = errors.moTa;

    document.getElementById("invalidID").style.display = "block";
    document.getElementById("invalidTen").style.display = "block";
    document.getElementById("invalidLoai").style.display = "block";
    document.getElementById("invalidGia").style.display = "block";
    document.getElementById("invalidKM").style.display = "block";
    document.getElementById("invalidTT").style.display = "block";
    document.getElementById("invalidMoTa").style.display = "block";
  } else {
    document.getElementById("invalidID").style.display = "none";
    document.getElementById("invalidTen").style.display = "none";
    document.getElementById("invalidLoai").style.display = "none";
    document.getElementById("invalidGia").style.display = "none";
    document.getElementById("invalidKM").style.display = "none";
    document.getElementById("invalidTT").style.display = "none";
    document.getElementById("invalidMoTa").style.display = "none  ";
  }
  return isValide;
}
function handleClear() {
  document.getElementById("hinhMon").value = null;
  document.getElementById("foodID").value = null;
  document.getElementById("tenMon").value = null;
  document.getElementById("loai").value = null;
  document.getElementById("giaMon").value = null;
  document.getElementById("khuyenMai").value = null;
  document.getElementById("tinhTrang").value = null;
  document.getElementById("moTa").value = null;
}
function handleLoaiMon(loai) {
  if (loai === "loai1") {
    return "Chay";
  }
  if (loai === "loai2") {
    return "Mặn";
  }
  return null;
}
function handleKhuyenMai(value) {
  if (value === "10") {
    return "10%";
  }
  if (value === "20") {
    return "20%";
  }
  return null;
}
function handleTinhTrang(value) {
  if (value === "0") {
    return "Hết";
  }
  if (value === "1") {
    return "Còn";
  }
  return null;
}
function hienThiDanhSach(danhSach) {
  let html = "";
  for (let value of danhSach) {
    const {
      id,
      tenMon,
      loaiMon,
      giaMon,
      khuyenMai,
      tinhTrang,
      hinhAnh,
      moTa,
    } = value;
    html += `<tr>
            <td>${id}</td>
            <td>${tenMon}</td>
            <td>${handleLoaiMon(loaiMon)}</td>
            <td>${giaMon}</td>
            <td>${handleKhuyenMai(khuyenMai)}</td>
            <td>${value.tinhGiaKhuyenMai()}</td>
            <td>${handleTinhTrang(tinhTrang)}</td>
            <td><button class="btn btn-danger" data-id="${id}" data-action="delete">Xóa</button>
            <button class="btn btn-success" data-id="${id}" data-action="update">Sửa</button></td>
        </tr>`;
  }
  tbody.innerHTML = html;
}
