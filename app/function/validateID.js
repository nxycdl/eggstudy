/**
 * 数据校验
 */
const provinceAndCitys = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
};

const powers = [ '7', '9', '10', '5', '8', '4', '2', '1', '6', '3', '7', '9',
    '10', '5', '8', '4', '2' ];

const parityBit = [ '1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2' ];

const genders = {
    male: '男',
    female: '女'
};
module.exports = {

    // 校验身份证号码
    idnum (idCardNo) {

        // 15位和18位身份证号码的基本校验
        if (!lengthCheck()) { return false; }

        // 判断长度为15位或18位
        if (idCardNo.length == 15) {
            return check15IdCardNo(idCardNo);
        } else if (idCardNo.length == 18) {
            return check18IdCardNo(idCardNo);
        }
        return false;


        // 校验地址码
        function checkAddressCode (addressCode) {
            const check = /^[1-9]\d{5}$/.test(addressCode);
            if (!check) { return false; }
            if (provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
                return true;
            }
            return false;

        }

        // 检查生日是否正确,生日格式：yyyyMMdd
        function checkBirthDayCode (birDayCode) {
            const check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/
                .test(birDayCode);
            if (!check) { return false; }
            const yyyy = parseInt(birDayCode.substring(0, 4), 10);
            const mm = parseInt(birDayCode.substring(4, 6), 10);
            const dd = parseInt(birDayCode.substring(6), 10);
            const xdata = new Date(yyyy, mm - 1, dd);
            if (xdata > new Date()) {
                return false;// 生日不能大于当前日期
            } else if ((xdata.getFullYear() == yyyy)
					&& (xdata.getMonth() == mm - 1) && (xdata.getDate() == dd)) {
                return true;
            }
            return false;

        }

        // 获取奇偶校验位
        function getParityBit () {
            const id17 = idCardNo.substring(0, 17);

            let power = 0;
            for (let i = 0; i < 17; i++) {
                power += parseInt(id17.charAt(i), 10) * parseInt(powers[i]);
            }

            const mod = power % 11;
            return parityBit[mod];
        }

        // 检查奇偶校验位是否正确
        function checkParityBit () {
            const parityBit = idCardNo.charAt(17).toUpperCase();
            if (getParityBit(idCardNo) == parityBit) {
                return true;
            }
            return false;

        }

        // 身份证长度校验
        function lengthCheck () {
            return /^(\d{15}|(\d{17}(\d|x|X)))$/.test(idCardNo);
        }

        // 校验15位的身份证号码
        function check15IdCardNo () {
            // 15位身份证号码的基本校验
            let check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/
                .test(idCardNo);
            if (!check) { return false; }
            // 校验地址码
            check = checkAddressCode(addressCode);
            if (!check) { return false; }
            const birDayCode = '19' + idCardNo.substring(6, 12);
            // 校验日期码
            return checkBirthDayCode(birDayCode);
        }

        // 校验18位的身份证号码
        function check18IdCardNo () {
            // 18位身份证号码的基本格式校验
            let check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/
                .test(idCardNo);
            if (!check) { return false; }
            // 校验地址码
            const addressCode = idCardNo.substring(0, 6);
            check = checkAddressCode(addressCode);
            if (!check) { return false; }
            // 校验日期码
            const birDayCode = idCardNo.substring(6, 14);
            check = checkBirthDayCode(birDayCode);
            if (!check) { return false; }
            // 验证校检码
            return checkParityBit(idCardNo);
        }

        // 格式化日期，格式：yyyy-MM-dd
        function formateDateCN (day) {
            const yyyy = day.substring(0, 4);
            const mm = day.substring(4, 6);
            const dd = day.substring(6);
            return yyyy + '-' + mm + '-' + dd;
        }

        // 获取身份证信息 {性别：gender，生日：birthday}
        this.getIdCardInfo = function () {
            const idCardInfo = {
                gender: '', // 性别
                birthday: '', // 出生日期(yyyy-mm-dd)
                age: '', // 年龄
                province: '' // 省份
            };
            if (this.idCardNo.length == 15) {
                var aday = '19' + this.idCardNo.substring(6, 12);
                idCardInfo.birthday = this.formateDateCN(aday);
                if (parseInt(this.idCardNo.charAt(14)) % 2 == 0) {
                    idCardInfo.gender = this.genders.female;
                } else {
                    idCardInfo.gender = this.genders.male;
                }
            } else if (this.idCardNo.length == 18) {
                var aday = this.idCardNo.substring(6, 14);
                idCardInfo.birthday = this.formateDateCN(aday);
                if (parseInt(this.idCardNo.charAt(16)) % 2 == 0) {
                    idCardInfo.gender = this.genders.female;
                } else {
                    idCardInfo.gender = this.genders.male;
                }

            }
            idCardInfo.age = this.getAge('Y');
            idCardInfo.province = this.provinceAndCitys[parseInt(this.idCardNo
                .substring(0, 2))];
            return idCardInfo;
        };

        // 18位身份证转换成15位
        this.getId15 = function () {
            if (this.idCardNo.length == 15) {
                return this.idCardNo;
            } else if (this.idCardNo.length == 18) {
                return this.idCardNo.substring(0, 6)
						+ this.idCardNo.substring(8, 17);
            }
            return null;

        };

        // 15位身份证转换18位
        getId18 = function (idCardNo) {
            if (idCardNo.length == 15) {
                const id17 = idCardNo.substring(0, 6) + '19'
						+ idCardNo.substring(6);
                const parityBit = getParityBit(id17);
                return id17 + parityBit;
            } else if (idCardNo.length == 18) {
                return idCardNo;
            }
            return null;

        };

        /**
		 * 身份证号返回年龄
		 * 
		 * @param type 精确类型：Y-年，M-月，D-天
		 */
        this.getAge = function (type) {
            const day = new Date();
            // 获取当前的日期
            const _year = day.getYear();
            const _month = day.getMonth() + 1;
            const _day = day.getDate();
            const idCardNo = this.getId18(this.idCardNo);
            const birYear = idCardNo.substring(6, 10);
            const birMonth = idCardNo.substring(10, 12);
            const birDay = idCardNo.substring(12, 14);

            let age = _year - birYear;
            const m = _month - birMonth;
            const d = _day - birDay;

            if (type == 'M') {
                if (m < 0) {
                    age = age - 1;
                }
            }
            if (type == 'D') {
                if (m < 0 || d < 0) {
                    age = age - 1;
                }
            }
            return age;
        };
    },
    // 校验电话号码
    phone (phoneNum) {
        const reg = /(^13\d{9}$)|(^15[0,1,2,3,5,6,7,8,9]\d{8}$)|(^18[0,1,2,3,5,6,7,8,9]\d{8}$)|(^147\d{8}$)/g;
        return reg.test(phoneNum);
    }
};
