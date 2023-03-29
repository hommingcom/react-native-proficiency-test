import {Property} from './interfaces';

//This function will just check if a letter has an accent; if true, it will remove the accent by placing the same letter without it
function removeAccent(character: string): string {
  const accentMap: Record<string, string> = {
    Á: 'A',
    É: 'E',
    Í: 'I',
    Ó: 'O',
    Ú: 'U'
  };
  return accentMap[character] || character;
}

//Now I need to process the properties to group them by the initial letter, the objective is to create a structure that can be used to display the properties in a list
export const processProperties = (
  properties: Property[]
): (string | Property)[] => {
  //And first I create a groupedProperties to group by initial letter
  const groupedProperties: Record<string, Property[]> = {};
  /* 
    Here I filter the properties to check that any has null value in the "constructed_area"
    then they are sorted alphabetically (sort) and each property will be processed in the forEach method
    where I will get and store their initialLetter variable, remove the accent and make them upperCase
    */
  properties
    .filter(property => property.constructed_area !== null)
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(property => {
      const initialLetter = removeAccent(property.name[0].toUpperCase());

      //Then I check if groupedProperties obj already contains a key for initialLetter, if not -> return empty array
      // I am making sure that each initial letter will have it's own array where the properties will be grouped
      if (!groupedProperties[initialLetter]) {
        groupedProperties[initialLetter] = [];
      }
      //Then I wpush the property into the array asociated with the initialLetter
      groupedProperties[initialLetter].push(property);
    });
  //After that we initialize  the following empty array, that will store the final output to be easily shown in the list
  const processedData: (string | Property)[] = [];
  //Going through each initial letter in the grouppedProperties obj, we push first the initalLetter as a string and then their value (the properties array of each initialLeter)
  Object.keys(groupedProperties).forEach(initialLetter => {
    processedData.push(initialLetter);
    processedData.push(...groupedProperties[initialLetter]);
  });

  return processedData;
};
