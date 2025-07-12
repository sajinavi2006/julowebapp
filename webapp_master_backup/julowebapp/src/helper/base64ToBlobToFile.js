export default async url => {
  const res = await fetch(url);
  const blob = await res.blob();
  const file = new File([blob], "File name");
  return file;
};
