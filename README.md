# Training Angular dengan Back-End .NET
Hallo, kali ini saya belajar angular dengan integrasi ke API .NET (Web Api2) dan koneksi database PostgreSQL.
Beberapa menu yg ada di project yaitu :
- Login
- Register
- Info
- Master Employee
- Master Area
- Change Password


# Project structure

```
dist/                        compiled version
docs/                        project docs and coding guides
e2e/                         end-to-end tests
src/                         project source code
|- app/                      app components
|  |- app.component.*        app root component (shell)
|  |- accounts.component.*   account component
|  |  |- change-password.*   change password component for Change Password
|  |  |- register.*          register component for Register an account
|  |- employees.component.*  employees component for parent component of Master Employee
|  |  |- manage-employee.*   manage employee component for Add/Edit data Employee.
|  |  |- employee-list.*     employee list component for show list of Employee Data, Search & Delete.
|  |- areas.component.*      areas component for parent component of Master Area
|  |  |- area-employee.*     manage area component for Add/Edit data Area.
|  |  |- area-list.*         area list component for show list of Area Data, Search & Delete.
|  |- home.component.*       home component for routing page for Info, Master Emplyee, Master Area & Change Password
|  |  |- info.*              info component for show Employee Name currently logged.
|  |- login.component.*      login component for Login.
|  |- page-not-found.*       page not found component for routing if wrong route/url.
|  |- shared                 shared folder for services & model class.
|  |  |- account.model.ts    model class for Account.
|  |  |- account.service.ts  account service for manage integration data (GET,POST,etc),global variable & call method/function.
|  |  |- area.model.ts       model class for Area.
|  |  |- area.service.ts     area service for manage integration data (GET,POST,etc),global variable & call method/function.
|  |  |- employee.model.ts   model class for Employee.
|  |  |- employee.service.ts     employee service for manage integration data (GET,POST,etc),global variable & call method/function.
|  |- app.module.ts          app root module definition
|  |- app-routing.module.ts  app routes
|  +- ...                    additional modules and components
|- assets/                   app assets (images)
|- environments/             values for various build environments
|- index.html                html entry point
|- polyfills.ts              polyfills needed by Angular
reports/                     test and coverage reports
proxy.conf.js                backend proxy configuration
```

# DatabinApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
