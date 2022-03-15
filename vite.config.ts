import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join } from 'path'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    // @ts-ignore
    const env = loadEnv(mode, process.cwd())
    return {
        base: env.VITE_ASSET_URL,
        plugins: [vue()],
        resolve: {
            alias: [
                {
                    find: "@",
                    replacement: join(__dirname, 'src')
                }
            ]
        }
    }
})
