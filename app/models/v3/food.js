class Food{
    constructor(id,tenMon,loaiMon,giaMon,khuyenMai,tinhTrang,hinhAnh,moTa){
        this.id = id;
        this.tenMon = tenMon;
        this.loaiMon = loaiMon;
        this.giaMon = giaMon;
        this.khuyenMai = khuyenMai;
        this.tinhTrang = tinhTrang;
        this.hinhAnh = hinhAnh;
        this.moTa = moTa;
    }
    tinhGiaKhuyenMai(){
        return this.giaMon -(this.giaMon * this.khuyenMai)/100;
    }
}

export default Food;