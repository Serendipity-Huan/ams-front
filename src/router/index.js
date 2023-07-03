/**
 * 全站路由配置
 *
 * 建议:
 * 1. 代码中路由统一使用name属性跳转(不使用path属性)
 */
import Vue from 'vue'
import Router from 'vue-router'
import http from '@/utils/httpRequest'
import { isURL } from '@/utils/validate'
import { clearLoginInfo } from '@/utils'

Vue.use(Router)

// 开发环境不使用懒加载, 因为懒加载页面太多的话会造成webpack热更新太慢, 所以只有生产环境使用懒加载
const _import = require('./import-' + process.env.NODE_ENV)

// 全局路由(无需嵌套上左右整体布局)
const globalRoutes = [
  { path: '/404', component: _import('common/404'), name: '404', meta: { title: '404未找到' } },
  { path: '/login', component: _import('common/login'), name: 'login', meta: { title: '登录' } },
  // rjl: 校友页面的路由
  {
    path: '/alumni',
    component: _import('modules/alumni/alumni-main'),
    name: 'alumni-main',
    redirect: { name: 'alumni-home' },
    meta: { title: '校友页面整体布局' },
    children: [
      // 通过meta对象设置路由展示方式
      // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
      // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
      // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
      { path: '/alumni-home', component: _import('common/home'), name: 'alumni-home', meta: { title: '校友首页' } },
      { path: '/alumni-theme', component: _import('common/theme'), name: 'alumni-theme', meta: { title: '校友主题' } },
      { path: '/alumni-demo-echarts', component: _import('demo/echarts'), name: 'alumni-demo-echarts', meta: { title: 'alumni-demo-echarts', isTab: true } },
      { path: '/alumni-demo-ueditor', component: _import('demo/ueditor'), name: 'alumni-demo-ueditor', meta: { title: 'alumni-demo-ueditor', isTab: true } }
    ],
    // 独享路由守卫
    beforeEnter (to, from, next) {
      let token = Vue.cookie.get('token')
      if (!token) {
        clearLoginInfo()
        next({ name: 'login' })
      }
      next()
    }
  }
]

// 主入口路由(需嵌套上左右整体布局)
const mainRoutes = {
  path: '/',
  component: _import('main'),
  name: 'main',
  redirect: { name: 'home' },
  meta: { title: '主入口整体布局' },
  children: [
    // 通过meta对象设置路由展示方式
    // 1. isTab: 是否通过tab展示内容, true: 是, false: 否
    // 2. iframeUrl: 是否通过iframe嵌套展示内容, '以http[s]://开头': 是, '': 否
    // 提示: 如需要通过iframe嵌套展示内容, 但不通过tab打开, 请自行创建组件使用iframe处理!
    { path: '/home', component: _import('common/home'), name: 'home', meta: { title: '首页' } },
    { path: '/theme', component: _import('common/theme'), name: 'theme', meta: { title: '主题' } },
    { path: '/demo-echarts', component: _import('demo/echarts'), name: 'demo-echarts', meta: { title: 'demo-echarts', isTab: true } },
    { path: '/demo-ueditor', component: _import('demo/ueditor'), name: 'demo-ueditor', meta: { title: 'demo-ueditor', isTab: true } }
  ],
  // 独享路由守卫
  beforeEnter (to, from, next) {
    let token = Vue.cookie.get('token')
    if (!token || !/\S/.test(token)) {
      clearLoginInfo()
      next({ name: 'login' })
    }
    next()
  }
}

// 创建一个路由器
const router = new Router({
  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),
  isAddDynamicMenuRoutes: false, // 是否已经添加动态(菜单)路由
  routes: globalRoutes.concat(mainRoutes) // 一组路由
})

// 校友的菜单列表(写死的)
const alumniMenuList = [
  {
    menuId: 39,
    parentId: 0,
    parentName: null,
    name: '校友页面',
    url: '',
    perms: '',
    type: 0,
    icon: 'geren',
    orderNum: 0,
    open: null,
    list: [
      {
        menuId: 40,
        parentId: 39,
        parentName: null,
        name: '个人中心',
        url: 'alumni/personalcenter',
        perms: '',
        type: 1,
        icon: 'bianji',
        orderNum: 0,
        open: null,
        list: []
      }
    ]
  }
]

