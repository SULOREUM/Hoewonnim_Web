<template>
  <!-- wrapper -->
  <div class="wrapper">

    <!-- content-->
    <div id="content">

      <!-- ID -->
      <div>
        <h3 class="join_title">
          <label for="id">아이디</label>
        </h3>
        <span class="box int_id">
                        <input v-model="signup.id" type="text" id="id" class="int" maxlength="20">
                        <span class="step_url"></span>
                    </span>
        <span class="error_next_box"></span>
      </div>

      <!-- PW1 -->
      <div>
        <h3 class="join_title"><label for="pswd1">비밀번호</label></h3>
        <span class="box int_pass">
                        <input v-model="signup.password" type="password" id="pswd1" class="int" maxlength="20" @blur="passwordValid">
                        <span id="alertTxt">사용불가</span>
                        <img src="@/assets/lock.png" id="pswd1_img1" class="pswdImg">
                    </span>
        <div v-if="!passwordValidFlag"> <h3 class="error_check">비밀번호는 대문자, 소문자, 숫자가 1개 이상 사용되어야 하고<br>8자이상이어야 합니다.</h3></div>
        <span class="error_next_box"></span>
      </div>

      <!-- PW2 -->
      <div>
        <h3 class="join_title"><label for="pswd2">비밀번호 재확인</label></h3>
        <span class="box int_pass_check">
                        <input v-model="passwordCheck" type="password" id="pswd2" class="int" maxlength="16" @blur="passwordCheckValid">
                        <img src="@/assets/lock.png" id="pswd2_img1" class="pswdImg">
                    </span>
        <div v-if="!passwordCheckFlag"> <h3 class="error_check">비밀번호가 동일하지 않습니다.</h3></div>
        <span class="error_next_box"></span>
      </div>

      <!-- NAME -->
      <div>
        <h3 class="join_title"><label for="name">이름</label></h3>
        <span class="box int_name">
                        <input v-model="signup.name" type="text" id="name" class="int" maxlength="20">
                    </span>
        <span class="error_next_box"></span>
      </div>

      <!-- BIRTH -->
      <div>
        <h3 class="join_title"><label for="yy">생년월일(선택)</label></h3>

        <div id="bir_wrap">
          <!-- BIRTH_YY -->
          <div id="bir_yy">
                            <span class="box">
                                <input type="text" id="yy" class="int" maxlength="4" placeholder="년(4자)">
                            </span>
          </div>

          <!-- BIRTH_MM -->
          <div id="bir_mm">
                            <span class="box">
                                <select id="mm" class="sel">
                                    <option>월</option>
                                    <option value="01">1</option>
                                    <option value="02">2</option>
                                    <option value="03">3</option>
                                    <option value="04">4</option>
                                    <option value="05">5</option>
                                    <option value="06">6</option>
                                    <option value="07">7</option>
                                    <option value="08">8</option>
                                    <option value="09">9</option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                </select>
                            </span>
          </div>

          <!-- BIRTH_DD -->
          <div id="bir_dd">
                            <span class="box">
                                <input type="text" id="dd" class="int" maxlength="2" placeholder="일">
                            </span>
          </div>

        </div>
        <span class="error_next_box"></span>
      </div>

      <!-- GENDER -->
      <div>
        <h3 class="join_title"><label for="gender">성별</label></h3>
        <span class="box gender_code">
                        <select id="gender" class="sel" v-model="signup.gender">
                            <option>성별</option>
                            <option value="M">남자</option>
                            <option value="F">여자</option>
                        </select>
                    </span>
        <span class="error_next_box">필수 정보입니다.</span>
      </div>

      <!-- EMAIL -->
      <div>
        <h3 class="join_title"><label for="email">본인확인 이메일<span class="optional">(선택)</span></label></h3>
        <span class="box int_email">
                        <input type="text" id="email" class="int" maxlength="100" placeholder="선택입력">
                    </span>
        <span class="error_next_box">이메일 주소를 다시 확인해주세요.</span>
      </div>

      <!-- MOBILE -->
      <div>
        <h3 class="join_title"><label for="mobile">휴대전화</label></h3>
        <span class="box int_mobile">
                        <input v-model="signup.phone" type="tel" id="mobile" class="int" maxlength="11" pattern="[+]{1}[0-9]{11,14}" placeholder="'-'을 제외한 휴대폰번호를 입력해 주세요">
                    </span>
        <span class="error_next_box"></span>
      </div>


      <!-- JOIN BTN-->
      <div class="btn_area">
        <button type="button" id="btnJoin" @click="isSuccess">
          <span>가입하기</span>
        </button>
      </div>



    </div>
    <!-- content-->

  </div>
