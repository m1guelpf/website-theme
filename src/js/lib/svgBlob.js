import noise from './noise'
import { addListener } from 'resize-detector'

(global => {
    class SvgBlob {
        constructor(elements, options) {
            this.defaults = {
                clipPadding: 20,
                minPointsDistance: 80,
                speedFactor: 1,
                animateOnHover: true,
                animateWhenVisible: false,
                round: true,
                resize: true,
                resizeTimeout: 100,
                debug: false
            }

            this.init(elements, options)
        }
        init(elements, options) {
            this.options = extend({}, this.defaults, options)
            var nodes = is.str(elements) ? document.querySelectorAll(elements) : elements
            this.elements = []
            for (var index = 0; index < nodes.length; index++) {
                var node = nodes[index]
                this.elements.push(this.initElement(node))
                this.updatePath(index, 0)
                if (this.options.animateOnHover) {
                    node.addEventListener('mouseenter', this.resumeAnimation.bind(this, index))
                    node.addEventListener('mouseleave', this.pauseAnimation.bind(this, index))
                }
                if (this.options.animateWhenVisible) {
                    var interIndex = index,
                        observer = new IntersectionObserver(entries => {
                        entries.forEach(entry => {
                            entry.isIntersecting ? this.resumeAnimation(interIndex) : this.pauseAnimation(interIndex)
                        })
                    }, {
                        rootMargin: "0px",
                        threshold: 0.1
                    });
                    observer.observe(node);
                }
                if (this.options.resize) {
                    function resize(index) {
                        var element = this.elements[index]
                        if (element.resizeTimer) {
                            clearTimeout(element.resizeTimer)
                        }
                        element.resizeTimer = setTimeout(this.resizeElement.bind(this, index), this.options.resizeTimeout)
                    }
                    addListener(node, resize.bind(this, index))
                }
            }
        }
        initElement(node) {
            var width = node.offsetWidth
            var height = node.offsetHeight
            var points = this.getPoints(width, height, this.options)
            var svg = document.createElementNS(_svgNS, 'svg')
            svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height + '')
            var path = document.createElementNS(_svgNS, 'path')
            path.setAttribute('class', 'svg-blob__path')
            if (this.options.debug) {
                svg.setAttribute('class', 'svg-blob__svg --debug')
                svg.appendChild(path)
            } else {
                svg.setAttribute('class', 'absolute left-0 top-0 w-full h-full')
                var defs = document.createElementNS(_svgNS, 'defs')
                svg.appendChild(defs)
                var clipPath = document.createElementNS(_svgNS, 'clipPath')
                var clipPathId = 'svg-blob__clip--' + uuidv4() + ''
                clipPath.setAttribute('id', clipPathId)
                defs.appendChild(clipPath)
                node.style.clipPath = 'url(#' + clipPathId + ')'
                clipPath.appendChild(path)
            }
            node.insertBefore(svg, node.firstChild)

            return {
                node: node,
                points: points,
                svg: svg,
                path: path,
                time: randomInRange(0, 10000),
                raf: {
                    id: 0,
                    timeDiff: 0,
                    paused: true
                }
            }
        }
        getPoints(width, height) {
            var clipPadding = this.options.clipPadding
            var sides = [{
                name: 'top',
                points: this.generatePoints(width)
            }, {
                name: 'right',
                points: this.generatePoints(height)
            }, {
                name: 'bottom',
                points: this.generatePoints(width)
            }, {
                name: 'left',
                points: this.generatePoints(height)
            }]
            var points = []
            sides.forEach(function (side) {
                var horizontal = side.name === 'top' || side.name === 'bottom'
                var topOrRight = side.name === 'top' || side.name === 'right'
                var topOrLeft = side.name === 'top' || side.name === 'left'
                var value, valueRange, randRange
                side.points.forEach(function (point) {
                    value = topOrRight ? point : (horizontal ? width : height) - point
                    valueRange = topOrRight ? [value - clipPadding, value] : [value, value + clipPadding]
                    randRange = topOrLeft ? [0, clipPadding] : [-clipPadding, 0]
                    if (side.name === 'right') {
                        randRange[0] += width
                        randRange[1] += width
                    } else if (side.name === 'bottom') {
                        randRange[0] += height
                        randRange[1] += height
                    }
                    points.push({
                        xRange: horizontal ? valueRange : randRange,
                        yRange: horizontal ? randRange : valueRange
                    })
                })
            })
            return points
        }
        generatePoints(len) {
            var minPointsDistance = this.options.minPointsDistance
            var points = []
            var lines = [{
                x: 0,
                w: len
            }]

            function splitLine() {
                if (lines.length) {
                    var line = lines.shift()
                    if (line.w > minPointsDistance * 2) {
                        var line1Size = randomInRange(minPointsDistance, line.w - minPointsDistance)
                        var line1 = extend({}, line, {
                            w: line1Size
                        })
                        var line2 = extend({}, line, {
                            x: line.x + line1Size,
                            w: line.w - line1Size
                        })
                        lines.push(line1, line2)
                    } else {
                        points.push(line)
                        splitLine()
                    }
                } else {
                    points = points.sort(function (a, b) {
                        return a.x - b.x
                    }).map(function (line) {
                        return line.x
                    })
                    points.shift()
                    points.push(len)
                }
            }
            while (lines.length) {
                splitLine()
            }
            return points
        }
        updatePath(index, timeDiff) {
            var speedFactor = this.options.speedFactor
            var element = this.elements[index]
            var time = element.time + timeDiff
            element.points.forEach(function (point, pointIndex) {
                var noiseX = (noise.simplex2(pointIndex * 2, time * 0.0005 * speedFactor) + 1) / 2
                var noiseY = (noise.simplex2(pointIndex * 2 + 1, time * 0.0005 * speedFactor) + 1) / 2
                var xMin = point.xRange[0]
                var xMax = point.xRange[1]
                var yMin = point.yRange[0]
                var yMax = point.yRange[1]
                point.x = noiseX * (xMax - xMin) + xMin
                point.y = noiseY * (yMax - yMin) + yMin
            })
            element.path.setAttribute('d', this.buildPath(element.points))
        }
        buildPath(points) {
            var d = 'M ' + points[0].x + ' ' + points[0].y + ''
            var i, p0, p1, len = points.length
            for (i = 0; i <= len; i++) {
                p0 = points[i >= len ? i - len : i]
                p1 = points[i + 1 >= len ? i + 1 - len : i + 1]
                if (this.options.round) {
                    d += ' Q ' + p0.x + ' ' + p0.y + ' ' + (p0.x + p1.x) * 0.5 + ' ' + (p0.y + p1.y) * 0.5 + ''
                } else {
                    d += ' L ' + p0.x + ' ' + p0.y + ''
                }
            }
            return d
        }
        resumeAnimation(index) {
            var raf = this.elements[index].raf
            if (raf.paused) {
                var time0 = performance.now()
                var time1, timeDiff
                var self = this

                function render() {
                    time1 = performance.now()
                    timeDiff = time1 - time0
                    self.updatePath(index, timeDiff)
                    raf.timeDiff = timeDiff
                    raf.id = requestAnimationFrame(render)
                }
                raf.paused = false
                raf.timeDiff = 0
                raf.id = requestAnimationFrame(render)
            }
        }
        pauseAnimation(index) {
            var element = this.elements[index]
            var raf = element.raf
            if (!raf.paused) {
                cancelAnimationFrame(raf.id)
                element.time += raf.timeDiff
                raf.paused = true
            }
        }
        resizeElement(index) {
            var element = this.elements[index]
            this.pauseAnimation(index)
            var width = element.node.offsetWidth
            var height = element.node.offsetHeight
            element.points = this.getPoints(width, height)
            element.svg.setAttribute('viewBox', '0 0 ' + width + ' ' + height + '')
            element.time = randomInRange(0, 10000)
            element.raf = {
                id: 0,
                timeDiff: 0
            }
            this.updatePath(index, 0)
        }
    }
    var _svgNS = 'http://www.w3.org/2000/svg'
    var is = {
        arr: function arr(a) {
            return Array.isArray(a)
        },
        str: function str(a) {
            return typeof a === 'string'
        },
        fnc: function fnc(a) {
            return typeof a === 'function'
        },
        und: function und(a) {
            return typeof a === 'undefined'
        }
    }

    function uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8)
            return v.toString(16)
        })
    }

    function extendSingle(target, source) {
        for (var key in source) {
            target[key] = is.arr(source[key]) ? source[key].slice(0) : source[key]
        }
        return target
    }

    function extend(target, source) {
        if (!target) target = {}
        for (var i = 1; i < arguments.length; i++) {
            extendSingle(target, arguments[i])
        }
        return target
    }

    function randomInRange(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    global.SvgBlob = SvgBlob
})(window)