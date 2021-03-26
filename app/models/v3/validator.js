class Validator{
    errors={};
    constructor(){

    }
    required(name,value){
        this.errors[name]="";
        if(!value){
            this.errors[name]=name +" không được để trống";
            return false;
        }
        return true;
    }
    testMaFood(name,value){
        this.errors[name]='';
        var test =/[a-z0-9]{6}/gm.test(value);
        if(!test){
            this.errors[name]=name+' sai định dạng(maNV độ dài 6 ký tự)';
        }
        return test;
    };
    testTenFood(name,value){
        this.errors[name]='';
        var test = /^[\p{L}'][ \p{L}'-]*[\p{L}]$/u.test(value);
        if(!test){
            this.errors[name] = name +'sai định dạng';
        }
        return test;
    }
    testGiaMon(name,value){
        this.errors[name]='';
        var test =/\b[1-9][0-9]{3,10}\b/gm.test(value);
        if(!test){
            this.errors[name]=name+'giá món không được thấp hơn 1000đ'
        }
        return test;
    }
}

export default Validator;