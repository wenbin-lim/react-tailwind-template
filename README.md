REACTJS TEMPLATE

Ecosystem:

1. Build Tool - Vite
2. Styling - TailwindCSS, TailwindUI, SASS
3. Data Fetching - Tanstack Query
4. Routing - React Router
5. Forms - React Hook Form + Zod
6. Client State Management - Jotai

Getting Started:

1. Clone and cd into project
2. Initialise git: `git init`
3. Install node_modules: `npm i`
4. Start development server: `npm run dev`

Folders inside `./src`:

- `styles`: Custom .scss files, tailwindCSS
- `pages`: Unique pages, screens and views

Important Notes:

1. Import files using Vite's alias (@root = './src')

- `import Example from '@root/example'

2. Writing TailwindCSS

- https://github.com/tailwindlabs/prettier-plugin-tailwindcss
- `clsx`: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#sorting-classes-in-function-calls
- `tw`: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#sorting-classes-in-template-literals
