module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['react-native-reanimated/plugin'],
    [
      'module-resolver',
      {
        root: ['.'],
        alias: [
          {'@assets': './src/assets'},
          {'@bootstrap': './src/bootstrap'},
          {'@configs': './src/configs'},
          {'@components-cards': './src/components/cards'},
          {'@components-containers': './src/components/containers'},
          {'@components-generics': './src/components/generics'},
          {'@components-derivatives': './src/components/derivatives'},
          {'@components-modals': './src/components/modals'},
          {'@dummy': ['./src/dummy/']},
          {'@hook': './src/hooks'},
          {'@metadata': './src/metadata'},
          {'@middleware': './src/middlewares'},
          {'@modules': './src/modules'},
          {'@navigation': './src/navigation'},
          {'@routes': './src/routes'},
          {'@stores': './src/stores'},
          {'@utils': './src/utils'},
        ],
        extensions: [
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.ios.js',
          '.android.js',
          'json',
          '.png',
          '.svg',
          '.jpeg',
          '.jpg',
        ],
      },
    ],
  ],
  env: {
    production: {
      plugins: ['react-native-paper/babel'],
    },
  },
};
