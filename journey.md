# journey

Documenting my steps while making `job-tracker`

# 1. Initial Set-Up

Just going to make a working list of my the tools, environment, etc.

- Visual Studio Code
  - VS Code's [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) install @ extensions tab
  - vscode-styled-components
- Windows Terminal
- Node.js (along with `npm`)
- Dotenv Official +Vault
- MongoDB 

# 2. Create README.md

One of the first things I do when creating a project is create a `README.md` a file in markdown that describes key things one needs to know about the project.

Key things:

- Description
- How to run the project
- A live demo link if possible
- Technologies used
- Prerequisites (JDK, Java, MySQL, etc...)
- Specifications or Features of the project
- ...

Nice to have:

- Testing
- Sample Screenshots
- Sample Data

So in the project folder (named `job-tracker` here) make that `README.md` file.

# 3. Setting up the React App

Within the project folder, create a `client` directory within it. So in the terminal (whether it is Windows Terminal opened at the project direcotry or Visual Studio Code's integrated terminal - use the shortcut [Ctrl + `]) then make directory.

```sh
mkdir client
```

Next change directory into `client`, and bootstrap the app with [React](https://reactjs.org/docs/create-a-new-react-app.html)

```sh
cd client

npx create-react-app .
```

`npx create-react-app` - does all the necessary setup and configuration for you to immediately start working on your project. 

Now run the app in development mode:

```sh
npm run start
```

## Folder Structure

I digress here to explain a bit about the folder structure of the project, to skip go to [Step 4](#4-get-an-empty-react-project)

```
job-tracker
  |- client
       |- node_modules
       |- public
       |- src
```

- `node_modules ` - contains all the react.js dependencies

- `.gitignore` - used by source control tool to identify which files and folders should be included or ignored during code commit

- `package.json` - This file contains dependencies and scripts required for the project.

- `src` - one of the main folders in the react project.

- `Index.js` - the file that will be called once we will run the project.

- `App.js` - is a component that will get loaded under index.js file. Any changes here will reflect in localhost://3000

Now the `src` folder is usually where the source code or **raw code** before minification, compilation and/or concatenation. 
- It is where one goes to **read** and **edit** code
- Usually the folder where anything that is used when the app is compiled
  - This also means this is where we store images, usually under an `assets` folder (for best practice)

Key [benefits](https://create-react-app.dev/docs/using-the-public-folder) of putting code in `src` folder:

> - Scripts and stylesheets get minified and bundled together to avoid extra network requests.
> - Missing files cause compilation errors instead of 404 errors for your users.
> - Result filenames include content hashes so you don't need to worry about browsers caching their old versions.

Also when using **webpack's asset bundling**, files in `src` will be rebuilt. [Source](https://create-react-app.dev/docs/folder-structure/)

The other end of `src` is `dist` folder which means distribution, or the code that is compiled, minimifed, etc...

The `public` folder contains anything that is not used by your app when it compiles.

- e.g., an image outside the app (like a favicon)

> If you put a file into the public folder, it will not be processed by webpack. Instead it will be copied into the build folder untouched. To reference assets in the public folder, you need to use an environment variable called PUBLIC_URL.

> Inside `index.html`, you can use it like this:

```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

Project directory so far:
```
job-tracker
  |- client
       |- node_modules
       |- public
       |- src
          | - assets
```

I'll store images under assets. A running list of what images are needed:

- favicon.ico
- logo
- main image ( for the front page)
- 404

# 4. Get an empty React project. 

Delete some files and code that won't be needed for our application

Go to the `src` folder and delete these files:

- App.css
- App.test.js
- index.css
- logo.svg
- reportWebVitals.js
- setupTests.js

Nearly all the files in `src` except for `App.js` and `index.js`. 

Then update `App.js` and `index.js` accordingly

```js
function App() {
  return (
    <div className="App">
      <h1>Job Tracker</h1>
    </div>
  );
}

export default App;
```

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

# 5. Replace Title and Favicon in `index.html`

Let's look into `public` > `index.html` and replace contents of `<title>` with our project title.

For the favicon, this line already handles the `src` attribute's value

```html
<link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
```

### Creating our favicon

Check out this link: [favicon.io](https://favicon.io/favicon-generator/).

Options | What I chose
--------|-------------
Text| J
Background| Rounded
Font Family | Roboto
Font Variant | Regular 400 Normal
Font Size | 120
Font Color | #FFFFFF
Background Color | #2cb1bc

So just place our own `favicon.ico` into the `public` folder, and replace the placeholder react favicon. 

It should now re-render that image.

# 6. Using normalize.css 

*Side-note*: Now I was deciding whether to just discard the step CSS normalize step altogether, since if you are familiar with CSS at a decent level to understand `box-sizing` (and spot box-sizing related bugs), margins, padding, and specific browser behaviors (default body margin, needing 100% height), etc... then just write your own CSS for the ground up. I would've omitted this step but I want to skip some of the CSS to go straight to the app development. Go to [Step 7](#7-coding-the-landing-page) if you want to omit this step.

- Going to speed up the development process by using [normalize.css](https://necolas.github.io/normalize.css/) which makes browsers render all elements more consistently. It creates a set of baseline styles for HTML elements for browsers across the board. 

You can either download the file from the link or run the command in the terminal:

```sh
npm install normalize.css
```

First stop the server if you have it running with `Ctrl + C`, then run the above command within the `client` folder.

Now let's use the file, so in `index.js` **before the line** `import './index.css';` put `import 'normalize.css';` 

```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'normalize.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### Now a side note while installing this package

**Do not run** `npm audit fix --force` if you do not know what you are doing. Just ignore the `npm audit report` till a fix is found, because it ended up installing and breaking the current code. Alternatively, run `npm audit fix` without the `--force` parameter (dangerous option sincce it upgrades the unsafe dependencies regardless of any rules).

Thankfully, version control system `git` to the rescue! I was able to save my `package-lock.json` and `package.json` by using `git revert` before the change happened. Then I ran `npm install` to restore the modules. 

# 7. Coding the Landing Page

Create a `pages` directory within `src`. Then create a `Landing.js` component.

Tip: In VS Code, `Ctrl + b` to toggle side menu or `Ctrl + Shift + e` to open project explorer. Click on `src` folder within that side menu, then click the new file icon (page + icon) and type out `pages/Landing.js` which will create both a directory and file at the same time.

```
job-tracker
  |- client
       |- node_modules
       |- public
       |- src
          | - assets
          | - pages
```

### Creating the logo 

Head over to [favicon.ico](https://favicon.io/logo-generator/) and click the Logo generator. 
Here are my settings:

Options | What I chose
--------|-------------
Text| Job Tracker
Font| Roboto
color | none
Font Color | #2cb1bc
Text| J
Font Color | white
Shape | Rounded
Color | #2cb1bc
#209CEE

Issue: SyntaxError: unknown: Namespace tags are not supported by default. **React's JSX doesn't support namespace tags**. 

In the SVG file, I changed

```
xmlns:xlink TO xmlnsXlink
xmlns:svgjs TO xmlnsXsvgjs
```

The reason being is that we are working with JSX, and these must be in camelCase property. Here is the [Stack Overflow Response](https://stackoverflow.com/questions/59820954/syntaxerror-unknown-namespace-tags-are-not-supported-by-default).

## Landing Page will have a 2 column lay-out

Description on the left, Login/Register on the right

## Styled Components

[Styling components for React](https://github.com/styled-components/styled-components). Here are the [docs](https://styled-components.com/docs).

> styled-components utilises tagged template literals to style your components.

It removes the mapping between components and styles. This means that when you're defining your styles, you're actually creating a normal React component, that has your styles attached to it.

```sh
npm install styled-components
```

Also download the extension called vscode-styled-components (to have syntax highlighting of CSS within the [Template literals](https://styled-components.com/docs/basics#motivation))

`Landing.js` 
```js
import React from 'react'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import styled from 'styled-components'


function Landing() {
  return (
    <main>
      <nav>
        <img src={logo} alt="job tracker logo" className="logo" />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>Job <span>Tracking</span> App</h1>
          <h4>Track and manage all your job applications in one place.</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Fuga odit pariatur voluptatum quam quia facere delectus, ipsam deleniti
            officiis culpa. Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Veritatis optio provident iusto tempore nam natus odio sit, ipsum dolorem pariatur!
          </p>
          <button className='btn btn-hero'>Login/Register</button>
        </div>
        <img src={main} alt="job hunt" className='img main-img'></img>
      </div>
    </main>
  );
}

const Wrapper = styled.main`
  
`
export default Landing 
```

`import` styled-components module, then create a styled component (called `Wrapper`) right before the `export`.

```js 
import React from 'react'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import styled from 'styled-components'

function Landing() {
  return (
    <main>
      { /* ... logic here */ }
    </main>
  );
}

const Wrapper = styled.main`
  
`
export default Landing 
```

Why `styled.main` ? Since we wrapped the `Landing` component in a `<main>` tag. 

Now we can replace the `<main>` tag with `<Wrapper>`: 

```js 
import React from 'react'
import logo from '../assets/images/logo.svg'
import main from '../assets/images/main.svg'
import styled from 'styled-components'

function Landing() {
  return (
    <Wrapper>
      { /* ... logic here */ }
    </Wrapper>
  );
}

const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
  }
`
export default Landing 
```

## What's the benefit of doing all this?

Now we can select all the elements and all the classes, inside the React component.

And just like with **SASS* we can do nesting of css, so lets say we target only the `<span>` inside `<h1>`, so we can do something like this:

```css
h1 {
  font-weight: 700;
  span{
    color: red;
  }
}
```

- **No class name bugs** - styled components generates unique class names for your styles. No duplication, overlap or misspellings
- **Easier deltion of CSS**
- **Maintenance**
- **Automatic critical CSS** 
- **Simple dynamic styling**

Check out the [Motivation](https://styled-components.com/docs/basics#motivation) behind styled components.

Let's start targeting the HTML elements:

```js
const Wrapper = styled.main`
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0 auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: block;
    }
  }
`
```

## Create `wrappers` folder under `src`>`assets`

The styled component `Wrapper` will be moved into a file also named `Landing.js` but under the `wrappers` folder where we'll import into our `pages` > `Landing.js`.

### Issue solved - Warning of several instances of "styled-components"

On Chrome Developer Tools, this issue with pop up.

Issue solved: duplicated module in node_modules.

Ran this command in the terminal:

```sh
npm dedupe
```

# 8. Create `components` folder 

Project Directory:
```
job-tracker
  |- client
       |- node_modules
       |- public
       |- src
          | - assets
              | - css
              | - images
              | - wrappers
          | - components
          | - pages
```

Now create a `Logo.js` within components, and move out the following lines out of `Landing.js` into logo component: 

```js
import logo from '../assets/images/logo.svg'

<img src={logo} alt="job tracker logo" className="logo" />
```

And import it in `Landing.js`
```js
import Logo from '../components/Logo';

function Landing() {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      {/* ... */}
    </Wrapper>
  );
}
```

## Organizing `components`, `imports` & `exports`

When the project scales, the components folder will be large and in turn the number of imports will increase. e.g., for `Landing Page`, let says it is not just the logo but many things like `Header`, 
`Footer`, `NavBar`, `SideBar`, `Ads` components then the imports would take up a lot of space in Landing component:

`Landing.js`
```js
import Logo from '../components/Logo';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Ads from '../components/Ads';
import Footer from '../components/Footer';

function Landing() {
  return (
    <Wrapper>
      <Logo />
      <Header />
      <NavBar />
      <SideBar />
      <Ads />
      <Footer />
      {/* ... */}
    </Wrapper>
  );
}
export default Landing 
```

This is fine as the app still works. Its all about preference, but the other and cleaner/concise way to do this is to set up an `index.js` within the components folder (or any folder with different files such as `pages`). In `index.js` import the `Logo` component and export everything. 

So instead of import one component file at a time like above, we can just look into `index.js` and specify what components are needed. So here is what the `import` in Landing looks like:

```js
import { Logo } from '../components'

function Landing() {
  return (
    <Wrapper>
      <Logo />
    </Wrapper>
  );
}
export default Landing 
```

The `index.js` in the `components` folder:
```js
import Logo from "./Logo";

export { Logo };
```

Now we can easily *scale* our imports/exports like so:

`components > index.js`
```js
import Ads from './Ads'
import Footer from './Footer'
import Header from './Header'
import Loading from './Loading'
import Logo from './Logo'
import Navbar from './Navbar'
import SideBar from './SideBar'

export {
  Ads,
  Footer,
  Header,
  Loading,
  Logo,
  Navbar,
  SideBar,
}
```

`Landing.js`
```js
import { Ads, Footer, Header, Loading, Logo, NavBar, SideBar } from '../components'

function Landing() {
  return (
    <Wrapper>
      <Logo />
      <Header />
      <NavBar />
      <SideBar />
      <Ads />
      <Footer />
      {/* ... */}
    </Wrapper>
  );
}
export default Landing 
```

We can list out specifically the named exports we need.

# 9. React Router

To set up the structure for the rest of the pages, which are single-page applications, and the routing solution is React Router v6. [React Router Docs](https://reactrouter.com/en/main/start/overview).

### Installing 

[Installation](https://www.npmjs.com/package/react-router-dom)

```sh
npm i react-router-dom
```

Now import the four components in `App.js`:

```jsx
import { BrowserRouter, Routes, Route, Links } from 'react-router-dom'
```

Now to use it within the `App`

```jsx
function App() {
  return (
    <div className="App">
      <Landing />
    </div>
  );
}
```

The App with the imports and components:

```jsx
import Landing from "./pages/Landing"
import { BrowserRouter, Routes, Route, Links } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Landing />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

- Wrap app component in `BrowserRouter`
- Then within set-up `Routes` component
- Inside Routes, we set-up each `Route` 
- Each `Route` has props `path` and `element` 
- `path` is pathname to add to URL
- `element` could be anything, we can provide the HTML in element or we can get the component

e.g., 

```jsx
<Route path="/" element={<div>Dashboard</div>} />
```

## Homepage

If the user is logged-in, then goes right away to the dashboard. Otherwise, transfer the user to a landing page to register/log-in. The "/" forward slash signals the home page. 

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>}/>     
        <Landing />
      </Routes>
    </BrowserRouter>
  );
}
```

Let's set-up the other pages. Notice the error page will be at the end, if no matches. 

```jsx
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>}/>
        <Route path="/register" element={<div>Register</div>}/>     
        <Route path="/landing" element={<Landing />}/>     
        <Route path="*" element={<h1>Error</h1>}/>     
      </Routes>
    </BrowserRouter>
  );
}
```

Now since we are devloping it in localhost:3000. Let's run the project:

```sh
npm start
```

Now `localhost:3000` should open up in browser. 

- Homepage is the dashboard
- To see the landing page, go to this link -> `localhost:3000/landing`
- Register page -> `localhost:3000/register`
- Error page -> anything added after `localhost:3000/####` that doesn't match above

# `pages` set-up

- Create pages components : Dashboard, Error, Register
- Create `index.js` and import all the pages, and export them one by one (including Landing)
- Import them in `App.js`


`index.js` 
```jsx
import Dashboard from "./Dashboard";
import Error from "./Error";
import Landing from "./Landing";
import Register from "./Register";

export {
  Dashboard,
  Error,
  Landing,
  Register
}
```

`App.js`
```jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Dashboard, Error, Landing, Register } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />}/>
        <Route path="/register" element={<Register />}/>     
        <Route path="/landing" element={<Landing />}/>     
        <Route path="*" element={<Error />}/>     
      </Routes>
    </BrowserRouter>
  );
}

export default App;
```

# The `Error` page

```jsx
import React from 'react'
import { Link } from 'react-router-dom'
import img from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

export default function Error() {
  return (
    <Wrapper className='full-page'>
      <div>
        <img src={img} alt="404 not found"/>
        <h3>page not found</h3>
        <p>We can't seem to find the page you're looking for.</p>
        <Link to='/'>Back Home</Link>
      </div>
    </Wrapper>
  )
}
```

- The wrapper gives it full height of the viewport and centers the rest. 
- Link the user back to home page

---

# The `Register` page

- Add imports to `Register.js`

```jsx
import React from 'react'
import Logo from '../components/Logo.js'
import Wrapper from '../assets/wrappers/RegisterPage'
```

Register will be a form that includes `Username`, `Email` and `Password`. 

It can toggle to a Log In form with just `Email` and `Password`

- The default state of Register page is these inputs 

Let's create a JavaScript object that contains these values, called `initialState`:

```jsx
const initialState = {
  name: '',
  email:'',
  password:'',
  isMember: false,
}
```

## Updating the Screen with `useState`

[React Beta Docs on Updating the Screen](https://beta.reactjs.org/learn#updating-the-screen)

Often, you'll want your component to "remember" some information and display it. To do this, add ***state*** to your component. 

Functions starting with `use` are called *Hooks*, e.g., `useState` is a built-in Hook provided by React. 

Now inside the function let's create a [React Hook](https://reactjs.org/docs/hooks-overview.html). 

Let's import `useState` first:

```jsx
import React, { useState } from 'react'
```

We declare a ***state variable*** inside our component. You will get two things from `useState`: the current state `values`, and the function that lets you update it `setCount`. Any name can be given but the convention is to call them `[something, setSomething]`

```jsx
const [values, setValues] = useState(initialState);
```

We use array destructuring to give different names to the state variables. 
- where `values` represent the the `initialState` object
- and `setValues` function will control the state
- The initial state argument is only used during the first render.

In other words, the first time `Register` component is display, the values will be `initialState` or more specifically a JavaScript object where its name, email, password and isMember is false. When you want to change state, call `setValues()` and pass the new value to it. If the you render the same component multiple times, each will get its own state. 

Now add event handlers:

```jsx
  const handleChange = (e) => { 
    console.log(e.target) 
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  }
```

Working on actual return of `Register`

Going to have a wrapper with `full-page` class for CSS styles to apply, along with a `form`. The `Logo` will be on top along with some header text like "Log In" or "Register". After we create a div with className "form-row". 

```jsx
  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit} action="">
        <Logo />
        <h3>Log In</h3>
        <div className="form-row">
          
        </div>
      </form>
    </Wrapper>
  )
```

Inside "form-row" add the label and input. Along with a submit button after form-row div.

```js
<div className="form-row">
  <label htmlFor="name" className="form-label">Name</label>
  <input type="text" value={values.name} name="name"
  onChange={handleChange} className="form-input"/>
</div>
<button type="submit" className="btn btn-block">submit</button>
```

## Creating a `FormRow` component

I want to use those inputs from FormRow and pass them as `props` to other components. For example, the email for `Profile` component.

- Create `FormRow.js` component in `components` folder and update the `index.js` accordingly
- Move the code from `Register` of the `div className = 'form-row'` out into the new component

Looking at the code:

```jsx
    <div className="form-row">
      <label htmlFor="name" className="form-label">Name</label>
      <input 
        type="text" 
        value={values.name} 
        name="name"
        onChange={handleChange} 
        className="form-input" />
    </div>
```
The FormRow component will look for props, as we need to pass down things like `type`, `value`, `name`, `onChange` and also a `labelText`.

- I don't see labelText, why? Well because there will be instances where the variable or state may be camelCase, but I would like to display it properly (non-camelCase). I'll get back to this later as this comment was added some time after. 

Let's receive the props in `FormRow` :

```jsx
export default function FormRow({type, name, value, handleChange, labelText}) {
```

And now to change the above code to use the props rather than hardcoding. Like this:

```jsx
import React from 'react'

export default function FormRow({type, name, value, handleChange, labelText}) {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        { labelText || name }
      </label>
      <input 
        type={type} 
        value={value} 
        name={name}
        onChange={handleChange}
        className="form-input"
      />
    </div>
  )
}
```

## Use `FormRow` component in `Register`

- First import

```js
import { FormRow, Logo } from '../components'
```

- Using the component, and passing the necessary props

```jsx
<FormRow
  type="text"
  name="name"
  value={values.name}
  handleChange={handleChange}
/>
```

- Now reusing the component to make the other form rows:

```jsx
<FormRow
  type="email"
  name="email"
  value={values.email}
  handleChange={handleChange}
/>

<FormRow
  type="password"
  name="password"
  value={values.password}
  handleChange={handleChange}
/>
```

- Note how because we set up the `initalState` as an object with properties `name`, `email` & `password`,  `handleChange` function will access both the name of the input and value, then access the proper value in intialState object afterwards. That is why `handleChange` can be reused, because it is assigned to a prop and invoked in the `FormRow` component. 

Now see it rendered @ `http://localhost:3000/register` try typing into an input field, say `Email` and open up Developer Tools (Press F12 in Chrome) and see the console log the proper input type, name, class, and value. The value matches the email in the state. 

---

## Form Validation 

Whenever you are dealing with forms, you'd want to set-up some form validation to catch things early on the client side rather than on the server side. 

So I'll add an `Alert` component which signals to the user that they need to provide all input values, because one or more are empty. 

- Creating the `Alert` component (rfc, set className to style, return an alert message)

Let's see how it looks in `Register` component, but first we should add a flag/boolean condition that signals whether alert should be seen. We can add this in `initialState` object, as `showAlert`.

### A side note about adding initialState

As of now, it is easier to put these flags like `isMember` or `showAlert`. We can move them out later, because the question remains whether we should ***pass the state down*** from `Register` component, for it later to be shared by other components. Or should initialSDtate be move upwards to the closest component containing all of them. We will have to see.

For now let's just add it so we can see the `Alert` component rendered on `Register`. Import component, add it to `initalState` and conditionally render it under the "Log In" text.

```jsx
import { Alert, FormRow, Logo } from '../components'

{/* ... */}

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  showAlert: true,
}

{/* ... */}

  <h3>Log In</h3>
  { values.showAlert && <Alert />}
```

Now `npm start` in the Terminal to see it rendered on our page, localhost:3000.

1. Press `F12` or right-click the page to `Inspect`. 
2. On the tabs with Elements, Console, etc... keep going right until you find `Components` Page. 
3. Click on `Register` in the Tree
4. Make sure to widen the Developer Tools View so you can see the right panel
5. Right panel consists of the Component, props & hooks.
6. Under hooks, there is a checkbox where we can toggle off `showAlert` so lets do that
7. Alert toggles off correctly

--- 

### Side Note - `[DOM] Input elements should have autocomplete attributes (suggested: "current-password"): (More info: https://goo.gl/9p2vKq)`

We see the above error, which also shows the line 
```js
<input type="password" name="password" class="form-input" value>
``` 

that triggers it. We should add one more attribute called `autocomplete` within the `FormRow` component to ensure `autocomplete="on"`. [Stack Overflow Post on autocomplete](https://stackoverflow.com/questions/54970352/input-elements-should-have-autocomplete-attributes).

---

## Toggling between Register or Log In

Finally, the `isMember` property from the `initialState` will be used. 

We want a way to toggle between a `Register` form or `Log In` form. 

Controlling:
- Inputs to display
- Changed the heading (from Register to Log In)
- On Submit, which Functions are involved (a register request or Log In request)

How to translate this to code?

1. First, a toggle function that inverts the value. More specifically, I want to extract the **current** value from `values` thats found in the state, and only change `isMember` to it's opposite value. 

```jsx
const toggleMember = () => {
  setValues({...values, isMember: !values.isMember});
}
```

  - What is the `...` ? The [Spread Syntax](https://javascript.info/rest-parameters-spread#spread-syntax).
  - Since `initialState` is an object that stores our state as values, we want to "spread out" all the current values

2. There are 3 locations where we use `isMember` condition. 
  - `<h3>` that has `Register` or `Log In`
  - On the inputs, we do not want to display the "name" `FormRow` field on Log In. But display it ony Register.
  - The actual toggle element for `isMember`, which will be a button. 
  
```jsx
// The heading <h3>
<h3>{values.isMember ? "Log In" : "Register"}</h3>

// Name Input
{ !values.isMember && (
  <FormRow
    type="text"
    name="name"
    value={values.name}
    handleChange={handleChange}
  />
)}
```

3. Creating the toggle button
  - Displayed right after the submit button
  - For now, it will be a `<p>` that displays text whether the user is `Not a member yet?` or is `Already a member?`. 
  - Note that if form is "Log In", then it should show "Register"
  - After that it displays a button that runs the function in step 1

```jsx
<p>
  <button
    type='button'
    onClick={toggleMember}
    className="member-btn">
    Register
  </button>
</p>
```

---

# Managing States

Before we move on, we have to discuss managing states in React. Link to [article on managing states](https://www.freecodecamp.org/news/how-to-manage-state-in-your-react-apps/#:~:text=Global%20%28UI%29%20state%20%E2%80%93%20Global%20state%20is%20data,example%20of%20global%20state%20is%20authenticated%20user%20state.). 

There are four main types of state you need to properly manage in your React apps:

1. Local state
2. Global state
3. Server state
4. URL state

### Local (UI) state

> Local state is data we manage in one or another component.

Local state is most often managed in React using the `useState` hook.

For example, local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form’s inputs.

### Global (UI) state 

> Global state is data we manage across multiple components.

Global state is necessary when we want to get and update data anywhere in our app, or in multiple components at least.

A common example of global state is ***authenticated user state***. If a user is logged into our app, it is necessary to get and change their data throughout our application.

Sometimes state we think should be local might become global.

### Server state 

> Data that comes from an external server that must be integrated with our UI state.

Server state is a simple concept, but can be hard to manage alongside all of our local and global UI state.

There are several pieces of state that must be managed every time you fetch or update data from an external server, including loading and error state.

Fortunately there are tools such as SWR and React Query that make managing server state much easier.

### URL state 

> Data that exists on our URLs, including the pathname and query parameters.

URL state is often missing as a category of state, but it is an important one.
In many cases, a lot of major parts of our application rely upon accessing URL state. Try to imagine building a blog without being able to fetch a post based off of its slug or id that is located in the URL!

There are undoubtedly more pieces of state that we could identify, but these are the major categories worth focusing on for most applications you build.


### Managing Local State in React

Local state is perhaps the easiest kind of state to manage in React, considering there are so many tools built into the core React library for managing it.

- `useState` is the first tool you should reach for to manage state in your components.

It can take accept any valid data value, including primitive and object values. Additionally, its setter function can be passed down to other components as a callback function (without needing optimizations like `useCallback`).

```js
import { useState } from "react";

function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={() => setSidebarOpen(false)} />
      {/* ... */}
    </>
  );
}
```

- `useReducer` is another option that can be used for either local or global state. It is similar in many ways to `useState` under the hood, although instead of just an initial state it accepts a reducer.

The benefit of `useReducer` is that it provides a built-in way to **perform a number of different state operations with the help of the reducer function**, which makes it more dynamic overall than useState.

You can see the benefit of `useReducer` versus `useState` in this vote tracking example. All we have to do to update state is pass the callback function `dispatch` a string (which is then passed to the reducer) instead of the new state itself.

```js
const initialState = { votes: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'upvote':
      return {votes: state.votes + 1};
    case 'downvote':
      return {votes: state.votes - 1};
    default:
      throw new Error();
  }
}

function VoteCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      Current Votes: {state.votes}
      <button onClick={() => dispatch({type: 'upvote'})}>Upvote</button>
      <button onClick={() => dispatch({type: 'downvote'})}>Downvote</button>
    </>
  );
}
```

### How to Manage Global State in React

Once you attempt to manage state across multiple components, things get a bit trickier.

You will reach a point in your application where patterns like “lifting state up” and passing callbacks down to update your state from components lead to lots and lots of props.

What do you do if you want to update a component’s state from basically anywhere in your app? You turn it into global state.

To manage it, however, you should opt for a third-party solution. Many developers are inclined to use built-in React features like the Context API to manage their state.

The reason to not use Context for global state management lies in the way it works. **The default behavior for Context is to re-render all children components if the value provided to it as a prop changes.**

> To be clear: the Context API is not a state management solution. It is a way to avoid problems like props drilling (creating a bunch of props in components that don’t need it), but it is only helpful for reading state, not updating it.

For example, it is *bad* practice to combine `useReducer` and `useContext`:

```js
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <StateProvider.Provider value={{ state, dispatch }}>
      <ComponentA />
      <ComponentB />
      <ComponentC />
    </StateProvider.Provider>
  )
}
```

In many cases, you do not want all children to update in response to a global state update, because all children may not be consuming or relying upon that global state. You only want to re-render if their props or state changes.

To manage your global state, use tried and tested third-party libraries. 

# Managing Global State / Global Context in our app

The **Global State** of our App will store things `user`, `jobs`, `isLoading`. 

[Passing Data Deeply with Context](https://beta.reactjs.org/learn/passing-data-deeply-with-context)

*Context* lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.

Context lets a parent component provide data to the entire tree below it. 

So we will be using `useContext` from 'react', a React Hook that lets you read and subscribe to context from your component. Here are the [docs on useContext](https://beta.reactjs.org/reference/react/useContext).

We will also be wrapping our `App` component in an `AppProvider` component. 

Let's just get into it and solve challenges along the way. 

1. Create `context` folder within `src`, with a file called `appContext.js`

2. Let's set up the imports in that file

```jsx
import React from 'react';
import { useState, useReducer, useContext } from 'react'
```

- Using useReducer() here as well

3. Create initialState object to store our state

```jsx
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
}
```

4. Create Context called `AppContext`

```jsx
const AppContext = React.createContext();
```

Context has two components has provider as well as consumer. We will be making the `AppProvider` component, which will wrap the `App` so we have to render its `children`. 

Make sure to use the hook `useState` and export `initialState`.

```jsx
import React from 'react';
import { useState, useReducer, useContext } from 'react'

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
}

const AppContext = React.createContext();

export default function AppProvider(props) {
  const { children } = props;
  const [state, setState] = useState(initialState);


  return (
    <AppContext.Provider value = {{...state}}>
      {children}
    </AppContext.Provider>
  )
}

export { initialState }
```

- We export `AppProvider` and `initialState`
- And we set up a custom hook so that we can avoid code duplication of: `import useContext`, and `AppContext` in every component to have access in the `value` prop that will be passed in `AppContext.Provider`
- In custom hook, called `useAppContext` (because **Functions starting with `use` are called *Hooks*** see [Hooks](https://beta.reactjs.org/learn#using-hooks))

```jsx
const useAppContext = () => {
  return useContext(AppContext)
}

export { initialState, useAppContext }
```

Context lets a component receive information from distant parents without passing it as props. 

Also export what we need from appContext such as `initalState` and `useAppContext`. 
 
## Using `AppContext` in `Register` component

```jsx
export default function Register() {
  const [values, setValues] = useState(initialState);
  const state = useAppContext();
  console.log(state);
  
  // ...
```
Open up the app & developer tools on http://localhost:3000/register and see the AppContext logged.

We should see an Object which contains `alertText`, `alertType`, `isLoading` and `showAlert`. Now we can extract these values from the `state` object, or forego the `state` assignment altogether and just pull out those values. Like so:

```jsx
  const {isLoading, showAlert} = useAppContext();
```

Now we can remove the `showAlert` property from `Register`'s `initialState` object. And substitute anywhere we have `values.showAlert` with just `showAlert` as we use the global context instead. 

Now to test that this all works, go to register page and open Chrome Developer Tools. Keep going right on the tabs to Components and now click on `AppProvider` and go to the `hooks` on the right panel. Toggle the `showAlert` fom false to true. We should now see that `showAlert` is data being shared by both components.

## Now let's use `useReducer` instead of `useState`

[useReducer docs](https://beta.reactjs.org/reference/react/useReducer)

Let's create a `reducer.js` file in `context` directory

A React reducer is a function that accepts two parameters: a state and an action, and returns a new state based on the action. It is used with the useReducer hook, which is an alternative to useState for managing complex state logic. 

Reducers are functions that take two arguments: the current state and the action to return a new state result. i.e.,  (state, action) = newState. The reducer accepets an action and the app's previous state and returns the new state. Action specifies what occured, and the reducers role is to return the new state as a result of that action.

For now just going to print out if the `action.type` and throw an Error. `reducer.js` will look like:

```jsx
const reducer = (state, action) => {
  throw new Error(`No such action: ${action.type}`);
}

export default reducer
```

Now back to `appContext.js`:

- remove `useState` from imports
- import `reducer` 
- replace `useState` with `useReducer`

`useReducer` looks for a reduce function (which handles the dispatch) as the first parameter, and `initalState`.

Also since we no longer `useState`, that `setState` should be renamed to `dispatch`

## Dispatching our first action

We want to display Alert when one of the values are empty.

Let's create an `actions.js` file within `context` folder. Then we export a `const` variable `DISPLAY_ALERT = 'SHOW_ALERT'` (in all uppercase as convention).

`import` this variable in both `reducer.js` and `appContext.js`.

- Let's handle that action right away in the reducer. If `action.type` is equivalent to `DISPLAY_ALERT` then return the current state as it is (spread out the values) but modify the following:
- `showAlert` property to true.
- The `alertType: 'danger'` 
- and `alertText:` to Please provide all values!

Like this: 

```jsx
import { DISPLAY_ALERT } from "./actions";

const reducer = (state, action) => {
  if(action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!',
    }
  }
  throw new Error(`No such action: ${action.type}`);
}
```

Next in `AppContext.js` set up the function. Above the return but below the state and `useReducer`:

```jsx
  const displayAlert = () => {
    dispatch({type:DISPLAY_ALERT});
  }
```

Inside the function body we `dispatch()`, where we dispatch an **Object** with the type of `DISPLAY_ALERT`.

So when working with `useReducer` we are passing in the object, and one thing we **MUST** pass in is the *type property*. 

Optionally, we can provide other properties, in our case we will stick with payload. If we are providing some kind of value to reducer to use later in the actual function then we go with payload. But for now we just pass in the object, and type must be present. 

```jsx
  const displayAlert = () => {
    dispatch({type:DISPLAY_ALERT});
  }
```

Also add `DISPLAY_ALERT` in the value, since ***every time we set up a function we should pass it down*** in `AppContext.Provider`.

```jsx
  return (
    <AppContext.Provider value = {{...state}}>
      {children}
    </AppContext.Provider>
  )

  // Pass function displayAlert down
  return (
    <AppContext.Provider value = {{...state, displayAlert}}>
      {children}
    </AppContext.Provider>
  )
```

### Make `Alert` component dynamic

- First `useAppContext` and import
- Two values that we are extracting from the **state** are `alertType` and `alertText`, the dynamic values that will change depending on our actions (the ones we are dispatching)
- Also change the hard coded `className` from `alert-danger` to interpolate `alertType`

```jsx
import React from 'react'
import { useAppContext } from '../context/appContext'

export default function Alert() {
  const { alertType, alertText } = useAppContext();
  return (
    <div className={`alert alert-${alertType}`}>
      {alertText}
    </div>
  )
}
```

### Takeaway: Now every time we use `Alert` component the values in our application will be provided from the **Global Context**

# Piecing things together : using Alert in Register

**Goal: Display `Alert` when one of the input values is missing**

Recall the `handleChange` method:

```jsx
  const handleChange = (e) => {
    console.log(e.target)
  }
```

We look for the event, every time we type something in the input we set the values. 

Ok we also have access to the `initialState` object or `state` in an object called `values` because of this:

```jsx
  const [values, setValues] = useState(initialState);
```

Let's spread out all the values in the object. We also have access to the `event` or `e.target`, and more specifically the `e.target.name` and `e.target.value`, we can dynamically set that property with the value. 

```jsx
  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  }
```

We can create *Dynamic Object Keys* by taking advantage of [Square Brackets Notation](https://javascript.info/object#square-brackets) or more specifically the [Computed Properties](https://javascript.info/object#computed-properties).

Now let's test out the handler:

```sh
cd client
npm run start
```

- Go to localhost:3000/register
- Open Chrome Dev Tools, go to Components Pane, Hit `Register` 
- Type into email input and we should see `email` property update its State in the `hooks` section

Now onto the `onSubmit` handler. First we have to destructure `displayAlert` from the global context. So this line:

```jsx
  const {isLoading, showAlert} = useAppContext();
```
Turns into this line:

```jsx
  const {isLoading, showAlert, displayAlert} = useAppContext();
```

Now lets destructure the values from the state in the handler. Then check if any of the values are empty:

```jsx
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
  }
```

Next we check for if any of them are missing (let's check name only if isMember is false, and we are on the Register panel). If this is the case, then return, else let's log the values. 

```jsx
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if( !email || !password || (!isMember && !name)){
      displayAlert();
      return; 
    }
    console.log(values);
  }
```

## Hiding the Alert properly

Once Alert component is displayed, it does not disappear unless we refresh the page or navigate away. It should hide when we successfully register/log-in. 

So let's create an export a `const` action of `CLEAR_ALERT`, then set up the imports in `reducer.js` and `appContext.js`. 

- Next in `reducer.js` set the global context, state of showAlert to false, alertType and alertText to empty. 

- In `appContext.js`, let's create a function of `clearAlert()` that dispatches `CLEAR_ALERT` after 4 seconds. 

# The Server

Go to the `job-tracker` directory which contains `client`, so if in `client` folder just go one level up. We will set up the server so run this line:

```sh
npm init -y
```

This initializes npm, and creates a file `package.json` 
The `-y` parameter is short for `--yes`, which automatically answers "yes" to any prompts that npm might print on the command line.

You can see list of parameters and npm init withh `npm help init`. 

Next create a file `server.js` still in the `job-tracker` directory.

Now to run the server the command in the shell is:

```sh
node server
```

## CommonJS vs ES6

Node uses both. Before and still is using CommonJS where they have a `require` but ES6 can import. If the project front-end is in ES6 but server-side is CommonJS there may be bugs. CommonJS good to set up for simple API's, but full project go ES6. 

```
CommonJS

const express = require('express')
const app = express()
```

```
ES6

import express from 'express'
const app = express()
```

But ES6 needs a bit more set-up to be used as a module. See the [Node docs on Modules: Packages](https://nodejs.org/api/packages.html#modules-packages).

> Node.js will treat the following as ES modules when passed to node as the initial input, or when referenced by import statements or import() expressions:

- Files with an .mjs extension.

- Files with a .js extension when the nearest parent package.json file contains a top-level "type" field with a value of "module".

### Let's go with the latter and go to `package.json` file

```json
{
  "name": "job-tracker",
  "version": "1.0.0",
  "description": "A job tracking and management application.",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/DragonSenses/job-tracker.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/DragonSenses/job-tracker/issues"
  },
  "homepage": "https://github.com/DragonSenses/job-tracker#readme"
}
```

Right after the `main` line, add this line: `"type":"module",`

```json
{
  "name": "job-tracker",
  "version": "1.0.0",
  "description": "A job tracking and management application.",
  "main": "server.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/DragonSenses/job-tracker.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/DragonSenses/job-tracker/issues"
  },
  "homepage": "https://github.com/DragonSenses/job-tracker#readme"
}
```

**From now on will be able to use, import and export in our server as well.**

I used to do CommonJS a lot and have it memorized. I thought it was difficult to set it up, but it was easier than I expected. So I definitely can vouch for using ES6 in Node, because more often than not front-end would run ES6 set-up (think `create-react-app`) so it makes senses to have the server run the same set-up. Although it is up to preference, for smaller apps its probably easy to type out those lines in CommonJS.

# Express

```sh
npm install express
```

Now in `server.js`

```js
import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello');
})

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
```

Notice how we :
- import the `express` ES6 module
- Set up a custom port, preferably one that does not collide with our front-end's port: 3000
- We set a home route in `app.get()`

Let's run the server:

```sh
node server
```

Now open up a browser and send a `GET` request @ `localhost:4000`

We should see the message. This indicates our set-up is good to go.

# Middleware 

Here is a brilliant explanation of [Middleware](https://www.theodinproject.com/lessons/nodejs-express-101#middleware) from TheOdinProject. 

Middleware is a complicated word for a simple concept. A middleware is just a plain JavaScript function that Express will call for you between the time it receives a network request and the time it fires off a response (i.e. it’s a function that sits in the middle). You will eventually be using several of these functions that will run in a specific sequence for every request.

For example, you might have a logger (that prints details of the request to the console), an authenticator (that checks to see if the user is logged in, or otherwise has permission to access whatever they’re requesting) and a static-file server (if the user is requesting a static file then it will send it to them). All of these functions will be called in the order you specify every time there’s a request on the way to your `app.get("/")` function.

It is possible and common to write your own middleware functions (you’ll be doing that later) so let’s take a minute to demystify what they’re actually doing. Middleware functions are just plain JavaScript functions with a specific function signature (that is, it takes a specific set of arguments in a specific order).

The three middleware function arguments are: `req`, `res`, and `next`. Technically, these are just variables, so you could call them anything, but convention (and the express documentation) almost always give them these names.

## Adding the `middleware`

middleware - software that acts as a bridge between an operating system or database and applications, especially on a network.

Let's say we have a request for some resource (e.g., localhost:4000/something) that doesn't exist we would get a default Express not found response: `Cannot GET /something`. We want a custom response to send back. 

Let's create a folder called `middleware`. This is the folder that will contain our `.js` files, that contains our custom functions to run as a fallback before rendering the page.

***Middleware lets you define custom functions that can be run before rendering either a page or a group of pages (layout).*** 

We will have a `not-found` middleware and `error` middleware

**REMEMBER**: since we are using `ES6 Modules` in Node, we need to use `.js` as the extension for the files. So when we `import` we have to add `.js` at the end of the file path. 

e.g.,

```js
import notFoundMiddleware from './middleware/not-found.js'
```

### not-found middleware

Let's create a `not-found.js` file in `middleware` directory:

```js
const notFoundMiddleware = (req, res) => 
  res.status(404).send('404! Oops, Route does not exist'); 

export default notFoundMiddleware
```

Now in `server`, we have to import the module and have `app.use(notFoundMiddleWare)` to signal that it is looking for all the `http` methods (GET, POST, etc.) and same for home route. Express first tries to match the request to all the routes that we have (right now just home route "/") and then if none of them match, then we go to `app.use()` to serve up the middleware.

### error middleware

notFound - looks for requests that do not match any of our current routes

error - looks for errors that are happening in our existing route

Create `error-handler.js`

It will have a function that accepts 4 parameters. This indicates to express that the first one will be error, and it will pass in that error. 

- For now just log the error, and return a generic 500 response.
- In json, set up that indicates that there was an error `json( {"msg":"Error occured"})`
- import this into `server.js`

Make sure to place this last in the server. Later on when we have `async` errors in our controllers, and eventually handle custom Mongoose Errors (like `node-express`)

Here is what `error-handler.js` looks like:

```js
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  res.status(500).json({msg:"Error occured."});
}

export default errorHandlerMiddleware
```

and now in the server

```js
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'

import express from 'express'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello');
})

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
```

We can test it by throwing an error in the home route

```js
app.get('/', (req, res) => {
  throw new Error();
  res.send('Hello');
})
```

Now we see the json, `{"msg":"Error occured."}` when we head over to `localhost:4000` and in the terminal we see the `Error` which comes from the `server.js`.

Now with the `Middlewares` in place we can set up the connection to MongoDB.

# Loading Environment variables

To add our application's config options we need a package [dotenv](https://www.npmjs.com/package/dotenv) which loads environment variables from a `.env` file into `process.env`. Storing configuration in the environment separate from code is based on the [Twelve-Factor App Methodology](https://12factor.net/config). 

## Steps to install and set up `dotenv`

0. Make sure all of this is in your `root` directory not `client`

1. Create `.env` file in the root of your project

```env
S3_BUCKET="YOURS3BUCKET"
SECRET_KEY="YOURSECRETKEYGOESHERE"
```

Eventually we will add our connection string, API keys, variables that store our sensitive data.

2. 
```sh 
npm install dotenv
```

3. import and configure `dotenv` as early as possible in application, in the server

Using [import "as"](https://javascript.info/import-export#import-as) to import under a different name.

```jsx
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express'
```

4. Now `process.env` has the keys and values you defined in your `.env` file

5. **IMPORTANT**: `.gitignore`

We have to add the folders/files:
-`/node_modules`
- `.env`

You do NOT want these to be added to the source control. 

6. Go with port 5000 to test

Add this to `.env` file

```
PORT=5000
```

Now remember the lines we added at the end of `server.js` where we interpolated the `port` variable:

```js
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server is listening on port ${port}...`));
```

WE can access the variable like so: `process.env.PORT`, and use it.

To test we just run the command in the terminal:

```sh
npm run start
```

NOW the server is listening on port 5000, which means the set-up has been correct so far.

Now we have a way to access our sensitive variables such as API keys, connection strings to databases, and more through `process.env` object. We can prevent theft by securing our API keys this way.

Here is an interesting Medium article [How to Hide Your API Keys](https://betterprogramming.pub/how-to-hide-your-api-keys-c2b952bc07e6) by Sylwia Vargas. If you can't access it, here are the salient points:

- Services like Google Cloud and AWS make it possible ot set restrictions of the API key
- key might only be used within a given URL

- Front End: Hide Your Keys (React)
- Apart from securing the API key, we can also hide it.
- IMPORTANT! If you created your React app with create-react-app, please be mindful of that your env variables will become a part of the build, meaning, they will be publicly available for anyone who’d inspect your files. You can still follow the steps below for the development phase so your API keys don’t get into github. Then, before deploying your page, delete the .env file and use the platform’s key management system (see below for Heroku and Netlify).

1. Create a file called .env in the root of your project’s directory.

app's tree:
```sh
- your_project_folder
  - node_modules
  - public
  - src
  - .env         <-- create it here
  - .gitignore
  - package-lock.json
  - package.json
```

2. Inside the .env file, prepend REACT_APP_ to your API key name of choice and assign it.

`REACT_APP_` is, in fact, a tool that create-react-app uses to identify these variables.

```txt
// .env
API_KEY=your_api_key            <-- nope, this won't work
REACT_APP_API_KEY=your_api_key  <-- yes!
// Example:
// REACT_APP_GOOGLE_API_KEY=123456
```

3. Add the .env file to your .gitignore file.

You don’t want this file to be committed to gitHub!

```txt
// .gitignore

# api keys
.env       <-- add this line

# dependencies
/node_modules
...
```

After you’ve saved .gitignore, run `$ git status` to make sure that `.env` is not on the list of changes to be committed.

4. Access the API key via the `process.env` object.

To check that you can access your API key, go to your `App.js` file and add `console.log` at the top below the `require` (or `import`) statements. After saving the file and reloading the page, if the console log does not show your API key, try restarting the react server. And of course, make sure to remove the `console.log` line before committing your code.

```jsx
// src/App.js
import React, { Component } from 'react';
import './App.css';
console.log(process.env.REACT_APP_GOOGLE_API_KEY)
class App extends Component {
...}
```

Just know that the key may show up in your network requests.

So, if you wish to totally mask your key, you should make a backend that proxies your requests, and store the API key there.

This solution, however, also may not be optimal “because then how do you protect the access to the backend that proxies the request? Or are you gonna leave this backend endpoint public?” 

In full transparency, reverse proxy solution is still vulnerable because you still need to protect access to it with an API key in the client side. Exadra37 points out:

The reverse proxy approach has the advantage that now your third party API key is in a environment you control, thus you can employ as many layers of API security measures as you can afford in order to prevent abuse of the third party service you are paying for.

# MongoDB Set-Up

Let's switch back the PORT on `.env` back to 4000. 

I'll assume you have a MongoDB Atlas account, and are familiar with Databases. 

If not, you can either go to the MongoDB University (if you are a slow but surely learner), or if you are an accelerated learner here is a great [MongoDB Crash Course 2022](https://www.youtube.com/watch?v=2QQGWYe7IDU), in just 30 minutes it will help you up catch up to speed. 

In my opinion the crash course is a lot better in its conciseness, whereas the MongoDB University courses forces you to watch videos from their player (which may not be accessible for everyone). Don't even get me started on the fact that their MongoDB Atlas interface does not have Dark Mode, the top most wanted request in the last years but they still have not delivered. Anyways, I digress.

## `mongoose` module

[mongoose](https://www.npmjs.com/package/mongoose) is a MongoDB object modeling tool designed to work in an asynchronouse environment. 

1. Create `db` folder at the root and `connect.js` file within it.

- `db` is our database folder
- `connect.js` will have a function that sets up our URL

Stop the server and 

2. install `mongoose`

```sh
npm install mongoose
```

3. Import mongoose in `connect.js`

```js
// Using Node.js `require()`
const mongoose = require('mongoose');

// Using ES6 imports
import mongoose from 'mongoose';
```

4. Setting up the connection.

We have to set up the function that looks for the URL Connection String.

Using mongoose's `connect` method **returns a Promise.** So in the server, we must set up `async` and `await`.

In `connect.js`

```js
import mongoose from 'mongoose'

const connectDB = (URL) => {
  return mongoose.connect(URL);
}

export default connectDB
```

5. Create a function to start the server only on successful connection

Only run the server, if the database connection was successful. The function called `start` has to be `async` and use `await`. We use the `connectDB` function that we will import in the `server.js`. 

We will access the `URL` connection string through `process.env.MONGO_URL`. Move `app.listen()` after the the `connectDB`, then invoke the function right after.

```js
const start = async () => {
  try{
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => { 
      console.log(`Server is listening on port ${port}...`)
    });

  } catch(error){
    console.log(error);
  }
}

start();
```

6. Create `MONGO_URL` in `.env`

Get your specific URL from `MongoDB Atlas Interface` Under Deployment > Database > Connect

- Connect your Application > Node.js 4.1 or later
- Get the connection string into application code, copy it and paste it in `MONGO_URL=YOUR_CONNECTION_STRING` in `.env`
- ***To name your collection in the database:*** right after `/` in the `mongodb.net/?` type the name of database collection you want, like so: `mongodb.net/job-tracker?`. Otherwise keeping it as is will store values in the collection under `test`

7. npm run start

Start the server and we should see server is listening on port etc.

# The MVC model -> Model-View-Controller

Model-View-Controller (MVC) is a software design pattern that divides an application into three components: model, view and controller. 

The **model** is responsible for managing the data and logic of the application. 

The **view** is responsible for rendering the presentation of the model in a particular format. 

The **controller** is responsible for handling user input and interaction, and controlling how data is displayed by selecting a view.

The main benefit of MVC is that it separates the concerns of an application, making it easier to maintain, test and reuse. MVC also allows for different views to use the same model, which can improve consistency and user experience. MVC is commonly used for developing user interfaces, especially web applications.

# How to implement MVC in my application?

The implementation of MVC may vary depending on the programming language and framework you use. However, a general approach is to create three classes or components for each layer of MVC: model, view and controller12. The model class should contain the data and logic of your application. The view class should define how to present the data to the user. The controller class should handle user input and interaction, and select a view based on the request12.

For example, if you are using Java, you can create a model class that represents an entity such as an employee, a view class that displays employee details in HTML format, and a controller class that receives user requests and calls methods on the model and view classes.

# How to implement MVC in my node.js application?

Here is the response bing gave me:

```
To implement MVC in your Node.js application, you can use a framework such as Express.js or Sails.js that provides features and tools for creating MVC applications. You can also follow some general steps to structure your application into model, view and controller components:

- Create a package.json file that contains the metadata and dependencies of your application. You can use npm init command to generate this file.
- Install the required packages for building the MVC structure in Node.js. You will need at least express for routing and handling requests, ejs for templating views, mongoose for connecting to MongoDB database, and nodemon for restarting the server automatically15. You can use npm install command to install these packages.
- Create a config file that stores your configuration variables such as port number, database URL, secret key etc. This file exports a JavaScript object that contains these variables.
- Create a server file that initializes your express app, sets up middleware functions, connects to the database, and listens on a port. This file imports the config file and requires other modules such as express, mongoose etc.
- Create a routes folder that contains files for defining your routes and controllers. Each file exports a function that takes an express app as an argument and uses app.get(), app.post(), app.put() or app.delete() methods to register routes with callbacks or controller functions. You can also use express.Router() class to create modular route handlers.
- Create a controllers folder that contains files for defining your controller functions. Each file exports one or more functions that handle user input and interaction, perform business logic using models, and send responses using views. You can also use res.render() method to render ejs templates as views.
- Create a models folder that contains files for defining your data models using mongoose schema and model classes. Each file exports one or more model classes that represent entities or collections in your database. You can also define methods, validations, hooks etc on your models.
- Create a views folder that contains files for defining your HTML templates using ejs syntax. Each file has an .ejs extension and uses <% %> tags to embed JavaScript code or expressions. You can also use partials, layouts etc to reuse common elements in your views.
These are some general steps to implement MVC in Node.js using Express.js framework. However, you may need to modify or add more steps depending on your specific requirements and preferences.
```

# Routes and Controllers

Create `controllers` folder in the root directory. Recall that the **controller** is responsible for handling user input and interaction, and controlling how data is displayed by selecting a view.

In this case, we will have an authentication controller called `authController.js`, which will store these functionalities:

- log in 
- register
- update user 

So create that file and within, we have three functions:

```js
const register = (req, res) => {
  res.send('register user');
}

const login = (req, res) => {
  res.send('login user');
}

const updateUser = (req, res) => {
  res.send('updateUser');
}

export { register, login, updateUser }
```

Now create the `routes` folder with `authRoutes.js` file which will export a function takes an express app as an argumentand uses app.get(), app.post(), app.put() or app.delete() methods to register routes with callbacks or controller functions. 

Here we use express.Router() class to create modular route handlers.


```js
import express from 'express'
const router = express.Router()

import { register, login, updateUser } from '../controllers/authController.js'
```

Now we can set up our routes:

```js
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(updateUser);
```

Then export our router:

```js
export default router
```

So back in the `server.js`, let's 

- import `authRouter`
- set up auth route in path '/api/v1/auth' and pass in `authRouter`

```js
// Routers
import authRouter from './routes/authRoutes.js'

// right after app.get('/')
app.use('/api/v1/auth', authRouter);
```

Since this is a `POST` route, we need to access the JSON that's past it. We do this with special built-in middleware from **Express**.

So add this line before `app.get()`:

```js
app.use(express.json());
```

This makes the JSON data available to the controllers. With POST requests, we'll be looking for stuff which is JSON data that will be passed to us with the `.json()` middleware from Express.

# Jobs Controller 

CRUD functions.

Functionality:

- createJob
- getAllJobs
- updateJob
- deleteJob
- showStats

**Because we are communicating with our database** all of these functions are all `async`

## Create the Jobs Router

In `routes` directory, create `jobsRouter.js` and import the functions from the jobs controller. 

```js
import express from 'express'
const router = express.Router()

import {
  createJob,
  getAllJobs,
  updateJob,
  deleteJob,
  showStats,
} from '../controllers/jobsController.js'

export default router
```

## Setting up the Jobs Route Structure

The route will be 'api/v1/jobs', so in `server.js` the `jobsRouter` will be passed in.

```js
app.use('/api/v1/jobs', jobsRouter);
```

and we set up the routes in `jobsRouter`

```js
router.route('/').post(createJob).get(getAllJobs);
router.route('/stats').get(showStats);
router.route('/:id').delete(deleteJob).patch(updateJob);

export default router
```

- The route will be 'api/v1/jobs' will have `post` and `get` methods.

- Then route in stats will access the data about the applications (how many are pending, interviews, etc.)

- Then we pass in id, so we can remove the job, and update the job

- `/stats` string must be above `:id` (an actual value from MongoDB)

Express looks for routes, it may not find a job with this particular id with stats.

## Add jobs controller and routes to server

```js
import jobsRouter from './routes/jobsRoutes.js'

//...

app.use('/api/v1/jobs', jobsRouter);
```

# Testing the routes in [Postman](https://www.postman.com/)

Create a collection named after your project name.
Create two folders > Add a Folder
- `Auth` and `Jobs`

Inside `Auth` add New Request. `[CTRL + E]` to rename to "Register User" and change it to a `POST` request.

## Set Up the globals

Click on the top right icon "Environment quick look" and "Add Globals"

Run the server and go to localhost:4000 in the browser, copy the address bar and paste it in the `Initial Value` field. Add `base_url` to the variable field of it, with type default.

Append 'api/v1' so `Initial Value` should look like: 

```
http://localhost:4000/api/v1
```

**Important** now Save it in the top right. So we can access this variable.

## Now back in `register user` post request

Add this to the POST request

```
{{base_url}}/auth/register
```

{{base_url}} is how we will access our global variable.

- Now `Send` the request. We should see `register user` has been returned, along with the relevant data in the console.

- base_url , register function, and rest of the routes is and will be working (unless we make any errors)

# Recap of MVC

MVC splits a large/complex application to specific sections that have their own purpose.

Example:

1. **Request:** User requests a specific page from a server

- Based on URL user is requesting, the server will send all of the request information to a specific **controller**

## Controller

- ***Handles request flow***
- Controller should never directly interact with data logic, only ever use Model to perform these interactions.
- Responsible for handling the entire request from the client
- Tells the rest of the server what to do with the request
- Acts as the middleman between **Model** and **View**
- Should not contain very much code
- Tells Model what to do and respond with what the Model returns

2. **Get Data**: Controller receives request, asks the Model for information based on the request

## Model
- ***Handles data logic***
- Interacts with database
- Handles all Validation, Saving, Updating, Deleting, Etc. of the data
- Does not handle User request, or what to do on failure or success (Controller does this)

3. **Get Presentation:** After Model sends response back to Controller, Controller now then interacts with View to Render data to the user

## View

- **Handles data presentation**
- Template file that dynamically renders HTML based on data Controller sends it
- Does not worry about final presentation of data, instead just cares only about how to present it
- View sends final presentation back to the controller

4. **Response**: Controller handles sending that presentation back to the user

**IMPORTANT**: `Model` and `View` never interact with each other. Any interactions done between Model and View are done by `Controller`. ***Presentation of data and Logic of data are completely separated***, facilitating the process of creating complex applications.

## HTTP Verb Primer

From [stack overflow](https://stackoverflow.com/questions/31089221/what-is-the-difference-between-put-post-and-patch)

HTTP Verb | Operation
----------|----------
POST | **C**reate
GET | **R**ead
PUT | **U**pdate
DELETE | **D**elete
PATCH | Submits a ***partial modification** to a resource (e.g., only need to update one field for the resource)

1. GET

GET is the simplest type of HTTP request method; the one that browsers use each time you click a link or type a URL into the address bar. It instructs the server to transmit the data identified by the URL to the client. Data should never be modified on the server side as a result of a GET request. In this sense, a GET request is read-only.

2. POST

The POST verb is mostly utilized to create new resources. In particular, it's used to create subordinate resources. That is, subordinate to some other (e.g. parent) resource.

On successful creation, return HTTP status 201, returning a Location header with a link to the newly-created resource with the 201 HTTP status.

3. PUT 

PUT is most-often utilized for update capabilities, PUT-ing to a known resource URI with the request body containing the newly-updated representation of the original resource.

4. DELETE

DELETE is pretty easy to understand. It is used to delete a resource identified by a URI.

On successful deletion, return HTTP status 200 (OK) along with a response body, perhaps the representation of the deleted item (often demands too much bandwidth), or a wrapped response (see Return Values below). Either that or return HTTP status 204 (NO CONTENT) with no response body. In other words, a 204 status with no body, or the JSEND-style response and HTTP status 200 are the recommended responses.

5. PATCH

Patch request says that we would only send the data that we need to modify without modifying or effecting other parts of the data. Ex: if we need to update only the first name, we pass only the first name.

---

# Back to POSTMAN, create more requests

Let's duplicate our earlier "Register User" request, `[CTRL + D]`

- Create Login > Post > and add the URL

- Create Update User > Patch > URL

Send to confirm they are working.

Note: Make sure to save the requests in Postman in the top right

If the route does not exist then we should have the `not-found` middleware kick in and send us a "Route does not exist".

## Do the same with Jobs

- Add new Request Under Jobs > Post > {{base_url}}/jobs

Save it and send, should see "createJob"

- New Request > Get All Jobs > GET > {{base_url}}/jobs

- New Request > Show Stats > GET > {{base_url}}/jobs/stats

- New Request > Update Job > PATCH > {{base_url}}/jobs/321

- New Request > Delete Job > DELETE > {{base_url}}/jobs/321

The 321 could be any random id

Send them all and we should see the respective responses "createJob, getAllJobs, showStats, updateJob, deleteJob" with responses 200.

Now we are ready to create our **Model**

# Models

Create `models` folder in the root directory

## Defining our User Schema

[Schemas](https://mongoosejs.com/docs/guide.html)

Create `User.js` within it:

- import mongoose
- create User Schema
- Pass schema definition into a Model we can work with using

```js
mongoose.model(modelNamne, schema)
```

Our User Scehama will have the 3 required and 2 optional fields: `{ name, email, password, lastName, location}`.

```js
import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please provide name'],
    minlength: 2,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default:'lastName',
  },
  location: {
    type: String,
    trim: true,
    maxlength: 30,
    default:'my location',
  },
});

export default mongoose.model('User', UserSchema);
```

# Form Validation

We need to validate the inputs from the User Schema.

I will be using mongoose's [Validators](https://mongoosejs.com/docs/validation.html), a middleware that has access to the fields. To be more specific, the [Custom Validators](https://mongoosejs.com/docs/validation.html#custom-validators) from mongoose. It allows custom validation by passing a **validatiton function** [more info here](https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-validate).

Let's set up validation for "email". 

```js
const UserSchema = new Schema({
  // ...
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: function(v) {
        return;
      },
      message: 'Please provide a valid email!'
    },
    unique: true,
  },
  // ...
});
```

As we can see, we have a `validate` key, with the value an object having two properties.

1. A validator function
2. An error message

We will be using an external npm package called [validator](https://www.npmjs.com/package/validator).
The reason for using an external package instead of a custom made one ourselves is because this should be well-tested and gives us a variety of options. Right now, making our own validator is not a primary concern but later we can always remove this dependency and do so. 

Install `validator` package

```sh
npm install validator
```

Then for ES6 imports
```jsx
import validator from 'validator';
```

Then pass in the reference to the function to `validate`, in `User.js`

```js
import validator from 'validator';

const UserSchema = new Schema({
  // ...
  email: {
    type: String,
    required: [true, 'Please provide email'],
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email!'
    },
    unique: true,
  },
  // ...
});
```

# Register back-end

Let's set up the Register in the authController. 

Import the User Model, we try to create the user and catch for any errors.

So a `try..catch` is involved. For positive we send a `201` status and error is `500` status.

`201 Created` - request succeeded, and a new resource was created as a result.

`500 Internal Server Erro` - The server has encountered a situation it does not know how to handle.

[MDN's HTTP Response Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

```js
import User from '../models/User.js'

const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({user});
  } catch(error){
    res.status(500).json({ msg:'there was an error' });
  }
  
  res.send('register user');
}
```

WE have the register in the `Authentication Controller`, creating the user is an asynchronous function, so have to add `async` and `await`. 

NOTE: in `server.js` we have:

```js
app.use(express.json());
```

## Go to Postman to test

Go to Auth > Register User > Body > Raw Checkbox > From Text to JSON

**What are we looking for?**
***The properties that are required in User*** see `User.js`

```json
{
  "name": "Tatsuya",
  "password": "secretPassword",
  "email":"1@2.com"
}
```

Send the request, and we should see that in the Body the user is created. 

WE can also see it in the MongoDB. 

Submitting it by omitting a required value returns a 500 error, so lets remove the email. 

Here is what we get after sending the request: 
```json
{
    "user": {
        "name": "Tatsuya",
        "email": "1@2.com",
        "password": "secretPassword",
        "lastName": "lastName",
        "location": "my location",
        "_id": "640fe8ea9284cf58998d2b39",
        "__v": 0
    }
}
```

Now in our MongoDB Database, we can see a directory called `test` and see a document logged under `users`.

Likewise, if we send a json where "email" value is an empty string

```json
{
  "name": "Tatsuya",
  "password": "secretPassword",
  "email":""
}
```

We get

```json
{
    "msg": "there was an error"
}
```

The error was `500 Internal Server Error`. 

We have `name`, `email` and `password` fields as required along with the email `validate` function as our validators. Any missing values provides us the error. 

So when the email field was empty and is run through the `validate` function, we trigger the `res.status(500).json({msg:'there as an error'})` line.

```js
const register = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({user});
  } catch(error){
    // Empty email will move control flow here
    res.status(500).json({ msg:'there was an error' });
  }
}
```

But that is just hardcoded error msg, we need to pass our `Error` to our controller, and then to our `errorHandlerMiddleware`. 

The way we can pass our error (from our route) to our controller

# Passing our error, from our route, to our controller and finally the Error Handler Middleware

Express docs on [Error Handling](https://expressjs.com/en/guide/error-handling.html).

And here is TPO's [Express 101](https://www.theodinproject.com/lessons/nodejs-express-101#middleware) on middleware. 

We have a middleware function:
```js
function(req, res, next) {
  // do stuff!
}
```

Where 

- `req` or `request` is an object that has data about the incoming request such as the exact URL that was visited, any parameters in the URL, the `body` of the request (useful if the user is submitting a form with some data in it) and many other things. 

- `res` or `response` is an object that represents the response that Express is going to send back to the user. Typically, you use the information in the req to determine what you’re going to do with the res by calling res.send() or another method on the object.

- `next` is a function that you see a little less often, but is very important to the functioning of your app. If you are writing or using some middleware that does not send a response back to the user’s client then you *must* call the `next` function at the end of your middleware function. The next function simply tells express to move to the next middleware in the stack, but if you forget to call it then your app will pause and nothing will happen!

So inside the `register` function in `authController`, instead of the `res.status(500).json({ msg:'there was an error' });` we remove it, go with `next` and pass the error in to the Error Handler.

```js
const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({user});
  } catch(error){
    // Pass the error using next
    next(error);
  }
  
}
```


Then the `errorHandlerMiddleware` can take the error and send it back, like this:

```js
const errorHandlerMiddleware = (err, req, res, next) => {
  res.status(500).json({msg: err});
}

export default errorHandlerMiddleware
```

Now let's try sending a request with a missing email field again (in Postman).

We get this:

```json
{
    "msg": {
        "errors": {
            "email": {
                "name": "ValidatorError",
                "message": "Please provide email",
                "properties": {
                    "message": "Please provide email",
                    "type": "required",
                    "path": "email",
                    "value": ""
                },
                "kind": "required",
                "path": "email",
                "value": ""
            }
        },
        "_message": "User validation failed",
        "name": "ValidationError",
        "message": "User validation failed: email: Please provide email"
    }
}
```

## Takeaway: If you have an error in the controllers, to handle that we go with `next`

Using `try..catch` approach, instead of hardcoding those errors for each controller. Add `next` and pass the error in, set up errorHandler which will have the logic to deal with the error. Whether it is our error, a Mongoose error, etc.

The `errorHandlerMiddleware` is located at the end of our routes. 

# Replacing `try..catch` with `express-async-errors` package

Check out [express-async-errors](https://www.npmjs.com/package/express-async-errors) npm package. 

In terminal, root directory of our project

```sh
npm install express-async-errors
```

So now we can replace our `try..catch`, let's remove it in `authController.js` 

We change this:

```js
import User from '../models/User.js';

const register = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({user});
  } catch(error){
    next(error);
  }
  
}
```

to this:

```js
import User from '../models/User.js';

