# HOMMING REACT NATIVE PROFICIENCY TEST

**WELCOME CHALLENGER**, we are going to test your proficiency as a programmer! ʕ ᓀ ᴥ ᓂ ʔ

> **DISCLAIMER:** Make the code to do what you want is only the first step, we expect elegant and optimal solutions since the problems are not challenging!

## CHALLENGE

Urgent! Suddenly we are asked to make a minified Homming app with access to the client's property list.

For this we need two screens (already created):

1. **Login screen**: This screen will be a simple form asking for email and password, this information has to be sent to the URL provided in ```/utils/endpoints.ts``` which will return a bearer token needed for the next request.

2. **Properties screen**: Once logged in, we have to retrieve the properties endpoint payload and list them **SECTIONED** following these requirements:

         - Each section title has to have the initial letter of the property name (we don't need sections with letters if they don't contain properties) and they must be sorted alphabetically.

         - We don't want to show properties with missing information, so we will omit properties without the "contructed_area" property.

         - If the name of a property is pressed (click) it should disappear
         
         Sample:

           * A
             - Avenida Roma, 4
             - Area 51
           * E
             - Edificio Walmart, 12
           ... 

**Credentials**:

  email: react.native@test.com
  
  password: password                 
  
**Notes**:
  
  To know what to send in every request you already have the interfaces in ```/utils/interfaces.ts```
  
## HOW TO HAND IN YOUR WORK

Please, fork this repository and submit a Pull Request with your solutions so we can check it out.

**BEST OF LUCK CHALLENGER.**
