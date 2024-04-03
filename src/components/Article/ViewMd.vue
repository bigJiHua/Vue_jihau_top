<template>
  <div id="" class="">
    <Viewer class="viewer markdown-body" :tabindex="2" :sanitize="23" :value="data" :plugins="plugins" :locale="zhHans">
    </Viewer>
  </div>
</template>

<script>
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight-ssr'
import frontmatter from '@bytemd/plugin-frontmatter'
import gemoji from '@bytemd/plugin-gemoji'
import breaks from '@bytemd/plugin-breaks'
import footnotes from '@bytemd/plugin-footnotes'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import { Viewer } from '@bytemd/vue'
import zhHans from '@bytemd/vue/locales/zh_Hans.json'
import 'juejin-markdown-themes/dist/simplicity-green.min.css'
const plugins = [
  gfm(),
  highlight(),
  gemoji(),
  frontmatter(),
  breaks(),
  footnotes(),
  mediumZoom()
]
export default {
  props: ['content'],
  data () {
    return {
      plugins,
      data: '',
      zhHans
    }
  },
  // 监听器
  watch: {
    content: function (value) {
      this.data = JSON.parse(value).data
    }
  },
  computed: {},
  filters: {},
  name: 'ArticleMdViews',
  components: {
    Viewer
  }
}
</script>

<style lang="less" scoped></style>
