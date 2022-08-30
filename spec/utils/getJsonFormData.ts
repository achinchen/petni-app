export default function getJsonFormData(payload: any) {
  const formData = new FormData();
  formData.set('json', JSON.stringify(payload));
  return formData;
}
