<template>
  <div class="mgrAdd">
    <el-dialog title="修改文章" :visible.sync="thisType" @close="fun(tname);editor='';add=[];form={}" @open="open">
      <div>
        <div style="padding: 10px 0" class="title">
          <el-row>
            <el-col :span="14">
              <el-form ref="form" :model="form" label-width="60px">
                <el-form-item label="标题">
                  <el-input v-model="form.title"></el-input>
                </el-form-item>
              </el-form>
            </el-col>
            <el-col :span="10">
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
        <div>
          <div ref="editor" class="edit">

          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="thisType = false">取 消</el-button>
        <el-button type="primary" @click="upText">保存修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {http,list,file,article} from "../../api/api";
  import wangeditoer from 'wangeditor'
  export default {
    name: "articleEdit",
    props:['type','fun','tablerow','tname'],
    mounted() {

    },
    data() {
      return {
        thisType:this.type,
        form:{

        },
        abb:[],
        editor:''
      }
    },
    methods:{
      open() {
        this.$nextTick(()=>{
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
          this.editor.txt.html(this.form.content)
          this.getarticle();
        })
      },
      getarticle() {
        this.$http.get(http+list,{emulateJSON:true}).then((data)=>{
          this.abb=data.data.data;
        },(err)=>{
          this.$message.error('失败')
        })
      },
      upText() {
        let json={
          author:this.$store.state.user.info.profile.name,
          content:this.editor.txt.html().replace(/\%/g,'%25'),
          title:this.form.title,
          idChannel: this.form.idChannel,
          id:this.form.id
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
            this.thisType=false
          },(err)=>{
            this.$message.error('失败')
          })
        }
      }
    },
    watch:{
      type() {
        this.thisType=this.type
      },
      tablerow() {
        var json={};
        for(var i in this.tablerow) {
          this.$set(json,i,this.tablerow[i].toString())
        }
        this.form=json;
      }

    }
  }
</script>

<style scoped>

</style>

