/**
 * Inline styles fallback resolver plugin for react-typestyle
 * @module react-typestyle-preset/plugins/resolvefirst
 * @author Paul Brachmann
 * @license Copyright (c) 2017 Malpaux IoT All Rights Reserved.
 */

import { isObject } from '../internal/utils';

const resolveFirst = (style: { [property: string]: any }): { [property: string]: any } => {
  const result: { [property: string]: any } = {};

  Object.keys(style).forEach((propertyName) => {
    const propertyValue = style[propertyName];

    result[propertyName] = isObject(propertyValue) ?
      resolveFirst(propertyValue)
    : (Array.isArray(propertyValue) ?
      propertyValue[0]
    : propertyValue);
  });

  return result;
};

export default resolveFirst;
