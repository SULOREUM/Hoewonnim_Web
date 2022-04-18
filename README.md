# Hoewonnim_Web
### 👊🏻 Hoewonnim 은 헬스 커뮤니티 반응형 웹 입니다. Hoewonnim 을 통해 자유롭게 운동, 건강, 헬스에 관해 이야기를 나누고 원하는 사진 공유가 가능합니다.

LINK : https://hoewonnim.herokuapp.com/

- 선다혜 adad051111@gmail.com
- 이슬이 iseuli713@gmail.com
- 조시연 chosiyeonn@gmail.com
<br/>

## 🛠️ 사용 기술 및 라이브러리 
- Vue, Vuex, vuex-persistedstate
- swiper.js
- MongoDB
- JavaScript
- HTML/CSS
- npm, node.js
<br/>

## 💡 구현 기능
- **swiper.js**를 이용하여 메인페이지에서 이미지가 설정한 시간에 따라 자동으로 스와이프되도록 구현하였습니다.
- 회원가입 입력 폼의 정보를 **MongoDB**에 저장해 회원가입이 가능하게 했습니다.
- **MongoDB**의 사용자 정보 데이터를 **mongoose api**의 post로 아이디와 패스워드를 찾아 로그인이 될 수 있게 했습니다.
- **Vuex** 를 통해 로그인 성공시 사용자 정보를 한번에 받아와 DB에 여러번 접근하여 걸리는 시간을 줄였습니다. 사용자 정보가 변경될 시 DB에서 새로운 값을 가져오지 않고, Vuex 값을 업데이트 하여 가져옵니다. 그와 동시에 DB 업데이트는 이뤄집니다.
- **Vue** 를 사용하여 게시판, 마이페이지 , 사용자 변경 페이지를 구성하였습니다.
- **Vue-Slider** 를 이용하여 네비게이션 바를 구현하였습니다.
- **Vuex**를 통해 글 목록을 불러오고, **MongoDB**와 연결해 글의 입력 · 수정 · 삭제 기능을 구현하였습니다.
- 사용자는 챌린지(ex) 다이어트, 필라테스) 등을 기간과 함께 설정해서 마이페이지에서 달성도를 볼 수 있습니다. **Chart.js**를 통해 기록한 몸무게를 시각화하였습니다.
<br/>

## 🖥  DB 구조
![image](https://user-images.githubusercontent.com/63833392/148009741-3125639c-f218-4613-81d8-b088f022c263.png)

<br/>
<br/>

## 🖥 실제 화면 
-모바일 화면<br/>
![image](https://user-images.githubusercontent.com/63833392/148009814-18dc8eff-cb14-487d-a6cf-f74bffa78913.png)
<br/>

-로그인 화면 및 마이페이지 
![frontend - Chrome 2022-01-04 13-00-17](https://user-images.githubusercontent.com/63714074/148009974-e69d4b46-5cd9-4291-9e3d-867cfe2428c7.gif)
<br/>

-홈 화면 및 게시판 화면
![frontend - Chrome 2022-01-04 12-37-11_Trim](https://user-images.githubusercontent.com/63714074/148009977-d8c2b8ea-cc67-4a37-88cb-e02e85990bb6.gif)
