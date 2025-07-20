import withBundleAnalyzer from '@next/bundle-analyzer'
import withTM from 'next-transpile-modules'
import type { NextConfig } from 'next'
import type { WebpackConfigContext } from 'next/dist/server/config-shared'

const baseConfig: NextConfig = {
  reactStrictMode: true,

  // fallback for Webpack 
  webpack: (config: WebpackConfigContext['config'], _options: WebpackConfigContext) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader']
    })

    return config
  },

  // optional Turbopack custom rules
  turbopack: {
    rules: {
      '.glsl': {
        as: 'js',
        loaders: ['raw-loader', 'glslify-loader']
      },
      '.frag': {
        as: 'js',
        loaders: ['raw-loader', 'glslify-loader']
      },
      '.vert': {
        as: 'js',
        loaders: ['raw-loader', 'glslify-loader']
      }
    }
  }
}

const createConfig = (_phase: any, { defaultConfig: _ }: { defaultConfig: any }) => {
  const plugins = [
    withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' }),
    withTM([]) // add modules to transpile if needed
  ]

  return plugins.reduce((acc, plugin) => plugin(acc), { ...baseConfig })
}

export default createConfig
