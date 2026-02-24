// overview count elements
const totalCount = document.getElementById("all-count");
const interviewCount = document.getElementById("interview-count");
const rejectedCount = document.getElementById("rejected-count");
const totalJobs = document.getElementById("total-jobs");

// the initial active tab
let currentStatus = "all-filter-btn";

// all job list container
const jobListContainer = document.getElementById("job-container");

// filtered section
const filteredSection = document.getElementById("filtered-section");

// an array of 8 job objects
let jobsData = [
  {
    id: 1,
    companyName: "Mobile First Corp",
    position: "React Native Developer",
    location: "Remote",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description:
      "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.",
    status: "NOT APPLIED",
  },
  {
    id: 2,
    companyName: "WebFlow Agency",
    position: "Web Designer & Developer",
    location: "Los Angeles, CA",
    type: "Part-time",
    salary: "$60,000 - $120,000",
    description:
      "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.",
    status: "NOT APPLIED",
  },
  {
    id: 3,
    companyName: "DataViz Solutions",
    position: "Data Visualization Specialist",
    location: "Boston, MA",
    type: "Full-time",
    salary: "$125,000 - $185,000",
    description:
      "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong analytical thinking.",
    status: "NOT APPLIED",
  },
  {
    id: 4,
    companyName: "CloudFirst Inc",
    position: "Backend Developer",
    location: "Seattle, WA",
    type: "Full-time",
    salary: "$140,000 - $190,000",
    description:
      "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.",
    status: "NOT APPLIED",
  },
  {
    id: 5,
    companyName: "Innovation Labs",
    position: "UI/UX Engineer",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110,000 - $160,000",
    description:
      "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend development expertise required.",
    status: "NOT APPLIED",
  },
  {
    id: 6,
    companyName: "MegaCorp Solutions",
    position: "JavaScript Developer",
    location: "New York, NY",
    type: "Full-time",
    salary: "$130,000 - $170,000",
    description:
      "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation, health insurance, and professional development opportunities.",
    status: "NOT APPLIED",
  },
  {
    id: 7,
    companyName: "StartupXYZ",
    position: "Full Stack Engineer",
    location: "Remote",
    type: "Full-time",
    salary: "$120,000 - $160,000",
    description:
      "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits and equity package included.",
    status: "NOT APPLIED",
  },
  {
    id: 8,
    companyName: "TechCorp Industries",
    position: "Senior Frontend Developer",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$130,000 - $175,000",
    description:
      "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript. You will work with a talented team on cutting-edge projects.",
    status: "NOT APPLIED",
  },
];

let interviewList = [];
let rejectedList = [];

function setStatusBtnStyle(status) {
  if (status === "INTERVIEW") {
    return "bg-[#065F46] text-[#ECFDF5]";
  }
  if (status === "REJECTED") {
    return "bg-[#991B1B] text-[#FEF2F2]";
  }
  return "bg-[#EEF4FF] text-[#002C5C]";
}

function loadJobs() {
  jobListContainer.innerHTML = "";

  if (jobsData.length === 0) {
    jobListContainer.innerHTML = `<div
                    class="flex justify-center items-center bg-white border border-[#F1F2F4] rounded-lg py-24 flex-col space-y-5">
                    <img class="w-25 h-25" src="./assets/jobs.png" alt="">
                    <div class="text-center space-y-1">
                        <h2 class="text-[#002C5C] text-2xl font-semibold">No jobs available</h2>
                        <p class="font-normal text-[#64748B]">Check back soon for new job opportunities</p>
                    </div>
                </div>`;
    return;
  }

  jobsData.forEach((job) => {
    const jobElement = `<div class="space-y-5 p-6 bg-white border border-[#F1F2F4] rounded-lg">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="company-name text-lg font-semibold text-[#002C5C]">${job.companyName}</h1>
                            <p class="position text-[#64748B] text-base">${job.position}</p>
                        </div>
                        <div onclick="deleteJobs(${job.id})"
                            class="p-2.5 w-8 h-8 border flex justify-center items-center rounded-full border-[#F1F2F4] text-[#64748B] cursor-pointer hover:bg-gray-200">
                            <i class="fa-regular fa-trash-can w-4 h-4"></i>
                        </div>
                    </div>

                    <p class="text-[#64748B] text-sm"><span class="location">${job.location}</span> • <span
                            class="type">${job.type}</span> • <span class="salary">${job.salary}</span></p>

                    <div class="space-y-2">
                        <button class="status w-fit whitespace-nowrap btn ${setStatusBtnStyle(job.status)} border-none"
                            disabled>${job.status}</button>
                        <p class="description text-[#323B49] text-sm">
                            ${job.description}
                        </p>
                    </div>

                    <div class="sm:space-x-2 space-x-0 space-y-3 sm:space-y-0">
                        <button class="interview-btn w-full sm:w-fit btn btn-outline btn-success">INTERVIEW</button>
                        <button class="rejected-btn btn w-full sm:w-fit btn-outline btn-error">REJECTED</button>
                    </div>
                </div>`;
    jobListContainer.innerHTML += jobElement;
  });
}

