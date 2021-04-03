type LocalStorageKeys = 'user-language'

export class LocalStorageService {
  private static save (key: LocalStorageKeys, value: any): void {
    return localStorage.setItem(key, value)
  }

  private static load (key: LocalStorageKeys): string | null {
    return localStorage.getItem(key)
  }

  static saveLanguage (language: string) {
    LocalStorageService.save('user-language', language)
  }

  static loadLanguage (): string | null {
    return LocalStorageService.load('user-language')
  }
}
