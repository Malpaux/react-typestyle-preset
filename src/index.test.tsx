/**
 * Important: This test also serves as a point to
 * import the entire lib for coverage reporting
 */

import { shallow } from 'enzyme';
import * as React from 'react';

import { defaultRenderer } from 'react-typestyle';

import withStyles, * as lib from './';

describe('Entry point', () => {
  it('should have exports', () => {
    expect(lib).toBeTruthy();
    expect(Object.keys(lib).length).not.toBe(0);
  });

  xit('should not have undefined exports', () => {
    Object.keys(lib).forEach((key) => {
      expect((lib as { [key: string]: any })[key]).toBeTruthy();
    });
  });
});

describe('withStyles higher-order component', () => {
  it('should work', () => {
    interface Props {
      name: string;
      pos: { x: number, y: number };
      theme: { [key: string]: any };
    }
    const BaseComponent = ((props) => (
      <div className={props.classNames.root} style={props.styles.root}>
        <button
          className={props.classNames.button}
          style={props.styles.button}
        >
          {props.name}
        </button>
      </div>
    )) as lib.StyledStatelessComponent<Props & lib.InjectedProps>;

    BaseComponent.styles = {
      button: ({ theme: { color, bg } }) => ({
        $nest: {
          a: {
            background: bg,
          },
        },
        background: bg,
        color,
      }),
      root: {
        position: 'absolute',
      },
    };

    BaseComponent.inlineStyles = ({ pos }) => ({
      root: {
        cursor: ['move', 'grab'],
        sub: { cursor: 'move' },
        transform: pos && `translate(${pos.x}px,${pos.y}px)`,
      },
    }) as any;

    const WrappedComponent = withStyles<Props>(BaseComponent);

    const theme = { bg: '#000', color: '#fff' };

    const outerComponent = shallow((
      <WrappedComponent
        name="Test"
        pos={{ x: 256, y: 128 }}
        theme={theme}
      />
    ));
    const component = outerComponent.dive();

    const classNames = (component.prop('classNames') as {[name: string]: any});
    const style = `.${classNames.root}{position:absolute}.${
      classNames.button}{background:#000;color:#fff}.${
        classNames.button} a{background:#000}`;
    expect(defaultRenderer.getStyles()).toBe(style);

    const styles = (component.prop('styles') as {[name: string]: any});
    expect(styles.root).toEqual({
      cursor: 'move',
      sub: { cursor: 'move' },
      transform: 'translate(256px,128px)',
      WebkitTransform: 'translate(256px,128px)',
    });

    const component2 = outerComponent.setProps({
      name: 'Test',
      pos: { x: 512, y: 0 },
      theme,
    }).dive();

    const classNames2 = (component2.prop('classNames') as {[name: string]: any});
    expect(classNames2.button).toBe(classNames.button);
    expect(classNames2.root).toBe(classNames.root);
    expect(defaultRenderer.getStyles()).toBe(style);

    const styles2 = (component2.prop('styles') as {[name: string]: any});
    expect(styles2.root).toEqual({
      cursor: 'move',
      sub: { cursor: 'move' },
      transform: 'translate(512px,0px)',
      WebkitTransform: 'translate(512px,0px)',
    });

    outerComponent.unmount();
    expect(defaultRenderer.getStyles()).toBe('');
  });
});
