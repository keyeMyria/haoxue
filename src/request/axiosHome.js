import Mock from 'mockjs';
import Axios from 'axios';

// 192.192.168.8:8113
const urlPath = process.env.NODE_ENV === "development"?
                // "http://120.79.247.254:1111":
                "http://120.79.247.254:1111":
                "http://47.107.18.73:1111";
const imgPath = process.env.NODE_ENV === "development"?
                "http://hxj-oss-bucket.oss-cn-shenzhen.aliyuncs.com/":
                "http://hxj-oss-prod.oss-cn-shenzhen.aliyuncs.com/";

sessionStorage.setItem("imgPrefix", imgPath);
Axios.defaults.baseURL = urlPath;
// Axios.defaults.headers.deviceId = "fynmm";
// Axios.defaults.headers.post['content-Type'] = 'multipart/form-data';

console.log(typeof window.returnCitySN["cip"])
export function ImportToken( props ) {
    // Axios.defaults.headers.common["Authorization"] = props;
};
export { urlPath };

//添加一个请求拦截器
Axios.interceptors.request.use(function(config){
    //在请求发出之前进行一些操作
    console.log('发送了一个请求')
    return config;
},function(err){
    console.error('发现一个请求错误')
    //Do something with request error
    return Promise.reject(err);
});

// 添加一个响应拦截器
Axios.interceptors.response.use(function(res){
    //在这里对返回的数据进行处理
    console.log('响应了一个请求')
    return res;
  },function(err){
    console.error('发现一个响应错误')
    //Do something with response error
    return Promise.reject(err);
  })

