// 让所有的a标签都为target_blank另开窗口
const tags = document.getElementsByTagName('a')
for (let i = 0; i < tags.length; i++) {
  const a = tags[i]
  a.target = '_blank'
}
