import chalk from "chalk";
import input from "@inquirer/input";
import select from "@inquirer/select";
import * as fs from "fs";
import * as fsPromises from "fs/promises";
import * as changeCase from "change-case";
import prettier from "prettier";
import { loadEnv } from "vite";

// variables
const env = loadEnv("development", process.cwd());
const log = console.log;
const logBlue = (text) => log(chalk.blue(text));
const logRed = (text) => log(chalk.red(text));
const logGreen = (text) => log(chalk.green(text));
const logYellow = (text) => log(chalk.yellow(text));

const divider = chalk.gray("\n----------------------------------------\n");

// Regex
const folderNameRegex = /^[a-zA-Z][\w-]*$/; // characters, digits, underscore and hypen, must start with character
const routeNameRegex = /^[a-zA-Z][\w-]*$/; // characters, digits, underscore and hypen, must start with character
const recordNameRegex = /^[a-zA-Z][\w-]*$/; // characters, digits, underscore and hypen, must start with character
const collectionNameRegex = /^[a-zA-Z][\w-]*$/; // characters, digits, underscore and hypen, must start with character
const queryKeyRegex = /^[a-zA-Z][\w-]*$/; // characters, digits, underscore and hypen, must start with character

// regex characters, digits, underscore and hyphen only
const featureNameRegex = /^[\w-]+$/;

log(divider);
logBlue("Create a new feature in project\n");

