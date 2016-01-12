import Mustache from 'Mustache';

let template = require('./FilterView.tpl');

export default class FilterView {
  constructor(options) {
    this.el = document.querySelector(options.el);
    this.datas = options.datas;
    this.ui = {}
  }
  show() {

  }
  hide() {

  }
  update(datas) {
    this.datas = datas;
  }
  render() {
    let html = Mustache.to_html(template,this.datas);
    this.el.innerHTML = html;
    this.rendered();
  }
  rendered() {
    this.setUI();
    this.setEvents();
  }
  setUI() {
    // add there all selector
    this.ui.close = document.querySelector('.close');
  }
  setEvents() {

  }
}
