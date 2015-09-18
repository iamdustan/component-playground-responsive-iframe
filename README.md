# React Component Responsive Iframe

The [component-playground](https://github.com/FormidableLabs/component-playground)
now supports custom renderers for previewing your components. Quite often,
components need to be responsive to both window and local layout constraints.
This component is intended to give you the opportunity to view your components
in an isolated `<iframe />` to see it interact with multiple layouts.

This component scrapes and loads all `<style />` and `<link rel="stylesheet" />`
components from the host page under the assumption that the styles to render the
component exist in the host page and should be transferred to the iframe context
as well.

## Preview

![Preview this in action](http://i.imgur.com/HwKxSpt.gif)

## MIT License

The MIT License (MIT)

Copyright (c) 2015 Dustan Kasten

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

