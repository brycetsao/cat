$ ->
  show_dock = -> 
    $('#dock').removeClass 'hidden'
  $('#profile').hover show_dock
  $(document).mousemove (e) ->
    show_dock() if e.pageY > $(window).height() - 80
  $(document).on 'wheel', show_dock