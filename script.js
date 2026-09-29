(() => {
  "use strict";
  const config = window.PROJECT_CONFIG || {};
  const menuButton = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#navigation");
  function closeMenu() {
    menuButton.setAttribute("aria-expanded", "false");
    navigation.classList.remove("open");
  }
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    navigation.classList.toggle("open", open);
  });
  navigation.addEventListener("click", event => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuButton.focus();
    }
  });
  document.addEventListener("click", event => {
    if (!event.target.closest(".site-header")) closeMenu();
  });

  const tabs = [...document.querySelectorAll('[role="tab"]')];
  function selectTab(tab, moveFocus = false) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute("aria-selected", String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute("aria-controls")).hidden = !selected;
    });
    if (moveFocus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => selectTab(tab));
    tab.addEventListener("keydown", event => {
      let next;
      if (["ArrowDown", "ArrowRight"].includes(event.key)) next = (index + 1) % tabs.length;
      if (["ArrowUp", "ArrowLeft"].includes(event.key)) next = (index - 1 + tabs.length) % tabs.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = tabs.length - 1;
      if (next !== undefined) {
        event.preventDefault();
        selectTab(tabs[next], true);
      }
    });
  });

  const dialog = document.getElementById("image-dialog");
  let imageTrigger;
  document.querySelectorAll("[data-image]").forEach(button => {
    button.addEventListener("click", () => {
      imageTrigger = button;
      document.getElementById("dialog-image").src = button.dataset.image;
      document.getElementById("dialog-image").alt = button.querySelector("img").alt;
      document.getElementById("dialog-caption").textContent = button.dataset.caption;
      dialog.showModal();
    });
  });
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
  });
  dialog.addEventListener("close", () => imageTrigger?.focus());

  function safeURL(value) {
    if (!value || typeof value !== "string") return null;
    try {
      const url = new URL(value, document.baseURI);
      return ["https:", "http:", "file:"].includes(url.protocol) ? url.href : null;
    } catch { return null; }
  }

  const video = config.video || {};
  const videoURL = safeURL(video.src);
  if (videoURL) {
    let player;
    if (video.type === "file") {
      player = document.createElement("video");
      player.controls = true;
      player.preload = "metadata";
      player.playsInline = true;
      player.src = videoURL;
      if (safeURL(video.poster)) player.poster = safeURL(video.poster);
      player.setAttribute("aria-label", "Project demonstration video");
      if (safeURL(video.captions)) {
        const track = document.createElement("track");
        track.kind = "captions";
        track.label = "English";
        track.srclang = "en";
        track.src = safeURL(video.captions);
        player.append(track);
      }
    } else {
      const url = new URL(videoURL);
      const isYouTube = video.type === "youtube" && ["www.youtube.com", "www.youtube-nocookie.com", "youtube.com", "youtube-nocookie.com"].includes(url.hostname) && url.pathname.startsWith("/embed/");
      const isVimeo = video.type === "vimeo" && url.hostname === "player.vimeo.com" && url.pathname.startsWith("/video/");
      if (isYouTube || isVimeo) {
        player = document.createElement("iframe");
        player.src = videoURL;
        player.title = "AR-based laboratory protocols — project demonstration";
        player.loading = "lazy";
        player.allow = "fullscreen; picture-in-picture; encrypted-media";
        player.allowFullscreen = true;
        player.referrerPolicy = "strict-origin-when-cross-origin";
      }
    }
    if (player) {
      document.getElementById("video-slot").replaceChildren(player);
      document.getElementById("video-slot").style.aspectRatio = "16 / 9";
      document.getElementById("video-description").textContent = video.description || "Watch the AR prototype in the laboratory.";
      document.getElementById("video-hero-status").textContent = "Watch";
      document.getElementById("video-caption-status").textContent = "Project demonstration";
      document.getElementById("video-resource-state").textContent = "Watch the demonstration →";
      document.querySelector("#resources .section-intro").textContent = "Watch the project demonstration. The paper has been accepted for publication in TPCI; the published version will be added when available.";
    }
  }

  const publication = config.publication || {};
  const publicationURL = safeURL(publication.url);
  if (!publicationURL && publication.status === "accepted" && publication.venue) {
    document.getElementById("publication-status").textContent = `Accepted · ${publication.shortName || publication.venue}`;
    document.getElementById("published-description").textContent = `Accepted for publication in ${publication.venue}. The version of record will be linked here when available.`;
    document.getElementById("published-state").textContent = "Accepted · Version of record forthcoming";
  }
  if (publicationURL) {
    const card = document.getElementById("published-resource");
    const link = document.createElement("a");
    link.className = "resource-card";
    link.id = card.id;
    link.href = publicationURL;
    link.target = "_blank";
    link.rel = "noopener";
    link.append(...card.childNodes);
    card.replaceWith(link);
    const details = [publication.venue, publication.year].filter(Boolean).join(" · ");
    document.getElementById("published-description").textContent = details || "Read the final published version of the paper.";
    document.getElementById("published-state").textContent = "Read published paper ↗";
    document.getElementById("publication-status").textContent = details || "Published paper available";
    document.querySelector("#resources .section-intro").textContent = "Read the published paper and explore the project demonstration.";
  }
  if (publicationURL && publication.bibtex?.trim()) {
    document.querySelector(".citation").hidden = false;
    document.getElementById("bibtex").textContent = publication.bibtex.trim();
    document.getElementById("citation-note").textContent = "Publication citation";
  }

  const copyButton = document.getElementById("copy-citation");
  copyButton.addEventListener("click", async () => {
    const citation = document.getElementById("bibtex");
    const status = document.getElementById("copy-status");
    try {
      if (!navigator.clipboard?.writeText) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(citation.textContent);
      status.textContent = "BibTeX copied to clipboard.";
      copyButton.textContent = "Copied ✓";
      window.setTimeout(() => { copyButton.textContent = "Copy BibTeX ⧉"; }, 2500);
    } catch {
      const range = document.createRange();
      range.selectNodeContents(citation);
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = "Citation selected. Press Ctrl+C (Windows) or ⌘C (Mac) to copy.";
    }
  });

  const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            if (link.hash === `#${entry.target.id}`) link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        }
      });
    }, { rootMargin: "-15% 0px -65% 0px", threshold: 0 });
    navLinks.forEach(link => {
      const section = document.querySelector(link.hash);
      if (section) observer.observe(section);
    });
  }
})();
