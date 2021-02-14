# Testing Setup

Following this tutorial got things working the easiest. 

[https://levelup.gitconnected.com/configuring-jest-for-next-js-react-and-babel-from-scratch-bb3b7751329b](https://levelup.gitconnected.com/configuring-jest-for-next-js-react-and-babel-from-scratch-bb3b7751329b)


Had to install `identity-obj-proxy` for handling components that import CSS as objects. And then update this section in `jest.config.js`

> `jest.config.js`

```js
moduleNameMapper: {
      '\\.(css|less)$': 'identity-obj-proxy',
    },
```


Reference

- Jest, `example`: [https://jestjs.io/docs/en/expect](https://jestjs.io/docs/en/expect)
- identity-obj-proxy: [https://github.com/keyz/identity-obj-proxy](https://github.com/keyz/identity-obj-proxy)


Further Reading: [https://dev.to/toomuchdesign/dom-testing-next-js-applications-46ke](https://dev.to/toomuchdesign/dom-testing-next-js-applications-46ke)