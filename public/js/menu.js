
$ (document).ready(function(){
  $( window ).resize(function() {
    console.log("resize");
    if ($(window).width() < 1205){
      $ (".submenu").click(function(){
        $("ul", this).slideToggle();
        $("li", this).stopPropagation();
      })
    }
  });
  //
});
