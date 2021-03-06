var HttpClient = function() {
    this.get = function(aUrl, aCallback) {
        var anHttpRequest = new XMLHttpRequest();
        anHttpRequest.onreadystatechange = function() { 
            if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                aCallback(anHttpRequest.responseText);
        }

        anHttpRequest.open( "GET", aUrl, true );            
        anHttpRequest.send(null);
    }
}
function switched(e) {
    if (e.classList.contains('fas')) {
      e.classList.remove("fas", 'dark');
      e.classList.add("far", 'light');
      localStorage.colour = "dark"
      document.body.style.backgroundColor = "#201F23"
      dark()
    } else {
      e.classList.add("fas", 'dark');
      e.classList.remove("far", 'light');
      localStorage.colour = "light"
      document.body.style.backgroundColor = "#727177"
      light()
    }
}

  function onload() {
    if (!localStorage.token) window.location.href = "/api/discord/login"
    
    let e = document.getElementById('switch');
    
    let choice = localStorage.getItem("colour");
    if (choice == 'dark') {
      e.classList.remove("fas", 'dark');
      e.classList.add("far", 'light');
      document.body.style.backgroundColor = "#201F23";
      dark()
    }
    else {
      e.classList.add("fas", 'dark');
      e.classList.remove("far", 'light');
      document.body.style.backgroundColor = "#727177"
      light()
    }

    document.getElementById('logout').onclick = function() {
      localStorage.removeItem('token');
      window.location.href = "/"
    }
    
    
  document.getElementById('submit').onclick = function() {
    if (!localStorage.token) window.location.href = "/api/discord/login"
    let data = {
      "id": document.getElementById("bot-id").value,
      "link": document.getElementById("link").value,
      "short": document.getElementById("short").value,
      "prefix": document.getElementById("prefix").value,
      "long": document.getElementById("long-desc").textContent,
      "token": localStorage.token
    }
    window.location.href = `/new?data=${encodeURIComponent(JSON.stringify(data))}`
  }
  document.getElementById("long-desc").addEventListener("paste", function(e) {
    e.preventDefault();
    var text = "";
    if (e.clipboardData && e.clipboardData.getData) {
      text = e.clipboardData.getData("text/plain");
    } else if (window.clipboardData && window.clipboardData.getData) {
      text = window.clipboardData.getData("Text");
    }
    document.execCommand("insertHTML", false, text);
  });
    
  var client = new HttpClient();
  client.get(`https://${window.location.hostname}/api/members?token=${localStorage.token}`, function(res) {
    if (res === "false") window.location.href = "https://discord.gg/ctwTMUe";
  })
    
    
}



function light() {
  let submit = document.getElementById('submit');
  submit.style.backgroundColor = "#201F23"
  submit.onmouseover = function(){
    submit.style.backgroundColor = "#727177"
    submit.style.border = "2px solid #201F23"
  }
  submit.onmouseout = function(){
    submit.style.backgroundColor = "#201F23"
    submit.style.border = "0px solid #201F23"
  }
}

function dark() {
  let submit = document.getElementById('submit');
  submit.style.backgroundColor = "#727177"
  submit.onmouseover = function(){
    submit.style.backgroundColor = "#201F23"
    submit.style.border = "2px solid #727177"
  }
  submit.onmouseout = function(){
    submit.style.backgroundColor = "#727177"
    submit.style.border = "0px solid #727177"
  }
}
