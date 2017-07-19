/**
 * react-typestyle-preset utilities
 * @module react-typestyle-preset/internal/utils
 * @author Paul Brachmann
 * @license Copyright (c) 2017 Malpaux IoT All Rights Reserved.
 */

export const isObject = (value: any): boolean =>
  value && typeof value === 'object' && !Array.isArray(value);
