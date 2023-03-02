# journey

Documenting my steps while making `job-tracker`

# 1. Initial Set-Up

Just going to make a working list of my the tools, environment, etc.

- Visual Studio Code
  - VS Code's [ES7+ React/Redux/React-Native snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets) install @ extensions tab
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
Background Color | #209CEE


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
Font Color | #209CEE
Text| J
Font Color | white
Shape | Rounded
Color | #209CEE

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
