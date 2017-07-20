/**
 * @file The main entry point
 * @author Paul Brachmann
 * @license Copyright (c) 2017 Malpaux IoT All Rights Reserved.
 */

/**
 * The main entry point
 * @module react-typestyle-preset
 * @author Paul Brachmann
 * @license Copyright (c) 2017 Malpaux IoT All Rights Reserved.
 */

import * as React from 'react';

import withStylesSetup, * as style from 'react-typestyle';
import withInlineStylesSetup, * as inline from 'react-typestyle-inline';

import prefixerPlugin from './plugins/prefixer';
import resolveFirstPlugin from './plugins/resolvefirst';

export interface InjectedProps extends style.InjectedProps, inline.InjectedProps {}
export interface ComponentOptions<P> {
  inlineStyles?: inline.InputSheet<P>;
  styles?: style.InputSheet<P>;
}
export type StyledStatelessComponent<P = {}> = React.StatelessComponent<P> & ComponentOptions<P>;

const withStyles = withStylesSetup({
  plugins: [prefixerPlugin],
  shouldStylesUpdate: (props, nextProps) =>
    (props as { [key: string]: any }).theme !== (nextProps as { [key: string]: any }).theme,
});

const withInlineStyles = withInlineStylesSetup({
  plugins: [prefixerPlugin, resolveFirstPlugin],
});

/** Higher-order component */
export default <OriginalProps extends {}>(
    Component: ((React.ComponentClass<OriginalProps & InjectedProps>
      | React.StatelessComponent<OriginalProps & InjectedProps>)
    & ComponentOptions<Readonly<OriginalProps>>),
    componentOptions: ComponentOptions<Readonly<OriginalProps>> = {},
  ) =>
    (withStyles<OriginalProps>(
      (withInlineStyles<OriginalProps & style.InjectedProps>(
        Component,
        { styles: componentOptions.inlineStyles || Component.inlineStyles },
      ) as React.ComponentClass<OriginalProps & style.InjectedProps>),
      { styles: componentOptions.styles || Component.styles },
    ) as React.ComponentClass<Readonly<OriginalProps>>);
