REACTJS TEMPLATE

Ecosystem:

1. Build Tool - Vite
2. Styling - TailwindCSS, TailwindUI, SASS
3. Data Fetching - Tanstack Query
4. Routing - React Router
5. Forms - React Hook Form + Zod
6. Client State Management - Jotai

Utils Packages:

1. usehooks-ts
2. clsx
3. twrnc
4. jwt-decode

Getting Started:

1. Clone and cd into project
2. Initialise git: `git init`
3. Install node_modules: `npm i`
4. Start development server: `npm run dev`

Folders inside `./src`:

- `styles`: Custom .scss files, tailwindCSS
- `pages`: Unique pages, screens and views
- `routes`: App routes
- `assets`: Images, icons etc
- `lib`: Library extension or facades

Backend:

- Using Pocketbase for data and auth
- https://github.com/pocketbase/js-sdk

Important Notes:

1. Import files using Vite's alias (@root = './src')

- `import Example from '@root/example'

2. Writing TailwindCSS

- https://github.com/tailwindlabs/prettier-plugin-tailwindcss
- `clsx`: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#sorting-classes-in-function-calls
- `tw`: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#sorting-classes-in-template-literals