const register = async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({user});
}
```

And just import the package in `server.js`

```js
import 'express-async-errors';
```

Let's run the server, and this time send a POST request with an empty name (in Postman):

```sh
node server
```

```json
{
  "name": "",
  "password": "secretPassword",
  "email":"1@2.com"
}
```

A `POST` request yields this:

```json
{
    "msg": {
        "errors": {
            "name": {
                "name": "ValidatorError",
                "message": "Please provide name",
                "properties": {
                    "message": "Please provide name",
                    "type": "required",
                    "path": "name",
                    "value": ""
                },
                "kind": "required",
                "path": "name",
                "value": ""
            }
        },
        "_message": "User validation failed",
        "name": "ValidationError",
        "message": "User validation failed: name: Please provide name"
    }
}
```

So the errors still pass on to the `errorHandleMiddleware`.

# Optional - Using `http-status-codes` package

[http-status-codes](https://www.npmjs.com/package/http-status-codes).

We install the library, but this time we `import` the specific **constants** for each Response Code.

**Why should I install it?**

- Cleaner to read, debug and maintain
- No need to remember the HTTP status codes

```sh
npm install http-status-codes
```

Now in `authController.js`, we import `StatusCodes and replace:

```js
  res.status(201).json({user});
```

with:

```js
import { StatusCodes } from 'http-status-codes';
```

Now head over to `error-handler.js` and import it and use the status code constant for 500: `INTERNAL_SERVER_ERROR`


```js
import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: '500 - Something went wrong, try again later',
  }

  res.status(defaultError.statusCode).json({msg: err});
}

export default errorHandlerMiddleware
```

Now we created an object called `defaultError` with the constant, and an error msg. 

Instead of `res.status(StatusCodes.Internal_SERVER_ERROR).json({msg: err});` we replace it with `res.status(defaultError.statusCode).json({msg: err});`

Notice right now we have `{msg: err}` instead of `{defaultError.msg}`, because right now we want to see the error (we received as the first argument to the function) printed out in Postman. This is to help with different types of errors such as MongoDB errors. This will be changed later.

# Error Handling

We can re-use our Error Handling logic here in other projects.

First let's look at the error object we get. When we do a `POST` request. 

```json
{
    "msg": {
        "errors": {
            "name": {
                "name": "ValidatorError",
                "message": "Please provide name",
                "properties": {
                    "message": "Please provide name",
                    "type": "required",
                    "path": "name",
                    "value": ""
                },
                "kind": "required",
                "path": "name",
                "value": ""
            }
        },
        "_message": "User validation failed",
        "name": "ValidationError",
        "message": "User validation failed: name: Please provide name"
    }
}
```

- An Error object with `errors` property. 
- Every field that is missing is going to be added as a property to `errors`
- In this case, a missing `name` field will add a `msg.errors.name` property.
- A missing `email` field will add a `msg.errors.email` property
- Inside the missing fields we have a key `name` and value of `ValidatorError`

## Error - Missing Field

There are a couple ways to handle this error to provide meaningful information for the user.

1. We can check for `ValidationError` and give the user the error message instead.

```js
const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);

  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: '500 - Something went wrong, try again later',
  }

  if(err.name === 'ValidationError'){
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = err.message;
  }

  res.status(defaultError.statusCode).json({msg: defaultError.msg});
}
```

2. Have an array that goes through each missing field of the error object and print out their messages.

Notice if we have multiple empty fields: 

```json
{
  "name": "",
  "password": "secretPassword",
  "email":""
}
```

Our error object is:

```json
{
    "msg": {
        "errors": {
            "name": {
                "name": "ValidatorError",
                "message": "Please provide name",
                "properties": {
                    "message": "Please provide name",
                    "type": "required",
                    "path": "name",
                    "value": ""
                },
                "kind": "required",
                "path": "name",
                "value": ""
            },
            "email": {
                "name": "ValidatorError",
                "message": "Please provide email",
                "properties": {
                    "message": "Please provide email",
                    "type": "required",
                    "path": "email",
                    "value": ""
                },
                "kind": "required",
                "path": "email",
                "value": ""
            }
        },
        "_message": "User validation failed",
        "name": "ValidationError",
        "message": "User validation failed: name: Please provide name, email: Please provide email"
    }
}
```

We can go through each property key in `errors` and extract out the `message` for each.

First we get the value of `errors` which is the object that contains the properties with the missing fields: `name`, `email` and `password`. We do this with `Object.values()`.

Then we should map each missing field to its `message` property. 

Let's join each string. 

```js
    defaultError.msg = Object.values(err.errors)
      .map( (field) => field.message)
      .join(","); 
```

Now make sure to restart the server:

1. Ctrl + C -> to stop the server
2. node server.js -> to run the server

Now in Postman, run the request with empty fields and we should get:

```json
{
    "msg": "Please provide name,Please provide email,Please provide password"
}
```
It should also give us a `400 Bad Request`.

### Email Validation

```json
{
  "name": "Luna",
  "password": "LunaBerry",
  "email":"notAValidEmail"
}
```

Because we had the `validate` set-up, the error handling also covers valid emails and passwords. 

## Error - Unique Email

Let's print out the error object when we have a non-unique email (signing up with an email in the database but different user).

```js
  res.status(defaultError.statusCode).json({msg: err});
```

The `POST` request:

```json
{
  "name": "Luna",
  "password": "LunaBerry",
  "email":"1@2.com"
}
```

The error object we get:

```json
{
    "msg": {
        "index": 0,
        "code": 11000,
        "keyPattern": {
            "email": 1
        },
        "keyValue": {
            "email": "1@2.com"
        }
    }
}
```

- Has a `code` of `11000`
- We have the offending field stored in `keyValue`

Let's change it back so we can have a custom error message:

```js
  res.status(defaultError.statusCode).json({msg: defaultError.msg});
```

Then we have to check if the `err.code` exists, and it is equal to 11000 then:

- Respond with a bad request
- Create a template string for the error message, that it is a non-unique value
- We can get the `email` field if we access the objects key using `Object.keys()`

```js
  if(err.code && (err.code === 11000)){
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `${Object.keys(err.keyValue)} field has to be unique`;
  }
```

Restart the server, send the request with non-unique email to Postman, and we get:

```json
{
    "msg": "email field has to be unique"
}
```

## Error Checking in the Controller - Empty input fields 

Let's check for errors in the `Register` controller (i.e., `authController.js`). 

Checking for errors before it hits the middleware makes it less error-prone and allows for checking for specific errors. 

We can access those input fields in the `req.body` so we can destructure it for the fields we check for. Let's add this to the `register` function. 

```js
const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    // next(error);
    throw new Error("Please provide all values");
  }

  // Instead of req.body, pass in the input fields
  const user = await User.create({ name, email, password });
  res.status(StatusCodes.CREATED).json({user});
}
```

Now when the error is passed to the error middleware, we can have add it as a message to the `defaultError`. 

```js
  const defaultError = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || '500 - Something went wrong, try again later',
  }
```

## Custom Error Class

Let's create a custom error class to add on to this instead of the generic 500. 

We create a `CustomError` class and extend from the JavaScript `Error` class. We create a custom class so we can extend the functionality, in this case I want to add the property of `statusCode` to it. Then instead of passing a generic `Error` we can pass in the `CustomError` instead to the middleware. 

In `authController.js`
```js
import User from '../models/User.js';
import { StatusCodes } from 'http-status-codes';

class CustomError extends Error {
  constructor(message){
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    throw new CustomError("Please provide all values");
  }

// ...
```

Now check for the custom `statusCode` here:

```js
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || '500 - Something went wrong, try again later',
  }
```
Let's pass in a `POST` request with an empty field and we should see a `BAD_REQUEST` `401` instead of a 500.

Now we see a 400 Bad Request.

```json
{
    "msg": "Please provide all values"
}
```
We invoke a CustomError for our API.

## Adding more Custom Errors

```js
class CustomError extends Error {
  constructor(message){
    super(message);
  }
}

class BadRequestError extends CustomError {
  constructor(message){
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

class NotFoundError extends CustomError {
  constructor(message){
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}
```

## Refactoring our `errors`

Let's create an `errors` folder @ root directory and set up the `index.js` to export all the custom errors we will make (each in their separate file).

Import the `BadRequestError` in `authController.js` to use it. Run the POST request with an empty field and we should see the proper msg and error.

## Check for duplicate emails in Register Controller

Let's catch the duplicate email earlier and not rely on error handler.

Check the database if a user with that same email property exists using the `User.findOne()` method. 

So in `authController.js`,

```js
  const userAlreadyExists = await User.findOne({email});

  if(userAlreadyExists){
    throw new BadRequestError(`The email: ${email} is already in use.`);
  }
```

# Hashing Passwords

We hash passwords for more security. It defends against passwords from being exposed to danger when a databased is compromised. 

We can only compare the hashed values, we do not save the passwords.

