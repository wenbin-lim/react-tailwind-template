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
// regex characters, digits, underscore and hyphen only
const featureNameRegex = /^[\w-]+$/;

log(divider);

try {
  // Ask for the name of the feature
  logBlue("Create a new feature in project\n");

  // Check if name already exist inside 'src/features' folder
  let featureName = await input({
    message: "Name for the new feature: ",
    validate: (value) => {
      if (value.length === 0) {
        return "Please enter a name!";
      }
      if (fs.existsSync(`./src/features/${value}`)) {
        return "Feature already exists";
      }
      if (!featureNameRegex.test(value)) {
        return "Name contains only consist characters, digits, underscores or hyphens";
      }
      return true;
    },
  });

  // console.log(changeCase.capitalCase(featureName));

  if (!featureName) throw "Feature name is undefined";

  // Ask type of feature
  // 1. Basic (clean)
  // 2. CRUD
  let featureType = await select({
    message: "Type of new feature:",
    choices: [
      {
        name: "Basic",
        value: "basic",
      },
      {
        name: "CRUD",
        value: "crud",
      },
    ],
  });

  log("\n");

  // Create folder inside 'src/features' with the name of the feature

  await fsPromises.mkdir(`./src/features/${featureName}`);

  logGreen(`Created folder '${featureName}' in ./src/features/${featureName}`);

  /* 
    Create

    1. Basic
    - Create a simple page component inside 'pages'
    - Create a routes file inside 'routes'

    2. CRUD
    - Create List, Show, Form inside 'pages' based on template
    - Create a data folder with 'hooks.ts' that will be used in List, Show, Form
    - Create a routes file inside 'routes'
	*/

  // create route folder and file
  await fsPromises.mkdir(`./src/features/${featureName}/routes`);

  let routeIndexContent = await fsPromises.readFile(
    `./scripts/new-feature/templates/routes/${featureType}.txt`,
    "utf-8",
  );

  routeIndexContent = routeIndexContent.replaceAll(
    "%featureParamCase%",
    changeCase.paramCase(featureName),
  );

  routeIndexContent = await prettier.format(routeIndexContent, {
    parser: "babel-ts",
  });

  await fsPromises.writeFile(
    `./src/features/${featureName}/routes/index.tsx`,
    routeIndexContent,
  );

  logGreen(
    `Created routes file in ./src/features/${featureName}/routes/index.tsx`,
  );
  // create pages folder and files
  await fsPromises.mkdir(`./src/features/${featureName}/pages`);

  switch (featureType) {
    case "crud":
      // create list page (pascalCase, capitalCase)
      // create show page (pascalCase, capitalCase, paramCase)
      // create form page (pascalCase, capitalCase, paramCase)
      let listPageContent = await fsPromises.readFile(
        `./scripts/new-feature/templates/pages/List.txt`,
        "utf-8",
      );
      let showPageContent = await fsPromises.readFile(
        `./scripts/new-feature/templates/pages/Show.txt`,
        "utf-8",
      );
      let formPageContent = await fsPromises.readFile(
        `./scripts/new-feature/templates/pages/Form.txt`,
        "utf-8",
      );

      listPageContent = listPageContent
        .replaceAll("%featurePascalCase%", changeCase.pascalCase(featureName))
        .replaceAll("%featureCapitalCase%", changeCase.capitalCase(featureName))
        .replaceAll("%featureParamCase%", changeCase.paramCase(featureName));

      showPageContent = showPageContent
        .replaceAll("%featurePascalCase%", changeCase.pascalCase(featureName))
        .replaceAll("%featureCapitalCase%", changeCase.capitalCase(featureName))
        .replaceAll("%featureParamCase%", changeCase.paramCase(featureName));

      formPageContent = formPageContent
        .replaceAll("%featurePascalCase%", changeCase.pascalCase(featureName))
        .replaceAll("%featureCapitalCase%", changeCase.capitalCase(featureName))
        .replaceAll("%featureParamCase%", changeCase.paramCase(featureName));

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
        `./src/features/${featureName}/pages/List.tsx`,
        listPageContent,
      );
      await fsPromises.writeFile(
        `./src/features/${featureName}/pages/Show.tsx`,
        showPageContent,
      );
      await fsPromises.writeFile(
        `./src/features/${featureName}/pages/Form.tsx`,
        formPageContent,
      );

      logGreen(
        `Created List.tsx in ./src/features/${featureName}/pages/List.tsx`,
      );
      logGreen(
        `Created Show.tsx in ./src/features/${featureName}/pages/Show.tsx`,
      );
      logGreen(
        `Created Form.tsx in ./src/features/${featureName}/pages/Form.tsx`,
      );

      // Create data folder with hooks
      await fsPromises.mkdir(`./src/features/${featureName}/data`);

      let hooksContent = await fsPromises.readFile(
        `./scripts/new-feature/templates/data/hooks.txt`,
        "utf-8",
      );

      hooksContent = hooksContent.replaceAll(
        "%featurePascalCase%",
        changeCase.pascalCase(featureName),
      );

      hooksContent = await prettier.format(hooksContent, {
        parser: "babel-ts",
      });

      await fsPromises.writeFile(
        `./src/features/${featureName}/data/hooks.ts`,
        hooksContent,
      );

      logGreen(
        `Created hooks.ts in ./src/features/${featureName}/data/hooks.ts`,
      );

      break;
    case "basic":
    default:
      let entryPageContent = await fsPromises.readFile(
        `./scripts/new-feature/templates/pages/EntryPage.txt`,
        "utf-8",
      );

      entryPageContent = entryPageContent.replaceAll(
        "%featureCapitalCase%",
        changeCase.capitalCase(featureName),
      );

      entryPageContent = await prettier.format(entryPageContent, {
        parser: "babel-ts",
      });

      await fsPromises.writeFile(
        `./src/features/${featureName}/pages/EntryPage.tsx`,
        entryPageContent,
      );

      logGreen(
        `Created EntryPage.tsx in ./src/features/${featureName}/pages/EntryPage.tsx`,
      );
      break;
  }

  /* 
		Additional stuffs
	*/
  // Add this new feature to customRoutes
  let customRouteContent = await fsPromises.readFile(
    `./src/routes/customRoutes.tsx`,
    "utf-8",
  );

  let exportStatement = `export { default as ${changeCase.pascalCase(
    featureName,
  )}Route } from "@src/features/${featureName}/routes";`;

  customRouteContent += exportStatement;

  customRouteContent = await prettier.format(customRouteContent, {
    parser: "babel-ts",
  });

  await fsPromises.writeFile(
    `./src/routes/customRoutes.tsx`,
    customRouteContent,
  );

  logGreen(`Added route into ./src/routes/customRoutes.tsx`);

  log(divider);

  logYellow(`You can now access the feature at:\n\n`);
  logYellow(
    `➜    http://localhost:${env.VITE_SERVER_PORT}/${changeCase.paramCase(
      featureName,
    )}\n`,
  );
} catch (error) {
  log(chalk.red("Something went wrong:\n", error));
  log("\n");
  logRed("Please delete any folders or files created from this script!");
  process.exit(1);
}
