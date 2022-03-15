import { isString } from "@vue/shared"

export const props = {
    top: {
        type: [String, Number],
        default: 0
    },
    left: {
        type: [String, Number],
        default: 0
    },
    right: {
        type: [String, Number],
        default: 0
    },
    bottom: {
        type: [String, Number],
        default: 0
    }
}

export const emits = {
    input: (value: string) => isString(value)
}

