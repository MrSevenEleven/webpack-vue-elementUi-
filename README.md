
# 纪要

### 路由、组件通信  
```javascript
一、通过路由带参数进行传值  
this.$router.push({name:"路由配置里的路由名",params:{传递的数据}});  
this.$router.push({name:"路由配置里的路由名",query:{传递的数据}});  
this.$router.push({path:"路由配置里的路径名",params:{传递的数据}});  
this.$router.push({path:"路由配置里的路径名",query:{传递的数据}});不成功  
params传参不显示在url，但F5刷新参数会被清除  
query传参显示在url，F5刷新参数不会被清除  

调用参数：   
this.$route.params  
this.$route.query  

二、父子传参  
	父传子：父组件在调用子组件是传递参数，子组件通过props接受  
		父组件调用：<child data1=params1 data2=params2></child>  
		子组件接收：export default={  
				...  
				props:[data1,data2],//不指定数据类型  
				props:{//指定数据类型  
					data1:Object,  
					data2:String,  
				}  
				...  
				}  
	子传父：子组件通过emit触发父组件里的一个方法，父组件通过方法带的参数获取参数  
		子组件触发：this.$emit("childevent",params数据)  
		父组件接收：<child @childevent="parentfunc"></child>  
					parentfunc:function(params数据){  
					}  

三、不同组件传值vuex  
四、不同组件传值eventbus  
	专门定义一个vue实例，用于传递参数。  
				import Vue from "..."  
				export default new Vue();  
	传出数据的组件：import eventbus from "...";  
				eventbus.$emit("event",params);  
	接受数据的组件：import eventbus from "...";  
				eventbus.on("event",function(params){  
					...  
				});  

五、通过设置 Session Storage缓存的形式进行传递  
六、在Vue的prototype中添加变量属性存储数据  
Vue.prototype.list = list;  
```

### package.json    
```javascript
{  
  "name": "practice1",  
  "version": "1.0.0",  
  "description": "",  
  "main": "index.js",  
  "scripts": {  
    "test": "echo \"Error: no test specified\" && exit 1",  
    "start": "webpack-dev-server --open",  
    "build": "webpack --mode production",  
    "dev": "webpack --mode development"  
  },  
  "keywords": [],  
  "author": "",  
  "license": "ISC",  
  "devDependencies": {//开发依赖 -D   
    "@babel/core": "^7.5.5",//core,loader,preset-env几个依赖有版本依赖关系，不能用错版本  
    "babel-loader": "^8.0.6",  
    "@babel/polyfill": "^7.4.4",//编译es6API  
    "@babel/preset-env": "^7.5.5",//babel编译程度配置，babelrc的presets里配置  
    "babel-preset-stage-1": "^6.24.1",//也是编译程度配置  
    "babel-plugin-dynamic-import-webpack": "^1.1.0",//动态加载依赖()=>import("app.vue"),babelrc的plugin里配置  
    "babel-plugin-component": "^1.1.1",//elementUi按需引入借助的依赖   
    "html-webpack-plugin": "^3.2.0",//模板html插件，动态引入css，js  
    "clean-webpack-plugin": "^3.0.0",//输出文件夹清理插件，打包前清空文件夹  
    "css-loader": "^3.1.0",//解析css文件的loader  
    "postcss-loader": "^3.0.0",//css兼容性补全loader，需要配置插件autoprefixer  
    "autoprefixer": "^9.6.1",  
    "extract-text-webpack-plugin": "^4.0.0-beta.0",//将解析的css打包成单独文件的插件，多个文件多个插件实例  
    "style-loader": "^0.23.1",//将解析的css以style插入到html里的loader  
    "sass-loader": "^7.1.0",//scss转换成css的loader  
    "node-sass": "^4.12.0",//sass-loader依赖  
    "url-loader": "^2.1.0",//文件打包，以及css的url解析的loader（内部包含了file-loader）  
    "file-loader": "^4.1.0",  
    "html-withimg-loader": "^0.1.16",//解析html里插入图片的loader  
    "vue-loader": "^15.7.1",  
    "vue-template-compiler": "^2.6.10",  
    "element-ui": "^2.11.1",  
    "webpack": "^4.39.1",  
    "webpack-cli": "^3.3.6",  
    "webpack-dev-server": "^3.7.2"  
  },  
  "dependencies": {//生产依赖 -S  
    "vue": "^2.6.10",  
    "vue-router": "^3.1.1"，  
    "core-js": "^2.6.9",  
  },  
  "postcss": {//css兼容性补全配置  
    "plugins": {  
      "autoprefixer": {}  
    }  
  },  
  "browserslist": [//postcss浏览器兼容性配置  
    "> 1%",  
    "last 2 versions"  
  ]  
}  
```
### babelrc        
```javascript
{  
    "presets":[["@babel/preset-env", {  
    //@babel/polyfill配置，默认为false,不启用，如果import或配置entry引入，会无视browserlist将polyfill全部加载;entry:import方式引入，会  
    根据browserlist过滤出需要的polyfill;usage:不需要手动引入，会根据 browserlist + 业务代码使用到的新 API 按需进行 polyfill
    "useBuiltIns": "usage",  
    "corejs": 2 //core-js依赖的版本  
  }]],  
    "plugins": [  
        ["syntax-dynamic-import"],  
        [//elementUi按需引入配置，需要babel-plugin-component依赖  
          "component",  
          {  
            "libraryName": "element-ui",  
            "styleLibraryName": "~src/style/element-#DD5918"//elementui主体配置，主体文件相对于babelrc的相对地址，开头要有~  
          }  
        ]  
    ]  
}  
```
  
