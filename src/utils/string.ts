export const removeHtmlTags = (string: string) => {
  if (!string) {
    return string;
  }

  return string.replace(/<\/?[^>]+(>|$)/g, '');
};
