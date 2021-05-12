window.addEventListener("load", function (){
    const menuBtn = document.querySelector(".navigation__menu-btn");
    const headerMenu = document.querySelector(".navigation__menu");

    showHideMenu(480, headerMenu);

    window.addEventListener("resize", function () {
        showHideMenu(480, headerMenu);
    })

    menuBtn.addEventListener("click", function (evt) {
        const backgroundSvgs = evt.target.closest("button").children;
        for (const backgroundSvg of backgroundSvgs) {
            if (backgroundSvg.classList.contains("btn__decor--unclicked")){
                backgroundSvg.classList.remove("btn__decor--unclicked");
            }
            else {
                backgroundSvg.classList.add("btn__decor--unclicked");
            }
        }
        if (headerMenu.classList.contains("hidden")){
            headerMenu.classList.remove("hidden");
        }
        else {
            headerMenu.classList.add("hidden");
        }
    })


    function showHideMenu(width, elemToOperate) {
        if (window.innerWidth > width) {
            elemToOperate.classList.remove("hidden");
        }
        else {
            elemToOperate.classList.add("hidden");
        }
    }

})
