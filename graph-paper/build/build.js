import StyleDictionary from 'style-dictionary';

const PREFIX = 'ds';

/**
 * Group flattened tokens into a Tailwind `theme.extend` map.
 * Each entry references the generated CSS variable, so Tailwind utilities and
 * raw CSS always resolve to the same value.
 */
function buildTailwindTheme(allTokens) {
  const theme = {
    colors: {}, spacing: {}, borderRadius: {}, borderWidth: {},
    boxShadow: {}, fontSize: {}, fontWeight: {}, fontFamily: {},
    lineHeight: {}, letterSpacing: {},
  };

  const routes = [
    [['color'], 'colors', 1],
    [['space'], 'spacing', 1],
    [['radius'], 'borderRadius', 1],
    [['border', 'width'], 'borderWidth', 2],
    [['shadow'], 'boxShadow', 1],
    [['font', 'size'], 'fontSize', 2],
    [['font', 'weight'], 'fontWeight', 2],
    [['font', 'family'], 'fontFamily', 2],
    [['font', 'lineHeight'], 'lineHeight', 2],
    [['font', 'letterSpacing'], 'letterSpacing', 2],
  ];

  for (const token of allTokens) {
    for (const [prefixPath, themeKey, drop] of routes) {
      const matches = prefixPath.every((seg, i) => token.path[i] === seg);
      if (!matches) continue;
      const key = token.path.slice(drop).join('-');
      // token.name already includes the platform prefix (e.g. "ds-color-...").
      theme[themeKey][key] = `var(--${token.name})`;
      break;
    }
  }
  return theme;
}

StyleDictionary.registerFormat({
  name: 'tailwind/preset',
  format: ({ dictionary }) => {
    const theme = buildTailwindTheme(dictionary.allTokens);
    return (
      '/** Auto-generated from tokens/ — do not edit. Run `npm run build`. */\n' +
      'export default {\n  theme: {\n    extend: ' +
      JSON.stringify(theme, null, 6).replace(/\n/g, '\n    ') +
      ',\n  },\n};\n'
    );
  },
});

StyleDictionary.registerFormat({
  name: 'typescript/nested',
  format: ({ dictionary }) => {
    const root = {};
    for (const token of dictionary.allTokens) {
      // DTCG inputs expose the resolved value on $value; fall back to .value.
      const value = token.$value ?? token.value;
      let node = root;
      token.path.forEach((seg, i) => {
        if (i === token.path.length - 1) node[seg] = value;
        else node = node[seg] ??= {};
      });
    }
    return (
      '/** Auto-generated from tokens/ — do not edit. Run `npm run build`. */\n' +
      'export const tokens = ' + JSON.stringify(root, null, 2) + ' as const;\n\n' +
      'export type Tokens = typeof tokens;\n'
    );
  },
});

const sd = new StyleDictionary({
  source: ['tokens/**/*.json'],
  log: { verbosity: 'verbose' },
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: PREFIX,
      buildPath: 'dist/css/',
      files: [{
        destination: 'tokens.css',
        format: 'css/variables',
        options: { outputReferences: true },
      }],
    },
    tailwind: {
      transformGroup: 'css',
      prefix: PREFIX,
      buildPath: 'dist/tailwind/',
      files: [{ destination: 'preset.js', format: 'tailwind/preset' }],
    },
    ts: {
      transformGroup: 'css',
      buildPath: 'dist/ts/',
      files: [{ destination: 'tokens.ts', format: 'typescript/nested' }],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
console.log('\n✓ Tokens built → dist/{css,tailwind,ts}');
