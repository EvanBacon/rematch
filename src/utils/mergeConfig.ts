import { Config, PluginCreator } from '../typings/rematch'

const merge = (original: object, next: object): any => {
  return (next) ? { ...next, ...(original || {}) } : original || {}
}

// merges init config with plugin configs
export default (config: Config): Config => {
  // defaults
  const plugins = config.plugins || []
  return (plugins).reduce((merged: Config, plugin: PluginCreator): Config => {
    if (plugin.config) {

      // models
      merged.models = merge(merged.models, plugin.config.models)

      // plugins
      if (plugin.config.plugins) {
        merged.plugins = merged.plugins.concat(plugin.config.plugins)
      }

      // redux
      if (plugin.config.redux) {
        merged.redux.initialState = merge(merged.redux.initialState, plugin.config.redux.initialState)
        merged.redux.reducers = merge(merged.redux.reducers, plugin.config.redux.reducers)
        if (plugin.config.redux.enhancers) {
          merged.redux.enhancers = merged.redux.enhancers.concat(plugin.config.redux.enhancers)
        }
        merged.redux.combineReducers = merged.redux.combineReducers || plugin.config.redux.combineReducers
        merged.redux.createStore = merged.redux.createStore || plugin.config.redux.createStore
      }
    }
    return merged
  }, config)
}
