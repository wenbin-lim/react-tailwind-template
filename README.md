REACTJS TEMPLATE

Ecosystem:

1. Build Tool - Vite
2. Styling - TailwindCSS, TailwindUI, SASS
3. Data Fetching - Tanstack Query
4. Routing - React Router
5. Forms - React Hook Form + Zod

Utils Packages:

1. usehooks-ts
2. clsx
3. jwt-decode

Getting Started:

1. Clone and cd into project
2. Initialise git: `git init`
3. Install node_modules: `npm i`
4. Start development server: `npm run dev`

Folders inside `./src`:

- `assets`: Common images, icons etc
- `components`: Reusable components
- `features`: App features, to be further organised by `components`, `pages`, `routes`, `hooks` that are used only by said feature
- `hooks`: Custom hooks
- `layout`: Layout components
- `lib`: Library extension or facades
- `pages`: Unique pages, screens and views
- `routes`: App routes
- `styles`: Custom .scss files, tailwindCSS
- `types`: Custom type declaration files

Backend:

- Using Pocketbase for data and auth
- https://github.com/pocketbase/js-sdk

Important Notes:

1. Import files using Vite's alias (@src = './src')

- `import Example from '@src/example'

2. Additional features should be added into the `features` folder with its own components, pages, hooks etc.

- Folder items inside `src` such as `components` and `pages` are to shared as common items

TailwindCSS:

- https://github.com/tailwindlabs/prettier-plugin-tailwindcss
- `clsx`: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#sorting-classes-in-function-calls
