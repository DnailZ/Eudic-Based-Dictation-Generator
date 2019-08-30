const start = 8
const inv = 250
const replace = "______"
const origen_key = new Array(
    "TPO","VOA","CNN","BBC","AP","TED","NPR",
    "科学60秒","新概念英语","经济学人",
    "Crash Course","词汇","百科","科普",
    "SCIENCE","教材","美语","纪录片","书虫",
    "雅思","IELTS","大学英语","考研英语","真题",
    "听力","例句","考研","四级","六级"
    )
document.title = '欧路听写测试 - 例句听写'

$("#search-box")[0].style.display = "none"

if($(".lj_item").length == 0){
    console.log("没有例句，跳转到单词听写")
    window.location.href=window.location.href.replace("dict.eudic.net/liju/en/","cn.bing.com/dict/search?q=");
}

// 直接以 inv 为周期点按“加载更多”，点按 start 次失败后接后面的代码
var l = start
function loadall(){
    var button = $("#liju_ting_loadmore")[0]
    if(button != null){
        // 防止加载过多，耗时过长
        if(Number(button.getAttribute("data-start")) > 500){
            callback()
            return
        }
        button.click();
        l = start
        setTimeout(loadall, inv)
    }else if(l >= 0){
        l--
        setTimeout(loadall, inv)
    }else{
        callback()
    }
}
loadall()

function make_question(example){
    example.getElementsByClassName('exp')[0].style.visibility = "hidden"
    var keys = example.getElementsByClassName('key')
    for(var i = 0; i < keys.length;i++){
        keys[i].textContent = replace
    }
}

function select(example){
    var text = example.getElementsByClassName("line")[0].textContent
    var origin = example.getElementsByClassName("lj_origin")[0].textContent
    for(var i = 0;i < origen_key.length;i++){
        if(origin.includes(origen_key[i])){
            return true
        }
    }
    return false
}

function not_display(example){
    example.style.display = "none"
}

function en_display(example){
    example.style.display = ""
}

// 从所有例句中筛选出复合要求的，随机抽一个。
function callback(){
    var examples = $(".lj_item")
    var candidates = new Array()

    for(var i = 0;i < examples.length; i++){
        not_display(examples[i])
        if(select(examples[i])){
            candidates.push(examples[i])
        }
    }

    if(candidates.length == 0){
        console.log("没有发现符合要求的例句，随便找一个")
        candidates = examples
    }

    var lucky = Math.floor((Math.random()*candidates.length))

    en_display(candidates[lucky])
    make_question(candidates[lucky])

    $('<button id="play">播放声音</button>"  "').appendTo("#head-bar")
    $("#play")[0].onclick = function(){
        candidates[lucky].getElementsByClassName("voice-js voice-button")[0].click()
    }

    $('<button id="show_trans">显示/隐藏翻译</button>').appendTo("#head-bar")
    $("#show_trans")[0].onclick = function(){
        var style = candidates[lucky].getElementsByClassName("exp")[0].style
        if(style.visibility == "hidden"){
            style.visibility = ""
        }else{
            style.visibility = "hidden"
        }
    }

    $("a",".expHead")[0].click()
}