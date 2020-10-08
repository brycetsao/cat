(function(){$((function(){var t;return t=function(){return $("#dock").removeClass("hidden")},$("#profile").hover(t),$(document).mousemove((function(i){if(i.pageY>$(window).height()-80)return t()})),$(document).on("wheel",t)}))}).call(this),function(){var t,i;t={host:"https://www.instagram.com/",username:"",tag:"",container:"#instaflow",display_profile:!1,display_biography:!1,display_gallery:!0,display_igtv:!1,get_data:!1,callback:null,items:12,image_size:640,audio:null},i={150:0,240:1,320:2,480:3,640:4},this.InstaFlow=function(){function e(e){var n,a,s;return a=$.extend({},t,e),this.audio=a.audio,this.playing=-1,""===a.username&&""===a.tag?(console.error("Instagram Feed: Error, no username or tag found."),!1):(void 0!==a.get_raw_json&&(console.warn("Instagram Feed: get_raw_json is deprecated. See use get_data instead"),a.get_data=a.get_raw_json),a.get_data||""!==a.container?a.get_data&&null===a.callback?(console.error("Instagram Feed: Error, no callback defined to get the raw json"),!1):(n=""===a.username,s=n?a.host+"explore/tags/"+a.tag:a.host+a.username,$.get(s,(function(t){var e,r,o,h,c,d,u,l;if(t=t.split("window._sharedData = ")[1].split("<\/script>")[0],t=(t=(t=JSON.parse(t.substr(0,t.length-1))).entry_data.ProfilePage||t.entry_data.TagPage)[0].graphql.user||t[0].graphql.hashtag,a.get_data&&a.callback(t),r="",c=void 0!==i[a.image_size]?i[a.image_size]:i[640],void 0!==t.is_private&&!0===t.is_private)r+="<p class='instagram_private'><strong>This profile is private</strong></p>";else{for(u=(d=(t.edge_owner_to_timeline_media||t.edge_hashtag_to_media).edges).length>a.items?a.items:d.length,r+="<div class='gallery'>",o=0;o<u;){switch(s="https://www.instagram.com/p/"+d[o].node.shortcode,h=void 0,l=void 0,e=void 0,d[o].node.__typename){case"GraphSidecar":l="sidecar";break;case"GraphVideo":l="video",h=d[o].node.thumbnail_src;break;default:l="image",h=d[o].node.thumbnail_resources[c].src}e=void 0!==d[o].node.edge_media_to_caption.edges[0]?d[o].node.edge_media_to_caption.edges[0].node.text:void 0!==d[o].node.accessibility_caption?d[o].node.accessibility_caption:(n?t.name:t.username)+" image "+o,r+="<div class='instagram "+l+"' index="+(o+1)+" position="+Math.min(5,o+1)+">",r+="<img draggable='false' src='"+h+"'>",r+="<a class='description' href='"+s+"'>",r+="<p class='caption'>"+e+"<br>",r+="<span><span class='iconify' data-icon='ion:heart'></span><ion-icon name='heart'/>"+d[o].node.edge_liked_by.count+"</span>",r+="<span><span class='iconify' data-icon='ion:chatbubble'></span>"+d[o].node.edge_media_to_comment.count+"</span>",r+="</p>",r+="</a>",r+="</div>",o++}r+="</div>"}return $(a.container).append(r)})).fail((function(t){return console.error("Instagram Feed: Unable to fetch the given user/tag. Instagram responded with the status code: ",t.status)})),!0):(console.error("Instagram Feed: Error, no container found."),!1))}return e.prototype.prev=function(){if(!(this.playing<=0))return this.goto(this.playing-1)},e.prototype.next=function(){if(this.playing!==$(".instagram").length-1)return this.goto(this.playing+1)},e.prototype.goto=function(t){var i,e,n,a,s;for($(".cover").hide(),e=n=0,a=(s=$(".instagram")).length;n<a;e=++n)i=s[e],$(i).attr("position",Math.max(-5,Math.min(5,e-t)));if(this.playing=t,this.audio)return this.audio.play("media/"+$(".description")[this.playing].href.split("/").pop()+".mp3")},e}(),$((function(){var t,i;return i=new Visualizer("#particles"),t=new InstaFlow({container:"#instaflow",username:"brycetsao",audio:i}),$(".prev").click((function(){return t.prev()})),$(".next").click((function(){return t.next()})),$("#instaflow").click(".instagram > img",(function(i){return t.goto($(i.target).parent().index())})),$(document).keyup((function(i){switch(i.which){case 37:return t.prev();case 39:return t.next()}}))}))}.call(this),function(){var t,i,e,n,a,s,r,o,h;t=2*Math.PI,n=function(){return window.innerWidth},a=function(){return window.innerHeight},h=function(t){return null==t&&(t=1),t*Math.random()},o=function(t){return null==t&&(t=1),h(-t)},r=function(i,e){return Math.sin(t*i/e)},s=Math.pow,e=function(){function t(t,i){this.x="number"==typeof t?t:0,this.y="number"==typeof i?i:0}return t.prototype.clone=function(){return this},t.prototype.add=function(t){return this.x+=t.x||t[0]||0,this.y+=t.y||t[1]||0,this},t}(),i=function(){function t(t,i){this.index=t,this.parent=i,this.rad_min=2,this.init()}return t.prototype.get_data=function(){return this.parent.fft_data[this.index]/256},t.prototype.init=function(){return this.data=this.get_data(),this.rad=this.rad_min,this.pos=new e(h(n()),a()+this.rad+h(256)),this.vx=o(2)*o(2),this.tick=h(256)},t.prototype.update=function(){return this.tick++,this.data=this.get_data(),this.rad=this.rad_min+this.index/200+64*s(this.data,2),this.hue=390-120*this.index/400,this.satur=100*this.data,this.alpha=this.data,this.light=40+40*s(8,this.data-1),this.fill="hsla("+this.hue+", "+this.satur+"%, "+this.light+"%, "+this.alpha+")",this.pos.add({x:this.vx+r(this.tick,512),y:-2*s(this.data,.5)}),this.check()},t.prototype.check=function(){var t;if(this.pos.y<-this.size||!(-.1<(t=this.pos.x/n())&&t<1.1))return this.init()},t}(),this.Visualizer=function(){function e(t){this.tick=0,this.audio=$(t+" audio")[0],this.main_layer=$(t+" canvas")[0],this.glow_layer=$(t+" canvas")[1],this.ctx=this.main_layer.getContext("2d"),this.gctx=this.glow_layer.getContext("2d"),this.actx=new AudioContext,this.source=this.actx.createMediaElementSource(this.audio),this.analyser=new AnalyserNode(this.actx,{minDecibels:-128,maxDecibels:0,smoothingTimeConstant:.8}),this.source.connect(this.analyser),this.source.connect(this.actx.destination),this.fft_data=new Uint8Array(this.analyser.frequencyBinCount),this.resize(),this.generate(),this.render(),$(window).resize(this.resize.bind(this))}return e.prototype.resize=function(){return this.main_layer.width=this.glow_layer.width=n(),this.main_layer.height=this.glow_layer.height=a()},e.prototype.play=function(t){return this.audio.src=t,this.audio.play(),this.actx.resume()},e.prototype.generate=function(t){var e,n,a;for(this.particles=[],a=[],e=n=40;n<=600;e=++n)a.push(this.particles.push(new i(e,this)));return a},e.prototype.update=function(){var i,e,s,r,o;for(this.analyser.getByteFrequencyData(this.fft_data),this.ctx.clearRect(0,0,n(),a()),i=e=0,s=(o=this.particles).length;e<s;i=++e)r=o[i],this.fft_data[i]&&(r.update(),this.ctx.beginPath(),this.ctx.fillStyle=r.fill,this.ctx.arc(r.pos.x,r.pos.y,r.rad,0,t),this.ctx.fill(),this.ctx.closePath());return this.gctx.clearRect(0,0,n(),a()),this.gctx.drawImage(this.main_layer,0,0)},e.prototype.render=function(){return this.tick++,this.update(),requestAnimationFrame(this.render.bind(this))},e}()}.call(this);