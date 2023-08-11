REACTJS TEMPLATE

TODO:

1. Implement dark mode

Ecosystem:

1. Build Tool - Vite
2. Styling - TailwindCSS, TailwindUI, HeadlessUI, SASS
3. Data Fetching - Tanstack Query
4. Routing - React Router
5. Forms - React Hook Form + Zod
6. Toast - React Hot Toast
7. Alerts (Modal) - SweetAlert2
8. Icons - react-icons, heroicons

Utils Packages:

1. usehooks-ts
2. clsx
3. jwt-decode
4. animate.css

Getting Started:

1. Clone and cd into project
2. Initialise git: `git init`
3. Install node_modules: `npm i`
4. Create .env.local in root and add
   a. `VITE_SERVER_PORT=6969  #frontend server port`
   b. `VITE_API_URL=your_backend_server_url`
5. Change these files to connect to your preferred backend service (if not pocketbase)
   - ./src/lib/dataProvider.ts
6. Start development server: `npm run dev`

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
- `utils`: Utility functions

`Features` folder:

- Each feature (eg. auth, CRUD of a new record) will be placed inside
- Create functions, components, hooks etc that are specific to the feature

`Lib` folder:

1. `dataProvider.ts`

- Consist of basic RESTful API methods pertaining to the backend used
- These methods are generic and can be widely used
- Please create your own API methods (inside `features`) if you require more specific functionality
- Feel free to change the internal implementation if the backend is different

2. `backend.ts` (Current: Pocketbase)

- Pocketbase instance that has pre-defined config
- Import this instance unless you require a clean instance from pocketbase

3. `reactQuery.ts`

- QueryClient instance from @tanstack/react-query that has pre-defined config
- You can `useQueryClient` hook from react-query to access this instance

4. `swal.ts`

- SweetAlert2 instance that has pre-defined styling and config
- Use this instance to fire swal alerts

Custom scripts:
`npm run new-feature`

- To add a new feature into the application

@tanstack/react-query practices:

- https://tkdodo.eu/blog/tags/react-query
- Favor extracting each function into a hook
- Query Keys: https://tkdodo.eu/blog/effective-react-query-keys

Backend:

- Using Pocketbase for data and auth
- https://github.com/pocketbase/js-sdk

Important Notes:

1. Import files using Vite's alias (@src = './src')

- `import Example from '@src/example'

React App Struture

- Import `<Providers/>` in main.tsx

TailwindCSS:

- https://github.com/tailwindlabs/prettier-plugin-tailwindcss
- `clsx`: https://github.com/tailwindlabs/prettier-plugin-tailwindcss#sorting-classes-in-function-calls
