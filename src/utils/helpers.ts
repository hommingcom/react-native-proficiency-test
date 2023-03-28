
export function removeAccent(character: string): string {
    const accentMap: Record<string, string> = {
      Á: 'A',
      É: 'E',
      Í: 'I',
      Ó: 'O',
      Ú: 'U',
    };
    return accentMap[character] || character;
  }
