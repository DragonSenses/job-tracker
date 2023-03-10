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

For example, local state would be needed to show or hide a modal component or to track values for a form component, such as form submission, when the form is disabled and the values of a form???s inputs.

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

You will reach a point in your application where patterns like ???lifting state up??? and passing callbacks down to update your state from components lead to lots and lots of props.

What do you do if you want to update a component???s state from basically anywhere in your app? You turn it into global state.

To manage it, however, you should opt for a third-party solution. Many developers are inclined to use built-in React features like the Context API to manage their state.

The reason to not use Context for global state management lies in the way it works. **The default behavior for Context is to re-render all children components if the value provided to it as a prop changes.**

> To be clear: the Context API is not a state management solution. It is a way to avoid problems like props drilling (creating a bunch of props in components that don???t need it), but it is only helpful for reading state, not updating it.

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

*Context* lets the parent component make some information available to any component in the tree below it???no matter how deep???without passing it explicitly through props.

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

Middleware is a complicated word for a simple concept. A middleware is just a plain JavaScript function that Express will call for you between the time it receives a network request and the time it fires off a response (i.e. it???s a function that sits in the middle). You will eventually be using several of these functions that will run in a specific sequence for every request.

For example, you might have a logger (that prints details of the request to the console), an authenticator (that checks to see if the user is logged in, or otherwise has permission to access whatever they???re requesting) and a static-file server (if the user is requesting a static file then it will send it to them). All of these functions will be called in the order you specify every time there???s a request on the way to your `app.get("/")` function.

It is possible and common to write your own middleware functions (you???ll be doing that later) so let???s take a minute to demystify what they???re actually doing. Middleware functions are just plain JavaScript functions with a specific function signature (that is, it takes a specific set of arguments in a specific order).

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
- IMPORTANT! If you created your React app with create-react-app, please be mindful of that your env variables will become a part of the build, meaning, they will be publicly available for anyone who???d inspect your files. You can still follow the steps below for the development phase so your API keys don???t get into github. Then, before deploying your page, delete the .env file and use the platform???s key management system (see below for Heroku and Netlify).

1. Create a file called .env in the root of your project???s directory.

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

You don???t want this file to be committed to gitHub!

```txt
// .gitignore

# api keys
.env       <-- add this line

# dependencies
/node_modules
...
```

After you???ve saved .gitignore, run `$ git status` to make sure that `.env` is not on the list of changes to be committed.

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

This solution, however, also may not be optimal ???because then how do you protect the access to the backend that proxies the request? Or are you gonna leave this backend endpoint public???? 

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

- `res` or `response` is an object that represents the response that Express is going to send back to the user. Typically, you use the information in the req to determine what you???re going to do with the res by calling res.send() or another method on the object.

- `next` is a function that you see a little less often, but is very important to the functioning of your app. If you are writing or using some middleware that does not send a response back to the user???s client then you *must* call the `next` function at the end of your middleware function. The next function simply tells express to move to the next middleware in the stack, but if you forget to call it then your app will pause and nothing will happen!

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

## 

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