Going to use [bcrypt.js](https://www.npmjs.com/package/bcryptjs) to aid us.

```sh
npm install bcryptjs
```

Then we will use [mongoose middleware](https://mongoosejs.com/docs/middleware.html), which allows us to perform some operations on the data before we save it as a document. In this case, we will hash the passwords (so using the `pre` middleware functions). [mongoose pre middleware](https://mongoosejs.com/docs/middleware.html#pre).

The methods we will be using from `bcryptjs` will be `async`. 

## Mongoose middleware, saving password before it is saved to the database

Before we save the document (under `User Schema`), we want a pre middleware to hash the password. 

```js
UserSchema.pre('save');
```

This will be invoked in two cases in the `authController.js` where we create the user with `User.create()` and updating the user in `updateUser` (when we have `User.save()`) but `User.findOneAndUpdate()` is a method that does not trigger the hook `UserSchema.pre('save')`.

Let's pass in a callback function in there (with `function` keyword because we will use `this`).

```js
UserSchema.pre('save', function(){
  console.log(this.password);
});
```

Now in Postman send a `POST` request in `register user` and we should have the JSON of the user's info, and in the sever we should see the password logged in the console.

## Securing the passwords using bcryptjs

Import `bcryptjs` in User Model, then in pre-save hook set up the functionality in there.

First we:

1. Generate the "Salt" 

- Salt is random data used as additional input to a one-way function that hashes data, such as a password
- More rounds of "Salt" means more security but also means longer processing time
- `await genSalt(10)`

2. Pass in the salt and password to the hash function

- Remember that in pre-save hook we can `console.log(this.password)` meaning we have access to whatever password the user is passing in
- `this.password = await bcryptjs.hash(this.password, salt);` will allow us re-assign the password to a hashed and salted version of it

```js
UserSchema.pre('save', async function(){
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});
```

Later we will remove the `password` property from the response, but for now we are just testing the functionality. 

3. In Postman, send a request and see if the password we get as a response is hashed and salted. 

I send this as the `POST` request on the register

```json
{
  "name": "Luna",
  "password": "LunaBerry",
  "email":"LunaBerry@gmail.com"
}
```

Here is the response:

```json
{
    "user": {
        "name": "Luna",
        "email": "LunaBerry@gmail.com",
        "password": "$2a$10$NX1mJKKq927f6DpOyOZmcOI/rnejRbh.YRXKMvARetbZ/2f48V3ju",
        "lastName": "lastName",
        "location": "my location",
        "_id": "6413bc3372ae6c23df387a9a",
        "__v": 0
    }
}
```

# Mongoose instance methods

[Mongoose instance methods](https://mongoosejs.com/docs/guide.html#methods) will be our own custom document instance methods. We can use the `Schema.methods` object directly to save an instance method. Note: do **not** declare methods using ES6 arrow functions as they explicitly prevent binding `this`, so method will **not** have access to the document. 

In this function we can access our document using `this`.

### Authenticate users with JWT

Another strategy to authenticate users and secure our app is to generate and pass a secure token between our back-end and front-end code. Doing so will make sure that our user’s username and password are not compromised and will also give us the ability to expire our user’s session for added security. The basic idea is that when a user signs in to our app, a secure token is created, and then for all subsequent requests that token is passed in the header of our request object.

We want to add a method that creates a JSON Web Token.

1. Create custom instance method `createToken` to our User Model

```js
UserScema.methods.createToken = function () {
  console.log(this);
}
```

2. In the controller, invoke the `createToken()` method before we send an OK Status code

For now the `createToken()` just logs the user so we can access all the values, which we will use to pass on to JSON Web Token.

# JSON Web Token

Install the [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) package.

```sh
npm install jsonwebtoken
```

Then go into the User Model, import the package and call the `sign()` method.

Here is the usage from the docs: 

```js
jwt.sign(payload, secretOrPrivateKey, [options, callback])
```

We are going to use the user's `id` property to help create it, and have a secret key as a string, and also set the expiration to 1 day. 

```js
jwt.sign({ userId: this._id }, 'secretPrivateKey', { expiresIn: '1d' });
```

We will `return` this JWT in the `createToken` method. Why `this._id` ? because its a private property, and when the User is created that is a property created before being saved to a database (when we logged it).

```js
UserSchema.methods.createToken = function () {
  return jwt.sign({ userId: this._id }, 'secretPrivateKey', { expiresIn: '1d' });
}
```

Now instead of invoking `createToken`, assign the newly minted JWT to a variable named `token` in the Controller.

Also we send the status code and a json `user` we should also send back `token`.

Now in Postman send a `POST` request to register a user, and see the newly created json of user and token. This is what we will use for communication between front-end and server.

Every time a user makes a request in the front-end, the request will have the `JWT`, otherwise server sends an error response. 

## Added security to JWT

Instead of a string `secretPrivateKey`, let's store them as variables in our `.env` file.

Go to [All Keys Generator](https://allkeysgenerator.com/) to generate an Encryption Key, 256-bit.

Now let's add it to `.env` file under the variable name `SECRET_KEY`.

Let's also add `LIFETIME` variable and set it to `1d`.

Now let's replace it with these variables in User Model's `createToken` method, like so:

```js
UserSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id }, process.env.SECRET_KEY, { expiresIn: process.env.LIFETIME });
}
```

# Removing `password` from the response

Now in order to complete our secure response we have to remove the `password` property.

In mongoose, we can use the `select` property in the `SchemaType`, see the [docs](https://mongoosejs.com/docs/api/schematype.html#schematype_SchemaType-select). 

In `User.js`, here's how we do that:

1. Go into the user controller, and where we create the `UserSchema`
2. Add `select` property and set it to `false`, this will make it such that the property will be excluded from the results

```js
const UserSchema = new Schema({
  /* ... */
  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 6,
    // Set the select property to false
    select: false,
  },
  /* ... */
```

## Issue: using `select` didn't work

Now if we use a method like `findOne` (i.e., `user.findOne()`) then `password` will be excluded.

But since we are using `User.create()` in the `authController.js`, the `password` was not excluded.

## Solution: specify what to respond inside the first parameter or `user` 

In the `authController.js` we have the line

```js
  res.status(StatusCodes.CREATED).json({user, token});
```

So instead we set user to an object with the properties we want to send.

```js
  res.status(StatusCodes.CREATED).json({user:{
    email: user.email,
    lastName: user.lastName,
    location: user.location,
    name: user.name
  }, token});
```

We excluded `password` but did include `location` (we will have a use for it soon so might as well).

# Connecting the Front-End & Back-End

First we want to be able to run both the back-end server and front-end application at the same time.

We want to connect the React front-end app & the back-end Express server.

Of course, we can just open up two terminals and have one in the `client` and one one the `server`.

Though a more convenient way is this dev dependency called [concurrently](https://www.npmjs.com/package/concurrently) that runs both `server` and `client` at the same time.

To make it work we have to go into our `package.json` and change the `scripts`.

Let's install some packages on the local scope (as a dev dependency).

1. Let's install [nodemon](https://www.npmjs.com/package/nodemon) so it can listen to changes to our server and restart it

```sh
npm install --save-dev nodemon
```

2. Next install [concrruently](https://www.npmjs.com/package/concurrently)

```sh
npm i concurrently -D
```

3. Now set-up the scripts

First let's create the npm command for server and client separately, then combine them with concurrently. The combination will be our `npm run start`. Put this in the `package.json` in the root project directory.

```json
  "scripts": {
    "server": "nodemon server --ignore client",
    "client": "npm start --prefix client",
    "start": "concurrently --kill-others-on-fail \" npm run server\" \" npm run client\"" 
  },
```

This was the old `scripts`:

```json
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
```

Notes: 
* the `--ignore client` prevents nodemon from spinning up the server for every change on the front-end
* the `--prefix client` tells react where to run it
* the `--kill-others-on-fail` kills all the servers (ends the entire process) if just one of the servers fail

## Problem - both servers have no way to communicate with each other

localhost:3000 
- React front-end application

localhost:4000
- Express server
- Go to browser and make a `GET` request, should see `Hello`

Now go to Postman and set-up a route
- `GET` request
- localhost:4000
- you should get `Hello` response 

Now if you set-up a `fetch` request in dashboard page, or any of the pages what will we get?

Let's 
1. import `useEffect` from react
2. Create function `fetchData` which fetches the `localhost:4000` or the port that **Express server** is listening to
3. Use the `useEffect`, once application (or dashpage) is navigated to, then you want to invoke it only when the component mounts. So set up dependency array as empty. 
4. Inside callback function in `useEffect` go `fetchData`
5. Now in the terminal run `npm run start` and go to the browser for `localhost:3000` to the Dashboard main page. 

In `Dashboard.js`

```js
import React, { useEffect } from 'react';

export default function Dashboard() {
  const fetchData = async () => {
    const response = await fetch('http://localhost:4000');
    const data = await response.json();
    console.log(data);
  }

  useEffect( () => {
    fetchData();
  },[]);
    
  return (
    <h1>Dashboard</h1>
  )
}
```

We still do not have access to the server data or the `Hello` response, if we check the developer tools and console.

**Does not work because both applications live on *separate* servers!**

Here is the errors you see in the console:

```sh
Access to fetch at 'http://localhost:4000/' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

Failed to load resource: net::ERR_FAILED

Uncaught (in promise) TypeError: Failed to fetch
    at fetchData (Dashboard.js:6:1)
    at Dashboard.js:12:1
    at commitHookEffectListMount (react-dom.development.js:23150:1)
    at commitPassiveMountOnFiber (react-dom.development.js:24926:1)
    at commitPassiveMountEffects_complete (react-dom.development.js:24891:1)
    at commitPassiveMountEffects_begin (react-dom.development.js:24878:1)
    at commitPassiveMountEffects (react-dom.development.js:24866:1)
    at flushPassiveEffectsImpl (react-dom.development.js:27039:1)
    at flushPassiveEffects (react-dom.development.js:26984:1)
    at react-dom.development.js:26769:1

Access to fetch at 'http://localhost:4000/' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

Failed to load resource: net::ERR_FAILED

Uncaught (in promise) TypeError: Failed to fetch
    at fetchData (Dashboard.js:6:1)
    at Dashboard.js:12:1
    at commitHookEffectListMount (react-dom.development.js:23150:1)
    at invokePassiveEffectMountInDEV (react-dom.development.js:25154:1)
    at invokeEffectsInDev (react-dom.development.js:27351:1)
    at commitDoubleInvokeEffectsInDEV (react-dom.development.js:27330:1)
    at flushPassiveEffectsImpl (react-dom.development.js:27056:1)
    at flushPassiveEffects (react-dom.development.js:26984:1)
    at react-dom.development.js:26769:1
    at workLoop (scheduler.development.js:266:1
```

WE can wrap it in a `try..catch` but it is only a stop-gap solution that just makes the application work but the problems still persist. 
```js
import React, { useEffect } from 'react';

export default function Dashboard() {
  const fetchData = async () => {
    try{
      const response = await fetch('http://localhost:4000');
      const data = await response.json();
      console.log(data);
    } catch (error){
      console.log(error);
    }
  }

  useEffect( () => {
    fetchData();
  },[]);

  return (
    <h1>Dashboard</h1>
  )
}
```

There is no access to the data passed across the servers. We still won't see the `Hello` from the server. Opening the console developer tools we still see the same errors.

## Solution 1: Install `CORS package`

Notice how one of the issues is that `CORS policy` has blocked the `fetch` request. 

1. Install cors package
2. Set up cors as middleware in our server 
3. On the front-end, fetch the data from server
4. Convert response data as JSOn

Let's install [cors package](https://www.npmjs.com/package/cors), an Express middleware that can be used to enable `CORS`. 

```sh
npm install cors
```

In the `server.js`

```js
let express = require('express')
let cors = require('cors')
let app = express()
 
app.use(cors())
```

Now in dashboard, we now can get the `data` with `fetchData` but the response is a simple string `Hello`. But in `fetch` we are looking for a `JSON` so in `server.js` we have to change this:


```js
app.get('/', (req, res) => {
  res.send('Hello');
})
```

To this:

```js
app.get('/', (req, res) => {
  res.send({ msg: 'Hello' });
})
```

Changing the string we `send` wrapped as an object with a property msg of "Hello".

---

## Solution 2: Proxy 

When we push server into production, any front-end application can access the API and data.

If you want the app to be publicly available then that's ok. BUT for this job tracking app, you do NOT want this app to have that data available to any other front-end app.

In CORS, it can be configured where only the front-end of the app can access the code. The config with origin where it is explicitly stated which domain has access to the data.

But if you do not want to use full URL when building full URL (from `localhost:5000` and refactored to another URL). 

What if you can fetch the response in such a way that it doesn't have to be `http://localhost:5000/` but rather `/data.json`. 

Two issues we solved: reduce access from anywhere and not having to use the full URL

1. front-end we can fetch usomg forward slash '/' and the endpoint (e.g., `/.../auth.js`).
We can write code like this:

```js
const response = await fetch('/data.json')
```

2. No need to use `CORS` package, where we have to configure and explicity state which domain has access to the data

### Eventually, our front-end application will be hosted on the server 

The front-end app will be static assets, so it will have full access to the API.

We will use `build` script to build a production-ready React app, which is a bunch of static assets.
Then on express server, we use express `static` to server it as a static asset.

## Implementing the Proxy

[Create-React-App Proxying API](https://create-react-app.dev/docs/proxying-api-requests-in-development/)

Navigate to the `client`'s `package.json` and add the following:

```js
"proxy":"http://localhost:4000"
```

Now in `Dashboard` we can just `fetch` the `/` route.

```js
export default function Dashboard() {
  const fetchData = async () => {
    try{
      const response = await fetch('/');
      const data = await response.json();
      console.log(data);
    } catch (error){
      console.log(error);
    }
  }

  useEffect( () => {
    fetchData();
  },[]);

  return (
    <h1>Dashboard</h1>
  )
}
```

Restart the app with

```sh
npm run start
```

We can now access the data without [CORS issues](https://stackoverflow.com/questions/21854516/understanding-ajax-cors-and-security-considerations), and skip the `localhost:4000`.

## Issue with Proxy to be aware of

When setting up the Proxy, we are talking about the **fallback**, the forward slash `/` will be the static server serving up our own `index.html`.

So if you do not have that resource on your React server, then you get back 404 and JSON error (not able to convert the resource to JSON).

See the production setup in [create-react-app proxy docs](https://create-react-app.dev/docs/proxying-api-requests-in-development/).

```sh
/             - static server returns index.html with React app
/todos        - static server returns index.html with React app
/api/todos    - server handles any /api/* requests using the backend implementation
```

So when we run the server with proxy we get this error in the console:

```sh
Dashboard.js:11 SyntaxError: Unexpected token '<', "<!DOCTYPE "... is not valid JSON
```

There is a successful response, but it is just trying to convert the response data into a JSON.

```js
  const response = await fetch('/');
  const data = await response.json();
```

## Server Response

Back to the server, instead of the forward slash route `/`, the route will be `/api/v1` because all the routes start in the same manner.

This: 

```js
app.get('/', (req, res) => {
  res.send('Hello');
})
```

Turns into:
```js
app.get('/api/v1', (req, res) => {
  res.send('Hello');
})
```

and in the `Dashboard` let's fetch this route:

```js
import React, { useEffect }  from 'react';

export default function Dashboard() {
  const fetchData = async () => {
    try{
      const response = await fetch('/api/v1');
      const data = await response.json();
      console.log(data);
    } catch (error){
      console.log(error);
    }
  }

  useEffect( () => {
    fetchData();
  },[]);

  return (
    <h1>Dashboard</h1>
  )
}
```

Now it works but if you were to put a route like `/api/v1/something` a resource not on React server, then you get the same error where it cannot convert data to JSON.

WE still have access to the data so if we switch the response:

```js
  const response = await fetch('/api/v1');
```

to our fallback

```js
  const response = await fetch('/data.json');
```

Then we still have access to the data.

If it is not a resource in the server, then use the proxy. 

## Production Options:

1. React `build` to build up as static assets and serve them on the Express server

2. If hosting on different platforms, front-end app and server app, then you need configuration options provided by the hosting provider.

# Register Logic

Finally we can go back to our app and start working on the logic. First let's clean out our `Dashboard` and remove `fetchData` and `useEffect`. 

```js
import React from 'react';
import { useEffect } from 'react';

export default function Dashboard() {
  const fetchData = async () => {
    try{
      const response = await fetch('/api/v1');
      const data = await response.json();
      console.log(data);
    } catch (error){
      console.log(error);
    }
  }

  useEffect( () => {
    fetchData();
  },[]);

  return (
    <h1>Dashboard</h1>
  )
}
```

to

```js
import React from 'react';

export default function Dashboard() {
  return (
    <h1>Dashboard</h1>
  )
}
```

Next, update the initialState with 3 more properties in `appContext.js`
- `user`, `token`, user`Location

```js
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: null,
  token: null,
  userLocation: '',
}
```

Let's create the actions for Register. Add these in `actions.js`

```js
export const REGISTER_USER_BEGIN = 'REGISTER_USER_BEGIN';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
```

These will be the actions that will be dispatched. 

Let's import these actions into the `reducer`

```js
import { 
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
} from "./actions";
```

Now let's setup the register function in the global context so that we can keep track of the user.'

In `appContext.js`

```js
  const registerUser = async (currentUser) => {
    console.log(currentUser);
  };
```

and also export it

```js
  return (
    <AppContext.Provider value = {{...state, 
    displayAlert, registerUser }}>
      {children}
    </AppContext.Provider>
  )
```

Now destructure that method from the global context in `Register.js`:

```js
  const {isLoading, showAlert, displayAlert, registerUser} = useAppContext();
```

Now in the `onSubmit` handler, once we are done check if any of the values are empty, then we setup the user. Check first if user is already a member (log-in function), else pass in `currentUser` object that contains those values.

```js
  const onSubmit = (e) => {
    e.preventDefault(); 
    const { name, email, password, isMember } = values;

    if( !email || !password || (!isMember && !name)){
      displayAlert();
      return; 
    }

    const currentUser = { name, email, password };

    if(isMember){
      // log in function here
      console.log('Already a Member');
    } else {
      registerUser(currentUser);
    }
    console.log(values);
  }
```

Next, set the `disabled` attribute of submit button to `isLoading`. We do not want to allow the user to click submit again during an asynchronous request.

```js
  <button type="submit" className="btn btn-block" disabled={isLoading}>submit</button>
```

We will toggle the `isLoading` later in the reducer.

## Making the User on the Register Page

```sh
npm run start
```

- localhost:3000/register
- Click Register button
- Fill out the form

Now in the console we can see all the values submitted.

Now also test the `isLoading` disabled functionality. 

Chrome dev tools > Components > AppProvider > hooks > toggle isLoading

Now try clicking the Submit button. It changes the cursor to disabled. 

This prevents the user from submitting values making too many requests as we `fetch`. During the register or log-in request, user should not be able to click the Submit button.

## Making our fetch requests. Using `Axios`.

We can use `fetch` to make HTTP requests, but we will be using another library called `Axios`. It has become a standard as it speeds up development. 

[Axios docs](https://axios-http.com/docs/intro). 

First navigate to `client` directory.

```sh
cd client
```

Let's install Axios. 

```sh
npm install axios
```

## Implementing `registerUser` within Global Context

In `appContext.js`

- import Axios in `appContext.js`
- dispatch action `register_user_begin`, first thing within `registerUser`
- which will set `isLoading` hook to true (indicates that we are performing HTTP request)
- Need `async` & `await` since an `axios.post(url,[data])` returns a promise

Should also save `jobLocation` to the `initalState` in global context.

So let's take it step-by-step,

```js
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
  };
```

Handle this in the `reducer` (i.e., add the conditional statement within reducer)

```js
else if(action.type === REGISTER_USER_BEGIN) {
    return {
      ...state,
      isLoading: true
    };
  }
```

Return the current state and set `isLoading` to `true` which indicates that we start up the HTTP request.

Back to `appContext.js` we import `axios` then send our request. We have to wrap this in a `try..catch` block. We invoke an asynchronous function from axios we call `post()`, with the URL being `/api/v1/auth/register`. Here is the [Axios API](https://axios-http.com/docs/api_intro).

`axios.post(url[, data[, config]])`, first argument is the URL and 2nd argument is the object we are sending. In this case, we are sending the `currentUser`. 

```js
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try{
      const response = await axios.post('/api/v1/auth/register', currentUser);
      console.log(response);
      const { user, token, location } = response.data;
    } catch(error){

    }
```

If there is an error in the response, it would go into the `catch` block. If all things work, then we can destructure out the `user`, `token` & `location`. 

Then we can dispatch the action `REGISTER_USER_SUCESS`. Let's also pass in the payload object within the dispatch.

```js
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try{
      const response = await axios.post('/api/v1/auth/register', currentUser);
      console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });
    } catch(error){

    }
```

Now let's go into the reducer and handle `REGISTER_USER_SUCCESS`

```js
else if(action.type === REGISTER_USER_SUCCESS){
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Created! Redirecting ...'
    };
  }
```

Notice how we take the values we passed in from the `payload` object `user`, `token` and `location`. Also went with `showAlert` along with a type `success` to indicate User was created.

### Decision: Store User data, token, etc. in localStorage

## Error handling in registerUser

```js
catch(error){
      console.log(error.response);
      dispatch( {
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
clearAlert();
```

Also when both actions the `showAlert` is true, so we should hide it afterwards

Now to handle the `REGISTER_USER_ERROR` actiton in the reducer

```js
else if(action.type === REGISTER_USER_ERROR){
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
```

Should return the current `state`, `isLoading` will be false, and `showAlert` is still `true` but the type is `danger` and the msg is sitting inside the `action.payload.msg`.

## Submit the Register

Go to register page, submit a sample user. Open the developer tools in the console and we should see the data. Within the data, data is located in the `data` property with token, user, lastName, etc. 

Head over to the components tab > AppProvider > hooks

We can see the user, name, lastName, location, token. All these values we set-up in our state.

If there is an error, we will see an error response with status 400 in the console. We can see more in the `data` property. 

# Transferring the User from Register page to Dashboard

In the `Register` page, lets use `useEffect` and `useNavigate` hooks

[React Router's useNavigate](https://reactrouter.com/en/main/hooks/use-navigate) docs.

- import `useEffect` from `react`
- import `useNavigate` from `react-router-dom`
- Extract user from state using global context
- Invoke `useNavigate` hook which will return a `navigate` which is a function that lets you navigate programmatically
- Use the `navigate` within `useEffect`, also delay it so user can see the success alert

```js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
const {user, ...more variables} = useAppContext();

export default function Register() {
  useEffect( () => {
    if(user) {
      setTimeout( () => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);
}
```

- The `useEffect` hook is in this form:

```js
  useEffect(() => {

  }, [user, navigate]);
```

It has the callback function as the first argument, and the dependency array which we will pass the `user` and `navigate`. This means that it will be **invoked on *initial render* and when *user* or *navigate* changes**. 

Now check if the `user` exists, then we navigate to the `dashboard` which is the `/` route.

```js
  useEffect(() => {
    if(user){
      navigate('/');
    }
  }, [user, navigate]);
```

Optionally, we can add the delay here so that user can see the success alert. 

```js
  useEffect(() => {
    if(user){
      setTimeout(() => {
        navigate('/');
      }, 3000);
    }
  }, [user, navigate]);
```

Run the app and server and once the user registers successfully (or logs-in) they will navigate away from the register page and into the dashboard (the main home page).

# Problem: In Register, if user refreshes the page the values for user do not persist

In the dashboard, we need to check for user so if user does not exist, they will be logged out. 

Lets register a new user. Once we are redirected to the Dashboard page, check Developer Tools and under Components > hooks > user

We can see the users information. 

Let us hit F5 or refresh the page. Check the hook again and can see that `user: null`.

## Solution: Let's persist the data in localStorage. Add it to the Global Context.

In `appContext.js`

```js
const addUserToLocalStorage = ({ user, token, location }) => {
  localStorage.setItem('user', JSON.stringify(user));
  localStorage.setItem('token', token);
  localStorage.setItem('location', location);
}

const removeUserFromLocalStorage = ({ user, token, location }) => {
  localStorage.removeItem('user');
  localStorage.removeItem('token');
  localStorage.removeItem('location');
}
```

Now right inside `registerUser` lets invoke these functions.

```js
  const registerUser = async (currentUser) => {
    try{
      addUserToLocalStorage({ user, token, location });
    } catch(error) {

    }
  }
```

Now when application loads, let's extract these values from localStorage. Let's do this right above `initialState` as it should happen before it. Because in `initalState` we will set the default values to to what is in `localStorage`. 

NOW when we sign up a new user we can see the data persist in Components > hook > user on refresh and it persists on localStorage as we can see in Application > Storage > Local Storage > http://localhost:3000/.

# Login User in the Backend server

Let's install [morgan](https://www.npmjs.com/package/morgan) a HTTP request logger middleware.

```sh
npm i morgan
```

This is a package useful for development, so only make the app use it if the environment is still in development (i.e., not in `production`). 

We can pass a predefined format string, format string of predefined tokens, or custom format function to `morgan`. We will be using predefined format string `'dev'` which gives colored output based on response status for development use. 

```js
import morgan from 'morgan';

if(process.env.NODE_ENV !== 'production'){
  app.use(morgan('dev'));
}
```

Now in the console we can see the: 

- HTTP method
- path
- response & response time

## Create the Log-In function in the Authentication Controller

```js
const login = (req, res) => {
  res.send('login user');
}
```

So what do we want to do during the log-in? 

1. Check inputs
  - missing inputs lead to a `BadRequestError`
2. Match email to password
  - If user does not exist, Authentication Error
  - If password does not match, Authentication Error

So what we should create this Authentication Error, a 401 Unauthorized Status Code.

## Creating the Authentication Error

- `unauthenticated.js` in errors
- import statuscodes, and custom-api error
- export the newly created error

```js
import { StatusCodes } from "http-status-codes";
import CustomAPIError from "./custom-api";

class UnAuthenticatedError extends CustomAPIError {
  constructor(messsage){
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

export default UnAuthenticatedError
```

Now update the index.js file within `errors`. We do not need to import/export `custom-api` as that will not be exposed elsewhere other than errors

```js
import BadRequestError from "./bad-request.js";
import NotFoundError from "./not-found.js";
import UnAuthenticatedError from "./unauthenticated.js";

export {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
}
```

## Comparing passwords

Part of the Authentication process is to confirm that passwords match. Let's create a [mongoose instance method](https://mongoosejs.com/docs/guide.html#methods) that will compare the passwords passed in to the hashed password that the user has in the database. 

Since we are interacting with the databse, we head over to `User.js` in `models` and define custom document instance method `comparePassword` which uses [bcryptjs](https://www.npmjs.com/package/bcryptjs)'s `compare` method in [bcryptjs - Usage - Async](https://www.npmjs.com/package/bcryptjs#usage---async).

```js
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcryptjs.compare(candidatePassword, this.password);
  return isMatch;
}
```

- `candidatePassword` is the value passed in from the request body
- Check it against the password within the database

Here is our log-in function is far:

```js
const login = async (req, res) => {
  const { email, password } = req.body;

  if(!email || !password) {
    throw new BadRequestError("Please provide all values");
  }

  // Get the user in db whose email matches with the one from request
  const user = await User.findOne({ email });

  if(!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  console.log(user);
  
  // Compare password
  const isPasswordCorrect = await user.comparePassword(password);

  if(!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

}
```

Now let's try out a `POST` request in Postman. Go to login request under Auth
- Body Tab
- raw
- Select JSON from dropdown menu

Let's login our user:

```json
{
  "email":"MiyukiShiba@gmail.com",
  "password": "Tatsuya"
}
```

We now get our response form send request -> login user

### Adding an extra requirement: adding `select: false` property to password

In Mongoose, `select: false` is used to exclude a field from the query results by default. It means that the field will not be returned by default in the data when you fetch the document. You can specify if this path should be included or excluded from query results by default. 

In User Model let's add one extra property `select: false` to password:

```js
const UserSchema = new Schema({

  password: {
    type: String,
    required: [true, 'Please provide password'],
    minlength: 3,
    select: false,
  },

});
```

Now in Postman we send a login request with the same credentials, this is the response:

```json
{
    "msg": "Illegal arguments: string, undefined"
}
```

What's going on? In `login` function we logged the `user` we got from the database, so in the nodejs express server the console outpuuted this:

```js
[0] {
[0]   _id: new ObjectId("6418d6ab92ff594a02b6f24a"),
[0]   name: 'Miyuki',
[0]   email: 'MiyukiShiba@gmail.com',
[0]   lastName: 'lastName',
[0]   location: 'my location',
[0]   __v: 0
[0] }
```
Along with the error:

```sh
Error: Illegal arguments: string, undefined
```

This error is coming from the `bcrypt` library, if we trace the stack. The reason is that the `user` object we logged does not have a property of password. 

Let's go to User model, and check the method `comparePassword` again:

```js
UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcryptjs.compare(candidatePassword, this.password);
  return isMatch;
}
```

Because we added `select: false` property to the UserSchema, the `this.password` is undefined. Its looking for password, in the document, which isn't there. 

Recall: when setting up the register function and `User.create` along with `user.createToken` 

```js
  // Instead of req.body, pass in the input fields
  const user = await User.create({ name, email, password });
  
  const token = user.createToken();

  res.status(StatusCodes.CREATED).json({user:{
    email: user.email,
    lastName: user.lastName,
    location: user.location,
    name: user.name
  }, token});
```

The response shows how we were circumventing a way to not send the password to the front-end. We just hard-coded the values to send back. The alternative is set up a `utils` folder and create function(s) that gets the values we are looking for.

Originally the response was like this:

```js
res.status(StatusCodes.CREATED).json({user, token, location: user.location });
```

### Solution: accessing the property set to `select: false` in a Schema method

Now that we have the password field excluded from the query results, how do we access it for comparison in `comparePassword`?

In `User.create()` we will still get the password, and try to circumvent the response in a way so that password will be omitted. But in the login function we have

```js
const user = await User.findOne({ email });
```

and here we actually need the password. 

The fix? Use `select()` in query. 

Here is a similar situation in this [Stack Overflow Response](https://stackoverflow.com/questions/28838640/mongoose-how-can-i-access-a-selectfalse-property-in-a-schema-method).

```js
const user = await User.findOne({ email }).select('+password');
```

Now send the login request to Postman and we now should see the response 200 OK "login user".

Also check the express server logging the `user` object with all the values (along with the password).

**Takeaway** `select: false` excludes that property from our response in document. But adding it we need go with `select(propertyName)`

### Finally, create JWT for the user during the login session

1. Create the JWT for the user at login
2. Make the response, send the status

```js
const token = user.createToken();

res.status( StatusCodes.OK ).json({ user, token, location: user.location });
```

In Postman, send that login request:

```json
{
  "email":"MiyukiShiba@gmail.com",
  "password": "Tatsuya"
}
```

Response:

```json
{
    "user": {
        "_id": "6418d6ab92ff594a02b6f24a",
        "name": "Miyuki",
        "email": "MiyukiShiba@gmail.com",
        "password": "$2a$10$LK1joDA538wvqdcawIRkQe8WVlOmmeBzmvKh3qlDjRL2VpBpFku9C",
        "lastName": "lastName",
        "location": "my location",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE4ZDZhYjkyZmY1OTRhMDJiNmYyNGEiLCJpYXQiOjE2NzkzNTMzNjYsImV4cCI6MTY3OTQzOTc2Nn0.fhJ0sa1kEpjNhysZeFwBM-NWAzJRhoWUrQPxR0xaFnQ",
    "location": "my location"
}
```

Here is the issue: we are sending *sensitive* data back to the front-end (i.e., `password`).

Now how can we **remove the *password* from the response**? We can either hardcode it like in the register function. Or we can set the `password` property to `undefined`. 


```js
const token = user.createToken();
user.password = undefined;
res.status( StatusCodes.OK ).json({ user, token, location: user.location });
```

Let's send that Login request from Postman again. Here is the response:

```json
{
    "user": {
        "_id": "6418d6ab92ff594a02b6f24a",
        "name": "Miyuki",
        "email": "MiyukiShiba@gmail.com",
        "lastName": "lastName",
        "location": "my location",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE4ZDZhYjkyZmY1OTRhMDJiNmYyNGEiLCJpYXQiOjE2NzkzNTM0NTgsImV4cCI6MTY3OTQzOTg1OH0.6qlfmsVbem-BWCTmDxBaPjSnfcjaPstSPQsKeNT1Zas",
    "location": "my location"
}
```

We get back the `use` object as our response, and the `password` is no longer there! Unlike register however, we have more information we are sending to the front-end. That's not a problem since in the front-end we look for *specific* properties anyways.

## Recap: Login controller

1. Checks for empty values
2. Check if user exist in database
3. Check password
4. Create JWT (JSON Web Token) for user login session
5. Remove password from response
6. Send the response, containing `user`, `token`, `location`

# Login - Front-End

Quite similar to the Register User

Create the actions that we will dispatch
- LOGIN_USER_BEGIN
- LOGIN_USER_SUCESS
- LOGIN_USER_ERROR

```js
export const LOGIN_USER_BEGIN = 'LOGIN_USER_BEGIN';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';
```

Import it to reducer and appContext.

Create the `loginUser` function in `appContext`. Pass it down to value. 

```js
import { 
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from "./actions";

export default function AppProvider(props) {
  //...
  const loginUser = async (currentUser) => {
    console.log(currentUser);
  };

  return (
    <AppContext.Provider value = {{...state, 
    displayAlert, registerUser, loginUser }}>
      {children}
    </AppContext.Provider>
  )
}
```

In register page, we add it to the `onSubmit` when user `isMember` is true:

```js
  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;

    if( !email || !password || (!isMember && !name)){
      displayAlert();
      return; 
    }

    const currentUser = { name, email, password };

    if(isMember){
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };
```

Now we fill out the `loginUser` function in the `appContext.js`. It is nearly the same as the `registerUser` function, with the only difference being the action dispatch and the URL.

```js
  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try{
      const { data } = await axios.post('/api/v1/auth/login', currentUser);
      const { user, token, location } = data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });
      
      addUserToLocalStorage({ user, token, location });
    } catch(error){
      dispatch( {
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert();
  };
```

The action dispatches are also the same as register, only difference is the `alertText` for `LOGIN_USER_SUCCESS`. Just turn it into: `alertText: 'Login Successful! Redirecting...'`.

In React, a reducer is a function that takes in the current state and an action, and returns a new state. The dispatch function is used to send an action to the reducer. The action is an object that describes what happened, and the reducer uses this information to update the state. The dispatch function is used to send an action to the reducer. The action is an object that describes what happened, and the reducer uses this information to update the state.

Now we should see `Invalid Credentials` when we run the app and Log-In with an existing email but with the wrong password. The error message should limit the amount of information to give for security purposes, that is why `Invalid Credentials` is vague and does not let the user (or potential crook) whether it was an invalid email or password.

# Refactoring the login and register

It is possible to refactor and lower code duplication since login and register seem so similar. This is an optional step.

Let's start with the actions: 

We can remove REGISTER and LOGIN, replace them with just 3 actions named SETUP.

```js
export const DISPLAY_ALERT = 'SHOW_ALERT';
export const CLEAR_ALERT = 'CLEAR_ALERT';

export const REGISTER_USER_BEGIN = 'REGISTER_USER_BEGIN';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';

export const LOGIN_USER_BEGIN = 'LOGIN_USER_BEGIN';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_ERROR = 'LOGIN_USER_ERROR';

export const SETUP_USER_BEGIN = 'LOGIN_USER_BEGIN';
export const SETUP_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const SETUP_USER_ERROR = 'LOGIN_USER_ERROR';
```

Change the imports in global context to just SETUP instead of LOGIN and REGISTER.

In `appContext.js`, we have the two functions that are similar. The only two differences are the:

- POST URL endpoint
- dispatch action type

```js
  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });
    try{
      const response = await axios.post('/api/v1/auth/register', currentUser);
      const { user, token, location } = response.data;

      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });

      addUserToLocalStorage({ user, token, location });
    } catch(error){
      dispatch( {
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });
    try{
      const { data } = await axios.post('/api/v1/auth/login', currentUser);
      const { user, token, location } = data;

      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });
      
      addUserToLocalStorage({ user, token, location });
    } catch(error){
      dispatch( {
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert();
  };
```

We can reduce this to just one function `setupUser`. Instead of passing in just one parameter: `currentUser`, we can pass in an object containing the values that are different: the endpoint and dispatch action type.

Actually, we can reduce dispatch action type even further since the only thing different is the `alertText`. SO pass in 3 values: `currentUser`, endpoint, and `alertText`.

```js
  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN });
    try{
      const { data } = await axios.post('/api/v1/auth/${endpoint}', currentUser);
      const { user, token, location } = data;

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, location, alertText},
      });
      
      addUserToLocalStorage({ user, token, location });
    } catch(error){
      dispatch( {
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert();
  };
```

In the `dispatch` where we send the `payload`, also pass in the `alertText`.

Don't forget to pass in `setupUser` function as a [prop](https://react.dev/learn/passing-props-to-a-component) to `AppProvider`.

Now in reducer, let's use the action we receieved from the dispatch and use the information to update the state. The only thing that's different is the `alertText`, which we passed in as the part of the `payload`. Therefore it would be location in `action.payload.alertText`.

```js
const reducer = (state, action) => {
  // ... clearAlert, displayAlert
  if(action.type === SETUP_USER_BEGIN) {
    return { ...state, isLoading: true };
  } else if(action.type === SETUP_USER_SUCCESS){
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText,
    };
  } else if(action.type === SETUP_USER_ERROR){
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  throw new Error(`No such action: ${action.type}`);
}
```

Now to wrap it all up, let's change how login and register functions are used in the `Register.js` page.

- Import `setupUser` from the `useAppContext()`
- Where we invoke it:

```js
    if(isMember){
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
```

We replace them, by passing in the object:

```js
  if(isMember){
    setupUser({ currentUser, endPoint: 'login', alertText: 'Login Successful! Redirecting...'});
  } else {
    setupUser({ currentUser, endPoint: 'register', alertText: 'User Created! Redirecting...'});
  }
```

Now we refactored the login/register and reduced code duplication. This is a good approach. But for now, since the application isn't fully complete, I won't refactor it. I'll keep this here as a reference for later. One can certainly refactor now, the downside is that perhaps maybe a new featuire requires that login and register have different behaviors and must be separate.

Refactoring only works if the functionalities are similar. Once more features are added: (e.g., email verification) its easier to have two setups in place.

# Nested Pages

Our dashboard is the main route. We will have nested pages within our dashboard, which all have the same layout. 

- Stats
- All Jobs
- Add Job
- Profile

Right now we have a `Dashboard.js` or Dashboard component. Then it is rendered in `App.js`. Let's delete `Dashboard.js`, fix imports/exports, replace it with a simple div in home route:

```js
<Route path="/" element={<div>Dashboard</div>}/>
```

Then we create a `Dashboard` directory in `pages`
- Create an index.js
- Create AddJob, AllJobs, Profile, Stats
- Also create SharedLayout
- Basic returns

```js
return <h1>Add Job Page</h1>
```

- Export all with `index.js`
- import all pages in `App.js`

So what is `SharedLayout`? This will have the `navbar` and provide the pages the structure. The layout (top portion and sidebar) stays the same among the nested pages. The only changes are the content within the pages.

## Nested Pages in React Router 6

This is how Nested Pages are structured:

```js
<Route path='/'>
  <Route path="stats" element={<Stats />}/>
  <Route path="all-jobs" element={<AllJobs />}/>
  <Route path="add-job" element={<AddJob />}/>
  <Route path="profile" element={<Profile />}/>
</Route>
```

- A parent route "/"
- Routes placed inside

All inner routes are relative to the parent. e.g., the URL for `Stats` component would be `/stats`. If the parent route was `/dashboard` instead, then the URL for `Stats` component would be `/dashboard/stats`. 

Also going to setup index page. 

## Configuring our Routes

So now let's work on our Routes. Right now our App component has this:

```js
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>}/>
        <Route path="/register" element={<Register />}/>     
        <Route path="/landing" element={<Landing />}/>     
        <Route path="*" element={<Error />}/>     
      </Routes>
    </BrowserRouter>
  );
}
```

What we can do is remove the home route's element, and give it a closing tag. Within it we have our nested pages. Notice how we do not need forward slash in front of the nested pages, because they are relative to the parent by default.

```js
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="stats" element={<Stats/>}/>
          <Route path="all-jobs" element={<AllJobs/>}/>
          <Route path="add-job" element={<AddJob/>}/>
          <Route path="profile" element={<Profile/>}/>
        </Route>

        <Route path="/register" element={<Register />}/>     
        <Route path="/landing" element={<Landing />}/>     
        <Route path="*" element={<Error />}/>     
      </Routes>
    </BrowserRouter>
  );
}
```

Now run the app. 

```sh
npm run start
```

Open up the browser and open up the following links:

- http://localhost:3000/stats
- http://localhost:3000/all-jobs
- http://localhost:3000/add-job
- http://localhost:3000/profile

WE can now hop from page to page in a nested layout.

Remember that in nested pages, the path is relative to the parent. So if we change the `<Route path="/">` to `<Route path="/dashboard">`

Now the paths are going to be /dashboard/....

-http://localhost:3000/dashboard/stats

**Takeaway**: to setup a nested structure in react router, you need a parent route and its URLs, and routes nested inside it will be relative to the parent route. Set up the path and URL, and pass the element inside of it.

## Creating the SharedLayout

Pass in `SharedLayout` component as the element to the home route.

```js
  <Route path="/" element={<SharedLayout/>}>
```

Then navigate to `SharedLayout.js` and implement it.

```js
import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Wrapper from '../../assets/wrappers/SharedLayout';

export default function SharedLayout() {
  return (
    <Wrapper>
      <nav>
        <Link to='add-job'>add job</Link>
        <Link to='all-jobs'>all job</Link>
      </nav>
      <Outlet />
    </Wrapper>
  )
}
```

First we wrap the SharedLayout in a Wrapper with styled components. The layout will also have a navigation bar with links to the other pages. This is where we use [React Router Link](https://reactrouter.com/en/main/components/link). After the `nav` we have the [React Router Outlet](https://reactrouter.com/en/main/components/outlet).

An `<Outlet>` should be used in parent route elements to render their child route elements. This allows nested UI to show up when child routes are rendered. If the parent route matched exactly, it will render a child index route or nothing if there is no index route.

Now with this, we can check the browser for one of the pages with the SharedLayout: http://localhost:3000/profile

We can see the links right above, which will navigate us to the other pages.

## Issue: the home route "/" -> http://localhost:3000/

The home route no longer displays a page, just the navbar. 

- We will set `stats` as the first page to display on the home route. 

To display the page in the home route, we have two options. 

1. In the `Register.js`, when it navigates to the home route "/" instead it could navigate straight to one of the nested pages like /stats.

- The issue with this is that a user may explicitly go to the home page, it will still just display the nav bar.

2. Instead of `path` prop for stats Route, go with `index` prop:

```js
<Routes>
  <Route path="/" element={<SharedLayout/>}>
    <Route index element={<Stats/>}/>
    <Route path="all-jobs" element={<AllJobs/>}/>
    <Route path="add-job" element={<AddJob/>}/>
    <Route path="profile" element={<Profile/>}/>
  </Route>
</Routes>
```

Now navigating to the actual home page, it will be the `stats` page. 

Go to: http://localhost:3000/

Note: if parent path was not "/" but rather "/dashboard" then index is still relative and will reference dashboard instead of home page.

# Make Dashboard a Protected Route

A Protected Route. When the user logs out, it brings them to the landing page. So when a user tries to access the Dashboard without signing in, they will be redirected to the landing page. We programatically navigate them out if there is no user in our state.

- Create ProtectedRoute.js in `pages` folder
- Then wrap `SharedLayout` with `ProtectedRoute` component in `App.js`

## Creating ProtectedRoute component

It will use `Navigate` from react-router-dom. Since we want access to the `user`, we also want access to the global context (i.e., if there is no `user` in our state).

Within the component we destructure the `user` from the `appContext`. If user does not exist, then navigate to Landing page. Otherwise, return the `children`. The `children` is the `<SharedLayout />` component we will wrap with `ProtectedRoute` in `App.js`.

```js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../context/appContext';

export default function ProtectedRoute({ children }) {
  const { user } = useAppContext();
  if(!user){
    return <Navigate to='/landing' />
  }
  return (
    children
  );
}
```

Next we got to fix our imports/exports in `index.js` of `pages`.

Now import `ProtectedRoute` in `App.js`, and wrap `SharedLayout` with `ProtectedRoute`:

```js
<Route
  path="/"
  element={
    <ProtectedRoute>
      <SharedLayout/>
    </ProtectedRoute>
  }
>
```

Now run the app, clear localStorage of any user, try to access home route and it should redirected to landing page. Try accessing any of the nested pages as well and it will also redirect user to landing page.

# Design Layout

The components we will have for the SharedLayout is:

- Navbar
- Large Sidebar
- Small Sidebar

Responsive design.

- 2 column layout:
- 1st column is Large sidebar/navbar 
- 2nd column is the page
- Small sidebar is for mobile/small screens, a one column layout

Lets create those in `components` folder. Import the wrappers, fix the `index.js` for `components`.

`SharedLayout` will be using those components in this order: SmallSidebar, LargeSidebar, Navbar, Outlet

Right now: 

```js
export default function SharedLayout() {
  return (
    <Wrapper>
      <nav>
        <Link to='add-job'>add job</Link>
        <Link to='all-jobs'>all job</Link>
      </nav>
      <Outlet />
    </Wrapper>
  )
}
```

We set it to:

```js
export default function SharedLayout() {
  return (
    <Wrapper>
      <main className="dashboard">
        <SmallSidebar />
        <LargeSidebar />
        <div>
          
        </div>
      </main>
      <Outlet />
    </Wrapper>
  )
}
```

Notice that in the `Wrapper` css for SmallSidebar and LargeSidebar, the LargeSidebar has `display: none` at anything below 992px. Once the width becomes `992px`, the SmallSidebar is hidden and LargeSidebar takes over.

We have the components and a `div` which will be the 2nd column. We have css that controls which sidebar will be displayed.

The only thing that changes is the `dashboard page` displaying one of the nested pages. So an inner `div` with that classname, will also contain the Outlet.

```js
<Wrapper>
  <main className="dashboard">
    <SmallSidebar />
    <LargeSidebar />
    <div>
      <Navbar />
      <div className="dashboard-page">

        <Outlet />
      </div>
    </div>
  </main>
</Wrapper>
```

## Using `react-icons`

[React icons](https://react-icons.github.io/react-icons/) is a library which gives us access to icons. To get icon, we need name and library where its from. WE can also click the icon we want and copy to clipboard.

Here is how to use it:

```js
import { IconName } from "react-icons/fa";

export default function SharedLayout() {
  return (
    <IconName />
  );
}
```

We will be using icons for the rest of the project and for components.

```sh
cd client

npm i react-icons
```

# Navbar component

Navbar will have a 3 column layout. 

1. 1st Column has a button that toggles the large sidebar
2. 2nd Column contains the Logo and Dashboard text. On small screens it will have the logo in the middle, on larger screens it will have Dashboard text.
3. 3rd Column contains two buttons, one for a dropdown the other for logout

```js
import React from 'react';
import Wrapper from '../assets/wrappers/Navbar.js';
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa';
import { useAppContext } from '../context/appContext.js';
import Logo from './Logo';

export default function Navbar() {
  return (
    <Wrapper>
      <div className="nav-center">
        <button className="toggle-btn" onClick={() => console.log('toggle sidebar')}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button type="button" className="btn" onClick={() => console.log('toggle dropdown')}>
            <FaUserCircle />
            User's Name
            <FaCaretDown />
          </button>
          <div className="dropdown show-dropdown">
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => console.log('log out user')}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
```

As we can see the Navbar has 3 interactive pieces (the buttons) that will need some functionality.

## Toggle Sidebar 

Let's use state to toggle sidebar. We are going to have an action to dispatch to toggle it, we will also add a property to the `initalState`. Then we create a function to dispatch that action. 

In appContext:
```js

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };
```

In reducer:

```js
  if(action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar,
    };
  }
```

We extract the function `toggleSidebar` in `Navbar.js`:

```js
export default function Navbar() {
  const { toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div className="nav-center">
        <button
          className="toggle-btn"
          onClick={ toggleSidebar }>
          <FaAlignLeft />
        </button>
  {/* ... */}
```

Run the app, check the developer tools > Components > AppProvider > hooks > `showSidebar`

Every time we click it should toggle the hook.

## Toggle Dropdown

Toggling the dropdown will be declared as a [state variable](https://react.dev/learn/state-a-components-memory) using [useState hook](https://react.dev/reference/react/useState#usestate). 

In Navbar we do 3 things: import `useState` and create `showLogout` and `setShowLogout`. Pass the `setShowLogout` to first button in `btn-container` Then conditionally render the 3rd button if the based on `showLogout`.

```js
import { useState } from 'react';

export default function Navbar() {
  const { toggleSidebar } = useAppContext();
  const [showLogout, setShowLogout] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          className="toggle-btn"
          onClick={ toggleSidebar }>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className="logo-text">Dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            type="button"
            className="btn"
            onClick={() => setShowLogout(!showLogout)}
          >
            <FaUserCircle />
            User's Name
            <FaCaretDown />
          </button>
          <div className={showLogout ? "dropdown show-dropdown" : "dropdown"}>
            <button
              type="button"
              className="dropdown-btn"
              onClick={() => console.log('log out user')}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}
```

## Toggle Logout

Clicking the Logout button should:

1. Set the values in the state to null, empty, 0 etc.
2. Moment values are set to null, user will be redirected to the landing page

Create action, import/export, dispatch action. Within the `logoutUser` function that dispatchs the action, it also calls `removesUserFromLocalStorage`.

In `reducer.js` we will be importing `initialState` (exported from `appContext`). To logout the user, unlike all the other actions so far, we do NOT want to return `...state` but rather `...initialState`. In other words, we do not want to return all the current values and just update a few of them. Instead return an empty object and grab the `initialState` (which is the default state). Why do this? It's more maintainable in that if we ever add new properties to `initialState` then we don't have to explicitly set it to null  in the reducer instead we can just return the `initalState` object.

For any properties within `initalState` that have a condition (e.g., `user`) or properties that use `localStorage` (e.g., `token`) we have to explicitly override and set those to null.

```js
const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null ,
  token: token,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',
  showSidebar: false,
}

export { AppProvider, initialState, useAppContext }
```

Just because we remove them from localStorage, it does not automatically update the state.

```js
import { intialState } from './appContext';

if(action.type === LOGOUT_USER){
  return {
    ...initialState,
    user: null,
    token: null,
    userLocation: '',
    jobLocation: '',
  }
}
```

Import logoutUser in actions, create the function, then pass it in the prop value of AppContext.Provider.

```js
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };
```

Now that the functionality is out of the way, implement it in the Navbar

```js
export default function Navbar() {
  const { toggleSidebar, logoutUser, user } = useAppContext();

    <FaUserCircle />
    { user?.name }
    <FaCaretDown />

    <button
      type="button"
      className="dropdown-btn"
      onClick={ logoutUser }
    >
      logout
    </button>
```

1. Destructure `logoutUser` from appContext
2. [Optional chaining](https://javascript.info/optional-chaining) and rendering of `user.name`
3. Change the function `onClick` for button

Now the moment we log out, it redirects to the landing page.

Check Developer Tools > AppPRovider > Hooks and all the hooks and state should be at the default values.

# Small Sidebar component

Going to have links as an a array of objects. We are going to iterate over this array and create a [NavLink](https://reactrouter.com/en/main/components/nav-link) from `react-router-dom`. 

Create a `utils` folder and create `links.js`.

```js
import { IoBarChartSharp } from 'react-icons/io5';
import { MdQueryStats } from 'react-icons/md';
import { FaWpforms } from 'react-icons/fa';
import { ImProfile } from 'react-icons/im';

const links = [
  {
    id: 1,
    text: 'stats',
    path: '/',
    icon: <IoBarChartSharp />,
  },
  {
    id: 2,
    text: 'all jobs',
    path: 'all-jobs',
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    text: 'add job',
    path: 'add-job',
    icon: <FaWpforms />,
  },
  {
    id: 4,
    text: 'profile',
    path: 'profile',
    icon: <ImProfile />,
  },
];

export default links;
```

## Sidebar button shows sidebar

- imports: Wrapper, FaTimes icon, appContext, links, NavLink, Logo
- Icon is the close button
- CSS to `show-sidebar` (which will be toggled)
- navlinks

```js
import React from 'react';
import Wrapper from '../assets/wrappers/SmallSidebar.js';
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';
import Logo from './Logo';

export default function SmallSidebar() {
  return (
    <Wrapper>
      <div className="sidebar-container show-sidebar">
        <div className="content">
          <button className="close-btn" onClick={ () => console.log('toggle') }>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <div className="nav-links">nav links</div>
        </div>
      </div>
    </Wrapper>
  );
};
```

### Sidebar functionality

The [useState](https://react.dev/learn/state-a-components-memory) hook provides two things:

1. A **state variable** to retain the data between renders.
2. A **state setter function** to update the variable and trigger React to render the component again.

We will also change the div that has `sidebar-container` to conditionally render, if `showSidebar` is true then `show-container show-sidebar` css class will be set, if false then `sidebar-container`.

- from global context get the state variable for `showSidebar` & `toggleSidebar`
- Conditionally render with `showSidebar`
- Pass `toggleSidebar` function into `close-btn` button

```js
const { showSidebar, toggleSidebar } = useAppContext();

      <div className={
        showSidebar ? "sidebar-container show-sidebar" : "sidebar-container"
      }> </div>

          <button className="close-btn" onClick={ toggleSidebar }>

```

# Navlinks component

- In `components` create `Navlinks.js`

For now in `SmallSidebar.js` we have a `div` containg the `nav-links`. We want to create the logic for the `NavLink` here.

```js
<div className='nav-links'>
      {links.map((link) => {
        const { text, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            key={id}
            onClick={ toggleSidebar }
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            end
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        );
      })}
    </div>
```

For every link we have in `links.js` in `utils` folder, we destructure them for the necessary data to create a `NavLink`. 

Notice the `onClick` has `toggleSidebar`. On a LargeSidebar don't use `onClick` but on `smallSidebar` do want to toggle the state. **To close a sidebar everytime a user clicks on a link.** 

We will pass `toggleSidebar` in as a `prop`, to be passed from the parent container (i.e., `SmallSidebar`)

Finally, the className will conditionally add an `active` class whenever `isActive`. Since we are using `styled-components` the styles won't be colliding, especially when we render this component within another component.

```js
export default function SmallSidebar() {
  const { showSidebar, toggleSidebar } = useAppContext();

  return (
    <Wrapper>
      <div className={
        showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
      }>
        <div className="content">
          <button className="close-btn" onClick={ toggleSidebar }>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          // Pass function in as a prop
          <NavLinks toggleSidebar={ toggleSidebar }/>
        </div>
      </div>
    </Wrapper>
  );
};
```

Now on smaller screens that show small sidebar, we can see it in action.

Also notice how `links.js` is the data and separate from the rendering. `NavLinks` component will also be set-up in multiple places.

# Large Sidebar Component

Large Sidebar will use `showSidebar` from app context to conditionally render the CSS class `show-sidebar`. By default `showSidebar` state is false in `initialState`, so the logic is flipped and it would have `show-sidebar` when the state variable is false. We want to have the component show by default.

Optional - toggle sidebar when a Navlink is pressed, just pass in the function as a prop to `NavLinks` like in `SmallSideBar.js`.

```js
import React from 'react';
import Wrapper from '../assets/wrappers/LargeSidebar.js';
import { useAppContext } from '../context/appContext';
import Logo from './Logo';
import NavLinks from './NavLinks.js';

export default function LargeSidebar() {
  const { showSidebar } = useAppContext();

  return (
    <Wrapper>
      <div 
        className={
          showSidebar ? "sidebar-container" : "sidebar-container show-sidebar"
        }
      >
        <div className="content">
          <header>
            <Logo />
          </header>
          <NavLinks />   
        </div>
      </div>
    </Wrapper>
  );
};
```

# Authentication, Security & Restricting Access to only the user

The pages in the `Dashboard` will be sending requests. Within those requests, in the request header we have the `authorization` where we pass in the `token` of the user. We can see this in developer tools (press `[F12]` in Chrome) and in the Network tab, under Headers. 

We need to setup the functions on the server to restrict access to certain resources. If the token is not present, send error response.

Let's create that middleware to check for the token. Back to the server at the root directory of the project, head over to `middleware` folder and create `authenticate.js` then setup the `async` function and export it.


```js
const authenticate = async (req, res, next) => {
  console.log('authenticate user');
  next();
};

export default authenticate
```

Just console.log() for now. Import this method in `authRoutes` and put it in the `/updateUser` route, a private route (whereas login & register are public routes). Let's name it `authenticateUser`.

```js
import authenticateUser from '../middleware/authenticate.js';

router.route('/updateUser').patch(authenticateUser, updateUser);
```

All the routes will be restricted, when it comes to `jobs`. We can do it two ways:

1. `authenticateUser` in `server`, and place it in front of `jobsRouter`
- Each and every request that goes to `/jobs` will have that authentication

```js
import authenticateUser from '../middleware/authenticate.js';
app.use('/api/v1/jobs', authenticateUser, jobsRouter);
```

2. `authenticateUser` in `jobsRoutes` and do it manually for all routes

```js
import authenticateUser from '../middleware/auth.js';

router.route('/stats').get(authenticateUser, showStates);
// ... do the same for all routes
```

Now in Postman, test out the functionality -> should see the `console.log('authenticate user');` when we make a `Patch` request of Update User. Don't need to pass anything in, just send it.

The response in Postman is `updateUser` string. Whereas in the terminal we can see:

```sh
[1] webpack compiled successfully
[0] authenticate user
[0] PATCH /api/v1/auth/updateUser 200 1.953 ms - 10
```

The `authenticate user` string, meaning every request that goes to `Update User` will pass through the `authenticate` middleware. 

Let's repeat the request with say `Get Jobs` in Postman.

```sh
[0] authenticate user
[0] GET /api/v1/jobs 200 0.688 ms - 10
```

Awesome! The inital user authentication setup is working so far.

# Navlink update -> React Router -> using `end` prop

A [StackOverflow Post](https://stackoverflow.com/questions/70644361/react-router-dom-v6-shows-active-for-index-as-well-as-other-subroutes).

```js
  <NavLink
    to={path}
    key={id}
    onClick={ toggleSidebar }
    className={({ isActive }) =>
      isActive ? 'nav-link active' : 'nav-link'
    }
    end
  >
```

Note that the without the `end` prop, this link is always active because every URL matches `/`. See the [React Router Docs on Navlink](https://reactrouter.com/en/main/components/nav-link).

# JSON Web Tokens - JWT

Primer on JWT [jwt.io](https://jwt.io/introduction).

Go to the section with header: "How do JSON Web Tokens work?"


> Whenever the user wants to access a protected route or resource, the user agent should send the JWT, typically in the Authorization header using the Bearer schema. The content of the header should look like the following:

```sh
Authorization: Bearer <token>
```

In Postman, go to Update User > Headers > Add Authorization and Bearer (token) as value.

> This can be, in certain cases, a stateless authorization mechanism. The server's protected routes will check for a valid JWT in the `Authorization` header, and if it's present, the user will be allowed to access protected resources. If the JWT contains the necessary data, the need to query the database for certain operations may be reduced, though this may not always be the case.

In authenticate.js
```js
const authenticate = async (req, res, next) => {
  const headers = req.headers;
  const authHeader = req.headers.authorization;
  console.log(headers);
  console.log(authHeader);
  next();
};
```

Now send the request from Postman -> Update User

Response is Update User, but in the console we see `authorization`, `Bearer` and token.

```sh
[0] {
[0]   authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE4ZDZhYjkyZmY1OTRhMDJiNmYyNGEiLCJpYXQiOjE2Nzk2MjQ1MzQsImV4cCI6MTY3OTcxMDkzNH0.-fDe_VqrLo0QodWB3p6ElHAe_oRWlYeTIHheO4IO2Ec',
[0]   'user-agent': 'PostmanRuntime/7.31.3',
[0]   accept: '*/*',
[0]   'postman-token': '6b6e2d8a-b7a5-4861-9324-64af2b155a02',
[0]   host: 'localhost:4000',
[0]   'accept-encoding': 'gzip, deflate, br',
[0]   connection: 'keep-alive',
[0]   'content-length': '0'
[0] }
[0] Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE4ZDZhYjkyZmY1OTRhMDJiNmYyNGEiLCJpYXQiOjE2Nzk2MjQ1MzQsImV4cCI6MTY3OTcxMDkzNH0.-fDe_VqrLo0QodWB3p6ElHAe_oRWlYeTIHheO4IO2Ec
[0] PATCH /api/v1/auth/updateUser 200 3.335 ms - 10
```

We will grab the Bearer token from our state, and set up an HTTP request that will go to our server. The server will check for authorization header, if its present, token is valid then we can access/modify resources. If not, then throw authentication error.

## Token Setup in Postman

- For Register and Login routes, go to Tests

```js
const jsonData = pm.response.json();
pm.globals.set('token', jsonData.token);
```

We have `jsonData.token` because in the `authController` where we send the response back we have: 

```js
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name
    }, 
    token,
    location: user.location,
  });
```

The `user` object and `token`.

Now back to the Postman, remove the Authorization we added earlier. Update User Request > Params > Uncheck Authorization. We send the request and we have `undefined`.

```sh
{
[0]   'user-agent': 'PostmanRuntime/7.31.3',
[0]   accept: '*/*',
[0]   'postman-token': 'e6d38261-d5de-4056-b0b6-e01fd31468e5',
[0]   host: 'localhost:4000',
[0]   'accept-encoding': 'gzip, deflate, br',
[0]   connection: 'keep-alive',
[0]   'content-length': '0'
[0] }
[0] undefined
[0] PATCH /api/v1/auth/updateUser 200 3.293 ms - 10
```

So how do we set it up programatically?
Go to Postman > Tests. Add the following:

```js
const jsonData = pm.response.json();
```

Then at the right, at Code Snippets > click Set Global Variable.

It gives this:
```js
pm.globals.set("variable_key", "variable_value");
```

Set it to this:
```js
pm.globals.set("token", jsonData.token);
```

Save it now. 

Copy the same code and paste it into the Tests of Auth > Login.

Now send the Login request, now instead of manually putting in the:

```js
Authorization: Bearer <token>
```

In any of the routes, go to Authorization > Dropdown menu from "Inherit auth form p" to Bearer Token > In the name of the variable > `{{token}}`

`{{token}}` should be there right away. After a sending a login request.

Now we can see it in our global variables (the icon right below the close marker).

After a successful register/login then token will be added to Globals. Every time logged in to a new user {{token}} will be set automatically.

Now all routes will be protected as we repeat the same process > Authroizaiton > Bearer Token > Send request.

## Adding Error Handling to Authentication Middleware

In `authenticate.js` middleware, import UnAuthentication error and if there is no header throw it.

```js
import { UnAuthenticatedError } from "../errors/index.js";

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader){
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  next();
};

export default authenticate
```

Try it in Postman > Update User > Send Request

Note: Update User request should not have any Tests script, if you get any errors "JSONerror unexpected token u".

Now try Authorization > NO Auth (Drop Down Menu) > Body 

We see Authentication Invalid, 401 Response.

# Authorization Middleware - properly verifying

- We have to check authorization header

Recall that Authorization header uses the Bearer schema, so content of the header looks like:

```sh
Authorization: Bearer <token>
```

- If authHeader is empty or does not start with "Bearer" then throw error.
- Get the token by splitting authHeader

```js
const token = authHeader.split(' ')[1];
```

Split it by one space, as token is a space after the Bearer. Then an array of two elements, take the second value (which is the token).

After grabbing token we should use the `jwt.verify()` function. When creating token we had used the `proces.env.SECRET_KEY` variable, which will be used again to verify here. This function returns the payload (what we passed in when creating the token).

```js
const payload = jwt.verify(token, process.env.SECRET_KEY);
```
Recall when creating the Token, we pass in the object payload `{ userId: this._id }`

```js
UserSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id },
    process.env.SECRET_KEY,
    { expiresIn: process.env.LIFETIME }
  );
}
```

Before sending the payload to the next middleware, set the `request`'s user property to the payload's `user` object. So now in request, can access the user id. 

If any of these steps failed: expired token, or tampered data then throw an error.

Let's log the payload first:

```js
import jwt from 'jsonwebtoken';
import { UnAuthenticatedError } from "../errors/index.js";

