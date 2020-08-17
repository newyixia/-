const http="http://39.101.217.150:8086";
// 登录模块
const login="/account/login";
//menu数据的获取
const listForRouter="/menu/listForRouter";
//获取用户信息
const info="/account/info";
//修改密码；
const updatePwd ='/account/updatePwd'
//文章数
const articlebychannel= "/article/articlebychannel"
//文章分类信息
const list= "/channel/list"
//获取菜单的操作信息；
const menuList='/menu/list';
//获取用户列表；
const userlist='/user/list';
//获取部门信息；
const deptlist='/dept/list';
//添加和修改用户；
const addUser='/user';
//删除用户；
const deleteUser='/user';
//获取角色；
const roleTreeListByIdUser="/role/roleTreeListByIdUser";
//设置角色
const setRole= "/user/setRole"
//角色列表
const rolelist="/role/list";
//获取部门列表；
const getdeptlist= "/dept/list"
//添加部门.修改和删除部门
const dept= "/dept"
//添加，修改,删除菜单；
const menuadd='/menu'
//获取字典接口列表
const dictlist='/dict/list'
//添加,修改，删除字典；
const dictAdd='/dict'
//添加，修改，删除栏目；
const channeadd= '/channel';
//上传图片
const file='/file'
//发表，删除，修改文章
const article='/article'
//获取文章列表
const articlelist='/article/list';
//文件管理
const filemgr='/fileMgr/list'
//文件的静态地址
 const publicimg = 'http://39.101.217.150/statics/'
//下载图片
const downloadfile='/file/download'
export  {
	http,
	login,
  listForRouter,
  info,
  updatePwd,
  articlebychannel,
  list,
  menuList,
  userlist,
  deptlist,
  addUser,
  deleteUser,
  roleTreeListByIdUser,
  setRole,
  rolelist,
  getdeptlist,
  dept,
  menuadd,
  dictlist,
  dictAdd,
  channeadd,
  file,
  article,
  articlelist,
  filemgr,
  publicimg,
  downloadfile
}
