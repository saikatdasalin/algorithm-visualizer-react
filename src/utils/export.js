import html2canvas from "html2canvas";

export async function exportElementAsImage(element, filename = "visualization.png") {
  if (!element) return;
  const canvas = await html2canvas(element, {
    scale: 2,
    backgroundColor: null,
  });
  const link = document.createElement("a");
  link.download = filename;
  link.href = canvas.toDataURL("image/png");
  link.click();
}