/* 日后更新视频和正式论文，只需修改本文件。详见 README.md。 */
window.PROJECT_CONFIG = {
  video: {
    // type: "file"（MP4 / WebM）, "youtube", 或 "vimeo"。
    type: "file",
    // 本地视频示例："assets/videos/project-demo.mp4"。
    // YouTube / Vimeo 请填写嵌入地址，详见 README。
    src: "assets/videos/project-demo.mp4",
    poster: "assets/images/ar-workspace.webp",
    captions: "", // 可选：英文 WebVTT 字幕文件。
    description: "A demonstration of the AR prototype and study experience."
  },
  publication: {
    // 可填写 DOI、出版社页面，或 assets/papers/published-paper.pdf。
    url: "",
    status: "accepted",
    venue: "CCF Transactions on Pervasive Computing and Interaction",
    shortName: "TPCI",
    year: "2026",
    // 正式发表后，用出版方提供的完整 BibTeX 替换以下 in-press 引用。
    bibtex: `@article{shen2026ar,
  title   = {Exploring the Design of {AR}-Based Procedural Guidance
             Tools to Support Reproducible Laboratory Workflows},
  author  = {Shen, Yuxin and Liang, Wei and Ma, Jianzhu and Zhu, Yixin},
  journal = {CCF Transactions on Pervasive Computing and Interaction},
  year    = {2026},
  note    = {In press}
}`
  }
};
