import Vue from 'vue';
import Router from 'vue-router';
import MainPage from "../components/MainPage";
import SignUp from "../components/views/SignUp";
import SignIn from "../components/views/SignIn";
import MyPage from "../components/views/MyPage";
import MyPageUserInfo from "../components/views/MyPageUserInfo";
import Upload from "../components/views/Upload";
import Auth from "../components/views/Auth";

import List from "../components/views/boards/List.vue";
import QnA from "../components/views/boards/QnA";
import Promotion from "../components/views/boards/Promotion";
import Photo from "../components/views/boards/Photo";
import Write from "../components/views/boards/Write";
import DetailBoardPage from "../components/views/boards/DetailBoardPage"
import UploadPhoto from "../components/views/boards/UploadPhoto";

import Name from "../components/views/boards/UserInfo/Name"
import Birth from "../components/views/boards/UserInfo/Birth"
import Sex from "../components/views/boards/UserInfo/Sex"
import Email from "../components/views/boards/UserInfo/Email"
import Phone from "../components/views/boards/UserInfo/Phone"

Vue.use(Router); // use vue router

const routes = [
    {
        path: '/',
        name: MainPage,
        component: MainPage
    },
    {
        path:'/views/SignUp',
        name: SignUp,
        component: SignUp
    },
    {
        path:'/views/SignIn',
        name: SignIn,
        component: SignIn
    },
    {
        path:'/views/MyPage',
        name: MyPage,
        component: MyPage
    },
    {
        path:'/views/MyPageUserInfo',
        name: MyPageUserInfo,
        component: MyPageUserInfo
    },
    {
        path:'/views/Upload',
        name: Upload,
        component: Upload
    },
    {
        path:'/views/Auth',
        name: Auth,
        component: Auth
    },
    {
        path:'/views/boards/QnA',
        name: 'QnA',
        component: QnA
    },
    {
        path:'/views/boards/Promotion',
        name: 'Promotion',
        component: Promotion
    },
    {
        path:'/views/boards/Photo',
        name: 'Photo',
        component: Photo
    },
    {
        path:'/views/boards/:prev/Write/:id?',
        name: 'Write',
        component: Write
    },
    {
        path:'/views/boards/List',
        name: 'List',
        component: List
    },
    {
        path:'/views/boards/:prev/:id',
        name: 'DetailBoardPage',
        component: DetailBoardPage
    },
    {
        path:'/views/boards/:prev/Upload/:id?',
        name: 'UploadPhoto',
        component: UploadPhoto
    },
    {
        path: '/views/boards/UserInfo/Name',
        name: 'Name',
        component: Name
    },
    {
        path: '/views/boards/UserInfo/Birth',
        name: 'Birth',
        component: Birth
    },
    {
        path: '/views/boards/UserInfo/Sex',
        name: 'Sex',
        component: Sex
    },
    {
        path: '/views/boards/UserInfo/Email',
        name: 'Email',
        component: Email
    },
    {
        path: '/views/boards/UserInfo/Phone',
        name: 'Phone',
        component: Phone
    }

]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

export default router;