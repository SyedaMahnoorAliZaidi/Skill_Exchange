function forceDownload(blobUrl: string, filename: string) {
  let a: any = document.createElement("a");
  a.download = filename;
  a.href = blobUrl;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

export default function downloadPhoto(url: string, filename: string) {
  // Skip base64 URLs to prevent React errors
  if (url.startsWith('data:image/')) {
    console.warn('Cannot download base64 image:', url.substring(0, 50) + '...');
    return;
  }

  if (!filename) {
    filename = url.split("\\").pop()?.split("/").pop() || "";
  }
  
  fetch(url, {
    headers: new Headers({
      Origin: window.location.origin,
    }),
    mode: "cors",
  })
    .then((response) => response.blob())
    .then((blob) => {
      let blobUrl = window.URL.createObjectURL(blob);
      forceDownload(blobUrl, filename);
    })
    .catch((e) => console.error(e));
}