const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer")){
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(' ')[1];
  
  try{
    const payload = jwt.verify(token, process.env.SECRET_KEY);
    console.log(payload);
    next();
  } catch(error){
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};

export default authenticate 
```

Go to Postman > Update User > Authorization > Bearer Token > Send

Update User string is in the response. Check console:

```sh
[0] {
[0]   userId: '6418d6ab92ff594a02b6f24a',
[0]   iat: 1679740438,
[0]   exp: 1679826838
[0] }
```

We have:

-userId
-issued time
-exp: expiration

all the time is in milliseconds. 

`userId` will be used in any of the controllers that rely on that user (e.g., look up all jobs of the user or Update User Info). In the controllers, we look at request object and get `userId` property.

`next()` pass it onto the controller.

## Logging the user in `updateUser`

Go to authController,

```js
const updateUser = (req, res) => {
  console.log(req.user);
  res.send('updateUser');
}
```

Postman > Update User > Send 

In the terminal we see we have access to the user:

```sh
[0] { userId: '6418d6ab92ff594a02b6f24a' }
```

Used later in the controllers. Has a valid token.

## Showcasing an Invalid token

If we go to User model and change the `expiresIn:` value to say `100` (which means 100ms)

```js
UserSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id },
    process.env.SECRET_KEY,
    { expiresIn: 100 }
  );
}
```

Now in Postman > Login User > Send request (to get a new token)
Go to Update User > Send > Get 401 error

Token is already expired so the error handling should work.

# Update User Controller

The `updateUser` will look for 4 properties in the `req.body`:
- email
- name
- lastName
- location

Throw an error if any are missing.

Then get the get the `user` object whose `_id` matches that of the `req.user.userId`.
Then for each property (email ... location), update them.

Use instance method `save()` for document. 

## Question -> Do we need to create another JWT when calling `updateUser`

Check User model, what are we passing in>

```js
UserSchema.methods.createToken = function () {
  return jwt.sign(
    { userId: this._id },
    process.env.SECRET_KEY,
    { expiresIn: process.env.LIFETIME }
  );
}
```

In the payload, just `userId`. We are not changing `id` in the list of prooperties to update. If the properties we are changing are used to create the token, then it is a good idea to issue a new token.

## Implementing `updateUser`  controller

```js
const updateUser = (req, res) => {
  const { email, name, lastName, location} = req.body;

  if(!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  res.send('updateUser');
};
```

Check if any of the properties are empty. Still check even if it is optional, the front-end will check it anyways.

Next is the finding the user that matches the id. Update the properties. Then save the document. Create the token and send the response back wit hthe user, token, location.

```js
const updateUser = async (req, res) => {
  const { email, name, lastName, location} = req.body;

  if(!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({_id: req.user.userId});

  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  const token = user.createToken();

  res.status( StatusCodes.OK ).json({ user, token, location: user.location });
};
```

Let's test it out. Navigate to Postman.

- Login Request, Send to get valid token

```json
{
  "user": {
      "_id": "6418d6ab92ff594a02b6f24a",
      "name": "Miyuki",
      "email": "MiyukiShiba@gmail.com",
      "lastName": "lastName",
      "location": "my location",
      "__v": 0
  },
  "token": "...",
  "location": "my location"
}
```

- Patch Update User Request > Body > Raw > JSON

```json
{
    "name": "Miyuki",
    "email": "MiyukiShiba@gmail.com",
    "lastName": "Shiba",
    "location": "my location"
}
```

Change one property -> `lastName` to `Shiba`.

We got an error:

```json
{
    "msg": "Illegal arguments: undefined, string"
}
```

## Issue: Patch Request to updateUser does not work

According to the error, there are illegal arguments undefined string. We can trace it in the console to `bcrypt.hash`. 

The band-aid solution: comment out the following lines of code in the User model

```js
UserSchema.pre('save', async function(){
  // const salt = await bcryptjs.genSalt(10);
  // this.password = await bcryptjs.hash(this.password, salt);
});
```

The pre save hook is causing the issue, so just comment out the 2 lines and send the Patch request again in Postman.

Now look at the response (token is shortened to ellipsis):

```json
{
    "user": {
        "_id": "6418d6ab92ff594a02b6f24a",
        "name": "Miyuki",
        "email": "MiyukiShiba@gmail.com",
        "lastName": "Shiba",
        "location": "my location",
        "__v": 0
    },
    "token": "...",
    "location": "my location"
}
```

The user is successfully updated, and the response does not have the password (because of `select: false`). So when query `User.findOne()` then password won't be returned.

## Deep dive on the issue when sending the initial request and `updateUser` does not work

Remember that **not every method will trigger the `.pre` hook**

```js
UserSchema.pre('save', async function(){
  // const salt = await bcryptjs.genSalt(10);
  // this.password = await bcryptjs.hash(this.password, salt);
});
```

Another alternative solution is to use `User.findOneAndUpdate()` instead of `user.save()`.

Let's trace the execution. Notice that in `bycryptjs.hash(this.password, salt);` it is looking for

```js
this.password
```

In the User Model, password's `select` property is false. In the `authController` when using `User.findOne()` we don't return the password. Now in `updateUser` function, in the line `awaituser.save()` it will trigger the `UserSchema.pre('save',...)` hook.

In the hook, we pass in the `salt` and `this.password` in `bycrypt.hash()`. Since we have `password`'s `select: false`, then `this.password` will evaluate to `undefined`.

### Can't we solve it just like in login?

In login we had:

```js
  const user = await User.findOne({ email }).select('+password');
```

If we do have the `this.password`, and if it is hashed (hashing the password that's already hashed). Now in the process, the login will also be affected. Now when trying to login with a password it won't match to the hashed value in the database.

So if we simply add the password:

```js
  const user = await User.findOne({_id: req.user.userId}).select('+password');
```

The pre save hook will work, but login functionality won't work because password is hashed a 2nd time.

### Solution: Using **Modified Paths**

```js
UserSchema.pre('save', async function(){
  console.log(this.modifiedPaths());
  console.log(this.isModified('name'));

  // const salt = await bcryptjs.genSalt(10);
  // this.password = await bcryptjs.hash(this.password, salt);
});
```

`this.modifiedPaths()` returns all the paths we are modifying
   - will allow us to check for which paths we are modifying

`this.isModified('name')` will check for a specific one

- if we are not modifying the password (which the updateUser route isn't doing), modifying everything else besides the password then just return.

Two issues are solved:

1. Removes the error when the `this.password` isn't provided
2. If `this.password` exists in the instance, then won't hash it for the second time


 ```js
UserSchema.pre('save', async function(){
  console.log(this.modifiedPaths());
  console.log(this.isModified('name'));
});
```

Send a Postman Update User request without any updates:

```json
{
    "name": "Miyuki",
    "email": "MiyukiShiba@gmail.com",
    "lastName": "Shiba",
    "location": "my location"
}
```

and we get an empty array (because nothing is modified), and false in the console.

```sh
[0] []
[0] false
[0] PATCH /api/v1/auth/updateUser 200 133.933 ms - 355
```

Now say if we modified the name, so send a updateUser request with the name field changed then in the array we get a non-empty array with string name.

```js
['name']
```

Returns the value(s) we are updating (the ones that are different from the database). We can also check if a specific path is being modified with `this.isModified('name')`.

So to check if not modifying the password, then don't do anything.

```js
if(!this.isModified('password')) {
  return;
}
```

## Complete Solution: Using modified paths to avoid re-hashing the password

```js
UserSchema.pre('save', async function(){
  if(!this.isModified('password')) {
    return;
  }
  
  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});
```

If we are not modifying the password, then return and avoid re-hashing the password.

When user is being registered, password is being modified, therefore it will hash the password.

# The Profile Page

On the front-end we have a page with a `form` with 4 fields: name, last name, email, location.

- By default, set them up with values that user has in initial request (within the state)
- When user tries to make changes, it makes an `updateUser` request, then values are updated and a new token is issued
- Location will be the default value to `addJob` page later on

## Create an updateUser function in app context

For now the function just logs the current user passed in. Pass down the function.

```js
  const updateUser = async (currentUser) => {
    // Log user if all values are provided on update
    console.log(currentUser);
  };

  return (
    <AppContext.Provider value = {{...state, 
    displayAlert, registerUser, loginUser, toggleSidebar, logoutUser, updateUser }}>
      {children}
    </AppContext.Provider>
  )
```

## Implementing Profile Page

Navigate to the `Profile.js` in `pages`.

Going to need to use values from `initialState` and functions from global context.

We are going to use `state variables` with [useState](https://react.dev/reference/react/useState). We create a local state for the form field values: name, email, lastName, location. 

```js
import React from 'react';
import { useState } from 'react';
import { useAppContext } from '../../context/appContext';

export default function Profile() {
  const { user, showAlert, displayAlert, updateUser, isLoading }=
    useAppContext();

    const [name, setName] = useState(user?.name);
    const [email, setEmail] = useState(user?.email);
    const [lastName, setLastName] = useState(user?.lastName);
    const [location, setLocation] = useState(user?.location);
  
  return (
    <h1>Profile</h1>
  )
}
```

Next let's import a few more things, going to use `FormRow` component and `Alert` component.
Then we import the styled component wrapper called `DashboardFormPage`, this js file with css inside will be the form used for `AddJob` page as well.

Next, create the submit handler function that checks for any empty values (return and do nothing if so) then calls `updateUser()` from global context (which right now just logs the user object).

```js
    const handleSubmit = (e) => {
      e.preventDefault();
      if(!name || !email || !lastName || !location){
        displayAlert();
        return;
      }

      updateUser({ name, email, lastName, location });
    }
```

## Working on the Profile Component

Profile should return a `<form>` element. Within it a heading, conditionally rendered `Alert` component and the `FormRow` components. The `FormRow` props are type, name, value, and `onChange`

```js
  return (
    <Wrapper>
      <form action="" className="form" onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert />}

        <FormRow 
          type='text'
          name='name'
          value={name}
          handleChange={(e) => setName(e.target.value)}
        />
      </form>
    </Wrapper>
  )
```

Notice how the difference from the Register and here is that since we have many local states instead of just one state which dynamically sets the state of the values. Here is what it looked like in `Register.js` to jog our memory:

```js
export default function Register() {

  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value });
  };

  /* ... */

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit} action="">
        <Logo />
        <h3>{values.isMember ? "Log In" : "Register"}</h3>
        {showAlert && <Alert />}

        { !values.isMember && (
          <FormRow
            type="text"
            name="name"
            value={values.name}
            handleChange={handleChange}
          />
        )}

        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />

        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />

        <button type="submit" className="btn btn-block" disabled={isLoading}>submit</button>

        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button
            type='button'
            onClick={toggleMember}
            className="member-btn">
            { values.isMember ? 'Register' : 'Log In' }
          </button>
        </p>

      </form>
    </Wrapper>
  )
}
```

So in `Profile` we just call the set function from the `useState` hook, and pass in the `e.target.value`. Whereas in the `Register` we call `e.target.value` within `handleChange` function so we can pass it to all `FormRow` components.

Fill out the rest of the `FormRow` components for every input we wish to save.

Finally create a `submit` button, that is disabled if `isLoading` is true. Conditionally render text based on `isLoading`.

```js
<button className="btn btn-block" type='submit' disabled={isLoading}>
  {isLoading ? 'Please Wait...' : 'Save Changes'}
</button>
```

## Testing out the Profile Page

First let's test out our Profile Page so far. Pressing the submit button should print the user object in the console (because `updateUser` in `appContext` just logs it).

If we submit when a field is empty, say `lastName`, then it invokes `displayAlert()` which has the hardcoded "Please display all values" (see `reducer`).

Now we can move on to the HTTP request, but gotta comment out the form field checks in `handleSubmit` whil we set things up.

```js
  const handleSubmit = (e) => {
    e.preventDefault();
    // if(!name || !email || !lastName || !location){
    //   displayAlert();
    //   return;
    // }

    updateUser({ name, email, lastName, location });
  }
```

# Axios - Multiple Approaches

We can make HTTP request with Axios, but since requests will become increasingly more complex (providing the token, handling the error responses) we have to look at Axis configuration options. 

We will cover multiple approaches so that we can determine in the future which options are the most apt for upcoming projects.

In the `updateUser` we won't have actions for now, going to just showcase the multiple approaches first before we implement the actions.

## 1 - Bearer Token | Manual Approach

`appContext.js`

```js
const updateUser = async (currentUser) => {
  try {
    const { data } = await axios.patch('/api/v1/auth/updateUser', currentUser, {
      headers: {
        Authorization: `Bearer ${state.token}`,
      },
    });

    console.log(data);

  } catch(error){
    console.log(error.response);
  }
}
```

We have `axios.patch()` as we update the data. We have 3 arguments:

- the URL route
- `currentUser` is the data we are passing in
- options -> we can pass in the options with a `headers` property, which we set `Authorization`. 

The token is located in the state, so we go with `Bearer ${state.token}`.

Just log the `data` we get back and the error.

Difference between `useState` and `useReducer` is reducer does not update state directly. It uses actions and dispatch.

Now let's try out our `updateUser` function in the Profile page. Run the app and navigate to 'http://localhost:3000/profile'. 

Let's change that lastName to "Shiba", open up the developer tools > Network > Fetch/XHR

**Downsides** of this approach:
- Every request needs headers: Authorization `Bearer... 
- Need to check 401 errors

## Axios - Global Setup

Instead of manually adding `Bearer token` for every request, can use a global setup.

```js
axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
```

and now `updateUser`

```js
  const updateUser = async (currentUser) => {
    console.log(currentUser);
    try{
      const { data } = await axios.patch('/api/v1/auth/updateUser', currentUser,);
      console.log(data);
    } catch(error) {
      console.log(error.response);
    }
  };
```

Downside in global setup:

```js
  const updateUser = async (currentUser) => {
    console.log(currentUser);
    try{
      const { data } = await axios.patch('/api/v1/auth/updateUser', currentUser,);
      const { data: extra } = await axios.get('https://some-other-api.com/some-route');
      console.log(data);
      console.log(extra);
    } catch(error) {
      console.log(error.response);
    }
  };
```

IF we use `axios.get()` on another API, it sends our `Bearer` token.

Send updateUser request (Save Changes Button) > Developer Tools > Network > Fetch/XHR there are two Request Headers. It shows Authorization: Bearer Token. 

## Axios | Custom Instance

```js
const authFetch = axios.create({
  baseURL: '/api/v1',
  headers: {
    Authorization: `Bearer ${state.token}`,
  },
});

const updateUser = async (currentUser) => {
  try {
    const { data } = await authFetch.patch('/auth/updateUser', currentUser);
  } catch (error) {
    console.log(error.response);
  }
};
```

We can use `authFetch`, when sending to another api request, we don't have to send the Bearer token. Instead of using `axios.patch()` within `updateUser`.

Positive: Bearer token not found in a different request with a different URL.
Downsides: Does not handle 401 responses (Authentication Errors).

## Axios | Interceptors

