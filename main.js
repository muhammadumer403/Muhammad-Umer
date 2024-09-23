const nav = document.querySelector("nav");
window.scrollTo(0, 0);

const formAnimation = () => {
  const containers = document.querySelectorAll(".input-container");
  const form = document.querySelector("form");

  const tl = gsap.timeline({ defaults: { duration: 1 } });

  //Line
  const start =
    "M0 0.999512C0 0.999512 60.5 0.999512 150 0.999512C239.5 0.999512 300 0.999512 300 0.999512";
  const end =
    "M1 0.999512C1 0.999512 61.5 7.5 151 7.5C240.5 7.5 301 0.999512 301 0.999512";
  containers.forEach((container) => {
    const input = container.querySelector(".input");
    const line = container.querySelector(".elastic-line");
    const placeholder = container.querySelector(".placeholder");

    input.addEventListener("focus", () => {
      //Check to see if there is any text in the input
      if (!input.value) {
        tl.fromTo(
          line,
          { attr: { d: start } },
          { attr: { d: end }, ease: "Power2.easeOut", duration: 0.75 }
        );
        tl.to(line, { attr: { d: start }, ease: "elastic.out(3,0.5)" }, "<50%");
        //Placeholder Shift
        tl.to(
          placeholder,
          {
            top: -15,
            left: -15,
            scale: 0.7,
            duration: 0.5,
            ease: "Power2.easeOut",
          },
          "<15%"
        );
      }
    });
  });
  form.addEventListener("click", () => {
    containers.forEach((container) => {
      const input = container.querySelector(".input");
      const line = container.querySelector(".elastic-line");
      const placeholder = container.querySelector(".placeholder");

      if (document.activeElement !== input) {
        if (!input.value) {
          gsap.to(placeholder, {
            top: 0,
            left: 0,
            scale: 1,
            duration: 0.5,
            ease: "Power2.easeOut",
          });
        }
      }
      //We will do our validation
      //Name Validation
      input.addEventListener("input", (e) => {
        if (e.target.type === "text") {
          let inputText = e.target.value;
          if (inputText.length > 2) {
            colorize("#1B98E0", line, placeholder);
          } else {
            colorize("#D72638", line, placeholder);
          }
        }
        //Validate Email
        if (e.target.type === "email") {
          let valid = validateEmail(e.target.value);
          if (valid) {
            colorize("#1B98E0", line, placeholder);
          } else {
            colorize("#D72638", line, placeholder);
          }
        }
        //Validate Message

        if (e.target.tagName === "TEXTAREA") {
          let inputText = e.target.value;
          if (inputText.length > 20) {
            colorize("#1B98E0", line, placeholder);
          } else {
            colorize("#D72638", line, placeholder);
          }
        }
      });
    });
  });

  // checking email validation

  function validateEmail(email) {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  }
  function validatePhone(phone) {
    let re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    return re.test(phone);
  }

  //COLORIZE FUNCTION
  function colorize(color, line, placeholder) {
    gsap.to(line, { stroke: color, duration: 0.75 });
    gsap.to(placeholder, { color: color, duration: 0.75 });
  }
};
function loader() {
  const loader = document.querySelector("#count");

  window.addEventListener("load", () => {
    // Scroll to the top of the page

    // Initialize GSAP timeline
    var tl = gsap.timeline();

    tl.from(".counter", {
      opacity: 0,
      onStart: () => {
        var count = 0;
        var loading = setInterval(() => {
          if (count <= 100) {
            loader.innerHTML = count++;
          } else {
            clearInterval(loading);
          }
        }, 20);
      },
      onEnd: () => {
        document.body.classList.add("overflow-y-hidden");
      },
    });

    tl.to(".loading", {
      transform: "translateY(-200%)",
      delay: 2.2,
      onComplete: () => {
        document.body.classList.remove("overflow-y-hidden");
        (function () {
          const locomotiveScroll = new LocomotiveScroll();
        })();
      },
    });

    tl.from("h1", {
      transform: "translateY(100%)",
      duration: 0.3,
      stagger: 0.1,
    });
    tl.from(
      "h1 span",
      {
        opacity: 0,
        duration: 0.3,
        stagger: 0.1,
      },
      "<50%"
    );
    tl.from(
      ".nav-link",
      {
        y: 10,
        opacity: 0,
        stagger: 0.1,
        onComplete: () => {
          if(window.innerWidth >768){
            sheryJsAnimation()
          }
        },
      },
      "<50%"
    );
  });
  gsap.to("nav", {
    scrollTrigger: {
      scroller: "body",
      trigger: "nav",
      start: "top 5%",
      scrub: true,
    },
    onStart: function () {
      nav.classList.add("bg-secondary");
    },
  });
}
function aboutAnimation() {
  var clutter = "";
  var text = document.querySelector(".aboutUs p");

  text.innerHTML.split("").forEach((e) => {
    if (e == "") {
      clutter += `<span>&nbsp;</span>`;
    }
    clutter += `<span>${e}</span>`;
  }),
    (text.innerHTML = clutter),
    gsap.to(text.querySelectorAll("span"), {
      scrollTrigger: {
        trigger: text,
        start: "top 90%",
        end: "top 40%",
        scrub: 0.5,
      },
      opacity: 1,
      stagger: 0.1,
    });

  gsap.set(".aboutUs p span", {
    opacity: "0.3",
  });
}
function lighter() {
  document.querySelectorAll(".line").forEach(function (e) {
    gsap.to(e.querySelector(".line-inner"), {
      scrollTrigger: {
        trigger: e,
        start: "110% 100%",
        end: "top 30%",
        scrub: true,
      },
      height: "100%",
    });
  });
}

