(function(){$(function(){var t;return t=function(){return $("#dock").css("bottom",0)},$("#profile").hover(t),$(document).mousemove(function(e){if(e.pageY>$(window).height()-80)return t()})})}).call(this),function(){var a,_,n,i;a={host:"https://www.instagram.com/",username:"brycetsao",tag:"",container:"#instaflow",display_profile:!1,display_biography:!1,display_gallery:!0,display_igtv:!1,get_data:!1,callback:null,items:12,image_size:640},_={150:0,240:1,320:2,480:3,640:4},$.InstaFlow=function(e){var d,l,t;return""===(l=$.extend({},a,e)).username&&""===l.tag?(console.error("Instagram Feed: Error, no username or tag found."),!1):(void 0!==l.get_raw_json&&(console.warn("Instagram Feed: get_raw_json is deprecated. See use get_data instead"),l.get_data=l.get_raw_json),l.get_data||""!==l.container?l.get_data&&null===l.callback?(console.error("Instagram Feed: Error, no callback defined to get the raw json"),!1):(t=(d=""===l.username)?l.host+"explore/tags/"+l.tag:l.host+l.username,$.get(t,function(e){var t,a,n,i,r,o,s,c,g;if(e=e.split("window._sharedData = ")[1].split("<\/script>")[0],e=(e=(e=JSON.parse(e.substr(0,e.length-1))).entry_data.ProfilePage||e.entry_data.TagPage)[0].graphql.user||e[0].graphql.hashtag,l.get_data&&l.callback(e),n="",o=void 0!==_[l.image_size]?_[l.image_size]:_[640],void 0!==e.is_private&&!0===e.is_private)n+="<p class='instagram_private'><strong>This profile is private</strong></p>";else{for(c=(s=(e.edge_owner_to_timeline_media||e.edge_hashtag_to_media).edges).length>l.items?l.items:s.length,n+="<div class='instagram_gallery'>",i=0;i<c;){switch(t="https://www.instagram.com/p/"+s[i].node.shortcode,a=g=r=void 0,s[i].node.__typename){case"GraphSidecar":g="sidecar";break;case"GraphVideo":g="video",r=s[i].node.thumbnail_src;break;default:g="image",r=s[i].node.thumbnail_resources[o].src}a=void 0!==s[i].node.edge_media_to_caption.edges[0]?s[i].node.edge_media_to_caption.edges[0].node.text:void 0!==s[i].node.accessibility_caption?s[i].node.accessibility_caption:(d?e.name:e.username)+" image "+i,n+="<div class='instagram "+g+"' index='"+i+"' position='"+Math.min(5,i)+"'>",n+="<img src='"+r+"' alt='caption' />",n+="<a class='description' href='"+t+"'>",n+="<p class='caption'>"+a+"<br>",n+="<span><ion-icon name='heart'/> "+s[i].node.edge_liked_by.count+"</span>",n+="<span><ion-icon name='chatbubble'/> "+s[i].node.edge_media_to_comment.count+"</span>",n+="</p>",n+="</a>",n+="</div>",i++}n+="</div>"}return $(l.container).html(n)}).fail(function(e){return console.error("Instagram Feed: Unable to fetch the given user/tag. Instagram responded with the status code: ",e.status)}),!0):(console.error("Instagram Feed: Error, no container found."),!1))},n=0,i=function(e){return 0<=e&&e<$(".instagram").length},$.ig_prev=function(){var e,t;if(i(n-1)){for(i(n-5)&&$(".instagram[index="+(n-5)+"]").last().attr("position",-4),e=t=-4;t<=4;e=++t)i(n+e)&&$(".instagram[index="+(n+e)+"]").attr("position",e+1);return--n}},$.ig_next=function(){var e,t;if(i(n+1)){for(i(n+5)&&$(".instagram[index="+(n+5)+"]").first().attr("position",4),e=t=-4;t<=4;e=++t)i(n+e)&&$(".instagram[index="+(n+e)+"]").attr("position",e-1);return++n}},$.ig_goto=function(e){var t;for(t=$(e.target.parentElement).attr("index");n<t;)$.ig_next();for(;t<n;)$.ig_prev()},$(function(){return $.InstaFlow(),$(".prev").click($.ig_prev),$(".next").click($.ig_next),$("#instaflow").click(".instagram > img",$.ig_goto),$(document).keyup(function(e){switch(e.which){case 37:return $.ig_prev();case 39:return $.ig_next()}}),$("#instaflow").on("wheel",function(e){return 0<e.originalEvent.wheelDelta?$.ig_prev():$.ig_next()})})}.call(this);