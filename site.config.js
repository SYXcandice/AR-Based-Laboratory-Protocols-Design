/* Project media and publication metadata. */
window.PROJECT_CONFIG = {
  video: {
    // type: "file"（MP4 / WebM）, "youtube", 或 "vimeo"。
    type: "file",
    // 本地视频示例："assets/videos/project-demo.mp4"。
    // YouTube / Vimeo 请填写嵌入地址。
    src: "assets/videos/project-demo.mp4",
    poster: "assets/images/ar-workspace.webp",
    captions: "", // 可选：英文 WebVTT 字幕文件。
    description: "A demonstration of the AR prototype and study experience."
  },
  publication: {
    url: "https://link.springer.com/article/10.1007/s42486-026-00255-x",
    pdf: "assets/papers/shen-et-al-2026-ar-laboratory-protocols.pdf",
    status: "published",
    venue: "CCF Transactions on Pervasive Computing and Interaction",
    shortName: "TPCI",
    year: "2026",
    publishedDate: "8 October 2026",
    doi: "10.1007/s42486-026-00255-x",
    bibtex: `@article{shen2026exploring,
  title   = {Exploring the design of {AR}-based procedural guidance
             tools to support reproducible laboratory workflows},
  author  = {Shen, Yuxin and Liang, Wei and Ma, Jianzhu and Zhu, Yixin},
  journal = {CCF Transactions on Pervasive Computing and Interaction},
  year    = {2026},
  month   = {October},
  doi     = {10.1007/s42486-026-00255-x},
  url     = {https://doi.org/10.1007/s42486-026-00255-x},
  publisher = {Springer Nature Singapore}
}`
  }
};
