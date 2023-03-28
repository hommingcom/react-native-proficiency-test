import { Property } from "./interfaces";

function removeAccent(character: string): string {
    const accentMap: Record<string, string> = {
      Á: 'A',
      É: 'E',
      Í: 'I',
      Ó: 'O',
      Ú: 'U',
    };
    return accentMap[character] || character;
  }

  //Now I need to process the properties to group them by the initial letter
  export const processProperties = (properties: Property[]): (string | Property)[] => {

    //And first I create a groupedProperties to group by initial letter; the type is 
    const groupedProperties: Record<string, Property[]> = {};
  
    properties
      .filter((property) => property.constructed_area !== undefined && property.constructed_area !== null)
      .sort((a, b) => a.name.localeCompare(b.name))
      .forEach((property) => {
        const initialLetter = removeAccent(property.name[0].toUpperCase());
  
        if (!groupedProperties[initialLetter]) {
          groupedProperties[initialLetter] = [];
        }
        groupedProperties[initialLetter].push(property);
      });
  
    const processedData: (string | Property)[] = [];
  
    Object.keys(groupedProperties).forEach((initialLetter) => {
      processedData.push(initialLetter);
      processedData.push(...groupedProperties[initialLetter]);
    });
  
    return processedData;
  };