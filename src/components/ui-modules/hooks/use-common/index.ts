export const useSizeProp = {
    type: String,
    default: 'default',
    validator: (val: string) => ['large', 'default', 'small'].indexOf(val) !== -1
}