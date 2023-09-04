<template>
       <div class="relative mx-4 mb-4 lg:mx-0">
        <button onclick="alert('elieoko')" class="hover:border-indigo-600">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg class="w-5 h-5 text-gray-500" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
        </button>
        <input
          class="w-full pl-10 pr-8 text-indigo-600 border-gray-200 rounded-md  focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
          type="text"
          placeholder="What are you looking for"
        >
      </div>
      
        <label for="toggle" class="flex items-center cursor-pointer">
    <div class="relative">
      <input
        type="checkbox"
        id="toggle"
        class="sr-only"
        v-model="isActive"
      >
      <div class="w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
      <div
        class="dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition"
        :class="{ 'translate-x-6': isActive }"
      ></div>
    </div>
    <div class="ml-3 text-gray-700">{{ isActive ?"Images":"Show Images" }}</div>
</label>

{{ "Code ici" }}
<div class="grid grid-cols-2 gap-0 border-2 border-gray-400  mb-4">
  <table class="table-auto border-2 border-gray-400 ">
  
  <tbody class="border-2 border-gray-400">
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-1/4  font-semibold">1 Lockyer vide</td>
      <td class="border-2 border-gray-400">Malcolm Lockyer</td>
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">2</td>
      <td class="border-2 border-gray-400">The Eagles</td>
      
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">3</td>
      <td class="border-2 border-gray-400">Earth, Wind, and Fire</td>
     
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">4</td>
      <td class="border-2 border-gray-400">Malcolm Lockyer</td>
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">5</td>
      <td class="border-2 border-gray-400">The Eagles</td>
      
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">6</td>
      <td class="border-2 border-gray-400">Earth, Wind, and Fire</td>
     
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px] font-semibold">7</td>
      <td class="border-2 border-gray-400">Malcolm Lockyer</td>
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">8</td>
      <td class="border-2 border-gray-400">The Eagles</td>
      
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">9</td>
      <td class="border-2 border-gray-400">Earth, Wind, and Fire</td>
     
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 font-semibold w-[30px]">10</td>
      <td class="border-2 border-gray-400 text-right"> <a href="#" class="text-cyan-400">files</a></td>
     
    </tr>
  </tbody>
</table>
<div class="container border-2 border-gray-400 ">
    <div class="mb-4 grid grid-cols-6 flex ">
      <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px] mr-3 ">
  <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px] mr-3">
  <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px] mr-3">
  <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px] mr-3">
  <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px] mr-3">
  <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px]  mr-3">
  <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px] mr-3">
  <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px]  mr-3">
 
    </div>
    <div class="group-button right-10 flex right-10 left-0 top-0 bottom-0">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mr-2">
      Button
    </button>
    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded mr-2">
      Button
    </button>
</div>
  
</div>
 </div>
 <div class="grid grid-cols-2 gap-0 border-2 border-gray-400">
  <table class="table-auto border-2 border-gray-400 ">
  
  <tbody class="border-2 border-gray-400">
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-1/4  font-semibold">1 Lockyer vide</td>
      <td class="border-2 border-gray-400">Malcolm Lockyer</td>
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">2</td>
      <td class="border-2 border-gray-400">The Eagles</td>
      
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">3</td>
      <td class="border-2 border-gray-400">Earth, Wind, and Fire</td>
     
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">4</td>
      <td class="border-2 border-gray-400">Malcolm Lockyer</td>
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">5</td>
      <td class="border-2 border-gray-400">The Eagles</td>
      
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">6</td>
      <td class="border-2 border-gray-400">Earth, Wind, and Fire</td>
     
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px] font-semibold">7</td>
      <td class="border-2 border-gray-400">Malcolm Lockyer</td>
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">8</td>
      <td class="border-2 border-gray-400">The Eagles</td>
      
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 w-[30px]  font-semibold">9</td>
      <td class="border-2 border-gray-400">Earth, Wind, and Fire</td>
     
    </tr>
    <tr class="border-2 border-gray-400">
      <td class="border-2 border-gray-400 font-semibold w-[30px]">10</td>
      <td class="border-2 border-gray-400 text-right"> <a href="#" class="text-cyan-400">files</a></td>
     
    </tr>
  </tbody>
