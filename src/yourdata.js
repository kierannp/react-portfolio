// Skills Icons
import jsIcon from "./images/javascript.svg"
import portfolioImage from "./images/portrait.jpg"
import pythonIcon from "./images/python-5.svg"
import cppIcon from "./images/c-logo-icon-28389.png"
import torchIcon from "./images/pytorch.svg"
import hpcIcon from "./images/hpc.svg"
import statsIcon from "./images/statistics.svg"
// Social Icon
import githubIcon from "./images/github.svg"
import linkedinIcon from "./images/linkedin.svg"
import arwinLogo from "./images/cfa18c749773c0e01b3aae98f82f1f07.png"
//Project Images
import manifold from "./images/manifold.gif"
import blobImage from "./images/image.png"
import thinImage from "./images/thin_film.gif"
import petriGif from "./images/PetriNet.gif"
import powderImage from "./images/powder_bird.png"
import patentIcon from "./images/patent.svg"
import venueJournalIcon from "./images/venue-journal.svg"
import venuePatentIcon from "./images/venue-patent.svg"
import venueNpjCompumats from "./images/venue-npj-compumats.svg"
import venueNatComputSci from "./images/venue-nat-comput-sci.svg"
import mutexaImage from "./images/mutexagpt.png"
import journalIcon from "./images/iegnn.svg"
import grouperImage from "./images/grouper.png"

