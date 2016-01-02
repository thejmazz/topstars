# topstars

Simple React app for GitHub search API. Returns repos from start date to end
date ordered by number of stars. Browse the most popular open source projects
of all time!

Demo: [thejmazz.github.io/topstars](http://thejmazz.github.io/topstars/)

## Dev Server

```bash
$ webpack-dev-server
```

## Build

```bash
$ webpack
$ # yeah, I know..
$ cp public/index.html build
```

## Tech

- [react](https://facebook.github.io/react)
- [webpack](https://webpack.github.io/)
- [babel](http://babeljs.io/)
  - [es2015](http://babeljs.io/docs/plugins/preset-es2015/)
  - [stage-3](http://babeljs.io/docs/plugins/preset-stage-3/)
    - [async-to-generator](http://babeljs.io/docs/plugins/transform-async-to-generator)
    - [exponentiation-operator](http://babeljs.io/docs/plugins/transform-exponentiation-operator)
  - [react](http://babeljs.io/docs/plugins/preset-react/)
  - [transform-class-properties](http://babeljs.io/docs/plugins/transform-class-properties/)
- Fetch - [mdn](https://developer.mozilla.org/en/docs/Web/API/Fetch_API), [That's so fetch!](https://jakearchibald.com/2015/thats-so-fetch/)
- [material ui](http://www.material-ui.com/#/)
- [react-bootstrap](https://react-bootstrap.github.io/)


Transform class properties so that we can do this inside classes and autobind
`this` through the arrow function:

```js
class Car extends Vehicle {
  constructor() {
    this.wheels = 4
  }

  drive = () => {
    console.log(`Spinning ${this.wheels} wheels`)
  }
}
```

Async/Await + Fetch, in `util.js`:

```js
export async function fetchJSON(uri)  {
  try {
    let res = await fetch(uri)
    let data = await res.json()
    return data
  } catch (e) {
    console.error(e)
  }
}
```

and consumed in `SearchResults.js` (also using stage-1 class properties):

```js
// ...
fetchNewData = async function(props) {
  let data = await fetchJSON(props.uri)
  console.log(data)
  this.setState({
    items: data.items
  })
}
```
