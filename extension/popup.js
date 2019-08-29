
const oulu_website = "https://dict.eudic.net/liju/en/"

window.onload = function () {
    document.getElementById("mainfunc").addEventListener("click", mainfunc);

    var json_data = new Array()
    var back = chrome.extension.getBackgroundPage()

    // 读入文件
    $.getJSON("resource.json", function (data){
        $.each(data,function(index,info){
            var word_list0 = new Array()
            $.each(info["word_list"],function(index,word){
                word_list0.push(word)
            })
            json_data.push({
                name:info["name"],
                order:info["order"],
                next:info["next"],
                word_list:word_list0
            })
            $('#group')[0].add($('<option>' + info['name'] + '</option>')[0])
        })
    })

    function mainfunc() {
        var index = $('#group')[0].selectedIndex
        var word_group = json_data[index]
        repeat(word_group)
    }

    // 重复 length 次，随机抽取单词
    function repeat(word_group){
        var form = document.forms["argform"]
        var len = new Number(form["length"].value)
        for(var i = 0; i < len;i++){
            generate(word_group)
        }
    }

    function generate(word_group){
        var words = word_group.word_list
        var lucky = Math.floor((Math.random()*words.length))
        back.open(oulu_website + words[lucky])
    }
}
