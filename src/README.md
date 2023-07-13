## 介绍

#### 这是整个项目的所有功能组件文件

文件结构
src
├─ API
│  ├─ Ctrl_menuAPI
│  │  ├─ ArticleAPI.js
│  │  ├─ getPicAPI.js
│  │  ├─ LoginAPI.js
│  │  └─ UserData.js
│  ├─ Email
│  │  ├─ Email.js
│  │  └─ getSetting.js
│  ├─ indexAPI
│  │  ├─ getArticle.js
│  │  └─ getArticleList.js
│  ├─ main
│  │  └─ GetUserInfo.js
│  ├─ request
│  │  └─ index.js
│  └─ UserActionAPI
│     └─ UserActiveGet.js
├─ assets
│  ├─ css
│  │  ├─ index.css
│  │  └─ typeface.css
│  ├─ font
│  │  ├─ bullpen-3d
│  │  │  └─ Bullpen3D.ttf
│  │  ├─ Cookie
│  │  │  ├─ Cookie-Regular.ttf
│  │  │  └─ OFL.txt
│  │  ├─ Pacifico
│  │  │  ├─ OFL.txt
│  │  │  └─ Pacifico-Regular.ttf
│  │  ├─ Patrick_Hand
│  │  │  ├─ OFL.txt
│  │  │  └─ PatrickHand-Regular.ttf
│  │  ├─ PT_Serif
│  │  │  ├─ OFL.txt
│  │  │  ├─ PTSerif-Bold.ttf
│  │  │  ├─ PTSerif-BoldItalic.ttf
│  │  │  ├─ PTSerif-Italic.ttf
│  │  │  └─ PTSerif-Regular.ttf
│  │  ├─ songti
│  │  │  ├─ NotoSerifSC-Black.otf
│  │  │  ├─ NotoSerifSC-Bold.otf
│  │  │  ├─ NotoSerifSC-ExtraLight.otf  
│  │  │  ├─ NotoSerifSC-Light.otf
│  │  │  ├─ NotoSerifSC-Medium.otf
│  │  │  ├─ NotoSerifSC-Regular.otf
│  │  │  ├─ NotoSerifSC-SemiBold.otf
│  │  │  └─ OFL.txt
│  │  └─ 橙子字体
│  │     ├─ orange juice 2.0.ttf
│  │     └─ ReadMe.txt
│  ├─ js
│  │  └─ index.js
│  └─ logo.png
├─ components
│  ├─ Article
│  │  ├─ ArticleLogin
│  │  │  └─ ArticleLogin.vue
│  │  └─ article.vue
│  └─ Module
│     ├─ ArticleListCount
│     │  ├─ Artlist.vue
│     │  ├─ MonthItem.vue
│     │  └─ YearItem.vue
│     ├─ TestModule
│     │  └─ WidthAndHeight.vue
│     ├─ Collection_Card.vue
│     ├─ DevP_cagPanel.vue
│     ├─ gallery.vue
│     └─ PageCad.vue
├─ layout
│  ├─ FooterBar
│  │  └─ Footer.vue
│  └─ Header
│     ├─ CtrlMenuHeader.vue
│     └─ Header.vue
├─ router
│  ├─ router.js
│  └─ RouterMap.js
├─ store
│  └─ index.js
├─ Views
│  ├─ Ctrl_menu
│  │  ├─ menu
│  │  │  ├─ Article_elpage
│  │  │  │  ├─ addArticle.vue
│  │  │  │  ├─ Article_index.vue
│  │  │  │  └─ cagArticle.vue
│  │  │  ├─ Authority_elpage
│  │  │  │  └─ cagUserData.vue
│  │  │  ├─ Collection_elpage
│  │  │  │  ├─ mycollect.vue
│  │  │  │  ├─ mycomment.vue
│  │  │  │  └─ mygoodnum.vue
│  │  │  ├─ Setting_elpage
│  │  │  │  ├─ CagDevP.vue
│  │  │  │  ├─ CagLunbo.vue
│  │  │  │  ├─ CagpanelColor.vue
│  │  │  │  └─ CagSpsList.vue
│  │  │  ├─ User_elpage
│  │  │  │  ├─ User_cagDate.vue
│  │  │  │  ├─ User_del_cagpwd.vue
│  │  │  │  └─ User_self.vue
│  │  │  ├─ Article.vue
│  │  │  ├─ Authority.vue
│  │  │  ├─ Collection.vue
│  │  │  ├─ Setting.vue
│  │  │  └─ Users.vue
│  │  ├─ CtrlViewAside.vue
│  │  └─ Ctrl_view.vue
│  ├─ index
│  │  ├─ Content_Area
│  │  │  ├─ indexArticleList.vue
│  │  │  ├─ Left.vue
│  │  │  ├─ Lunbo.vue
│  │  │  └─ Right.vue
│  │  └─ ContentArticle.vue
│  └─ Page
│     ├─ 10010.vue
│     ├─ 404.vue
│     ├─ AboutM.vue
│     ├─ checkVer.vue
│     ├─ DevProcess.vue
│     ├─ Login.vue
│     ├─ Page.vue
│     ├─ Register.vue
│     ├─ Search.vue
│     ├─ SpsList.vue
│     └─ Users.vue
├─ App.vue
├─ main.js
└─ README.md
