function TwoWayBinding() {
    this.elms = parseDOM(document.body.children,{});
    this.attachEvent();
}

TwoWayBinding.prototype.attachEvent = function () {
    var elms = this.elms;
    if(!Array.isArray(elms)){
           elms = [elms];
    }
    elms.forEach(function (e) {
        Object.keys(e).forEach(function (value) {
            value.onkeypress = onKeyPressEvent.bind(this);
        });
    });
};

TwoWayBinding.prototype.get = function (key) {
    if(this.elms.hasOwnProperty(key)){
        return this.elms[key].value;
    }
};

TwoWayBinding.prototype.set = function (key,value) {
    if(this.elms.hasOwnProperty(key)){
        this.elms[key].value = value;

    }
};

var bind = new TwoWayBinding();

// Keypress function
function onKeyPressEvent(e) {
  console.log(e.target);
}

function parseDOM(elms,output) {
    return Array.prototype.reduce.call(elms,function (o,i) {
        if(i.getAttribute("m-model")){
            o[i.getAttribute("m-model")] = i;
        }
        if(i.children.length > 0){
            parseDOM(i.children,o);
        }
        return o;
    },output);
}