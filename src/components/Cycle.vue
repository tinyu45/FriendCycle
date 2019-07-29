<template>
    <div class="container">
        <div class="header">
            <div class="found">
                <img src="@/assets/cycle/comment-uparrow.svg" alt="left"/>
                <span>发现</span>
            </div>
            <h3>车友圈</h3>
            <div class="carmer">
                <img src="@/assets/cycle/friendcircle-camera.svg" alt="camera" >
            </div>
        </div>
        <div class="personal-info">
             <h3>{{username}}</h3>
            <div class="photo">
                <span :class="{hasnew: hasnew}"></span>
            </div>
        </div>

        <div class="friendlog-container">
            <ul>
                <li v-for="(log, index) in loglist" :key="index">
                    <div class="friendlog-top">
                        <!--顶部日志信息 -->
                        <img class="headImage" :src="log.headimg" alt="friends1">
                        <div class="log-right">
                            <h3>{{log.name}}</h3>
                            <p>{{log.title}}</p>
                        </div> 
                    </div>

                    <div  class="log-main">
                         <!--链接类型-->
                        <a v-if="log.isurl" href="www.baidu.com" class="url-type-box"> 
                            <img  class="headImage" :src="log.url.img" alt="friends1"/>
                            <p>
                                {{log.url.info}}
                            </p>
                        </a>
                        
                        <!--配图类型-->
                        <div v-if="!log.isurl" class="img-box">
                            <img 
                                v-for="(item, id) in log.imgs" 
                                :class="{
                                    'muit-img': log.imgs.length>1, 
                                    'bigsize': currentwidth(log.imgs.length)=='bigsize',
                                    'normalsize': currentwidth(log.imgs.length)=='normalsize',
                                    'smallsize': currentwidth(log.imgs.length)=='smallsize',
                                    } " 
                                :key="id+'img'" 
                                :src="item"  
                            />
                        </div>
                            
                        <div class="comment-box">
                            <div class="action-container">
                                <a class="action" @click="likeHandler(log, index)"> 
                                    <i class="fa fa-heart-o" :class='{active: log.like}' aria-hidden></i>
                                    <span>{{log.likeNum}}</span>
                                </a>
                                <a class="action">
                                    <i class="fa fa-commenting-o" aria-hidden @click="commentHandler(log, index)"></i>
                                    <span>评论</span>
                                </a>
                                <a v-if="log.name==username" class="action" @click="deleteHandler(index)">
                                    <i class="fa fa-trash-o" aria-hidden></i>
                                    <span>删除</span>
                                </a>
                            </div>
                            <div class="action-container">12小时前</div>
                            <div class="comment">
                                <p v-for="c in log.comment.filter((value, index)=> {return log.showall ? true : index<3})"  :key="c.name"><span>{{c.name}}</span>:{{c.text}}</p>
                            </div>
                            <div class="action-container" v-if="log.comment.length>3">
                                <span>{{log.showall ? "收起" : "查看全部评论" }}</span>
                                <img v-if="!log.showall" src="@/assets/cycle/comment-downarrow.svg" alt="下拉" @click="showall(log, index)"/>
                                <img v-if="log.showall" src="@/assets/cycle/comment-uparrow.svg" alt="下拉" @click="showall(log, index)"/>
                            </div>
                        </div>
                        
                    </div>
                </li>
            </ul>
        </div>
        <div v-show="inputcomment" class="addcomment">
            <input type="text" placeholder="请输入..." v-model="newcomment"/>
            <button @click="addcommentHandler()">发送</button>
        </div>
    </div>
</template>

