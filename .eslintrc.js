module.exports = {
    root: true,

    env: {
        node: true
    },

    extends: [
        "eslint:recommended",
        "plugin:vue/recommended"
    ],

    rules: {
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'vue/multi-word-component-names': 'off'
    },

    globals: {
        page: true,
        browser: true
    }
}
