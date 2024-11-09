export const data = [
  {
    "id": "CS 1100",
    "description": "Computer Science and Its Applications",
    "preReqs": [],
    "coReqs": ["CS 1101"],
    "nupath": ["AD"]
  },
  {
    "id": "CS 1101",
    "description": "Lab for CS 1100",
    "preReqs": [],
    "coReqs": ["CS 1100"],
    "nupath": []
  },
  {
    "id": "CS 1200",
    "description": "First Year Seminar",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 1210",
    "description": "Professional Development for Khoury Co-op",
    "preReqs": ["CS 2510", "DS 2500"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 1800",
    "description": "Discrete Structures",
    "preReqs": [],
    "coReqs": ["CS 1802"],
    "nupath": ["FQ"]
  },
  {
    "id": "CS 1802",
    "description": "Seminar for CS 1800",
    "preReqs": [],
    "coReqs": ["CS 1800"],
    "nupath": []
  },
  {
    "id": "CS 1990",
    "description": "Elective",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 2500",
    "description": "Fundamentals of Computer Science 1",
    "preReqs": [],
    "coReqs": ["CS 2501"],
    "nupath": ["FQ", "CE"]
  },
  {
    "id": "CS 2501",
    "description": "Lab for CS 2500",
    "preReqs": [],
    "coReqs": ["CS 2500"],
    "nupath": []
  },
  {
    "id": "CS 2510",
    "description": "Fundamentals of Computer Science 2",
    "preReqs": ["CS 2500"],
    "coReqs": ["CS 2511"],
    "nupath": ["AD", "CE"]
  },
  {
    "id": "CS 2511",
    "description": "Lab for CS 2510",
    "preReqs": [],
    "coReqs": ["CS 2510"],
    "nupath": []
  },
  {
    "id": "CS 2800",
    "description": "Logic and Computation",
    "preReqs": ["CS 1800", "MATH 1365", "MATH 2310", "CS 2500"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 2810",
    "description": "Mathematics of Data Models",
    "preReqs": ["CS 1800", "CS 2500"],
    "coReqs": [],
    "nupath": ["AD", "CE"]
  },
  {
    "id": "CS 2963",
    "description": "Topics",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 2990",
    "description": "Elective",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 2991",
    "description": "Research in Computer Science",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 2992",
    "description": "Research",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 3000",
    "description": "Algorithms and Data",
    "preReqs": ["CS 2510", "DS 2500", "CS 1800", "EECE 2160"],
    "coReqs": ["CS 3001"],
    "nupath": ["FQ"]
  },
  {
    "id": "CS 3001",
    "description": "Recitation for CS 3000",
    "preReqs": [],
    "coReqs": ["CS 3000"],
    "nupath": []
  },
  {
    "id": "CS 3200",
    "description": "Introduction to Databases",
    "preReqs": ["CS 2500", "DS 2000", "EECE 2560"],
    "coReqs": [],
    "nupath": ["AD"]
  },
  {
    "id": "CS 3500",
    "description": "Object-Oriented Design",
    "preReqs": ["CS 2510", "EECE 2560"],
    "coReqs": ["CS 3501"],
    "nupath": ["AD", "CE"]
  },
  {
    "id": "CS 3501",
    "description": "Lab for CS 3500",
    "preReqs": [],
    "coReqs": ["CS 3500"],
    "nupath": []
  },
  {
    "id": "CS 3520",
    "description": "Programming in C++",
    "preReqs": ["CS 2510", "DS 2500"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 3540",
    "description": "Game Programming",
    "preReqs": ["CS 2500", "ARTG 2260", "ARTG 2262"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 3620",
    "description": "Building Extensible Systems",
    "preReqs": ["CS 2510", "ENGW 1111", "ENGW 1102", "ENGL 1111", "ENGL 1102"],
    "coReqs": [],
    "nupath": ["WI"]
  },
  {
    "id": "CS 3650",
    "description": "Computer Systems",
    "preReqs": ["CS 2510", "EECE 2560"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 3700",
    "description": "Networks and Distributed Systems",
    "preReqs": ["CS 2510"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 3800",
    "description": "Theory of Computation",
    "preReqs": ["CS 2510", "EECE 2160"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 3950",
    "description": "Introduction to Computer Science Research",
    "preReqs": ["CS 2500"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 3990",
    "description": "Elective",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4050",
    "description": "Artificial Intelligence and Society",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4097",
    "description": "Mixed Reality",
    "preReqs": ["CS 3540"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4100",
    "description": "Artificial Intelligence",
    "preReqs": ["CS 3500", "DS 3500"],
    "coReqs": [],
    "nupath": ["CE"]
  },
  {
    "id": "CS 4120",
    "description": "Natural Language Processing",
    "preReqs": ["CS 3500", "DS 3500"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4150",
    "description": "Game Artificial Intelligence",
    "preReqs": ["CS 3500", "CS 3520"],
    "coReqs": [],
    "nupath": ["CE"]
  },
  {
    "id": "CS 4180",
    "description": "Reinforcement Learning",
    "preReqs": [
      "CS 3000",
      "ECON 2350",
      "ENVR 2500",
      "MATH 3081",
      "PSYC 2320",
      "CS 2810",
      "MATH 2331"
    ],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4300",
    "description": "Computer Graphics",
    "preReqs": [
      "CS 2510",
      "CS 3500",
      "EECE 2560",
      "MATH 1260",
      "MATH 2331",
      "MATH 2341",
      "CS 2810"
    ],
    "coReqs": [],
    "nupath": ["CE"]
  },
  {
    "id": "CS 4360",
    "description": "Non-Interactive Computer Graphics",
    "preReqs": ["CS 2810", "MATH 2331", "CS 3500"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4400",
    "description": "Programming Languages",
    "preReqs": ["CS 3500", "CS 3000", "CS 4800"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4410",
    "description": "Compilers",
    "preReqs": ["CS 4400", "CS 5400", "CS 7400"],
    "coReqs": [],
    "nupath": ["CE"]
  },
  {
    "id": "CS 4500",
    "description": "Software Development",
    "preReqs": ["CS 3500", "ENGW 1111", "ENGW 1102"],
    "coReqs": [],
    "nupath": ["WI"]
  },
  {
    "id": "CS 4520",
    "description": "Mobile Application Development",
    "preReqs": ["CS 3500"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4530",
    "description": "Fundamentals of Software Engineering",
    "preReqs": ["CS 3500"],
    "coReqs": [],
    "nupath": ["WI"]
  },
  {
    "id": "CS 4535",
    "description": "Professional Practicum Capstone",
    "preReqs": [],
    "coReqs": [],
    "nupath": ["CE"]
  },
  {
    "id": "CS 4550",
    "description": "Web Development",
    "preReqs": ["CS 3500", "DS 3500"],
    "coReqs": [],
    "nupath": ["CE"]
  },
  {
    "id": "CS 4610",
    "description": "Robotic Science and Systems",
    "preReqs": ["CS 3500"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4700",
    "description": "Network Fundamentals",
    "preReqs": ["CS 3650", "CS 5600"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4710",
    "description": "Mobile and Wireless Systems",
    "preReqs": ["CS 3700", "CS 4730"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4730",
    "description": "Distributed Systems",
    "preReqs": ["CS 3650"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4805",
    "description": "Fundamentals of Complexity Theory",
    "preReqs": ["CS 3800"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4810",
    "description": "Advanced Algorithms",
    "preReqs": ["CS 3000"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4820",
    "description": "Computer-Aided Reasoning",
    "preReqs": ["CS 2800", "CS 3000"],
    "coReqs": [],
    "nupath": ["CE"]
  },
  {
    "id": "CS 4830",
    "description": "System Specification, Verification, and Synthesis",
    "preReqs": ["CS 3000"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4850",
    "description": "Building Game Engines",
    "preReqs": ["CS 3520", "CS 3540"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4950",
    "description": "Computer Science Research Seminar",
    "preReqs": ["CS 3950"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4955",
    "description": "Computer Science Teaching Seminar",
    "preReqs": ["CS 2500"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4970",
    "description": "Junior/Senior Honors Project 1",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4971",
    "description": "Junior/Senior Honors Project 2",
    "preReqs": ["CS 4970"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4973",
    "description": "Topics in Computer Science",
    "preReqs": ["CS 3000", "CS 3500", "DS 3500"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4990",
    "description": "Elective",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4991",
    "description": "Research",
    "preReqs": ["CS 3500", "CS 3800"],
    "coReqs": [],
    "nupath": ["CE"]
  },
  {
    "id": "CS 4992",
    "description": "Directed Study",
    "preReqs": ["CS 3500", "CS 3800"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 4998",
    "description": "Research",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5001",
    "description": "Intensive Foundations of Computer Science",
    "preReqs": [],
    "coReqs": ["CS 5003"],
    "nupath": []
  },
  {
    "id": "CS 5002",
    "description": "Discrete Structures",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5003",
    "description": "Recitation for CS 5001",
    "preReqs": [],
    "coReqs": ["CS 5001"],
    "nupath": []
  },
  {
    "id": "CS 5004",
    "description": "Object-Oriented Design",
    "preReqs": ["CS 5001", "CS 5002"],
    "coReqs": ["CS 5005"],
    "nupath": []
  },
  {
    "id": "CS 5005",
    "description": "Recitation for CS 5004",
    "preReqs": [],
    "coReqs": ["CS 5004"],
    "nupath": []
  },
  {
    "id": "CS 5007",
    "description": "Computer Systems",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5008",
    "description": "Data Structures, Algorithms, and Their Applications within Computer Systems",
    "preReqs": ["CS 5001", "CS 5002"],
    "coReqs": ["CS 5009"],
    "nupath": []
  },
  {
    "id": "CS 5009",
    "description": "Recitation for CS 5008",
    "preReqs": [],
    "coReqs": ["CS 5008"],
    "nupath": []
  },
  {
    "id": "CS 5010",
    "description": "Programming Design Paradigm",
    "preReqs": [],
    "coReqs": ["CS 5011"],
    "nupath": []
  },
  {
    "id": "CS 5011",
    "description": "Recitation for CS 5010",
    "preReqs": [],
    "coReqs": ["CS 5010"],
    "nupath": []
  },
  {
    "id": "CS 5047",
    "description": "Exploring AI Trends and Tools",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5097",
    "description": "Mixed Reality",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5100",
    "description": "Foundations of Artificial Intelligence",
    "preReqs": [],
    "coReqs": [],
    "nupath": ["CE"]
  },
  {
    "id": "CS 5150",
    "description": "Game Artificial Intelligence",
    "preReqs": [],
    "coReqs": [],
    "nupath": ["CE"]
  },
  {
    "id": "CS 5170",
    "description": "Artificial Intelligence for Human-Computer Interaction",
    "preReqs": ["CS 5100", "CS 5800", "CS 6140"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5180",
    "description": "Reinforcement Learning and Sequential Decision Making",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5200",
    "description": "Database Management Systems",
    "preReqs": [],
    "coReqs": [],
    "nupath": ["AD"]
  },
  {
    "id": "CS 5310",
    "description": "Computer Graphics",
    "preReqs": ["MATH 2331"],
    "coReqs": [],
    "nupath": ["CE"]
  },
  {
    "id": "CS 5330",
    "description": "Pattern Recognition and Computer Vision",
    "preReqs": ["MATH 2331"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5335",
    "description": "Robotic Science and Systems",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5340",
    "description": "Computer/Human Interaction",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5350",
    "description": "Applied Geometric Representation and Computation",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5360",
    "description": "Noninteractive Computer Graphics",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5400",
    "description": "Principles of Programming Language",
    "preReqs": ["CS 5010", "CS 5004"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5500",
    "description": "Foundations of Software Engineering",
    "preReqs": ["CS 5010", "CS 5004"],
    "coReqs": [],
    "nupath": ["WI"]
  },
  {
    "id": "CS 5520",
    "description": "Mobile Application Development",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5540",
    "description": "Game Programming",
    "preReqs": ["CS 5004", "CS 2500", "CS 2510", "CS 3500", "CS 5010"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5600",
    "description": "Computer Systems",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5610",
    "description": "Web Development",
    "preReqs": [],
    "coReqs": [],
    "nupath": ["CE"]
  },
  {
    "id": "CS 5700",
    "description": "Fundamentals of Computer Networking",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5800",
    "description": "Algorithms",
    "preReqs": [],
    "coReqs": [],
    "nupath": ["FQ"]
  },
  {
    "id": "CS 5850",
    "description": "Building Game Engines",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5933",
    "description": "Advanced Computer Science Topics for Teachers",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5934",
    "description": "Introduction to Inclusive Computer Science Teaching",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5963",
    "description": "Topics",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5964",
    "description": "Projects for Professionals",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5965",
    "description": "Engaging with Industry Partners for Rising Professionals",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "CS 5976",
    "description": "Directed Study",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "IS 1300",
    "description": "Knowledge in a Digital World",
    "preReqs": [],
    "coReqs": [],
    "nupath": ["ER", "CE"]
  },
  {
    "id": "IS 1500",
    "description": "Introduction to Web Development",
    "preReqs": [],
    "coReqs": [],
    "nupath": ["AD"]
  },
  {
    "id": "IS 1990",
    "description": "Elective",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "IS 2000",
    "description": "Principles of Information Science",
    "preReqs": [],
    "coReqs": [],
    "nupath": ["AD"]
  },
  {
    "id": "IS 2050",
    "description": "Information and Uncertainty",
    "preReqs": [],
    "coReqs": [],
    "nupath": ["AD", "CE"]
  },
  {
    "id": "IS 2990",
    "description": "Elective",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "IS 2991",
    "description": "Research in Information Science",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "IS 3050",
    "description": "Information and Uncertainty",
    "preReqs": [],
    "coReqs": [],
    "nupath": ["AD", "CE"]
  },
  {
    "id": "IS 3500",
    "description": "Information System Design and Development",
    "preReqs": [
      "IS 2000",
      "CS 3500",
      "ENGL 1102",
      "ENGL 1111",
      "ENGW 1102",
      "ENGW 1111",
      "ENGW 1113",
      "ENGW 1114"
    ],
    "coReqs": [],
    "nupath": ["WI"]
  },
  {
    "id": "IS 3990",
    "description": "Elective",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "IS 4200",
    "description": "Information Retrieval",
    "preReqs": [
      "CS 3500",
      "DS 3500",
      "CS 2810",
      "ECON 2350",
      "MATH 2280",
      "MATH 3081",
      "MGSC 2301",
      "PSYC 2320"
    ],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "IS 4300",
    "description": "Human Computer Interaction",
    "preReqs": ["CS 3500", "DS 3500"],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "IS 4800",
    "description": "Empirical Research Methods",
    "preReqs": [
      "CS 2810",
      "ECON 2350",
      "ENVR 2500",
      "MATH 2280",
      "MATH 3081",
      "MGSC 2301",
      "PHTH 2210",
      "PSYC 2320"
    ],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "IS 4990",
    "description": "Elective",
    "preReqs": [],
    "coReqs": [],
    "nupath": []
  },
  {
    "id": "IS 4991",
    "description": "Research",
    "preReqs": ["IS 4800", "CS 5350"],
    "coReqs": [],
    "nupath": ["CE"]
  }
]
