<template>
  <div>
    <button @click="test">test</button>
    <img :src="pic"/>
  </div>
</template>

<script>
import {getAssets} from '@/api/api.js'
import JSZip from'jszip'
import { saveAs } from 'file-saver';

export default {
  name: 'abc',
  data () {
    return {
      pic:'',
    }
  },
  mounted: function () {
    this.$tours['abc'].start()
  },
  methods:{
    test(){
      const images = ['image0', 'image1', 'image6']
      let promise = new Promise(function (resolve, reject){
        let base64s = []
        images.forEach(filename=>{
          getAssets(filename).then(
              res => {
                const base64data = btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
                base64s.push(base64data)
              }
          )
        })
        console.log('finish', base64s)
        resolve(base64s);
      })
      promise.then(
          (base64s)=>{
            console.log('in')
            let zip = new JSZip();
            let assets = zip.folder('static').folder('assets')
            for(let i=0; i<images.length; i++){
              assets.file(images[i]+'.png', base64s[i],{base64: true})
            }
            zip.generateAsync({type:"blob"})
                .then(function(content) {
                  // see FileSaver.js
                  saveAs(content, "example.zip");
                });
          }
      )

      /*getAssets('image0').then(
          res => {
            const imgUrl='data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
            this.pic = imgUrl
            let zip = new JSZip();
            let static_ = zip.folder("static");
            let assets = static_.folder('assets');
            const base64data = btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
            assets.file('image0.png',base64data,{base64: true})
            zip.generateAsync({type:"blob"})
                .then(function(content) {
                  // see FileSaver.js
                  saveAs(content, "example.zip");
            });
          }
      )*/
    }
  }
}
</script>