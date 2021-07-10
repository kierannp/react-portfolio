// Skills Icons
import reactIcon from "./images/react.svg"
import jsIcon from "./images/javascript.svg"
import portfolioImage from "./images/woods_portrait.jpg"
import blobImage from "./images/image.png"
import thinImage from "./images/thin_film.gif"
import pythonIcon from "./images/python-5.svg"
import cppIcon from "./images/c-logo-icon-28389.png"
import tfIcon from "./images/tensorflow_logo.png"
import rIcon from "./images/Rlogo.svg"
import arwinLogo from "./images/cfa18c749773c0e01b3aae98f82f1f07.png"
import manifold from "./images/manifold.gif"
// Social Icon
import githubIcon from "./images/github.svg"
import linkedinIcon from "./images/linkedin.svg"

export default {

  //   Header Details ---------------------
  name: "Kieran",
  headerTagline: [
    //Line 1 For Header
    "Building things with",
    //Line 2 For Header
    "Mat Sci, ML,",
    //Line 3 For Header
    "and Persistence",
  ],
  //   Header Paragraph
  headerParagraph:
    "I'm an engineer with lots of interests and ideas",

  //Contact Email
  contactEmail: "nehilkieran@gmail.com",

  // End Header Details -----------------------
  
  // Navbar logo
  navLogo: arwinLogo,
  // Work Section ------------------------
  projects: [
    {
      id: 1, //DO NOT CHANGE THIS (Please)😅
      title: "XRD Blob Identification", //Project Title - Add Your Project Title Here
      para:
        "This research project was on improving diffraction maxima identification in XRD data.", // Add Your Service Type Here
      imageSrc:
        blobImage,
      url: "http://chetanverma.com/",
    },
    {
      id: 2, //DO NOT CHANGE THIS (Please)😅
      title: "Fick1d solid state diffusion simulation package", //Project Title - Add Your Project Title Here
      para:
        "This is a Python package that I created in my free time. I saw that there was no open source python package for performing diffusion simulations with Fick's Second law of diffusion. This package could be used to model Solid state diffusion in the specified geometries.",
      imageSrc:
        thinImage,
      url: "https://github.com/kierannp/fick1d",
    },
    {
      id: 3, //DO NOT CHANGE THIS (Please)😅
      title: "Manifold-Slider", //Project Title - Add Your Project Title Here
      para:
        "I built this app using a model trained in python, then converted to tensorflowjs, then built the app with react.js", // Add Your Service Type Here
      imageSrc:
        manifold,
      url: "https://github.com/kierannp/vae-manifold-slider",
    },
    // {
    //   id: 4, //DO NOT CHANGE THIS (Please)😅
    //   title: "Project Four", //Project Title - Add Your Project Title Here
    //   para:
    //     "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.", // Add Your Service Type Here
    //   imageSrc:
    //     "https://images.unsplash.com/photo-1492171983775-a51717616c0d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjB8fHBhc3RlbHxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=400&q=60",
    //   url: "http://chetanverma.com/",
    // },
    /*
    If You Want To Add More Project just Copy and Paste This At The End (Update the id Respectively)
    ,{
        id: 5,
        title: 'Project Five',
        para: 'Something Amazing',
        imageSrc: "",
        url: ''
    }
    */
  ],

  // End Work Section -----------------------

  // About Secton --------------
  aboutParaOne:
    "I am pursuing degrees in Material Science Engineering and Statistics with minors in Computational Modeling and Computer Science. I really like integrating cross-disciplinary skills to make cool stuff.",
  aboutParaTwo:
    "I am a disciplined individual who enjoys setting and working toward goals that challenge me and cultivate the understanding and forethought needed to effect progress.",
  aboutParaThree:
    "While balancing training and research, I also managed to take three graduate engineering and statistics classes, three undergraduate honors math classes, and three honors chemistry and physics classes. I began teaching myself machine learning at the start of my sophomore year of college, and because I found the topic so interesting, I decided to take a graduate course on artificial neural networks.",
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
        "This is the language I feel I am most proficient at. I have been using python for close to 4 years at this point, mostly dealing data processing and analysis.",
    },
    {
      id: 2,
      img: cppIcon,
      para:
        "With C++ I am proficient at making fast, readable code. I have worked on projects using this language and find it the ideal choice for applications requiring top performance.",
    },
    {
      id: 3,
      img: tfIcon,
      para:
        "I have worked with tensorflow for around 2 years now. I am proficient in creating neural network models, using the functional api, and basic subclassing. This framework is my choice for any deep learning problems.",
    },
    {
      id: 4,
      img: reactIcon,
      para:
        `I have some experience with this "framework" such as this website. `,
    },
    {
      id: 5,
      img: jsIcon,
      para:
        "I am proficient with this language, but want to learn more!",
    },
    {
      id: 6,
      img: rIcon,
      para:
        "I am proficient with this statistics focused language, but feel it is often inferior to python.",
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

