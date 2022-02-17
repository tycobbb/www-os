// -- constants --
/// a map of element ids
const kId = {
  Page: "page",
}

/// an enum of visit types
const kVisit = {
  None: 0,
  SameOrigin: 1,
  SamePath: 2
}

/// the os
class Os {
  // -- props --
  /// the current location
  url = null

  // -- p/el
  /// the page container
  $page = null

  // -- lifetime --
  /// create a new os
  constructor() {
    const m = this

    // set props
    m.url = document.location
    m.$page = document.getElementById(kId.Page)
  }

  // -- commands --
  /// start the os
  start() {
    const m = this

    // bind events
    const d = document
    d.addEventListener("click", m.didClick)

    const w = window
    w.addEventListener("popstate", m.didPopState)

    // run post visit events first time
    m.didFinishVisit()
  }

  /// navigate to the url
  navigate(url) {
    const m = this

    // add history entry
    history.pushState({}, "", url)

    // visit page
    m.visit(url)
  }

  /// visit the url and update the game
  async visit(url) {
    const m = this

    // run pre visit events
    m.didStartVisit()

    // update the browser url
    m.url = url

    // download the page
    const resp = await fetch(url)
    const text = await resp.text()

    // render the element
    const $el = document.createElement("html")
    $el.innerHTML = text

    // extract the page
    const $next = $el.querySelector(`#${kId.Page}`)

    // replace children of page element
    while (m.$page.firstChild) {
      m.$page.removeChild(m.$page.lastChild)
    }

    for (const child of Array.from($next.children)) {
      m.$page.appendChild(child)
    }

    // TODO: do we need this?
    // activate any inert script tags on the new page
    const scripts = m.$page.querySelectorAll("script")
    for (const inert of Array.from(scripts)) {
      // clone the inert script tag
      const script = document.createElement("script")
      script.textContent = inert.textContent
      for (const { name, value } of inert.attributes) {
        script.setAttribute(name, value)
      }

      // and replace it with the active one
      const parent = inert.parentElement
      parent.replaceChild(script, inert)
    }

    // run post visit events
    m.didFinishVisit()
  }

  // -- queries --
  /// get the visit type for a change to this url
  getVisit(url) {
    const m = this

    // default to no visit, browser nav
    let type = kVisit.None

    // if the origin matches
    if (m.url.origin === url.origin) {
      type = kVisit.SameOrigin

      // if the path matches
      if (m.url.pathname === url.pathname) {
        type = kVisit.SamePath
      }
    }

    return type
  }

  // -- events --
  /// when anything is clicked on
  didClick = (evt) => {
    const m = this

    // see if there is an enclosing link
    let $t = evt.target
    while ($t != null && $t.tagName.toLowerCase() !== "a") {
      $t = $t.parentElement
    }

    // if, we didn't find a link, ignore
    if ($t == null) {
      return
    }

    // if it has a target (like "_blank"), ignore
    if ($t.getAttribute("target")) {
      return
    }

    // grab its url (an svg link's href is an object)
    let href = $t.href
    if (typeof href === "object") {
      href = href.baseVal.toString()
    }

    // if it has no url, ignore
    if (!href) {
      return
    }

    // get the visit type
    const url = new URL(href, m.url)
    const visit = m.getVisit(url)

    // if none, ignore
    if (visit === kVisit.None) {
      return
    }

    // if some, cancel the click
    evt.preventDefault()

    // if not same path, run the visit
    if (visit != kVisit.SamePath) {
      m.navigate(url)
    }
  }

  /// when back is clicked
  didPopState = () => {
    const m = this

    // get the visit for this url
    const url = new URL(document.location.href)
    const visit = m.getVisit(url)

    // if none, do what the browser wants
    if (visit === kVisit.None) {
      return
    }

    // otherwise, visit the url
    m.visit(url)
  }

  /// when a visit starts
  didStartVisit() {
  }

  /// when a visit finishes
  didFinishVisit() {
  }
}

// -- singleton --
const os = new Os()
window.os = os

// -- bootstrap --
os.start()
