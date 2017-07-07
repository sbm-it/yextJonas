console.log('yext.js loaded :-)')


// if the silly addition example is still there
if(!!typeof(x)&&!!typeof(y)&&!!typeof(z)){
    x.onkeyup=y.onkeyup=function(evt){
        z.textContent=parseFloat(x.value)+parseFloat(y.value)
    }
}

yext=function(){} // ini

// populate div if there
yext.div0=document.getElementById('yextDiv')

if(yext.div0){
    yext.div = document.createElement('div')
    yext.div0.appendChild(yext.div)
    var h = 'yext API call: <br><input id="urlInput" style="color:blue" size=100><br><button id="callButton" type="button" class="btn btn-primary">Call</button> <button id="demoButton" type="button" class="btn btn-success">Demo</button>'
    h += '<p id="apiURL"></p>'
    h += '<pre id="JSONresponse" hidden=true></pre>'
    yext.div.innerHTML=h
    // Demo API call
    demoButton.onclick=function(){
        urlInput.value='https://api.yext.com/v2/accounts/[accountId]/locations?api_key=API_KEY&v='+new Date().toISOString().slice(0,10).replace(/-/g,'')
    }
    callButton.onclick=function(){
        var url = 'https://script.google.com/macros/s/AKfycbxH_t0MnnzTDvWnGKwpyIJUkJJqpuBOiZjwnerTgtGLsONojZg/exec?url='+encodeURIComponent(urlInput.value)
        apiURL.innerHTML='<a href="'+url+'" target="_blank">'+url+'</a> <br><span id="copyHiddenInput" style="color:blue;background-color:yellow;cursor:pointer"><i class="fa fa-files-o" aria-hidden="true"></i>copy</span><span style="color:green"> (you can control the callback function by adding "&callback=your_call_back_function")</a><input id="hiddenUrl" value="'+url+'" hidden=true>'
        JSONresponse.hidden=false
        JSONresponse.innerHTML='<span style="color:red">calling ...</span>'
        $.getScript(url+'&callback=yext.callback')
        copyHiddenInput.onclick=function(){
            hiddenUrl.hidden=false // show it only long enough to copy its value
            hiddenUrl.select()
            document.execCommand('copy')
            hiddenUrl.hidden=true
            copyHiddenInput.style.color="red"
            copyHiddenInput.innerHTML='<i class="fa fa-files-o" aria-hidden="true"></i>copied to clipboard'
            setTimeout(function(){
                copyHiddenInput.style.color="blue"
                copyHiddenInput.innerHTML='<i class="fa fa-files-o" aria-hidden="true"></i>copy'
            },1000)
        }
    }
    yext.callback=function(x){
        JSONresponse.innerHTML=JSON.stringify(x,null,3)
        yext.callResponse=x
    }
}