const AxiosHome = {
    //机构列表
    MechanismList : () => {
        return Axios({
            method:"get",
            url:'/hxj-agency-noauthority-ui/agencyOrg/getAgencyOrgAll',
        });
    },
    //内容分类 
    contentType : () => {
        return Axios({
            method:"get",
            url:'/hxj-agency-noauthority-ui/commClassify/getCommClassifyAll',
        });
    },
    //父母课堂列表
    parentClassList : () => {
        return Axios({
            method:"get",
            url:'/hxj-agency-noauthority-ui/agencyCourse/getAgencyCourseAll',
        });
    },
    //亲子课堂列表
    childClassList : () => {
        Mock.mock('/parent', {
            'result|20': [{
                "fabulous|200-1000" : 1,
                "price|5000-10000" : 1,
                "team" : "高思教育",
                "name" : "SSAT1v1课程_SSAT一对一辅导辅导"
            }]
        })
        return Axios.get('/parent')
    },
    //机构介绍
    AgencyDetailed : (params) => {
        Mock.mock('/detailed', {
            "teachers|12-15" : [{
                "name" : "@cname",
                "introduce" : "60"
            }],
            "curriculum|6-8" : [{
                "fabulous|200-1000" : 1,
                "name" : "SSAT1v1课程_SSAT一对一辅导辅导"
            }],
            "other|4" : ["新东方教育"]
        })
        return Axios.get('/detailed')
        // return Axios({
        //     method:"get",
        //     url:'/hxj-agency-noauthority-ui/agencyOrg/getAgencyOrgDetail',
        //     params : params,
        // });
    },
    //机构介绍--服务器数据
    AgencyDetailedServer : (params) => {
        return Axios({
            method:"get",
            url:'/hxj-agency-noauthority-ui/agencyOrg/getAgencyOrgDetail',
            params : params,
        });
    },
    //机构课程列表
    coursesList : () => {
        Mock.mock('/coursesList', {
            'result|20': [{
                "fabulous|200-1000" : 1,
                "name" : "SSAT1v1课程_SSAT一对一辅导辅导"
            }]
        })
        return Axios.get('/coursesList')
    },
    //全部师资列表
    teacherList : () => {
        Mock.mock('/coursesList', {
            'result|20': [{
                "name" : "@cname",
                "introduce" : "90"
            }]
        })
        return Axios.get('/coursesList')
    },
    // 课程详情
    courseDetails : ( params ) => {
        console.log(params)
        return Axios({
            method:"get",
            url:'/hxj-agency-noauthority-ui/agencyCourse/getAgencyCourseDetail',
            params : params
        });
    },
    // 关于我们-功能特色
    characterist : (params) => {
        return Axios({
            method:"get",
            url:'/hxj-base-noauthority-ui/article/getArticleList',
            params : params,
            
        });
    },
    // 主页-资讯 form  文章列表接口
    homeInformation : (params) => {
        return Axios({
            method:"get",
            url:'/hxj-base-noauthority-ui/article/getArticleList',
            params : params,
        });
    },
    // 主页-推荐课程 from   首页推送课程、机构-接口
    recommend : (params) => {
        return Axios({
            method:"get",
            url:'/hxj-agency-noauthority-ui/push/getPushList',
            params : params,
        });
    },
    // 机构老师列表 from   机构所属老师
    AgencyTeacherList : (params) => {
        return Axios({
            method:"get",
            url:'/teacher-noauthority-ui/teacher/queryTeacherAll',
            params : params,
        });
    },
    // 课程老师列表
    courseTeacherList : (params) => {
        console.log(params)
        return Axios({
            method:"get",
            url:'/hxj-teacher-noauthority-ui/teacher/queryTeacherCourse',
            params : params,
        });
    },
    // 老师详情
    TeacherDetailed : (params) => {
        return Axios({
            method:"get",
            url:'/hxj-teacher-noauthority-ui/teacher/queryTeacher',
            params : params,
        });
    },
    // 我的收藏
    Collection : (token) => {
        console.log(token)
        return Axios.get(`/hxj-agency-ui/agencyCollection/queryAgencyCollection?access_token=${token.access_token}`);
    },
    // 我的学习
    study : (params) => {
        return Axios({
            method: "get",
            url: '/hxj-agency-ui/courseReserve/getUserCourseAll',
            params
        });
    },
    // 获取手机验证码
    getMobileCode : (params) => {
        console.log(params)
        return Axios({
            method: "get",
            url: '/hxj-base-ui/code/sms',
            params : params,
            headers : { deviceId : window.returnCitySN["cip"] }
        });
    },
    // 获取图形验证码
    getGraphicCode : (params) => {
        return Axios({
            method:"get",
            url:'/hxj-base-ui/code/image',
            params,
            // responsetype: 'blob',
            headers : {
                Accept: "image/webp,image/apng,image/*,*/*;q=0.8"
            }
        });
    },
    // 注册=》异步验证 手机是否重复
    VerificationMobile : (params) => {
        console.log(params)
        return Axios({
            method:"get",
            url:'/hxj-base-noauthority-ui/user/checkLoginUser',
            params : params,
        });
    },
    // 用户注册
    UserRegist : (params) => {
        console.log(params)
        return Axios.post('/hxj-base-ui/user/registered', params);
    },
    // 用户登录
    SignIn : (params) => {
        console.log(params)
        return Axios({
            method:"post",
            url:'/hxj-base-ui/admin/admin',
            params : params,
        });
    },
    // 首页轮播
    HomeScroll : (params) => {
        return Axios({
            method:"get",
            url:'/hxj-base-noauthority-ui/article/getArticleList',
            params : params
        });
    }, 
    // 用户完善信息
    PerfectInfo : (params) => {
        console.log(params)
        return Axios({
            method: "post",
            url: `/hxj-base-ui/user/updateUser?access_token=${params.access_token}`,
            data : params,
        });
    }, 
    // 查询个人信息
    queryInfo : (params) => {
        return Axios({
            method:"get",
            url:'/hxj-base-ui/user/getLoginUser',
            params : params,
        });
    }, 
    // 课程预定人信息
    ReservationInfo : (params) => {
        console.log(params)
        return Axios({
            method: "post",
            url: `/hxj-agency-ui/courseReserve/insertCourseReserve?access_token=${params.access_token}`,
            data : params.form
        });
    }, 
    // 类似课程
    SimilarCourses : (params) => {
        console.log(params)
        return Axios({
            method:"get",
            url:'/hxj-agency-noauthority-ui/agencyCourse/pushAgencyCourse',
            params : params,
        });
    }, 
    // 收藏课程
    collectionCourse : (params, token) => {
        console.log(params)
        return Axios.post(`/hxj-agency-ui/agencyCollection/insertAgencyCollection?access_token=${token.access_token}`, params);
    }, 
    // 取消收藏课程
    cancelCollectionCourse : (params, token) => {
        console.log(params)
        return Axios.post(`/hxj-agency-ui/agencyCollection/cancelCollection?access_token=${token.access_token}`, params);
    },
    // 注册短信验证码验证
    VerifyingSMS : (params) => {
        console.log(params)
        return Axios({
            method:"get",
            url:'/hxj-base-ui/code/validate/sms',
            params : params
        });
    }, 
    // 获取收藏状态
    CollectionState : (params) => {
        console.log(params)
        return Axios({
            method: "get",
            url: '/hxj-agency-ui/agencyCollection/queryCollectionState',
            params : {
                access_token : params.token,
                id : params.id
            }
        });
    },
    // 头像上传
    PictureUpload : (token, params) => {
        console.log(params)
        let config = { headers: {'Content-Type': 'multipart/form-data'}}
        return Axios({
            method: "post",
            url: '/hxj-base-ui/user/headImage?access_token='+sessionStorage.getItem("access_token"),
            data : params.param,
            config
        })
    },
    // 注册短信验证码验证
    SMSVerification : (params) => {
        console.log(params)
        return Axios({
            method: "get",
            url: '/hxj-base-ui/code/validate/sms',
            params
        })
    }
}

export default AxiosHome;