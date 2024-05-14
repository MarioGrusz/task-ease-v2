export interface MockStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

export class MockStorage implements MockStorage {
  private data: Record<string, string> = {};

  getItem(key: string): string | null {
    return this.data.hasOwnProperty(key) ? this.data[key] : null;
  }

  setItem(key: string, value: string): void {
    this.data[key] = value;
  }

  removeItem(key: string): void {
    if (this.data.hasOwnProperty(key)) {
      delete this.data[key];
    }
  }

  clear(): void {
    this.data = {};
  }
}
