type Parameters = {
  formData: FormData;
  fallback: any;
};

export default function parsePayloadByJson({ formData, fallback }: Parameters) {
  const payload = formData.get('json') as string | null;
  try {
    return payload ? JSON.parse(payload) : fallback;
  } catch {
    return fallback;
  }
}
