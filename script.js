// ================================
// Chapter Page Loading
// ================================

let allChapters = [];

let currentSubject = "";

if (document.getElementById("chapterTitle")) {

    const params = new URLSearchParams(window.location.search);
    const chapter = params.get("chapter");

    fetch("https://openjee-backend.onrender.com/api/chapters")
        .then(response => response.json())
        .then(data => {

            const chapterData = data[chapter];
            document.title =
chapterData.name + " | OpenJEE";

            if (!chapterData) {
                document.getElementById("chapterTitle").innerText =
                    "Chapter not found!";
                return;
            }

            // Set page title
            document.getElementById("chapterTitle").innerText =
                chapterData.name + " Resources";

            // Get resource container
            const container =
                document.getElementById("resourceContainer");

           // Create professional resource cards
chapterData.resources.forEach(resource => {

    container.innerHTML += `
        <a href="${resource.link}" 
           class="card resource-card" 
           target="_blank">

            <h3>
                📚 ${resource.title}
            </h3>

            <p>
                👨‍🏫 Teacher: ${resource.teacher}
            </p>

            <p>
                🎓 Class: ${chapterData.classLevel}
            </p>

            <p class="open-resource">
                ▶ Open Resource
            </p>

        </a>
    `;

});

        })

        .catch(error => {
            console.log("Error loading chapter:", error);
        });

}



// ================================
// Search Function (Homepage)
// ================================

async function searchChapter() {

    const input = document
        .getElementById("searchInput")
        .value
        .toLowerCase()
        .trim();


    try {

        const response =
            await fetch("https://openjee-backend.onrender.com/api/chapters");

        const data = await response.json();


        let found = false;

// Loop through all chapters
for (let key in data) {

    let chapterName =
        data[key].name.toLowerCase();

    let chapterKey =
        key.toLowerCase();


    // Check if user input matches key or name
    if (
        chapterKey.includes(input) ||
        chapterName.includes(input)
    ) {

        window.location.href =
            "chapter.html?chapter=" + key;

        found = true;

        break;
    }

}


// If no match found
if (!found) {

    alert(
"Oops! Chapter not found. Try searching with the exact chapter name."
);

}

    }

    catch (error) {

        console.log("Search error:", error);

    }

}



// ================================
// Subject Page Loading
// ================================

async function loadSubject() {

    const params =
        new URLSearchParams(window.location.search);

    const subject =
        params.get("subject");


    try {

        const response =
            await fetch("https://openjee-backend.onrender.com/api/chapters");

        const data =
            await response.json();

          allChapters = data.filter(
    chapter => chapter.subject === subject
);

document.getElementById("chapterCount").innerText =
    allChapters.length + " Chapters Available";


        document.getElementById("subjectTitle").innerText =
            subject + " Chapters";


        filterChapters("all");

    }

    catch(error) {

        console.log("Subject loading error:", error);

    }

}



// Run subject page only if it exists

if (document.getElementById("chapterContainer")) {

    loadSubject();

}

function filterChapters(classNumber) {

    const container =
        document.getElementById("chapterContainer");

    container.innerHTML = "";

    allChapters.forEach(chapter => {

       if (
    classNumber === "all" ||
    chapter.classLevel === classNumber
) {

            container.innerHTML += `
            
             <a href="chapter.html?chapter=${chapter._id}"
               class="card">

                <h3>${chapter.name}</h3>

                <p>
                    Class ${chapter.classLevel}
                </p>

            </a>
            
            `;

        }

    });

}