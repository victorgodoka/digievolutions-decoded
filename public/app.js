const setItem = (name, data) => sessionStorage.setItem(name, JSON.stringify(data))
const getItem = (name) => JSON.parse(sessionStorage.getItem(name))

if (!getItem("data")) {
  firebase
    .firestore()
    .collection("digimon")
    .doc("data")
    .get()
    .then(function (doc) {
      if (doc.exists) {
        let data = doc.data();
        Object.keys(data).forEach(key => {
          setItem(key, data[key])
        });

        setItem("data", true)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
      document.querySelector(".loading").classList.add("hide")
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
} else {
  document.querySelector(".loading").classList.add("hide")
}

$("select").on("click", function () {

  $(this).parent(".select-box").toggleClass("open");

});

$(document).mouseup(function (e) {
  var container = $(".select-box");

  if (container.has(e.target).length === 0) {
    container.removeClass("open");
  }
});


$("select").on("change", function () {
  var selection = $(this).find("option:selected").text(),
    labelFor = $(this).attr("id"),
    label = $("[for='" + labelFor + "']");
  label.find(".label-desc").html(selection);
  getDigimonList($(this).val())
});

function getDigimonList(level) {
  document.querySelector(".digimon").innerHTML = getItem("evolutionary_levels")[level].map(digimon => 
    `<li class="digimon__data">
    <img src="./imgs/digimon/${digimon.includes("Digitama") ? "Digitama" : digimon}.png" class="digimon__image" />
      <span class="digimon__name">${digimon}</span>
    </li>`
  ).join("")
}