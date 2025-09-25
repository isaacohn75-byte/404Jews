Element.prototype.ctxMenu = function(optionsObj){
  /*
    This script adds the ability for you to set a context menu popup @ mouse position on user's right click on any element. This context menu is customizable, meaning you can add as many options to this menu as possible. You will also define what function will be called when that option is selected. The menu will disappear when an option has been selected or another element has been clicked.
    
    
    Usage after implementation:
    myElement.ctxMenu(optionsObject);
    
    
    Note: the options object should be a list of options with corresponding functions to that option, e.g.
    
      optionsObj = {
        delete : function(){ lalallalalala },
        copy : function(){ lalallalallalla },
        forward : function(){ lalllllallala }
      }
      myElement.ctxMenu(optionsObj);
    
    
    Note: The example above would be perfect if you are implementing a context menu for messages in a chat, this context menu may be used to interact with messages
  */
  this.oncontextmenu = function(e){
    var i = 0;
    e.preventDefault();
    var element = this;
    try {
      document.getElementById("ctxMenu").parentElement.removeChild(document.getElementById("ctxMenu"));    
    } catch(noCtxMenuExists){}
    var menu = document.createElement("DIV");
      menu.style.minWidth = "100px";
      menu.style.maxWidth = "50vw";
      menu.style.backgroundColor = "#DDDDDD";
      menu.style.color = "#000000";
      menu.style.margin = "0";
      menu.style.padding = "0";
      menu.style.position = "absolute";
      menu.style.zIndex = "99999999999999";
      menu.style.borderRadius = "3px";
      menu.style.boxShadow = "0px 0px 3px 1px rgba(0, 0, 0, 0.3)";
      menu.style.overflow = "hidden";
      menu.id = "ctxMenu";
      
    for (options in optionsObj){
      i++;
      var x = document.createElement("P");
        x.style.margin = "0";
        x.style.marginBottom = "1px";
        x.style.padding = "3px";
        x.style.paddingLeft = "12px";
        x.style.backgroundColor = "#FFFFFF";
        x.style.cursor = "default";
        x.style.userSelect = "none";
        x.innerText = options;
        x.className = "ctxMenuOption";
        x.onclick = function(){
          this.parentElement.parentElement.removeChild(this.parentElement);
          optionsObj[this.innerText](element);
        };
        x.onmouseover = function(){
          this.style.backgroundColor = "#F3F3F3";
        }
        x.onmouseout = function(){
          this.style.backgroundColor = "#FFFFFF";
        }
      menu.appendChild(x);
    }
    var ex = e.pageX;
    var ey = e.pageY;
    var maxX = window.innerWidth;
    var maxY = window.innerHeight;
    document.body.appendChild(menu);
    var menuWidth = menu.offsetWidth;
    var menuHeight = menu.offsetHeight;
    var posX = ex + 5;
    var posY = ey + 5;

    if (posY + menuHeight > maxY) {
      // If menu overflows bottom, position it above the cursor
      posY = ey - menuHeight - 5;
      if (posY < 0) {
        // If it overflows top, pin to top and allow scrolling
        posY = 0;
        menu.style.maxHeight = maxY + "px";
        menu.style.overflowY = "auto";
      }
    }
    if (posX + menuWidth > maxX) {
      // If menu overflows right, position it to the left of the cursor
      posX = ex - menuWidth - 5;
      if (posX < 0) {
        posX = 0;
      }
    }

    menu.style.top = posY + "px";
    menu.style.left = posX + "px";
    return this;
  };
};
window.addEventListener("click", function(){
  let ctxm = document.getElementById("ctxMenu") || false;
  if(ctxm){
    ctxm.parentElement.removeChild(ctxm);
  }
});