try {
  /* 
    Basic:
    1. create feature folder in 'src/features'
    2. create route in 'src/features/routes/index.tsx'
    3. create EntryPage in 'src/features/pages'
    4. link the route in 'src/routes/customRoutes.tsx'

    CRUD:
    1. create feature folder in 'src/features'
    2. create route in 'src/features/routes/index.tsx'
    3. create List, Show and Form pages in 'src/features/pages'
    4. create hooks, keys, schemas and types in 'src/features/data/index.ts'
    5. link the route in 'src/routes/customRoutes.tsx'
  */
  const featureType = await select({
    message: "Type of new feature:",
    choices: [
      {
        name: "Basic (Route and simple entry page)",
        value: "basic",
      },
      {
        name: "CRUD",
        value: "crud",
      },
    ],
  });

  // Ask for name of feature folder
  const folderName = await input({
    message: "Name of folder: ",
    validate: (value) => {
      if (value.length === 0) {
        return "Please enter a name!";
      }
      if (fs.existsSync(`./src/features/${value}`)) {
        return "Folder with the same name already exists!";
      }
      if (!folderNameRegex.test(value)) {
        return "Characters, digits, underscores or hyphens only and must start with a character!";
      }
      return true;
    },
  });

  // Ask for route name
  const routeName = await input({
    message: "Name of route: ",
    validate: (value) => {
      if (value.length === 0) {
        return "Please enter a name!";
      }
      if (!routeNameRegex.test(value)) {
        return "Characters, digits, underscores or hyphens only and must start with a character!";
      }
      return true;
    },
  });

  // throw error if featureType, folderName and routeName is undefined
  if (!featureType || typeof featureType !== "string")
    throw "Feature type is undefined";
  if (!folderName || typeof folderName !== "string")
    throw "Folder name is undefined";
  if (!routeName || typeof routeName !== "string")
    throw "Route name is undefined";

  // folder paths
  const scriptTemplatePath = "./scripts/new-feature/templates";
  const featureFolderPath = `./src/features/${folderName}`;

  // Create folder inside 'src/features'
  await fsPromises.mkdir(featureFolderPath);
  logGreen(`Created folder: ${featureFolderPath}`);

  /* 
    Routes

    1. create route folder
    2. create route index file
  */
  await fsPromises.mkdir(`${featureFolderPath}/routes`);

  let routeIndexContent = await fsPromises.readFile(
    `${scriptTemplatePath}/routes/${featureType}.txt`,
    "utf-8",
  );

  routeIndexContent = routeIndexContent.replaceAll("%routeName%", routeName);

  routeIndexContent = await prettier.format(routeIndexContent, {
    parser: "babel-ts",
  });

  await fsPromises.writeFile(
    `${featureFolderPath}/routes/index.tsx`,
    routeIndexContent,
  );

  logGreen(`Created route: ${featureFolderPath}/routes/index.tsx`);

  // create pages folder
  await fsPromises.mkdir(`${featureFolderPath}/pages`);

  /* 
    1. create entry page in pages folder
  */
  if (featureType === "basic") {
    let entryPageContent = await fsPromises.readFile(
      `${scriptTemplatePath}/pages/EntryPage.txt`,
      "utf-8",
    );

    entryPageContent = entryPageContent.replaceAll("%routeName%", routeName);

    entryPageContent = await prettier.format(entryPageContent, {
      parser: "babel-ts",
    });

    await fsPromises.writeFile(
      `${featureFolderPath}/pages/EntryPage.tsx`,
      entryPageContent,
    );

    logGreen(`Created entry page: ${featureFolderPath}/pages/EntryPage.tsx`);
  }

  /* 
    1. ask for record name
    2. ask for collection name
    3. ask for query key
    4. create list page in pages folder
    5. create show page in pages folder
    6. create form page in pages folder
    7. create data folder with index.tsx
  */
  if (featureType === "crud") {
    // Record name
    let recordName = await input({
      message: "Name of record/model/document: ",
      validate: (value) => {
        if (value.length === 0) {
          return "Please enter a name!";
        }
        if (!recordNameRegex.test(value)) {
          return "Characters, digits, underscores or hyphens only and must start with a character!";
        }
        return true;
      },
    });

    // collection name
    let collectionName = await input({
      message: "Name of collection (backend): ",
      validate: (value) => {
        if (value.length === 0) {
          return "Please enter a name!";
        }
        if (!collectionNameRegex.test(value)) {
          return "Characters, digits, underscores or hyphens only and must start with a character!";
        }
        return true;
      },
    });

    /* 
      Create pages
    */
    // read template files
    let listPageContent = await fsPromises.readFile(
      `${scriptTemplatePath}/pages/List.txt`,
      "utf-8",
    );
    let showPageContent = await fsPromises.readFile(
      `${scriptTemplatePath}/pages/Show.txt`,
      "utf-8",
    );
    let formPageContent = await fsPromises.readFile(
      `${scriptTemplatePath}/pages/Form.txt`,
      "utf-8",
    );

    // replace
    listPageContent = listPageContent.replaceAll(
      "%recordName%",
      changeCase.pascalCase(recordName),
    );
    showPageContent = showPageContent
      .replaceAll("%recordName%", changeCase.pascalCase(recordName))
      .replaceAll("%routeName%", routeName);
    formPageContent = formPageContent
      .replaceAll("%recordPascalName%", changeCase.pascalCase(recordName))
      .replaceAll("%recordParamName%", changeCase.paramCase(recordName))
      .replaceAll("%routeName%", routeName);

    listPageContent = await prettier.format(listPageContent, {
      parser: "babel-ts",
    });
    showPageContent = await prettier.format(showPageContent, {
      parser: "babel-ts",
    });
    formPageContent = await prettier.format(formPageContent, {
      parser: "babel-ts",
    });

    await fsPromises.writeFile(
      `${featureFolderPath}/pages/List.tsx`,
      listPageContent,
    );
    logGreen(`Created List.tsx: ${featureFolderPath}/pages/List.tsx`);

    await fsPromises.writeFile(
      `${featureFolderPath}/pages/Show.tsx`,
      showPageContent,
    );
    logGreen(`Created Show.tsx: ${featureFolderPath}/pages/Show.tsx`);

    await fsPromises.writeFile(
      `${featureFolderPath}/pages/Form.tsx`,
      formPageContent,
    );
    logGreen(`Created Form.tsx: ${featureFolderPath}/pages/Form.tsx`);

    /* 
      Create data folder
      - query key
      - schema
      - record type
      - data hooks
    */
    await fsPromises.mkdir(`${featureFolderPath}/data`);

    // read
    let dataIndexContent = await fsPromises.readFile(
      `${scriptTemplatePath}/data/${featureType}.txt`,
      "utf-8",
    );

    // replace
    dataIndexContent = dataIndexContent
      .replaceAll("%collectionName%", collectionName)
      .replaceAll("%recordPascalName%", changeCase.pascalCase(recordName));

    // format
    dataIndexContent = await prettier.format(dataIndexContent, {
      parser: "babel-ts",
    });

    // create file
    await fsPromises.writeFile(
      `${featureFolderPath}/data/index.ts`,
      dataIndexContent,
    );

    logGreen(
      `Created schema, record type and hooks: ${featureFolderPath}/data/index.ts`,
    );
  }

  // link route in customRoutes.tsx
  let customRouteContent = await fsPromises.readFile(
    `./src/routes/customRoutes.tsx`,
    "utf-8",
  );

  let exportStatement = `export { default as ${changeCase.pascalCase(
    routeName,
  )}Route } from "@features/${folderName}/routes";`;

  customRouteContent += exportStatement;

  customRouteContent = await prettier.format(customRouteContent, {
    parser: "babel-ts",
  });

  await fsPromises.writeFile(
    `./src/routes/customRoutes.tsx`,
    customRouteContent,
  );

  logGreen(`Linked route in ./src/routes/customRoutes.tsx`);

  log(divider);

  logYellow(`You can now access the feature at:\n\n`);
  logYellow(`➜    http://localhost:${env.VITE_SERVER_PORT}/${routeName}\n`);
} catch (error) {
  logRed(JSON.stringify(error, null, 2));
  logRed("\nSomething went wrong...\n");
  logRed("Please delete any folders or files created from this script!\n");
  process.exit(1);
}