<script>
    export default{
        name: 'banner',
        //状态数据
        data(){
            return {
               maxwidth:344,
               inputcomment:false,
               newcomment:'',
               hasnew:false,
               currentlog:null,
               currentindex:0,
               username:'凌度',
               loglist:[
                   {
                       headimg: require('../assets/cycle/f1.jpeg'),
                       name:'凌度',
                       title:'滴滴出行, 出行无忧',
                       isurl:true,
                       likeNum:15,
                       like:true,
                       url:{
                           img: require('../assets/cycle/f2.jpg'),
                           info: '滴滴出行，从此出行再无忧。'
                       },
                       comment:[
                           {name:'秋香', text:'赞~'},
                           {name:'我爱保时捷', text:'滴滴，从此出行再无忧。'},
                           {name:'张华', text:'优秀'},
                           {name:'孤帆远影', text:'最喜欢用滴滴啦'}
                       ],
                       showall:false
                   },

                    {
                       headimg: require('../assets/cycle/f2.jpg'),
                       name:'甲壳虫',
                       title:'2017年1月，心之向往，记我的西藏之行，历时16天，川进青出。',
                       isurl:false,
                       likeNum:123,
                       like:false,
                       imgs:[require('../assets/cycle/timg.jpg'), require('../assets/cycle/timg.jpg')],
                       comment:[
                           {name:'秋香', text:'赞~'},
                           {name:'我爱保时捷', text:'滴滴，从此出行再无忧。'}
                       ],
                       showall:false
                   },

                   {
                       headimg: require('../assets/cycle/f1.jpeg'),
                       name:'凌度',
                       title:'滴滴出行, 出行无忧',
                       isurl:true,
                       likeNum:58,
                       like:false,
                       url:{
                           img: require('../assets/cycle/f2.jpg'),
                           info: '滴滴出行，从此出行再无忧。'
                       },
                       comment:[
                           {name:'秋香', text:'赞~'},
                           {name:'我爱保时捷', text:'滴滴，从此出行再无忧。'}
                       ],
                       showall:false
                   },

                    {
                       headimg: require('../assets/cycle/f2.jpg'),
                       name:'甲壳虫',
                       title:'2017年1月，心之向往，记我的西藏之行，历时16天，川进青出。',
                       isurl:false,
                       likeNum:35,
                       like:true,
                       imgs:[require('../assets/cycle/timg.jpg')],
                       comment:[
                           {name:'秋香', text:'赞~'},
                           {name:'我爱保时捷', text:'滴滴，从此出行再无忧。'}
                       ],
                       showall:false
                   },

                     {
                       headimg: require('../assets/cycle/f2.jpg'),
                       name:'甲壳虫',
                       title:'2017年1月，心之向往，记我的西藏之行，历时16天，川进青出。',
                       isurl:false,
                       imgs:[require('../assets/cycle/timg.jpg'), require('../assets/cycle/timg.jpg'), require('../assets/cycle/timg.jpg'),require('../assets/cycle/timg.jpg')],
                       comment:[
                           {name:'秋香', text:'赞~'},
                           {name:'我爱保时捷', text:'滴滴，从此出行再无忧。'}
                       ],
                       showall:false
                   }
               ]
            }      
        },
        //方法
        methods:{
            currentwidth(num){
                if(num==1)
                    return "bigsize";
                else if(num%3==0 || num>4)
                {
                    return "smallsize";
                }else{
                    return "normalsize";
                }
            },
            
            
            likeHandler(log, index)
            {   if(log.like)
                    log.likeNum--;
                else
                    log.likeNum++;
                log.like=!log.like;
                this.loglist.splice(index, 1, log);
            },

             deleteHandler(index){
                 if(confirm("确定要删除吗?")){
                     this.loglist.splice(index, 1);
                 }
             },

             commentHandler(log, index){
                 this.currentlog=log;
                 this.currentindex=index;
                 this.inputcomment=true;
             },

             addcommentHandler(){
                 let log=this.currentlog;
                 if(log.name==this.username)
                 {
                     this.hasnew=true;
                 }
                 let comment={name: this.username, text: this.newcomment};
                 //console.log(comment);
                 log.comment.push(comment);
                 this.loglist.splice(this.currentindex, 1, log);
                 this.newcomment='';
                 this.inputcomment=false;
                 this.currentlog=null;
                 this.currentindex=0;
             },

             showall(log ,index)
             {
                 log.showall=!log.showall;
                 this.loglist.splice(index, 1, log);
             }



        },

        computed:{
            
        },


        //初始化（页面渲染完）
        mounted(){
            
        }
    }
</script>
    
