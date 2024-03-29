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
    this.isRendered = false;
  }

  update(datas) {
    this.firstStep = false;
    this.off();
    this.datas = datas;
    this.hide();

  }
  render() {
    let html = Mustache.to_html(template,this.datas);
    this.el.innerHTML = html;
    let height = ( window.innerHeight -(window.innerWidth/2 / 1.4)) / 2;
    this.el.style.height = height+'px';
    this.el.style.width = window.innerWidth/2 + 'px'

    this.rendered();
  }
  rendered() {
    this.isRendered = true;
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
    console.log('show');
    let tl = new TimelineLite({
      onComplete:()=> {
        this.emit('shown');
      }
    });
    tl.to(this.ui.title,0.5,{
      autoAlpha:1,
      y:0,
      delay:  (this.firstStep) ? 1:0,
      ease:Quad.easeOut
    })
    tl.staggerTo(this.ui.filters,0.3,{
      autoAlpha:1,
      y:0,
      ease:Quad.easeOut
    },0.2)

  }
  hide() {
    console.log('hide');
    let tl = new TimelineLite({
      onComplete:()=> {
        this.emit('hiden');
      //  this.setInitialState();
      }
    });
    tl.to(this.ui.title,0.5,{
      autoAlpha:0,
      y:-20,
      ease:Quad.easeOut
    })
    tl.staggerTo(this.ui.filters,0.3,{
      autoAlpha:0,
      y:-20,
      ease:Quad.easeOut
    },0.20,'-=0.4')
  }
  selectFilter(number) {
    console.log(this.ui.filters[number-1]);
    TweenLite.to(this.ui.filters[number-1],0.5,{
      scale:1.2
    })
  }
}
