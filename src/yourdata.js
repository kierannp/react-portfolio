// Skills Icons
import reactIcon from "./images/react.svg"
import jsIcon from "./images/javascript.svg"
import portfolioImage from "./images/portrait.jpg"
import pythonIcon from "./images/python-5.svg"
import cppIcon from "./images/c-logo-icon-28389.png"
// import tfIcon from "./images/tensorflow_logo.png"
import rIcon from "./images/Rlogo.svg"
// Social Icon
import githubIcon from "./images/github.svg"
import linkedinIcon from "./images/linkedin.svg"
import arwinLogo from "./images/cfa18c749773c0e01b3aae98f82f1f07.png"
//Project Images
import manifold from "./images/manifold.gif"
import blobImage from "./images/image.png"
import thinImage from "./images/thin_film.gif"
import nietzscheIcon from "./images/Nietzsche.jpeg"
import petriGif from "./images/PetriNet.gif"
import powderImage from "./images/powder_bird.png"

export default {

  //   Header Details ---------------------
  name: "Kieran",
  headerTagline: [
    "Building",
    "By",
    "Persevering",
  ],
  //   Header Paragraph
  headerParagraph:
    "I'm a wannabe polymath with interests in machine learning, multi-scale modeling, automation, and philosophy",

  //Contact Email
  contactEmail: "nehilkieran@gmail.com",

  // End Header Details -----------------------
  
  // Navbar logo
  navLogo: arwinLogo,
  // Work Section ------------------------
  projects: [
    {
      id: 1,
      title: "Petri Net Design Studio",
      para: "This is a design studio for building and simulating petri nets",
      imageSrc: 
        petriGif,
      url: "https://github.com/kierannp/PetriNet"
    },
    {
      id: 2,
      title: "Open-source Powder Dispenser/Hopper",
      para: "An open-source design of a powder dispenser for formulating powdery samples from multiple components",
      imageSrc: 
        powderImage,
      url: "https://github.com/kierannp/open-powder-form"
    },
    {
      id: 3, 
      title: "Nietzsche's Rebirth as Zarathustra", //Project Title - Add Your Project Title Here
      para:
        "Based off of the work of Carl Jung and his analysis of Fredrich Nietzsche, I attempt to make sense of Nietzsche's regression to psychosis", // Add Your Service Type Here
      imageSrc:
        nietzscheIcon,
      url: "https://docs.google.com/document/d/e/2PACX-1vTVDnKTHoz5322hX29S4NCm0h_yrSdAcJLDa5-1TNrvRik325IR3WbvWmC1LGnqA23Boem5ddio2ZD1/pub",
    },
    {
      id: 4,
      title: "Manifold-Slider", //Project Title - Add Your Project Title Here
      para:
        "I trained a variational autoencoder neural network in python, then converted to tensorflow.js a python to javascript neural network converter, then built an interface and app with react.js to interact with the neural net", // Add Your Service Type Here
      imageSrc:
        manifold,
      url: "https://github.com/kierannp/vae-manifold-slider",
    },
    {
      id: 5, 
      title: "1D Fick Soltion for Solid State Diffusion python package", //Project Title - Add Your Project Title Here
      para:
        "This is a Python package that I created in my free time. I saw that there was no open source python package for performing diffusion simulations with Fick's Second law of diffusion. This package could be used to model Solid state diffusion in the specified geometries.",
      imageSrc:
        thinImage,
      url: "https://github.com/kierannp/fick1d",
    },
    {
      id: 6, 
      title: "XRD Blob Identification", //Project Title - Add Your Project Title Here
      para:
        "This research project was on improving diffraction maxima identification in XRD data.", // Add Your Service Type Here
      imageSrc:
        blobImage,
      url: "https://compmatermech.wordpress.com/2022/03/03/tms-2022/",
    },
  ],

  // End Work Section -----------------------

  // About Secton --------------
  aboutParaOne:
    "I am a third year PhD student at Vanderbilt University in Interdiscipinary Material Science, a multidisciplinary domain focused on material science; for me, roughly a culmination of computer science and physical materials",
  aboutParaTwo:
    "I am a person who enjoys setting and working toward goals that challenge me grow.",
  aboutParaThree:
    "I got Undergraduate degrees in Material Science Engineering and Statistics, and minors in Computational Modeling and Computer Science. I like integrating cross-disciplinary skills to make cool stuff.",
  aboutImage:
    portfolioImage,

  //   End About Section ---------------------

  // Skills Section ---------------

  //   Import Icons from the top and link it here

  skills: [
    {
      id: 1,
      img: pythonIcon,
      para:
        "This is my primary programming language. I use this to build machine learning models, scripts and packages for molecular simulations, and much more.",
    },
    {
      id: 2,
      img: cppIcon,
      para:
        "This is my go to language for performance and hardware. I have worked on projects using this language and find it the ideal choice for applications requiring top performance.",
    },
    {
      id: 3,
      img: jsIcon,
      para:
        "This is my language for anything I want people that are non-programmers to use, such as this website.",
    },
  ],

  // End Skills Section --------------------------

  //   Promotion Section --------------------------

  promotionHeading: "Appreciation",
  promotionPara:
    "Thanks for visiting my portfolio!",
  // End Promotion Section -----------------

  //   Contact Section --------------

  contactSubHeading: "Let's create something together!",
  social: [
    // Add Or Remove The Link Accordingly
    { 
      img: githubIcon, url: "https://github.com/kierannp"
    },
    {
      img: linkedinIcon, url: "https://www.linkedin.com/in/kieran-nehil-puleo-b4a16a10b/"
    }
  ],

  // End Contact Section ---------------
}

