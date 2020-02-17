PI = 2 * Math.PI
X = -> window.innerWidth
Y = -> window.innerHeight
urand = (r = 1) -> r * Math.random()
srand = (r = 1) -> urand -r, r
sine = (t, T) -> Math.sin(PI * t / T)
exp = Math.pow

class Vector2
  constructor: (x, y) ->
    @x = if typeof x is 'number' then x else 0
    @y = if typeof y is 'number' then y else 0
  clone: -> @
  add: (v) ->
    @x += v.x || v[0] || 0
    @y += v.y || v[1] || 0
    @

class Particle
  constructor: (index, parent) ->
    @index = index
    @parent = parent
    @rad_min = 2
    @init()
  get_data: ->
    @parent.fft_data[@index] / 256
  init: ->
    @data = @get_data()
    @rad = @rad_min
    @pos = new Vector2 urand(X()), Y() + @rad + urand(256)
    @vx = srand(2) * srand(2)
    @tick =  urand(256)
  update: ->
    @tick++
    @data = @get_data()
    @rad = @rad_min + @index / 200 + 64 * exp @data, 2 
    @hue = 390 - 120 * @index / 400
    @satur = 100 * @data
    @alpha = @data
    @light = 40 + 40 * exp 8, @data - 1
    @fill = "hsla(#{@hue}, #{@satur}%, #{@light}%, #{@alpha})"
    @pos.add
      x: @vx + sine @tick, 512
      y: -2 * exp @data, 0.5
    @check()
  check: ->
    @init() if @pos.y < -@size or not (-0.1 < @pos.x / X() < 1.1)

class @Visualizer
  constructor: (cls) ->
    @tick = 0
    @audio = $("#{cls} audio")[0]
    @main_layer = $("#{cls} canvas")[0]
    @glow_layer = $("#{cls} canvas")[1]
    @ctx  = @main_layer.getContext '2d'
    @gctx = @glow_layer.getContext '2d'
    @actx = new AudioContext
    @source = @actx.createMediaElementSource @audio
    @analyser = new AnalyserNode @actx,
      minDecibels: -128
      maxDecibels: 0
      smoothingTimeConstant: 0.8
    @source.connect @analyser
    @source.connect @actx.destination
    @fft_data = new Uint8Array @analyser.frequencyBinCount
    @resize()
    @generate()
    @render()
    $(window).resize @resize.bind @
  resize: ->
    @main_layer.width = @glow_layer.width = X()
    @main_layer.height = @glow_layer.height = Y()
  play: (src) ->
    @audio.src = src
    @audio.play()
    @actx.resume()
  generate: (max) ->
    @particles = []
    @particles.push new Particle(i, @) for i in [40..600]
  update: ->
    @analyser.getByteFrequencyData(@fft_data)
    @ctx.clearRect 0, 0, X(), Y()
    for particle, i in @particles
      if @fft_data[i]
        particle.update()
        @ctx.beginPath()
        @ctx.fillStyle = particle.fill
        @ctx.arc particle.pos.x, particle.pos.y, particle.rad, 0, PI # draw circle 
        @ctx.fill()
        @ctx.closePath()
    @gctx.clearRect 0, 0, X(), Y()
    @gctx.drawImage @main_layer, 0, 0
  render: ->
    @tick++
    @update()
    requestAnimationFrame @render.bind @