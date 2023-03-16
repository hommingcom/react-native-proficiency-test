# HOMMING PROGRAMMING PROFICIENCY TEST (HPPT)

**WELCOME CHALLENGER** to the ~~HTTP~~ HPPT, we are going to test your proficiency as a programmer! ʕ ᓀ ᴥ ᓂ ʔ

> **DISCLAIMER:** Make the code to do what you want is only the first step, we expect elegant and optimal solutions since the problems are not challenging!

## SETUP

You will find a dockerfile and a docker-compose.yml in your project root, that can only mean one thing... a dockerized project! So you may have guess the first step of this test already. Set it up and running!

> ⚠️ **WARNING** ⚠️ Remember your dependencies, don't expect your project to run without you libraries installed in the container, they wouldn't do the same to you.

## PHP

The backend part is more logic oriented, nothing pragmatic, unless you really like roman numbers for some reason...

You have a `src` folder with multiple files, each of them contains a function. You need to complete that function with the logic necessary to pass the tests. **You have complete control over the content of each function but not the parameters**. Take into consideration the optimization and DX of these exercises, imagine you have 1 million recipes, or that you have to parse an absurd amount of numbers and you will need to mantain that code often.

You can check your logic running `docker compose exec app php vendor/bin/phpunit`.

## JAVASCRIPT

This is a more pragmatic approach, this consists on a basic table CRUD, filtering and testing.

Your workspace is `resources` and your tests live in `tests/js`, appart from that you can organize your files as you wish. You will start with an stub containing data and your objetive is:

 - Create a table which list the properties
 - Add extra columns to the properties table including months the property has been rented for and a boolean expresing if the property is currently being rented out
 - Be able to filter by property types, user and dates
 - (Optional) Listen to URL parameters to filter on page load. e.g. `?user=1`
 - (Optional) Install and use TailwindCSS to style your stuff properly.

You can check your work running `docker compose exec app npm run serve` and accessing your `localhost:8080`.

## HOW TO HAND IN YOUR WORK

Please, fork this repository and submit a Pull Request with your solutions so we can check it out.

**BEST OF LUCK CHALLENGER.**
