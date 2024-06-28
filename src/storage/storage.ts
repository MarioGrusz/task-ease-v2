import { Category } from "../category/category";
import { LOCAL_STORAGE_KEY } from "../utils/utils";

export class Storage {
  static getStorage(): Category[] {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      return JSON.parse(data, (key, value) => {
        if (key === "" && Array.isArray(value)) {
          return value.map(Category.fromPlainObject);
        }
        return value;
      });
    }
    return [];
  }

  static setStorage(categories: Category[]): void {
    localStorage.setItem("categories", JSON.stringify(categories));
  }
}

/* 
  Serialization/Deserialization: When objects are retrieved from storage, 
  they are often deserialized into plain objects, not instances of 
  the original class.
*/
