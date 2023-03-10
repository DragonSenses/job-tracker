# journey

Documenting my steps while making `job-tracker`

# 1. Initial Set-Up

Just going to make a working list of my the tools, environment, etc.

- Visual Studio Code
  - VS Code's [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) install @ extensions tab
  - vscode-styled-components
- Windows Terminal
- Node.js (along with `npm`)


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

