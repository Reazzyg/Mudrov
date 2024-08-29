!(function () {
  var t,
    e = {
      5974: function (t, e, i) {
        "use strict";
        function n(t) {
          setTimeout(() => {
            "complete" === document.readyState ||
            "loaded" === document.readyState ||
            "interactive" === document.readyState
              ? t()
              : document.addEventListener("DOMContentLoaded", t);
          }, 0);
        }
        function s(t) {
          setTimeout(() => {
            "complete" === document.readyState ||
            "loaded" === document.readyState ||
            "interactive" === document.readyState
              ? t()
              : document.addEventListener("DOMContentLoaded", t),
              document.addEventListener("DOMContentMutated", t);
          }, 0);
        }
        i.d(e, {
          P: function () {
            return n;
          },
          d: function () {
            return s;
          },
        });
      },
      9063: function (t, e, i) {
        "use strict";
        i.d(e, {
          A: function () {
            return n;
          },
        });
        class n {
          constructor(t, e, i) {
            (e = e || "GET"),
              (i = i || !1),
              (this.action = t || window.location.origin + window.location.pathname),
              (this.type = e.toUpperCase()),
              (this.json = i),
              (this.mutators = []);
          }
          mutate(t) {
            this.mutators.push(t);
          }
          send(t) {
            return new Promise((e, i) => {
              let n = this.action;
              if ("GET" === this.type && t) {
                let e = [];
                for (let i of t.entries()) e.push(encodeURIComponent(i[0]) + "=" + encodeURIComponent(i[1]));
                let i = e.join("&");
                i && (n += (n.includes("?") ? "" : "?") + i);
              }
              (this.request = new XMLHttpRequest()),
                this.request.open(this.type, n),
                this.mutators.forEach((t) => {
                  t.call(this, this.request);
                }),
                (this.request.onload = () => {
                  let t = this.request.responseText;
                  this.json && (t = JSON.parse(t)),
                    this.request.status >= 200 && this.request.status < 400 ? e(t, this.request) : i(t, this.request);
                }),
                this.request.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                t instanceof FormData ||
                  "object" != typeof t ||
                  (this.request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"),
                  (t = Object.keys(t)
                    .map((e) => encodeURIComponent(e) + "=" + encodeURIComponent(t[e]))
                    .join("&"))),
                this.request.send(t);
            });
          }
        }
      },
      5541: function (t, e, i) {
        "use strict";
        i.d(e, {
          A: function () {
            return s;
          },
        });
        var n = i(4705);
        class s {
          constructor(t, e, i) {
            s._eventRegistry[t] ||
              ((s._eventRegistry[t] = []), document.documentElement.addEventListener(t, this.dispatchEvent, !0)),
              s._eventRegistry[t].push({
                selector: e,
                handler: i,
              });
          }
          dispatchEvent(t) {
            let e = t.target;
            s._eventRegistry[t.type].forEach(function (i) {
              let n = document.querySelectorAll(i.selector),
                s = Array.prototype.indexOf.call(n, e) >= 0;
              if (!s)
                for (let t = 0; t < n.length; ++t)
                  if (((s = n[t].contains(e)), s)) {
                    e = n[t];
                    break;
                  }
              s && i.handler.call(e, t);
            });
          }
        }
        (0, n.A)(s, "_eventRegistry", {});
      },
      8753: function (t, e, i) {
        "use strict";
        i.r(e),
          new (i(5541).A)("click", ".smart-tabs li a", function (t) {
            let e = this;
            "A" === e.tagName && t.preventDefault();
            let i = e.dataset.tab;
            !i && e.getAttribute("href") && (i = e.getAttribute("href"));
            let n = document.querySelector(i);
            n &&
              (n.parentNode.querySelectorAll(".smart-content").forEach((t) => {
                t.classList.remove("_active");
              }),
              n.classList.add("_active")),
              e
                .closest(".smart-tabs")
                .querySelectorAll("li")
                .forEach((t) => {
                  t.classList.remove("_active");
                }),
              e.closest("li").classList.add("_active");
            let s = new CustomEvent("smart-tabs-handle", {
              detail: {
                button: e,
                tab: n,
              },
            });
            document.dispatchEvent(s);
          });
      },
      9756: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(4705),
          s = class {
            constructor(t) {
              if (
                ((this.element = t),
                (this.link = this.element.querySelector("[data-accordion-link]")),
                (this.block = this.element.querySelector("[data-accordion-block]")),
                this.link.dataset.accordionLinkText
                  ? (this.textLinkElement = this.link.dataset.accordionLinkText)
                  : (this.textLinkElement = this.link.querySelector("[data-accordion-link-text]")),
                !this.link)
              )
                throw new Error("Element by selector [data-accordion-link] not found");
              if (!this.block) throw new Error("Element by selector [data-accordion-block] not found");
              if (1 !== this.block.childElementCount)
                throw new Error("Element by selector [data-accordion-block] must contain 1 child");
              (this.content = this.block.children[0]),
                this.defineHeight(),
                this.addListeners(),
                this.element.dataset.isOpened ? this.setOpenedProperties() : this.setCloseProperties();
            }
            defineHeight() {
              this.targetHeight = this.content.clientHeight;
            }
            open() {
              this.setOpenedProperties(), this.element.dispatchEvent(new CustomEvent("ElementOpen"));
            }
            close() {
              this.setCloseProperties(), this.element.dispatchEvent(new CustomEvent("ElementClose"));
            }
            setOpenedProperties() {
              (this.block.style.height = `${this.targetHeight}px`),
                (this.isOpened = !0),
                this.element.classList.add("_opened"),
                this.swipeText();
            }
            setCloseProperties() {
              (this.block.style.height = ""),
                (this.isOpened = !1),
                this.element.classList.remove("_opened"),
                this.swipeText();
            }
            swipeText() {
              if (this.textLinkElement) {
                const t = this.textLinkElement.dataset.accordionLinkText;
                (this.textLinkElement.dataset.accordionLinkText = this.textLinkElement.innerHTML),
                  (this.textLinkElement.innerHTML = t);
              }
            }
            addListeners() {
              const t = this;
              this.link.addEventListener("click", (e) => {
                e.preventDefault(), t.isOpened ? t.close() : t.open();
              });
            }
            onResize() {
              this.defineHeight(), this.isOpened && this.setOpenedProperties();
            }
          },
          o = class {
            constructor(t) {
              (0, n.A)(this, "modes", ["single", "multi"]), (this.containerElement = t), (this.elements = []);
              const e = this.containerElement.dataset.accordionMode;
              e && this.modes.includes(e) ? (this.mode = e) : (this.mode = "single"), this.init();
            }
            init() {
              this.collect(), this.elementListeners(), this.setInitialized();
            }
            collect() {
              this.containerElement
                .querySelectorAll('[data-accordion-element]:not([data-initialized="true"])')
                .forEach((t) => {
                  try {
                    this.elements.push(new s(t));
                  } catch (t) {
                    console.log(t);
                  }
                });
            }
            elementListeners() {
              this.getNotInitContainers().forEach((t) => {
                this.listenOpen(t.element), this.listenClose(t.element);
              });
            }
            listenOpen(t) {
              const e = this;
              t.addEventListener("ElementOpen", (i) => {
                "single" === e.mode &&
                  e.elements
                    .filter((e) => e.isOpened && e.element !== t)
                    .forEach((t) => {
                      t.close();
                    }),
                  e.containerElement.dispatchEvent(
                    new CustomEvent("ContainerElementOpen", {
                      detail: {
                        element: t,
                      },
                    })
                  );
              });
            }
            listenClose(t) {
              const e = this;
              t.addEventListener("ElementOpen", (i) => {
                e.containerElement.dispatchEvent(
                  new CustomEvent("ContainerElementClose", {
                    detail: {
                      element: t,
                    },
                  })
                );
              });
            }
            setInitialized() {
              this.getNotInitContainers().forEach((t) => (t.element.dataset.initialized = "true"));
            }
            onResize() {
              this.elements.forEach((t) => t.onResize());
            }
            getNotInitContainers() {
              return this.elements.filter((t) => !t.element.dataset.initialized);
            }
          },
          a = class {
            constructor() {
              (this.containers = []), this.init(), this.accordionListeners();
            }
            init() {
              this.collectContainers(), this.containerListeners(), this.setInitialized();
            }
            collectContainers() {
              document.querySelectorAll('[data-accordion-container]:not([data-initialized="true"])').forEach((t) => {
                this.containers.push(new o(t));
              });
            }
            accordionListeners() {
              const t = this;
              document.addEventListener("DOMContentMutated", (e) => {
                t.containers.forEach((t) => t.init()), this.init();
              }),
                window.addEventListener("resize", () => {
                  t.containers.forEach((t) => t.onResize());
                });
            }
            setInitialized() {
              this.getNotInitContainers().forEach((t) => (t.containerElement.dataset.initialized = "true"));
            }
            getNotInitContainers() {
              return this.containers.filter((t) => !t.containerElement.dataset.initialized);
            }
            containerListeners() {
              const t = this;
              this.getNotInitContainers().forEach((e) => {
                t.transferEvent(e, "ContainerElementOpen", "AccordionOpen"),
                  t.transferEvent(e, "ContainerElementClose", "AccordionClose");
              });
            }
            transferEvent(t, e, i) {
              t.containerElement.addEventListener(e, (e) => {
                const n = e.detail.element;
                document.dispatchEvent(
                  new CustomEvent(i, {
                    detail: {
                      container: t.containerElement,
                      element: n,
                    },
                  })
                );
              });
            }
          };
        document.addEventListener("DOMContentLoaded", () => {
          setTimeout(() => {
            new a();
          }, 2e3);
        });
      },
      7262: function (t, e, i) {
        "use strict";
        i.r(e);
        document.querySelectorAll("[data-switchable-accordion-link]").forEach((t) => {
          t.addEventListener("click", (e) => {
            e.preventDefault();
            const i = t.getAttribute("href"),
              n = document.querySelector(i);
            if (n && !n.classList.contains("_opened")) {
              const t = n.querySelector("[data-accordion-link]");
              t && t.click();
            }
          });
        }),
          document.querySelectorAll("[data-switchable-accordion-element]").forEach((t) => {
            t.addEventListener("ElementOpen", () => {
              const e = t.id,
                i = document.querySelector(`[data-switchable-accordion-link][href='#${e}']`);
              document.querySelectorAll("[data-switchable-accordion-link]").forEach((t) => {
                t.closest("li").classList.remove("_active");
              }),
                ((t, e, i) => {
                  (i = i || window), (e = e || 0);
                  const n = t.getBoundingClientRect().top,
                    s = i.pageYOffset,
                    o = n + e;
                  let a,
                    r = null;
                  const c = (t) => {
                    r || (r = t);
                    const e = t - r,
                      n = Math.min(e / 500, 1);
                    var l;
                    i.scrollTo(0, s + o * ((l = n), 1 - Math.pow(1 - l, 3))),
                      e < 500 ? (a = i.requestAnimationFrame(c)) : i.cancelAnimationFrame(a);
                  };
                  a = i.requestAnimationFrame(c);
                })(i.closest("[data-accordion-container]"), -100),
                i.closest("li").classList.add("_active");
            });
          });
      },
      7636: function (t, e, i) {
        i(6819),
          i(912),
          (window.noZensmooth = !0),
          i(3829),
          i(8771),
          i(9360),
          i(8491),
          i(4947),
          i(7236),
          i(5479),
          i(8281),
          i(3659),
          i(1900),
          i(1351),
          i(8122),
          i(1759),
          i(3023),
          i(1434),
          i(9756),
          i(7262),
          i(7148),
          i(9456),
          i(3003),
          i(8753),
          i(8912),
          i(5832),
          i(5744),
          i(5817),
          i(8740),
          i(7583),
          i(7943),
          i(5832),
          i(2794),
          i(1215),
          i(2506);
      },
      3659: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(4705);
        class s {
          constructor() {
            (0, n.A)(this, "links", []), this.findLinks(), this.bind(), this.detectLinks();
          }
          bind() {
            this.bindMutated(), this.bindScroll();
          }
          bindMutated() {
            const t = this;
            document.addEventListener("DOMContentMutated", (e) => {
              t.findLinks(), t.detectLinks();
            });
          }
          bindScroll() {
            const t = this;
            document.addEventListener("scrolling", (e) => {
              t.detectLinks();
            });
          }
          detectLinks() {
            const t = [];
            this.links.forEach((e, i) => {
              e.getBoundingClientRect().top - window.innerHeight <= window.innerHeight / 2 && t.push(i);
            }),
              t.length && this.dispatchLinks(t);
          }
          dispatchLinks(t) {
            const e = this,
              i = new Event("click", {
                detail: "mydetail",
                cancelable: !0,
              });
            t.forEach((t) => {
              e.links[t] && (e.links[t].dispatchEvent(i), e.links.splice(t, 1));
            });
          }
          findLinks() {
            document.querySelectorAll("[data-endless-action]:not([data-initialized])").forEach((t) => {
              (t.dataset.initialized = "true"), this.links.push(t);
            });
          }
        }
        document.addEventListener("DOMContentLoaded", function () {
          new s();
        });
      },
      3023: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(5974);
        class s {
          constructor(t) {
            (this.container = t),
              (this.object = this.container.querySelector("[data-follow-object]")),
              (this.cursor = {
                x: 0,
                y: 0,
                lastX: 0,
                lastY: 0,
              }),
              (this.ease = 1),
              (this.offsetValue = 25),
              (this.direction = {
                x: void 0,
                y: void 0,
              }),
              (this.offset = {
                x: 0,
                y: 0,
              }),
              this.updateContainerPosition(),
              this.update(),
              this.eventListeners();
          }
          setStyles() {
            this.object.style.transform = `translate3d(${this.offset.x}px, ${this.offset.y}px, 0)`;
          }
          defineDirection() {
            this.cursor.x < this.containerHorizontalCenter
              ? (this.direction.x = "left")
              : this.cursor.x > this.containerHorizontalCenter && (this.direction.x = "right"),
              this.cursor.y < this.containerVerticalCenter
                ? (this.direction.y = "up")
                : this.cursor.y > this.containerVerticalCenter && (this.direction.y = "down");
          }
          handleMouseenterOnContainer() {
            this.cursor.x > this.containerLeft &&
            this.cursor.x < this.containerRight &&
            this.cursor.y > this.containerTop &&
            this.cursor.y < this.containerBottom
              ? (this.defineDirection(), this.computedOffset())
              : this.clearOffset();
          }
          computedOffset() {
            const t = this.halfContainer / 100;
            if ("left" === this.direction.x) {
              const e = (-1 * this.offsetValue * ((this.containerHorizontalCenter - this.cursor.x) / t)) / 100;
              this.offset.x = (1 - this.ease) * this.offset.x + this.ease * e;
            } else if ("right" === this.direction.x) {
              const e = (this.offsetValue * ((this.cursor.x - this.containerHorizontalCenter) / t)) / 100;
              this.offset.x = (1 - this.ease) * this.offset.x + this.ease * e;
            }
            if ("up" === this.direction.y) {
              const e = (-1 * this.offsetValue * ((this.containerVerticalCenter - this.cursor.y) / t)) / 100;
              this.offset.y = (1 - this.ease) * this.offset.y + this.ease * e;
            } else if ("down" === this.direction.y) {
              const e = (this.offsetValue * ((this.cursor.y - this.containerVerticalCenter) / t)) / 100;
              this.offset.y = (1 - this.ease) * this.offset.y + this.ease * e;
            }
          }
          clearOffset() {
            (this.offset.x = (1 - this.ease) * this.offset.x + 0.1 * this.ease),
              (this.offset.y = (1 - this.ease) * this.offset.y + 0.1 * this.ease);
          }
          updateContainerPosition() {
            const t = this.container.getBoundingClientRect();
            (this.containerWidth = this.container.offsetWidth),
              (this.containerHeight = this.container.offsetHeight),
              (this.containerLeft = t.left),
              (this.containerRight = this.containerLeft + this.containerWidth),
              (this.containerTop = t.top),
              (this.containerBottom = this.containerTop + this.containerHeight),
              (this.halfContainer = this.containerWidth / 2),
              (this.containerHorizontalCenter = this.containerLeft + this.containerWidth / 2),
              (this.containerVerticalCenter = this.containerTop + this.containerHeight / 2);
          }
          update() {
            this.handleMouseenterOnContainer(),
              this.setStyles(),
              (this.cursor.lastX = this.cursor.x),
              (this.cursor.lastY = this.cursor.y),
              window.requestAnimationFrame(this.update.bind(this));
          }
          eventListeners() {
            window.addEventListener("mousemove", (t) => {
              (this.cursor.x = t.clientX), (this.cursor.y = t.clientY);
            }),
              document.addEventListener("scrolling", () => {
                this.updateContainerPosition();
              });
          }
        }
        function o() {
          const t = getComputedStyle(document.documentElement).getPropertyValue("--large-min-width") || 1025;
          document.body.getBoundingClientRect().width >= t &&
            document.querySelectorAll('[data-follow-item]:not([data-initialize="true"])').forEach((t) => {
              (t.dataset.initialize = "true"), new s(t);
            });
        }
        (0, n.P)(() => o()), (0, n.d)(() => o());
      },
      8491: function () {
        class t {
          constructor() {
            (this.systemsNames = ["google", "yandex"]), (this.middlewares = []);
          }
          registerMiddleware(t) {
            this.middlewares.push(t);
          }
          proceedGoal(t, e) {
            switch (t) {
              case "yandex":
                return this.proceedYandexGoal(e);
              case "google":
                return this.proceedGoogleGoal(e);
              case "facebook":
                return this.proceedFacebookGoal(e);
              default:
                console.error(`GoalManager: Incorrect system name ${t}`);
            }
            return null;
          }
          proceedYandexGoal(t) {
            window.Ya && window.Ya._metrika
              ? window.Ya._metrika.counter.reachGoal(t)
              : console.error("GoalManager: Try send yandex event, but yandex counter not found");
          }
          proceedFacebookGoal(t) {
            window.fbq
              ? window.fbq("track", t)
              : console.error("GoalManager: Try send facebook event, but facebook counter not found");
          }
          proceedGoogleGoal(t) {
            const e = t.split("#");
            (e[0] && e[1]) ||
              console.error(
                "GoalManager: Incorrect goal data for google, please read documentation. Format google goal: event_category#action"
              );
            const [i, n, s, o] = e,
              a = {
                event_category: i,
              };
            s && (a.event_label = s),
              o && (a.value = o),
              window.gtag
                ? window.gtag("event", n, a)
                : console.error("GoalManager: Try send google event, but google counter not found");
          }
          proceedGoalsForElement(t, e) {
            if (!t) return void console.error(`GoalManager: Incorrect element passed for event ${e}`);
            let i = !1;
            this.middlewares.forEach((n) => {
              i || (i = n(t, e));
            }),
              i ||
                this.systemsNames.forEach((i) => {
                  const n = this.buildDatasetProperty(i, e),
                    s = t.dataset[n];
                  s && this.proceedGoal(i, s);
                });
          }
          buildDatasetProperty(e, i) {
            return `goal${t.capitalizeFirstLetter(e)}${t.capitalizeFirstLetter(i)}`;
          }
          buildDatasetAttributes(t) {
            return this.systemsNames.map((e) => `data-goal-${e}-${t}`);
          }
          buildDatasetSelector(t) {
            return this.buildDatasetAttributes(t)
              .map((t) => `[${t}]`)
              .join(",");
          }
          static dashesToCamelCase(t) {
            return t.replace(/-([a-z])/g, (t, e) => e.toUpperCase());
          }
          static capitalizeFirstLetter(t) {
            return t.charAt(0).toUpperCase() + t.slice(1);
          }
        }
        (window.goalManager = new t()),
          document.body.addEventListener("click", (t) => {
            const e = t.target.closest(window.goalManager.buildDatasetSelector("click"));
            e && window.goalManager.proceedGoalsForElement(e, "click");
          }),
          document.body.addEventListener("mouseover", (t) => {
            const e = t.target.closest(window.goalManager.buildDatasetSelector("hover"));
            e && window.goalManager.proceedGoalsForElement(e, "hover");
          }),
          document.body.addEventListener("copy", (t) => {
            const e = t.target.closest(window.goalManager.buildDatasetSelector("copy"));
            e && window.goalManager.proceedGoalsForElement(e, "copy");
          });
        const e = () => {
          document.querySelectorAll(window.goalManager.buildDatasetSelector("see")).forEach((t) => {
            window.pageYOffset + window.innerHeight - 0.5 * window.innerHeight >=
              (function (t) {
                const e = new Date().getTime();
                return (
                  e - (t.dataset.documentOffsetTopTime ? t.dataset.documentOffsetTopTime : 0) > 800 &&
                    ((t.dataset.documentOffsetTop = window.pageYOffset + t.getBoundingClientRect().top),
                    (t.dataset.documentOffsetTopTime = e)),
                  parseInt(t.dataset.documentOffsetTop, 10)
                );
              })(t) &&
              !t.dataset.seeGoalSent &&
              (window.goalManager.proceedGoalsForElement(t, "see"), (t.dataset.seeGoalSent = "true"));
          });
        };
        window.addEventListener("scroll", e), e();
        const i = (t) => {
          const e = t.target.closest(window.goalManager.buildDatasetSelector("input"));
          e && window.goalManager.proceedGoalsForElement(e, "input");
        };
        document.body.addEventListener("input", i),
          document.body.addEventListener("change", i),
          document.addEventListener("formSubmit", (t) => {
            t.element && window.goalManager.proceedGoalsForElement(t.element, "submit");
          }),
          window.goalManager.registerMiddleware((t, e) => {
            "submit" === e && window.goalManager.proceedFacebookGoal("SubmitApplication");
          });
      },
      4947: function (t, e, i) {
        "use strict";
        function n(t, e) {
          t.querySelectorAll(`.errors[id^='${e}'], .errors[id*='_${e}_']`).forEach((t) => {
            (t.innerHTML = ""), (t.style.display = "none");
          });
        }
        function s(t, e) {
          const i = {};
          return (
            Object.keys(e).forEach((n) => {
              const o = `${t}[${n}]`;
              if (e[n] instanceof Array) i[o] = e[n];
              else {
                const t = s(o, e[n]);
                Object.keys(t).forEach((e) => {
                  i[e] = t[e];
                });
              }
            }),
            i
          );
        }
        function o(t, e, i) {
          n(t, e);
          const o = s(e, i);
          Object.keys(o).forEach((e) => {
            const i = e.replace(/\[/g, "_").replace(/\]/g, ""),
              n = t.querySelector(`[id$='${i}_errors']`);
            o[e].forEach((t) => {
              n.style.display = "";
              let e = document.createElement("li");
              (e.innerText = t), n.appendChild(e);
            });
          });
        }
        i.r(e);
        var a = i(5541),
          r = i(9063);
        new a.A("submit", "[data-ajax-form]", function (t) {
          t.preventDefault();
          const e = this.dataset.ajaxForm.split(","),
            i = this.dataset.successSelector,
            s = i ? document.querySelector(i) : this,
            a = this.dataset.successTrigger;
          new r.A(this.getAttribute("action"), this.getAttribute("method"), !0)
            .send(new FormData(this))
            .then((t, i) => {
              let r = {};
              if (
                (t.errors && (r = t.errors),
                Object.keys(e).forEach((t) => {
                  const i = e[t];
                  r[i] ? o(this, i, r[i]) : n(this, i);
                }),
                "success" === t.state)
              ) {
                s.classList.add("success"),
                  a &&
                    document.dispatchEvent(
                      new CustomEvent("ajax-form-success", {
                        detail: {
                          form: this,
                        },
                      })
                    );
                const t = new Event("formSubmit");
                (t.element = this),
                  document.dispatchEvent(t),
                  setTimeout(() => {
                    this.reset(),
                      this.querySelectorAll("[data-floating-field], [data-custom-text-area]").forEach((t) => {
                        t.classList.remove("_filled");
                      }),
                      document.dispatchEvent(
                        new CustomEvent("success", {
                          detail: {
                            form: this,
                          },
                        })
                      ),
                      s.classList.remove("success");
                  }, 3e3);
              }
            });
        });
      },
      7236: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(5541),
          s = i(8537);
        new n.A("click", "[data-scroll-link], .scroll-link", function (t) {
          t.preventDefault();
          let e = null;
          e = this.dataset.selector
            ? document.querySelector(this.dataset.selector)
            : document.querySelector(this.getAttribute("href"));
          let i = parseInt(this.dataset.offset) || 0;
          e && (0, s.A)(e, i);
        }),
          new n.A("click", "[data-toggle-link], .toggle-link", function (t) {
            t.preventDefault(), document.querySelector(this.dataset.selector).classList.toggle(this.dataset.toggle);
          });
      },
      5479: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(5541);
        class s {
          constructor(t, e) {
            return (
              (this.options = {
                animation: null,
                preloader: !0,
                theme: "default",
                closerText: "×",
                width: void 0,
                closeOnClickBg: !0,
                closeKeys: [27],
                closeOnSuccess: !0,
                closeOnSuccessDelay: 2e3,
                handleForm: !0,
                useAjaxForm: !1,
                onBeforeStart: () => {},
                onAfterStart: () => {},
                afterFormSubmit: () => {},
                onFormSuccess: () => {},
                onFormError: () => {},
                onSubmit: "default",
                onBeforeOpen: () => {},
                onAfterOpen: () => {},
                onBeforeClose: () => {},
                onAfterClose: () => {},
                classes: {
                  layout: "modal__layout",
                  container: "modal__container",
                  content: "modal__content",
                  background: "modal__bg",
                  closer: "modal__closer",
                  loader: "modal__loader",
                  body: "modal-opened",
                  loading: "modal-loading",
                },
              }),
              (this.escHandler = void 0),
              (this.closerHandler = void 0),
              (this.closeBgHandler = void 0),
              (this.options = Object.assign({}, this.options, e)),
              (this.element = t),
              this.go(),
              (this.active = !0),
              this
            );
          }
          go() {
            if (this.options.preloader) {
              if (document.body.classList.contains(this.options.classes.loading)) return !1;
              this.showPreLoader();
            }
            return (
              "A" === this.element.tagName
                ? this.startLink(this.element.getAttribute("href"))
                : this.start(this.element.clone(!0)),
              this
            );
          }
          showPreLoader() {
            let t = document.createElement("div");
            t.classList.add(this.options.classes.loader),
              document.body.classList.add(this.options.classes.loading),
              document.body.appendChild(t);
          }
          hidePreLoader() {
            document.body.classList.remove(this.options.classes.loading),
              document.querySelectorAll("." + this.options.classes.loader).forEach((t) => {
                t.remove();
              });
          }
          setContent(t) {
            (this.content.innerHTML = t), this.evalScripts();
            let e = new Event("DOMContentMutated");
            document.dispatchEvent(e);
            const i = this.content.querySelectorAll("form:not([data-modal-handle-off])");
            this.options.handleForm &&
              i.length > 0 &&
              i.forEach((t) => {
                t.addEventListener("submit", (e) => (e.preventDefault(), this.submit(t), !1));
              });
          }
          evalScripts() {
            this.content.querySelectorAll('script[type="text/javascript"], script:not([type])').forEach((t) => {
              let e = t.text || t.textContent || t.innerHTML || "";
              const i = document.querySelector("head") || document.documentElement;
              let n = document.createElement("script");
              (n.type = "text/javascript"),
                n.appendChild(document.createTextNode(e)),
                i.appendChild(n),
                i.removeChild(n),
                t.parentNode && t.parentNode.removeChild(t);
            });
          }
          render() {
            (this.content = document.createElement("div")),
              this.content.classList.add(this.options.classes.content),
              (this.closer = document.createElement("a")),
              this.closer.setAttribute("href", "javascript:void(0)"),
              (this.closer.innerHTML = this.options.closerText),
              this.closer.classList.add(this.options.classes.closer),
              (this.container = document.createElement("div")),
              this.container.classList.add(this.options.classes.container),
              this.container.classList.add(this.options.theme),
              this.container.appendChild(this.closer),
              this.container.appendChild(this.content),
              (this.layout = document.createElement("div")),
              this.layout.classList.add(this.options.classes.layout),
              this.layout.appendChild(this.container),
              (this.background = document.createElement("div")),
              this.background.classList.add(this.options.classes.background),
              this.background.classList.add(this.options.theme),
              this.background.appendChild(this.layout),
              document.body.appendChild(this.background);
          }
          startLink(t) {
            if (t.match(/^#/)) {
              const e = document.querySelector(t);
              e && this.start(e.cloneNode(!0));
            } else {
              const e = new XMLHttpRequest();
              e.open("GET", t),
                e.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
                (e.onload = () => {
                  this.start(e.responseText);
                }),
                e.send();
            }
          }
          submit(t) {
            "function" == typeof this.options.onSubmit ? this.options.onSubmit.call(this, t) : this.onSubmitDefault(t);
          }
          onSubmitDefault(t) {
            let e = t.getAttribute("method");
            e || (e = "post"), (e = e.toUpperCase());
            let i = new FormData(t),
              n = t.getAttribute("action");
            if ("GET" === e) {
              let t = [];
              for (let e of i.entries()) t.push(encodeURIComponent(e[0]) + "=" + encodeURIComponent(e[1]));
              let e = t.join("&");
              e && (n += (n.includes("?") ? "" : "?") + e);
            }
            const s = new XMLHttpRequest();
            s.open(e, n),
              (s.onload = () => {
                this.getHandleFormResponse(s);
              }),
              s.setRequestHeader("X-Requested-With", "XMLHttpRequest"),
              s.send(i);
          }
          getHandleFormResponse(t) {
            let e = t.responseText,
              i = !1,
              n = !1;
            if ("object" == typeof e) i = !0;
            else
              try {
                (e = JSON.parse(e)), (i = !0);
              } catch (t) {}
            if ((this.options.afterFormSubmit.call(this, e, t), i)) {
              if (e.close) return this.close();
              e.content && this.setContent(e.content), "success" === e.status && (n = !0);
            } else
              this.setContent(e),
                (0 === this.content.querySelectorAll("form").length ||
                  this.content.querySelectorAll("[data-modal-success]").length > 0) &&
                  (n = !0);
            n
              ? (this.options.onFormSuccess.call(this, e, t),
                !1 !== this.options.closeOnSuccess && setTimeout(() => this.close(), this.options.closeOnSuccessDelay))
              : this.options.onFormError.call(this, e, t);
          }
          hasAnotherModal() {
            let t = 0;
            return (
              document.querySelectorAll("." + this.options.classes.background).forEach((e) => {
                e !== this.background && t++;
              }),
              t > 0
            );
          }
          isLastModal() {
            return this.background;
          }
          start(t) {
            this.options.onBeforeStart(),
              this.render(),
              this.setContent(t),
              this.bindEvents(),
              this.open(),
              this.options.onAfterStart();
          }
          open() {
            let t = document.body.offsetWidth;
            this.options.onBeforeOpen(),
              this.options.preloader && this.hidePreLoader(),
              this.background.classList.add("opened"),
              this.layout.classList.add("opened"),
              this.hasAnotherModal() ||
                ((document.body.style.overflow = "hidden"),
                (document.body.style.paddingRight = document.body.offsetWidth - t + "px"),
                document.body.classList.add(this.options.classes.body)),
              this.options.onAfterOpen();
          }
          close() {
            if (!this.active) return !1;
            this.unbindEvents(),
              this.options.onBeforeClose(),
              this.options.animation
                ? (this.container.classList.add(this.options.animation.classOut),
                  setTimeout(() => {
                    this.background.parentNode.removeChild(this.background);
                  }, this.options.animation.timeoutOut))
                : this.background.parentNode.removeChild(this.background),
              this.hasAnotherModal() ||
                ((document.body.style.overflow = ""),
                (document.body.style.paddingRight = ""),
                document.body.classList.remove(this.options.classes.body)),
              this.options.onAfterClose(),
              (this.active = !1);
          }
          bindEvents() {
            (this.closerHandler = (t) => (t.preventDefault(), this.close(), !1)),
              this.closer.addEventListener("click", this.closerHandler),
              !0 === this.options.closeOnClickBg &&
                ((this.closeBgHandler = (t) => {
                  if (t.target === this.layout || t.target === this.background)
                    return t.preventDefault(), this.close(), !1;
                }),
                this.background.addEventListener("click", this.closeBgHandler)),
              this.options.closeKeys.length > 0 &&
                ((this.escHandler = (t) => {
                  this.options.closeKeys.includes(t.which) &&
                    document.querySelector("." + this.options.classes.background + ":last-of-type") ===
                      this.background &&
                    this.close();
                }),
                document.addEventListener("keyup", this.escHandler));
          }
          unbindEvents() {
            this.closer.removeEventListener("click", this.closerHandler),
              this.background.removeEventListener("click", this.closeBgHandler),
              this.options.closeKeys.length > 0 && document.removeEventListener("keyup", this.escHandler);
          }
        }
        new n.A("click", "[data-modal]", function (t) {
          t.preventDefault();
          let e = this;
          return (
            new s(this, {
              closerText: "",
              onFormSuccess: function () {
                const t = new Event("formSubmit");
                (t.element = e), document.dispatchEvent(t);
              },
            }),
            !1
          );
        });
      },
      1351: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(5974);
        const s = () => {
          window.ymaps
            ? ymaps.ready(() => {
                document.querySelectorAll("[data-map]").forEach(function (t) {
                  let e,
                    i = new ymaps.Map(
                      t,
                      {
                        center: [parseFloat(t.dataset.lat), parseFloat(t.dataset.lng)],
                        zoom: t.dataset.zoom,
                        controls: ["zoomControl", "fullscreenControl"],
                      },
                      {
                        searchControlProvider: "yandex#search",
                      }
                    );
                  (e =
                    window.innerWidth > 568
                      ? new ymaps.Placemark(
                          i.getCenter(),
                          {},
                          {
                            iconLayout: "default#image",
                            iconImageHref: t.dataset.mark,
                            iconImageSize: [62, 74],
                            iconImageOffset: [0, -74],
                          }
                        )
                      : new ymaps.Placemark(
                          i.getCenter(),
                          {},
                          {
                            iconLayout: "default#image",
                            iconImageHref: t.dataset.mark,
                            iconImageSize: [42, 48],
                            iconImageOffset: [0, -48],
                          }
                        )),
                    i.behaviors.disable("scrollZoom"),
                    window.innerWidth <= 1024 && i.behaviors.disable("drag"),
                    i.geoObjects.add(e);
                });
              })
            : setTimeout(() => {
                s();
              }, 500);
        };
        (0, n.P)(() => s());
      },
      8122: function () {
        let t = [],
          e = new Date();
        function i() {
          (t = document.querySelectorAll("[data-need-animation]:not(.animate)")), (e = new Date());
        }
        function n() {
          new Date() - e > 1e3 && i();
          const n = window.pageYOffset || document.documentElement.scrollTop,
            s = window.innerHeight,
            o = n + s;
          t.forEach((t) => {
            const e = t.getBoundingClientRect(),
              i = e.top + n;
            if (-1 === t.className.indexOf("animate") && !t.dataset.transit) {
              const n = t.dataset.delay || 0,
                a = t.dataset.ratio || 2;
              let r = !1;
              t.dataset.fully ? e.height + i < o && (r = !0) : e.top < s / a && (r = !0),
                r &&
                  ((t.dataset.transit = "on"),
                  setTimeout(() => {
                    t.classList.add("animate"), t.classList.remove("need-animation");
                  }, n));
            }
          });
        }
        function s() {
          i(),
            document.addEventListener("scrolling", (t) => {
              n(t.detail.offsetY);
            }),
            n();
        }
        document.addEventListener("DOMContentLoaded", s), document.addEventListener("DOMContentMutated", s);
      },
      8281: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(5541),
          s = i(9063);
        new n.A("click", "[data-endless-action]", function (t) {
          t.preventDefault(), t.stopPropagation();
          let e = this.closest("[data-pagination-nav]").dataset.paginationNav;
          this.dataset.loading ||
            ((this.dataset.loading = "true"),
            new s.A(this.getAttribute("href")).send().then((t) => {
              let i = document.createElement("div");
              i.innerHTML = t;
              let n = i.querySelector(`[data-pagination-data="${e}"]`),
                s = document.querySelector(`[data-pagination-data="${e}"]`);
              Array.from(n.children).forEach((t) => {
                s.appendChild(t);
              }),
                (this.dataset.loading = "");
              let o = i.querySelector(`[data-pagination-nav="${e}"]`),
                a = document.querySelector(`[data-pagination-nav="${e}"]`);
              a.parentNode.replaceChild(o, a);
              let r = new Event("DOMContentMutated");
              document.dispatchEvent(r);
            }));
        });
      },
      1900: function () {
        window.respond = function (t, e) {
          e = e || "only";
          let i = document.createElement("div");
          i.classList.add(t + "-" + e + "-show"),
            (i.style.position = "absolute"),
            (i.style.left = "-9999px"),
            (i.style.top = "-9999px"),
            (i.style.width = "1px"),
            (i.style.height = "1px"),
            document.body.appendChild(i);
          let n = null !== el.offsetParent;
          return document.body.removeChild(i), n;
        };
      },
      1434: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(4705),
          s = i(5974);
        class o {
          constructor(t) {
            (0, n.A)(this, "container", void 0),
              (0, n.A)(this, "element", void 0),
              (0, n.A)(this, "classes", []),
              (0, n.A)(this, "originalString", void 0),
              (0, n.A)(this, "storeString", void 0),
              (0, n.A)(this, "storeStringInner", void 0),
              (0, n.A)(this, "words", []),
              (0, n.A)(this, "line", void 0),
              (this.element = t),
              (this.container = this.element.parentElement),
              (this.classes = this.element.classList),
              (this.originalString = this.element.innerHTML.trim()),
              this.container.classList.add("_text-wrap-creator-container"),
              (this.words = this.originalString.split(" ")),
              (this.line = ""),
              this.initStoreString(),
              this.create(),
              this.eventListeners();
          }
          initStoreString() {
            (this.storeString = document.createElement("span")),
              (this.storeStringInner = document.createElement("span")),
              this.classes.forEach((t) => this.storeString.classList.add(t)),
              (this.storeString.style.opacity = "0"),
              (this.storeString.style.position = "absolute"),
              (this.storeString.style.visibility = "hidden"),
              this.storeString.append(this.storeStringInner),
              this.container.append(this.storeString);
          }
          create() {
            let t = !1;
            for (let e = 0; e < this.words.length; e++) {
              let i = this.line + this.words[e] + " ";
              if (
                ((this.storeStringInner.innerHTML = i),
                (t = e === this.words.length - 1),
                this.storeStringInner.offsetWidth > this.storeString.offsetWidth && e > 0)
              ) {
                let n = i.lastIndexOf(this.words[e]);
                (i = i.substring(0, n)),
                  this.createNewElement(i),
                  (this.line = this.words[e] + " "),
                  t && this.createNewElement(this.line);
              } else t ? this.createNewElement(i) : (this.line = i);
            }
            (this.line = ""), this.element.remove();
          }
          createNewElement(t) {
            const e = document.createElement("span"),
              i = document.createElement("span");
            e.append(i),
              this.classes.forEach((t) => e.classList.add(t)),
              this.element.dataset.textInnerClass && (i.className = this.element.dataset.textInnerClass),
              (i.style.display = "block"),
              (i.innerHTML = t),
              this.container.append(e);
          }
          removeAllElements() {
            for (; this.container.lastChild !== this.storeString; )
              this.container.removeChild(this.container.lastChild);
          }
          eventListeners() {
            window.addEventListener("resize", () => {
              this.removeAllElements(), this.create();
            });
          }
        }
        function a() {
          (async function () {
            await document.fonts.ready;
          })().then((t) =>
            document.querySelectorAll('[data-text-wrap]:not([data-initialized="true"])').forEach((t) => {
              (t.dataset.initialized = "true"), new o(t);
            })
          );
        }
        (0, s.P)(() => a()), (0, s.d)(() => a());
      },
      8771: function () {
        function t() {
          const t = 0.01 * window.innerHeight;
          document.documentElement.style.setProperty("--vh", `${t}px`);
          const e = new Event("VhVarUpdate");
          document.dispatchEvent(e);
        }
        function e() {
          const t = document.documentElement.clientWidth / 100;
          document.documentElement.style.setProperty("--vw", `${t}px`);
          const e = new Event("VwVarUpdate");
          document.dispatchEvent(e);
        }
        document.addEventListener("DOMContentLoaded", t),
          window.addEventListener("resize", t),
          document.addEventListener("DOMContentLoaded", e),
          window.addEventListener("resize", e);
      },
      1759: function () {
        var t = new Image();
        (t.onload = t.onerror =
          function () {
            var { body: e } = document;
            e.classList.contains("webp") && 1 !== t.height && (e.classList.remove("webp"), e.classList.add("no-webp"));
          }),
          (t.src = "data:image/webp;base64,UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==");
      },
      2506: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(5974),
          s = i(8537);
        class o {
          constructor() {
            this.handleQueryString(), this.getTargetFromQuery(), this.target && (0, s.A)(this.target);
          }
          handleQueryString() {
            const t = window.location.search;
            console.log(t), (this.urlParams = new URLSearchParams(t));
          }
          getTargetFromQuery() {
            (this.targetId = this.urlParams.get("targetId")),
              (this.target = document.querySelector(`${this.targetId}`));
          }
        }
        (0, n.P)(() => {
          new o();
        });
      },
      8537: function (t, e, i) {
        "use strict";
        function n(t, e) {
          const i = t.offsetTop + (parseInt(e, 10) || 0);
          document.dispatchEvent(
            new CustomEvent("setScrollOffset", {
              detail: {
                offsetY: i,
              },
            })
          );
        }
        i.d(e, {
          A: function () {
            return n;
          },
        });
      },
      7943: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(5974);
        class s {
          constructor(t) {
            (this.links = t), (this.layout = document.querySelector(".layout")), this.bind();
          }
          bind() {
            this.links.forEach((t) => {
              t.addEventListener("click", (e) => {
                e.preventDefault(),
                  this.layout.classList.add("_animation-out"),
                  setTimeout(() => {
                    window.location = t.getAttribute("href");
                  }, 300);
              });
            });
          }
        }
        (0, n.P)(() => {
          const t = Array.from(document.querySelectorAll("a")).filter((t) =>
            ((t) => {
              const e = t.getAttribute("href"),
                i = /^#/g.test(e),
                n = t.hasAttribute("data-modal"),
                s = /^\//g.test(e),
                o = /^(ftp|http|https):\/\/[^ "]+$/g.test(e),
                a = t.hasAttribute("data-fslightbox"),
                r = t.hasAttribute("target");
              if ((s || o) && !n && !i && !a && !r) return t;
            })(t)
          );
          t && new s(t);
        });
      },
      3003: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(5974);
        function s() {
          document.querySelectorAll("[data-custom-text-area] textarea").forEach((t) => {
            const e = t.closest("[data-custom-text-area]");
            e.dataset.initialized ||
              ((e.dataset.initialized = "true"),
              (t.rows = 1),
              t.addEventListener("keyup", () => {
                t.value ? e.classList.add("_filled") : e.classList.remove("_filled");
              }),
              (t.style.height = `${t.scrollHeight}px`),
              (t.style.overflowY = "hidden"),
              t.addEventListener("input", () => {
                (t.style.height = "auto"), (t.style.height = `${t.scrollHeight}px`);
              }));
          });
        }
        (0, n.P)(() => s()), (0, n.d)(() => s());
      },
      9456: function () {
        function t() {
          document.querySelectorAll("[data-floating-field] input, [data-floating-field] textarea").forEach((t) => {
            const e = t.closest("[data-floating-field]");
            e.dataset.initialized ||
              ((e.dataset.initialized = "true"),
              t.addEventListener("keyup", () => {
                t.value ? e.classList.add("_filled") : e.classList.remove("_filled");
              }));
          });
        }
        document.addEventListener("DOMContentLoaded", t), document.addEventListener("DOMContentMutated", t);
      },
      7148: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(8514),
          s = i(2505),
          o = i.n(s);
        const a = () => {
          document.querySelectorAll("[data-phone-field]:not([data-initialized])").forEach((t) => {
            (t.dataset.initialized = "true"),
              (0, n.Ay)(t, {
                mask: "+{7} (000) 000-00-00",
                prepare: function (t) {
                  return this._value || "8" !== t ? t : "7";
                },
              }).on("complete", () => {
                t.dataset.leadUrl &&
                  o().post(t.dataset.leadUrl, {
                    phone: t.value,
                  });
              });
          });
        };
        document.addEventListener("DOMContentLoaded", a), document.addEventListener("DOMContentMutated", a);
      },
      1215: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(7989);
        const s = {
          sprites: [
            {
              name: "car",
              url: "/static/video/game/game.gif",
            },
            {
              name: "broken-car",
              url: "/static/video/game/end-game.gif",
            },
            {
              name: "wheel-front",
              url: "/static/video/game/wheel.png",
            },
            {
              name: "wheel-rear",
              url: "/static/video/game/wheel.png",
            },
          ],
          words: [
            {
              name: "word1",
              url: "/static/video/game/word1.png",
            },
            {
              name: "word2",
              url: "/static/video/game/word2.png",
            },
            {
              name: "word3",
              url: "/static/video/game/word3.png",
            },
          ],
        };
        var o = i(9204);
        function a(t, e, i) {
          for (const n in i[e]) {
            const s = i[e][n];
            if (s.name === t) return s;
          }
          return {};
        }
        const r = (
          t,
          e = {
            x: 0,
            y: 0,
          },
          i = {
            x: 0.5,
            y: 0.5,
          }
        ) => {
          const s = new n.kxk(n.gPd.from(t));
          return s.position.copyFrom(e), s.anchor.copyFrom(i), s;
        };
        class c {
          constructor() {
            (this._view = new n.mcf()),
              (this._carContainer = new n.mcf()),
              (this._gifContainer = new n.mcf()),
              (this._wheelContainer = new n.mcf()),
              this._view.addChild(this._carContainer),
              this._view.addChild(this._gifContainer),
              this._view.addChild(this._wheelContainer),
              (this._car = r(
                a("car", "sprites", s).url,
                {
                  x: 0,
                  y: -32,
                },
                {
                  x: 0.5,
                  y: 1,
                }
              )),
              (this._car._height = 112),
              (this._car._width = 255),
              (this._brokenCar = r(
                a("broken-car", "sprites", s).url,
                {
                  x: 0,
                  y: -32,
                },
                {
                  x: 0.5,
                  y: 1,
                }
              )),
              (this._brokenCar._height = 112),
              (this._brokenCar._width = 255),
              (this._mask = new n.A1g()),
              this._mask.beginFill(16711680),
              this._mask.drawRoundedRect(-127, -144, 255, 112, 100),
              this._mask.endFill(),
              (this._car.mask = this._mask),
              (this._brokenCar.mask = this._mask),
              this._carContainer.addChild(this._car, this._mask),
              (this._wheelFront = r(
                a("wheel-front", "sprites", s).url,
                {
                  x: 65,
                  y: 0,
                },
                {
                  x: 0.5,
                  y: 0.5,
                }
              )),
              (this._wheelFront._height = 45),
              (this._wheelFront._width = 45),
              (this._wheelFront.rotation = 0.2),
              (this._wheelRear = r(
                a("wheel-rear", "sprites", s).url,
                {
                  x: -65,
                  y: 0,
                },
                {
                  x: 0.5,
                  y: 0.5,
                }
              )),
              (this._wheelRear._height = 45),
              (this._wheelRear._width = 45),
              this._wheelContainer.addChild(this._wheelFront, this._wheelRear),
              this.addCarGif("car"),
              this.addCarGif("broken-car");
          }
          get view() {
            return this._view;
          }
          get wheelContainer() {
            return this._wheelContainer;
          }
          addCarGif(t) {
            const e = new n.mcf();
            fetch(a(t, "sprites", s).url)
              .then((t) => t.arrayBuffer())
              .then(o.e.fromBuffer)
              .then((t) => {
                t.position.set(-128, -144), (t.height = 112), (t.width = 255);
                const i = new n.A1g();
                i.beginFill(16711680),
                  i.drawRoundedRect(-127, -144, 255, 112, 100),
                  i.endFill(),
                  (t.mask = i),
                  e.addChild(t, i);
              }),
              this._gifContainer.addChild(e);
          }
          wheelsStart() {
            (this._wheelFront.rotation += 0.1), (this._wheelRear.rotation += 0.1);
          }
          wheelsStop() {
            (this._wheelFront.rotation = 0), (this._wheelRear.rotation = 0);
          }
          brokenCar() {
            this._carContainer.addChild(this._brokenCar);
          }
          removeBrokenCar() {
            this._carContainer.removeChild(this._brokenCar);
          }
          removeCarImage() {
            this._carContainer.removeChild(this._car, this._mask);
          }
          endGame() {
            (this._view.position.y -= 11), (this._view.position.x += 11), (this._view.rotation += 0.015);
          }
          carRespawning() {
            setTimeout(() => {
              this._view.alpha = 0.3;
            }, 300),
              setTimeout(() => {
                this._view.alpha = 1;
              }, 500),
              setTimeout(() => {
                this._view.alpha = 0.3;
              }, 700),
              setTimeout(() => {
                this._view.alpha = 1;
              }, 900);
          }
          darkTheme() {
            (this._filter = new n.uWs.ColorMatrixFilter()),
              (this._wheelContainer.filters = [this._filter]),
              this._filter.negative(!0);
          }
          whiteTheme() {
            this.wheelContainer.filters = [];
          }
          carLandingMoveDown() {
            this._view.children[1].position._y < 10 && (this._view.children[1].position.y += 1);
          }
          carLandingMoveUp() {
            0 !== this._view.children[1].position._y && (this._view.children[1].position.y -= 1);
          }
        }
        const l = document.querySelector("[data-game-container]");
        let d = 0;
        l && (d = l.parentElement.clientWidth);
        const h = (
          t,
          e = {
            x: 0,
            y: 0,
          },
          i = {
            x: 0.5,
            y: 0.5,
          },
          s,
          o
        ) => {
          if (!l) return null;
          const a = new n.kxk(n.gPd.from(t));
          return a.position.copyFrom(e), a.anchor.copyFrom(i), (a.height = s), (a.width = o), a;
        };
        class u {
          spriteByIndex(t) {
            if (!l) return null;
            switch (t) {
              case 0:
              default:
                return (
                  (this._block1 = h(
                    a("word1", "words", s).url,
                    {
                      x: d,
                      y: 0,
                    },
                    {
                      x: 0.5,
                      y: 0.5,
                    },
                    43,
                    87
                  )),
                  this._block1
                );
              case 1:
                return (
                  (this._block2 = h(
                    a("word2", "words", s).url,
                    {
                      x: d,
                      y: 0,
                    },
                    {
                      x: 0.5,
                      y: 0.5,
                    },
                    43,
                    97
                  )),
                  this._block2
                );
              case 2:
                return (
                  (this._block3 = h(
                    a("word3", "words", s).url,
                    {
                      x: d,
                      y: 0,
                    },
                    {
                      x: 0.5,
                      y: 0.5,
                    },
                    43,
                    106
                  )),
                  this._block3
                );
            }
          }
        }
        const m = document.querySelector("[data-game-container]");
        if (m) {
          const f = document.querySelector("[data-game-start]"),
            p = document.querySelector("[data-game-time-block]"),
            g = document.querySelectorAll("[data-game-time-value]"),
            v = document.querySelector("[data-hide-title]"),
            w = document.querySelector("[data-hide-button]"),
            y = document.querySelector("[data-game-over]"),
            L = document.querySelector("[data-game-restart]"),
            b = document.querySelector("[data-game-task-count]"),
            E = document.querySelector("[data-game-fix-count]"),
            S = document.querySelector("[data-game-deadline-count]"),
            C = document.querySelector("[data-game-line]"),
            k = document.querySelector("[data-switch-button]"),
            _ = m.parentElement.clientWidth,
            x = m.parentElement.clientHeight,
            T = window.screen.width,
            q = 22.5;
          let A = 0;
          T > 1024 && T < 1441 && (A = (70 / 1440) * T),
            T > 1440 && T < 1921 && (A = 70),
            T > 1920 && (A = (70 / 1920) * T);
          const O = new n.lgM({
            width: _,
            height: x,
            backgroundAlpha: 0,
            view: m,
          });
          let M = 0,
            H = 0,
            R = 0,
            D = !1,
            F = !1,
            I = 0,
            P = 0,
            j = 0,
            z = 0,
            B = 0;
          const $ = new c();
          ($.view.children[1].children[0].visible = !1), ($.view.children[1].children[1].visible = !1);
          const G = {};
          let N = !1,
            Y = !1;
          const W = new u(),
            U = [];
          let V = !1;
          const X = "y",
            K = -1,
            Q = 0.8,
            J = $.view[X];
          let Z = 15;
          function tt() {
            $.carLandingMoveDown();
          }
          function et() {
            $.carLandingMoveUp();
          }
          const it = (t) => {
            if (V) return;
            V = !0;
            let e = 0;
            const i = (s) => {
              const o = (-Q / 2) * Math.pow(e, 2) + t * e;
              if (o < 0)
                return (
                  (V = !1),
                  n.RvI.shared.remove(i),
                  ($.view[X] = J),
                  O.ticker.add(tt),
                  setTimeout(() => {
                    O.ticker.remove(tt), O.ticker.add(et);
                  }, 200),
                  void setTimeout(() => {
                    O.ticker.remove(et);
                  }, 400)
                );
              ($.view[X] = J + o * K), (e += s);
            };
            n.RvI.shared.add(i);
          };
          function nt(t) {
            const e = Math.floor(3 * Math.random()),
              i = W.spriteByIndex(e),
              s = new n.uWs.ColorMatrixFilter();
            switch ((s.negative(!0), (i.speed = t), N && (i.filters = [s]), O.stage.addChild(i), e)) {
              case 0:
                b.innerHTML = ++M;
                break;
              case 1:
                E.innerHTML = ++H;
                break;
              case 2:
                S.innerHTML = ++R;
            }
            return i;
          }
          function st() {
            (O.stage.angle = 0), O.stage.position.set(315, x - q), (O.stage.transform.scale.x = 1);
          }
          function ot(t) {
            switch (t) {
              case 0:
                st(),
                  (O.stage.angle = 180),
                  (O.stage.y = q + A),
                  (O.stage.transform.scale.x = -1),
                  C.classList.contains("_rotated") || C.classList.add("_rotated");
                break;
              case 1:
                st(),
                  (O.stage.angle = 180),
                  (O.stage.y = q + A),
                  (O.stage.transform.scale.x = 1),
                  (O.stage.x = _ - 315),
                  C.classList.contains("_rotated") || C.classList.add("_rotated");
                break;
              case 2:
                st(),
                  (O.stage.transform.scale.x = -1),
                  (O.stage.x = _ - 315),
                  C.classList.contains("_rotated") && C.classList.remove("_rotated");
                break;
              case 3:
                st(), C.classList.contains("_rotated") && C.classList.remove("_rotated");
            }
            Y = !0;
          }
          function at(t) {
            for (let e = 0; e < t.length; e++) O.stage.removeChild(t[e]);
            t.length = 0;
          }
          function rt(t) {
            for (let e = 0; e < t.length; e++) t[e].dead && (O.stage.removeChild(t[e]), t.splice(e, 1));
          }
          function ct() {
            for (let t = 0; t < U.length; t++)
              (U[t].position.x -= U[t].speed), U[t].position.x < -315 && (U[t].dead = !0);
            rt(U);
          }
          function lt(t, e) {
            const i = t.getBounds(),
              n = e.getBounds();
            return i.x + i.width > n.x && i.x < n.x + n.width && i.y + i.height > n.y && i.y < n.y + n.height;
          }
          function dt(t) {
            G[38] && ((G[t.keyCode] = !1), it(Z), (Z = 15));
          }
          function ht(t) {
            if (((G[t.keyCode] = !0), G[38])) {
              const t = 25;
              Z < t ? Z++ : (Z = t);
            }
          }
          function ut(t) {
            (G[t.keyCode] = !0), G[38] && Lt();
          }
          function mt(t) {
            (G[t.keyCode] = !1), window.removeEventListener("keydown", ut);
          }
          function ft() {
            $.removeBrokenCar(),
              D ||
                setTimeout(() => {
                  $.carRespawning();
                }, 500),
              Lt();
          }
          function pt(t) {
            (G[t.keyCode] = !0), G[38] && ((G[t.keyCode] = !1), ft());
          }
          function gt() {
            L.click && ft();
          }
          function vt() {
            ct();
            for (let t = 0; t < U.length; t++)
              if (lt($.wheelContainer, U[t])) {
                !1 !== D &&
                  ((D = !1),
                  rt(U),
                  ($.view.children[1].children[0].visible = !1),
                  ($.view.children[1].children[1].visible = !0),
                  O.ticker.remove(vt),
                  O.ticker.add(wt),
                  O.ticker.remove(yt),
                  v.classList.contains("_game-over") || v.classList.add("_game-over"),
                  L.addEventListener("click", gt),
                  window.removeEventListener("keydown", ht),
                  window.removeEventListener("keyup", dt),
                  setTimeout(() => {
                    window.addEventListener("keydown", pt), window.addEventListener("keyup", mt);
                  }, 500),
                  p.classList.contains("_visible") && p.classList.remove("_visible"),
                  y.classList.contains("_visible") || y.classList.add("_visible"));
                break;
              }
          }
          function wt() {
            $.endGame();
          }
          function yt() {
            $.wheelsStart();
          }
          function Lt() {
            var t, e;
            !0 !== D &&
              ((D = !0),
              (I = 0),
              (H = 0),
              (M = 0),
              (R = 0),
              (z = 80),
              (B = 120),
              (b.innerHTML = H),
              (E.innerHTML = M),
              (S.innerHTML = R),
              $.view.position.set(0, 0),
              ($.view.rotation = 0),
              ($.view.children[1].children[0].visible = !0),
              ($.view.children[1].children[1].visible = !1),
              Y && (st(), (Y = !1)),
              setTimeout(() => {
                $.removeCarImage();
              }, 500),
              (P = new Date().getTime()),
              new Date(),
              F ||
                ((t = 200),
                (e = 200),
                (B = 120),
                (z = 80),
                n.RvI.shared.add((i) => {
                  var n;
                  (e += i),
                    D &&
                      ((I = new Date().getTime() - P),
                      (j = Math.floor(I / 1e3)),
                      g.forEach((t) => {
                        t.innerHTML = (1e5 + I).toString().slice(1);
                      }),
                      j > 32 && ot(1),
                      j > 65 && ot(2),
                      j > 98 && ot(0),
                      j > 131 && ot(3)),
                    e > t &&
                      D &&
                      ((n = nt(10 + j / 2)),
                      D && U.push(n),
                      (e = 0),
                      D && (z > 45 && (z = 80 - j), B > 70 && (B = 120 - j)),
                      (t = z + Math.floor(Math.random() * B)));
                }),
                (F = !0)),
              U.length > 0 && at(U),
              O.ticker.add(vt),
              O.ticker.remove(wt),
              O.ticker.add(yt),
              window.removeEventListener("keydown", ut),
              window.removeEventListener("keyup", mt),
              setTimeout(() => {
                window.addEventListener("keydown", ht), window.addEventListener("keyup", dt);
              }, 100),
              O.ticker.add((t) => {
                D
                  ? ((I += t),
                    setTimeout(() => {
                      $.removeCarImage();
                    }, 500))
                  : $.wheelsStop();
              }),
              C.classList.contains("_rotated") && C.classList.remove("_rotated"),
              f.classList.contains("_hidden") || f.classList.add("_hidden"),
              w.classList.contains("_hidden") || w.classList.add("_hidden"),
              p.classList.contains("_visible") || p.classList.add("_visible"),
              v.classList.contains("_animated") || v.classList.add("_animated"),
              y.classList.contains("_visible") && y.classList.remove("_visible"));
          }
          O.ticker.add(() => {
            k.classList.contains("_light") ? ($.darkTheme(), (N = !0)) : $.whiteTheme();
          }),
            window.addEventListener("keyup", mt),
            window.addEventListener("keydown", ut),
            O.stage.addChild($.view),
            O.stage.position.set(315, x - q),
            (window.CAR = $);
        }
      },
      9360: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(2543),
          s = i(5974);
        class o {
          constructor(t) {
            (this.header = t),
              (this.headerContainer = this.header.querySelector("[data-header-container]")),
              (this.hamburger = this.header.querySelector("[data-header-hamburger]")),
              (this.menu = this.header.querySelector("[data-header-drop-menu]")),
              (this.footer = document.querySelector("[data-footer]")),
              (this.footerTop = void 0),
              (this.lastScrollTop = 0),
              (this.currentScrollTop = 0),
              (this.headerHeight = this.header.offsetHeight),
              this.init(),
              this.eventListeners(),
              this.update();
          }
          init() {
            this.bindHamburger();
          }
          eventListeners() {
            const t = this;
            document.addEventListener("scrolling", (e) => {
              t.currentScrollTop = e.detail.offsetY;
            }),
              window.addEventListener("resize", () => t.onResize());
          }
          update() {
            this.currentScrollTop > this.header.offsetHeight
              ? (this.header.classList.add("_sticky"),
                this.currentScrollTop < this.lastScrollTop
                  ? this.header.classList.add("_scroll-up")
                  : this.currentScrollTop > this.lastScrollTop && this.header.classList.remove("_scroll-up"))
              : (this.header.classList.remove("_sticky"), this.header.classList.remove("_scroll-up")),
              this.updateLastScrollTopPosition(),
              this.updateFooterPosition(),
              this.translateHeaderByFooter(),
              window.requestAnimationFrame(this.update.bind(this));
          }
          bindHamburger() {
            const t = this;
            this.hamburger.addEventListener(
              "click",
              (0, n.throttle)((e) => {
                e.preventDefault(), t.hamburger.classList.contains("_open") ? t.closeMenu() : t.openMenu();
              }, 1e3)
            );
          }
          onResize() {
            this.headerHeight = this.header.getBoundingClientRect().height;
          }
          updateLastScrollTopPosition() {
            this.lastScrollTop = this.currentScrollTop;
          }
          updateFooterPosition() {
            this.footer && (this.footerTop = this.footer.getBoundingClientRect().top);
          }
          translateHeaderByFooter() {
            const t = this.headerHeight - this.footerTop;
            t > 0
              ? (this.headerContainer.style.transform = `translate3d(0, -${t}px, 0)`)
              : this.translateHeaderContainerToDefault();
          }
          translateHeaderContainerToDefault() {
            0 !== this.headerContainer.getBoundingClientRect().top && (this.headerContainer.style.transform = "");
          }
          openMenu() {
            this.addClassOpen(this.hamburger),
              this.addClassOpen(this.menu),
              (document.body.style.overflow = "hidden"),
              (document.body.style.height = "100%");
          }
          closeMenu() {
            this.removeClassOpen(this.hamburger),
              this.removeClassOpen(this.menu),
              (document.body.style.overflow = ""),
              (document.body.style.height = ""),
              setTimeout(() => {
                this.menu.scrollTop = 0;
              }, 800);
          }
          addClassOpen(t) {
            t.classList.contains("_close") || t.classList.add("_open");
          }
          removeClassOpen(t) {
            t.classList.remove("_open"),
              t.classList.contains("_open") || this.addClassClose(t),
              t.classList.contains("_close") &&
                setTimeout(() => {
                  this.removeClassClose(t);
                }, 800);
          }
          addClassClose(t) {
            t.classList.add("_close");
          }
          removeClassClose(t) {
            t.classList.remove("_close");
          }
        }
        (0, s.P)(() => {
          const t = document.querySelector("[data-header]");
          t && new o(t);
        });
      },
      2794: function () {
        class t {
          constructor(t) {
            (this.container = t),
              (this.list = this.container.querySelector("[data-hovered-list]")),
              (this.inAnimationTime = parseInt(this.list.dataset.inAnimationTime, 10) ?? 0),
              (this.outAnimationTime = parseInt(this.list.dataset.outAnimationTime, 10) ?? 0),
              (this.items = this.container.querySelectorAll("[data-hovered-item]")),
              this.eventListeners();
          }
          eventListeners() {
            this.list.addEventListener("mouseleave", () => {
              this.items.forEach((t) => {
                t.classList.remove("_hovered"),
                  t.classList.remove("_anim-in-playing"),
                  t.classList.remove("_anim-out-playing");
              });
            }),
              this.items.forEach((t) => {
                t.addEventListener("mouseenter", () => {
                  t.classList.add("_hovered"),
                    t.classList.remove("_anim-out-playing"),
                    t.classList.add("_anim-in-playing"),
                    (this.inStartTime = new Date()),
                    setTimeout(() => {
                      t.classList.remove("_anim-in-playing");
                    }, this.inAnimationTime);
                }),
                  t.addEventListener("mouseleave", () => {
                    t.classList.remove("_hovered"),
                      t.classList.contains("_anim-in-playing")
                        ? ((this.elapsed = new Date() - this.inStartTime),
                          setTimeout(() => {
                            t.classList.add("_anim-out-playing"),
                              setTimeout(() => {
                                t.classList.remove("_anim-out-playing");
                              }, this.outAnimationTime);
                          }, this.inAnimationTime - this.elapsed))
                        : (t.classList.add("_anim-out-playing"),
                          setTimeout(() => {
                            t.classList.remove("_anim-out-playing");
                          }, this.outAnimationTime));
                  });
              });
          }
        }
        document.addEventListener("DOMContentLoaded", () => {
          document.querySelectorAll("[data-hovered-container]").forEach((e) => {
            new t(e);
          });
        });
      },
      7583: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(5974),
          s = class {
            constructor(t) {
              (this.container = t),
                (this.element = this.container.querySelector("[data-footer-parallax-object]")),
                (this.root = document.documentElement),
                window.innerWidth > 1024 ? (this.startOffset = -60) : (this.startOffset = 0),
                (this.offset = this.startOffset),
                (this.ratio = 0),
                this.setHeight(),
                this.eventListeners(),
                this.update();
            }
            setHeight() {
              (this.height = this.container.getBoundingClientRect().height),
                this.root.style.setProperty("--footer-height", `${this.height}px`);
            }
            computedRatio() {
              const t = this.container.getBoundingClientRect(),
                { top: e } = t,
                i = e + this.height;
              t.top > window.innerHeight
                ? (this.ratio = 1)
                : this.height > window.innerHeight
                ? (this.ratio = e <= 0 ? 0 : e / window.innerHeight)
                : i <= window.innerHeight
                ? (this.ratio = 0)
                : (this.ratio = (i - window.innerHeight) / this.height);
            }
            computedStyles() {
              this.offset = this.startOffset * this.ratio;
            }
            setStyles() {
              this.element.style.transform = `translate3d(0, ${this.offset}%, 0)`;
            }
            update() {
              this.computedRatio(), this.computedStyles(), this.setStyles();
            }
            eventListeners() {
              const t = this;
              window.addEventListener("resize", () => {
                t.setHeight();
              }),
                document.addEventListener("DOMContentMutated", () => {
                  t.setHeight();
                });
            }
          },
          o = class {
            constructor(t) {
              (this.element = t), (this.items = this.element.querySelectorAll("[data-text-repetition-item]"));
            }
            computedStyles() {
              const t = this.element.getBoundingClientRect(),
                e = t.top;
              e + t.height < 0 || e > window.innerHeight
                ? (this.ratio = 0)
                : (this.ratio = (window.innerHeight - e) / window.innerHeight);
            }
            setStyles() {
              const t = this;
              t.items.forEach((e, i) => {
                const n = 20 * t.ratio * (i + 1),
                  s = t.items.length + 1 - (i + 1);
                (e.style.zIndex = `${s}`), (e.style.transform = `translate3d(0, -${n}%, 0)`);
              });
            }
            update(t) {
              const e = this;
              (e.offset = t), e.computedStyles(), e.setStyles();
            }
          };
        class a {
          constructor(t) {
            (this.container = t),
              (this.element = t.querySelector("[data-sticky-block]")),
              (this.header = document.querySelector("[data-header]")),
              (this.headerHeight = this.header.offsetHeight);
          }
          computedStyles() {
            const t = this.container.getBoundingClientRect();
            t.top > this.headerHeight
              ? (this.translate = 0)
              : t.top < this.headerHeight && t.bottom - this.element.offsetHeight - this.headerHeight > 0
              ? (this.translate = -1 * t.top + this.headerHeight)
              : (this.translate = this.container.offsetHeight - this.element.offsetHeight);
          }
          setStyles() {
            this.element.style.transform = `translate3d(0, ${this.translate}px, 0)`;
          }
          update() {
            this.container.offsetHeight > this.element.offsetHeight && (this.computedStyles(), this.setStyles());
          }
        }
        var r = class {
          constructor(t) {
            (this.container = t),
              (this.element = this.container.querySelector("[data-case-main-picture-parallax-object]")),
              (this.parallaxSpeed = this.element.dataset.speed),
              (this.isMedium = window.innerWidth > 568 && window.innerWidth < 1025),
              (this.isMobile = window.innerWidth < 569),
              this.setHeight(),
              this.eventListeners(),
              this.update();
          }
          setHeight() {
            this.height = this.container.getBoundingClientRect().height;
          }
          parallaxMove() {
            const t = this.container.getBoundingClientRect().top,
              e = this.container.getBoundingClientRect().bottom,
              i = this.container.clientHeight,
              n = window.innerHeight + i,
              s = (i * this.parallaxSpeed) / 100;
            let o = 0;
            if (((this.isMedium || this.isMobile) && (o = 20), s > 0)) {
              if (e > 0 && t > 0 - i) {
                const t = s * (1 - (Math.pow(e, 1.05) + i) / n) - o;
                this.element.style.transform = `translate3d(0, ${t}px, 0)`;
              }
            } else if (e > 0 && t > 0 - i) {
              const e = s * (1 - (t + i) / n) - 10;
              this.element.style.transform = `translate3d(0, ${e}px, 0)`;
            }
          }
          update() {
            this.parallaxMove();
          }
          eventListeners() {
            const t = this;
            window.addEventListener("resize", () => {
              t.setHeight();
            }),
              document.addEventListener("DOMContentMutated", () => {
                t.setHeight();
              });
          }
        };
        class c {
          constructor() {
            (this.offsetY = 0), (this.lastOffsetY = 0), this.initObjects(), this.eventListeners(), this.update();
          }
          initObjects() {
            this.initTextRepetitions(), this.initStickyObjects(), this.initFooter(), this.initCaseMainPicture();
          }
          initTextRepetitions() {
            (this.textRepetitionItems = []),
              document.querySelectorAll("[data-text-repetition]").forEach((t) => {
                this.textRepetitionItems.push(new o(t));
              });
          }
          initStickyObjects() {
            (this.stickyObjects = []),
              document.querySelectorAll("[data-sticky-container]").forEach((t) => {
                this.stickyObjects.push(new a(t));
              });
          }
          initFooter() {
            const t = document.querySelector("[data-footer-parallax-container]");
            t && (this.footerObject = new s(t));
          }
          initCaseMainPicture() {
            (this.CaseMainPictureObjects = []),
              document.querySelectorAll("[data-case-main-picture-parallax-container]").forEach((t) => {
                this.CaseMainPictureObjects.push(new r(t));
              });
          }
          update() {
            this.lastOffsetY !== this.offsetY &&
              (this.textRepetitionItems.forEach((t) => t.update(this.offsetY)),
              this.stickyObjects.forEach((t) => t.update()),
              this.CaseMainPictureObjects.forEach((t) => t.update()),
              this.footerObject.update(),
              (this.lastOffsetY = this.offsetY)),
              window.requestAnimationFrame(this.update.bind(this));
          }
          eventListeners() {
            const t = this;
            document.addEventListener("scrolling", (e) => {
              t.offsetY = e.detail.offsetY;
            });
          }
        }
        (0, n.P)(() => {
          new c();
        });
      },
      5744: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(5974);
        class s {
          constructor(t) {
            (this.line = t),
              (this.title = this.line.querySelector("[data-scroll-item]")),
              (this.scrollTop = window.pageYOffset),
              (this.lastScrollTop = 0),
              (this.offset = 0),
              (this.ease = 0.35),
              (this.speed = 1),
              this.init(),
              this.eventListeners(),
              this.update();
          }
          init() {
            this.calculateTitles();
          }
          calculateTitles() {
            this.line.offsetWidth < window.innerWidth + this.title.offsetWidth &&
              (this.addTitleToLine(), this.calculateTitles());
          }
          addTitleToLine() {
            const t = this.title.cloneNode(!0);
            this.line.append(t);
          }
          setStyles() {
            this.line.style.transform = `translate3d(${this.offset}px, 0, 0)`;
          }
          calculateOffset() {
            (this.offset -= this.speed),
              (this.offset += this.ease * (-1 * Math.abs(this.lastScrollTop - this.scrollTop))),
              Math.abs(this.offset) >= this.title.offsetWidth && (this.offset = 0);
          }
          eventListeners() {
            document.addEventListener("scrolling", (t) => {
              this.scrollTop = t.detail.offsetY;
            }),
              window.addEventListener("resize", () => {
                this.init();
              });
          }
          update() {
            this.calculateOffset(),
              this.setStyles(),
              (this.lastScrollTop = this.scrollTop),
              window.requestAnimationFrame(this.update.bind(this));
          }
        }
        (0, n.P)(() => {
          document.querySelectorAll("[data-scroll-line]").forEach((t) => {
            new s(t);
          });
        });
      },
      3127: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(8678),
          s = i(5974);
        (0, s.P)(() => {
          document.querySelectorAll("[data-agency-slider-container]").forEach((t) => {
            if (t) {
              const e = t.querySelector("[data-agency-image-slider]");
              let i;
              t.querySelector("[data-agency-slider-counter]");
              const s = t.querySelector("[data-agency-slider-current]"),
                o = t.querySelector("[data-agency-slider-total]"),
                a = t.querySelector("[data-agency-left]"),
                r = t.querySelector("[data-agency-right]"),
                c = t.querySelector("[data-agency-slider-progress]");
              e &&
                (i = new n.RC(e, {
                  modules: [n.xI, n.Vx, n.dK, n.U1],
                  slidesPerView: "auto",
                  freeMode: !0,
                  navigation: {
                    prevEl: a,
                    nextEl: r,
                  },
                  pagination: {
                    el: c,
                    type: "progressbar",
                  },
                })),
                ((t, e, i) => {
                  const n = e,
                    s = i;
                  let o = t.activeIndex + 1,
                    a = t.snapGrid.length;
                  a <= 1
                    ? (e.closest(".slider-nav").style.display = "none")
                    : n &&
                      s &&
                      ((n.innerHTML = o < 10 ? `0${o}` : o),
                      (s.innerHTML = a < 10 ? `0${a}` : a),
                      t.on("snapIndexChange", () => {
                        (o = t.activeIndex + 1),
                          (a = t.snapGrid.length),
                          (n.innerHTML = o < 10 ? `0${o}` : o),
                          (s.innerHTML = a < 10 ? `0${a}` : a);
                      }));
                })(i, s, o);
            }
          });
        });
      },
      5869: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(8678);
        (0, i(5974).P)(() =>
          (() => {
            const t = document.querySelector("[data-article-image-slider-container]");
            if (!t) return;
            const e = t.querySelector("[data-article-image-slider]"),
              i = t.querySelector("[data-article-image-slider-left]"),
              s = t.querySelector("[data-article-image-slider-right]");
            new n.RC(e, {
              modules: [n.Vx, n.dK, n.$j],
              loop: !0,
              speed: 1500,
              preventInteractionOnTransition: !0,
              effect: "creative",
              navigation: {
                prevEl: i,
                nextEl: s,
              },
              pagination: {
                el: t.querySelector(".swiper-pagination"),
                type: "fraction",
              },
              creativeEffect: {
                prev: {
                  translate: ["-20%", 0, -1],
                },
                current: {
                  translate: [0, 0, 0],
                },
                next: {
                  translate: ["100%", 0, 1],
                },
              },
            });
          })()
        );
      },
      289: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(8678);
        (0, i(5974).P)(() => {
          const t = document.querySelector("[data-review-slider-container]");
          if (t) {
            const e = t.querySelector("[data-review-slider]"),
              i = t.querySelector("[data-review-progress-bar]"),
              s = t.querySelector("[data-review-left]"),
              o = t.querySelector("[data-review-right]"),
              a = new n.RC(e, {
                modules: [n.Vx, n.$j],
                speed: 1900,
                loop: !0,
                grabCursor: !0,
                preventInteractionOnTransition: !0,
                effect: "creative",
                creativeEffect: {
                  prev: {
                    translate: ["0%", 0, 0],
                  },
                  next: {
                    translate: ["0%", 0, 0],
                  },
                },
                navigation: {
                  prevEl: s,
                  nextEl: o,
                },
                on: {
                  init(t) {
                    setTimeout(() => {
                      const e = t.$wrapperEl[0].offsetHeight;
                      t.slides.forEach((t) => {
                        t.style.height = `${e}px`;
                      });
                    }, 2e3);
                  },
                },
              }),
              r = () => {
                a.slideNext(1900, !0), (i.style.animation = "none"), i.offsetWidth, (i.style.animation = null);
              };
            a.on("slideChange", () => {
              (i.style.animation = "none"), i.offsetWidth, (i.style.animation = null);
            }),
              i.addEventListener("animationend", r);
          }
        });
      },
      5832: function (t, e, i) {
        i(289), i(3127), i(5869);
      },
      8740: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(2528),
          s = i(5974);
        class o {
          constructor(t) {
            (this.element = t),
              (this.options = {
                damping: 0.22,
              }),
              this.init(),
              this.eventListeners();
          }
          init() {
            this.initScrollObject();
          }
          initScrollObject() {
            (this.scrollObject = n.A.init(this.element, this.options)), this.dispatchScrollingEvent();
          }
          dispatchScrollingEvent() {
            const t = this;
            this.scrollObject.addListener(() => {
              const e = new CustomEvent("scrolling", {
                detail: {
                  offsetY: t.scrollObject.offset.y,
                },
              });
              document.dispatchEvent(e);
            });
          }
          eventListeners() {
            document.addEventListener("setScrollOffset", (t) => {
              setTimeout(() => {
                this.scrollObject.scrollTo(0, t.detail.offsetY, 1e3);
              }, 1e3);
            });
          }
        }
        class a {
          constructor() {
            (this.offset = 0),
              (this.scrollY = 0),
              document.addEventListener("scroll", () => {
                this.scrollY = window.pageYOffset;
              }),
              this.update();
          }
          update() {
            (this.offset = 0.5 * this.offset + 0.5 * this.scrollY),
              document.dispatchEvent(
                new CustomEvent("scrolling", {
                  detail: {
                    offsetY: this.offset,
                  },
                })
              ),
              window.requestAnimationFrame(this.update.bind(this));
          }
        }
        (0, s.P)(() => {
          if (window.innerWidth > 1024) {
            const t = document.querySelector("[data-smooth-scroll]");
            t && new o(t);
          } else new a();
        });
      },
      912: function (t, e, i) {
        i(1354), i(1152);
      },
      8912: function (t, e, i) {
        "use strict";
        i.r(e);
        var n = i(5974),
          s = i(2505),
          o = i.n(s);
        async function a(t) {
          try {
            return o().post("/api/set_bg_id", t, {});
          } catch (t) {
            return console.log(t), !1;
          }
        }
        (0, n.P)(() =>
          (() => {
            const t = document.querySelector("[data-layout]");
            document.querySelectorAll("[data-switch-button]").forEach((e) => {
              e.addEventListener("click", async () => {
                let i;
                if (10 === parseInt(e.dataset.switchButton, 10)) {
                  i = {
                    id: 20,
                  };
                  try {
                    await a(i).then(() => {
                      (e.dataset.switchButton = "20"), e.classList.add("_light"), t.classList.add("_light");
                    });
                  } catch (t) {
                    console.log(t);
                  }
                } else if (20 === parseInt(e.dataset.switchButton, 10)) {
                  i = {
                    id: 10,
                  };
                  try {
                    await a(i).then(() => {
                      (e.dataset.switchButton = "10"), e.classList.remove("_light"), t.classList.remove("_light");
                    });
                  } catch (t) {
                    console.log(t);
                  }
                }
              });
            });
          })()
        );
      },
      5817: function (t, e, i) {
        "use strict";
        i.r(e),
          (0, i(5974).P)(() => {
            const t = document.querySelector("[data-team-block]");
            if (t) {
              const e = t.querySelectorAll("[data-autoplay-video]");
              e.forEach((t) => {
                t.pause();
              }),
                document.addEventListener("scrolling", (t) => {
                  e.forEach((t) => {
                    const { top: e } = t.getBoundingClientRect(),
                      i = 0 - t.clientHeight;
                    e < window.innerHeight && e > i
                      ? window.requestAnimationFrame(() => {
                          t.play();
                        })
                      : t.pause();
                  });
                });
            }
          });
      },
      8081: function (t, e, i) {
        "use strict";
        i.r(e);
      },
      2883: function (t, e, i) {
        "use strict";
        i.r(e);
      },
      2421: function (t, e, i) {
        "use strict";
        i.r(e);
      },
      3829: function (t, e, i) {
        "use strict";
        i.r(e);
      },
      6819: function (t, e, i) {
        "use strict";
        i.r(e);
      },
      5779: function (t, e, i) {
        t.exports = {
          id: "check-usage",
          viewBox: "0 0 16 16",
          url: i.p + "sprite-61689101322b9172a0a44b724a3b7060.svg#check",
          toString: function () {
            return this.url;
          },
        };
      },
      5457: function (t, e, i) {
        t.exports = {
          id: "question-usage",
          viewBox: "0 0 29 29",
          url: i.p + "sprite-61689101322b9172a0a44b724a3b7060.svg#question",
          toString: function () {
            return this.url;
          },
        };
      },
      3211: function (t, e, i) {
        t.exports = {
          id: "unchecked-usage",
          viewBox: "0 0 16 16",
          url: i.p + "sprite-61689101322b9172a0a44b724a3b7060.svg#unchecked",
          toString: function () {
            return this.url;
          },
        };
      },
      1152: function (t, e, i) {
        var n = {
          "./check.svg": 8081,
          "./question.svg": 2883,
          "./unchecked.svg": 2421,
        };
        function s(t) {
          var e = o(t);
          return i(e);
        }
        function o(t) {
          if (!i.o(n, t)) {
            var e = new Error("Cannot find module '" + t + "'");
            throw ((e.code = "MODULE_NOT_FOUND"), e);
          }
          return n[t];
        }
        (s.keys = function () {
          return Object.keys(n);
        }),
          (s.resolve = o),
          (t.exports = s),
          (s.id = 1152);
      },
      1354: function (t, e, i) {
        var n = {
          "./check.svg": 5779,
          "./question.svg": 5457,
          "./unchecked.svg": 3211,
        };
        function s(t) {
          var e = o(t);
          return i(e);
        }
        function o(t) {
          if (!i.o(n, t)) {
            var e = new Error("Cannot find module '" + t + "'");
            throw ((e.code = "MODULE_NOT_FOUND"), e);
          }
          return n[t];
        }
        (s.keys = function () {
          return Object.keys(n);
        }),
          (s.resolve = o),
          (t.exports = s),
          (s.id = 1354);
      },
      2634: function () {},
    },
    i = {};
  function n(t) {
    var s = i[t];
    if (void 0 !== s) return s.exports;
    var o = (i[t] = {
      id: t,
      loaded: !1,
      exports: {},
    });
    return e[t].call(o.exports, o, o.exports, n), (o.loaded = !0), o.exports;
  }
  (n.m = e),
    (t = []),
    (n.O = function (e, i, s, o) {
      if (!i) {
        var a = 1 / 0;
        for (d = 0; d < t.length; d++) {
          (i = t[d][0]), (s = t[d][1]), (o = t[d][2]);
          for (var r = !0, c = 0; c < i.length; c++)
            (!1 & o || a >= o) &&
            Object.keys(n.O).every(function (t) {
              return n.O[t](i[c]);
            })
              ? i.splice(c--, 1)
              : ((r = !1), o < a && (a = o));
          if (r) {
            t.splice(d--, 1);
            var l = s();
            void 0 !== l && (e = l);
          }
        }
        return e;
      }
      o = o || 0;
      for (var d = t.length; d > 0 && t[d - 1][2] > o; d--) t[d] = t[d - 1];
      t[d] = [i, s, o];
    }),
    (n.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t.default;
            }
          : function () {
              return t;
            };
      return (
        n.d(e, {
          a: e,
        }),
        e
      );
    }),
    (n.d = function (t, e) {
      for (var i in e)
        n.o(e, i) &&
          !n.o(t, i) &&
          Object.defineProperty(t, i, {
            enumerable: !0,
            get: e[i],
          });
    }),
    (n.g = (function () {
      if ("object" == typeof globalThis) return globalThis;
      try {
        return this || new Function("return this")();
      } catch (t) {
        if ("object" == typeof window) return window;
      }
    })()),
    (n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (n.r = function (t) {
      "undefined" != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, {
          value: "Module",
        }),
        Object.defineProperty(t, "__esModule", {
          value: !0,
        });
    }),
    (n.nmd = function (t) {
      return (t.paths = []), t.children || (t.children = []), t;
    }),
    (n.p = "/static/"),
    (function () {
      var t = {
        792: 0,
      };
      n.O.j = function (e) {
        return 0 === t[e];
      };
      var e = function (e, i) {
          var s,
            o,
            a = i[0],
            r = i[1],
            c = i[2],
            l = 0;
          if (
            a.some(function (e) {
              return 0 !== t[e];
            })
          ) {
            for (s in r) n.o(r, s) && (n.m[s] = r[s]);
            if (c) var d = c(n);
          }
          for (e && e(i); l < a.length; l++) (o = a[l]), n.o(t, o) && t[o] && t[o][0](), (t[o] = 0);
          return n.O(d);
        },
        i = (self.webpackChunkphact_default_npm = self.webpackChunkphact_default_npm || []);
      i.forEach(e.bind(null, 0)), (i.push = e.bind(null, i.push.bind(i)));
    })();
  var s = n.O(void 0, [96], function () {
    return n(7636);
  });
  s = n.O(s);
})();
//# sourceMappingURL=main-fd71c38bcbb74403c3f3.js.map
