# React-TypeStyle preset using both React-TypeStyle and React-TypeStyle-Inline

[![wercker status](https://app.wercker.com/status/25454c4abb7b724e18e2ef99312d058b/s/master "wercker status")](https://app.wercker.com/project/byKey/25454c4abb7b724e18e2ef99312d058b)

React-TypeStyle-Preset provides a ready to use [React-TypeStyle](https://www.npmjs.com/package/react-typestyle) + [React-TypeStyle-Inline](https://www.npmjs.com/package/react-typestyle-inline) setup including [inline-style-prefixer](https://www.npmjs.com/package/inline-style-prefixer) for autoprefixing.

## Install

using [yarn](https://yarnpkg.com/en/)
```shell
yarn add react-typestyle-preset react-typestyle react-typestyle-inline
```

or npm
```shell
npm install --save react-typestyle-preset react-typestyle react-typestyle-inline
```

## Usage
Just add a static ```styles``` and ```inlineStyles``` field to your React component and wrap it in the ```withStyles``` higher-order component. You can now access generated classNames & inline styles via ```props.classNames```/```props.styles```.

### Example
#### TypeScript
```typescript
import { InputSheet } from 'react-typestyle';
import withStyles, { InjectedProps } from 'react-typestyle-preset';

interface Props {
  name: string;
  pos: { x: number, y: number };
  theme: { color: string };
}

class Component extends React.PureComponent<Props & InjectedProps> {
  public static styles: InputSheet<Props> = {
    button: {
      background: 'transparent',
      border: 'none',
    },
    root: (props) => ({
      color: props.theme.color,
      position: 'absolute',
    }),
  };

  public static inlineStyles: InputSheet<Props> = (props) => ({
    root: {
      transform: `translate(${props.pos.x}px,${props.pos.y}px)`,
    },
  })

  public render() {
    const { classNames, name, styles } = this.props;
    return (
      <div className={classNames.root} style={styles.root}>
        <button className={classNames.button} style={styles.button}>{name}</button>
      </div>
    );
  }
}

export default withStyles<Props>(Component);
```

#### JavaScript
```javascript
import withStyles from 'react-typestyle-preset';

class Component extends React.PureComponent {
  static styles = {
    button: {
      background: 'transparent',
      border: 'none',
    },
    root: (props) => ({
      color: props.theme.color,
      position: 'absolute',
    }),
  };

  static inlineStyles = (props) => ({
    root: {
      transform: `translate(${props.pos.x}px,${props.pos.y}px)`,
    },
  })

  render() {
    const { classNames, name, styles } = this.props;
    return (
      <div className={classNames.root} style={styles.root}>
        <button className={classNames.button} style={styles.button}>{name}</button>
      </div>
    );
  }
}

export default withStyles(Component);
```

## Developing

This is what you do after you have cloned the repository:

```shell
yarn / npm install
npm run build
```

(Install dependencies & build the project.)

### Linting

Execute TSLint

```shell
npm run lint
```

Try to automatically fix linting errors
```shell
npm run lint:fix
```

### Testing

Execute Jest unit tests using

```shell
npm test
```

Tests are defined in the same directory the module lives in. They are specified in '[module].test.js' files.

### Building

To build the project, execute

```shell
npm run build
```

This saves the production ready code into 'dist/'.
