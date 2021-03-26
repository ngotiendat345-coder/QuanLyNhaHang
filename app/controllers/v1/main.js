import Food from "../../models/v1/food.js";

const btnThemMon = document.getElementById("btnThemMon");
const foodID = document.getElementById("foodID");
const tenMon = document.getElementById("tenMon");
const loai = document.getElementById("loai");
const giaMon = document.getElementById("giaMon");
const khuyenMai = document.getElementById("khuyenMai");
const tinhTrang = document.getElementById("tinhTrang");
const hinhMon = document.getElementById("hinhMon");
const moTa = document.getElementById("moTa");

btnThemMon.addEventListener("click", themMon);
function hienThiMon(food){
    console.log(food);
    document.getElementById('imgMonAn').src = food.hinhAnh;
    document.getElementById('spMa').innerHTML = food.id;
    document.getElementById('spTenMon').innerHTML = food.tenMon;
    document.getElementById('spLoaiMon').innerHTML = food.loaiMon;
    document.getElementById('spGia').innerHTML = food.giaMon;
    document.getElementById('spKM').innerHTML = food.khuyenMai;
    document.getElementById('spGiaKM').innerHTML=food.tinhGiaKhuyenMai();
    document.getElementById('spTT').innerHTML = food.tinhTrang;
    document.getElementById('pMoTa').innerHTML = food.moTa;
    console.log('zzz');
}
function themMon() {
  let id = foodID.value;
  let mon = tenMon.value;
  let priceMon = giaMon.value;
  let kindFood = loai.value;
  let motaFood = moTa.value;
  let hinhAnh = hinhMon.files[0];
  let phanTramKhuyenMai = khuyenMai.value;
  let tinhTrangMon = tinhTrang.value;
 if(!hinhAnh) return;
  console.log(hinhAnh);
  //chuyển đối tượng file thành string dạng base64 để hiển thị trên trang giao điện
  const fileReader = new FileReader();
  fileReader.readAsDataURL(hinhAnh);
  fileReader.onload = function (event) {
    hinhAnh = event.target.result;
    //console.log(hinhAnh);
    const food = new Food(
      id,
      mon,
      kindFood,
      priceMon,
      phanTramKhuyenMai,
      tinhTrangMon,
      hinhAnh,
      motaFood
    );
    hienThiMon(food);
  };
}