Can attach functionality as requests leave application, and as requests are coming back. Kinda like middleware. Here is the [docs](https://axios-http.com/docs/interceptors).

```js
// Add a request interceptor
axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  });
```

We want to add those headers in the config. Let's try implementing above:

```js
  // Axios custom instance
  const authFetch = axios.create({
    baseURL: '/api/v1',

  });

  // Axios request interceptor
  authFetch.interceptors.request.use( (config) => {
    config.headers.common['Authorization'] = `Bearer ${state.token}`;
    return config;
  }, (error) => {
    return Promise.reject(error);
  });
```

Next create the `response` interceptor

```js
  // Axios response interceptor
  authFetch.interceptors.response.use( 
    (response) => {
      return response;
    }, 
    (error) => {
      console.log(error.response);
      return Promise.reject(error);
    }
  );
```

In the docs, the error will handle any status codes that falls outside the range of 2xx

So let's add a bit more to the error handling, if it is a `401` then log.

```js
  // Axios response interceptor
  authFetch.interceptors.response.use( 
    (response) => {
      return response;
    }, 
    (error) => {
      console.log(error.response);

      if(error.response.status === 401){
        console.log('Auth Error');
      }

      return Promise.reject(error);
    }
  );
```

### Axios | Interceptors [version 1]

```js
  // Axios custom instance
  const authFetch = axios.create({
    baseURL: '/api/v1',

  });

  // Axios request interceptor
  authFetch.interceptors.request.use( 
    function (config) {
      config.headers.common['Authorization'] = `Bearer ${state.token}`;
      return config;
    }, 
    function (error) {
      return Promise.reject(error);
    }
  );

  // Axios response interceptor
  authFetch.interceptors.response.use( 
    function (response) {
      return response;
    }, 
    function (error) {
      console.log(error);
      console.log(error.response);

      if(error.response.status === 401){
        console.log('Auth Error');
      }

      return Promise.reject(error);
    }
  );
```

Why use interceptors? To keep track of error responses, and make decisions based on those error responses (or more specifically `response interceptor`) allows us too setup one logic for multiple requests. Same for all Dashboard pages.

# Issue is: 
```sh
TypeError: Cannot set properties of undefined (setting 'Authorization')
    at AppProvider.dispatch.type (appContext.js:49:1)
    at async updateUser (appContext.js:155:1)
```

So checked [stackoverflow](https://stackoverflow.com/questions/43051291/attach-authorization-header-for-all-axios-requests).

So changed this line:

```js
config.headers.common['Authorization'] = `Bearer ${state.token}`;
```

to this line:
```js
config.headers.Authorization = `Bearer ${state.token}`;
```

Then later changed the line to:
```js
config.headers['Authorization'] = `Bearer ${state.token}`;
```

After much deliberation, from verifying the JWT signature @ [jwt.io](https://jwt.io/) to checking this [stackoverflow post on jwt](https://stackoverflow.com/questions/50774780/always-getting-invalid-signature-in-jwt-io), realizing that the token is encoded. And logging more enhanced errors. 

I finally was able to track down the greatest issue in the why the server is sending a `401` unauthorized response: 

```sh
[0] token is eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE4ZDZhYjkyZmY1OTRhMDJiNmYyNGEiLCJpYXQiOjE2Nzk2MjQ1MzQsImV4cCI6MTY3OTcxMDkzNH0.-fDe_VqrLo0QodWB3p6ElHAe_oRWlYeTIHheO4IO2Ec
[0] TokenExpiredError: jwt expired
[0]     at C:\Users\...\job-tracker\node_modules\jsonwebtoken\verify.js:190:21
[0]     at getSecret (C:\Users\...\job-tracker\node_modules\jsonwebtoken\verify.js:97:14)
[0]     at module.exports [as verify] (C:\Users\...\job-tracker\node_modules\jsonwebtoken\verify.js:101:10)     
[0]     at authenticate (file:///C:/Users/.../job-tracker/middleware/authenticate.js:15:25)
[0]     at newFn (C:\Users\...\job-tracker\node_modules\express-async-errors\index.js:16:20)
[0]     at Layer.handle [as handle_request] (C:\Users\...\job-tracker\node_modules\express\lib\router\layer.js:95:5)
[0]     at next (C:\Users\...\job-tracker\node_modules\express\lib\router\route.js:144:13)
[0]     at Route.dispatch (C:\Users\...\job-tracker\node_modules\express\lib\router\route.js:114:3)
[0]     at newFn (C:\Users\...\job-tracker\node_modules\express-async-errors\index.js:16:20)
[0]     at Layer.handle [as handle_request] (C:\Users\...\job-tracker\node_modules\express\lib\router\layer.js:95:5) {
[0]   expiredAt: 2023-03-25T02:22:14.000Z
[0] }
[0] verification went wrong
[0] UnAuthenticatedError: Authentication Invalid
[0]     at authenticate (file:///C:/Users/.../job-tracker/middleware/authenticate.js:23:11)
[0]     at newFn (C:\Users\...\job-tracker\node_modules\express-async-errors\index.js:16:20)
[0]     at Layer.handle [as handle_request] (C:\Users\...\job-tracker\node_modules\express\lib\router\layer.js:95:5)
[0]     at next (C:\Users\...\job-tracker\node_modules\express\lib\router\route.js:144:13)
[0]     at Route.dispatch (C:\Users\...\job-tracker\node_modules\express\lib\router\route.js:114:3)
[0]     at newFn (C:\Users\...\job-tracker\node_modules\express-async-errors\index.js:16:20)
[0]     at Layer.handle [as handle_request] (C:\Users\...\job-tracker\node_modules\express\lib\router\layer.js:95:5)
[0]     at C:\Users\...\job-tracker\node_modules\express\lib\router\index.js:284:15
[0]     at Function.process_params (C:\Users\...\job-tracker\node_modules\express\lib\router\index.js:346:12)   
[0]     at next (C:\Users\...\job-tracker\node_modules\express\lib\router\index.js:280:10) {
[0]   statusCode: 401
[0] }
[0] PATCH /api/v1/auth/updateUser 401 2.166 ms - 32
```

Token is expired! A `TokenExpiredError` along with the an object `{ expiredAt: 2023-03-25T02:22:14.000Z }`. 

**TODO**: Issue a new token by loggin in again, then try all the above Axios requests, etc.

# Before solving the issue, fixed the Landing page:

Logged out, then logged back in. 

(The button to link up the Landing Page to the Register page needs to be fixed):

```js
<button className='btn btn-hero'>Login/Register</button>
```

Going to Add a child component `<Link>` within:

```js
<button className='btn btn-hero'>
  <Link to={'/register'} style={{ textDecoration: 'none' }} >
    Login/Register
  </Link>
</button>
```

A simpler solution is to remove the `<button>` altogether, as it keeps the stylings in the parent.

```js
<Link to='/register' className='btn btn-hero'>
  Login/Register
</Link>
```

Now a properly styled Link routes to the `register` page.

# Solving the issue 

Now clicking it to the login page, then log in properly.

Head over to the `Profile` page on the Dashboard. We see an alert of "Login Successful.. redirecting" so let's reduce the time to 4 seconds:

```js
  const clearAlert = () => {
    setTimeout(() => {
      dispatch({
        type: CLEAR_ALERT,
      })
    }, 4000)
  };
```

Now the moment of truth -> set the Location to `Hachioji (Kanto, Tokyo)`.

Ok this time instead of `UnAuthenticatedError` we are geting a `BadRequestError` 400:

```sh
[0] token is eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE4ZDZhYjkyZmY1OTRhMDJiNmYyNGEiLCJpYXQiOjE2ODAxMzQ4ODcsImV4cCI6MTY4MDIyMTI4N30.NluIfiumCFssf1n2ypYGsoef3GcsYvYNBdlX78tGngI
[0] payload is: [object Object]
[0] userId is: 6418d6ab92ff594a02b6f24a
[0] BadRequestError: Please provide all values
[0]     at updateUser (file:///C:/Users/.../job-tracker/controllers/authController.js:67:11)
[0]     at newFn (C:\Users\...\node_modules\express-async-errors\index.js:16:20)
[0]     at Layer.handle [as handle_request] (C:\Users\...\node_modules\express\lib\router\layer.js:95:5)
[0]     at next (C:\Users\...\node_modules\express\lib\router\route.js:144:13)
[0]     at authenticate (file:///C:/Users/.../job-tracker/middleware/authenticate.js:19:5)
[0]     at newFn (C:\Users\...\node_modules\express-async-errors\index.js:16:20)
[0]     at Layer.handle [as handle_request] (C:\Users\...\node_modules\express\lib\router\layer.js:95:5)
[0]     at next (C:\Users\...\node_modules\express\lib\router\route.js:144:13)
[0]     at Route.dispatch (C:\Users\...\node_modules\express\lib\router\route.js:114:3)
[0]     at newFn (C:\Users\...\node_modules\express-async-errors\index.js:16:20) {
[0]   statusCode: 400
[0] }
[0] PATCH /api/v1/auth/updateUser 400 1.640 ms - 35
```

Which is good! We are getting closer.

Log the request body coming from `updateUser`

```js
const updateUser = async (req, res) => {
  const { email, name, lastName, location} = req.body;
  
  console.log(`
    email is \t ${email}
    name is \t ${name}
    lastName is \t ${lastName}
    location is \t ${location}
  `);
// ...
}
```
And send the request again form Profile Page:

By the time it reaches the logging it turns out to be:

```js
[0]     email is         undefined
[0]     name is          undefined
[0]     lastName is      undefined
[0]     location is      undefined
```

But in the `appContext.js:153` we have

```js
{
    "name": "Miyuki",
    "email": "MiyukiShiba@gmail.com",
    "lastName": "Shiba",
    "location": "Hachioji (Kanto, Tokyo)"
}
```

Let's trace the execution:

Starting form the `Profile` page we 

1. click the button -> triggers `handleSubmit`
2. Invokes `updateUser` from `appContext`

```js
  const updateUser = async (currentUser) => {
    console.log(currentUser);
    try{
      const { data } = await authFetch.patch('/auth/updateUser', JSON.stringify(currentUser));
      console.log(data);
    } catch(error) {
      // redundant error logging
      // console.log(error.response);
    }
  };
```

3. When it destructures the `data` from `authFetch.patch()`

4. Check `authFetch`

5. Problem is that we pass in a JSON.stringified version of `currentUser` to `authFetch`

Pass in `currentUser` as an object instead:

```js
  const { data } = await authFetch.patch('/auth/updateUser', currentUser);
```

Now sending a request with changes in `profile` route gives us a value of:

```js
[0] {
[0]   name: 'Miyuki',
[0]   email: 'MiyukiShiba@gmail.com',
[0]   lastName: 'Shiba',
[0]   location: 'Hachioji (Kanto, Tokyo)'
[0] }
[0]
[0]     email is         MiyukiShiba@gmail.com
[0]     name is          Miyuki
[0]     lastName is      Shiba
[0]     location is      Hachioji (Kanto, Tokyo)
[0]
[0] []
[0] PATCH /api/v1/auth/updateUser 200 98.122 ms - 379
```

And in developer tools

```js
appContext.js:153
{
    "name": "Miyuki",
    "email": "MiyukiShiba@gmail.com",
    "lastName": "Shiba",
    "location": "Hachioji (Kanto, Tokyo)"
}

appContext.js:156 
{
    "user": {
        "_id": "6418d6ab92ff594a02b6f24a",
        "name": "Miyuki",
        "email": "MiyukiShiba@gmail.com",
        "lastName": "Shiba",
        "location": "Hachioji (Kanto, Tokyo)",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE4ZDZhYjkyZmY1OTRhMDJiNmYyNGEiLCJpYXQiOjE2ODAxMzgxMTEsImV4cCI6MTY4MDIyNDUxMX0.YPCCG0Vsk30qAQYrGXv1aQN7YO9VmKe5eMqT_rq8S5k",
    "location": "Hachioji (Kanto, Tokyo)"
}
```

Success! We finally resolved the issue. Big takeaway is that we must log-in so that we can issue a new token before updating the user. In Postman, re-issuing tokens are handled automatically. Its the reason why we need to send a Login request first before updating user (so the token isn't expired for the session).

## Axios Interceptor | Error Handling

AS you can see we had more descriptive errors. For completeness, let's trip up the "Auth Error" we setup back in the Axios response interceptor:

```js
  // Axios response interceptor
  authFetch.interceptors.response.use( 
    function (response) {
      return response;
    }, 
    function (error) {
      console.log(error);
      console.log(error.response);

      if(error.response.status === 401){
        console.log('Auth Error');
      }

      return Promise.reject(error);
    }
  );
```

To do so let's keep all things the same in the Profile, and remove the token from the state. Or actualy just comment out the line where we set the Bear state token:

```js
  // Axios request interceptor
  authFetch.interceptors.request.use( 
    function (config) {
      // config.headers['Authorization'] = `Bearer ${state.token}`;
      return config;
    }, 
    function (error) {
      return Promise.reject(error);
    }
  );
```

Now "Save Changes" in Profile page, and we should see the `Auth Error` in Chrome Developer tools console. We are not authorized to make these requests. 

Axios Interceptors allows us to control, keep track of and make decisions based on those error responses.

# Update User functionality

List of things want to do in Update User:

- store in localStorage
- store in State
- Update database
- Dispatch action

Let's add it in `actions.js`:

```js
export const UPDATE_USER_BEGIN = 'UPDATE_USER_BEGIN';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';
```

Then dispatch the corresponding actions (in `appContext.js`):

```js
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });
    try{
      const { data } = await authFetch.patch('/auth/updateUser', currentUser);
      
      const { user, location, token } = data;

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, location, token },
      });

      addUserToLocalStorage({ user, location, token });

    } catch(error) {
      dispatch({
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert();
  };
```

1. Set up the loading by dispatching `UPDATE_USER_BEGIN`
2. Get `data` from `PATCH` request using `authFetch`
3. Destructure the `data` for `user, location, token`
3. Dispatch `UPDATE_USER_SUCCESS`, passing in `user`, `location`, `token` payload
4. Add `user` to localStorage so data about newly updated user persists
5. Error handling, dispatch `UPDATE_USER_ERROR` with payload error msg
6. Invoke `clearAlert()`after `try..catch`

## Update User | Working on the Reducer

Handling the Update User actions in reducer:

```js
  if(action.type === UPDATE_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    };
  }

  if(action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!'
    };
  }

  if(action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
```

## Testing out the Update User

- Run the app
- Log out, then log in
- Go to Profile page
- Check database
- Update the Profile by changing one of the fields, then press Save Changes
- Alert should display, and state should be updated
- Successfully attaching token when sending requests with auth instance
- Error Alert displays when one of the values missing (the server error)

# Logout functionality

Improved logout functionality. Especailly the issue we had earlier, user should be logged out when tokens are expired.

Some errors we have when `updateUser` is called:

- Missing value -> Bad Request 400
- Generic 500 Server Error
- 401 Unauthorized error -> User should not be in the application in the first place. Token expired.

Instead of showcasing there is a `401` error Unauthorized, they should be logged out.

Right now when you get 401, it displays as an Alert flag in the Profile page. So let's change that so the user is logged out and needs to log back in.

In Axios Response interceptor, instead of logging `Auth Error` we can log out the user instead invoking `logoutUser()`.

```js
  // Axios response interceptor
  authFetch.interceptors.response.use( 
    function (response) {
      return response;
    }, 
    function (error) {
      console.log(error);
      console.log(error.response);

      if(error.response.status === 401){
        console.log('Auth Error');
        logoutUser();
      }

      return Promise.reject(error);
    }
  );
```
Now if we comment out the Bearer token, we will be logged out when we try to `updateUser` (i.e., Press Save Changes in Profile page).

```js
  authFetch.interceptors.request.use( 
    function (config) {
      // config.headers['Authorization'] = `Bearer ${state.token}`;
      return config;
    }, 
    function (error) {
      return Promise.reject(error);
    }
  );
```

WE should see app kick the user back to the landing page. Now if we go to the Register page there is an Alert that displays Unauthorized.

## Removing Unauthorized Alert in Register page

Since there is a **delay** time when `Alert` component is displayed, the user can see the "Authentication Invalid" Alert message in the Login page immediately after logging out (when Token expired, etc.).

Let's remove that Alert.

WE only want to dispatch `UPDATE_USER_ERROR` in `updateUser` only if it isn't a `401`. 

```js
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN });

    try{
      // get user data...

    } catch(error) {
      if(error.response.status !== 401){
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        });
      }
    }
    clearAlert();
  };
```

Before moving on to the jobsController, jobs model and more let's now handle the front-end empty value validation in the Profile page. Let's uncomment the conditional statement in `handleSubmit`:

```js
  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !email || !lastName || !location){
      displayAlert();
      return;
    }

    updateUser({ name, email, lastName, location });
  }
```

### Side note: Refactored reducer function to `switch case`

According to the [useReducer docs](https://react.dev/reference/react/useReducer):

>  By convention, it is common to write it as a [switch statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch). For each case in the switch, calculate and return some next state.

So I refactored the reducer function in `reducer.js` at this stage. Makes it easier to add new cases later for maintainability.

# Job Model

`Job.js` in `models` folder. Let's start setting up the template:

```js
import mongoose from "mongoose";
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

const { Schema } = mongoose;

const JobSchema = new Schema({
  
});
```

## Job Model | Fields

The fields it will have are 

- company
- position
- status
- jobType (full=time, part-time, intern)
- jobLocation
- timestamp

```js
const JobSchema = new Schema({
  company: {
    type: String,
    required: [true, 'Please provide company'],
    maxLength: 50,
  },
  position: {
    type: String,
    required: [true, 'Please provide position'],
    maxlength: 100,
  },
  status:{
    type: String,
    enum: ['interview', 'declined', 'pending'],
    default: 'pending',
  },
  jobType:{
    type: String,
    enum: ['full-time', 'part-time', 'remote', 'internship'],
    default: 'full-time',
  },
  jobLocation:{
    type: String,
    default: 'my city',
    required: true,
  },
});
```

## Job Model | Created By Field

Now create a field `createdBy` which will indicate that it is created by the User and keep track of the time.

```js
  createdBy: {
    type: mongooose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide the User'],
  }, 
```

## Job Model | Timestamps

In mongoose we can add the `timestamps` option which assigns `createdAt` and `updatedAt` fields to schema. See the mongoose docs on [options: timestamps](https://mongoosejs.com/docs/guide.html#timestamps).

So at the end of the Job model schema just add a comma, and set `timestamps` to true.

```js
const JobSchema = new Schema({
// ...
}, { timestamps: true } );
```

## Creating the Job Model

Finally, to use our schema definition, need to convert the `JobSchema` into a `Model` by passsing it into `mongoose.model(modelName, schema)`. Let's do this right in the export.

```js
export default mongoose.model('Job', JobSchema);
```

# Working on the Jobs Controller

Add the imports we plan to use:

```js
import Job from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';
```

## Jobs Controller | createJob function

When user creates a Job, they click a button and send a request that includes the fields within the `JobSchema`. The required fields are `position` and `company`. Let's destructure that from the `req.body`.

- Check if `position` or `company` are empty, if true then throw `BadRequestError`

```js
const createJob = async (req, res) => {
  const { position, company } = req.body;

  if(!position || !company) {
    throw new BadRequestError('Please Provide All Values');
  }
  
  res.send('createJob');
}
```

Next we want to set the `createdBy` property from the `req.body` and set it to the `req.user.userId`.

- Then we pass the `req.body` into a `Job.create()` to create a `job`

Finally send back the HTTP status code that the `job` resource was created.

```js
const createJob = async (req, res) => {
  const { position, company } = req.body;

  if(!position || !company) {
    throw new BadRequestError('Please Provide All Values');
  }

  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
}
```

## Checking createJob

In the `server.js` we have the `authenticateUser` middleware:

```js
app.use('/api/v1/jobs', authenticateUser, jobsRouter);
```

In the `authenticate.js` we attach the `user` object with the `userId` property before we invoke `next()`:

```js
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if(!authHeader || !authHeader.startsWith("Bearer")){
    throw new UnAuthenticatedError("Authentication Invalid");
  }

  const token = authHeader.split(' ')[1];
  
  try{
    const payload = jwt.verify(token, process.env.SECRET_KEY);

    req.user = { userId: payload.userId };

    next();
  } catch(error){
    throw new UnAuthenticatedError("Authentication Invalid");
  }
};
```

So we want to add a `createdBy` property to `req.body` since we will pass in `req.body` to the document we will create.

## Testing in Postman

Let's send a `Login` request to get a new token issued. Then go to the `Create Job` request, and go to the `Body` tab > `raw` radio button > `JSON` dropdown and pass in:

```json
{
  "company" : "Google",
  "position": "front-end developer"
}
```

Send the request and check the Body output for a successful response.

```json
{
    "job": {
        "company": "Google",
        "position": "front-end developer",
        "status": "pending",
        "jobType": "full-time",
        "jobLocation": "my city",
        "createdBy": "6418d6ab92ff594a02b6f24a",
        "_id": "6426b205fbdb9da6e1e5a3a5",
        "createdAt": "2023-03-31T10:12:21.562Z",
        "updatedAt": "2023-03-31T10:12:21.562Z",
        "__v": 0
    }
}
```

So far so good!

Now if we have an empty value and send the Create Job request, we should get back a msg with "Please provide all values" a 400 response.

# Create Job front-end

Let's work on the front-end. Let's add some properties to the `initialState`. 

```js
const initialState = {
  jobLocation: userLocation || '',

  position: '',
  company: '',
  jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
  jobType: 'full-time',
  statusOptions: ['interview', 'declined', 'pending'],
  status: 'pending',
  isEditing: false,
  editJobId: '',
}
```

We have properties regarding the job, which match the back-end. We also have:

- `isEditing` 
- `editJobId`

Because we want to be able to Edit the Job on the front-end, in `All Jobs` page where we click on one and `edit` and we will be redirected to `Add Job` page.

## Why add these properties in the Global Context?

Why not have them in the local state values?

That's because in `All Jobs` when we want to edit a particular job it brings the user to the `Add Job` page so they can edit it there. In there we can set `isEditing` to `true`, get the `editJobId` and provide the input values to update the job. 

To add the job and edit the job, it can all be found in one page in the `Edit Job` page. It's easier to modify those values in the global state. 

# Add Job page

Start with the imports:

```js
import React from 'react';
import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
```

Next destructure the values from global context. So far:

```js
import React from 'react';
import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../../assets/wrappers/DashboardFormPage';

export default function AddJob() {
  const {
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    status,
    statusOptions,
  } = useAppContext();

  return (
    <Wrapper>
      
    </Wrapper>
  );
}
```

In the return, we will conditional render a heading based on `isEditing` flag. Also conditionally render the `Alert` component. Finally create a `FormRow` component for the job position.

```js
  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow type="text" name="position" value={position} />
        </div>
      </form>
    </Wrapper>
  );
```

Eventually we are going to invoke a function that comes from the state, global context. For now let's have a placeholder local function `handleJobInput` that just logs the event's `name` and `value`.

```js
  const handleJobInput = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name} : ${value}`);
  }
```

Now we can add that function to handle to the prop `handleChange`:

```js
  <FormRow 
    type="text"
    name="position"
    value={position}
    handleChange={handleJobInput}
  />
```

Add two more `FormRow` components for Company and JobLocation

```js
<FormRow 
  type="text"
  name="company"
  value={company}
  handleChange={handleJobInput}
/>
<FormRow 
  type="text"
  name="jobLocation"
  value={jobLocation}
  handleChange={handleJobInput}
/>
```

Interestingly, jobLocation is already filled out on the page (browser) because its already in our state. The label text is all one word "jobLocation" so lets split it up by using our `prop` `labelText` in our `FormRow` component.

```js
<FormRow 
  type="text"
  name="jobLocation"
  value={jobLocation}
  handleChange={handleJobInput}
  labelText='job location'
/>
```

## Create the Submit button

```js
<div className="btn-container">
  <button
    type='submit'
    className='btn btn-block submit-btn'
    onClick={handleSubmit}
  >
    submit
  </button>
</div>
```

The submit handler:

```js
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!position || !company || !jobLocation){
      displayAlert();
      return;
    }

    console.log('create job');
  };
```

With triple check form validation

1. Front-End
2. Controller
3. mongoose


## Implementing the Drop Down menus

We will have drop down menus for our `jobType` and `jobStatus`.

Let's try hard coding one select menu. 

- `div` with `form-row` class
- `label` for the `jobType`
- `select` 
- We have those options in the array within the state
- Grab the array, iterate over each item, map them to the string (`itemValue`) and `index`
- In React, since we have a list we need to add the `key` prop  and pass in a unique value, which in this case will be `index`
- Return an `option` element

```js
return(
<div className="form-row">
  <label htmlFor="jobType" className='form-label'>
    job type
  </label>

  <select
    name='jobType'
    value={jobType}
    onChange={handleJobInput}
    className='form-select'
  >
    {jobTypeOptions.map((itemValue, index) => {
      return(
        <option key={index} value={itemValue}>
          {itemValue}
        </option>
      );
    })}
  </select>
</div> 
);
```

Now we should see the drop down menu when we click, and it should be "full-time" for Job Type. It won't change bcause the `handleJobInput` hasn't been wired up yet.

We have to repeat this code again, so in order to reduce code reduplication, let's create a component.

## `FormRowSelect` component

Create `FormRowSelect.js` in `components` folder, rfc. Then update the import/export in `index.js`.

Let's take the code we made for the dropdown menu and paste it into the component. Now let's fix up a few things, mainly the `props`. The React docs on [Passing Props to a Component](https://react.dev/learn/passing-props-to-a-component).

1. Let's pass props to the child component `FormRowSelect`. 
2. Read props inside the child component `FormRowSelect`

```js
import React from 'react';

export default function FormRowSelect({labelText, name, value, handleChange, list}) {
  return (
    <div className="form-row">
    <label htmlFor={name} className='form-label'>
      {labelText || name}
    </label>

    <select
      name={name}
      value={value}
      onChange={handleChange}
      className='form-select'
    >
      {list.map((itemValue, index) => {
        return(
          <option key={index} value={itemValue}>
            {itemValue}
          </option>
        );
      })}
    </select>
  </div> 
  );
}
```

With the FormRowSelect component made, we can reuse it for both the `jobType` and `status` form fields:

```js
  <FormRowSelect 
    name="status"
    value={status}
    handleChange={handleJobInput}
    list={statusOptions}
  />

  <FormRowSelect
    labelText="job type"
    name="jobType"
    value={jobType}
    handleChange={handleJobInput}
    list={jobTypeOptions}
  />
```

Now running the app and seeing the page on the browser we see the drop downs in action.

# Implementing the `handleChange`

The `handleChange` function will be invoked when we update one of the inputs on a form field. When an input is changed, we want to update the state.

- Create action we want to dispatch
- Every time we create action, import in context/reducer and export it in actions
- Create the function within global context -> `appContext.js` and pass it down
- Handle the case in `reducer`, update state value with dynamic naming

`actions.js`
```js
export const HANDLE_CHANGE = 'HANDLE_CHANGE';
```

`appContext.js`
```js
import { HANDLE_CHANGE } from "./actions";

  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };

value = {{ handleChange }}
```

`reducer.js`
```js
import { HANDLE_CHANGE } from "./actions";

  case HANDLE_CHANGE: {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    };
  }
```

- `handleChange` function expects an object with two properties: `name, value`. It then invokes `dispatch` passing in `action.type` and the `payload`. Finally it is passed down within the `value` prop of `AppContext.Provider`

## Using the global `handleChange` function in `AddJob`

```js
export default function AddJob() {
  const {
    // ...
    handleChange
  } = useAppContext();

  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(`${name} : ${value}`);
  };
```

- Destructure the `handleChange` function from global context
- In `handleJobInput` invoke `handleChange`

```js
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({name, value});
  };
```

## Testing the functionality

Every time we change one of the inputs in AddPage we also update the state.

Developer Tools > Components > AppProvider > hooks > Reducer

- Now type something within Position -> "Front-End Developer"

We see the hook updated with: `position: "Front-End Developer"`.

Now add the company name: `Adobe`. Then hit Submit. In the console we will see `create job`, since all values in the form are provided.

Now we have a **global `handleChange` function**, handling every change to the inputs of the form AddJob page.

## Add Clear Button

For convenience to the user, let's add a Clear button that resets all input fields to the default.

- Create action `CLEAR_VALUES`, export it in actions, then import it in reducer/appContext
- Create the function that dispatchs `CLEAR_VALUES` and pass it down to `value` prop
- Handle the action case within reducer
- Finally, create the `button` in the `AddJob` page and wire things together

`appContext`
```js
  const clearValues = () => {
    dispatch({
      type: CLEAR_VALUES,
    });
  };

value = {{..., clearValues }};
```

Now how do we handle the `CLEAR_VALUES` action in the reducer?

- Should setup a temporary state where we handle all the job values from the `initialState`
- Note: if user edits a job, but then thinks otherwise and clears the job instead, then we should  set `isEditing` and `editJobId` to the default values.

`reducer`
```js
  case CLEAR_VALUES: {
    
    const initialState = {
      isEditing: false,
      editJobId: '',
      position: '',
      company: '',
      jobLocation: state.userLocation,
      jobType: 'full-time',
      status: 'pending',
    };

    return {
      ...state,
      ...initialState
    };
  }
```

We have a temporary state `initalState` and reset the values related to job to the default. Then spread out the current `state` to expand it into a list of arguments and get the rest of the values. Then also spread the `initalState` which provides all the values for the all the properties related to job in the actual `state`.

## AddJob | Clear Button
- Next create the button for the AddJob form

```js
const {
  // ...
  clearValues
} = useAppContext();

return (
  return (
    <Wrapper>
      <form className='form'>
      /* ... */
          <div className="btn-container">
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
            >
              submit
            </button>

            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault();
                clearValues();
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
);
```

Have to access the event object and prevent default (otherwise page refreshes). The button behaves this way because it is within the form. 

Note: If Clear button comes before the submit button, pressing Enter on the keyboard hits the Clear button rather than submit.

## Disable submit button when `isLoading` is `true`

In `AddJob` page, add the prop `disabled={isLoading}` to submit button:

```js
<div className="btn-container">
<button
  type='submit'
  className='btn btn-block submit-btn'
  onClick={handleSubmit}
  disabled={isLoading}
>
  submit
</button>
```

Prevents user from submit form again when in the middle of a request.

---

# Create Job | Functionality

When we go to `Add Job` page, when we fill out the form successfully and hit submit we should see an Alert that tells the user that a new job was created (to be displayed in `All Jobs` page).

First let's setup the actions we want to dispatch that determines the stages of Create Job.

```js
export const CREATE_JOB_BEGIN = 'CREATE_JOB_BEGIN';
export const CREATE_JOB_SUCCESS = 'CREATE_JOB_SUCCESS';
export const CREATE_JOB_ERROR = 'CREATE_JOB_ERROR';
```

Let's import them in the reducer and appContext.

## Next we create the `createJob` function in `appContext`. 

```js
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });

    try{
      const { 
        position, 
        company, 
        jobLocation, 
        jobType, 
        status 
      } = state;

      // authFetch

    } catch(error){

    }
  };
```
- We dispatch the BEGIN action, then we in a `try..catch` we start the logic. 

- We destructure out the values we need to create a job from the state.

### Let's try fleshing out the `authFetch`

- Calling `authFetch` with a `post()` as we want to post or create a job with the data we destructured.
- The parameters to `post()` are `post(url, data)`
- The `url` or route will be `'/jobs'` as seen in `server.js`: 
```js
app.use('/api/v1/jobs', authenticateUser, jobsRouter);
```
- The `data` we want to pass in are the properties we destructured out of `state` to create the job:
- The Axios Interceptors will add that token to authenticate the user for us

So far:

```js
await authFetch.post('/jobs', {
  position, 
  company, 
  jobLocation, 
  jobType, 
  status 
});
```

Afterwards we can dispatch `CREATE_JOB_SUCCESS`. Also going to dispatch `CLEAR_VALUES` to update the state and reset them to default values to facilitate creating another job.

```js
dispatch({ type: CREATE_JOB_SUCCESS });
dispatch({ type: CLEAR_VALUES });
```

- Don't forget to pass the function in to the `value` prop of `AppContext.Provider`!

### Error handling in `createJob`

In the `catch`, if we were to get a `401` error then we do not want to have an `Alert` display that the user is `Unauthorized` (as this will show in the Register). So let's just return.

If any other error than dispatch the `CREATE_JOB_ERROR` action and pass in the payload msg and update state accordingly.

```js
catch(error){
      if(error.response === 401) {
        return;
      }

      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
  };
```

## Setup the Reducer to handle create job actions

```js
case CREATE_JOB_BEGIN: {
  return{
    ...state,
    isLoading: true
  };
}

case CREATE_JOB_SUCCESS: {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
    alertType: 'success',
    alertText: 'New Job Created!'
  };
}

case CREATE_JOB_ERROR: {
  return {
    ...state,
    isLoading: false,
    showAlert: true,
    alertType: 'danger',
    alertText: action.payload.msg,
  };
}
```

## Clear Alert after `createJob`

After testing, the Alert won't disappear so need to add that in after the `try..catch`:

```js
  const createJob = async () => {
    dispatch({ type: CREATE_JOB_BEGIN });

    try{
      const { 
        position, 
        company, 
        jobLocation, 
        jobType, 
        status 
      } = state;

      await authFetch.post('/jobs', {
        position, 
        company, 
        jobLocation, 
        jobType, 
        status 
      });

      dispatch({ type: CREATE_JOB_SUCCESS });
      dispatch({ type: CLEAR_VALUES });

    } catch(error){
      if(error.response === 401) {
        return;
      }

      dispatch({
        type: CREATE_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }

    clearAlert();
  };
  ```

## Import `createJob` in `AddJob` then invoke it in `handleSubmit`.

```js
export default function AddJob() {
  const {
    // ...
    createJob,
  } = useAppContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(!position || !company || !jobLocation){
      displayAlert();
      return;
    }

    if(isEditing){
      // editJob
      return;
    }

    createJob();
  };
  // ...
}
```

## Testing `createJob`

Comment out `AddJob`'s validation checks:


```js
  const handleSubmit = (e) => {
    e.preventDefault();

    // if(!position || !company || !jobLocation){
    //   displayAlert();
    //   return;
    // }

    if(isEditing){
      // 
      return;
    }

    createJob();
  };
```

Now if we submit a Bad Request with empty fields in `position` for example, we should get the Alert `Please Provide All Values` from the server. In the developer tools we have that 400 (Bad Request).

Now with a positive request, fill out the form properly and go ahead and submit the form for `createJob`.

Remember to uncomment the form validation on the front-end in `handleSubmit`, before moving on.

# Get All Jobs

Planning the page. It will have a Search Form with search field, and drop downs. 

Then below are all the jobs displayed (or all the jobs that match the search query).

Each job will contain its own card containing:
- job title / job position
- Location
- job type
- Status
- Date created
- Edit/Delete buttons

## Server Side - `jobsController`

In the `jobsController` we should have a function `getAllJobs`, which gets all the jobs created by a specific user. We do this with `Job.find()`.

In the `authenticate` middleware, if there is a valid token then we add `user` to the request `req`.

```js
req.user = { userId: payload.userId };
```

Then we can access the `req.user` property for its `userId` to find all the jobs created by the correct user.

```js
const jobs = await Job.find({ createdBy: req.user.userId });
```

Then after succesfully finding the data, we go with `StatusCodes.OK`  for the response `res`. 

Read and parse the data with `json()`. The values we want to display are:
- `jobs`
- `totalJobs`
- `numOfPages`

We are going to have pagination to display the jobs. Right now `numOfPages` is hardcoded to 1 but we should dynamically set this based on the `jobs.length`. In other words, the more jobs we have the more pages.

Here is how it will look in the controller:

```js
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.userId });

  res.status(StatusCodes.OK)
     .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
}
```

### Testing getAllJobs

- Go to Postman
- Login to re-issue token
- Create jobs
- Get All Jobs

We should see in the Body:

```json
{
    "jobs": [
        {
            "_id": "6426b205fbdb9da6e1e5a3a5",
            "company": "Google",
            "position": "front-end developer",
            "status": "pending",
            "jobType": "full-time",
            "jobLocation": "my city",
            "createdBy": "6418d6ab92ff594a02b6f24a",
            "createdAt": "2023-03-31T10:12:21.562Z",
            "updatedAt": "2023-03-31T10:12:21.562Z",
            "__v": 0
        },
        {
            "_id": "642f36a5429866ccdadb11c5",
            "company": "Uber",
            "position": "Front-End Developer",
            "status": "pending",
            "jobType": "full-time",
            "jobLocation": "Irvine, California",
            "createdBy": "6418d6ab92ff594a02b6f24a",
            "createdAt": "2023-04-06T21:16:21.321Z",
            "updatedAt": "2023-04-06T21:16:21.321Z",
            "__v": 0
        },
        {
            "_id": "6430ed5141edde8ddc9c697e",
            "company": "Uber",
            "position": "front-end developer",
            "status": "pending",
            "jobType": "full-time",
            "jobLocation": "my city",
            "createdBy": "6418d6ab92ff594a02b6f24a",
            "createdAt": "2023-04-08T04:28:01.216Z",
            "updatedAt": "2023-04-08T04:28:01.216Z",
            "__v": 0
        },
        {
            "_id": "6430ed6641edde8ddc9c6980",
            "company": "FLT",
            "position": "back-end developer",
            "status": "pending",
            "jobType": "full-time",
            "jobLocation": "my city",
            "createdBy": "6418d6ab92ff594a02b6f24a",
            "createdAt": "2023-04-08T04:28:22.851Z",
            "updatedAt": "2023-04-08T04:28:22.851Z",
            "__v": 0
        }
    ],
    "totalJobs": 4,
    "numOfPages": 1
}
```

It works!

## Front-End | All Jobs Page

Now like before we should have a:

1. Search Form
2. Job Cards
3. Pagination of Jobs

Job Cards have:
- job title / job position
- Location
- job type
- Status
- Date created
- Edit/Delete buttons

Now let's add the data to our state that we want to pass in to `getAllJobs`. 

```js
  res.status(StatusCodes.OK)
     .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
```

In `appContext`:

```js
const initialState = {
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
}
```

- An array that will store all the `jobs`
- The total amount of jobs, or `jobs.length`
- Number of Pages
- The initial page (usually first page, hardcoded)

## Actions for GetAllJobs

Let's create the actions to dispatch for All Jobs page.

```js
export const GET_JOBS_BEGIN = 'GET_JOBS_BEGIN';
export const GET_JOBS_SUCCESS = 'GET_JOBS_SUCCESS';
```

### Error Handling for All Jobs page

Notice we do not have `GET_JOBS_ERROR` like other previous actions.

Why do we omit the error?

Think about the scenarios that we would get an error.

|Scenario|To Do|
|--------|-----|
|Empty Array | Output - "No Jobs to Display" in the page |
| 401 Error / Unauthenticated | Logout User (already handled in interceptor)|
| 500 Error / Server is Down | Logout User |
| 400 Error | Logout User |
| 404 Error | Logout User |

Do we need to Alert in any of these cases? 

If you are getting 404 in the All Jobs page then there is something wrong with the application.

### Alerts in All Jobs Page

Alerts persist across pages and can be seen if you quickly navigate. For example, if user creates a job and heads over to all jobs page then they may see the alert. 

We need to clearAlert() before that happens, so add that in the reducer where `showAlert: false`.

## `getJobs` function in Global Context

Starting out the function we have to dispatch the action `GET_JOBS_BEGIN`. Then a `try..catch` that will handle the logic of getting data and updating the page. In the catch, we log the `error.response` then `logoutUser()` is invoked. Finally, after the `try..catch` we invoke `clearAlert()`.

```js
  const getJobs = async () => {
    dispatch({ type: GET_JOBS_BEGIN });

    try{

    } catch(error){
      console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };
```

Now to setup the logic of the fetch within the `try` block.
- Use `authFetch()` to get the `data` we need
- Pass in the `url` which will be `'/jobs'`
- Destructure `jobs`, `totalJobs` and `numOfPages` from the `data`
- Dispatch the `GET_JOBS_SUCCESS` action to update the state of All Jobs page
- Within that action, pass in the type and payload with the data we destructured out

```js
  const getJobs = async () => {
    let url = '/jobs';
    
    dispatch({ type: GET_JOBS_BEGIN });

    try{
      const data = authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages
        },
      });

    } catch(error){
      console.log(error.response);
      logoutUser();
    }
    clearAlert();
  };
```

Now let's pass the function down to the `value` prop. 

```js
  <AppContext.Provider value = {{..., getJobs, }}>
```

## Update All Jobs page through reducer

```js
    case GET_JOBS_BEGIN: {
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    }

    case GET_JOBS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        jobs: action.payload.jobs,
        totalJobs: action.payload.totalJobs,
        numOfPages: action.payload.numOfPages,
      };
    }
