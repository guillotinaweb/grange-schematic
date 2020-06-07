# Getting started with Grange

This Angular schematics allows to setup Grange in an existing Angular project.

It installs all the needed NPM dependencies, updates `angular.json`, and adds extra files for Pastanaga styling and Guillotina backend.

### Usage

Go in an existing Angular project or create a new one:

```bash
ng new my-app
```

Then run the schematic:

```bash
npm install @guillotinaweb/grange-schematic
ng add @guillotinaweb/grange-schematic
```

### Running Guillotina locally

For development purpose, it might be handy to run Guillotina locally. This schematic provides a simple Guillotina configuration.

Note: it requires Docker.

```bash
npm run guillotina
```

To create a new container for an app (named `myapp` in this example):
```bash
curl -XPOST --user root:root http://127.0.0.1:8081/db -d '{
  "@type": "Container",
  "id": "myapp"
}'
```
