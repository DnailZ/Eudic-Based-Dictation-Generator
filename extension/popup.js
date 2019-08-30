
const oulu_website = "https://dict.eudic.net/liju/en/"

window.onload = function () {
    document.getElementById("mainfunc").addEventListener("click", mainfunc);

    var json_data = null
    var back = chrome.extension.getBackgroundPage()

    $.getJSON("resource.json", function (data){
        json_data = data
        $.each(data,function(index,info){
            $('#group')[0].add($('<option>' + info['name'] + '</option>')[0])
        })
    })

    function mainfunc() {
        var index = $('#group')[0].selectedIndex
        var word_group = json_data[index]
        repeat(word_group)
    }

    function repeat(word_group){
        var form = document.forms["argform"]
        var len = Number(form["length"].value)
        var order_index = $("#order")[0].selectedIndex
        if(order_index == 0){
            for(var i = 0; i < len;i++){
                generate(word_group)
            }
        }else if(order_index == 1){
            var section = Number(form["section"].value)
            var section_size = word_group["section_size"]
            var group_size = word_group["word_list"].length
            var start = section*section_size
            var end = Math.min(
                (section + 1)*section_size,
                group_size
            )
            for(var i = start; i < end;i++){
                back.open(oulu_website + word_group["word_list"][i])
            }
        }
    }

    function generate(word_group){
        var words = word_group['word_list']
        var lucky = Math.floor((Math.random()*words.length))
        back.open(oulu_website + words[lucky])
    }
}