```

## Synchronizing `getJobs` with `useEffect` hook

React docs on [useEffect](https://react.dev/reference/react/useEffect).

`useEffect` is a React Hook that lets you **synchronize a component with an external system.**

```js
useEffect(setup, dependencies?);
```

Here is a stackoverflow post on [useEffect with no dependency array or an empty array](https://stackoverflow.com/questions/58579426/in-useeffect-whats-the-difference-between-providing-no-dependency-array-and-an).

- Giving it an empty array acts like `componentDidMount` as in, it only runs once.

- Giving it no second argument acts as both `componentDidMount` and `componentDidUpdate`, as in it runs first on mount and then on every re-render.

- Giving it an array as second argument with any value inside, eg , `[variable1]` will only execute the code inside your `useEffect` hook ONCE on mount, as well as whenever that particular variable (`variable1`) changes.

Here is the docs on the differences between dependencies [useEffect dependencies](https://react.dev/reference/react/useEffect#examples-dependencies).

Going to use `useEffect` hook for `getJobs` with an empty dependency array. It will act like `componentDidMount` and only run once.

## Front-End | Components

1. Search Form
2. Job Cards
3. Pagination of Jobs

Job Cards have:
- job title / job position
- Location
- job type
- Status
- Date created
- Edit/Delete buttons

Essentially this could be reduced to two container components:

1. Search Container
2. Jobs Container

We want to create those components and render them within the AllJobs component.

```js
import React from 'react';
import { JobsContainer, SearchContainer} from '../../components';

export default function AllJobs() {
  return (
    <>
      <SearchContainer />
      <JobsContainer />
    </>
  );
}
```

### JobsContainer component

JobsContainer will be using three components: the `Wrapper` styled-component, the `Job` component and the `Loading` component. 

The `useEffect` hook is used here. What I want: the moment the `JobsContainer` is rendered, then invoke `getJobs()` function. 

```js
import React from 'react';
import { useAppContext } from '../context/appContext';
import { useEffect } from 'react';
import Loading from './Loading';
import Job from './Job';
import Wrapper from '../assets/wrappers/JobsContainer';

export default function JobsContainer() {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
  } = useAppContext();

  useEffect(() => {
    getJobs()
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if(jobs.length === 0 ){
    return (
      <Wrapper>
        <h2>No Jobs to display...</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      
    </Wrapper>
  );
}
```

- `Loading` component conditionally renders when `isLoading` is `true`

```css
.loading {
  width: 6rem;
  height: 6rem;
  border: 5px solid var(--grey-400);
  border-radius: 50%;
  border-top-color: var(--primary-500);
  animation: spinner 2s linear infinite;
}
.loading-center {
  margin: 0 auto;
}
```

The component:

```js
import React from 'react';

export default function Loading() {
  return (
    <div className='loading'></div>
  );
}
```

Now upon testing, the Loading component isn't centered right away. 

So we want to pass in a prop called `center`. We do this because we may not always want the Loading component to be in the center.

```js
  if (isLoading) {
    return <Loading center />;
  }
```

Then update the component accordingly, and conditionally render:

```js
export default function Loading({ props }) {
  const { center } = props;

  return (
    <div className={center ? 'loading loading-center': 'loading'}></div>
  );
}
```

#### If the `jobs` array is empty (a length of 0) then render a simple heading that says "No jobs to display"


#### Working on the final piece to render

Let's dynamically render a heading based on the number of jobs found.

|totalJobs|output|
|---------|------|
|0| No jobs to display|
|1| 1 Job Found|
|2| 2 Jobs Found|
|n > 1 | n Jobs Found |

We want to add a `s` after "job" string when there is more than one.

```js
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
    </Wrapper>
  );
```

Then create a `div` that maps out each `job` to display, and renders a `Job` component for each.
Recall that in the array of `jobs`, it has an object job with properties such as company, position, status, jobType, jobLocation, createdBy, etc. 

There is one more property we can use to uniquely identify the specific job: `_id`. So use that as the key to uniquely identify it within the list. Pass that to the props.

Next props to pass down is all the information (properties) within the job I want to pass down as well, so spread out the `job` object and pass it down.

```js
<div className='jobs'>
  {jobs.map((job) => {
    return <Job key={job._id} {...job} />
  })}
</div>
```

Next display the pagination buttons that show when a totalJobs exceed a certain amount. For now, leave a comment to mark where it should be (right below the `jobs` div). 

### Job Component

Since we are passing down the props, let's update Job component accordingly.

To Format Dates in the `Job` components, going to use a package called [moment.js](https://momentjs.com/).

```sh
cd client

npm install moment --save
```

Now to add the date to the job we can do this:

```js
import React from 'react';
import moment from 'moment.js';

export default function Job({props}) {
  const { company, createdAt } = props;

  let date = moment(createdAt); 
  date = date.format('MMM Do, YYYY'); // Apr 14th 23

  return (
    <div>
      Job
      <h5>{company}</h5>
      <h5>{date}</h5>
    </div>
  );
}
```

We pull out the `createdAt` prop to use as a date, then format it with `moment`.


##### Setup placeholder functions for Job Component

Want to be able to `delete` and `edit` the job component, so should setup some placeholder function in `appContext`. For now it will just log the `id`, and the functionality will be implemented in depth later.

```js

  const setEditJob = (id) => {
    console.log(`set edit job: ${id}`);
  };

  const deleteJob = (id) => {
    console.log(`delete job : ${id}`);
  };

  value = {{ setEditJob, deleteJob, }}
```

### Job Component

```js
import React from 'react';
import moment from 'moment';
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/Job';

export default function Job({props}) {
  const {
    _id,
    position, 
    company, 
    jobLocation, 
    jobType, 
    createdAt, 
    status
  } = props;

  const {
    setEditJob,
    deleteJob,
  } = useAppContext();

  let date = moment(createdAt);
  date = date.format('MMM Do, YYYY'); // Apr 14th 23

  return (
    <Wrapper>
      <header>
        <div className="main-icon">{company.charAt(0)}</div>
        <div className="info">
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className="content">
        <footer>
          <div className="actions">
            <Link 
              to='/add-job'
              className="btn edit-btn"
              onClick={() => deleteJob(_id)}
            >
              Edit
            </Link>
            <button 
              type='button' 
              className='btn delete-btn' 
              onClick={()=> deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
}
```

#### JobInfo component

```js
import React from 'react';
import Wrapper from '../assets/wrappers/JobInfo';

export default function JobInfo(props) {
  const { icon, text } = props;

  return (
    <Wrapper>
      <span className="icon">{icon}</span>
      <span className="text">{text}</span>
    </Wrapper>
  );
}
```

Now in Job

```js
<div className="content">
  <div className="content-center">
    <JobInfo icon={<FaLocationArrow />} text={jobLocation} />
    <JobInfo icon={<FaCalendarAlt />} text={date} />
    <JobInfo icon={<FaBriefcase />} text={jobType} />
    <div className={`status ${status}`}>{status}</div>
  </div>
```

Notice the line:
```js
    <div className={`status ${status}`}>{status}</div>
```

in css wrapper:

```css
  .status {
    border-radius: var(--borderRadius);
    text-transform: capitalize;
    letter-spacing: var(--letterSpacing);
    text-align: center;
    width: 100px;
    height: 30px;
  }

    .pending {
    background: #fcefc7;
    color: #e9b949;
  }
  .interview {
    background: #e0e8f9;
    color: #647acb;
  }
  .declined {
    color: #d66a6a;
    background: #ffeeee;
  }
```

### SetEditJob

When we click on the Edit button, we want to change the values within the state. Namely, position, company, location, status and type. It also navigates to the add-job page with those values filled in.

First, let's edit the values in the state. Next, we will make a request to edit the values in the actual database. 

To do:

1. Set up the action `SET_EDIT_JOB`
2. Update the function `setEditJob` using `id` as a parameter, and dispatch the action
3. Also another function `editJob` that will be just a placeholder for now

  ```js
    const setEditJob = (id) => {
      console.log(`set edit job: ${id}`);

      dispatch({ type: SET_EDIT_JOB, payload: { id } });
    };

    const editJob = () => {
      console.log('edit job');
    }

    value = {{ ... , editJob }}
  ---

4. Now update the reducer to handle the action

```js
    case SET_EDIT_JOB: {
      return {
        ...state,
        isEditing: true,
      };
    }
```

5. In the reducer, the logic to handle `SET_EDIT_JOB`:

  - Grab the job based on the id passed in from the payload
  - TO do that, use the `jobs` array within the state and use `find()` the matching `_id`
  - Destructure the needed values out of the job
  - Update the current state by spreading it out, then change update the following values: isEditing, editJobId, position, company, jobLocation, jobType, and status

  ```js
      case SET_EDIT_JOB: {
      const job = state.jobs.find( (job) => job._id === action.payload.id);
      const {
        _id, position, company, jobLocation, jobType, status
      } = job;

      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      };
    }
  ```

### Update AddJob page with edit job

- Now what does `editJob` function do? It will be invoked in the `addJob` function. Head over to Add Job page and take out `editJob` function from the appContext.

- In the `handleSubmit` where we check for `isEditing` state value. Within it we invoke `editJob()`

Now we should see that all the state values in AppProvider context hooks are all filled out. 

## Backend | Edit Job

Now lets allow editing of the job in the server.

In `jobController.js`

```js
const updateJob = async (req, res) => {
  // Extract job ID from the request
  const { id: jobId } = req.params;

  // Extract company and position from the request's body
  const { company, position } = req.body;

  // Check if any of these values are empty
  if (!company || !position) {
    throw new BadRequestError('Please Provide All Values');
  }

  // Find the job in the database
  const job = await Job.findOne({ _id: jobId });

  // If job is not found
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  // Ways to approach -> Should check if allowed to update job
  // The newly updated job
  let updatedJob;

  res.status(StatusCodes.OK).json( { updatedJob });
};
```

Let's update the job in the database through `updatedJob`. We have to look for the job whose id matches and then pass in the request's body. We update the job with mongoose's [`findOneAndUpdate`](https://mongoosejs.com/docs/tutorials/findoneandupdate.html) function.

Here are the options we pass in:

- `new: true` - will return a new document after update is applied
- `runValidators: true` will specifically tell Mongoose to support validation on `findOneAndUpdate()` operation. See [Validation](https://mongoosejs.com/docs/validation.html#update-validators).
- run validators will check if the property is there and if the passed in value for it is empty or does not match value required in database then it will pass an error. Only runs on what you provide in the `req.body`

```js
const updatedJob = await Job.findOneAndUpdate({ _id: jobId}, req.body, {
  new: true,
  runValidators: true,
});
```

### Now let's test `updateJob` in Postman.

- Login, then GetAllJobs request

We have this:
```json
{
    "jobs": [
        {
            "_id": "6426b205fbdb9da6e1e5a3a5",
            "company": "Google",
            "position": "front-end developer",
            "status": "pending",
            "jobType": "full-time",
            ...
```

Pass in the job's `_id` (i.e., 6426b205fbdb9da6e1e5a3a5) into the Update Job URL.

So in Postman the Update Job request's URL is like this:

Patch | {{URL}}/jobs/6426b205fbdb9da6e1e5a3a5

Then click Body > raw > JSON

Then pass in these values:

```json
{
  "company": "Google (Edited)",
  "position": "full-stack developer",
  "status": "pending"
}
```

Now we have a 200 request with the JSON:

```json
{
    "updatedJob": {
        "_id": "6426b205fbdb9da6e1e5a3a5",
        "company": "Google (Edited)",
        "position": "full-stack developer",
        "status": "pending",
        "jobType": "full-time",
        "jobLocation": "my city",
        "createdBy": "6418d6ab92ff594a02b6f24a",
        "createdAt": "2023-03-31T10:12:21.562Z",
        "updatedAt": "2023-04-22T13:25:01.233Z",
        "__v": 0
    }
}
```

Notice, we can omit `status` and send a request that will work. But if we include `status` it must have among the `enum` values of pending, interview, declined. IF we passed in any other value then we will get a "something is not a valid enum value for path `status`.

## Alternative Approach to Updating the Job

In `jobController.js` some of the code remains the same

```js
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError('Please Provide All Values');
  }

  const job = await Job.findOne({ _id: jobId });

  if(!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  // ...

  res.status(StatusCodes.OK).json( { updatedJob });
};
```

But instead of `findOneAndUpdate()` operation we can take an alternative approach of updating the properties one-by-one.

We have access to the job. So we can do this:

```js
// Update properties one by one
job.position = position;
job.company = company;

await job.save();
res.status(StatusCodes.OK).json( { job });
```

So together:

```js
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;

  if (!company || !position) {
    throw new BadRequestError('Please Provide All Values');
  }

  const job = await Job.findOne({ _id: jobId });

  if(!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }

  job.position = position;
  job.company = company;

  await job.save();
  res.status(StatusCodes.OK).json( { job });
};
```

Then we go with `await job.save()` before sending a 200 code with job as a json.

### Why update the properties one-by-one rather than using `findOneAndUpdate()`?

The reason is because `findOneAndUpdate()` does not trigger the hook. Right now the `Job` model does not have a hook, but if it did then we should be aware of this fact. 

On the other hand, `await job.save()` will trigger the hook.

- Notice we are only updating the values we pulled out from the `req.body()` namely company and position.
- Just remember to pull out every value needed to update (e.g., `jobLocation`)

So add `job.jobLocation = jobLocation;`. But if not going to pass in `jobLocation` in the request altogether and in Job model the `default: 'my city'` is removed. Then it will trigger an error. `findOneAndUpdate()` will not have this issue.

This response will trigger an error in Postman if we went with alternative approach and are updating the `job.jobLocation = jobLocation`. 

```json
{
  "company": "Google (Edited)",
  "position": "full-stack developer"
} 
```

That's because as we destructure the value out of `req.body` in the line:

```js
  const { company, position, jobLocation } = req.body;
```

Then `jobLocation` will be `undefined`. Then we set it to `job.jobLocation` but we are looking for a value and not `undefined`.

## Checking Permissions

If for some reason, we logged in as another user and that different user has access to Miyuki's job `_id`, then that other user can edit it.
 
In the server:

```js
app.use('/api/v1/jobs', authenticateUser, jobsRouter);
```

This other user is authenticated, but should not have access to Miyuki's jobs to edit. 

Now a quick solution is just like in `getAllJobs`:

```js
const getAllJobs = async (req, res) => {
  // Find the jobs created the user from the request
  const jobs = await Job.find({ createdBy: req.user.userId });

  // Respond with 200 and a json containing the jobs, totalJobs, and pages
  res.status(StatusCodes.OK)
     .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
```

And in `updateJob`, we add two parameters in `Job.findOne()` with one being `_id: jobId` and the other being `createdBy`:

```js
const updateJob = async (req, res) => {
  const { id: jobId } = req.params;
  const { company, position } = req.body;
  if (!company || !position) {
    throw new BadRequestError('Please Provide All Values');
  }

  // Also add createdBy so find job based on jobId and userId
  const job = await Job.findOne({ _id: jobId, createdBy: req.user.userId });

  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`);
  }
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId}, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(StatusCodes.OK).json( { updatedJob });
};
```

We have the property `createdBy` and use it as well in `updateJob`. 

It works but the downside is that if there is an `admin` wants to modify something regarding the content. The adming cannot access and edit the jobs created by users. 

A better approach is to setup permissions. Check `userId` matches the one in the `job`

# Checking Permissions to Update Job

In the `updateJob` we can check permissions by comparing if the `userId` of the request is equivalent to the one who created the job accessed with the `createdBy()` property.

```js
// Check Permissions to allow Editing
req.user.userId(id) === job.createdBy(id);
// Does not match -> throw Unauthorized error
throw new UnAuthorizedError('Not authorized to access this route');

console.log(typeof req.user.userId);
console.log(typeof job.createdBy);
```

Go to the Postman, add the log statements in the `updateJob` and send a Patch request. We should see in the server console the types each are. 

```
[0] string
[0] object
PATCH /api/v1/jobs/6426b205fbdb9da6e1e5a3a5 200 94.142ms - 301
```

Notice that for `req.user.userId()` the id will be a string. Whereas `job.createdBy()` the id will be an object. If just comparing them with `===` then it would not work. We just have the basic logic out now.

WE can do this logic directly in the `updateJob()` operation in the `jobsController` but this logic can be re-used for other controllers (e.g., `deleteJob()`).

So let's setup a separate function to do this.

## Create `checkPermissions`

- Create a `utils` folder at the base of the project
- Inside, create `checkPermissions.js`
- Within the file, import `UnAuthorizedError` and create the function `checkPermissions` to export

```js
import { UnAuthorizedError } from '../errors/index.js';

export default function checkPermissions() {

};
```

This function will check the entire user object (which will be called `requestUser`) and the job id (which will be called `resourceUserId`).  These will be the paramaters.

Why check for the entire user object? Because we also want to check if the user object is the `admin`. If only comparing resource ids then admin can't do anything because they did not create the resource.

- If the user object is an admin, then we just proceed with the functionality (or just `return`).
- Compare the ids (where ids also have matching data types) then throw an error.

```js
import { UnAuthorizedError } from '../errors/index.js';

export default function checkPermissions(requestUser, resourceUserId) {
  // Check if user object is admin

  // Check if userId matches to that who created the resource
  if(requestUser.userId === resourceUserId.toString()) {
    return;
  }

  // Throw error in all other cases
  throw new UnAuthorizedError("Not authorized to access this route");
};
```

Now when we invoke this function in the `jobsController` what are the arguments to the params?

We pass in `req.user` to the `requestUser` param. And `job.createdBy` for the `resourceUserId`.


### Postman testing checkPermissions

Login again to reissue a new token. Then send a patch request to update job in Postman.

It should work with a Patch and 200.

If there ever is an error, it won't reach the `updatedJob` portion in controller:

```js
  // Check Permissions of the user
  checkPermissions(req.user, job.createdBy);

  // Find and update the job, run validation & return a new document
  const updatedJob = await Job.findOneAndUpdate({ _id: jobId}, req.body, {
    new: true,
    runValidators: true,
  });
```

Now let's run the request but with a different resource id, a job not created by the user logged in. Then we should also see the `401` unauthorized error.

# Delete functionality in the Server (Back-end)

Let's work on the `deleteJob` function in the `jobsController`.

It should

- Get `jobId` from the request
- Look for the `job` using `jobId`
- If search fails (job does not exist) then throw an error
- Check the permissions
- Delete the job using `remove()`
- Respond with successful status code. No data needed to be sent to the front-end, so just send a message that deletion was successful

```js
const deleteJob = async (req, res) => {
  const { id: jobId } = req.params;

  const job = await Job.findOne({ _id: jobId });

  if(!job){
    throw new NotFoundError(`No job with id: ${jobId}`);
  }

  checkPermissions(req.user, job.createdBy);

  await job.remove();

  res.send(StatusCodes.OK).json({ msg: 'Job removed successfully.' });
};
```

## Postman testing delete functionality

Now go to the Postman and append the id to the URL for the Delete request. Something like this:

`{{base_url}}/jobs/642f36a5429866ccdadb11c5`

Make sure to change the Authorization to type: Bearer Token under the Delete request.


## Issue: removing in mongoose

Another issue is that `job.remove()` is not recognized as a function so we need to find another way to remove the job object from the database.

After searching through, we found this:

[Mongoose findOne()](https://mongoosejs.com/docs/api/model.html#Model.findOne()) and [Model.deleteOne()](https://mongoosejs.com/docs/api/model.html#Model.prototype.deleteOne()) as `remove()` has been deprecated since v5.5.3 (see this [Stackoverflow response](https://stackoverflow.com/questions/5809788/how-do-i-remove-documents-using-node-js-mongoose)).

So replace `remove()` with `deleteOne()`. 

Also some other fixes is to change: 
- `res.send()` to `res.status()`.

Look into this error:
- [0] Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client 


**Important to note** that some methods bypass the middleware, in mongoose. See [Middleware](https://mongoosejs.com/docs/middleware.html). The method deleteOne() is a document middleware function where `this` refers to the document.

# Front-End | Edit & Delete functionality

Just like before we have to:

- Create the action to dispatch
- Create the function in appContext
- Handle the action in the reducer to update the state

For now, in the reducer we will just set `isLoading: true`

```js
    case DELETE_JOB_BEGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }
```

Now when implementing the function in global context, we want to make sure to call `getJobs()` because we want to synchronize the jobs in the state / localStorage with that of the database.

```js
  const deleteJob = async (jobId) => {
    dispatch({ type: DELETE_JOB_BEGIN });

    try {
      await authFetch.delete(`/jobs/${jobId}`);
      getJobs();
    } catch (error){
      console.log(error.response);
    }
  };
