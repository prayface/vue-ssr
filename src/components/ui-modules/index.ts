import { App } from 'vue'
import './less/ui-modules.less'
import * as DialogComplate from './modules/dialog-modules/dialog-complate'

const modules = import.meta.globEager("./modules/**/index.ts")

export default {
    DialogComplate: DialogComplate,
    install: (app: App) => {
        Object.values(modules).map((module) => {
            app.component(module.name, module.default)
        })
    },
}
