(function(){$((function(){var t;return t=function(){return $("#dock").removeClass("hidden")},$("#profile").hover(t),$(document).mousemove((function(i){if(i.pageY>$(window).height()-80)return t()})),$(document).on("wheel",t)}))}).call(this),function(){var t,i;t={host:"https://www.instagram.com/",username:"",tag:"",container:"#instaflow",display_profile:!1,display_biography:!1,display_gallery:!0,display_igtv:!1,get_data:!1,callback:null,items:12,image_size:640,audio:null},i={150:0,240:1,320:2,480:3,640:4},this.InstaFlow=class{constructor(e){var a,s,n;return s=$.extend({},t,e),this.audio=s.audio,this.playing=-1,""===s.username&&""===s.tag?(console.error("Instagram Feed: Error, no username or tag found."),!1):(void 0!==s.get_raw_json&&(console.warn("Instagram Feed: get_raw_json is deprecated. See use get_data instead"),s.get_data=s.get_raw_json),s.get_data||""!==s.container?s.get_data&&null===s.callback?(console.error("Instagram Feed: Error, no callback defined to get the raw json"),!1):(a=""===s.username,n=a?s.host+"explore/tags/"+s.tag:s.host+s.username,$.get(n,(function(t){var e,r,o,h,c,d,l,u;if(t=t.split("window._sharedData = ")[1].split("<\/script>")[0],t=(t=(t=JSON.parse(t.substr(0,t.length-1))).entry_data.ProfilePage||t.entry_data.TagPage)[0].graphql.user||t[0].graphql.hashtag,s.get_data&&s.callback(t),r="",c=void 0!==i[s.image_size]?i[s.image_size]:i[640],void 0!==t.is_private&&!0===t.is_private)r+="<p class='instagram_private'><strong>This profile is private</strong></p>";else{for(l=(d=(t.edge_owner_to_timeline_media||t.edge_hashtag_to_media).edges).length>s.items?s.items:d.length,r+="<div class='gallery'>",o=0;o<l;){switch(n="https://www.instagram.com/p/"+d[o].node.shortcode,h=void 0,u=void 0,e=void 0,d[o].node.__typename){case"GraphSidecar":u="sidecar";break;case"GraphVideo":u="video",h=d[o].node.thumbnail_src;break;default:u="image",h=d[o].node.thumbnail_resources[c].src}e=void 0!==d[o].node.edge_media_to_caption.edges[0]?d[o].node.edge_media_to_caption.edges[0].node.text:void 0!==d[o].node.accessibility_caption?d[o].node.accessibility_caption:(a?t.name:t.username)+" image "+o,r+=`<div class='instagram ${u}' index=${o+1} position=${Math.min(5,o+1)}>`,r+=`<img draggable='false' src='${h}'>`,r+=`<a class='description' href='${n}'>`,r+=`<p class='caption'>${e}<br>`,r+=`<span><span class='iconify' data-icon='ion:heart'></span><ion-icon name='heart'/>${d[o].node.edge_liked_by.count}</span>`,r+=`<span><span class='iconify' data-icon='ion:chatbubble'></span>${d[o].node.edge_media_to_comment.count}</span>`,r+="</p>",r+="</a>",r+="</div>",o++}r+="</div>"}return $(s.container).append(r)})).fail((function(t){return console.error("Instagram Feed: Unable to fetch the given user/tag. Instagram responded with the status code: ",t.status)})),!0):(console.error("Instagram Feed: Error, no container found."),!1))}prev(){if(!(this.playing<=0))return this.goto(this.playing-1)}next(){if(this.playing!==$(".instagram").length-1)return this.goto(this.playing+1)}goto(t){var i,e,a,s,n;for($(".cover").hide(),e=a=0,s=(n=$(".instagram")).length;a<s;e=++a)i=n[e],$(i).attr("position",Math.max(-5,Math.min(5,e-t)));if(this.playing=t,this.audio)return this.audio.play(`media/${$(".description")[this.playing].href.split("/").pop()}.mp3`)}},$((function(){var t,i;return i=new Visualizer("#particles"),t=new InstaFlow({container:"#instaflow",username:"brycetsao",audio:i}),$(".prev").click((function(){return t.prev()})),$(".next").click((function(){return t.next()})),$("#instaflow").click(".instagram > img",(function(i){return t.goto($(i.target).parent().index())})),$(document).keyup((function(i){switch(i.which){case 37:return t.prev();case 39:return t.next()}}))}))}.call(this),function(){var t,i,e,a,s,n,r,o,h;t=2*Math.PI,a=function(){return window.innerWidth},s=function(){return window.innerHeight},h=function(t=1){return t*Math.random()},o=function(t=1){return h(-t)},r=function(i,e){return Math.sin(t*i/e)},n=Math.pow,e=class{constructor(t,i){this.x="number"==typeof t?t:0,this.y="number"==typeof i?i:0}clone(){return this}add(t){return this.x+=t.x||t[0]||0,this.y+=t.y||t[1]||0,this}},i=class{constructor(t,i){this.index=t,this.parent=i,this.rad_min=2,this.init()}get_data(){return this.parent.fft_data[this.index]/256}init(){return this.data=this.get_data(),this.rad=this.rad_min,this.pos=new e(h(a()),s()+this.rad+h(256)),this.vx=o(2)*o(2),this.tick=h(256)}update(){return this.tick++,this.data=this.get_data(),this.rad=this.rad_min+this.index/200+64*n(this.data,2),this.hue=390-120*this.index/400,this.satur=100*this.data,this.alpha=this.data,this.light=40+40*n(8,this.data-1),this.fill=`hsla(${this.hue}, ${this.satur}%, ${this.light}%, ${this.alpha})`,this.pos.add({x:this.vx+r(this.tick,512),y:-2*n(this.data,.5)}),this.check()}check(){var t;if(this.pos.y<-this.size||!(-.1<(t=this.pos.x/a())&&t<1.1))return this.init()}},this.Visualizer=class{constructor(t){this.tick=0,this.audio=$(`${t} audio`)[0],this.main_layer=$(`${t} canvas`)[0],this.glow_layer=$(`${t} canvas`)[1],this.ctx=this.main_layer.getContext("2d"),this.gctx=this.glow_layer.getContext("2d"),this.actx=new AudioContext,this.source=this.actx.createMediaElementSource(this.audio),this.analyser=new AnalyserNode(this.actx,{minDecibels:-128,maxDecibels:0,smoothingTimeConstant:.8}),this.source.connect(this.analyser),this.source.connect(this.actx.destination),this.fft_data=new Uint8Array(this.analyser.frequencyBinCount),this.resize(),this.generate(),this.render(),$(window).resize(this.resize.bind(this))}resize(){return this.main_layer.width=this.glow_layer.width=a(),this.main_layer.height=this.glow_layer.height=s()}play(t){return this.audio.src=t,this.audio.play(),this.actx.resume()}generate(t){var e,a,s;for(this.particles=[],s=[],e=a=40;a<=600;e=++a)s.push(this.particles.push(new i(e,this)));return s}update(){var i,e,n,r,o;for(this.analyser.getByteFrequencyData(this.fft_data),this.ctx.clearRect(0,0,a(),s()),i=e=0,n=(o=this.particles).length;e<n;i=++e)r=o[i],this.fft_data[i]&&(r.update(),this.ctx.beginPath(),this.ctx.fillStyle=r.fill,this.ctx.arc(r.pos.x,r.pos.y,r.rad,0,t),this.ctx.fill(),this.ctx.closePath());return this.gctx.clearRect(0,0,a(),s()),this.gctx.drawImage(this.main_layer,0,0)}render(){return this.tick++,this.update(),requestAnimationFrame(this.render.bind(this))}}}.call(this);