```

We want to `authFetch` to get the base URL and interceptors, and invoke `delete()`. Using a template string, we have `/jobs/${jobId}`

Then call `getJobs()` because it deletes it from database, not local state. So want to synchronize both front-end and back-end and by doing so we can also let `getJobs` change the `isLoading` back to false.


## Edit functionality for Front-End

What is different from delete and edit?

Delete is called within the component, or `AllJobs` page. On the other hand, edit redirects to a different component that is `AddJob`. 

- Create the action to dispatch

```js
export const EDIT_JOB_BEGIN = 'EDIT_JOB_BEGIN';
export const EDIT_JOB_SUCCESS = 'EDIT_JOB_SUCCESS';
export const EDIT_JOB_ERROR = 'EDIT_JOB_ERROR';
```

- Create the function in appContext
  1. dispatch the begin action
  2. Extract the needed values from the state
  3. With `authFetch` and `patch()` the particular job  with a dynmaic template string that contains the URL to the specific job (by passing in the param needed). Then pass all the data that needs to be updated inside the function.
  4. Dispatch success
  5. Clear Values to reset the form fields
  6. log any errors

```js
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });

    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.patch(`/jobs/${editJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });

      dispatch({
        type: EDIT_JOB_SUCCESS
      });

      dispatch({ CLEAR_VALUES });
      
    } catch(error){
      console.log(error);
    }
  }
```

Some changes to above:
- Needed to get `editJobId` and that is found within the `state` so it is `state.editJobId`
- Recall that if the user is Unauthorized and the error is `401` we need to return, user shouldn't be in the page in the first place
- Dispatch error in this case

```js
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });

    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.patch(`/jobs/${state.editJobId}`, {
        position,
        company,
        jobLocation,
        jobType,
        status,
      });

      dispatch({
        type: EDIT_JOB_SUCCESS
      });

      dispatch({ CLEAR_VALUES });

    } catch(error){
      if(error.response.status === 401) {
        return;
      }
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert();
  };
```

- Handle the action in the reducer to update the state

Let's setup the cases in the reducer to handle the actions:

```js
    case EDIT_JOB_BEGIN: {
      return {
        ...state,
      };
    }

    case EDIT_JOB_SUCCESS: {
      return {
        ...state,
      };
    }

    case EDIT_JOB_ERROR: {
      return {
        ...state,
      };
    }
```

We need to update the loading, alerts and alert type/text. 

```js
    case EDIT_JOB_BEGIN: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case EDIT_JOB_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertType: 'success',
        alertText: 'Job Updated!',
      };
    }

    case EDIT_JOB_ERROR: {
      return {
        ...state,
        isEditing: false,
        isLoading: false,
        showAlert: true,
        alertType: 'danger',
        alertText: action.payload.msg,
      };
    }
```

# Debugging Edit functionality

## Issue on clicking Edit button it calls Delete instead

Problem is that every time we click `Edit` button it invokes a DELETE request.

### Solution: bug found, both onClick handlers are using delete function in `Job` component


## Issue cannot destructure property

In the developer tool's console: 
```sh
reducer.js:234 Uncaught TypeError: Cannot destructure property '_id' of 'job' as it is undefined.
```

SO let's do some extensive error logging in the reducer to find out what's going on.

```js
    case SET_EDIT_JOB: {
      console.log("-------- Reducer: SET_EDIT_JOB --------");

      const job = state.jobs.find( (job) => job._id === action.payload.id);

      console.log(`
      -------- job variable --------

      ${job}
      
      -------- end of job variable --------`);

      const {
        _id, position, company, jobLocation, jobType, status
      } = job;

      console.log(` 
      -------- destructured properties of job variable --------

      _id: ${job._id}
      position: ${job.position}
      company: ${job.company}
      jobLocation: ${job.jobLocation}
      jobType: ${job.jobType}
      status: ${job.status}

      -------- end of destructured properties --------`);

      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      };
    }
```

Result

```sh
set edit job: 644814de8e952783acf46457
reducer.js:232 -------- Reducer: SET_EDIT_JOB --------
reducer.js:236 
      -------- job variable --------

      undefined
      
      -------- end of job variable --------
reducer.js:232 -------- Reducer: SET_EDIT_JOB --------
reducer.js:236 
      -------- job variable --------

      undefined
      
      -------- end of job variable --------
```

A common issue for undefined variables is asynchronous, usually have to wait for it to be initialized with data so need to setup `async/await`, `Promise` to `resolve` / `reject` to use `.then()`.

But after some checking, it is not the case and this is the front-end where we have access to state. 

So added more logging, this time on the `state.jobs` variable which is an array of jobs. Using `Object.entries()` we print out every entry:

```js
      for(let entry of Object.entries(state.jobs)){
        console.log(entry);
      }
```

The result is 
```json
[
    "0",
    {
        "_id": "6426b205fbdb9da6e1e5a3a5",
        "company": "Google (Edit)",
        "position": "front-end developer",
        "status": "pending",
        "jobType": "full-time",
        "jobLocation": "my city",
        "createdBy": "6418d6ab92ff594a02b6f24a",
        "createdAt": "2023-03-31T10:12:21.562Z",
        "updatedAt": "2023-04-24T06:15:31.359Z",
        "__v": 0
    }
]
[
    "1",
    {
        "_id": "6430ed5141edde8ddc9c697e",
        "company": "Uber",
        "position": "front-end developer",
        "status": "pending",
        "jobType": "full-time",
        "jobLocation": "my city",
        "createdBy": "6418d6ab92ff594a02b6f24a",
        "createdAt": "2023-04-08T04:28:01.216Z",
        "updatedAt": "2023-04-08T04:28:01.216Z",
        "__v": 0
    }
]
[
    "2",
    {
        "_id": "6447615520382764f288d790",
        "company": "EIEN",
        "position": "vtuber",
        "status": "pending",
        "jobType": "full-time",
        "jobLocation": "my city",
        "createdBy": "6418d6ab92ff594a02b6f24a",
        "createdAt": "2023-04-25T05:12:53.868Z",
        "updatedAt": "2023-04-25T05:12:53.868Z",
        "__v": 0
    }
]
[
    "3",
    {
        "_id": "644814de8e952783acf46457",
        "company": "test",
        "position": "test",
        "status": "pending",
        "jobType": "full-time",
        "jobLocation": "Hachioji (Kanto, Tokyo)",
        "createdBy": "6418d6ab92ff594a02b6f24a",
        "createdAt": "2023-04-25T17:58:54.823Z",
        "updatedAt": "2023-04-25T17:58:54.823Z",
        "__v": 0
    }
]
```

So we actually do have the `_id` property and it is not undefined, the issue lies in destructuring or trying to extract it properly as it is contained within an array and the 2nd part is the object that contains the property.

Let's go one step further and try to iterate through the values of the array. Let's log what we get first:

```js
      console.log(`Printing out every value within jobs:`);

      console.log('---- Iterating via for-loop -> "state.jobs[i]"')
      for(let i=0; i<state.jobs.length; i++){
        console.log(state.jobs[i]);
      }

      console.log('---- Iterating via for-of -> "Object.values(state.jobs)"')
      for(let value of Object.values(state.jobs)){
        console.log(value);
      }
```

```sh
Printing out every value within jobs:

reducer.js:255 ---- Iterating via for-loop -> "state.jobs[i]"
reducer.js:257 {_id: '6426b205fbdb9da6e1e5a3a5', company: 'Google (Edit)', position: 'front-end developer', status: 'pending', jobType: 'full-time', …}
reducer.js:257 {_id: '6430ed5141edde8ddc9c697e', company: 'Uber', position: 'front-end developer', status: 'pending', jobType: 'full-time', …}
reducer.js:257 {_id: '6447615520382764f288d790', company: 'EIEN', position: 'vtuber', status: 'pending', jobType: 'full-time', …}
reducer.js:257 {_id: '644814de8e952783acf46457', company: 'test', position: 'test', status: 'pending', jobType: 'full-time', …}

reducer.js:260 ---- Iterating via for-of -> "Object.values(state.jobs)"
reducer.js:262 {_id: '6426b205fbdb9da6e1e5a3a5', company: 'Google (Edit)', position: 'front-end developer', status: 'pending', jobType: 'full-time', …}
reducer.js:262 {_id: '6430ed5141edde8ddc9c697e', company: 'Uber', position: 'front-end developer', status: 'pending', jobType: 'full-time', …}
reducer.js:262 {_id: '6447615520382764f288d790', company: 'EIEN', position: 'vtuber', status: 'pending', jobType: 'full-time', …}
reducer.js:262 {_id: '644814de8e952783acf46457', company: 'test', position: 'test', status: 'pending', jobType: 'full-time', …}
```

Alright we got closer to the problem statement now: the issue is that when `find()` an array method is used, it's going through another set of array (which do not have the `_id` property) that contain the index and the actual javascript `job` object that contains the property

```js
const job = state.jobs.find( (job) => job._id === action.payload.id);
```

Needs to be changed to:
```js
const job = Object.values(state.jobs).find( (job) => 
  job._id === action.payload.id
);
```

Another issue before this is that:
```js
console.log(`action.payload.id: ${action.payload.id}`);
```

```sh
action.payload.id: undefined
```

So the comparison isn't working out.

That's because we renamed `id` to `jobId` in the payload we passed in:

```js
  const setEditJob = async (jobId) => {
    console.log(`set edit job: ${jobId}`);

    dispatch({
      type: SET_EDIT_JOB,
      payload: { jobId } 
    });
  };
```

So change it in reducer as well to `action.payload.jobId`.

Now we successfully can find the job using its `jobId`.

## New problem: action is undefined

Now when we do `Edit` the job and it sends us to Add Page with `Edit Job`. All the values are in place in the form. But when we hit submit, the developer tool's console then leads to 

```sh
reducer.js:357 Uncaught Error: No such action: undefined
    at reducer (reducer.js:357:1)
    at updateReducer (react-dom.development.js:16664:1)
    at Object.useReducer (react-dom.development.js:17898:1)
    at useReducer (react.development.js:1626:1)
    at AppProvider (appContext.js:65:1)
    at renderWithHooks (react-dom.development.js:16305:1)
    at updateFunctionComponent (react-dom.development.js:19588:1)
    at beginWork (react-dom.development.js:21601:1)
    at HTMLUnknownElement.callCallback (react-dom.development.js:4164:1)
    at Object.invokeGuardedCallbackDev (react-dom.development.js:4213:1)
```

Which means this line in reducer is invoked:
```js
default: {
  throw new Error(`No such action: ${action.type}`);
}
```

It happens when we hit the submit button after click "Edit" on a job from All-Jobs page.

Looking into the Add Job page we see the submit handler:

```js
  const handleSubmit = (e) => {
    e.preventDefault();

    if(!position || !company || !jobLocation){
      displayAlert();
      return;
    }

    if(isEditing){
      editJob();
      return;
    }

    createJob();
  };
```

So it invokes `editJob()`, which is the function passed down from appContext:

```js
  const editJob = async () => {
    dispatch({ type: EDIT_JOB_BEGIN });

    try {
      const { position, company, jobLocation, jobType, status } = state;

      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });

      dispatch({
        type: EDIT_JOB_SUCCESS,
      });

      dispatch({ CLEAR_VALUES });

    } catch(error){
      if(error.response.status === 401) {
        return;
      }
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert();
  };
```

Let's start doing some error logging.

The thing is in the server a successful patch request is sent:
```sh
[0] GET /api/v1/jobs 200 39.789 ms - 1129
[0] GET /api/v1/jobs 304 39.613 ms - -
[0] PATCH /api/v1/jobs/644814de8e952783acf46457 200 85.776 ms - 292
```
It just lands us on a different page.

## Found the issue of undefined action!

After extensive error logging we can see that:
```js
      dispatch({ CLEAR_VALUES });
```

Have to prepend the action with `type`.

## The extensive error logging for `setEditJob()`

```js
  const editJob = async () => {
    console.log("======== editJob begin ========");
    dispatch({ type: EDIT_JOB_BEGIN });
    console.log("-------- dispatched EDIT_JOB_BEGIN --------");
    try {
      const { position, company, jobLocation, jobType, status } = state;
      console.log("-------- destructured values from state --------");
      console.log("-------- before the autchFetch.patch --------");
      await authFetch.patch(`/jobs/${state.editJobId}`, {
        company,
        position,
        jobLocation,
        jobType,
        status,
      });
      console.log("-------- after the autchFetch.patch --------");

      dispatch({ type: EDIT_JOB_SUCCESS });
      console.log("-------- after dispatching EDIT_JOB_SUCCESS --------");

      dispatch({ type: CLEAR_VALUES });
      console.log("-------- after dispatching CLEAR_VALUES --------");

    } catch(error){
      if(error.response.status === 401) {
        return;
      }
      dispatch({
        type: EDIT_JOB_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    console.log("-------- Invoking clearAlert() --------");
    clearAlert();
    console.log("======== editJob end ========");
  };
```

## The extensive error logging of `SET_EDIT_JOB` in the reducer

```js
    case SET_EDIT_JOB: {
      console.log("-------- Reducer: SET_EDIT_JOB --------");

      console.log(`
      -------- jobs --------

      state.jobs:
        ${state.jobs}
      
      `);

      console.log(`
      typeof state.jobs:
        ${typeof state.jobs}
      `);

      console.log(`Printing out every entry within jobs:`);

      for(let entry of Object.entries(state.jobs)){
        console.log(entry);
      }

      console.log(`Printing out every value within jobs:`);

      console.log('---- Iterating via for-loop -> "state.jobs[i]"')
      for(let i=0; i<state.jobs.length; i++){
        console.log(state.jobs[i]);
      }

      console.log('---- Iterating via for-of -> "Object.values(state.jobs)"')
      for(let value of Object.values(state.jobs)){
        console.log(value);
      }
      
      console.log(typeof Object.values(state.jobs));
      console.log(Object.values(state.jobs));
      console.log(`------- end of jobs --------`);

      console.log(`action.payload.id: ${action.payload.jobId}`);

      const job = Object.values(state.jobs).find( (job) => 
        job._id === action.payload.jobId
      );

      // let job;

      // for(let value of Object.values(state.jobs)){
      //   if(value._id === action.payload.jobId){
      //     job = value;
      //   }
      // }

      console.log(`
      -------- job variable --------

      job: 
        ${job}

      -------- end of job variable --------`);

      const {
        _id, position, company, jobLocation, jobType, status
      } = job;

      console.log(` 
      -------- destructured properties of job variable --------

      _id: ${job._id}
      position: ${job.position}
      company: ${job.company}
      jobLocation: ${job.jobLocation}
      jobType: ${job.jobType}
      status: ${job.status}

      -------- end of destructured properties --------`);

      return {
        ...state,
        isEditing: true,
        editJobId: _id,
        position,
        company,
        jobLocation,
        jobType,
        status,
      };
    }
```

---

# Glaring Issue: Exhaustive Dep

Either include dependency array or leave it out in `useEffect` hook where we `getJobs`. Fix this later as it does not synchronize the jobs array correctly

After some debugging, came across another error:

```sh
Proxy error: Could not proxy request /api/v1/jobs from localhost:3000 to http://localhost:4000/.
See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNREFUSED).
```

[Stack overflow post on Could not proxy request in React App](https://stackoverflow.com/questions/45367298/could-not-proxy-request-pusher-auth-from-localhost3000-to-http-localhost500).
---

## Attempt to Solve `exhaustive-deps` lint rule

Link to [Github issue](https://github.com/facebook/react/issues/14920).

Original Code: 

```js
  const getJobs = async () => {
    let url = `/jobs`;
    
    dispatch({ type: GET_JOBS_BEGIN });

    try{
      const data = authFetch(url);
      const { jobs, totalJobs, numOfPages } = data;

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages
        },
      });

    } catch(error){
      console.log(error.response);
      // logoutUser();
    }
    clearAlert();
  };

  useEffect( () => {
    getJobs();
  }, []);
```

Changed code:

```js
```

## Issue -> Backend works in POSTMAN the Get request to jobs gives a `200`

In Postman:
```sh
[0] POST /api/v1/auth/login 200 139.552 ms - 379
[0] -------- Authenticate Middleware --------
[0] [token]:
[0]       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE4ZDZhYjkyZmY1OTRhMDJiNmYyNGEiLCJpYXQiOjE2ODE5MDkxMzcsImV4cCI6MTY4MTk5NTUzN30.PIBvV1CZox56LEHiufrdlLfCZhnb3IsykJZoYg6T3iQ
[0] [payload]:   [object Object]
[0] [userId]:    6418d6ab92ff594a02b6f24a
[0] ----- End of Authenticate Middleware -----
[0] GET /api/v1/jobs 200 43.069 ms - 1424
```

but in Front-End we have:
```sh
[0] -------- Authenticate Middleware --------
[0] [token]:
[0]       eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE4ZDZhYjkyZmY1OTRhMDJiNmYyNGEiLCJpYXQiOjE2ODE4ODM1NDksImV4cCI6MTY4MTk2OTk0OX0.gnJo_MQ_NWr3qIR0PXQN01gpd4ATYk4ExtA1dofq_NM
[0] [payload]:   [object Object]
[0] [userId]:    6418d6ab92ff594a02b6f24a
[0] ----- End of Authenticate Middleware -----
[0] GET /api/v1/jobs 304 85.918 ms - -
```

A 304 Response.

> A 304 status code indicates that a conditional GET or HEAD request has been received and would have resulted in a 200 (OK) response if it were not for the fact that the condition evaluated to false.

> This means that the requested resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match

> Postman may be caching the response and sending a new request with updated headers, which is why you are getting a 200 status code

### Some Changes in appContext

```js
  const getJobs = async () => {
    let url = `/jobs`;
    
    dispatch({ type: GET_JOBS_BEGIN });

    try {
      // Added await
      const data = await authFetch(url);
      
      console.log(`Data from authFetch: 
        ${data}`);
```

Now originally, without `await`, the dev tools console would print out [object Promise]. With `await` now it logs [object Object] which is what we want.

### WE ARE GETTING SOMEWHERE

Ok so I logged a couple more things here:

```js
  const getJobs = async () => {
    let url = `/jobs`;
    
    dispatch({ type: GET_JOBS_BEGIN });

    try {
      const data = await authFetch(url);
      
      console.log(`Data from authFetch: 
        ${data}`);

      console.log("-------- Printing out values of data --------")
      let i = 0;
      for (let value of Object.values(data)){
        console.log(`value ${i++} is`);
        console.log(value);
      }
      console.log("--------End of data --------")


      const { jobs, totalJobs, numOfPages } = data;

      console.log(`
      jobs: \t\t ${jobs}
      totalJobs: \t ${totalJobs}
      numOfPages: \t ${numOfPages}`
      );
```

And look at the result in the developer tools!

```sh
Data from authFetch: 
        [object Object]
appContext.js:269 -------- Printing out values of data --------
appContext.js:272 value 0 is
appContext.js:273 {jobs: Array(5), totalJobs: 5, numOfPages: 1}jobs: Array(5)0: {_id: '6426b205fbdb9da6e1e5a3a5', company: 'Google', position: 'front-end developer', status: 'pending', jobType: 'full-time', …}1: {_id: '642f36a5429866ccdadb11c5', company: 'Uber', position: 'Front-End Developer', status: 'pending', jobType: 'full-time', …}2: {_id: '6430ed5141edde8ddc9c697e', company: 'Uber', position: 'front-end developer', status: 'pending', jobType: 'full-time', …}3: {_id: '6430ed6641edde8ddc9c6980', company: 'FLT', position: 'back-end developer', status: 'pending', jobType: 'full-time', …}4: {_id: '643f8548d3058bdd9f527b10', company: 'FLT', position: 'front-end developer', status: 'pending', jobType: 'full-time', …}length: 5[[Prototype]]: Array(0)numOfPages: 1totalJobs: 5[[Prototype]]: Objectconstructor: ƒ Object()hasOwnProperty: ƒ hasOwnProperty()isPrototypeOf: ƒ isPrototypeOf()propertyIsEnumerable: ƒ propertyIsEnumerable()toLocaleString: ƒ toLocaleString()toString: ƒ toString()valueOf: ƒ valueOf()__defineGetter__: ƒ __defineGetter__()__defineSetter__: ƒ __defineSetter__()__lookupGetter__: ƒ __lookupGetter__()__lookupSetter__: ƒ __lookupSetter__()__proto__: (...)get __proto__: ƒ __proto__()set __proto__: ƒ __proto__()
appContext.js:272 value 1 is
appContext.js:273 200
appContext.js:272 value 2 is
appContext.js:273 OK
appContext.js:272 value 3 is
appContext.js:273 AxiosHeaders {access-control-allow-headers: '*', access-control-allow-methods: '*', access-control-allow-origin: '*', content-encoding: 'gzip', content-type: 'application/json; charset=utf-8', …}access-control-allow-headers: "*"access-control-allow-methods: "*"access-control-allow-origin: "*"content-encoding: "gzip"content-type: "application/json; charset=utf-8"date: "Wed, 19 Apr 2023 13:46:25 GMT"etag: "W/\"590-V65cvvMK/K/Kx3+H7OARAgGh1Yw\""vary: "Accept-Encoding"x-powered-by: "Express"Symbol(Symbol.toStringTag): (...)[[Prototype]]: Object
appContext.js:272 value 4 is
appContext.js:273 {transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
appContext.js:272 value 5 is
appContext.js:273 XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
appContext.js:275 --------End of data --------
appContext.js:280 
      jobs: 		 undefined
      totalJobs: 	 undefined
      numOfPages: 	 undefined
```


To understand this look at what it was before:

```js
  const data = await authFetch(url);

  const { jobs, totalJobs, numOfPages } = data;
```

Which is trying to destructure `data` or the entire response. But the response comes in an object. Used `Object.values()` to print out the values within that data object.

Let's clean it up using `Object.entries()`. And see the console:

```sh
-------- Printing out values of data --------
appContext.js:277 (2) ['data', {…}]0: "data"1: jobs: (5) [{…}, {…}, {…}, {…}, {…}]numOfPages: 1totalJobs: 5[[Prototype]]: Objectlength: 2[[Prototype]]: Array(0)
appContext.js:277 (2) ['status', 200]0: "status"1: 200length: 2[[Prototype]]: Array(0)
appContext.js:277 (2) ['statusText', 'OK']0: "statusText"1: "OK"length: 2[[Prototype]]: Array(0)
appContext.js:277 (2) ['headers', AxiosHeaders]0: "headers"1: AxiosHeaders {access-control-allow-headers: '*', access-control-allow-methods: '*', access-control-allow-origin: '*', content-encoding: 'gzip', content-type: 'application/json; charset=utf-8', …}length: 2[[Prototype]]: Array(0)
appContext.js:277 (2) ['config', {…}]0: "config"1: {transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}length: 2[[Prototype]]: Array(0)
appContext.js:277 (2) ['request', XMLHttpRequest]0: "request"1: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}length: 2[[Prototype]]: Array(0)
appContext.js:279 --------End of data --------
      jobs: 		 undefined
      totalJobs: 	 undefined
      numOfPages: 	 undefined
```

# FIXED THE ISSUE OF STATE VALUE OF `jobs` being undefined.

- At first thought the problem was that the appContext or global context was not being passed down or passing down jobs array. But it would be an empty array and not `undefined`. Same goes with `totalJobs` and `numOfPages` for being undefined and not default values.

- Next start to go step by step. Tested backend, tested postman. Following from the server, to this line `app.use('/api/v1/jobs', authenticateUser, jobsRouter);` then did extensive error logging for authenticate middleware and jobsRouter.

- Then looked into `jobsController` and `Job` model. None of these were the issue yet. Postman has a 200 response so it is still good. Its just the front end. 

- Finally, started logging and isolating the problem to the front end. 

The main issue is that `jobs` array and `jobs.length` are being evaluated to undefined. So somehow, someway perhaps in the appContext and maybe in the function that these values are just not evaluating.

AS one can see from the console in developer tools, we hhave the response as an object named `data`.

This data object can be displayed like this:

```js
let data = {
  data: {...},
  status: 200,
  statusText: OK,
  headers: AxiosHeaders,
  config: {...},
  request: XMLHttpRequest
}
```

AS you can see, `data` itself is a nested prop of `data` object. Within that `data` property is lo and behold:

```js
(2) ['data', {…}]
  0: "data"
  1 : 
    > jobs : (5) [{…}, {…}, {…}, {…}, {…}] 
      numOfPages : 1
      totalJobs : 5
    > [[Prototype]] :  Object
  length: 2
  > [[Prototype]] : Array(0)
```

IT IS WHERE OUR `jobs` array and `numOfPages` and `totalJobs` are!!!!!

HOORAY, WE FOUND THE ISSUE!

## getJobs debugged

```js

 const getJobs = async () => {
    let url = `/jobs`;
    
    dispatch({ type: GET_JOBS_BEGIN });

    try {
      const data = await authFetch(url);
      
      console.log(`Data from authFetch: 
        ${data}`);

      console.log("-------- Printing out values of data --------")
      // let i = 0;
      // for (let value of Object.values(data)){
      //   console.log(`value ${i++} is`);
      //   console.log(value);
      // }

      for (let entry of Object.entries(data)){
        console.log(entry);
      }
      console.log("--------End of data --------")

      const { jobs, totalJobs, numOfPages } = data.data;

      console.log(`
      jobs: \t\t ${jobs}
      totalJobs: \t ${totalJobs}
      numOfPages: \t ${numOfPages}`
      );

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });

    } catch(error){
      console.log(`Error triggered in getJobs() appContext.js! 
      Here is the Error Response:
      ${error.response}`);
      // logoutUser();
    }
    clearAlert();
  };

  // useEffect( () => {
  //   getJobs();
  // }, []);
  ```

## Fixed the issue of undefined state values -> `jobs`, `totalJobs` and `numOfPages`

So now when we destructure the values out, instead of

```js
const { jobs, totalJobs, numOfPages } = data;
```

It is:

```js
const { jobs, totalJobs, numOfPages } = data.data;
```

Now let's go see the developer tools > Components > App Provider > hooks 

and lo and behold, our issue is finally fixed. The state is finally updated!!!!

```js
hooks
[
  {
    "name": "Reducer",
    "value": {
      "isLoading": false,
      "showAlert": false,
      "alertText": "",
      "alertType": "",
      "user": "{__v: 0, _id: \"6418d6ab92ff594a02b6f24a\", email: \"M…}",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDE4ZDZhYjkyZmY1OTRhMDJiNmYyNGEiLCJpYXQiOjE2ODE4ODM1NDksImV4cCI6MTY4MTk2OTk0OX0.gnJo_MQ_NWr3qIR0PXQN01gpd4ATYk4ExtA1dofq_NM",
      "userLocation": "Hachioji (Kanto, Tokyo)",
      "showSidebar": false,
      "position": "",
      "company": "",
      "jobLocation": "Hachioji (Kanto, Tokyo)",
      "jobTypeOptions": "[\"full-time\", \"part-time\", \"remote\", \"internship\"]",
      "jobType": "full-time",
      "statusOptions": "[\"interview\", \"declined\", \"pending\"]",
      "status": "pending",
      "isEditing": false,
      "editJobId": "",
      "jobs": "[{…}, {…}, {…}, {…}, {…}]",
      "totalJobs": 5,
      "numOfPages": 1,
      "page": 1
    },
    "subHooks": [],
    "hookSource": {
      "lineNumber": 3439,
      "functionName": "AppProvider",
      "fileName": "http://localhost:3000/static/js/bundle.js",
      "columnNumber": 78
    }
  }
]
```

YEAHHHHH!!!! WE GOT IT.

# Fix prop passing for `Job` and `Loading` component

Fixed the issue of destructuring props. Instead of `{props}` in the parameter just put `props`:

```js
export default function Loading(props) {
```

likewise in Job:

```js
export default function Job(props) {
  const {
    _id,
    position, 
    company, 
    jobLocation, 
    jobType, 
    createdAt, 
    status
  } = props;
```

# Only remaining issue is 304 - HTTP Not Modified

Get request has been receieved and would result in a 200 response if it were not for the fact that the condition evaluated to false. 

Have to look deeper into this one later.

Everytime we navigate to the All Jobs page we get a `GET 304 /api/v1/jobs`

```sh
[0] GET /api/v1/jobs 304 39.820 ms - -
```

# Mock Data

We will want some mock data. We will use [Mockaroo](https://mockaroo.com/) to setup test data for the application.

There is:

- Field Name
- Type
- Options

Here are the fields I put:

|Field Name|Type|Options|
|----------|----|-------|
|company| Company Name | --- |
|position| Job Title | --- |
|jobLocation| City | --- |
|jobType| Custom List | full-time, part-time, remote, internship |
| status | Custom List | interview, declined, pending |
| createdBy | Regular Expression | ^6[a-f0-9]{23}$ |
| createdAt | Datetime | 01/01/2022 to 01/01/2023 format: ISO 8601 (UTC) |

Then at the bottom banner it says [Generate Data] [Preview] [Save AS...] [Derive From Example] [More] buttons.

Let's click the Preview to confirm that it will create the data we want.

Here are some sample regex expression that satisfied these requirements:
- 24 characters long
- Starts with 6
- Rest of the characters are hexadecimal

`^6[a-f0-9]{23}$`

With this in place, let's check the `Preview` to see if this is the type of data we would like. If so, then click the `Generate Data`.

This would produce a file in your Downloads folder called `MOCK_DATA.json`. Put this at the root of our project.

## Filling the database with realistic looking data

Let's populate our database with the mock data we generated.

Create `populate.js` at the root of the project.

This script will populate our databse with the mock data from `MOCK_DATA.json`.

To do so we need to use Node.js [File System](https://nodejs.org/api/fs.html#fspromisesreadfilepath-options), or more specifically its `fsPromises.readFile()` method. To asycnhronously read the entire contents of the file.

Here is an example of reading a `package.json`:

```js
import { readFile } from 'node:fs/promises';
try {
  const filePath = new URL('./package.json', import.meta.url);
  const contents = await readFile(filePath, { encoding: 'utf8' });
  console.log(contents);
} catch (err) {
  console.error(err.message);
}
```

Next we need to import the following:
- dotenv (to use our `.env` file)
- `connectDB` method from our `db` folder
- `Job` model

So in `populate.js:`

```js
import { readFile } from 'fs/promises';

import dotenv from 'dotenv';
dotenv.config();

import connectDB from './db/connect.js';
import Job from './models/Job.js';
```

Next we create the function `populate()`

```js

async function populate(){

}

populate();
```

and immediately invoke it after.

Let's setup the `try..catch`, then asynchronously connect to the database. After that we try to read the file from `MOCK_DATA.json` while making sure to parse it.

Also make a meaningful error message in the `catch`, and exiting the process of Node.js with a status code of 1. See [Node.js process.exit](https://nodejs.org/api/process.html#processexitcode).

```js
async function populate(){
  try{
    await connectDB(process.env.MONGO_URL);
    
    const jsonProducts = JSON.parse(
      await readFile(new URL('./mock-data.json', import.meta.url))
    );

  } catch(error){
    console.log(`Error occured in populate: ${error}`);
    console.log(error.message);
    process.exit(1);
  }
}
```

Finally create a `Job` out of the `jsonProducts` data we were able to parse from the file.

# Structure of the Stats Page

The Stats page will be made via MongoDB's [Aggregation Pipeline](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/).

An aggregation pipeline consists of one or more stages that process documents:

- Each stage performs an operation on the input documents. e.g., a stage can filter documents, group documents, and calculate values
- The documents that are output from a stage are passed to the next stage
- An aggregation piepline can return results for groups of documents. e.g., return the total, average, maximum, and minimum values

To use the Aggregation Pipeline in our controller, we need to consult mongoose's [Aggregate](https://mongoosejs.com/docs/api/aggregate.html) method.

Let's create the function `showStats` in the job controller which should aggregate the Job documents by first matching the ones created by the user, then grouping up by status. 

Import mongoose in `jobsController` to use the aggregation methods

```js
import mongoose from 'mongoose';

const showStats = async (req, res) => {

  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  res.status(StatusCodes.OK).json({ stats });
};
```
- Get the all the job documents who matches the user
- Group them by their status, and give a count of 1
- The result of aggregate are JavaScript objects
- Reduce the objects to calculate a single value based on the array. Using JavaScript's [reduce](https://javascript.info/array-methods#reduce-reduceright) method.
```js
import mongoose from 'mongoose';

const showStats = async (req, res) => {
  
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

    stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  res.status(StatusCodes.OK).json({ stats });
};
```

## Using default stats

If any of the stats for the `status` of a job are empty, then set it to 0. We create a set of defaultStats which will determine a stat for every job status, and only set to 0 if nullish.

```js
jobsController.js;

const showStats = async (req, res) => {

  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  res.status(StatusCodes.OK).json({ defaultStats });
};
```

We will also store an array that determines the amount of monthly applications the user has made.

ALl of this we will respond as an OK status code along with parsing the `defaultStats` and `monthlyApplications`.

```js
jobsController.js;

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };
  let monthlyApplications = [];
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
```

## Stats | Back-End | Testing

In Postman, try to send a GET request in the stats url. Make sure to setup the Bearer token in Authorization.

### 1st Error -> Cannot invoke mongoose's ObjectId without new

In jobsController add `new` keyword before invoking `ObjectId`.

```js
  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);
```

### 2nd Error -> `stats.reduce` is not a function

Did some extensive error logging. Let's save the current version of `showStats`:

```js
const showStats = async (req, res) => {
  console.log("======== Starting Show Stats | Backend ========");

  let stats = await Job.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  console.log(`Finished Job.aggregate(), logging stats:
  type of stats: ${typeof stats}
  stats: ${stats}`);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = [];
  
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};
```

Another error we see is that we have duplicate code. SO it is resulting in the 2nd `stats` not being treated as an array which contains the `reduce()` method. So it should be removed.

### Postman testing

Finally the next GET request to `{{base_url}}/jobs/stats` is sent, and we finally get a proper response in JSON:

```json
{
    "defaultStats": {
        "pending": 4,
        "interview": 0,
        "declined": 0
    },
    "monthlyApplications": []
}
```

So the back-end works! Right now monthlyApplications are empty. 

## Stats Page | Front-End

First we create the actions in `actions.js`:

```js
export const SHOW_STATS_BEGIN = 'SHOW_STATS_BEGIN';
export const SHOW_STATS_SUCCESS = 'SHOW_STATS_SUCCESS';
```

and import these to appContext and reducer:
```js
  SHOW_STATS_BEGIN,
  SHOW_STATS_SUCCESS,
```

Next we update the state for appContext.

Then in showStats function we should start dispatching the actions, `authFetch` the route, dispatch another action with payload containing the `defaultStats` and `monthlyApplications`.

```js
const showStats = async () => {
  dispatch({ type: SHOW_STATS_BEGIN });

  const url = '/jobs/stats';

  try{
    const { data } = await authFetch(url);

    dispatch({
      type: SHOW_STATS_SUCCESS,
      payload: {
        stats: data.defaultStats,
        monthlyApplications: data.monthlyApplications,
      },
    })
  } catch(error){
    console.log(error.response);
    logoutUser();
  }

  clearAlert();
};

// Pass it to AppContext.Provider's value prop
value = { showStats }
```

Now notice we pass in the data that we got from the backend into the payload, when we dispatch the show stats success. To be used in the front-end.

### Stats Page | Reducer

Handle the two new actions of the reducer.

```js
    case SHOW_STATS_BEGIN: {
      return {
        ...state,
        isLoading: true,
        showAlert: false,
      };
    }
    
    case SHOW_STATS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        stats: action.payload.stats,
        monthlyApplications: action.payload.monthlyApplications,
      };
    }
```

## Stats Page - Structure II

We have to now work on the Stats component under pages.

```js
import React from 'react';
import { useAppContext } from '../../context/appContext';
import { Loading } from '../../components';

export default function Stats() {
  const {
    showStats,
    isLoading,
    monthlyApplications,
  } = useAppContext();


  if(isLoading){
    return <Loading center />;
  }

  return (
    <h1>Stats Page</h1>
  );
}
```

If the page is in the process of retrieving data then we should render the `Loading` component. Next destructure out `showStats` function, `isLoading` and `monthlyApplications` from app context.

We should also use `useEffect` to synchronize changes with the `showStats` function.

```js
import React, { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { Loading } from '../../components';

export default function Stats() {
  const {
    showStats,
    isLoading,
    monthlyApplications,
  } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if(isLoading){
    return <Loading center />;
  }

  return (
    <h1>Stats Page</h1>
  );
}
```

**There will be two components rendered inside the stat page. At the top side we will have a `StatsContainer` and on the bottom will have a `ChartsContainer` that visually displays the applications only if monthlyApplications exceed 0.

Let's create those components under the `components` folder.

```js
import React, { useEffect } from 'react';
import { useAppContext } from '../../context/appContext';
import { ChartsContainer, Loading, StatsContainer } from '../../components';

export default function Stats() {
  const {
    showStats,
    isLoading,
    monthlyApplications,
  } = useAppContext();

  useEffect(() => {
    showStats();
  }, []);

  if(isLoading){
    return <Loading center />;
  }

  return (
    <>
      <StatsContainer />
      { monthlyApplications.length > 0 && <ChartsContainer />}
    </>
  );
}
```

Here we import the following components along with rendering it together inside a `Fragment` in React [Fragment docs](https://react.dev/reference/react/Fragment). Which is used with `<>...</>` a shortcut syntax.

### `StatsContainer` component

```js
import React from 'react';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../assets/wrappers/StatsContainer';

export default function StatsContainer() {
  const { stats } = useAppContext();

  const defaultStats = [];

  return (
    <Wrapper>StatsContainer</Wrapper>
  );
}
```

For now we have `defaultStats` as an empty array, but we will populate them with the catageries we want to display the stats for the user. 

What we will render will be every Stat, so we will have to use `map()`. It also means we have to create another component, a `StatItem` component.

Let's create one with rfc, then import it.

What to render in `StatsContainer`:

```js
  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })};
    </Wrapper>
  );
```

Next we will fill out the `defaultStats` array with objects containing each stat's count, an icon, color and background color.

```js
import React from 'react';
import { useAppContext } from '../../context/appContext';
import Wrapper from '../assets/wrappers/StatsContainer';
import StatItem from './StatItem';
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';

export default function StatsContainer() {
  const { stats } = useAppContext();

  const defaultStats = [
    {
      title: 'pending applications',
      count: stats.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'interviews scheduled',
      count: stats.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'jobs declined',
      count: stats.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
  ];

  return (
    <Wrapper>
      {defaultStats.map((item, index) => {
        return <StatItem key={index} {...item} />;
      })};
    </Wrapper>
  );
}
```

### StatItem component

So for every Stat Item we render out, we should have the following:

- `title`, or the name of the stat
- `count`, the stat count
- `icon`, an icon to represent the stat
- `color`, to color the Stat
- `bcg`, background color

Let's pass these in as `props` and destructure them out for usage.

```js
import React from 'react';
import Wrapper from '../assets/wrappers/StatItem';

export default function StatItem(props) {
  const { count, title, icon, color, bcg } = props;

  return (
    <Wrapper color={color} bcg={bcg}>
      <header>
        <span className="count">{count}</span>
        <div className="icon">{icon}</div>
      </header>
      <h5 className="title">{title}</h5>
    </Wrapper>
  );
}
```

### Fix component's `index` to export the proper components

## Stats Page | Aggregate Jobs based on Year & Month

In `jobsController`, we want to pass some parameters to the aggregation pipeline in this order:
- match, by those created by `this` user
- group, by its year and month, give it a count of 1 for each
- sort, by year and month,
- limit, by 6

Let's try to make a template and call it `monthlyApplications`

```js
let monthlyApplications = await Job.aggregate([
  {$match: },
  {$group: },
  {$sort: },
  {$limit: },
]);
```

We can create our Aggregation Pipeline in Mongoose, see the [docs on Aggregation](https://www.mongodb.com/docs/manual/core/aggregation-pipeline/).

- The `$match` stage: Filters the Job documents to jobs made by the current user. Passes the remaining documents to the `$group` stage.
- The `$group` stage: Groups the remaining documents by their year & month. 
  - Use `$sum` to calculate the sum, available during `$group` stage. See the docs on [sum aggregate](https://www.mongodb.com/docs/manual/reference/operator/aggregation/sum/)
- The `$sort` stage: Sorts the documents by the total order value for each group in descending order (-1).
- The `$limit` stage: Limits it to 6 jobs

```js
  let monthlyApplications = await Job.aggregate([
    {$match: { createdBy: mongoose.Types.ObjectId(req.user.userId) }},
    {$group: {
      _id: {
        year: { 
          $year: '$createdAt' 
        },
        month: { 
          $month: '$createdAt' 
        },
      },
      count: { $sum: 1 },
      },
    },
    {$sort: { '_id.year': -1, '_id.month': -1 }},
    {$limit: 6 },
  ]);
```

# Refactoring the data: `monthlyApplications`

So far we need to do an extra step, as testing in Postman shows that we want to transform the data into something more digestable. The dates are one of those things that need to be refactored.

We can map each item by its `date` and `count` so we need to destructure `_id`'s then `year` and `month`, its `count`. Next create a date using these values.. The date should be in a more readable format. Let's use `moment.js` like we did in the front-end.

```sh
npm i moment
```

Then create the date, and return it along with the count for each item in `monthlyApplications`.
Put this after the aggregation pipeline:

```js
  monthlyApplications = monthlyApplications.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    
    const date = year;
  });
```

Remember that in moment the data accepts values 0-11, such that month must be subtracted by 1 to get the right month.

```js
  monthlyApplications = monthlyApplications.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    
    const date = moment()
      .month(month - 1)
      .year(year)
      .format('MMM YYYY');

    return { date, count };
  });
```

After some Postman testing, the data passed in from the pipeline is actually in the reverse order that we want. So we need to append the `map()` operation with a `reverse()` operation.

```js
  monthlyApplications = monthlyApplications.map((item) => {
    const {
      _id: { year, month },
      count,
    } = item;
    
    const date = moment()
      .month(month - 1)
      .year(year)
      .format('MMM YYYY');

    return { date, count };
  }).reverse();
```

# Testing `showStats` back-end

First test it in Postman.

1. Send a `POST` Login Request
2. Send a `GET` stats request

Here is the response:
```json
{
    "msg": "Class constructor ObjectId cannot be invoked without 'new'"
}
```

In the server, because I setup extensive logging, I can see:
```sh
[0] POST /api/v1/auth/login 200 110.330 ms - 379
[0] ======== Starting Show Stats | Backend ========
[0] Finished Job.aggregate(), logging stats:
[0]   type of stats: object
[0]   stats: [object Object]
[0] Finished reduce(), logging stats:
[0]   type of stats: object
[0]   stats: [object Object]
[0] TypeError: Class constructor ObjectId cannot be invoked without 'new'
[0]     at showStats (file:///C:/Users/.../GitHub/job-tracker/controllers/jobsController.js:162:42)        
[0]     at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
[0] GET /api/v1/jobs/stats 500 36.479 ms - 68
```

So the error matches up, a general HTTP 500 server-side error.

The offending line of code:

```js
    {$match: { createdBy: mongoose.Types.ObjectId(req.user.userId) }},
```

## Looking into the docs

The docs on mongoose's [ObjectId](https://mongoosejs.com/docs/schematypes.html#objectids).

`ObjectId` is a class, and ObjectIds are objects.

So let's add `new` in front of `mongoose.Types.ObjectId()` to treat it as a proper class constructor which creates the ObjectId with the passed in `req.user.userId` as parameter.

```js
// ...
  let monthlyApplications = await Job.aggregate([
    {$match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) }},
    // ...
```

Now send a `GET` stats request, and now we have the output we wanted:

```json
{
    "defaultStats": {
        "pending": 4,
        "interview": 0,
        "declined": 0
    },
    "monthlyApplications": [
        {
            "date": "Mar 2023",
            "count": 1
        },
        {
            "date": "Apr 2023",
            "count": 3
        }
    ]
}
```

# ChartsContainer component

Going to work on the ChartsContainer.

```js
import React, {useState} from 'react';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/ChartsContainer';

export default function ChartsContainer() {
  const { monthlyApplications: data } = useAppContext();

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>

      <button type='button' onClick={}>

      </button>
    </Wrapper>
  );
}
```

Going to import Wrapper, get `monthlyApplications` from global context and rename to `data` (for shorter name to pass as props).

In the ChartsContainer we are going to need to create 2 components to visually display the stats on the front page. One of them is a `BarChart` component, which we should be able to to create a state variable for so that we can re-render visually if a stat has changed. 

The next component to create is the `AreaChart` which will be the graph that supports the `BarChart` component.

In order to speed up development time and make the charts more visually appealing we need a package with reusuable charting library component called [Recharts](https://recharts.org). Remember to install this in the `client` folder, the front-end.

```sh
npm install recharts
```

## BarChart Component

Let's setup the React Functional Component along with the things we plan to use from `recharts`.

With help of the [recharts guide](https://recharts.org/en-US/guide/getting-started) we can get started with visually displaying our stats.

```js
import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export default function BarChart() {
  return (
    <div>BarChart</div>
  );
}
```

Here we have an error, `BarChart` has already been declared. I would like to keep the name `BarChart.js` as a component so instead we should rename the function to `BarChartComponent`. Then the React element we want to return from the function should be a `ResponsiveContainer` that contains the `BarChart` component from `recharts`.

Let's pass in the data first from the props and pass it to `BarChart`. Also give BarChart a margin of `top: 50`.

```js
export default function BarChartComponent({ data }) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        
      </BarChart>
    </ResponsiveContainer>
  );
}
```

Next let's add the remaining components that want to be drawn.

```js
export default function BarChartComponent({ data }) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid />
        <XAxis />
        <YAxis />
        <Tooltip />
        <Bar />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

For the `CartesianGrid` we can give it the props `stroke = #ccc` and a `strokeDasharray ="3 3"` for a dashed line for increased readability.

For the `XAxis` the `dataKey` will be `'date'`. As for the `YAxis`, the prop `allowDecimals={false}` so we won't have decimals. 

`Tooltip` will remain as is.

`Bar` will have a prop `dataKey` of `count`, with a `barSize` of 75, and a `fill` of `#2cb1bc`.

```js
export default function BarChartComponent({ data }) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray="3 3"/>
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='count' fill='#2cb1bc' barSize={75} />
      </BarChart >
    </ResponsiveContainer>
  );
}
```

## AreaChart Component

Similarly, AreaChart component will be made the same way. In `AreaChart.js`, under components folder, the function name will be `AreaChartComponent`. The imports are all the same except for `Bar` and `BarChart`, they will be replaced with `Area` and `AreaChart`.

```js
import React from 'react';

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

export default function AreaChartComponent() {
  return (
    <AreaChart>
      <Area />
    </AreaChart>
  );
}
```

Just like in the recharts guide, that was the 1st step.

### 1. Choose the type of chart you need

In this case, it is AreaChart. With Area within.

### 2. Add components that you want to be drawn

Wrap the entire `AreaChart` with `ResponsiveContainer. Then add the rest of the components we imported.

```js
export default function AreaChartComponent() {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart>
        <CartesianGrid />
        <XAxis />
        <YAxis />
        <Tooltip />
        <Area />
      </AreaChart>
    </ResponsiveContainer>
  );
}
```

### 3. Adjust the props of components

```js
export default function AreaChartComponent({ data }) {
  return (
    <ResponsiveContainer width='100%' height={300}>
      <AreaChart data={data} margin={{ top:50 }}>
        <CartesianGrid stroke="#ccc" strokeDasharray='3 3' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Area type='monotone' dataKey='count' stroke='#2cb1bc' fill='#bef8fd'/>
      </AreaChart>
    </ResponsiveContainer>
  );
}
```
`
With the components made, we can now use them within `ChartsContainer`

## Wrapping up ChartsContainer component

- Import AreaChart component and BarChart component directly
```js
import AreaChart from './AreaChart';
import BarChart from './BarChart';
```

- Set `barChart` as a state variable, with `setBarChart` as the set function. We pass in `true` as the .

```js
const [barChart, setBarChart] = useState(true);
```

- Create a button that will have its `onClick` handler `setBarChart` or not. This will toggle between `AreaChart` or `BarChart`
- After the button, conditionally render the corresponding Chart component based on the state variable `barChart`

```js
<button type='button' onClick={() => setBarChart(!barChart)}>
  {barChart ? 'AreaChart' : 'BarChart'}
</button>

{barChart ? <BarChart data={data} /> : <AreaChart data={data} />}
```

# Filtering Results

The next step is to filter out the results of `Get All Jobs`.

Let's start in the back-end. Back in the `jobsController.js` we will modify the `getAllJobs` function:

```js
const getAllJobs = async (req, res) => {
  // Find the jobs created the user from the request
  const jobs = await Job.find({ createdBy: req.user.userId });

  // Respond with 200 and a json containing the jobs, totalJobs, and pages
  res.status(StatusCodes.OK)
     .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
```

Here are the things we plan to do:

- From the request's `query` we should destructure out `search`, `status`, `jobType` and `sort`
- Create a query Object that stores one property -> `createdBy` which is set to `req.user.userId` to keep track of the user who made the request

```js
  const { search, status, jobType, sort } = req.query;

  const queryObject = {
    createdBy: req.user.userId,
  };
```

- Next we have to find every Job document in the model that relates to the user. We do not use await.
- At this stage we should chain each sort condition
- Now we use await to the result and store the result inside a variable called `jobs`

```js
 // NO AWAIT
  let result = Job.find(queryObject);

  // chain sort conditions

  const jobs = await result;
```

- Finally, send back the response with a OK status code along with converting it into `json` containing `jobs`, `totalJobs`, `numOfPages`. This is already included.

```js
  res.status(StatusCodes.OK)
     .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
```

- Just to save what we have so far:
```js
const getAllJobs = async (req, res) => {
  // Create queryObject that keeps track of the user
  const queryObject = { 
    createdBy: req.user.userId,
  };

  // Find the jobs created by the user from the request
  const jobs = await Job.find(queryObject);

  // Destructure the necessary variables from request's query
  const { search, status, jobType, sort } = req.query;

  // Find the job results of the user WITHOUT await
  let result = Job.find(queryObject);
  
  // Chain sort conditions to filter results
  // TODO later...

  // Await jobs filtered out by sort conditions
  const jobsFiltered = await result;

  // Respond with 200 and a json containing the jobs, totalJobs, and pages
  res.status(StatusCodes.OK)
     .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
```

## Adding `Status` to the query

We want to add one more property to the `queryObject` called `status`.

Status will keep track of the stages of the query and sort. For now we will just check for if status is not `'all'` then we have to set the status of the `queryObject`.

Updated version:

```js
const getAllJobs = async (req, res) => {
  // Destructure the necessary variables from request's query
  const { search, status, jobType, sort } = req.query;

  // Create queryObject that keeps track of the user
  const queryObject = { 
    createdBy: req.user.userId,
  };

  // Set the status of the query if not `all`
  if (status !== 'all'){
    queryObject.status = status;
  }

  // Find the jobs created by the user from the request (WITHOUT await)
  let result = Job.find(queryObject);
  
  // Chain sort conditions to filter results
  // TODO later...

  // Await jobs filtered out by sort conditions
  const jobs = await result;

  // Respond with 200 and a json containing the jobs, totalJobs, and pages
  res.status(StatusCodes.OK)
     .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
```

## Adding `jobType` to the query

Adding one more property to `queryObject`, which will be the `jobType` if it is not set to `'all'`.

```js
const getAllJobs = async (req, res) => {
  // Destructure the necessary variables from request's query
  const { search, status, jobType, sort } = req.query;

  // Create queryObject that keeps track of the user
  const queryObject = { 
    createdBy: req.user.userId,
  };

  // Set the status of the query if not `all`
  if (status !== 'all'){
    queryObject.status = status;
  }

  // Set the jobType of the query if not 'all'
  if (jobType !== 'all'){
    queryObject.jobType = jobType;
  }

  // Find the jobs created by the user from the request (WITHOUT await)
  let result = Job.find(queryObject);
  
  // Chain sort conditions to filter results
  // TODO later...

  // Await jobs filtered out by sort conditions
  const jobs = await result;

  // Respond with 200 and a json containing the jobs, totalJobs, and pages
  res.status(StatusCodes.OK)
     .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
```

# Search Functionality

Now work on the search feature of `getAllJobs`.

Search code:
```js
if (search) {
  queryObject.position = { $regex: search, $options: 'i' };
}

let result = Job.find(queryObject);

// Chain Sort Conditions
if(sort === 'latest') {
  result = result.sort('-createdAt');
}
// ...
```

Inside `getAllJobs`:

```js
const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObject = { 
    createdBy: req.user.userId,
  };

  if (status !== 'all'){
    queryObject.status = status;
  }

  if (jobType !== 'all') {
    queryObject.jobType = jobType;
  }

  // Add position property to queryObject if search is non-empty
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }

  let result = Job.find(queryObject);
  
  // Chain sort conditions
  // if(sort === ...) { }

  const jobs = await result;

  res.status(StatusCodes.OK)
     .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
```

## Chain Sort Conditions

Let's add more conditions to filter out our results.

```js
// Chain Sort Conditions
if(sort === 'latest') {
  result = result.sort('-createdAt');
}

if(sort === 'oldest') {
  result = result.sort('createdAt');
}

if(sort === 'a-z') {
  result = result.sort('position');
}

if(sort === 'z-a') {
  result = result.sort('-position');
}
```

So far sort conditions are by `createdAt` or date made and alphabetical order or reverse alphabetical order.

## Setup Search in Global Context

In `appContext` let's set up thhe search and all its variables that's needed in `initialState`.

What we add should look something like this:
```js
const initialState = {
  // ...
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],
}
```

We add `search`, `searchStatus`, `searchType`, `sort` & `sortOptions` as properties to `initialState` object.

Next we would like a way to clear out our search filters. Let's create a function that does this, and pass it into the `value` prop of `AppProvider`. For now, it just logs a string to show that its been invoked.

```js
const clearFilters = () => {
  console.log('Clear Filters');
}
```

Next we should remember the `handleChange` function inside `appContext`:

```js
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };
```

Going to reuse this functionality to handle our Search function.

## Search Container - Setup

Let's setup `SearchContainer.js`.

Our imports should have a Wrapper css file defining our styled-component. And we will also reuse components `FormRow` & `FormRowSelect`, both found in the same folder `components` as `SearchContainer`.

The JSX element we should return is the `Wrapper` that includes a `form` element that containers a heading and div with a class of `form-center`. Within that we will have `FormRow` component.

```js
import React from 'react';
import Wrapper from '../assets/wrappers/SearchContainer';
import { FormRow, FormRowSelect } from '.';

export default function SearchContainer() {
  return (
    <Wrapper>
      <form action="" className="form">
        <h4>search form</h4>
        <div className="form-center">
            <FormRow>

            </FormRow>
        </div>
      </form>    
    </Wrapper>
  );
}
```

Next let's import the global context, and then destructure all the properties we need from the `initialState` to create the search functionality.

```js
import { useAppContext } from '../context/appContext';

export default function SearchContainer() {
  const {
    isLoading,
    handleChange,
    search,
    searchStatus,
    searchType,
    sort,
    sortOptions,
    statusOptions,
    jobTypeOptions,
    clearFilters,
  } = useAppContext();

  return (
    // ...
  );
}
```

Notice how we also destructured `handleChange`. To refresh, here it is in the `appContext`:

```js
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };
```

It dispatches an action, which is then handled in the reducer. Takes in two parameters: `name` and `value`. 

Let's take a look at `AddJob.js` under `/pages/Dashboard/` where we use this functionality:

```js
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({name, value});
  };
```

It simply passes in the event target's `name` and `value` as the payload, and in the reducer:

```js
    case HANDLE_CHANGE: {
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    }
```

Recall how this was used:

- Note how because we set up the `initalState` as an object with properties `name`, `email` & `password`,  `handleChange` function will access both the name of the input and value, then access the proper value in intialState object afterwards. That is why `handleChange` can be reused, because it is assigned to a prop and invoked in the `FormRow` component.

Let's complete our `FormRow` component, which will function as the search bar.

```js
<FormRow
  type='text'
  name='search'
  value={search}
  handleChange={handleSearch}
>
</FormRow>
```

Let's also create the event handler function (called `handleSearch`) within `SearchContainer`.

```js
const handleSearch = (e) => {
  if(isLoading) return;
  handleChange({ name: e.target.name, value: e.target.value });
}
```

Notice how we should not invoke `handleChange` if the search is still ongoing (indicated by the `isLoading` variable).

Let's now put it together to handle a change whenever the user types search input into the `FormRow` component rendered inside the Wrapper. 

```js
export default function SearchContainer() {
  const {
    //...
  } = useAppContext();

  const handleSearch = (e) => {
    if(isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  }

  return (
    <Wrapper>
      <form action="" className="form">
        <h4>search form</h4>
        <div className="form-center">
            <FormRow
              type='text'
              name='search'
              value={search}
              handleChange={handleSearch}
            >
            </FormRow>
        </div>
      </form>    
    </Wrapper>
  );
}
```

## Adding more Search Options

We imported `FormRowSelect` earlier so we can make the user select options to aid in the search.

User should be able to search by `status` and `jobType`.

Then create 2 more buttons that should:

1. Sort the search results by the options provided by the user
2. Clear any previous options that filtered results so search can be done from a clean slate. This will use `clearFilters` function taken from `appContext`.

Let's create the clear button first, which should be the last item in the `form`:

```js
<button
  className='btn btn-block btn-danger'
  disabled={isLoading}
  onClick={handleSubmit}
>
  clear filters
</button>
```

Now create the `handleSubmit` function which prevents the normal submit behavior, then calls `clearFilters()`.

```js
const handleSubmit = (e) => {
  e.preventDefault();
  clearFilters();
};
```

Next let's work on the other search options for the `form`, which the user will interact with via a `FormRowSelect` component.

Let's refresh on what a `FormRowSelect` component looks like:

```js
export default function FormRowSelect({labelText, name, value, handleChange, list}) {
  return (
    <div className="form-row">
    <label htmlFor={name} className='form-label'>
      {labelText || name}
    </label>

    <select
      name={name}
      value={value}
      onChange={handleChange}
      className='form-select'
    >
      {list.map((itemValue, index) => {
        return(
          <option key={index} value={itemValue}>
            {itemValue}
          </option>
        );
      })}
    </select>
  </div> 
  );
}
```

Notice the parameters have `labelText`, `name`, `value`, `handleChange` and `list`.

Let's create one that aids the user in filtering by job status:

What is this `FormRowSelect` supposed to use? We destructured out `statusOptions` earlier from appContext, which is an array in the `initalState` object. 

`statusOptions` contains the following:

```js
const initialState = {
  // ...
  statusOptions: ['interview', 'declined', 'pending'],
  // ...
}
```

Each of these options will be render in `FormRowSelect` during the mapping process. Let's also include one more option that covers all statusOptions (i.e., `all`). So our `list` prop for the `FormRowSelect` should be an array that includes `statusOptions` and `all`, likeso:

```js
  list={['all', ...statusOptions]}
```

The rest of the props should be easy to infer from the context, so let's create it:

```js
<FormRowSelect
  labelText='job status'
  name='searchStatus'
  value={searchStatus}
  handleChange={handleSearch}
  list={['all', ...statusOptions]}
>
</FormRowSelect>
```

Let's create another `FormRowSelect` this time with `job type`.

```js
<FormRowSelect
  labelText='job type'
  name='searchType'
  value={searchType}
  handleChange={handleSearch}
  list={['all', ...jobTypeOptions]}
>
</FormRowSelect>
```

Finally, a `FormRowSelect` for sort.

```js
<FormRowSelect
  name='sort'
  value={sort}
  handleChange={handleSearch}
  list={['all', ...sortOptions]}
>
</FormRowSelect>
```

## Front-End testing

Now after 

1) Login to reissue an new token
2) Navigate to All Jobs page

We should see so far the Search Form with the proper labels and button.

Now immediately after select something from the drop downs of job type and status, clicking the `[Clear]` button seems to have not done anything. We still need to code it!

## Clear button in Search Form

In `action.js`:

```js
export const CLEAR_FILTERS = 'CLEAR_FILTERS';
```

Now in `appContext.js`:

```js
import { 
  // ...
  CLEAR_FILTERS,
} from "./actions";

const clearFilters = () => {
  dispatch({ type: CLEAR_FILTERS });
}
```

And finally in the reducer:

```js

    case CLEAR_FILTERS: {
      return {
        ...state,
        search: '',
        searchStatus: 'all',
        searchType: 'all',
        sort: 'latest',
      };
    }
```

Return everything in the state, then set the following values to their respective default values.
- `search` to empty string
- `searchStatus` to `all`
- `searchType` to `all`
- `sort` to `latest`

Now that the button is finally wired up and implemented, we can get back to working on the `AllJobs` page!

# Refactor `Get All Jobs`

It is time to refactor the `getJobs` function in `AppContext`. So far:

```js
  const getJobs = async () => {
    let url = `/jobs`;
    
    dispatch({ type: GET_JOBS_BEGIN });

    try {
      const data = await authFetch(url);

      const { jobs, totalJobs, numOfPages } = data.data;

      dispatch({
        type: GET_JOBS_SUCCESS,
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });

    } catch(error){
      console.log(`Error triggered in getJobs() appContext.js! 
      Here is the Error Response:
      ${error.response}`);
      logoutUser();
    }
    clearAlert();
  };
```

## Improvements to make

`getJobs` should be able to call the user's data on all their jobs. But now that we have the search functionality , we should integrate it. How? With the API & URL.

## **Recap on *API* Requests**

- API is a set of commands, functions , protocols, and objects that programmers can use to create software or interact with an external system

- API consists of: **Endpoint, Paths, Parameters & Authentication**

- Endpoint is the starting URL, while Paths and Parameters narrow down on specific piece of data from an external server

- If Endpoints are the root of the tree (of the file/folder structure hierarchy) then we need to add a branch of `Paths`.

- `Parameters` go at the end of the URL after a question mark, with a key value pair (e.g., `?contains=debugging`). 

- Every subsequent query follows an ampersand after the question mark.

  e.g., for an API that contains programming jokes, given parameters that:
  - Blacklists NSFW
  - Type of joke is single line
  - Contains the word "debugging"
  - Parameters: `?blacklistFlags=nsfw&type=single&contains=debugging`
  - `https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw&type=single&contains=debugging`

- Finally, there is Authentication of the API, which is used to monetize and limit usage to a threshold (e.g., A call to Open Weather Map API requires your personal `appid`)

## URL changes based on the search parameters

In the `getJobs` function, we simply have the path which will be appended to the endpoint:

```js
let url = `/jobs`;
```

But when we search, we want to be able to add our parameters, to request specific information on the user's data. 

Let's modify the URL before we begin to dispatch the action `GET_JOBS_BEGIN`.

We want to include every search parameters as part of the URL. So first we destructure out any variables that deals with search in the state:

```js
const { search, searchStatus, searchType, sort } = state;
```

Now append the all parameters except `search` to the `/jobs` path, and assign it to the `url`.

```js
let url = `/jobs?status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
```

We will add `search` only if `search` is non-empty and the user filled something in. Let's add it as the last parameter after checking:

if(search) {
  url = url + `&search=${search}`;
}

## Adding search variables from context to `JobsContainer`

Now that we have the search variables setup, we need to make sure to add it to the `JobsContainer`. Also update the `useEffect`'s dependency array to include the search variables.

```js
export default function JobsContainer() {
  const {
    getJobs,
    jobs,
    isLoading,
    page,
    totalJobs,
    search,
    searchStatus,
    searchType,
    sort,
  } = useAppContext();

  useEffect(() => {
    getJobs();
  }, [search, searchStatus, searchType, sort]);

// ...
```

# Search functionality, back at back-end

Let's go back to the `jobsController`, we need to take another look at the `getAllJobs` function.

```js
const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query;

  const queryObject = { 
    createdBy: req.user.userId,
  };

  if (status !== 'all'){
    queryObject.status = status;
  }

  if (jobType !== 'all'){
    queryObject.jobType = jobType;
  }

  if (search) {
    queryObject.position = { $regex: search, $options: 'i' };
  }

  let result = Job.find(queryObject);
  
  if(sort === 'latest') {
    result = result.sort('-createdAt');
  }
  
  if(sort === 'oldest') {
    result = result.sort('createdAt');
  }
  
  if(sort === 'a-z') {
    result = result.sort('position');
  }
  
  if(sort === 'z-a') {
    result = result.sort('-position');
  }

  const jobs = await result;

  res.status(StatusCodes.OK)
     .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
};
```

## Pagination

There is something we are missing that we planned to add at some point: **pagination!**.

Where: pagination should happen after we receive the total amount of `jobs` from the awaited `result`.

How: We can setup the pagination by defining how many results we want to limit a page to

We can do so by manipulating the `result` variable, but we need to find out what exactly we are working it in order to perform operations on it. The line of code that declares and assigns a value to `result`:

```js
  let result = Job.find(queryObject);
```
To find out what it returns, as a refresher here are the docs: on [Model.find()](https://mongoosejs.com/docs/api/model.html#Model.find()).

It returns a `<<Query>>`, which allows us to use methods such as [limit()](https://mongoosejs.com/docs/api/query.html#Query.prototype.limit()) and [skip()](https://mongoosejs.com/docs/api/query.html#Query.prototype.skip()).

Let's create the `limit` and `skip` variables first:

```js
const limit = 10;
const skip = 1;
```

Then we modify the query by chaining the operations we need to modify it:

```js
  result = result.skip(skip).limit(limit);  
```

Finally, since the query operations are `async` we need to `await` the new results again:

```js
  // Await jobs filtered out by sort conditions
  let jobs = await result;

  // Pagination Variables
  const limit = 10;
  const skip = 1;

  // Chain operations to modify the query based on the page variables
  result = result.skip(skip).limit(limit);  

  // Since the query operations are async, we need to await again
  jobs = await result;
```

I changed the variable declaration from `const` to `let` for `jobs` since we will have to reuse it again.

### Why use `skip` in the Query?

For now skip is 1, but when we setup pagination we need to be able to skip the results that have already been shown. e.g., if we are on page 2 (with page 1 being the start) we want to skip the results of page 1. On page 3, we need to skip the results of page 1 and 2.

## Pages, distributing the results to the pages

We need to do some math in order to distribute the amount of jobs to each page. Things to note:


```js
  // Await jobs filtered out by sort conditions
  let jobs = await result;

  // Pagination Variables
  const limit = 10;
  const skip = 1;

  // Chain operations to modify the query based on the page variables
  result = result.skip(skip).limit(limit);  

  // Since the query operations are async, we need to await again
  jobs = await result;
```

We are going to need to do some calculation to find out the best way to limit the results, setup skip points, then calculate the result.

Let's try to make the problem a bit concrete, let's say we have 75 total job results returned from the query. How do we best divide this while keeping in mind the limit (i.e., 10) and the skip(i.e., 1).

For 75 results, we want to have a number of 8 pages. With 7 pages showing 10 results each, and the final page showing 5 results.

Let's redefine our pagination variables to leave that as default. What we want to do is be able to change the number of pages, how much to limit, and how many to skip based off that.

Recall that in the `request`, which we refer to as `req.query`, we have the variables `page` and `limit`. Let's assign our variables with these.

First we need to find out the page number, with the default being 1 (in global context it is 1). Based on that page number we will decide to skip the remaining elements. If we are on the 1st page, we skip none. On 2nd page, we skip 10 (or the first 10 results since we already showed that). On 3rd page, we skip the first 20 results. And so forth.

```js
// Pagination Variables
const page = Number(req.query.page) || 1;

const limit = Number(req.query.limit) || 10;

const skip = (page - 1) * limit;

// Await jobs filtered out by sort conditions AND processed through pagination
const jobs = await result;
```

## Changing the status response

As of now we have the response as:

```js
  // Respond with 200 and a json containing the jobs, totalJobs, and pages
  res.status(StatusCodes.OK)
     .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
```

We hard-coded `numOfPages` and calculated `totalJobs` based on the length of the array.

We need to update these so they reflect the real amount. We have to store them as variables and pass them into the response:

```js
  res.status(StatusCodes.OK)
     .json({ jobs, totalJobs, numOfPages });
```

The `totalJobs` should be the total amount of jobs within the query. But the query has been filtered out! 

How do we count the amount of jobs within the filtered out documents? Let's use mongoose's [countDocuments()](https://mongoosejs.com/docs/api/model.html#Model.countDocuments()) method, whichh counts number of doucments matching filter in a database collection.

```js
const totalJobs = await Job.countDocuments(queryObject);
```

We also need to calculate the number of pages.

```js
  const numOfPages = totalJobs/limit;
```

Actually, given the previous example of 75 job results. The numOfPages will turn out to be `75/10` = `7`, because of integer division. We need an extra page to accomodate the last 5 results. 

We could just add +1 to the `totalJobs/limit` expression, but in the case that the `limit = 1` then we would have an extra page. So what if we instead rounded up the expression with `Math.ciel()`, this would yield the extra page needed to accomodate the results without having to give us the extra page.

# New Component! `PageBtnContainer`

Finally back to front-end, we have to enclose all of the logic above somehow with a container for our pagination! This will wrap up the `JobsContainer` component. So let's create it under `components` and call it `PageBtnContainer.js`.

Next we should setup the imports in `JobsContainer`

```js
import PageBtnContainer from './PageBtnContainer';

export default function JobsContainer() {

  const {
    // ...
    page,
    numOfPages,
  } = useAppContext();

  return (
    // ...
  );
}
```

Now inside the render of `JobsContainer`, we can finally setup the pagination:

Right now it looks like this:
```js
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && 's'} found
      </h5>
      <div className='jobs'>
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />
        })}
      </div>

      {/* pagination */}
      
    </Wrapper>
  );
```

What we want to put under pagination is that if the number of pages is greater than 1 (the default) then we should render the `PagesBtnContainer`. Otherwise, if it is only just 1 then it should just remain on the single page and no need to render the component.

```js
  return (
    <Wrapper>
      {/* Rendering the Jobs... */}

      {/* pagination */}
      {numOfPages > 1 && <PageBtnContainer />}

    </Wrapper>
  );
```

We will be using `page` variable later when we implement the `PageBtnContainer`.

## `PageBtnContainer` component

Let's work on the imports, for now I'd like to use to icons from `react-icons/hi` to represent the buttons for the pages.

Next we import the appContext and Wrapper to style the component

```js
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/PageBtnContainer';
```

We use `appContext` so that we can use the variables `page` and `numOfPages`. So we destructure those out of the global context.

```js
const { page, numOfPages } = useAppContext();
```

Next we should create two event handler functions which will handle navigation between pages, a previous button and a next button.

```js
const prevPage = () => {
  console.log('previous page');
};

const nextPage = () => {
  console.log('next page');
};
```

### Working on the JSX element to return

Just like other components before, we will return a styled-component named `Wrapper`. Then create two buttons that will store the previous and next buttons.

```js
return (
  <Wrapper>
    <button className="prev-btn" onClick={prevPage}>
      <HiChevronDoubleLeft />
      prev
    </button>

    <button className="next-btn" onClick={nextPage}>
      next
      <HiChevronDoubleRight />
    </button>
  </Wrapper>
);
```

Let's also create a div named `btn-container`, in between the buttons.

```js
<div className="btn-container">buttons</div>
```

This will contain the buttons for the pages, so user can click on the button and navigate directly to the page.

We will have to create a new component for it to render. On second thought, it would be better to just render it within the `btn-container`

### Turn `pages` into buttons for `btn-container`

Let's work on the logic that converts our pages into a `pageNumber` button. We also have to keep in mind that the current page should css class of `pageBtn active` so the user knows where they are currently. These buttons will provide an alternative way for the user to navigate through pages directly.

Before that we need to convert `pages` somehow to a number. This is a case whhere we can use [Array.from](https://javascript.info/iterable#array-from). It takes an iterable or array-like value and makes a "real" Array from it. We can then call array methods on it.

The syntax for `Array.from(obj[, mapFn, thisArg])`

Optional Arguments:
- `mapFn` can be a function that will be applied to each element before adding it to the array
- `thisArg` allows us to set `this` for it.

Let's create a variable called `pages` that uses `Array.from()` to create our indices so that it can be mapped later to a button.

```js
const pages = Array.from( 
  { length: numOfPages },
  (index) => {
    return index++;
  }
);
```

Then we can finally render the page buttons within `btn-container`:
```js
<div className="btn-container">
  {pages.map((pageNumber) => {
    return (
      <button>
        {pageNumber}
      </button>
    );
  })}
</div>
```

### Adding the properties for each page `button` 

Let's add the props to the button during the mapping.

- The `type` should be button.
  ```js
  <button
    type='button'
  >
    {pageNumber}
  </button>
  ```

- Remember that we want the user to know which `pageBtn` is the active one, so we must set its CSS class to active if the `pageNumber` is equal to the current `page`
  ```js
    className={(pageNumber === page) ? 'pageBtn active' : 'pageBtn'}
  ```

- Next the `key` should be set to `pageNumber` for each page mapped
  ```js
  key={pageNumber}
  ```

- Finally, let's give it a `onClick` function to let us know the button is working. So just log the current page:
  ```js
  onClick={() => console.log(page)}
  ```

## Change Page

Now lets setup the logic for the next and previous buttons that change the page.

1. We have to create the action `CHANGE_PAGE`. 
2. Create a function that dispatches this action along with the the payload for a page in `appContext`.
3. Handle the action in reducer
4. Use the passed dowwn `changePage` function in the `PageBtnContainer` component

actions
```js
export const CHANGE_PAGE = 'CHANGE_PAGE';
```

- Import the action, create `changePage` function with a `page` parameter, and pass that function down to the `value` prop.

appContext
```js
import { 
  // ...
  CHANGE_PAGE,
} from "./actions";

const changePage = (page) => {
  dispatch({
    type: CHANGE_PAGE,
    payload: { page }
  });
};

  return (
  <AppContext.Provider value = {
    {
      ...state, 
      // ...
      changePage, 
    }}>
    {children}
  </AppContext.Provider>
)
```

- Handle the action in the reducer

```js
case CHANGE_PAGE: {
  return {
    ...state,
    page: action.payload.page
  };
}
```

- Use the function in `PageBtnContainer`, by destructuring it out of app context. Then use that function in the onClick of the page buttons.

When we map the pages to a button, we gave it a prop of:
```js
<button
  onClick={() => console.log(page)}
>
  {pageNumber}
</button>
```

We want to change the `onClick`'s function to that of `changePage`.

```js
  const { 
    page,
    numOfPages,
    changePage,
  } = useAppContext();

  return (
    <Wrapper>
      { /* prev button */ }

      <div className="btn-container">
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              className={(pageNumber === page) ? 'pageBtn active' : 'pageBtn'}
              key={pageNumber}
              onClick={() => changePage(page)}
            >
              {pageNumber}
            </button>
          );
        })}
      </div>

      { /* next button */ }
    </Wrapper>
  );
