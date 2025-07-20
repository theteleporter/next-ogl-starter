import withBundleAnalyzer from "@next/bundle-analyzer"
import withTM from "next-transpile-modules"

/**
 * @type {import('next').NextConfig}
 */
const config = {
  turbopack: {
    rules: {
      '*.glsl': {
        loaders: [
          { loader: 'raw-loader' }
        ],
        as: '*.js',
      },
      '*.vs': {
        loaders: [
          { loader: 'raw-loader' }
        ],
        as loader: 'raw-loader' }
        ],
        as: '*.js',
      },
      '*.vert': {
        loaders: [
          { loader: 'raw-loader' }
        ],
        as: '*.js',
      },
      '*.frag': {
        loaders: [
          { loader: 'raw-loader' }
        ],
        as: '*.js',
      },
    },
  },
}

const createConfig = (_phase, { defaultConfig: _ }) => {
  const plugins = [
    withBundleAnalyzer({ enabled: process.env.ANALYZE === "true" }),
    withTM([]) // añade los módulos que quieres transpilar aquí
  ]
  return plugins.reduce((acc, plugin) => plugin(acc), { ...config })
}

export default createConfig