export default {

  //   Header Details ---------------------
  name: "Kieran",
  headerTagline: [
    "Engineer, researcher,",
    "lifelong learner",
  ],
  //   Header Paragraph
  // Rendered one entry per line in the hero.
  headerParagraph: [
    "ML + Quant Researcher applying machine learning to financial markets.",
    "Ph.D. from Vanderbilt, NSF Graduate Research Fellow.",
  ],

  // Contact Email
  contactEmail: "nehilkieran@gmail.com",

  // CV / Resume (served from /static)
  cvLink: "/Kieran-Nehil-Puleo-CV.pdf",

  // End Header Details -----------------------
  
  // Navbar logo
  navLogo: arwinLogo,
  // Work Section ------------------------
  flagshipProjects: [
    {
      id: 9,
      title: "MutexaGPT: an intuition-to-design translator for physics-based enzyme engineering",
      shortTitle: "MutexaGPT",
      summary:
        "A multi-agent LLM platform that turns plain-English engineering intuition into physics-based simulations and concrete enzyme variant designs.",
      problem: "Physical intuition about how an enzyme's structure and dynamics shape its function has guided successful protein engineering, but there was no systematic way to translate those qualitative, abstract ideas into quantitative, actionable design principles.",
      solution: "Co-developed MutexaGPT, an open-access multi-agent large language model platform. Through a web interface it takes plain-English, intuition-driven requests, uses LLM agents to elicit the missing information, constructs physics-based models, configures and runs high-throughput molecular modeling workflows, and converts the results into actionable design proposals such as smart mutation libraries.",
      impact: "Demonstrated on two protein engineering tasks \u2014 enlarging a binding cavity and improving cold adaptation \u2014 and published in Nature Computational Science.",
      imageSrc: mutexaImage,
      venue: { logo: venueNatComputSci, name: "Nature Computational Science", logoHeight: 46 },
      links: [
        { label: "Publication", url: "https://www.nature.com/articles/s43588-026-01049-y" }
      ],
      date: "2026-09-10",
      tags: ["LLM Agents", "Protein Engineering", "Molecular Simulation"],
    },
    {
      id: 5,
      title: "Grouper: Symmetry-Aware Functional-Group Graph Representations for Generative Exploration of Chemical Space",
      shortTitle: "Grouper",
      summary:
        "A symmetry-aware graph representation that skips duplicate structures, making exhaustive design of new molecules computationally feasible.",
      problem: "Chemical space is astronomically large, and enumerating candidate molecules atom-by-atom wastes most of the effort on duplicates — structures that are symmetry-equivalent to ones already generated. That redundancy makes exhaustive, verifiable design of new molecules computationally intractable.",
      solution: "Built Grouper, a symmetry-aware hierarchical representation that describes molecules as graphs of functional groups and collapses symmetry-equivalent configurations. Paired with combinatorial and algebraic methods (including Pólya enumeration theory) and scalable parallel code, it generates and analyzes chemical spaces end-to-end while staying interoperable with simulation formats and data-driven models.",
      impact: "Cut isomorphism checks by nearly 99% versus naive enumeration near the exhaustive limit, making previously untenable strategies such as exhaustive design tractable and verifiable. Demonstrated on solubility optimization and polymer functionalization, and published as first author in npj Computational Materials.",
      imageSrc: grouperImage,
      venue: { logo: venueNpjCompumats, name: "npj Computational Materials", logoHeight: 28 },
      links: [
        { label: "Publication", url: "https://www.nature.com/articles/s41524-026-02263-y" },
        { label: "Code", url: "https://github.com/mosdef-hub/Grouper" }
      ],
      date: "2026-08-27",
      tags: ["Graph Theory", "Group Theory", "Generative Molecular Design"],
    },
    {
      id: 2,
      title: "E(n) Equivariant Graph Neural Network for Learning Interactional Properties of Heterogeneous Molecular Structures",
      shortTitle: "Equivariant GNN for Molecular Mixtures",
      summary:
        "A graph neural network that respects the symmetries of 3D space to efficiently predict properties of mixed molecular systems.",
      problem: "Predicting chemical properties from 3D molecular structures is computationally expensive. Existing models often don't respect the symmetries of the physical world, leading to inefficiencies.",
      solution: "Developed an E(n) equivariant graph neural network (IEGNN) that incorporates spatial features and respects physical symmetries (E(n) equivariance), allowing for more efficient and accurate learning from 3D molecular data.",
      impact: "The IEGNN provides a more efficient way to predict chemical properties, which can accelerate the discovery of new materials and molecules. This work was published in the Journal of Physical Chemistry B.",
      imageSrc: journalIcon,
      venue: { icon: venueJournalIcon, name: "The Journal of Physical Chemistry B" },
      links: [
        { label: "Publication", url: "https://pubs.acs.org/doi/10.1021/acs.jpcb.3c07304" }
      ],
      date: "2023-12-13",
      tags: ["Equivariant Graph Neural Networks", "Molecular Dynamics"],
    },
    {
      id: 1,
      title: "Dynamically interconnected microbioreactors and their applications",
      shortTitle: "Interconnected Microbioreactors",
      summary:
        "A system of interconnected microbioreactors that recreates the uneven conditions of industrial bioreactors in the lab, so cell lines can be optimized before scaling up.",
      problem: "Scaling up biological production from the lab to industrial scale is challenging because environmental conditions in large bioreactors are not uniform. This makes it difficult to optimize cell lines for efficient bioproduction.",
      solution: "Invented a system of dynamically interconnected microbioreactors that can simulate the heterogeneous conditions of large-scale industrial bioreactors. This allows for more realistic and effective optimization of cell lines.",
      impact: "This invention, now a patent, provides a new tool for bioprocess development, potentially leading to more efficient and scalable production of biofuels, pharmaceuticals, and other bio-based products.",
      imageSrc: patentIcon,
      venue: { icon: venuePatentIcon, name: "US Patent US20240110143A1" },
      links: [
        { label: "Patent", url: "https://patents.google.com/patent/US20240110143A1/en" }
      ],
      date: "2024-04-11",
      tags: ["Interconnection networks", "Microfluidics"],
    },
  ],
  otherProjects: [
    {
      id: 4,
      title: "Open-source Powder Dispenser",
      para: "A low-cost, open-source powder dispenser built with 3D printing and off-the-shelf components, giving precise control over the composition and mass of multi-component powder formulations.",
      imageSrc: powderImage,
      url: "https://github.com/kierannp/open-powder-form",
      date: "2021-11-15",
      tags: ["Autonomous Experimentation", "Hardware", "3D Printing"],
    },
    {
      id: 3,
      title: "Petri Net Design Studio",
      para: "This is a design studio for building and simulating petri nets",
      imageSrc: petriGif,
      url: "https://github.com/kierannp/PetriNet",
      date: "2022-05-20",
      tags: ["Petri Nets", "Design Studio", "Simulation"],
    },
    {
      id: 8,
      title: "Robust areal diffraction peak detection based on Shannon entropy",
      para: "This research project was on improving diffraction maxima identification in XRD data.",
      imageSrc: blobImage,
      url: "https://www.dropbox.com/s/ihvajhpylheg90f/EisNehTis_TMS2022.pdf?dl=1",
      date: "2022-03-02",
      tags: ["Oral Presentation", "XRD", "Computer Vision"],
    },
    {
      id: 6,
      title: "Manifold-Slider",
      para: "I trained a variational autoencoder neural network in python, then converted to tensorflow.js a python to javascript neural network converter, then built an interface and app with react.js to interact with the neural net",
      imageSrc: manifold,
      url: "https://github.com/kierannp/vae-manifold-slider",
      date: "2020-03-10",
      tags: ["VAE", "React.js", "Tensorflow.js"],
    },
    {
      id: 7,
      title: "1D Fick Solution for Solid State Diffusion Python package",
      para: "This is a Python package that I created in my free time during COVID. I saw that there was no open source python package for performing diffusion simulations with Fick's Second law of diffusion. This package could be used to model Solid state diffusion in the specified geometries.",
      imageSrc: thinImage,
      url: "https://github.com/kierannp/fick1d",
      date: "2019-12-25",
      tags: ["Diffusion", "Material Science"],
    },
  ],

  // End Work Section -----------------------

  // About Secton --------------
  aboutParaOne:
    "I am an ML + Quant Researcher at a hedge fund startup, where I apply machine learning to financial markets and engineer the software around it. I earned my PhD at Vanderbilt University in Interdisciplinary Materials Science, a multidisciplinary domain that, for me, was roughly a culmination of computer science and physical materials.",
  aboutParaTwo:
    "I value truth, hard work, and passion, and I'm motivated by making a change in the world — I became an engineer because I wanted to manifest my ideas. Outside of work, my main pursuit is jiu jitsu, where I'm a three-stripe blue belt, and I've previously competed in wrestling and Olympic weightlifting. I'm currently based in Nashville, TN.",
  aboutParaThree:
    "I hold undergraduate degrees in Materials Science Engineering and Statistics, with minors in Computational Modeling and Computer Science. I love integrating cross-disciplinary skills to build things that matter.",
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
        "My primary language, with countless projects behind it. I build machine learning models in PyTorch, research and production code, and scientific packages for molecular simulation. I also work extensively with Claude to accelerate research and engineering.",
    },
    {
      id: 2,
      img: cppIcon,
      para:
        "My go-to for performance and hardware. I've shipped several serious projects in C++, from high-performance computing to low-level systems work.",
    },
    {
      id: 3,
      img: torchIcon,
      para:
        "PyTorch is where I build. I've trained equivariant graph neural networks, variational autoencoders, and sequence models — writing custom layers, losses, and training loops rather than reaching for off-the-shelf architectures.",
    },
    {
      id: 4,
      img: statsIcon,
      para:
        "I hold an honors degree in Statistics and use it daily — time-series analysis, Bayesian and frequentist inference, experiment design, and the discipline of separating a real signal from an overfit one.",
    },
    {
      id: 5,
      img: hpcIcon,
      para:
        "High-performance computing: parallel and distributed code on GPU clusters and SLURM schedulers, profiling and optimizing hot paths, and running large simulation and training campaigns at scale.",
    },
    {
      id: 6,
      img: jsIcon,
      para:
        "Some work here, mostly for things I want non-programmers to use — like this website.",
    },
  ],

  // End Skills Section --------------------------

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

