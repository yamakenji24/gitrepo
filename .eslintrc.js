module.exports = {
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "airbnb",
    ],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: "module",
    },
    plugins: ["react"],
    rules: {
        "import/prefer-default-export": 0,
        "space-before-function-paren": ["error", {
            "anonymous": "never",
            "named": "never",
            "asyncArrow": "always"
        }],
        "keyword-spacing": ["error", {
            "before": true,
            "after": true
        }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    },
};