loadJobs();

function calculateCount() {
  totalCount.innerText =
    jobsData.length === 0 ? 0 : jobListContainer.children.length;
  interviewCount.innerText = interviewList.length;
  rejectedCount.innerText = rejectedList.length;

  if (currentStatus === "rejected-filter-btn") {
    totalJobs.innerText = `${rejectedList.length} of ${jobsData.length === 0 ? 0 : jobListContainer.children.length}`;
  } else if (currentStatus === "interview-filter-btn") {
    totalJobs.innerText = `${interviewList.length} of ${jobsData.length === 0 ? 0 : jobListContainer.children.length}`;
  } else {
    totalJobs.innerText =
      jobsData.length === 0 ? 0 : jobListContainer.children.length;
  }
}

calculateCount();

const allFilterBtn = document.getElementById("all-filter-btn");
const interviewFilterBtn = document.getElementById("interview-filter-btn");
const rejectedFilterBtn = document.getElementById("rejected-filter-btn");

function toggleStyle(id) {
  // adding default tab button style
  allFilterBtn.classList.add("bg-white", "text-[#64748B]");
  interviewFilterBtn.classList.add("bg-white", "text-[#64748B]");
  rejectedFilterBtn.classList.add("bg-white", "text-[#64748B]");

  // removing active button styles for all tab buttons
  allFilterBtn.classList.remove(
    "bg-[#3B82F6]",
    "text-white",
    "btn-active",
    "border-none",
  );
  interviewFilterBtn.classList.remove(
    "bg-[#3B82F6]",
    "text-white",
    "btn-active",
    "border-none",
  );
  rejectedFilterBtn.classList.remove(
    "bg-[#3B82F6]",
    "text-white",
    "btn-active",
    "border-none",
  );

  // adding selected styles to the selected tab button
  const selected = document.getElementById(id);
  currentStatus = id;

  selected.classList.remove("bg-white", "text-[#64748B]");
  selected.classList.add(
    "bg-[#3B82F6]",
    "text-white",
    "btn-active",
    "border-none",
  );

  if (id === "interview-filter-btn") {
    jobListContainer.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderInterview();
  } else if (id === "rejected-filter-btn") {
    jobListContainer.classList.add("hidden");
    filteredSection.classList.remove("hidden");
    renderRejected();
  } else {
    jobListContainer.classList.remove("hidden");
    filteredSection.classList.add("hidden");
  }

  calculateCount();
}

jobListContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("interview-btn"))
    handleClick(e.target.parentNode.parentNode, "INTERVIEW");
  else if (e.target.classList.contains("rejected-btn"))
    handleClick(e.target.parentNode.parentNode, "REJECTED");
});

filteredSection.addEventListener("click", (e) => {
  if (e.target.classList.contains("interview-btn"))
    handleClick(e.target.parentNode.parentNode, "INTERVIEW");
  else if (e.target.classList.contains("rejected-btn"))
    handleClick(e.target.parentNode.parentNode, "REJECTED");
});

