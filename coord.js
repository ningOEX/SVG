/**
 * 配置参数
 * title: 坐标轴标题，默认'标题'
 * yAxis: 是否显示y轴，默认true
 * xAxis: 是否显示x轴，默认true
 * color: 坐标轴颜色，默认#ccc
 * id: svg的id选择器，必填
 */

function draw(arg) {
  function calcUpLimit(maxValue) {
    const len = String(maxValue).length;
    const unit = Math.pow(10, len - 1);
    return maxValue % unit === 0
      ? maxValue
      : (Math.floor(maxValue / unit) + 1) * unit;
  }
  function drawBox(arg) {
    // 判断是否是字符串，如果是字符串则转换为对象
    if (arg === "string") {
      arg = { id: arg };
    }
    // 至此，arg是一个对象
    const config = {
      title: "标题",
      color: "#ccc",
      yAxis: true,
      xAxis: true,
      ...arg,
    };
    const NS = "http://www.w3.org/2000/svg";

    const svg = document.querySelector(config.id);
    const path = document.createElementNS(NS, "path");
    const g = document.createElementNS(NS, "g");
    const title = document.createElementNS(NS, "text");

    // svg
    svg.setAttribute("viewBox", "0 0 250 250");

    // title
    title.setAttribute("x", "10");
    title.setAttribute("y", "16");
    title.textContent = config.title;
    title.setAttribute("font-size", "8");
    g.appendChild(title);

    // path
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", config.color);
    path.setAttribute("stroke-width", "1");

    // 创建坐标轴
    let d = "";
    for (let i = 0; i < 11; i++) {
      if (config.xAxis) d += `M25 ${25 + i * 20} H225 `;
      if (config.yAxis) d += `M${25 + i * 20} 25 V225 `;
    }
    // 设置path的d属性
    path.setAttribute("d", d);
    g.appendChild(path);

    // 判断svg是否有子元素
    const children = svg.children;
    if (children && children.length > 0) {
      svg.insertBefore(g, children[0]);
      return;
    }
    svg.appendChild(g);
  }

  function drawViewSpace(arg) {
    const config = {
      ...arg,
    };

    // 准备
    const NS = "http://www.w3.org/2000/svg";
    const svg = document.querySelector("#coord");
    const boxSize = 200; //坐标大小 200 × 200
    const yCount = 5; //刻度总数
    const upLimit = calcUpLimit(config.yMax); // 计算上限最大值
    const yDataSpace = upLimit / yCount; // y轴的刻度间距
    const ySpace = boxSize / yCount; // x轴的刻度间距
    const xSpace = boxSize / config.xText?.length;
    let g;

    // 需要配置x轴文字
    if (config.xText && config.xText.length > 0) {
      g = document.createElementNS(NS, "g");
      g.setAttribute("class", "x-text");
      svg.appendChild(g);
      for (let i = 0; i < config.xText.length; i++) {
        const text = document.createElementNS(NS, "text");
        text.setAttribute("x", 25 + xSpace / 2 + i * xSpace);
        text.setAttribute("y", 235);
        text.innerHTML = config.xText[i];
        g.appendChild(text);
      }
    }

    // 需要配置x轴刻度数量
    if (config.part) {
      g = document.createElementNS(NS, "g");
      g.setAttribute("class", "x-line");
      svg.appendChild(g);
      let d = "";
      for (let index = 0; index <= config.part; index++) {
        d += `M${25 + index * xSpace} 225 V230`;
      }
      const path = document.createElementNS(NS, "path");
      path.setAttribute("d", d);
      path.setAttribute("stroke", "#b9b9b9");
      path.setAttribute("stroke-width", "0.5");
      g.appendChild(path);
    }

    // 需要配置y轴刻度
    if (config.yMax) {
      g = document.createElementNS(NS, "g");
      g.setAttribute("class", "y-text");
      svg.appendChild(g);
      for (let i = 0; i <= yCount; i++) {
        const text = document.createElementNS(NS, "text");
        text.setAttribute("x", 22);
        text.setAttribute("y", 227 - i * ySpace);
        text.innerHTML = i * yDataSpace;
        g.appendChild(text);
      }
    }
  }
  drawBox(arg);
  drawViewSpace(arg);
}
