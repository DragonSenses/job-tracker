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

It can toggle to a Log-In form with just `Email` and `Password`

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

Now inside the function let's create a [React Hook](https://reactjs.org/docs/hooks-overview.html). 

Let's import `useState` first:

```jsx
import React, { useState } from 'react'
```

```jsx
const [values, setValues] = useState(initialState);
```

We use array destructuring to give different names to the state variables. 

- where `values` represent the the `initialState` object
- and `setValues` function will control the state

- The initial state argument is only used during the first render.

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

Going to have a wrapper with `full-page` class for CSS styles to apply, along with a `form`. The `Logo` will be on top along with some header text like "Log-In" or "Register". After we create a div with className "form-row". 

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

