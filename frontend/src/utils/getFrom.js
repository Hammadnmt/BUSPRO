export function extractFrom(data, formData) {
  const fromArray = data?.filter((route) => {
    return formData.from == route.source;
  });
  return fromArray;
}