<style scoped>
    .container{width:100%;  height:100%;}

    .header{
        width:96%;
        padding:0 2%;
        height:80px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        line-height:80px;
        background:rgb(54,57,61);
        color:white;
    }

    .found{
        text-align: left;
        height:100%;
        width:90px;
        font-size: 24px;
    }

    .found img{
        width:28px;
        transform: rotateZ(-90deg);
    }

    .header h3{ 
        display:block; 
        width:500px;
        font-size: 36px;
        font-weight: normal;
    }

    .carmer{
        text-align: right;
        width:120px; 
        height:100%; 
        }
    .carmer img{
        width:35px;
    }



    .personal-info{
        width:100%;
        height:420px;
        background:url(../assets/cycle/friendcircle-banner.png) top left no-repeat;
         background-size:100% 100%;
         position: relative;
    }
    .personal-info h3{
        position:absolute;
        bottom: 60px;
        right: 150px;
        font-size:32px;
        font-weight: normal;
        color:#fff;
        text-shadow:2px 2px 5px #000 0.7;
    }
    .personal-info .photo{
        position:absolute;
        bottom: 32px;
        right: 32px;
        width:96px;
        height:96px;
        border-radius: 8px;
        background:url(../assets/cycle/f2.jpg) top left no-repeat;
        background-size:100% 100%;
    }

    .photo span
    {
        display:block;
        position: absolute;
        right:-8px;
        top:-8px;
        width:16px;
        height:16px;
        border-radius:50%;
        background:red;
        opacity: 0;
    }

    .friendlog-container{
        margin:32px;
        width:686px;
    }

    .friendlog-container>ul{width: 100%;}
    .friendlog-container>ul>li{width:100%;}

    .friendlog-top{
        width:100%; 
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .headImage{
        width:80px; height:80px; border-radius: 8px; 
    }

     .friendlog-top .log-right{
         margin-left:20px;
     }

    .friendlog-top h3{
        text-align: left;
        font-size: 30px; 
        color:#41454d;
        display: block;
        line-height: 48px;
    }
    .friendlog-top p{
        text-align: left;
        font-size: 28px;
        color:#41454d;
        line-height: 40px;
    }

    .log-main{
        width:610px;
        display: block;  
        margin-top:20px; 
        margin-left: 80px;
        margin-right: 32px;
        text-align: left;
    }
    .url-type-box{ 
        width:100%;
        display:table-row;
        width:100%; 
    }


    .url-type-box img{display: table-cell;}
    .url-type-box p{
        padding-left:12px;
        display: table-cell;
        height:80px;
        vertical-align: middle;
        font-size: 26px;
        color:#41454d;
    }


    .comment-box{width:100%;}
    .comment-box .action-container{margin:24px 0; color:#999;  font-size: 24px; }

    .action-container .action{
         display: inline-block; 
         width: 140px; 
         color:#999; 
         font-size: 24px;
         height:32px;
    }

    .action-container .action:hover{
        cursor: pointer;
    }


    .action-container .action span{line-height: 32px;  display: inline-block; margin:0 6px;}
    .action-container .action i{font-size: 28px; }
    .action-container .action .active{color:crimson; font-size: 26px; font-weight: bold;}

    .comment p{
        margin:8px 0;
        font-size: 24px;
        color:#41454d;
        line-height: 40px;
    }

    .comment p span{color: #5bafff;}


    .img-box{
        margin:16px;
        min-height:344px;
    }

    .img-box .muit-img{margin:0 4px;}

    .bigsize{width:344px; height:344px;}
    .normalsize{
        width:268px; height:268px;
    }
    .smallsize{width:176px; height:176px;}

    .photo .hasnew{opacity: 1;}

    .addcomment{
        position:fixed;
        bottom:-1px;
        padding-left:2%;
        width:98%;
        height:80px;
        background:#eee;
        line-height:80px;
        text-align: left;
    }

    .addcomment input{
        border:1px solid #dedede;
        text-indent: 8px;
        border-radius: 10px;
        outline:none;
        height:48px;
        width:580px;
    }

    .addcomment button{
        border:1px solid #ddd;
        color:#aaa;
        background:white;
        height:48px;
        border-radius: 5px;
    }


</style>