function renderInterview() {
  filteredSection.innerHTML = "";

  if (interviewList.length === 0) {
    filteredSection.innerHTML = `<div
                    class="flex justify-center items-center bg-white border border-[#F1F2F4] rounded-lg py-24 flex-col space-y-5">
                    <img class="w-25 h-25" src="./assets/jobs.png" alt="">
                    <div class="text-center space-y-1">
                        <h2 class="text-[#002C5C] text-2xl font-semibold">No jobs available</h2>
                        <p class="font-normal text-[#64748B]">Check back soon for new job opportunities</p>
                    </div>
                </div>`;
    return;
  }

  for (let interview of interviewList) {
    let interviewCard = `<div class="space-y-5 p-6 bg-white border border-[#F1F2F4] rounded-lg">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="company-name text-lg font-semibold text-[#002C5C]">${interview.companyName}</h1>
                            <p class="position text-[#64748B] text-base">${interview.position}</p>
                        </div>
                        <div onclick="deleteJobs(${interview.id})"
                            class="p-2.5 w-8 h-8 border flex justify-center items-center rounded-full border-[#F1F2F4] text-[#64748B] cursor-pointer hover:bg-gray-200">
                            <i class="fa-regular fa-trash-can w-4 h-4"></i>
                        </div>
                    </div>

                    <p class="text-[#64748B] text-sm"><span class="location">${interview.location}</span> • <span
                            class="type">${interview.type}</span> • <span class="salary">${interview.salary}</span></p>

                    <div class="space-y-2">
                        <button class="status w-fit whitespace-nowrap btn ${setStatusBtnStyle(interview.status.toUpperCase())} border-none"
                            disabled>${interview.status.toUpperCase()}</button>
                        <p class="description text-[#323B49] text-sm">
                            ${interview.description}
                        </p>
                    </div>

                    <div class="sm:space-x-2 space-x-0 space-y-3 sm:space-y-0">
                        <button class="interview-btn w-full sm:w-fit btn btn-outline btn-success">INTERVIEW</button>
                        <button class="rejected-btn btn w-full sm:w-fit btn-outline btn-error">REJECTED</button>
                    </div>
                </div>`;
    filteredSection.innerHTML += interviewCard;
  }
}

function renderRejected() {
  filteredSection.innerHTML = "";

  if (rejectedList.length === 0) {
    filteredSection.innerHTML = `<div
                    class="flex justify-center items-center bg-white border border-[#F1F2F4] rounded-lg py-24 flex-col space-y-5">
                    <img class="w-25 h-25" src="./assets/jobs.png" alt="">
                    <div class="text-center space-y-1">
                        <h2 class="text-[#002C5C] text-2xl font-semibold">No jobs available</h2>
                        <p class="font-normal text-[#64748B]">Check back soon for new job opportunities</p>
                    </div>
                </div>`;
    return;
  }

  for (let rejected of rejectedList) {
    let rejectedCard = `<div class="space-y-5 p-6 bg-white border border-[#F1F2F4] rounded-lg">
                    <div class="flex items-center justify-between">
                        <div>
                            <h1 class="company-name text-lg font-semibold text-[#002C5C]">${rejected.companyName}</h1>
                            <p class="position text-[#64748B] text-base">${rejected.position}</p>
                        </div>
                        <div onclick="deleteJobs(${rejected.id})"
                            class="p-2.5 w-8 h-8 border flex justify-center items-center rounded-full border-[#F1F2F4] text-[#64748B] cursor-pointer hover:bg-gray-200">
                            <i class="fa-regular fa-trash-can w-4 h-4"></i>
                        </div>
                    </div>

                    <p class="text-[#64748B] text-sm"><span class="location">${rejected.location}</span> • <span
                            class="type">${rejected.type}</span> • <span class="salary">${rejected.salary}</span></p>

                    <div class="space-y-2">
                        <button class="status w-fit whitespace-nowrap btn ${setStatusBtnStyle(rejected.status.toUpperCase())} border-none"
                            disabled>${rejected.status.toUpperCase()}</button>
                        <p class="description text-[#323B49] text-sm">
                            ${rejected.description}
                        </p>
                    </div>

                    <div class="sm:space-x-2 space-x-0 space-y-3 sm:space-y-0">
                        <button class="interview-btn w-full sm:w-fit btn btn-outline btn-success">INTERVIEW</button>
                        <button class="rejected-btn btn w-full sm:w-fit btn-outline btn-error">REJECTED</button>
                    </div>
                </div>`;
    filteredSection.innerHTML += rejectedCard;
  }
}

