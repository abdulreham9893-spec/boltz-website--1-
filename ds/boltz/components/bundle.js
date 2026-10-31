/* @ds-bundle: {"format":4,"namespace":"Boltz","components":[{"name":"Button"},{"name":"Badge"},{"name":"SectionLabel"},{"name":"Card"},{"name":"Input"},{"name":"Accordion"},{"name":"Icon"},{"name":"ServiceGrid"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(" "); }
  function rest(props, omit) { var o = {}; for (var k in props) if (omit.indexOf(k) < 0) o[k] = props[k]; return o; }

  var ArrowIcon = function () {
    return h("svg", { width: 14, height: 14, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" },
      h("path", { d: "M3 8h10M9 4l4 4-4 4", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round", strokeLinejoin: "round" }));
  };

  /* Button — shadcn variants + Boltz's arrow chip */
  function Button(props) {
    var variant = props.variant || "default", size = props.size || "default";
    var cls = cx("bz-btn", "bz-btn--" + variant, "bz-btn--size-" + size, props.arrow && "bz-btn--arrow", props.className);
    var children = [h("span", { key: "l", className: "bz-btn__label" }, props.children)];
    if (props.arrow) children.push(h("span", { key: "a", className: "bz-btn__chip" }, h(ArrowIcon)));
    var other = rest(props, ["variant", "size", "arrow", "className", "children", "href"]);
    if (props.href) return h("a", Object.assign({ href: props.href, className: cls }, other), children);
    return h("button", Object.assign({ type: "button", className: cls }, other), children);
  }

  function Badge(props) {
    var other = rest(props, ["variant", "className", "children"]);
    return h("span", Object.assign({ className: cx("bz-badge", "bz-badge--" + (props.variant || "default"), props.className) }, other), props.children);
  }

  function SectionLabel(props) {
    return h("div", { className: cx("bz-label", props.inverse && "bz-label--inverse", props.className) },
      props.index != null ? h("span", { className: "bz-label__index", "aria-hidden": "true" }, String(props.index)) : null,
      h("span", { className: "bz-label__text" }, props.children));
  }

  function part(tag, base) {
    return function (props) {
      var other = rest(props, ["className", "children", "as"]);
      return h(props.as || tag, Object.assign({ className: cx(base, props.className) }, other), props.children);
    };
  }
  var Card = part("div", "bz-card");
  var CardHeader = part("div", "bz-card__header");
  var CardTitle = part("h3", "bz-card__title");
  var CardDescription = part("p", "bz-card__description");
  var CardContent = part("div", "bz-card__content");
  var CardFooter = part("div", "bz-card__footer");

  function Label(props) {
    var other = rest(props, ["className", "children"]);
    return h("label", Object.assign({ className: cx("bz-label-text", props.className) }, other), props.children);
  }
  function Input(props) {
    var other = rest(props, ["className", "invalid"]);
    return h("input", Object.assign({ className: cx("bz-input", props.className), "aria-invalid": props.invalid ? "true" : undefined }, other));
  }
  function Textarea(props) {
    var other = rest(props, ["className", "invalid"]);
    return h("textarea", Object.assign({ className: cx("bz-input", "bz-textarea", props.className), "aria-invalid": props.invalid ? "true" : undefined }, other));
  }

  /* Accordion — single, collapsible; items: [{value, title, content, meta?}] */
  var uid = 0;
  function Accordion(props) {
    var idRef = React.useRef(null);
    if (idRef.current == null) idRef.current = "bz-acc-" + (++uid);
    var st = React.useState(props.defaultValue == null ? null : props.defaultValue);
    var open = st[0], setOpen = st[1];
    var size = props.size || "default";
    return h("div", { className: cx("bz-acc", "bz-acc--" + size, props.inverse && "bz-acc--inverse", props.className) },
      (props.items || []).map(function (it) {
        var isOpen = open === it.value, base = idRef.current + "-" + it.value;
        return h("div", { key: it.value, className: cx("bz-acc__item", isOpen && "is-open") },
          h("h3", { className: "bz-acc__heading" },
            h("button", {
              type: "button", className: "bz-acc__trigger", id: base + "-t", "aria-expanded": isOpen, "aria-controls": base + "-p",
              onClick: function () { setOpen(isOpen ? null : it.value); }
            },
              h("span", { className: "bz-acc__title" }, it.title),
              h("span", { className: "bz-acc__icon", "aria-hidden": "true" }))),
          h("div", { className: "bz-acc__panel", id: base + "-p", role: "region", "aria-labelledby": base + "-t" },
            h("div", { className: "bz-acc__inner" }, h("div", { className: "bz-acc__body" }, it.content))));
      }));
  }

  /* Icon — Tabler outline icons (MIT), 24px grid, 2px stroke */
  var TABLER = {
    "focus-2": '<circle cx="12" cy="12" r=".5" fill="currentColor"/><path d="M12 12m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"/><path d="M12 3l0 2"/><path d="M3 12l2 0"/><path d="M12 19l0 2"/><path d="M19 12l2 0"/>',
    "app-window": '<path d="M3 5m0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z"/><path d="M6 8h.01"/><path d="M9 8h.01"/>',
    "pyramid": '<path d="M11.105 21.788a1.994 1.994 0 0 0 1.789 0l8.092 -4.054c.538 -.27 .718 -.951 .385 -1.452l-8.54 -13.836a.999 .999 0 0 0 -1.664 0l-8.54 13.836a1.005 1.005 0 0 0 .386 1.452l8.092 4.054z"/><path d="M12 2v20"/>',
    "arrow-right": '<path d="M5 12l14 0"/><path d="M13 18l6 -6"/><path d="M13 6l6 6"/>',
    "arrow-up-right": '<path d="M17 7l-10 10"/><path d="M8 7l9 0l0 9"/>',
    "plus": '<path d="M12 5l0 14"/><path d="M5 12l14 0"/>',
    "check": '<path d="M5 12l5 5l10 -10"/>',
    "copy": '<path d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"/><path d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"/>',
    "code": '<path d="M7 8l-4 4l4 4"/><path d="M17 8l4 4l-4 4"/><path d="M14 4l-4 16"/>',
    "bolt": '<path d="M13 3l0 7l6 0l-8 11l0 -7l-6 0l8 -11"/>',
    "sparkles": '<path d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm0 -12a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2zm-7 12a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z"/>',
    "route": '<path d="M3 19a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"/><path d="M19 7a2 2 0 1 0 0 -4a2 2 0 0 0 0 4z"/><path d="M11 19h5.5a3.5 3.5 0 0 0 0 -7h-8a3.5 3.5 0 0 1 0 -7h4.5"/>',
    "player-play": '<path d="M7 4v16l13 -8z"/>',
    "browser": '<path d="M4 4m0 1a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1z"/><path d="M4 8l16 0"/><path d="M8 4l0 4"/>',
    "palette": '<path d="M12 21a9 9 0 0 1 0 -18c4.97 0 9 3.582 9 8c0 1.06 -.474 2.078 -1.318 2.828c-.844 .75 -1.989 1.172 -3.182 1.172h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25"/><path d="M8.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M12.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/><path d="M16.5 10.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"/>',
    "message-circle": '<path d="M3 20l1.3 -3.9c-2.324 -3.437 -1.426 -7.872 2.1 -10.374c3.526 -2.501 8.59 -2.296 11.845 .48c3.255 2.777 3.695 7.266 1.029 10.501c-2.666 3.235 -7.615 4.215 -11.574 2.293l-4.7 1"/>'
  };
  function Icon(props) {
    var size = props.size || 24;
    return h("svg", {
      className: cx("bz-icon", props.className), width: size, height: size, viewBox: "0 0 24 24", fill: "none",
      stroke: "currentColor", strokeWidth: props.stroke || 1.75, strokeLinecap: "round", strokeLinejoin: "round",
      "aria-hidden": props.label ? undefined : "true", role: props.label ? "img" : undefined, "aria-label": props.label,
      dangerouslySetInnerHTML: { __html: TABLER[props.name] || "" }
    });
  }
  Icon.names = Object.keys(TABLER);

  /* ServiceGrid — numbered columns with an icon badge, title, copy and tags */
  function ServiceGrid(props) {
    var items = props.items || [];
    return h("div", { className: cx("bz-services", props.className) },
      h("ol", { className: "bz-services__grid" },
        items.map(function (it, i) {
          return h("li", { key: it.title, className: "bz-services__col" },
            h("div", { className: "bz-services__top" },
              h("span", { className: "bz-services__num" }, String(i + 1).padStart(2, "0")),
              h("span", { className: "bz-services__badge bz-services__badge--" + (it.tone || "primary") }, h(Icon, { name: it.icon, size: 26 }))),
            h("h3", { className: "bz-services__title" }, it.title),
            h("p", { className: "bz-services__desc" }, it.description),
            h("ul", { className: "bz-services__tags", "aria-label": it.title + " includes" },
              (it.tags || []).map(function (t) { return h("li", { key: t, className: "bz-services__tag" }, t); })));
        }).concat(props.cta ? [h("li", { key: "__cta", className: "bz-services__col bz-services__col--cta" },
          h("div", { className: "bz-services__top" },
            h("span", { className: "bz-services__num" }, String(items.length + 1).padStart(2, "0")),
            h("span", { className: "bz-services__badge bz-services__badge--ink" }, h(Icon, { name: "message-circle", size: 26 }))),
          h("h3", { className: "bz-services__title" }, props.cta.title),
          h("p", { className: "bz-services__desc" }, props.cta.text),
          h("a", { className: "bz-services__link", href: props.cta.href || "#" }, props.cta.label, h(Icon, { name: "arrow-right", size: 18 })))] : [])),
      props.footer ? h("div", { className: "bz-services__foot" },
        h("p", null, props.footer.text),
        h("a", { className: "bz-services__link", href: props.footer.href || "#" }, props.footer.label, h(Icon, { name: "arrow-right", size: 18 }))) : null);
  }

  var api = {
    Icon: Icon, ServiceGrid: ServiceGrid,
    Button: Button, Badge: Badge, SectionLabel: SectionLabel,
    Card: Card, CardHeader: CardHeader, CardTitle: CardTitle, CardDescription: CardDescription, CardContent: CardContent, CardFooter: CardFooter,
    Input: Input, Textarea: Textarea, Label: Label, Accordion: Accordion
  };
  window.Boltz = Object.assign(window.Boltz || {}, api);
})();
