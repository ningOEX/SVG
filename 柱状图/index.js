const data = [
    {text:"一季度",value:20},
    {text:"二季度",value:40},
    {text:"三季度",value:50},
    {text:"四季度",value:80},
]

const maxValue = data.map(item => item.value).reduce((v1,v2) => Math.max(v1,v2))
const texts = data.map(item => item.text)

draw({
    title: "季度在线榜（小时）",
    id: "#coord",
    yAxis:false,
    yMax: maxValue, // 最大值
    xText:texts,
    part: 4, // 配置x轴刻度数量
})

// 准备
const NS = "http://www.w3.org/2000/svg"
const svg = document.querySelector('#coord')