</table>
<div class="container border-2 border-gray-400 ">
    <div class="mb-4 grid grid-cols-6 flex ">
      <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px] mr-3 ">
  <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px] mr-3">
  <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px] mr-3">
  <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px] mr-3">
  <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px] mr-3">
  <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px]  mr-3">
  <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px] mr-3">
  <img src="../../public/1.jpg" alt="soficom" class="w-[100px] h-[150px]  mr-3">
 
    </div>
    <div class="group-button right-10 flex right-10 left-0 top-0 bottom-0">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mr-2">
      Button
    </button>
    <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded mr-2">
      Button
    </button>
</div>
  
</div>

 </div>





























</template>

<script  lang="ts">
export default {
  data() {
    return {
      isActive: false
    };
  }
};
</script>
<!-- <script setup lang="ts">
  const fileTempl = document.getElementById("file-template")
  const  imageTempl = document.getElementById("image-template")
  const empty = document.getElementById("empty")

// use to store pre selected files
let FILES = {};

// check if file is of type image and prepend the initialied
// template to the target element
function addFile(target:any, file:any) {
  const isImage = file.type.match("image.*"),
    objectURL = URL.createObjectURL(file);

  const clone = isImage
    ? imageTempl?.content?.cloneNode(true)
    : fileTempl.content.cloneNode(true);

  clone.querySelector("h1").textContent = file.name;
  clone.querySelector("li").id = objectURL;
  clone.querySelector(".delete").dataset.target = objectURL;
  clone.querySelector(".size").textContent =
    file.size > 1024
      ? file.size > 1048576
        ? Math.round(file.size / 1048576) + "mb"
        : Math.round(file.size / 1024) + "kb"
      : file.size + "b";

  isImage &&
    Object.assign(clone.querySelector("img"), {
      src: objectURL,
      alt: file.name
    });

  empty.classList.add("hidden");
  target.prepend(clone);
  console.log(objectURL)
  FILES[objectURL] = file;
}

const gallery = document.getElementById("gallery"),
  overlay = document.getElementById("overlay");

// click the hidden input of type file if the visible button is clicked
// and capture the selected files
const hidden = document.getElementById("hidden-input");
document.getElementById("button").onclick = () => hidden.click();
hidden.onchange = (e) => {
  for (const file of e.target.files) {
    addFile(gallery, file);
  }
};

// use to check if a file is being dragged
const hasFiles = ({ dataTransfer: { types = [] } }) =>
  types.indexOf("Files") > -1;

// use to track dragenter and dragleave events.
// this is to know if the outermost parent is dragged over
// without issues due to drag events on its children
let counter = 0;

// reset counter and append file to gallery when file is dropped
function dropHandler(ev) {
  ev.preventDefault();
  for (const file of ev.dataTransfer.files) {
    addFile(gallery, file);
    overlay.classList.remove("draggedover");
    counter = 0;
  }
}

// only react to actual files being dragged
function dragEnterHandler(e) {
  e.preventDefault();
  if (!hasFiles(e)) {
    return;
  }
  ++counter && overlay.classList.add("draggedover");
}

function dragLeaveHandler(e) {
  1 > --counter && overlay.classList.remove("draggedover");
}

function dragOverHandler(e) {
  if (hasFiles(e)) {
    e.preventDefault();
  }
}

// event delegation to caputre delete events
// from the waste buckets in the file preview cards
gallery.onclick = ({ target }) => {
  if (target.classList.contains("delete")) {
    const ou = target.dataset.target;
    document.getElementById(ou).remove(ou);
    gallery.children.length === 1 && empty.classList.remove("hidden");
    delete FILES[ou];
  }
};

// print all selected files
document.getElementById("submit").onclick = () => {
  
  alert(`Submitted Files:\n${JSON.stringify(FILES)}`);
  console.log(FILES);
};

// clear entire selection
document.getElementById("cancel").onclick = () => {
  while (gallery.children.length > 0) {
    gallery.lastChild.remove();
  }
  FILES = {};
  empty.classList.remove("hidden");
  gallery.append(empty);
};
</script> -->
