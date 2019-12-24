// import "@babel/polyfill";
import Header from "@/header";
import Content from "@/content";
import Footer from "@/footer";
import aNumber from '@/type.ts'
import img from '@/1.jpg'
import _ from 'lodash'
// import $ from "jquery"

// import style from './index.scss'  // css module

import './index.scss'
import './style.css'

let root = document.getElementById('root')

new Header(root)
new Content(root)
new Footer(root)

const huaji = new Image()
huaji.src = img
huaji.classList.add('huaji')
// huaji.classList.add(style.huaji)

root.append(huaji)

console.log(123456)

const btn = document.createElement('button')
btn.innerHTML = '新增'
btn.onclick = function () {
  const item = document.createElement('div')
  item.innerHTML = 'item'
  item.classList.add('li')
  document.body.append(item)
}

document.body.append(btn)

new Promise((resolve) => {
  resolve(123)
}).then(data => {
  console.log(data)
})

const dom = $('<div>')
dom.html(_.join(['dell', 'lee']), ' ')
$('body').append(dom)

console.log(this)  //  不指向window，如果想指向window就要使用import-loader

console.log(aNumber, 'typescript')

console.log('Hello dell!')

function getComponent() {
  return import('./moduleA').then(({moduleA}) => {
    console.log(moduleA)
  })
}

getComponent()
