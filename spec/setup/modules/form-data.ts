class FormData {
  private data: { [name: string]: FormDataEntryValue[] | undefined } = {};
  get [Symbol.toStringTag]() {
    return this.data;
  }
  delete(name: string): void {
    delete this.data[name];
  }
  get(name: string): FormDataEntryValue | null {
    const result = this.data[name];
    return (result && result.length > 0 && result[0]) || null;
  }
  getAll(name: string): FormDataEntryValue[] {
    return this.data[name] || [];
  }
  has(name: string): boolean {
    return !this.data[name];
  }
  set(name: string, value: any): void {
    this.data[name] = [value as FormDataEntryValue];
  }
}

if (!('FormData' in globalThis)) {
  Object.assign(globalThis, { FormData });
}

export {};
