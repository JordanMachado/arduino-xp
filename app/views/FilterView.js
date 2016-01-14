import Mustache from 'Mustache';
import Emiter from 'component-emitter'
let template = require('./FilterView.tpl');

export default class FilterView extends Emiter{
  constructor(options) {
    super();
    this.el = document.querySelector(options.el);
    this.datas = options.datas;
    this.ui = {}
    this.firstStep =true;
  }

  update(datas) {
    this.firstStep = false;
    this.off();
    this.datas = datas;
    this.hide();
    this.on('hiden',()=>{
      this.render()
    })
  }
  render() {
    let html = Mustache.to_html(template,this.datas);
    this.el.innerHTML = html;
    this.rendered();
  }
  rendered() {
    this.setUI();
    this.setEvents();
    this.setInitialState();
    this.show();
  }
  setUI() {
    // add there all selector
    this.ui.title = document.querySelector('.title');
    this.ui.filters = document.querySelectorAll('.filter');
  }
  setEvents() {

  }
  setInitialState() {
    TweenLite.set(this.ui.title,{
      autoAlpha:0,
      y:20
    });
    TweenLite.set(this.ui.filters,{
      autoAlpha:0,
      y:20
    });
  }
  show() {
    let tl = new TimelineLite({
      onComplete:()=> {
        this.emit('shown');
      }
    });
    tl.to(this.ui.title,0.5,{
      autoAlpha:1,
      y:0,
      delay:  (this.firstStep) ? 1:0
    })
    tl.staggerTo(this.ui.filters,0.5,{
      autoAlpha:1,
      y:0
    },0.25)

  }
  hide() {
    let tl = new TimelineLite({
      onComplete:()=> {
        this.emit('hiden');
        this.setInitialState();
      }
    });
    tl.to(this.ui.title,0.5,{
      autoAlpha:0,
      y:-20
    })
    tl.staggerTo(this.ui.filters,0.5,{
      autoAlpha:0,
      y:-20
    },0.25,'-=0.4')
  }
  selectFilter(number) {
    console.log(this.ui.filters[number-1]);
    TweenLite.to(this.ui.filters[number-1],0.5,{
      scale:1.2
    })
  }
}
