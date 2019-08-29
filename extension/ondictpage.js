
document.title = '必应听写测试 - 单词听写'

try{
    $(".hd_prUS")[0].style.display = "none"
    $(".hd_pr")[0].style.display = "none"

    $(".sidebar")[0].style.visibility = "hidden"
    $(".df_div")[0].style.visibility = "hidden"
    $(".se_div")[0].style.visibility = "hidden"
    $(".b_searchboxForm")[0].style.visibility = "hidden"
    $(".qdef")[0].getElementsByTagName("ul")[0].style.display = "none"
    $(".hd_div")[0].style.visibility = "hidden"
    $(".hd_div1")[0].style.visibility = "hidden"
    $(".wd_div")[0].style.visibility = "hidden"
}catch(err){
    console.log(err)
}