/**
 * Autoprefixer plugin for react-typestyle
 * @module react-typestyle-preset/plugins/prefixer
 * @author Paul Brachmann
 * @license Copyright (c) 2017 Malpaux IoT All Rights Reserved.
 */

import * as prefix from 'inline-style-prefixer/static';

import { isObject } from '../internal/utils';

/** Recursively add vendor prefixes */
const addVendorPrefixes = (style: { [property: string]: any }): { [property: string]: any } => {
  const result: { [property: string]: any } = {};

  Object.keys(style).forEach((propertyName) => {
    const propertyValue = style[propertyName];
    if (isObject(propertyValue)) {
      result[propertyName] = addVendorPrefixes(propertyValue);
    } else {
      Object.assign(result, prefix({ [propertyName]: propertyValue }));
    }
  });

  return result;
};

export default addVendorPrefixes;
