$(document).ready(function(){
  var menuDesplegado = "";
  $(".desplegable").click(function() {
    $("ul[desplegado-por="+$(this).attr("nombre")+"]").toggle('slow');
    $("ul[desplegado-por="+menuDesplegado+"]").toggle('slow');
    menuDesplegado = $(this).attr("nombre");
  });

})
