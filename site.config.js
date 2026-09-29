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
    year: "",
    // 正式发表后，将出版方提供的完整 BibTeX 粘贴在反引号之间。
    bibtex: ""
  }
};
