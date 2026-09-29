# AR-Based Laboratory Protocols — Research Website

论文 **Exploring the Design of AR-Based Procedural Guidance Tools to Support Reproducible Laboratory Workflows** 的独立英文项目页。

作者：Yuxin Shen、Wei Liang、Jianzhu Ma、Yixin Zhu。

论文已被 **CCF Transactions on Pervasive Computing and Interaction (TPCI)** 接收（作者确认）。页面已标注 Accepted；正式出版链接、年份与 DOI 暂未提供。

页面内容与图片来自作者提供的出版前论文。未添加虚构的 DOI、发表年份或定量效果；网页中的研究概述不是实验操作指南。

## 本地预览

无需安装依赖，也无需构建。在项目目录执行：

```sh
python3 -m http.server 8000
```

然后打开 `http://localhost:8000`。也可以直接打开 `index.html`；复制引用功能在支持剪贴板的本地服务器或 HTTPS 环境中体验最佳。

## 文件结构

```text
index.html              页面内容
styles.css              响应式布局与视觉样式
script.js               导航、发现切换、图片放大、引用复制
site.config.js          视频、正式论文和引用的更新入口
assets/images/          从原论文提取并压缩的 WebP 图片
assets/papers/           为未来正式论文保留（目前没有 PDF）
assets/videos/          网页视频、原视频（本地保留）和字幕
```

页面包括：论文标题、作者与机构、研究概览、两阶段方法、AR 原型、四类交互式发现、视频区域、正式出版入口（待更新）和正式 BibTeX（配置后显示）。所有资源使用相对路径，兼容 GitHub Pages 的仓库子路径。正文字体使用 DM Sans，标题使用 Instrument Serif；Google Fonts 不可用时会自动回退到系统字体。

## 添加项目视频

当前视频：`assets/videos/project-demo.mp4`，由 `assets/videos/video.mp4` 转码为适合网页播放的 H.264/AAC MP4，保留 1080p 分辨率并启用 faststart。原视频仅本地保留，已加入 `.gitignore`。

只修改 `site.config.js` 中的 `video` 对象。填入有效地址后，视频占位图会自动变成播放器，顶部状态也会自动更新。

**本地 MP4：** 将视频放入 `assets/videos/project-demo.mp4`，然后设置：

```js
video: {
  type: "file",
  src: "assets/videos/project-demo.mp4",
  poster: "assets/images/ar-workspace.webp",
  captions: "", // 有字幕时可填 "assets/videos/captions-en.vtt"
  description: "A demonstration of the AR prototype and study experience."
}
```

较大的视频建议上传视频平台，然后嵌入，避免把大文件加入 Git 历史。支持以下嵌入格式（将 `VIDEO_ID` 替换成真实编号）：

```js
// YouTube
type: "youtube",
src: "https://www.youtube-nocookie.com/embed/VIDEO_ID"

// Vimeo
type: "vimeo",
src: "https://player.vimeo.com/video/VIDEO_ID"
```

这里需要嵌入地址，而不是 `watch?v=` 页面地址。未填写地址时保留清晰的 Forthcoming 状态；页面不自动播放视频。

## 添加正式发表论文

修改 `site.config.js` 中的 `publication`：

```js
publication: {
  url: "https://doi.org/填写真实DOI", // 也可填本地 PDF 路径
  venue: "填写真实期刊或会议名称",
  year: "填写发表年份",
  bibtex: `将出版方提供的完整 BibTeX 粘贴到这里`
}
```

等作者提供正式出版版本后，再填写 URL；Published paper 卡片会自动启用，论文状态和资源介绍同步更新。正式论文 URL 与 BibTeX 都填写后，引用区域才会显示。网站不提供出版前论文，也不包含该 PDF 文件。

## GitHub Pages

仓库已可作为静态网站发布，无需 GitHub Actions 或 Node 环境：

1. 将项目文件提交并推送到该仓库的 `main` 分支。
2. 在仓库 **Settings → Pages** 中选择 **Deploy from a branch**。
3. 选择 **main** 和 **/ (root)** 后保存。
4. 部署完成后使用 GitHub Pages 提供的实际网址。

本项目不自动推送或公开发布论文；这些步骤需要你决定何时执行。

## 维护说明

- 实验照片与原型界面来自提供的原稿，保留原稿已有的遮挡和匿名处理。Multimodal guidance 配图为 AI 生成的概念示意图，不是实验记录或已实现系统的截图。
- Multimodal guidance 的概念图展示视觉参考、音频讲解和流程概览；页面明确区分研究发现与未来设计方向。生成方式及提示词见 `assets/images/multimodal-guidance.prompt.md`。
- 预留的视频和出版入口不会使用虚假的链接或可播放状态。
- 页面适配手机、平板和桌面，支持键盘切换发现面板、Escape 关闭图片、跳转正文以及减少动态效果偏好。
- 页面不提供项目仓库、研究代码或代码发布入口。
- Jianzhu Ma 对应机构 3、4；Yixin Zhu 对应机构 5–9。完整单位可在首页 Author affiliations 中展开查看。

论文、配图及研究材料的权利由相应权利人保留；本仓库未额外授予开放许可。
