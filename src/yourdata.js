// Skills Icons
import reactIcon from "./images/react.svg"
import jsIcon from "./images/javascript.svg"
import portfolioImage from "./images/selfie.png"
import blobImage from "./images/image.png"
import thinImage from "./images/thin_film.gif"
import pythonIcon from "./images/python-5.svg"
import cppIcon from "./images/c-logo-icon-28389.png"
import tfIcon from "./images/tensorflow_logo.png"
import rIcon from "./images/Rlogo.svg"
import arwinLogo from "./images/cfa18c749773c0e01b3aae98f82f1f07.png"
// Social Icon
import githubIcon from "./images/github.svg"

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
      title: "Project Three", //Project Title - Add Your Project Title Here
      para:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.", // Add Your Service Type Here
      imageSrc:
        "https://images.unsplash.com/photo-1504083898675-c896ecdae86e?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjJ8fHBhc3RlbHxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=400&q=60",
      url: "http://chetanverma.com/",
    },
    {
      id: 4, //DO NOT CHANGE THIS (Please)😅
      title: "Project Four", //Project Title - Add Your Project Title Here
      para:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text.", // Add Your Service Type Here
      imageSrc:
        "https://images.unsplash.com/photo-1492171983775-a51717616c0d?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8NjB8fHBhc3RlbHxlbnwwfHwwfA%3D%3D&auto=format&fit=crop&w=400&q=60",
      url: "http://chetanverma.com/",
    },
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
    "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  aboutParaThree:
    "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
    {
      id: 2,
      img: cppIcon,
      para:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
    {
      id: 3,
      img: tfIcon,
      para:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
    {
      id: 4,
      img: reactIcon,
      para:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
    {
      id: 5,
      img: jsIcon,
      para:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
    {
      id: 6,
      img: rIcon,
      para:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    },
  ],

  // End Skills Section --------------------------

  //   Promotion Section --------------------------

  promotionHeading: "Heading",
  promotionPara:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  // End Promotion Section -----------------

  //   Contact Section --------------

  contactSubHeading: "Let's create your next experience together",
  social: [
    // Add Or Remove The Link Accordingly
    { img: githubIcon, url: "https://github.com/kierannp" },
  ],

  // End Contact Section ---------------
}

