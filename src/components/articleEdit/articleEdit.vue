<template>
<div class="articleEdit">
  <div>
    <el-button type="primary" @click="upText">提交</el-button>
  </div>
  <div style="padding: 10px 0" class="title">
    <el-row>
      <el-col :span="18">
        <el-form ref="form" :model="form" label-width="60px">
          <el-form-item label="标题">
            <el-input v-model="form.title" placeholder="文章名称"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="类型">
            <el-select v-model="form.idChannel" placeholder="类型">
              <el-option  v-for="(item,i) in abb" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
  <div style="background:#fff;">
    <div ref="editor" class="edit">

    </div>
  </div>
</div>
</template>

<script>
    import {http,list,file,article} from "../../api/api";
    import wangeditoer from 'wangeditor'
    export default {
      name: "articleEdit",
      data() {
        return {
          form:{
            title:'',
            idChannel:''
          },
          //分类详情
          abb:[],
          editor:''
        }
      },
      mounted() {
        this.editor=new wangeditoer(this.$refs.editor);
        // 隐藏“网络图片”tab
        this.editor.customConfig.showLinkImg = false
        this.editor.customConfig.uploadImgServer = '/upload'  // 上传图片到服务器
        // 限制一次最多上传 1 张图片
        this.editor.customConfig.uploadImgMaxLength = 1
        this.editor.customConfig.customUploadImg =  (files, insert)=> {
          // files 是 input 中选中的文件列表
          // insert 是获取图片 url 后，插入到编辑器的方法
          let f=files[0];
          let d=new FormData();
          d.append('file',f)
          // 上传代码返回结果之后，将图片插入到编辑器中
          this.$http.post(http+file,d,{
            headers:{
              'constnet-type':'multipart/form-data',
              'Authorization':localStorage.token
            }
          }).then((data)=>{
            if(data.data.msg=='成功') {
             insert(data.data.data.realFileName)
            }
          },(error)=>{
            console.log('失败')
          })
        }
        this.editor.create();
        this.getarticle();
      },
      methods:{
        getarticle() {
          this.$http.get(http+list,{emulateJSON:true}).then((data)=>{
            const loading = this.$loading({
              lock: true,
              text: 'Loading',
              spinner: 'el-icon-loading',
              background: 'rgba(0, 0, 0, 0.7)'
            });

            this.abb=data.data.data;
            setTimeout(() => {
              loading.close();
            }, 1000);
          },(err)=>{
            this.$message.error('失败')
          })
        },
        upText() {
          let json={
            author:this.$store.state.user.info.profile.name,
            content:this.editor.txt.html().replace(/\%/g,'%25'),
            title:this.form.title,
            idChannel: this.form.idChannel
          }
          var flag=true
          for(let i in json) {
            if(json[i]=="") {
              this.$message.error('请补全信息')
              flag=false
            }
          }
          if(flag) {
            this.$http.post(http+article,JSON.stringify(json),{emulateJSON:true}).then((data)=>{
              this.$message.success('提交成功')
            },(err)=>{
              this.$message.error('失败')
            })
          }
        }
      }
    }
</script>

<style scoped>
.articleEdit {
  padding: 20px;
}
  .edit {
    position: relative;
    z-index: 1;
  }
  .title {
    position: relative;
    z-index: 2;
  }
</style>
