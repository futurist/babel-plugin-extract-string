# babel-plugin-extract-string
Babel plugin to extract string from js source file then save into array

## API

- `Node`

```javascript
import { transform } from 'babel-core'
import extractString from 'babel-plugin-extract-string'

const result = transform(sourceCode, {
    plugins: [ [extractString, {name: 'abc'}] ]
})

console.log(result.code)
```

- `.babelrc`

```json
{
  "presets": ["es2015"],
  "plugins": [ ["extract-string", {"name": "abc"}] ]
}
```


## OPTIONS

`{...}` have below keys

- **name**

Array name to place into code, replace the position of each string, as `arrayName[index]`

- **minLength**

Don't touch string length less than `minLength`

- **file**

Output file to store extracted string (as **json array**)

