describe("message on landing page",() => {
   document.body.innerHTML =`
   <img class="view" id = "logo" src="../static/myDiary.png" alt="logo" /> 
   <div id="output"></div>
   `;
   mock = jest.spyOn(global,"fetch");
    require("../static/index.js");
    it("Ensures index page is loaded", async()=>{    
        
    })
})
