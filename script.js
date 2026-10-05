function getCode() {
  const cm = document.querySelector(".CodeMirror");
  if (cm && cm.CodeMirror) {
    return cm.CodeMirror.getValue();
  }

  return [...document.querySelectorAll(".CodeMirror-line")]
    .map(
      (line) =>
        line.textContent
          .replace(/\u200b/g, "") // Invisible characters (zero-width space) -> nothing
          .replace(/\u00a0/g, " "), // Non-breaking spaces -> normal spaces
    )
    .join("\n");
}

function readMarkdownFile(sContent) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(sContent, "text/html");
  const markdownContent = doc.body.textContent || "";
  return markdownContent;
}

readMarkdownFile(getCode());

function addButtonPreview() {
  const tabs = document.querySelectorAll(".ide-tabs");

  if (tabs.length > 0) {
    const previewButton = document.createElement("button");
    previewButton.textContent = "Preview";
    previewButton.className = "btn btn-primary btn-sm ms-2";
    previewButton.addEventListener("click", () => {
      const activeTab = document.querySelector(".tree-row.active");
      if (activeTab) {
        const spanName = activeTab.querySelector("span.tree-name");
        if (spanName) {
          const fileName = spanName.textContent;
          // Do something with the active file name, e.g., display a preview
          console.log("Previewing file:", fileName);
        }
      }
    });
    tabs[0].appendChild(previewButton);
  }
}

allActives = document.querySelectorAll("div.tree-row.active");
if (allActives.length > 0) {
  const active = allActives[0];
  const spanName = active.querySelector("span.tree-name");
  if (spanName) {
    const fileName = spanName.textContent;
    const fileExtension = fileName.split(".").pop().toLowerCase();
    if (fileExtension !== "md") {
      throw new Error("The active file is not a Markdown file.");
    }
  }
}
