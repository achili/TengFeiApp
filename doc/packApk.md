#利用HBuilder将vue项目打包成移动端app

1，将项目目录下config文件内index.js中assetsPublicPath修改为 assetsPublicPath: './'

2. utils .js 文件内容 让静态资源引用css正确
````
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
      })
````
修改为 
````
return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader',
        publicPath: '../../'
      })
````
2，执行npm run build之后生成dist文件夹

3，打开HBuilder，文件->打开目录

3.选择刚才生成的dist目录，输入项目名称，点击完成

4.右键菜单选择‘转换成移动‘转换成移动App’，然后‘myApp’前面的标识就变成了‘A’,至此就已经转换成移动app了

5.随后就可以利用HBuilder连接真机运行或者发行成为原生app


注意 路由使用默认模式  不要改为历史模式 否则无法再本地引用正确静态资源！