function deleteJobs(id) {
  const job = jobsData.find((item) => item.id === id);
  jobsData = jobsData.filter((item) => item.id !== id);

  if (job) {
    interviewList = interviewList.filter(
      (item) => item.companyName !== job.companyName,
    );
    rejectedList = rejectedList.filter(
      (item) => item.companyName !== job.companyName,
    );
  }

  loadJobs();
  calculateCount();

  if (currentStatus === "interview-filter-btn") {
    renderInterview();
  } else if (currentStatus === "rejected-filter-btn") {
    renderRejected();
  }
}

function handleClick(parentNode, newStatus) {
  const companyName = parentNode.querySelector(".company-name").innerText;
  const position = parentNode.querySelector(".position").innerText;
  const location = parentNode.querySelector(".location").innerText;
  const type = parentNode.querySelector(".type").innerText;
  const salary = parentNode.querySelector(".salary").innerText;
  const description = parentNode.querySelector(".description").innerText;

  const status = parentNode.querySelector(".status");
  status.innerText = newStatus;

  const jobMatch = jobsData.find((item) => item.companyName === companyName);

  if (jobMatch) {
    jobMatch.status = newStatus;
  }

  const cardInfo = {
    id: jobMatch ? jobMatch.id : null,
    companyName,
    position,
    location,
    type,
    salary,
    status: newStatus,
    description,
  };

  if (newStatus === "INTERVIEW") {
    status.classList.remove(
      "bg-[#EEF4FF]",
      "text-[#002C5C]",
      "bg-[#991B1B]",
      "text-[#FEF2F2]",
    );
    status.classList.add("bg-[#065F46]", "text-[#ECFDF5]");

    for (let card of jobListContainer.children) {
      if (card.querySelector(".company-name").innerText === companyName) {
        const cardStatusBtn = card.querySelector(".status");
        cardStatusBtn.innerText = newStatus;
        cardStatusBtn.classList.remove(
          "bg-[#EEF4FF]",
          "text-[#002C5C]",
          "bg-[#991B1B]",
          "text-[#FEF2F2]",
        );
        cardStatusBtn.classList.add("bg-[#065F46]", "text-[#ECFDF5]");
      }
    }

    if (
      !interviewList.find((item) => item.companyName === cardInfo.companyName)
    ) {
      interviewList.push(cardInfo);
    }

    rejectedList = rejectedList.filter(
      (item) => item.companyName !== cardInfo.companyName,
    );

    if (currentStatus === "rejected-filter-btn") {
      renderRejected();
    }
  } else if (newStatus === "REJECTED") {
    status.classList.remove(
      "bg-[#EEF4FF]",
      "text-[#002C5C]",
      "bg-[#065F46]",
      "text-[#ECFDF5]",
    );
    status.classList.add("bg-[#991B1B]", "text-[#FEF2F2]");

    for (let card of jobListContainer.children) {
      if (card.querySelector(".company-name").innerText === companyName) {
        const cardStatusBtn = card.querySelector(".status");
        cardStatusBtn.innerText = newStatus;
        cardStatusBtn.classList.remove(
          "bg-[#EEF4FF]",
          "text-[#002C5C]",
          "bg-[#065F46]",
          "text-[#ECFDF5]",
        );
        cardStatusBtn.classList.add("bg-[#991B1B]", "text-[#FEF2F2]");
      }
    }

    if (
      !rejectedList.find((item) => item.companyName === cardInfo.companyName)
    ) {
      rejectedList.push(cardInfo);
    }

    interviewList = interviewList.filter(
      (item) => item.companyName !== cardInfo.companyName,
    );

    if (currentStatus === "interview-filter-btn") {
      renderInterview();
    }
  }

  calculateCount();
}
