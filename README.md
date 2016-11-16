# ng1-ng2-webpack-lazy-uirouter

This is a demo project of lazy-loading both Angular1 AND Angular2 states with ui-router
and bundling them with Webpack2!

Under the hood this uses:
- Angular 2.0.1
- Angular ~1.5.x
- UI-Router 1 Beta
- Angular2 NgUpgrade
- ocLazyLoad
- Webpack2
- Babel 6

## Running
- `yarn`
- `npm start`
- Open browser to [http://localhost:9999](http://localhost:9999)

## Nitty-gritty
### Structure
```
├── app
│   ├── admin - ng2 component module
│   │   ├── admin.component.js - ng2 module for admin state
│   │   ├── admin.module.js - ng2 primary component for admin state
│   │   ├── admin.state.js - State definitions for admin state
│   │   └── reset  - ng2 sub-state component
│   │       └── reset.component.js - ng2 component
│   │
│   ├── common - ng1/ng2 common modules
│   │   ├── common-ng1.module.js - ng1 common module (includes downgraded ng2)
│   │   ├── common-ng2.module.js - ng2 common module (includes upgraded ng1)
│   │   ├── components
│   │   │   ├── button.component.js - ng1 component
│   │   │   └── toggle.component.js - ng2 component
│   │   └── services
│   │       ├── admin.service.js - ng2 service
│   │       └── login.service.js - ng1 service
│   │
│   ├── login - ng1 component module
│   │   ├── hello - ng1 subview component
│   │   │   ├── hello.controller.js - ng1 controller
│   │   │   └── hello.template.js - es6 template
│   │   │
│   │   ├── login.controller.js - ng1 controller
│   │   ├── login.module.js - ng1 module
│   │   ├── login.state.js - login states
│   │   └── login.template.js - es6 template
│   │
│   ├── app.module.js - ng1 main app module
│   ├── app.state.js- state definitions for lazy-loading
│   └── upgrade.module.js - ng2 upgrade module
│
├── utils
│   ├── configRouting.js - Basic config for our ui-router
│   ├── loadNg1Module.js - ocLazyLoad wrapper inside of ui-router transition callback
│   └── loadNg2Module.js - Magic that lazy-loads ng2 stuff, this will be in ui-router next release
│
├── adapter.js - angular upgrade adapter
├── bootstrap.js - bootstrap ng1 module via adapter
├── polyfills.js - corejs and such to be loaded by webpack
└── vendor.js - external libs that need to be loaded by webpack
```

### How does this work?

#### Adapter Magic
In `./adapter.js` we create a new Angular2 `UpgradeAdapter`. During this time we include
require in `./app/upgrade.module.js` which is the Angular2 master module that is
Angular uses under the hood to orchestrate the upgrade process.

If you have components/pipes/providers that need to be registered globally
`UpgradeModule` is the module to do that in. In there you can see where I include
`CommonNg2Module` which contains ng2 providers and components along with
upgraded ng1 services and directives.

You might also notice that in the adapter file, I also use `require` to bring
in the `UpgradeModule` after the adapter. You might also notice that in the
`UpgradeAdapter` I also use `forwardRef` in the function invocation. This is because
several other files need to include and use the adapter. For example, in `./app/common/common-ng2-module.js`
we import the adapter so we can upgrade ng1 components. Without doing this, the module loader
tries to include `UpgradeModule` which imports `CommonNg2Module` which imports the adapter.
By including the `UpgradeModule` after the adapter is created the modules load in order, however,
because classes aren't hoisted `UpgradeModule` is not available. We can use the `forwardRef` function
to accomplish this so that at runtime things are brought together at the right time.

Since we are upgrading ng1 components and services, we need a common module for ng1 that is
registered at runtime without lazy-loading so that the adapter knows how to resolve
those ng1 dependencies.

Its important to note due to the scoping of ng2, we also have to include `CommonNg2Module`
in all the state modules such as `AdminModule`.

#### Router Magic
UI-Router has the ability for us to define what we call 'future states'. These are states
that tell the router, 'hey i know about something here!' lets load it and then re-run state compilation
which now includes the new state metadata.

Ok, thats cool but why not just declare them all in one place? Sometimes your states can get very
comprehensive with resolves, substate definitions, etc. All that information would need to be loaded
in the initial download causing the payload to increase. Also, all of that logic should live next
to where its defined so having the comprehensive states in the module definition is ideal.

#### Lazy Loading Magic
Webpack allows us to do 'code splitting' which will statically analyze the code to find
`System.import('some-file.js')` and at build time re-write this to reference some magical
bundle it made. Its important to note, this is static code analysis, so doing fancy code
that does this all black magic will not work since it actually changes your code to a new path.
If you use the system-js loader plugin, you can accomplish the later but for this demonstration
we do not do that.

Looking at `./app/app.state.js` we see I have some `System.import`s wrapped in 2 different
functions. The first function (`loadNg1Module`) is a Angular1 helper that calls `./utils/loadNg1Module.js` function
that when invoked will pass the resolve promise from the import to ocLazyLoad to recursively
resolve and register all our ng1 modules. Next there is a function called `loadNg2Default` which is
really just a wrapper around `loadNgModule` in `./utils/loadNg2Module.js`. This wrapper just
resolves the default module from the import and passes it to `loadNgModule` which is internal
code to ui-router to do ng2 lazy-loading.
