export const fileToB64 = async (src: Blob) => {
  const b64: string | ArrayBuffer = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(src);
    reader.onload = e => {
      resolve(reader.result);
    };
  });
  return b64;
};
