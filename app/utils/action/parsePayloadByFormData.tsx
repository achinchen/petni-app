type Parameters = {
  formData: FormData;
  fallback: any;
};

export default function parsePayloadByJson({ formData, fallback }: Parameters) {
  try {
    const payload = formData.get('json') as string | null;
    return payload ? JSON.parse(payload) : fallback;
  } catch {
    return fallback;
  }
}
