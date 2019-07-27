<template>
    <div class="container">
        <div class="header">
            <div class="found">
                <img src="@/assets/cycle/comment-uparrow.svg" alt="left"/>
                <span>发现</span>
            </div>
            <h3>车友圈</h3>
            <div class="carmer">
                <img src="@/assets/cycle/friendcircle-camera.svg" alt="camera">
            </div>
        </div>
        <div class="personal-info">
            <div class="photo">
                <span class="hasnew"></span>
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
                                <div class="action">
                                    <img src="@/assets/cycle/state-thumbs-up.svg" alt="喜欢"/>
                                    <span>125</span>
                                </div>
                                <div class="action">
                                    <img src="@/assets/cycle/state-comment.svg" alt="喜欢"/>
                                    <span>评论</span>
                                </div>
                                <div class="action">
                                    <img src="@/assets/cycle/state-delete.svg" alt="喜欢"/>
                                    <span>删除</span>
                                </div>
                            </div>
                            <div class="action-container">12小时前</div>
                            <div class="comment">
                                <p v-for="c in log.comment" :key="c.name"><span>{{c.name}}</span>:{{c.text}}</p>
                            </div>
                            <div class="action-container">
                                <span>查看全部评论</span>
                                <img src="@/assets/cycle/comment-downarrow.svg" alt="下拉"/>
                            </div>
                        </div>
                        
                    </div>
                </li>
            </ul>
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
               loglist:[
                   {
                       headimg: require('../assets/cycle/f1.jpeg'),
                       name:'凌度',
                       title:'滴滴出行, 出行无忧',
                       isurl:true,
                       url:{
                           img: require('../assets/cycle/f2.jpg'),
                           info: '滴滴出行，从此出行再无忧。'
                       },
                       comment:[
                           {name:'秋香', text:'赞~'},
                           {name:'我爱保时捷', text:'滴滴，从此出行再无忧。'}
                       ]
                   },

                    {
                       headimg: require('../assets/cycle/f2.jpg'),
                       name:'甲壳虫',
                       title:'2017年1月，心之向往，记我的西藏之行，历时16天，川进青出。',
                       isurl:false,
                       imgs:[require('../assets/cycle/timg.jpg'), require('../assets/cycle/timg.jpg')],
                       comment:[
                           {name:'秋香', text:'赞~'},
                           {name:'我爱保时捷', text:'滴滴，从此出行再无忧。'}
                       ]
                   },

                   {
                       headimg: require('../assets/cycle/f1.jpeg'),
                       name:'凌度',
                       title:'滴滴出行, 出行无忧',
                       isurl:true,
                       url:{
                           img: require('../assets/cycle/f2.jpg'),
                           info: '滴滴出行，从此出行再无忧。'
                       },
                       comment:[
                           {name:'秋香', text:'赞~'},
                           {name:'我爱保时捷', text:'滴滴，从此出行再无忧。'}
                       ]
                   },

                    {
                       headimg: require('../assets/cycle/f2.jpg'),
                       name:'甲壳虫',
                       title:'2017年1月，心之向往，记我的西藏之行，历时16天，川进青出。',
                       isurl:false,
                       imgs:[require('../assets/cycle/timg.jpg')],
                       comment:[
                           {name:'秋香', text:'赞~'},
                           {name:'我爱保时捷', text:'滴滴，从此出行再无忧。'}
                       ]
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
                       ]
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

    .action-container .action img{width:34px;}
    .action-container .action span{line-height: 32px;  display: inline-block; margin:0 6px;}

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
</style>