```

Actually there is an error here, what we should pass down is not `page` but `pageNumber`.

```js
// Instead of
onClick={() => changePage(page)}

// Use this
onClick={() => changePage(pageNumber)}
```

That's because when `pageChange` is handled in thhe reducer, it will go specifically to that page and re-render. What we need is not the page itself but the `pageNumber`. We will see how that is used as well in the previous and next buttons.

## Previous and Next Button logic

Now that the page change works for the page buttons. We need to work on the prev and next button's `onClick` handlers.

We can re-use the same code to change the page, we just have to setup the logic such that we know what page to change to in the handlers. 

We have to think of the edge cases where when calling previous page, i.e., when we are already at the first page. We can either:

- Set the page back to 1
- Make the button unusable
- Route back to the other end of the pages (i.e., a call on previous on the first page will go to the last page)

I will go with the last one where it treats the buttons navigation as a way to traverse the pages in a circular manner. This is what I think is best for use experience as they don't have to click multiple nexts to get to the last page.

Let's work on the previous button:

```js
  const prevPage = () => {
    console.log('previous page');
  };
```

We should have a variable that stores the next page number, that is page - 1, then changePage to that number.

```js
const prevPage = () => {
  let prevPage = page - 1;

  if (prevPage < 1) {
    prevPage = numOfPages;
  }

  changePage(prevPage);
};
```

Similarly, for the `nextPage()`

```js
const nextPage = () => {
  let nextPage = page + 1;

  if(nextPage > numOfPages){
    nextPage = 1;
  }

  changePage(nextPage);
};
```

# Invoke Page Change

Now we have to go to `appContext` and add `page` state. Also add `page` as a parameter to the `url`.

```js
const getJobs = async () => {
  // Destructure variables that deals with search parameters
  const { search, searchStatus, searchType, sort, page } = state;

  let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;

  // ...
}
```

We want this to be able to trigger a page change when user calls for it.

In the `JobsContainer`, lets destructure page from context and have a `useEffect()` hook to synchronize our page change.

```js
  const {
    // ...
    page,
    numOfPages,
  } = useAppContext();

  useEffect(() => {
    getJobs();
  }, [search, searchStatus, searchType, sort, page]);
```

# Handle Change function should also reset the page back to 1

Recall in the `AddJob` page when we used `handleChange()` as a way to change state values.

In `appContext`
```js
  const handleChange = ({ name, value }) => {
    dispatch({
      type: HANDLE_CHANGE,
      payload: { name, value },
    });
  };
```

In `AddJob`
```js
  const handleJobInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    handleChange({name, value});
  };
```

In `reducer`
```js
case HANDLE_CHANGE: {
  return {
    ...state,
    [action.payload.name]: action.payload.value,
  };
}
```

Then later we reused `handleChange` for the search functionality:

In `SearchContainer`
```js
const handleSearch = (e) => {
  if (isLoading) return;
  handleChange({ name: e.target.name, value: e.target.value });
};
```

Now every time we invoke `handleChange`, we want to make sure that the information is updated and also reset the page back to 1.

Let's make it so that in the reducer `handleChange` performs this behavior, in which it resets the active page to 1 in the state:

```js
case HANDLE_CHANGE: {
  return {
    ...state,
    page: 1,
    [action.payload.name]: action.payload.value,
  };
}
```

## The Issue: `MongooseError: Query was already executed`

We got a:

```js
[0] GET /api/v1/jobs?page=1&status=all&jobType=all&sort=latest 500 38.139 ms - 102
[0] MongooseError: Query was already executed: Job.find({ createdBy: new ObjectId("6418d6ab92ff594a02b6f24a...
[0]     at model.Query.exec (C:\...\GitHub\job-tracker\node_modules\mongoose\lib\query.js:4307:17)
[0]     at Query.then (C:\...\GitHub\job-tracker\node_modules\mongoose\lib\query.js:4440:15)
[0]     at process.processTicksAndRejections (node:internal/process/task_queues:95:5) {
[0]   originalStack: 'Error\n' +
[0]     '    at model.Query.exec (C:\...\GitHub\\job-tracker\\node_modules\\mongoose\\lib\\query.js:4311:28)\n' +
[0]     '    at Query.then (C:\...\GitHub\\job-tracker\\node_modules\\mongoose\\lib\\query.js:4440:15)\n' +   
[0]     '    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)'
[0] }
[0] GET /api/v1/jobs?page=1&status=all&jobType=all&sort=latest 500 35.709 ms - 102
```

or more specifically

```sh
[0] MongooseError: Query was already executed: Job.find({ createdBy: new ObjectId("6418d6ab92ff594a02b6f24a...
```

We can find what handles this in the `jobsController`.

## Background information

Here are the docs about [Duplicate Query Execution](https://mongoosejs.com/docs/migrating_to_6.html#duplicate-query-execution) in mongoose. 

> Mongoose no longer allows executing the same query object twice. If you do, you'll get a `Query was already executed error`. Executing the same query instance twice is typically indicative of mixing callbacks and promises, but if you need to execute the same query twice, you can call Query#clone() to clone the query and re-execute it.

This is interesting so we need to find the issue where our callbacks or promises are mixed up. I know that what triggers this error happens during the search functionality, so in the `jobsController`.

That means we should look into any time I used `await` as there often is a callback. Here is mdn's [async function reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function). It states that:

> Code after each `await` expression can be thought of as existing in a `.then` callback. In this way a promise chain is progressively constructed with each reentrant step through the function. The return value forms the final link in the chain.

So lets fix our promises and callbacks.

## The Fix

Possibly offending code:

```js
  // Await jobs filtered out by sort conditions
  let jobs = await result;

  // Pagination Variables
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Chain operations to modify the query based on the page variables
  result = result.skip(skip).limit(limit);  

  // Await filtered jobs processed through pagination
  jobs = await result;
```

Let's try removing the first `let jobs = await result;`

So now we have:

```js
  // Pagination Variables
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  // Chain operations to modify the query based on the page variables
  result = result.skip(skip).limit(limit);  

  // Await filtered jobs by sort conditions & processed through pagination
  const jobs = await result;
```

## Issue: Fixed! 

It fixed the issue! Now we can finally see the `AllJobs` page working well.

# Testing Pagination

Right now it seems that no pagination occurs because we do not have enough in the jobs array. So let's add some so that we can see how it works.

Alright we got it to work, at 11 job postings we can see another issue.

The Prev and Next buttons work fine, they go through the right page. However, when the page buttons are rendered they appear as `NaN`, so it looks like this: `<< Prev [NaN NaN] Next >>`.

## NaN Page Buttons | Attempt at fixing issue

Let's trace our components. 

-`AllJobs` page
  |- <JobsContainer /> 
    |- `PageBtnContainer`

So we have the error in `PageBtnContainer` component. Also another thing to notice is that:

```sh
[0] GET /api/v1/jobs?page=NaN&status=all&jobType=all&sort=latest 304 78.415 ms - -
```

It also shows up as NaN in the url.

This is what the code looks like in `appContext`

```js
const getJobs = async () => {
  // Destructure variables that deals with search parameters
  const { search, searchStatus, searchType, sort, page } = state;

  let url = `/jobs?page=${page}&status=${searchStatus}&jobType=${searchType}&sort=${sort}`;
```

So it means `page` state variable seems to have the issue.

```js
  const getJobs = async () => {
    // Destructure variables that deals with search parameters
    const { search, searchStatus, searchType, sort, page } = state;

    console.log(`page in the state is: ${page}
    type is: ${typeof page}`);
```

After this statement the log is:
```sh
page in the state is: 1
    type is: number
```

However, logging the same thing in `PageBtnContainer` before the render:

```js
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>

      {console.log(`
      page: ${page}
      type is: ${typeof page}
      `)}

      <div className="btn-container">
        {pages.map((pageNumber) => {
```

Yields
```sh
  page: 1
  type is: number
```

So it seems it isn't `page` state variable that's wrong, but rather `pageNumber` during the mapping.

```js
<div className="btn-container">
  {pages.map((pageNumber) => {

    console.log(`pageNumber is ${pageNumber}
    Type is: ${typeof pageNumber}`);

    return (
```

Going a bit further and logging pageNumber, in the console it yields:
```sh
pageNumber is NaN
Type is: number
```

Let's look at all the things `pageNumber` is involved in. First off, its the mapping of an array-like object into an array called `pages`. So we need to find out if there is a problem with `pages` and the usage of `Array.from()`.

Here is the code:
```js
  const pages = Array.from( 
    { length: numOfPages },
    (index) => {
      return index++;
    }
  );
```

So right before the mapping but after logging the `pageNumber` we write another log statement on pages:

```js
  return (
    <Wrapper>
      <button className="prev-btn" onClick={prevPage}>
        <HiChevronDoubleLeft />
        prev
      </button>

      {console.log(`
      --------
      page: ${page}
      type is: ${typeof page}
      --------`)}

      {console.log(`
      --------
      pages: ${pages}
      type is: ${typeof pages}
      --------`)}

      <div className="btn-container">
        {pages.map((pageNumber) => {
          console.log(`pageNumber is ${pageNumber}
          Type is: ${typeof pageNumber}`);
```

In the console:

```sh
PageBtnContainer.js:47 
      --------
      page: 1
      type is: number
      --------
PageBtnContainer.js:53 
      --------
      pages: NaN,NaN
      type is: object
      --------
```

So looks like we found our culprit.

We can diagnose the issue starting with the `pages` object. Again we use `Array.from()` to turn an iterable/array-like value into a "real" Array.

```js
  const pages = Array.from( 
    { length: numOfPages },
    (index) => {
      return index++;
    }
  );
```

It makes a new array and copies all items to it. It's syntax:

```js
Array.from(obj[, mapFn, thisArg])
```

The optional second argument `mapFn` can be a function that will be applied to each element before adding it to the array, and `thisArg` allows us to set `this` for it.

Example:
```js
let range = {
  from: 1,
  to: 5
};

// 1. call to for..of initially calls this
range[Symbol.iterator] = function() {

  // ...it returns the iterator object:
  // 2. Onward, for..of works only with the iterator object below, asking it for next values
  return {
    current: this.from,
    last: this.to,

    // 3. next() is called on each iteration by the for..of loop
    next() {
      // 4. it should return the value as an object {done:.., value :...}
      if (this.current <= this.last) {
        return { done: false, value: this.current++ };
      } else {
        return { done: true };
      }
    }
  };
};

for (let num of range) {
  console.log(num); // 1, then 2, 3, 4, 5
}

let arr = Array.from(range, num => num * num);
console.log(arr) // 1, 4, 9, 16, 25
```

Looking at the example above we can see that it has somehow changes during the mapping process.

Let's log the `index` within `pages` during the mapping function.

```js
  const pages = Array.from( 
    { length: numOfPages },
    (index) => {
      console.log(`
      index in pages is: ${index}
      index is type: ${typeof index}`);
      return index++;
    }
  );
```

Here are the results
```sh
 index in pages is: undefined
```

So it is a problem with how the `Array.from()` is creating our pages. Looking into the docs of mdn [MDN: Array.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

We can see that:

> ...`mapFn` only receives two arguments (`element`, `index`) without the whole array, because the array is still under construction.

We forgot to pass in the `element` argument to the `mapFn`. We want this to not be accessed by anyone but since JavaScript has no inherent privacy of classes (as of May, 2023) we should follow the convention of using `_` underscore for private methods and variables.

## Fix: Pass in the private element argument

Going to name it `_e` to show that it is private and should not be used. We also don't really use it within the mapping as we just need the index. So here is the solution:

```js
  const pages = Array.from( 
    { length: numOfPages },
    (_e, index) => {
      console.log(`
      index in pages is: ${index}
      index is type: ${typeof index}`);
      return index++;
    }
  );
```

And with that the page buttons properly render as a number instead of a `NaN`.

## Next issue: Set initial page to 1. Page buttons are 0 and 1 currently.

So another issue we have is that the page buttons rendered are `0` and `1` respectively. We wanted it to start at page 1.

Again looking at the code above, the issue is within the mapping when we return our `index`.

We use `index++`.

### Solution: Use `index + 1` instead of `index++`

`index + 1` will ensure that page 1 will be the first value. So let's make that change.

```js
  const pages = Array.from( 
    { length: numOfPages },
    (_e, index) => {
      return index + 1;
    }
  );
```

This also fixes the issue when the active page button is not getting the `active` css class.

# Finalizing the App for Production

Let's begin removing the log statements that we used to debug our app. Will keep a list here:

- components
  |- PageBtnContainer

- controllers
  |- authController
  |- jobsController

- middleware
  |- authenticate
  |- error-handler

Let's also handle any warnings, eslint errors, etc.

## Front-End App Setup for Production

Let's create a script that will build the client of the front-end application. In `package.json`, at the root of the project folder, we have:

```json
  "scripts": {
    "server": "nodemon server --ignore client",
    "client": "npm start --prefix client",
    "start": "concurrently --kill-others-on-fail \" npm run server\" \" npm run client\""
  },
```

Let's add the `build-client` script, which will chade directory to client and run the build:

```json
  "scripts": {
    "build-client": "cd client && npm run build",
    "server": "nodemon server --ignore client",
    "client": "npm start --prefix client",
    "start": "concurrently --kill-others-on-fail \" npm run server\" \" npm run client\""
  },
```

Since we want to package our front-end app and serve it as a static asset. Here is the express docs on [Serving static files in Express](https://expressjs.com/en/starter/static-files.html#serving-static-files-in-express).

We are going to do the following in the `server`:
- We are going to need to grab the absolute path directory name using the variable `__dirname`. 
- Then we will use `express.static()`, a built-in middleware to serve static files.
- We will use `path.resolve()`, using the absolute path `__dirname` to the directory containing the source file. Note that this method will create the first absolute path that can be constructured from right to left. A stackoverflow post on the difference between [path.join vs path.resolve with __dirname](https://stackoverflow.com/questions/39110801/path-join-vs-path-resolve-with-dirname)

The imports:

```js
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
```

- `dirname` from `path` is a method that returns the directory name of a `path` [Nodejs path.dirname()](https://nodejs.org/api/path.html#pathdirnamepath)
- `fileURLtoPath` ensures a cross-platform valid absolute path string. It converts a URL string into a fully-resolve platform-specific Node.js file path [Nodejs url.fileURLToPath(url)](https://nodejs.org/api/url.html#urlfileurltopathurl)
- WE will have that url in `import.meta.ural`

```js
if(process.env.NODE_ENV !== 'production'){
  app.use(morgan('dev'));
}

const __dirname = dirname(fileURLToPath(import.meta.url));
```

When we are going to deploy, we want to serve up the front-end as a static asset

- Use express with `app.use()`
- Serve up static asset with `express.static()`
- Use `path.resolve()` to resolve a sequence of paths or path segements into an absolute path. [Nodejs path.resolve()](https://nodejs.org/api/path.html#pathresolvepaths)

```js
app.use(express.static(path.resolve(__dirname, './client/build')));
```

Now after the routes, let's define a `GET` route for `HTTP GET` method in Express. Here is the Express docs on [Routing](https://expressjs.com/en/guide/routing.html).

- The server should send a file (i.e., the front-end static asset) back as a response to a `GET` request. It should give back an `index.html` from the `./client/build` directory.

```js
app.get('*', function(request, response){
  response.sendFile(path.resolve(__dirname, './client/build', 'index.html'));
});
```

Now that the server can serve up the front-end as a static file as a response to a GET request. We should also take caution on ensuring security for the users.

# Security Packages

- [helmet](https://www.npmjs.com/package/helmet) helps secure Express apps by setting HTTP response headers.

- [xss-clean](https://www.npmjs.com/package/xss-clean) is a Node.js Connect middleware to sanitize user input coming from POST body, GET queries, and url params.

- [express-mongo-sanitize](https://www.npmjs.com/package/express-mongo-sanitize) is a Express 4.x middleware which sanitizes user-supplied data to prevent MongoDB Operator Injection.

- [express-rate-limit](https://www.npmjs.com/package/express-rate-limit) is a Basic rate-limiting middleware for Express. Use to limit repeated requests to public APIs and/or endpoints such as password reset.

```sh
npm i helmet
npm i xss-clean
npm i express-mongo-sanitize
npm i express-rate-limit
```

Now to use them within the server, import then have express app use it. Put this after `express.json()`.

```js
import helmet from 'helmet';
import xss from 'xss-clean';
import mongoSanitize from 'express-mongo-sanitize';

app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
```

## Update on xss-clean

As of June 1, 2023 the package `xss-clean` is no longer supported. So we need to remove it.

npm docs on [Uninstalling packages and dependencies](https://docs.npmjs.com/uninstalling-packages-and-dependencies).

```sh
npm uninstall xss-clean
```

Instead, use [xss-filters](https://github.com/YahooArchive/xss-filters).

Use the npm package
- [xss-filters](https://www.npmjs.com/package/xss-filters) secure output filtering to prevent XSS (Cross-site Scripting).

```sh
npm install xss-filters --save
```

Then on the server we `require`, or in our case import:

```js
import xssFilters from 'xss-filters';
```

Then we can now use it within the server directly:
```js
var express = require('express');
var app = express();
var xssFilters = require('xss-filters');
 
app.get('/', function(req, res){
  var firstname = req.query.firstname; //an untrusted input collected from user
  res.send('<h1> Hello, ' + xssFilters.inHTMLData(firstname) + '!</h1>');
});
 
app.listen(3000);
```

## Sanitize input using xss-filters

The documentation on [xss-filters](https://www.npmjs.com/package/xss-filters), stops malicious & untrusted inputs from being executed as scripts.

Any time the user inputs data, before we save it to the database we should sanitize the inputs.

Let's try it in the `jobsController`, with `createJob`.

```js
const createJob = async (req, res) => {
  // Extract values from the request body
  const { position, company } = req.body;

  // Check if any of the values are empty
  if(!position || !company) {
    throw new BadRequestError('Please Provide All Values');
  }

  // Set the createdBy property to that of the user in the request
  req.body.createdBy = req.user.userId;

  // Create the job in the database
  const job = await Job.create(req.body);

  // Respond with 201, and a json of the job
  res.status(StatusCodes.CREATED).json({ job });
};
```

When we create the job in the database, we should also sanitize the input from the request body. To do so, we use `xssFilters.inHTMLData(inputData)` on any inputs we are extracting from the request `POST` body. 

In this case, we should use `xssFilters` on `company` and `position`. Let's look at the code once again:

```js
import xssFilters from 'xss-filters';

const createJob = async (req, res) => {
  const { position, company } = req.body;
  if(!position || !company) {
    throw new BadRequestError('Please Provide All Values');
  }
  req.body.createdBy = req.user.userId;

  // Create the job in the database
  const job = await Job.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};
```

### Sanitize user input coming from POST Body

Before we add the request details into the database in the following line:

```js
// Create the job in the database
const job = await Job.create(req.body);
```

We need to sanitize the inputs and resave it to the request object.

```js
// Sanitize the inputs
req.body.company = xssFilters.inHTMLData(company);
req.body.position = xssFilters.inHTMLData(position);
```

So now we have 6 steps within `createJob`:

```js
const createJob = async (req, res) => {
  // 1. Extract values from the request body
  const { position, company } = req.body;

  // 2. Check if any of the values are empty
  if(!position || !company) {
    throw new BadRequestError('Please Provide All Values');
  }

  // 3. Sanitize user inputs and save it to the request body
  req.body.company = xssFilters.inHTMLData(company);
  req.body.position = xssFilters.inHTMLData(position);

  // 4. Set the createdBy property for req.body to that of the user
  req.body.createdBy = req.user.userId;

  // 5. Create the job in the database
  const job = await Job.create(req.body);

  // 6. Respond with 201, and a json of the job
  res.status(StatusCodes.CREATED).json({ job });
};
```

## Limit Requests

```sh
npm i express-rate-limit
```

Used to limit repeated requests to public APIs and/or endpoints such as password reset.

This means we are going to use it to limit how many times one can attempt to log-in or register. So use this package within the log-in and register route.

Let's write out the code in `authRoutes.js`

The import:
```js
import rateLimiter from 'express-rate-limit';
```

Now use it to create our API's limiter:
```js
const apiLimiter = rateLimiter({
  // ...
});
```

Here are our `post` requests for the `/register` and `/login` routes:
```js
router.route('/register').post(register);
router.route('/login').post(login);
```

We will use the limiter on these routes specifically. All we have to do is add our limiter as the first argument to post.

[Express Routing](https://expressjs.com/en/guide/routing.html), of notable interest is `express.Router` section which we use here an instance of a complete middleware and routing system.

[Express router.route(path)](https://expressjs.com/en/4x/api.html#router.route), describes `router.route()` method which is a single route thats used to handle HTTP verbs with optional middleware.

We will pass in the limiter as middleware in the `post()` like so:

```js
router.route('/register').post(apiLimiter, register);
router.route('/login').post(apiLimiter, login);
```

Now in the [express-rate-limit docs](https://www.npmjs.com/package/express-rate-limit) under Usage, we can see an examples of how to use the rate limiter. The most relevant are:

1. To use it in a 'regular' web server (e.g. anything that uses `express.static()`), where the rate-limiter should only apply to certain requests:

```js
import rateLimit from 'express-rate-limit'

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to API calls only
app.use('/api', apiLimiter)
```

2. To create multiple instances to apply different rules to different endpoints:

```js
import rateLimit from 'express-rate-limit'

const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.use('/api/', apiLimiter)

const createAccountLimiter = rateLimit({
	windowMs: 60 * 60 * 1000, // 1 hour
	max: 5, // Limit each IP to 5 create account requests per `window` (here, per hour)
	message:
		'Too many accounts created from this IP, please try again after an hour',
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

app.post('/create-account', createAccountLimiter, (request, response) => {
	//...
})
```

In our particular apiLimiter, we'd want to limit the requests to 10 every 15 minutes.

- `legacyHeaders` is set to `true` for backward compatibility. It will send on all response the legacy rate limit headers for limit (X-RateLimit-Limit), current usage (X-RateLimit-Remaining) and reset time (if the store provides it). And also the middleware sends the `Retry-After` header on all blocked requests.

- `standardHeaders` enable support for headers conforming to the [ratelimit standardization draft](https://github.com/ietf-wg-httpapi/ratelimit-headers/blob/main/draft-ietf-httpapi-ratelimit-headers.md) adoptbed by the IETF (`RateLimit-Limit`, `RateLimit-Remaining`, and, if the store supports it, `RateLimit-Reset`). If set to true, the middleware also sends the `Retry-After` header on all blocked requests. May be used in conjunction with, or instead of the `legacyHeaders` option.

```js
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // Limit each IP to 10 requests per `window` (here, per 15 minutes)
  message:
		'Too many accounts created from this IP, please try again after 15 minutes',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
```