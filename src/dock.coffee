$ ->
  show_dock = -> 
    $('#dock').css 'bottom', 0
  $('#profile').hover show_dock
  $(document).mousemove (e) ->
    show_dock() if e.pageY > $(window).height() - 80
  $(document).on 'wheel', show_dock