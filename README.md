# REACTJS TEMPLATE

## Ecosystem:

1. Build Tool - Vite
2. Styling - TailwindCSS, ShadCN, SASS
3. Data Fetching - Tanstack React Query
4. Routing - React Router
5. Forms - React Hook Form + Zod
6. Alerts (Modal) - SweetAlert2
7. Icons - react-icons, heroicons, lucide-react
8. Table - Tanstack React Table

## Getting Started:

```sh
1. Clone and cd into project
2. Initialise git: `git init`
3. Install node_modules: `npm i`
4. Create .env.local in root and add
   a. `VITE_SERVER_PORT=6969  #frontend server port`
   b. `VITE_API_URL=your_backend_server_url`
   c. All the firebase config key
5. Change these files to connect to your preferred backend service
   - ./src/lib/backend.ts (instance, dataprovider methods)
   - ./src/features/auth (api, provider)
6. Start development server: `npm run dev`
```

## Folders inside `./src`:

- `assets`: Common images, icons etc
- `components`: Reusable components
- `features`: App features, to be further organised by `components`, `pages`, `routes`, `hooks` that are used only by said feature
- `hooks`: Custom hooks
- `layout`: Layout components (Topbar, Sidebar etc)
- `lib`: Library extension or facades
- `pages`: Unique pages, screens and views
- `routes`: App routes
- `styles`: Custom .scss files, tailwindCSS
- `types`: Custom type declaration files
- `utils`: Utility functions

## `Features` folder:

- Each feature (eg. auth, CRUD of a new record) will be placed inside
- Create functions, components, hooks etc that are specific to the feature

## `Routes` folder:

- To add a new route, add the route in the appRoutes variable in `routes/index.tsx`
- You can also run `npm run new-feature` to automatically include a route for your new feature (Preferred)

## `Lib` folder:

1. `backend.ts` (Current: Restful Goyave)

- Using Restful API to connect to backend (Goyave)
- Common CRUD methods are provided
- Write your own custom methods to special endpoints in `features/featureName/api`

2. `reactQuery.ts`

- QueryClient instance from @tanstack/react-query that has pre-defined config
- You can `useQueryClient` hook from react-query to access this instance

3. `swal.ts`

- SweetAlert2 instance that has pre-defined styling and config
- Use this instance to fire swal alerts

4. `themeProvider.tsx`

- ShadCN theme provider for dark mode

## Custom scripts:

`npm run new-feature`

- To add a new feature into the application
- Basic -> Creates a basic entry page which is already linked to the app routes
- CRUD -> Creates CRUD pages with a basic Record model

- CRUD feature troubleshooting:

1. Ensure the collection name is same as the backend when prompted
2. An error will occur if your collection record model does not have a `name` field, either add a `name` field in your backend collection schema or change the record schema in the `data/index.ts` file

## Backend:

- Using Restful Goyave for data
- https://goyave.dev/guide/libraries/filter.html

- Using Firebase for auth
- Create user with email
- Sign in with email
- Sign in with phone number
- Forget password and reset password
- Remember to add in firebase config keys in .env.local
- Remember to enable email and phone sign in in firebase console

## Important Notes:

1. Import files using Vite's alias (@src = './src')

- `import Example from '@src/example'