function mobilemenu() {
  var menubtn = document.querySelector(".menubtn");
  var flag = 0;

  menubtn.addEventListener("click", function () {
    if (flag == 0) {
      gsap.to(".mobilenav", {
        transform: "translateY(0%)",
        onComplete: function () {
          flag = 1;
          document.body.classList.add('overflow-hidden')
        },
      });
    } else {
      gsap.to(".mobilenav", {
        transform: "translateY(-100%)",
        onComplete: function () {
          flag = 0;
          document.body.classList.remove('overflow-hidden')
        },
      });
    }
  });
}
function sheryJsAnimation() {
  Shery.mouseFollower();
  Shery.makeMagnet(".magnet");
  Shery.hoverWithMediaCircle(".hover" /* Element to target.*/, {
    images: [
      "./public/images.jpeg",
      "./public/Scroll Trigger.png",
      "./public/locomotive.png",
    ],
  });
  Shery.imageEffect(".project:nth-child(3) .img img", {
    style: 5,

    config: {
      a: { value: 2.98, range: [0, 30] },
      b: { value: -0.01, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 2.8425526993031256 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: false },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.21, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.2, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.002, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });

  Shery.imageEffect(".project:nth-child(2) .img img", {
    style: 3,
    config: {
      uFrequencyX: { value: 22.14, range: [0, 100] },
      uFrequencyY: { value: 14.5, range: [0, 100] },
      uFrequencyZ: { value: 29.77, range: [0, 100] },
      geoVertex: { range: [1, 64], value: 14.47 },
      zindex: { value: 9996999, range: [-9999999, 9999999] },
      aspect: { value: 1.2187311820339344 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: false },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.4, range: [1, 5] },
      scrollType: { value: 0 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.2, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.002, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });
  Shery.imageEffect(".project:nth-child(1) .img img", {
    style: 2,
    config: {
      resolutionXY: { value: 100 },
      distortion: { value: true },
      mode: { value: -3 },
      mousemove: { value: 0 },
      modeA: { value: 1 },
      modeN: { value: 0 },
      speed: { value: -1.15, range: [-500, 500], rangep: [-10, 10] },
      frequency: { value: -23.72, range: [-800, 800], rangep: [-50, 50] },
      angle: { value: 0.5, range: [0, 3.141592653589793] },
      waveFactor: { value: 1.4, range: [-3, 3] },
      color: { value: 16114460 },
      pixelStrength: { value: 3, range: [-20, 100], rangep: [-20, 20] },
      quality: { value: 5, range: [0, 10] },
      contrast: { value: 1, range: [-25, 25] },
      brightness: { value: 1, range: [-1, 25] },
      colorExposer: { value: 0.18, range: [-5, 5] },
      strength: { value: 0.2, range: [-40, 40], rangep: [-5, 5] },
      exposer: { value: 8, range: [-100, 100] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 1.2187311820339344 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: false },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.31, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.2, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.002, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });
  Shery.imageEffect(".project:nth-child(4) .img img", {
    style: 1,

    config: {
      a: { value: 4.81, range: [0, 30] },
      b: { value: -0.3, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 1.2187311820339344 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0.21, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: false },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.21, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.2, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.002, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });
  Shery.imageEffect(".project:nth-child(5) .img img", {
    style: 5,
    config: {
      a: { value: 1.83, range: [0, 30] },
      b: { value: -0.02, range: [-1, 1] },
      zindex: { value: -9996999, range: [-9999999, 9999999] },
      aspect: { value: 1.2187311820339344 },
      ignoreShapeAspect: { value: true },
      shapePosition: { value: { x: 0, y: 0 } },
      shapeScale: { value: { x: 0.5, y: 0.5 } },
      shapeEdgeSoftness: { value: 0.06, range: [0, 0.5] },
      shapeRadius: { value: 0, range: [0, 2] },
      currentScroll: { value: 0 },
      scrollLerp: { value: 0.07 },
      gooey: { value: false },
      infiniteGooey: { value: false },
      growSize: { value: 4, range: [1, 15] },
      durationOut: { value: 1, range: [0.1, 5] },
      durationIn: { value: 1.5, range: [0.1, 5] },
      displaceAmount: { value: 0.5 },
      masker: { value: true },
      maskVal: { value: 1.21, range: [1, 5] },
      scrollType: { value: 0 },
      geoVertex: { range: [1, 64], value: 1 },
      noEffectGooey: { value: true },
      onMouse: { value: 1 },
      noise_speed: { value: 0.2, range: [0, 10] },
      metaball: { value: 0.2, range: [0, 2] },
      discard_threshold: { value: 0.5, range: [0, 1] },
      antialias_threshold: { value: 0.002, range: [0, 0.1] },
      noise_height: { value: 0.5, range: [0, 2] },
      noise_scale: { value: 10, range: [0, 100] },
    },
  });
}
loader();
lighter();
mobilemenu();
formAnimation();
aboutAnimation();


