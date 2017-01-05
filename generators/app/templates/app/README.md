## Installation

```bash
npm install
```

## Running your component library

```bash
npm run serve
```

This will compile and watch all your assets and serve your component library from `http://localhost:3000`.

## Creating new components

Run `yo twig-component-library:component` from your project folder to create a new component.

Components are currently structured inline with Brad Frost's [Atomic Design](http://atomicdesign.bradfrost.com/) principles.

Each component will be generated with the following files:

### data/base.json

The data folder houses your dummy data which the component library uses to show your component in different states. You need at least one json file.

### \_component.scss

Your components stylesheet. Try not to reference other components. Base styles and variables can be found in `src/styles`.

### component.js

Any scripts this component might need. You'll need to import this file within `src/scripts/main.js` e.g.

```
import button from '../components/atoms/button/button'

button();
```

### component.schema.json

Your [JSON Schema](http://json-schema.org/) describes the data your component takes and is used to produce a table of properties within the component library. Very useful for backend developers who need to know what parameters to throw at your component.

### component.twig

This is your [Twig](http://twig.sensiolabs.org/) template file.

### Readme.md

Use your readme file to provide any additional information about your component.
