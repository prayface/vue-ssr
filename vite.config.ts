import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
    // @ts-ignore
    const env = loadEnv(mode, process.cwd())
    return {
        base: env.VITE_ASSET_URL,
        plugins: [vue()],
    }
})
