// import { lazy } from 'react'
// import { injectReducer } from '@store/index'

// const modulesFiles = require.context('@pages', true, /module.js$/)
// const paths = modulesFiles.keys()

// function capture(fn) {
//   const promise = fn()
//   return promise
// }

// const moduleDefaultExport = (module) => module.default || module

// function loadable(str) {
//   return lazy(() => {
//     const path = `./${str}/module.js`
//     if (paths.includes(path)) {
//       /* eslint-disable */
//       capture(() => import(`@pages/${str}/module.js`)).then((mod) => {
//         const { reducer, name } = moduleDefaultExport(mod)
//         injectReducer(name, reducer)
//       })
//     }
//     return import(`@pages/${str}`)
//   })
// }

// export default loadable
