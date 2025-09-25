window.addEventListener("load", function(){
  document.getElementById('toggleChatbox').addEventListener('click', function() {
      const chatbox = document.getElementById('chattable');
      chatbox.classList.toggle('active');
  });
  chattable.initialize({
    stylesheet: "/demo/dashboard-chat.css"
  });
});