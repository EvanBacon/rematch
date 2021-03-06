import { Exposed, PluginCreator } from '../typings/rematch'
import validate from './validate'

export default (plugins: PluginCreator[]): Exposed =>
  plugins.reduce((exposed: any, plugin: PluginCreator) => ({
    ...exposed,
    ...(plugin.expose || {}),
  }), {
    validate,
  })