### webpack.config.js         
```javascript
const path = require("path");   
//node的path模块，提供了一些处理路径的方法，如path.join("/aaa","/bbb",...)，简单的字符串连接；path.resolved("./aaa","../bbb")按顺序依次以相对路径的方式解 析。__dirname变量表示当前js的绝对路径，"./"会返回当前执行执行node命令的路径
const htmlwebpackplugin = require("html-webpack-plugin");//html插件  
const extracttextplugin = require("extract-text-webpack-plugin");//css文件生成插件  
const scssextract=new extracttextplugin({//多个输出css文件时，创建多个实例   
    filename:"font/[name].iconfont.css"  
});  
const {CleanWebpackPlugin} = require("clean-webpack-plugin");//清除文件目录插件  
const {VueLoaderPlugin} = require("vue-loader");//vue插件  
module.exports={  
	//单入口  
	entry:"./src/main.js",  
    output:{  
     	path:__dirname+"/dist",  
     	filename:"[hash].boudle.js"  
    }  
    //多入口  
    entry: {  
        // pageA:["@babel/polyfill", "./src/js/main.js"],//全部引入polyfill的一种方式  
        pageA: "./src/js/main.js",  
        pageB: "./src/js/index.js"  
    },  
    output: {  
        filename: "js/[name].js",  
        path: path.resolve(__dirname, "dist")  
    },  
    //插件配置  
	plugins:[  
		new htmlwebpackplugin({  //html模板生成插件,多入口多个插件实例  
            template: "src/index.html",  
            filename: "pageA.html",  
            chunks: ["pageA"],  
            title: "pageA",  
            hash: true,  
        }),  
        scssextract,  
        new CleanWebpackPlugin(),  
        new VueLoaderPlugin()  
	],  
	module:{  
        rules: [  
            {  
                test: /\.scss$/,//正则匹配文件  
                // use:["style-loader","css-loader","sass-loader"],//写入到html里  
                use: scssextract.extract({						   //生成单独的css  
                    use: ["css-loader", 'postcss-loader', "sass-loader"],  
                    fallback: "style-loader",//不提取的时候用什么方式处理css(allChunks: false)  
                }),  
                exclude: /node_modules/  
            }, {  
                test: /\.(jpe?g|png|gif)$/,  
                use: [{  
                    loader: "url-loader",  
                    options: {  
                        limit: 8192,//小于这个大小的文件，将被转换成base64保存  
                        name: "img/[name].[ext]"  
                    }  
                }],  
            }, {   
                test: /\.(htm|html)$/,   
                use: "html-withimg-loader"   
            }, {   
                test: /\.js$/,  
                include: /src/,  
                exclude: /node_modules/,  
                use: "babel-loader"  
            }, {  
                test: /\.vue$/,  
                use: "vue-loader",  
                exclude: /node_modules/,  
            },{  
                test: /\.(ttf|eot|woff|woff2|svg)$/,  
                use: [{  
                    loader: "url-loader",  
                    options: {  
                        limit: 8192,  
                        name: "font/[name].[ext]"  
                    }  
                }],  
            }  
        ],  
	},  
	devtool: "source-map",//打包方式，  
    devServer: {//开发服务  
        contentBase: "dist",//目录地址  
        port: "8080",//端口号  
        inline: true,  
        openPage: "pageA.html"//当有多个入口文件时，指定服务打开的html   
    },  
    mode: "development"//生产开发模式设置  
};  
```


### 入口文件main.js    
```javascript
引入相关模块，如  
import Vue from "vue";  
import Router from "vue-router";  
import ElementUi from "element-ui";  
import Add from "../component/Add.vue";  
  
引入css，scss文件等，如  
import "../css/main.scss";  
import "../font/iconfont.css";  
  
在vue中引入相关模块  
Vue.use(ElementUi);  
Vue.use(Router);  

//elementUi按需引入   
//import {Icon,Input,DatePicker,Button} from "element-ui";   
//Vue.use(Icon);  
//Vue.use(Input);  
//Vue.use(DatePicker);  
//Vue.use(Button);  
//babelrc设置"useBuiltIns": "entry"时引入polyfill  
// import "@babel/polyfill";  

  
//路由配置  
let router = new Router({  
    routes: [{  
        path: "/",  
        name: "list",  
        component: List  
        // component: () => import("../component/List.vue")//懒加载方式引入  
    }, {  
        path: "/add",  
        name: "add",  
        // component:Add  
        component: () =>import ("../component/Add.vue")  
    }, {  
        path: "/completed",  
        name: "completed",  
        component: Completed  
        // component: () => import("../component/Completed.vue")  
    }]  
});  

///创建vue实例  
new Vue({  
    router,  
    el: "#app",  
    render: h => h(App)  
});
```

```html  
### vue相关

```
