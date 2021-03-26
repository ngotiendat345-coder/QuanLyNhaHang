class ListFood{
    danhSachMon = [];
    constructor(){
        
    }
    themMonAn(monAn){
        const index = this.danhSachMon.findIndex((item)=>item.id === monAn.id);
        if(index === -1){
            this.danhSachMon.push(monAn);
            return true;
        }
        return false;
    }
    timKiemMonTheoID(id){
        return this.danhSachMon.find((item)=>item.id === id)
    }
    chinhSuaMonAn(monAn){
        const newDanhSach = this.danhSachMon.map((food)=>{
            if(food.id===monAn.id){
                return monAn;
            }
            return food;
        })
        this.danhSachMon = [...newDanhSach];
    }
    xoaMonAn(id){
        const index = this.danhSachMon.findIndex((item)=>item.id===id);
        if(index!==-1){
            this.danhSachMon.splice(index,1);
        }
        
    }
}

export default ListFood;