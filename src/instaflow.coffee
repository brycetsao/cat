defaults = 
  'host': 'https://www.instagram.com/'
  'username': 'brycetsao'
  'tag': ''
  'container': '#instaflow'
  'display_profile': false
  'display_biography': false
  'display_gallery': true
  'display_igtv': false
  'get_data': false
  'callback': null
  'items': 12
  'image_size': 640

image_sizes = 
  '150': 0
  '240': 1
  '320': 2
  '480': 3
  '640': 4

$.InstaFlow = (opts) ->

  options = $.extend({}, defaults, opts)
  if options.username == '' and options.tag == ''
    console.error 'Instagram Feed: Error, no username or tag found.'
    return false
  if typeof options.get_raw_json != 'undefined'
    console.warn 'Instagram Feed: get_raw_json is deprecated. See use get_data instead'
    options.get_data = options.get_raw_json
  if !options.get_data and options.container == ''
    console.error 'Instagram Feed: Error, no container found.'
    return false
  if options.get_data and options.callback == null
    console.error 'Instagram Feed: Error, no callback defined to get the raw json'
    return false

  is_tag = options.username == ''
  url = if is_tag then options.host + 'explore/tags/' + options.tag else options.host + options.username
  
  $.get url, (data) -> 
    `var url`
    `var i`
    data = data.split('window._sharedData = ')[1].split('</script>')[0]
    data = JSON.parse(data.substr(0, data.length - 1))
    data = data.entry_data.ProfilePage or data.entry_data.TagPage
    data = data[0].graphql.user or data[0].graphql.hashtag

    options.callback data if options.get_data

    html = ''

    image_index = if typeof image_sizes[options.image_size] != 'undefined' then image_sizes[options.image_size] else image_sizes[640]

    if typeof data.is_private != 'undefined' and data.is_private == true
      html += '<p class=\'instagram_private\'><strong>This profile is private</strong></p>'
    else
      imgs = (data.edge_owner_to_timeline_media or data.edge_hashtag_to_media).edges
      max = if imgs.length > options.items then options.items else imgs.length
      html += '<div class=\'instagram_gallery\'>'
      i = 0
      while i < max
        url = 'https://www.instagram.com/p/' + imgs[i].node.shortcode
        image = undefined
        type_resource = undefined
        caption = undefined
        switch imgs[i].node.__typename
          when 'GraphSidecar'
            type_resource = 'sidecar'
          when 'GraphVideo'
            type_resource = 'video'
            image = imgs[i].node.thumbnail_src
          else
            type_resource = 'image'
            image = imgs[i].node.thumbnail_resources[image_index].src
        if typeof imgs[i].node.edge_media_to_caption.edges[0] != 'undefined'
          caption = imgs[i].node.edge_media_to_caption.edges[0].node.text
        else if typeof imgs[i].node.accessibility_caption != 'undefined'
          caption = imgs[i].node.accessibility_caption
        else
          caption = (if is_tag then data.name else data.username) + ' image ' + i
        html += '<div class=\'instagram ' + type_resource + '\' index=\'' + i + '\' position=\'' + Math.min(5, i) + '\'>'
        html += '<img draggable="false" src=\'' + image + '\' alt=\'' + 'caption' + '\' />'
        html += '<a class=\'description\' href=\'' + url + '\'>'
        html += '<p class=\'caption\'>' + caption + '<br>'
        html += '<span><ion-icon name=\'heart\'/> ' + imgs[i].node.edge_liked_by.count + '</span>' + ''
        html += '<span><ion-icon name=\'chatbubble\'/> ' + imgs[i].node.edge_media_to_comment.count + '</span>'
        html += '</p>'
        html += '</a>'
        html += '</div>'
        i++
      html += '</div>'

    $(options.container).html html

  .fail (e) ->
    console.error "Instagram Feed: Unable to fetch the given user/tag. Instagram responded with the status code: ", e.status

  return true

playing = 0

valid = (i) ->
  0 <= i < $('.instagram').length

$.ig_prev = ->
  if valid(playing - 1)
    if valid(playing - 5)
      $('.instagram[index=' + (playing - 5) + ']').last().attr 'position', -4
    for i in [-4..4]
      if valid(playing + i)
        $('.instagram[index=' + (playing + i) + ']').attr 'position', (i + 1)
    --playing

$.ig_next = ->
  if valid(playing + 1)
    if valid(playing + 5)
      $('.instagram[index=' + (playing + 5) + ']').first().attr 'position', 4
    for i in [-4..4]
      if valid(playing + i)
        $('.instagram[index=' + (playing + i) + ']').attr 'position', (i - 1)
    ++playing

$.ig_goto = (e) ->
  target = $(e.target.parentElement).attr('index')
  while playing < target
    $.ig_next()
  while playing > target
    $.ig_prev()
  return

$ ->
  $.InstaFlow()
  $('.prev').click $.ig_prev
  $('.next').click $.ig_next
  $('#instaflow').click '.instagram > img', $.ig_goto
  $(document).keyup (e) ->
    switch e.which
      when 37
        $.ig_prev()
      when 39
        $.ig_next()