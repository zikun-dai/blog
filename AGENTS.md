<!-- 帮我优化src/content/posts下的所有markdown文档（包括子文件夹下的文档），包括但不限于让逻辑和段落结构更清晰通顺；
部分内容可以精简变成表格形式，更一目了然； -->

<!-- 帮我整理src/content/posts/buy/unusual下的三个markdown文档，允许编辑文件内容，让内容逻辑更清晰通顺；
markdown的图片前面不要使用无序列表（也即`- `），typora中显示有点问题；
把“购买分析与使用场景”、“基础概念”压成更短的决策树/表格，减少废话； -->

<!-- 我重构了一下文件结构，我新建了一个hexo-blog存放之前的代码，把astro-blog内容复制到了blog.git下代替之前的，但是现在无法npm run deploy一键部署，帮我部署到gh-page -->

<!-- 修改后深色模式的ui非常丑，四周四个尖角还是浅色的，内部深色也非常生硬，和文本混在一起可读性很差；
深色模式下，```包裹的行间代码依然是浅色 -->

<!-- 浏览器url是http://localhost:4321/blog，点击dark按钮没反应 -->

<!-- 增加切换深色、浅色模式的开关；
写一个readme，介绍如何新建帖子、如何部署；
npm run dev之后的url是http://localhost:4321/blog，之后有需要的话你最好自己迭代一下； -->

<!-- 我在dev中，点击post标题后不404了，但是提示`Cannot GET /blogposts/ubuntu/`
我希望你能够自己迭代查看报错信息，直到网页端的post显示无误，迭代到完全没有问题 -->

<!-- 在把posts从hexo移植到astro时，你只复制了.md文件，没有把附件文件夹（和文件夹同名）移植过来；
设置site: 'https://zikun-dai.github.io/blog/',本地dev显示正常，但deploy之后，网站点击post标题无法查看全文（404）；
设置site: 'https://zikun-dai.github.io/',base: '/blog',dev和deploy都无法正常显示post详情（点击之后显示404）
解决以上两个问题 -->