router.beforeEach((to, from, next) => {
  // 添加动态(菜单)路由
  // 1. 已经添加 or 全局路由, 直接访问
  // 2. 获取菜单列表, 添加并保存本地存储
  if (router.options.isAddDynamicMenuRoutes || fnCurrentRouteType(to, globalRoutes) === 'global') {
    if (to.path === '/alumni-home' && !router.options.isAddDynamicMenuRoutes) { // rjl: 如果是校友第一次登录成功，那么把isAddDynamicMenuRoutes置为true，无需动态地去管理员服务器找菜单
      fnAddDynamicMenuRoutes(alumniMenuList, [], false) // 添加校友菜单的动态路由，实际上是写死的
      router.options.isAddDynamicMenuRoutes = true
      sessionStorage.setItem('menuList', JSON.stringify(alumniMenuList || '[]'))
    }
    console.info('to: ', to)
    console.info('router.options.isAddDynamicMenuRoutes: ', router.options.isAddDynamicMenuRoutes)
    console.info('fnCurrentRouteType(to, globalRoutes) === global: ', fnCurrentRouteType(to, globalRoutes) === 'global')
    next()
  } else { // rjl: 管理员第一次登录时进这个流程，后续都不用进(因为isAddDynamicMenuRoutes被置为true)
    console.info('router.options.isAddDynamicMenuRoutes: ', router.options.isAddDynamicMenuRoutes)
    console.info('fnCurrentRouteType(to, globalRoutes) === global: ', fnCurrentRouteType(to, globalRoutes) === 'global')
    console.info('nav在干什么')
    http({
      url: http.adornUrl('/sys/menu/nav'),
      method: 'get',
      params: http.adornParams()
    }).then(({data}) => {
      if (data && data.code === 0) {
        fnAddDynamicMenuRoutes(data.menuList)
        router.options.isAddDynamicMenuRoutes = true
        console.info('menuList:', data.menuList)
        console.info('permissions:', data.permissions)
        sessionStorage.setItem('menuList', JSON.stringify(data.menuList || '[]'))
        sessionStorage.setItem('permissions', JSON.stringify(data.permissions || '[]'))
        next({ ...to, replace: true })
      } else {
        sessionStorage.setItem('menuList', '[]')
        sessionStorage.setItem('permissions', '[]')
        next()
      }
    }).catch((e) => {
      console.log(`%c${e} 请求菜单列表和权限失败，跳转至登录页！！`, 'color:blue')
      router.push({ name: 'login' })
    })
  }
})

/**
 * 判断当前路由类型, global: 全局路由, main: 主入口路由
 * @param {*} route 当前路由
 */
function fnCurrentRouteType (route, globalRoutes = []) {
  var temp = []
  for (var i = 0; i < globalRoutes.length; i++) {
    if (route.path === globalRoutes[i].path) {
      return 'global'
    } else if (globalRoutes[i].children && globalRoutes[i].children.length >= 1) {
      temp = temp.concat(globalRoutes[i].children)
    }
  }
  return temp.length >= 1 ? fnCurrentRouteType(route, temp) : 'main'
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function fnAddDynamicMenuRoutes (menuList = [], routes = [], isMainRoutes = true) {
  var temp = []
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].list && menuList[i].list.length >= 1) {
      temp = temp.concat(menuList[i].list)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      var route = {
        path: menuList[i].url.replace('/', '-'),
        component: null,
        name: menuList[i].url.replace('/', '-'),
        meta: {
          menuId: menuList[i].menuId,
          title: menuList[i].name,
          isDynamic: true,
          isTab: true,
          iframeUrl: ''
        }
      }
      // url以http[s]://开头, 通过iframe展示
      if (isURL(menuList[i].url)) {
        route['path'] = `i-${menuList[i].menuId}`
        route['name'] = `i-${menuList[i].menuId}`
        route['meta']['iframeUrl'] = menuList[i].url
      } else {
        try {
          route['component'] = _import(`modules/${menuList[i].url}`) || null
        } catch (e) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    fnAddDynamicMenuRoutes(temp, routes, isMainRoutes)
  } else {
    if (isMainRoutes) { // 如果是mainRoutes调用的(管理员)
      mainRoutes.name = 'main-dynamic'
      mainRoutes.children = routes
      router.addRoutes([
        mainRoutes,
        { path: '*', redirect: { name: '404' } }
      ])
      sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
      console.info('dynamicMenuRoutes', JSON.stringify(mainRoutes.children || '[]'))
      console.log('\n')
      console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
      console.log('mainRoutes.children: ', mainRoutes.children)
      console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
    } else { // 如果是globel调用的(校友)
      globalRoutes[2].name = 'alumni-main-dynamic'
      globalRoutes[2].children = routes
      router.addRoutes([
        globalRoutes[2],
        { path: '*', redirect: { name: '404' } }
      ])
      sessionStorage.setItem('dynamicMenuRoutes', JSON.stringify(globalRoutes[2].children || '[]'))
      console.info('dynamicMenuRoutes', JSON.stringify(globalRoutes[2].children || '[]'))
      console.log('\n')
      console.log('%c!<-------------------- 动态(菜单)路由 s -------------------->', 'color:blue')
      console.log('globalRoutes[2].children: ', globalRoutes[2].children)
      console.log('%c!<-------------------- 动态(菜单)路由 e -------------------->', 'color:blue')
    }
  }
}
// 暴露这个路由器
export default router