</template>

<script>
export default {
  name: "join",
  data() {
    return {
      signup:{
        id:null,
        password: null,
        name: null,
        gender: '성별',
        phone: null,
      },
      passwordValidFlag: true,
      passwordCheck: '',
      passwordCheckFlag: true
    }
  },
  methods: {
    passwordValid(){
      if(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,16}$/.test(this.signup.password)){
        this.passwordValidFlag = true;
      }
      else{
        this.passwordValidFlag = false;
      }
    },
    passwordCheckValid(){
      if(this.signup.password ==this.passwordCheck){
        this.passwordCheckFlag = true;
      }
      else{
        this.passwordCheckFlag= false;
      }
    },
    isSuccess(){
      if(this.signup.id == null || this.signup.password == null
          || this.signup.name == null || this.signup.gender === '성별' || this.signup.phone == null){
        alert('입력이 되지 않은 곳이 있습니다!')
        return
      }
      if(!this.passwordValidFlag || !this.passwordCheckFlag){
        alert('비밀번호를 확인해주세요!')
        return
      }
      alert('회원가입 성공!')
    },
  }
};
</script>

<style scoped>
.wrapper {
  position: relative;
  width: 40%;
  margin-left: 30%;
  margin-right: 30%;
}

content {
  position: absolute;
  left: 50%;
  width: 100px;
}

.error_check{
  color: #6075eb;
  text-align: left;
  font-size: 12px;
}


/* 입력폼 */

h3 {
  margin: 19px 0 8px;
  font-size: 14px;
  font-weight: 700;
}


.box {
  display: block;
  width: 100%;
  height: 51px;
  border: solid 1px #dadada;
  padding: 10px 14px 10px 14px;
  box-sizing: border-box;
  background: #fff;
  position: relative;
}

.int {
  display: block;
  position: relative;
  width: 100%;
  height: 15px;
  border: none;
  background: #fff;
  font-size: 15px;
}


.box.int_id {
  padding-right: 110px;
}

.box.int_pass {
  padding-right: 40px;
}

.box.int_pass_check {
  padding-right: 40px;
}

.step_url {
  /*@google.com*/
  position: absolute;
  top: 16px;
  right: 13px;
  font-size: 15px;
  color: #8e8e8e;
}

.pswdImg {
  width: 18px;
  height: 20px;
  display: inline-block;
  position: absolute;
  top: 50%;
  right: 16px;
  margin-top: -10px;
  cursor: pointer;
}

#bir_wrap {
  display: table;
  width: 100%;
}

#bir_yy {
  display: table-cell;
  width: 147px;

}

#bir_mm {
  display: table-cell;
  width: 147px;
  vertical-align: middle;
}

#bir_dd {
  display: table-cell;
  width: 147px;
}

#bir_mm, #bir_dd {
  padding-left: 10px;
}

select {
  width: 50%;
  height: 30px;
  font-size: 13px;
  background: #fff url(https://static.nid.naver.com/images/join/pc/sel_arr_2x.gif) 100% 50% no-repeat;
  background-size: 20px 8px;
  -webkit-appearance: none;
  display: inline-block;
  text-align: start;
  border: none;
  cursor: default;
}

/* 에러메세지 */

.error_next_box {
  margin-top: 9px;
  font-size: 12px;
  color: red;
  display: none;
}

#alertTxt {
  position: absolute;
  top: 19px;
  right: 38px;
  font-size: 12px;
  color: red;
  display: none;
}

/* 버튼 */

.btn_area {
  margin: 30px 0 91px;
}

#btnJoin {
  width: 100%;
  padding: 21px 0 17px;
  border: 0;
  cursor: pointer;
  color: #fff;
  background-color: #7994DB;
  font-size: 20px;
  font-weight: 400;
}

</style>