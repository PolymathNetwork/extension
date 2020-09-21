/* eslint-disable sort-keys */
// Copyright 2019-2020 @polkadot/extension authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

const config = require('@polkadot/dev/config/jest');

module.exports = Object.assign({}, config, {
  browser: true,
  moduleNameMapper: {
    '@polkadot/extension-(base|chains|dapp|inject|ui)(.*)$': '<rootDir>/packages/extension-$1/src/$2',
    '@polkadot/extension(.*)$': '<rootDir>/packages/extension/src/$1',
    '@polymath/extension-(polymesh|polymesh-ui)': '<rootDir>/packages/extension-$1/src/$2',
    '\\.(css|less)$': 'empty/object',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/extension/build',
    '<rootDir>/packages/extension-base/build',
    '<rootDir>/packages/extension-chains/build',
    '<rootDir>/packages/extension-dapp/build',
    '<rootDir>/packages/extension-inject/build',
    '<rootDir>/packages/extension-ui/build'
  ]
});
